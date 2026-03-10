const inputTarefa = document.getElementById('adicionar_tarefas');
const inputClassificasao = document.getElementById('classificacao');
const setaHoraInicial = document.querySelector('.inicial');
const setaHoraFinal = document.querySelector('.final');

const butaoAdicionar = document.getElementById('butao_de_adicionar');

const dataEHora = document.getElementById('dataEHora');
const ul = document.getElementById('ul');
const nomeUsuario = document.getElementById('nome_usuario');
let tarefas = JSON.parse(localStorage.getItem('listaDeTarefas')) || [];

const nome = prompt('Qual o seu nome?') || 'Usuário';
nomeUsuario.textContent = nome;

//Atualiza a data e hora "inicio"
function atualizarRelogio() {
    const agora = new Date();

    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();

    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    const dataHoraBR = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundos}`;

    dataEHora.textContent = dataHoraBR;
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();
//"fim"

// cria a tarefa em se
function listarTarefa(texto, horaInicial, horaFinal) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="conteiner_tarefa" >
            <div class="tarefas">
                <label class="checkbox-container">
                    <input type="checkbox" class="checkbox" title="seletor" >
                    <span class="checkmark"></span>
                </label>
                <div  class="conteiner_texto">
                    <p class="texto" >${texto}</p>
                    <div class="conteiner_hora" >
                        <p class="inicio_fim" >Inicio: <span class="hora_inicial">${horaInicial || ''}</span></p>
                        <p class="inicio_fim" >Fim: <span class="hora_final">${horaFinal || ''}</span></p>
                    </div>
                </div>
            </div>
            <div class="conteiner_de_configurasao" >
                <button type="button" class="btn-play" ><img class="play" src="../asset/icon/icons8-sino-de-notificação-96(copia_normal).png" alt="Pausar"></button>
                <button type="button" class="btn_lixeira" ><img class="lixeira" src="../asset/icon/icons8-lixeira-96.png" alt="Lixeira"></button>
            </div>
        </div>
    `;
    ul.appendChild(li);
    li.classList.add('item_lista');
    li.classList.add('alarme_parado');
    li.classList.add('animacao_entrada');
    li.setAttribute('data-inicio-tocado', 'false');
    li.setAttribute('data-fim-tocado', 'false');

    setTimeout(() => {
        li.classList.remove('animacao_entrada');
    }, 400);
}

const alarmeAudio = document.querySelector('#alarme');
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

function salvarTarefas() {
    let tarefasEmJSON = JSON.stringify(tarefas);
    localStorage.setItem('listaDeTarefas', tarefasEmJSON);
}

// evento de butão a adicionar
butaoAdicionar.addEventListener('click', () => {
    const texto = inputTarefa.value.trim();
    const horaInicial = setaHoraInicial.value;
    const horaFinal = setaHoraFinal.value;

    // função para ativar ou não o input de hora do alarme
    function ativar(hora) {
        const toggle = document.getElementById("toggle");

        if (toggle.checked) {
            console.log(hora);
            return hora === undefined ? '' : hora;
        } else {
            return ''
        }
    }

    if (texto !== '') {
        tarefas.push({ texto: texto, horaInicial: ativar(horaInicial), horaFinal: ativar(horaFinal), concluida: false });
        listarTarefa(texto, ativar(horaInicial), ativar(horaFinal));
        salvarTarefas();
        inputTarefa.value = '';
        setaHoraInicial.value = '';
        setaHoraFinal.value = '';
    }
});

inputTarefa.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        butaoAdicionar.click();
    }
});

function tocar(botao) {
    if (alarmeAudio.paused) {
        iniciarAlarme();
    } else {
        pararAlarme();
    }
}

function iniciarAlarme() {
    alarmeAudio.loop = true;
    alarmeAudio.play();
    botao.innerHTML = '<img class="pause" src="../asset/icon/icons8-sino-de-notificação-96.png" alt="Pausar">';
}
function pararAlarme() {
    alarmeAudio.pause();
    alarmeAudio.currentTime = 0;
    botao.innerHTML = '<img class="play" src="../asset/icon/icons8-sino-de-notificação-96(copia_normal).png" alt="Reproduzir">';
}

ul.addEventListener('input', evento => {
    const inputSelecionado = evento.target;

    if (inputSelecionado.classList.contains('hora_inicial')) {
        const liPai = inputSelecionado.closest('li');
        const inputFim = liPai.querySelector('.hora_final');
        inputFim.setAttribute('min', inputSelecionado.value);

        if (inputFim.value < inputSelecionado.value) {
            inputFim.value = '';
            alert('O horário de término foi resetado, pois era anterior ao novo horário de início.');
        }
    }
});

inputClassificasao.addEventListener('change', (evento) => {
    let filtroSelecionado = evento.target.value;
    let inputCheckBox = [...document.querySelectorAll('.checkbox')];

    for (let check of inputCheckBox) {
        let tarefaLi = check.closest('li');

        if (filtroSelecionado === 'Pendentes') {
            if (check.checked) {
                tarefaLi.style.display = 'none';
            } else {
                tarefaLi.style.display = 'flex';
            }
        } else if (filtroSelecionado === 'Concluidas') {
            if (check.checked) {
                tarefaLi.style.display = 'flex';
            } else {
                tarefaLi.style.display = 'none';
            }
        } else {
            tarefaLi.style.display = 'flex';
        }

    }
})

function converterParaMinutos(hora) {
    if (!hora || hora === 'Indefinido') return null;

    const [horas, minutos] = hora.split(':');
    return Number(horas) * 60 + Number(minutos);
}

// enplementação do alarme inicial
setInterval(() => {
    if (document.visibilityState !== 'visible') return;

    let agora = new Date();
    let hora = String(agora.getHours()).padStart(2, '0');
    let minuto = String(agora.getMinutes()).padStart(2, '0');
    let horaCompletaAtual = `${hora}:${minuto}`;

    const agoraMIn = converterParaMinutos(horaCompletaAtual);

    // let todasAsTarefas = [...document.querySelectorAll('.item_lista')]

    tarefas.forEach(tarefaLi => {
        const inputInicio = tarefaLi.querySelector('.hora_inicial');
        const inputFim = tarefaLi.querySelector('.hora_final');
        let botaoPlay = tarefaLi.querySelector('.btn-play');

        const horaInicial = inputInicio?.textContent.trim();
        const horaFinal = inputFim?.textContent.trim();

        if (!horaInicial && !horaFinal) return;

        const inicioMin = converterParaMinutos(horaInicial);
        const fimMin = converterParaMinutos(horaFinal);

        if (inicioMin !== null && tarefaLi.dataset.inicioTocado === 'false' && agoraMIn === inicioMin) {
            tarefaLi.dataset.inicioTocado = 'true';
            console.log('Inicio da tarefa!')

            new Notification("⏰ Início da tarefa", {
                body: "Sua tarefa começou agora!"
            });

            iniciarAlarme();
            tarefaLi.classList.remove('alarme_parado');
            tarefaLi.classList.add('alarme_inicio_tocado');

            setTimeout(() => {
                pararAlarme();
                tarefaLi.dataset.inicioTocado = 'false';
                tarefaLi.classList.remove('alarme_inicio_tocado');
                tarefaLi.classList.add('alarme_parado');
            }, 60000);

        } else if (fimMin !== null && tarefaLi.dataset.fimTocado === 'false' && agoraMIn === fimMin) {
            tarefaLi.dataset.fimTocado = 'true';
            console.log('Fim de tarefa!');

            new Notification("⏰ Fim da tarefa", {
                body: "Sua tarefa terminou agora!"
            });

            iniciarAlarme();
            tarefaLi.classList.remove('alarme_inicio_tocado');
            tarefaLi.classList.remove('alarme_parado');
            tarefaLi.classList.add('alarme_fim_iniciado');

            setTimeout(() => {
                pararAlarme();
                tarefaLi.dataset.fimTocado = 'false';
                tarefaLi.classList.remove('alarme_fim_iniciado');
                tarefaLi.classList.add('alarme_parado');
            }, 60000);

        }
    })

}, 60000)

window.addEventListener('DOMContentLoaded', () => {
    tarefas.forEach(tarefa => {
        listarTarefa(tarefa.texto, tarefa.horaInicial, tarefa.horaFinal);
    });
});
// enplementação da edição das tarefas listadas
ul.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('texto')) {
        const p = evento.target;
        const textoAntigo = p.textContent;

        const inputDeEdicao = document.createElement('input');
        inputDeEdicao.type = 'text';
        inputDeEdicao.value = textoAntigo;
        inputDeEdicao.classList.add('input_edicao');

        // Troca o <p> pelo <input>
        p.replaceWith(inputDeEdicao);
        inputDeEdicao.focus();

        // Função para salvar a edição
        function salvarEdicao() {
            const novoTexto = inputDeEdicao.value.trim() || textoAntigo;

            // Atualiza o array
            tarefas = tarefas.map(tarefa =>
                tarefa.texto === textoAntigo ? { ...tarefa, texto: novoTexto } : tarefa
            );

            salvarTarefas();

            // Cria novamente o <p> com o novo texto
            const novoP = document.createElement('p');
            novoP.textContent = novoTexto;
            novoP.classList.add('texto');
            inputDeEdicao.replaceWith(novoP);
        }

        // Salva ao sair do campo
        inputDeEdicao.addEventListener('blur', salvarEdicao);

        // Salva ao apertar Enter
        inputDeEdicao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') salvarEdicao();
        });
    }
    const elementoClicado = evento.target;

    if (elementoClicado.classList.contains('lixeira')) {

        alarmeAudio.pause();
        alarmeAudio.currentTime = 0;

        const itemParaRemover = elementoClicado.closest('li');
        const texto = itemParaRemover.querySelector('.texto').textContent;

        tarefas = tarefas.filter(tarefa => tarefa.texto !== texto);

        salvarTarefas();

        itemParaRemover.classList.add('animacao_saida');

        setTimeout(() => {
            itemParaRemover.remove();
        }, 400);
    }

    const botaoPlay = evento.target.closest('.btn-play');
    if (!botaoPlay) return;

    tocar(botaoPlay);
});

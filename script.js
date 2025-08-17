const inputTarefa = document.getElementById('adicionar_tarefas');
const inputClassificasao = document.getElementById('classificacao');


const butaoAdicionar = document.getElementById('butao_de_adicionar');
const butaoLixeira = document.getElementsByClassName('butao_lixeira');

const dataEHora = document.getElementById('dataEHora');
const ul = document.getElementById('ul');
let tarefas = JSON.parse(localStorage.getItem('listaDeTarefas')) || [];

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
function listarTarefa(texto) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="tarefas">
            <input type="checkbox" title="seletor" class="checkbox">
            <p class="texto" >${texto}</p>
        </div>
        
        <div>
            <p>Inicio:</p>
            <input type="time" name="inicio" class="hora_inicial" title="relogio" >
            <p> / </p>
            <p>Fim:</p>
            <input type="time" name="fim" class="hora_fim" title="relogio" >
            <button type="button" class="butao_lixeira" ><img class="lixeira" src="./asset/icons8-lixeira-30.png" alt="Lixeira"></button>
        </div>
        
    `;
    ul.appendChild(li);
    li.classList.add('item_lista');

}

function salvarTarefas () {
    let tarefasEmJSON = JSON.stringify(tarefas);
    localStorage.setItem('listaDeTarefas', tarefasEmJSON);
}

// evento de butão a adicionar
butaoAdicionar.addEventListener('click', () => {
    const texto = inputTarefa.value.trim();
    if (texto !== '') {
        tarefas.push({ texto: texto, concluida: false });
        listarTarefa(texto);
        salvarTarefas();
        inputTarefa.value = '';
    }
});
// remove a tarefa da tela
ul.addEventListener('click', (evento) => {
    const elementoClicado = evento.target;
    if (elementoClicado.classList.contains('lixeira')) {
        const itemParaRemover = elementoClicado.closest('li');
        const texto = itemParaRemover.querySelector('.texto').textContent;

        tarefas = tarefas.filter(tarefa => tarefa.texto !== texto);

        salvarTarefas();

        itemParaRemover.remove();
    }
})
ul.addEventListener('input', evento => {
    const inputSelecionado = evento.target;
    if (inputSelecionado.classList.contains('hora_inicial')) {
        const liPai = inputSelecionado.closest('li');
        const inputFim = liPai.querySelector('.hora_fim');
        inputFim.setAttribute('min', inputSelecionado.value);

        if (inputFim.value && inputFim.value < inputSelecionado.value) {
            inputFim.value = '';
            alert('O horário de término foi resetado, pois era anterior ao novo horário de início.');
        }
    }
})

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
// enplementação do alarme inicial
const alarmeAudio = document.querySelector('#alarme');

setInterval(() => {
    let todasAsTarefas = [...document.querySelectorAll('.item_lista')]

    todasAsTarefas.forEach(tarefaLi => {
        let inputInicio = tarefaLi.querySelector('.hora_inicial');
        let inputFim = tarefaLi.querySelector('.hora_fim');

        if (!inputInicio || !inputFim) {
            return;
        }

        let horaInicial = inputInicio.value;
        let horaFinal = inputFim.value;

        if (!horaInicial && !horaFinal) {
            return;
        }

        let agora = new Date();
        let hora = String(agora.getHours()).padStart(2, '0');
        let minuto = String(agora.getMinutes()).padStart(2, '0');
        let horaCompletaAtual = `${hora}:${minuto}`;

        if (horaInicial === horaCompletaAtual && !tarefaLi.classList.contains('alarme_inicio_tocado')) {
            console.log('Inicio da tarefa!')
            tarefaLi.style.backgroundColor = 'green';
            alarmeAudio.play();
            tarefaLi.classList.add('alarme_inicio_tocado');

        } else if (horaFinal === horaCompletaAtual && !tarefaLi.classList.contains('alarme_fim_iniciado')) {
            console.log('Fim de tarefa!');
            tarefaLi.style.backgroundColor = 'red';
            alarmeAudio.play();
            tarefaLi.classList.add('alarme_fim_iniciado');

        } else if (horaInicial !== horaCompletaAtual && horaFinal !== horaCompletaAtual) {
            tarefaLi.style.backgroundColor = 'white';
            
            tarefaLi.classList.remove('alarme_inicio_tocado');
            tarefaLi.classList.remove('alarme_fim_iniciado');
        }
    })

}, 1000)

window.addEventListener('DOMContentLoaded', () => {
    tarefas.forEach(tarefa => {
        listarTarefa(tarefa.texto);
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
});

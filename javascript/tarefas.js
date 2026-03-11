import { tarefas, salvarTarefas } from './storage.js';
import { tocar } from './alarme.js';

const alarmeAudio = document.querySelector('#alarme');
const ul = document.getElementById('ul');

// cria a tarefa em se
export function listarTarefa(id, texto, horaInicial, horaFinal) {
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
    li.dataset.id = id;

    setTimeout(() => {
        li.classList.remove('animacao_entrada');
    }, 400);
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
        let id = Number(itemParaRemover.dataset.id);

        const index = tarefas.findIndex(tarefa => tarefa.id === id);

        if (index !== -1) {
            tarefas.splice(index, 1);
        }

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
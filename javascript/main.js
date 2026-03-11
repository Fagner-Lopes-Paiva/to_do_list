import { atualizarRelogio } from './relogio.js';
import { listarTarefa } from './tarefas.js';
import { tarefas, salvarTarefas } from './storage.js';

const inputTarefa = document.getElementById('adicionar_tarefas');
const inputClassificasao = document.getElementById('classificacao');
const setaHoraInicial = document.querySelector('.inicial');
const setaHoraFinal = document.querySelector('.final');
const butaoAdicionar = document.getElementById('butao_de_adicionar');
const nomeUsuario = document.getElementById('nome_usuario');
const toggle = document.getElementById("toggle");

const nome = prompt('Qual o seu nome?') || 'Usuário';
nomeUsuario.textContent = nome;

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// evento de butão a adicionar
butaoAdicionar.addEventListener('click', () => {
    const texto = inputTarefa.value.trim();
    const horaInicial = setaHoraInicial.value;
    const horaFinal = setaHoraFinal.value;

    // função para ativar ou não o input de hora do alarme
    function ativar(hora) {
        if (toggle.checked) {
            return hora === undefined ? '' : hora;
        }
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        horaInicial: ativar(horaInicial),
        horaFinal: ativar(horaFinal),
        concluida: false
    }

    if (texto !== '') {
        tarefas.push(novaTarefa);
        listarTarefa(novaTarefa.id, novaTarefa.texto, novaTarefa.horaInicial, novaTarefa.horaFinal);
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

window.addEventListener('DOMContentLoaded', () => {
    tarefas.forEach(({ id, texto, horaInicial, horaFinal }) => {
        listarTarefa( id, texto, horaInicial, horaFinal );
    });
});

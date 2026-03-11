import { tarefas } from './storage.js';

const alarmeAudio = document.querySelector('#alarme');

export function tocar(botao) {
    if (alarmeAudio.paused) {
        iniciarAlarme(botao);
    } else {
        pararAlarme(botao);
    }
}

function iniciarAlarme(botao) {
    alarmeAudio.loop = true;
    alarmeAudio.play();
    botao.innerHTML = '<img class="pause" src="../asset/icon/icons8-sino-de-notificação-96.png" alt="Pausar">';
}

function pararAlarme(botao) {
    alarmeAudio.pause();
    alarmeAudio.currentTime = 0;
    botao.innerHTML = '<img class="play" src="../asset/icon/icons8-sino-de-notificação-96(copia_normal).png" alt="Reproduzir">';
}

if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// enplementação do alarme inicial
setInterval(() => {
    if (document.visibilityState !== 'visible') return;

    let agora = new Date();
    let hora = String(agora.getHours()).padStart(2, '0');
    let minuto = String(agora.getMinutes()).padStart(2, '0');
    let horaCompletaAtual = `${hora}:${minuto}`;

    tarefas.forEach(tarefaLi => {
        const li = document.querySelector(`[data-id="${tarefaLi.id}"]`);
        if (!li) return;
        
        const botaoPlay = li.querySelector('.btn-play');
        if (!botaoPlay) return;

        const inputInicio = tarefaLi.horaInicial;
        const inputFim = tarefaLi.horaFinal;

        if (!inputInicio && !inputFim) return;

        if (inputInicio !== null && horaCompletaAtual === inputInicio && li.dataset.inicioTocado === 'false') {
            li.dataset.inicioTocado = 'true';
            console.log('Inicio da tarefa!')

            new Notification("⏰ Início da tarefa", {
                body: "Sua tarefa começou agora!"
            });

            iniciarAlarme(botaoPlay);
            li.classList.remove('alarme_parado');
            li.classList.add('alarme_inicio_tocado');

            setTimeout(() => {
                pararAlarme(botaoPlay);
                li.dataset.inicioTocado = 'false';
                li.classList.remove('alarme_inicio_tocado');
                li.classList.add('alarme_parado');
            }, 60000);

        } else if (inputFim !== null && horaCompletaAtual === inputFim && li.dataset.fimTocado === 'false') {            
            li.dataset.fimTocado = 'true';
            console.log('Fim de tarefa!');

            new Notification("⏰ Fim da tarefa", {
                body: "Sua tarefa terminou agora!"
            });

            iniciarAlarme(botaoPlay);
            li.classList.remove('alarme_inicio_tocado');
            li.classList.remove('alarme_parado');
            li.classList.add('alarme_fim_iniciado');

            setTimeout(() => {
                pararAlarme(botaoPlay);
                li.dataset.fimTocado = 'false';
                li.classList.remove('alarme_fim_iniciado');
                li.classList.add('alarme_parado');
            }, 60000);

        }
    })

}, 1000);
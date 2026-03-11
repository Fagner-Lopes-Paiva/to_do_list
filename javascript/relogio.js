const dataEHora = document.getElementById('dataEHora');
//Atualiza a data e hora "inicio"
export function atualizarRelogio() {
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

 
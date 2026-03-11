export let tarefas = JSON.parse(localStorage.getItem('listaDeTarefas')) || [];

export function salvarTarefas() {
    let tarefasEmJSON = JSON.stringify(tarefas);
    localStorage.setItem('listaDeTarefas', tarefasEmJSON);
}
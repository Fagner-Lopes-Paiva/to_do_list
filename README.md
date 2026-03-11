# 📝 To-Do List com Alarme
![to-do-list](asset/foto_do_site.png)
## 📖 Visão Geral

Este é um projeto de **Lista de Tarefas (To-Do List) interativa** desenvolvido utilizando **HTML, CSS e JavaScript puro (Vanilla JavaScript)**.

A aplicação permite que o usuário **adicione, edite, conclua e remova tarefas**, além de definir **horários de início e fim para cada atividade**, com um **sistema de alarmes sonoros e notificações do navegador**.

O objetivo do projeto é demonstrar na prática conceitos importantes do **desenvolvimento Front-End moderno**, como:

* Manipulação dinâmica do DOM
* Modularização de código JavaScript
* Gerenciamento de estado
* Uso de armazenamento local
* Controle de eventos
* Segurança básica contra XSS

A aplicação funciona como uma pequena ferramenta de **gerenciamento de tempo**, ajudando o usuário a organizar suas tarefas diárias.

---

# ✨ Funcionalidades Principais

### ➕ Adicionar Tarefas

O usuário pode digitar uma tarefa e adicioná-la à lista.

Cada tarefa criada possui:

* Texto da tarefa
* Horário de início
* Horário de término
* Botão de alarme
* Botão de exclusão
* Checkbox de conclusão

---

### ✏️ Editar Tarefas

O texto da tarefa pode ser editado diretamente clicando sobre ele.

A edição é feita de forma dinâmica utilizando **substituição de elementos do DOM** (`<p>` → `<input>`).

---

### 🗑️ Remover Tarefas

Cada tarefa possui um botão de lixeira que remove a tarefa da lista com uma **animação de saída**.

---

### ✔️ Marcar Tarefa como Concluída

Cada tarefa possui um **checkbox personalizado** que permite marcar a tarefa como concluída.

O estado da tarefa é salvo automaticamente.

---

### ⏰ Alarmes de Início e Fim

Cada tarefa pode ter:

* Horário de **início**
* Horário de **término**

Quando o horário é atingido:

* Um **alarme sonoro é tocado**
* Uma **notificação do navegador é exibida**
* A tarefa muda de cor para indicar o evento

Cores utilizadas:

* 🟢 Verde → início da tarefa
* 🔴 Vermelho → fim da tarefa

---

### 🔔 Notificações do Navegador

A aplicação utiliza a **API de Notificações do navegador**, permitindo avisos mesmo quando a aba não está ativa.

---

### 💾 Salvamento Automático

Todas as tarefas são salvas no navegador utilizando:

**Local Storage**

Assim, mesmo ao recarregar a página, as tarefas continuam disponíveis.

---

### 🛡️ Proteção contra XSS

O projeto evita vulnerabilidades do tipo **Cross-Site Scripting (XSS)** utilizando:

* `textContent` para inserir textos do usuário
* Evitando inserir dados diretamente com `innerHTML`

Isso impede a execução de scripts maliciosos.

---

# 🛠️ Tecnologias Utilizadas

### Estrutura

* **HTML5**

### Estilização

* **CSS3**
* **Flexbox**
* **Media Queries (Responsividade)**
* Animações CSS

### Lógica da Aplicação

* **JavaScript (ES6+)**

Principais conceitos utilizados:

* Manipulação do DOM
* `createElement`
* `querySelector`
* `appendChild`
* `replaceWith`
* `dataset`
* `classList`
* `setAttribute`

---

# 📦 Recursos do JavaScript Utilizados

### Modularização de Código

Uso de **JavaScript Modules (ES Modules)**:

```
import { tarefas } from './storage.js'
export function listarTarefa()
```

Separando responsabilidades em arquivos como:

* `tarefas.js`
* `alarme.js`
* `storage.js`

---

### Gerenciamento de Estado

As tarefas são armazenadas em um **array global de estado**:

```
tarefas[]
```

Esse estado é atualizado sempre que:

* uma tarefa é criada
* uma tarefa é editada
* uma tarefa é removida
* uma tarefa é concluída

---

### Armazenamento Local

Uso da API:

```
localStorage
```

Para persistir os dados entre recarregamentos da página.

---

### Delegação de Eventos

Em vez de adicionar eventos em cada elemento, os eventos são controlados diretamente na `<ul>`:

```
ul.addEventListener("click", ...)
ul.addEventListener("change", ...)
ul.addEventListener("input", ...)
```

Isso melhora **performance e organização do código**.

---

### Controle de Tempo

A aplicação utiliza:

```
setInterval()
```

Para verificar constantemente se o horário atual corresponde ao horário das tarefas.

---

### APIs do Navegador

A aplicação utiliza:

* **Notification API**
* **Audio API**
* **Local Storage API**

---

# ⚙️ Como Funciona a Lógica dos Alarmes

O sistema de alarmes utiliza um **loop contínuo com `setInterval`** que roda a cada segundo.

### Etapas do processo

1️⃣ O sistema pega a **hora atual do computador do usuário**

2️⃣ Percorre todas as tarefas armazenadas

3️⃣ Para cada tarefa ele verifica:

* horário de início
* horário de fim

4️⃣ Se o horário atual for igual ao horário da tarefa:

* toca o alarme
* envia notificação
* altera o estilo visual da tarefa

---

### Controle de Execução

Cada tarefa possui atributos `dataset` para evitar que o alarme toque várias vezes no mesmo minuto:

```
data-inicio-tocado
data-fim-tocado
```

Esses atributos funcionam como **marcadores de estado**.

---

# 🚀 Como Executar o Projeto

1️⃣ Clone este repositório

```
git clone URL_DO_REPOSITORIO
```

2️⃣ Abra a pasta do projeto

3️⃣ Abra o arquivo:

```
index.html
```

em qualquer navegador moderno.

---

# 📚 Conceitos de Front-End Demonstrados

Este projeto demonstra diversos conceitos importantes do desenvolvimento front-end:

* Manipulação avançada do DOM
* Organização de código JavaScript
* Modularização
* Controle de estado
* Persistência de dados
* Eventos do navegador
* Segurança básica
* Programação assíncrona com timers

---

# 👨‍💻 Autor

**Fagner Lopes Paiva**

Desenvolvedor Front-End em aprendizado focado em:

* HTML
* CSS
* JavaScript
* Desenvolvimento Web Moderno

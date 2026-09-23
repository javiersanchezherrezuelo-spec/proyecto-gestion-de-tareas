let todos = [
  { id: 1, text: "Comprar leche y fruta en el supermercado", completed: false },
  { id: 2, text: "Estudiar HTML semántico y accesibilidad",  completed: true  },
  { id: 3, text: "Hacer ejercicio por la mañana",            completed: false },
  { id: 4, text: "Leer un capítulo del libro",               completed: true  },
  { id: 5, text: "Preparar la cena para el viernes",         completed: false },
];

const taskList      = document.querySelector(".task-list");
const taskInput     = document.querySelector(".task-input");
const taskCount     = document.querySelector(".task-count");
const addForm       = document.querySelector(".add-task-form");
const btnDeleteDone = document.querySelector(".btn-delete");
const btnDeleteAll  = document.querySelector(".btn-delete-all");

function crearElementoTarea(todo, index) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.index = index;

  if (todo.completed) {
    li.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-${todo.id}`;
  checkbox.className = "task-checkbox";
  checkbox.checked = todo.completed;

  checkbox.addEventListener("change", () => {
    toggleTodo(index);
  });

  const label = document.createElement("label");
  label.htmlFor = `task-${todo.id}`;
  label.className = "task-label";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = todo.text;

  label.appendChild(span);
  li.appendChild(checkbox);
  li.appendChild(label);

  return li;
}

function renderTodos() {
  taskList.innerHTML = "";

  todos.forEach((todo, index) => {
    const elemento = crearElementoTarea(todo, index);
    taskList.appendChild(elemento);
  });

  taskCount.textContent = todos.length;
  guardarEnLocalStorage();
}

function addTodo(text) {
  const textoLimpio = text.trim();
  if (!textoLimpio) return;

  todos.push({
    id: Date.now(),
    text: textoLimpio,
    completed: false,
  });

  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
}

function deleteAll() {
  todos = [];
  renderTodos();
}

function guardarEnLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function cargarDesdeLocalStorage() {
  const guardado = localStorage.getItem("todos");
  if (guardado) {
    todos = JSON.parse(guardado);
  }
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

btnDeleteDone.addEventListener("click", deleteCompleted);
btnDeleteAll.addEventListener("click", deleteAll);

cargarDesdeLocalStorage();
renderTodos();

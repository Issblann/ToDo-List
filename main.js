// LISTA TO DO

const form = document.querySelector(".form");
const containerInputs = document.querySelector(".container-inputs");
const inputTask = document.querySelector(".input-task");
const submit = document.querySelector(".button-add");
const noticeText = document.querySelector(".notice-text");
const tasksList = document.querySelector(".task-list");
const deleteAllBtn = document.querySelector(".deleteAll-button");

// Hacer una lista to do donde se pueda colocar una tarea y que esta
// se renderice en un ul, al mismo tiempo que se pueda eliminar una tarea o borrar todas al tiempo y que se guarde
// en el local storage. Que se verifique que la tarea no se repita y que no sea una tarea sin texto.

// - Crear local storage
let taskss = JSON.parse(localStorage.getItem("taskss")) || [];

// -Guardar local storage
const saveLocalStorage = (tasksList) => {
  localStorage.setItem("taskss", JSON.stringify(tasksList));
};

// crear tarea
const createTask = (task) => {
  return `<li> ${task.name}<img src="./assets/icon-trash.svg" class="trash-button" alt="boton de borrar" data-name="${task.name}"></li>`;
};

// - Que se renderice el tasklist
const renderTaskList = (todoList) => {
  tasksList.innerHTML = todoList.map((task) => createTask(task)).join("");
};

// - Ocultar boton para eliminar todas las tareas
const hideDeleteAllbtn = (tasksList) => {
  if (!tasksList.length) {
    deleteAllBtn.classList.add("hidden");
    return;
  }
  deleteAllBtn.classList.remove("hidden");
};

// Ocultar texto cuando haya alguna tarea

const hideTextNotice = (taskList) => {
  if (taskList.length) {
    noticeText.classList.add("hidden");
    return;
  }
  noticeText.classList.remove("hidden");
};
// - Agregar tarea
const addTask = (e) => {
  e.preventDefault();
  const taskName = inputTask.value.trim();
  if (!taskName.length) {
    alert("Ingrese alguna tarea");
    return;
  } else if (
    taskss.some((task) => {
      return task.name.toLowerCase() === taskName.toLowerCase();
    })
  ) {
    alert("Ya existe una tarea con ese nombre");
    return;
  }
  taskss = [...taskss, { name: taskName }];
  inputTask.value = "";
  allFunctions();
};
// - Eliminar tarea con boton
const deleteTask = (e) => {
  if (!e.target.classList.contains("trash-button")) {
    return;
  }
  console.dir(e.target);
  const filterName = e.target.dataset.name;
  taskss = taskss.filter((task) => task.name !== filterName);
  allFunctions();
};
// - Borrar todas las tareas con un boton (anteriormente realizado)
const deleteAllTask = () => {
  taskss = [];
  allFunctions();
};
// - Crear funcion donde atrape las demas funciones anteriormente realizadas (las necesarias que hay que colocar en init())
const allFunctions = () => {
  renderTaskList(taskss);
  saveLocalStorage(taskss);
  hideDeleteAllbtn(taskss);
  hideTextNotice(taskss);
};
// - Crear funcion init() que iniciara, guardando local storage y demas informacion
const init = () => {
  form.addEventListener("submit", addTask);
  tasksList.addEventListener("click", deleteTask);
  deleteAllBtn.addEventListener("click", deleteAllTask);

  allFunctions();
};

init();

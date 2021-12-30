const tasksList = document.getElementById("tasks-list");
const tasksContainer = document.getElementById("tasks-container");
const url = "http://localhost:5000";
const submitBtn = document.getElementById("submit-btn");
const taskInput = document.getElementById("task-input");
const taskCheck = document.getElementById("task-check");
const alert = document.querySelector(".alert");

let editFlag = false;
let editElement = "";
let editId = "";

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const value = taskInput.value;
  let completed = false;
  if (taskCheck.checked) {
    completed = true;
  }
  if (value && !editFlag) {
    createTask();
    showAlert("add item", "success");
    backToDefault();
  } else if (value && editFlag) {
    updateTask(editId, value, completed);
  } else {
    window.alert("must type something...");
  }
});

window.addEventListener("DOMContentLoaded", getTasks());

async function getTasks() {
  try {
    const data = await axios.get(`${url}/api/v1/tasks`);
    const tasks = data.data.tasks;

    tasks.map((task) => {
      const { _id, name, completed } = task;
      createElement(_id, name, completed);
    });
  } catch (error) {
    console.log(error);
  }
}

function createElement(id, name, completed) {
  const element = document.createElement("li");
  const attr = document.createAttribute("class");
  attr.value =
    "list-group-item d-flex justify-content-between align-items-center";
  element.setAttributeNode(attr);
  element.setAttribute("id", id);
  element.innerHTML = `<span class="text-capitalize">${name}</span><span>${
    completed
      ? '<i class="fas fa-check text-success"></i>'
      : '<i class="fas fa-times text-danger"></i>'
  }</span><span><button class="btn btn-outline-warning text-capitalize" id="edit-btn">edit</button><button class="btn btn-outline-danger text-capitalize" id="delete-btn">delete</button></span>`;

  tasksList.appendChild(element);

  const editBtn = element.querySelector(".btn-outline-warning");
  const deleteBtn = element.querySelector(".btn-outline-danger");
  deleteBtn.addEventListener("click", deleteTask);
  editBtn.addEventListener("click", editTask);
}

const createTask = async () => {
  const name = taskInput.value;
  let completed = false;
  if (taskCheck.checked) {
    completed = true;
  }
  console.log(name, completed);
  try {
    const data = await axios.post(`${url}/api/v1/tasks`, { name, completed });
    // console.log(data);
    const { _id } = data.data.task;
    createElement(_id, name, completed);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (e) => {
  const deleteElement = e.currentTarget.parentElement.parentElement;
  const id = deleteElement.id;
  try {
    await axios.delete(`${url}/api/v1/tasks/${id}`);
    deleteElement.remove();
    showAlert("delete item", "danger");
  } catch (error) {
    console.log(error);
  }
  backToDefault();
};
const editTask = (e, name, completed) => {
  const deleteElement = e.currentTarget.parentElement.parentElement;
  const id = deleteElement.id;
  editElement =
    e.currentTarget.parentElement.previousElementSibling.previousElementSibling;
  taskInput.value = editElement.textContent;
  editFlag = true;
  editId = id;
  submitBtn.textContent = "edit";
  // console.log(editElement);
  const checkElement =
    e.currentTarget.parentElement.previousElementSibling.firstChild;
  // console.log(checkElement);
  if (!checkElement.classList.contains("fa-times")) {
    taskCheck.setAttribute("checked", "checked");
  } else {
    taskCheck.removeAttribute("checked");
  }
  // backToDefault();
};

const updateTask = async (id, name, completed) => {
  try {
    const task = await axios.patch(`${url}/api/v1/tasks/${id}`, {
      name,
      completed,
    });
    editElement.textContent = name;
    console.log(editElement.nextElementSibling);
    const checkIcon = document.createElement("i");
    checkIcon.setAttribute("class", "fas fa-check text-success");
    const unCheckIcon = document.createElement("i");
    unCheckIcon.setAttribute("class", "fas fa-times text-danger");
    console.log(completed);
    if (completed) {
      editElement.nextElementSibling.replaceWith(checkIcon);
    } else {
      editElement.nextElementSibling.replaceWith(unCheckIcon);
    }
  } catch (error) {
    console.log(error);
  }
  backToDefault();
};

// back to default
const backToDefault = () => {
  taskInput.value = "";
  editFlag = false;
  editId = "";
  editElement = "";
  submitBtn.textContent = "submit";
};
// alert function
const showAlert = (msg, classStyle) => {
  alert.textContent = msg;
  alert.classList.add(`alert-${classStyle}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${classStyle}`);
  }, 2000);
};

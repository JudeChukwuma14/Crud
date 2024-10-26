document.addEventListener("DOMContentLoaded", loadTasks);
const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task));
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value;
  const task = { id: Date.now(), ListTask: taskText };
  addTask(task);
  saveTaskToLocalStorage(task);
  taskInput.value = "";
});

function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  Swal.fire({
    position: "center",
    icon: "success",
    title: "List added successfully",
    showConfirmButton: false,
    timer: 1500,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(task) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <span>${task.ListTask}</span>
    <div class="actions">
    <span class="edit" onclick="editTask(${task.id})">✏️</span>
    <span class="delete" onclick="deleteTask(${task.id})">🗑️</span>
    </div>
    `;
  listItem.setAttribute("data-id", task.id);
  todoList.appendChild(listItem);
}

function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.id === id);
  Swal.fire({
    title: "Edit Task",
    input: "text",
    inputValue: task.ListTask,
    showCancelButton: true,
    confirmButtonText: "Save",
  }).then((result) => {
    if (result.isConfirmed) {
      task.ListTask = result.value;
      updateTaskInLocalStorage(tasks);
      refreshTaskList();
      Swal.fire("Updated!", "Task has been updated.", "success");
    }
  });
}
function deleteTask(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "This task will be deleted",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter((task) => task.id !== id);
      updateTaskInLocalStorage(tasks);
      refreshTaskList();
      Swal.fire("Deleted!!", "Task has been deleted", "success");
    }
  });
}

function updateTaskInLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function refreshTaskList() {
  todoList.innerHTML = "";
  loadTasks();
}

let time = 25 * 60;
let timer;

function start() {
  if (timer) return;

  timer = setInterval(() => {
    time--;

    let min = Math.floor(time / 60);
    let sec = time % 60;
    document.getElementById("time").innerText =
      `${min}:${sec < 10 ? "0" : ""}${sec}`;

    if (time === 0) {
      alert("Hết giờ học!");
      clearInterval(timer);
    }
  }, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  time = 25 * 60;
  document.getElementById("time").innerText = "25:00";
}




// =======================
// TO DO LIST
// =======================

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

/* LOAD TASKS */
function loadTasks() {
  const data = localStorage.getItem("todos");
  if (data) {
    todoList.innerHTML = data;
  }
}
loadTasks();

/* SAVE TASKS */
function saveTasks() {
  localStorage.setItem("todos", todoList.innerHTML);
}

/* ADD TASK */
function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "todo-item";

  li.innerHTML = `
    <span class="circle"></span>
    <span class="text">${text}</span>
  `;

  todoList.appendChild(li);
  input.value = "";
  saveTasks();
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

/* TOGGLE DONE */
document.addEventListener("click", function (e) {
  const circle = e.target.closest(".circle");
  if (!circle) return;

  const item = circle.closest(".todo-item");
  item.classList.toggle("done");

  circle.classList.toggle("checked");
  circle.textContent =
    circle.classList.contains("checked") ? "✓" : "";

  saveTasks();
});
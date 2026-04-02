let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  let text = document.getElementById("taskInput").value;
  let date = document.getElementById("dueDate").value;

  if (text === "") {
    alert("Enter task!");
    return;
  }

  tasks.push({ text, date, completed: false });
  saveTasks();
  displayTasks();
}

function displayTasks(filteredTasks = tasks) {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let completedCount = 0;

  filteredTasks.forEach((task, index) => {
    if (task.completed) completedCount++;

    let today = new Date().toISOString().split("T")[0];
    let isLate = task.date && task.date < today;

    let li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${index})"
        class="${task.completed ? 'completed' : ''}"
        style="color:${isLate ? 'red' : ''}">
        ${task.text} (${task.date})
      </span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("progress").innerText =
    `Completed: ${completedCount} / ${tasks.length}`;
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function searchTask() {
  let query = document.getElementById("search").value.toLowerCase();

  let filtered = tasks.filter(task =>
    task.text.toLowerCase().includes(query)
  );

  displayTasks(filtered);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();

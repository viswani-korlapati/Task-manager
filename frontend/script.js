const baseUrl = "http://localhost:8080/api/tasks";

async function fetchTasks() {
    const res = await fetch(baseUrl);
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task.title} - ${task.description} 
            <button onclick="deleteTask(${task.id})">Delete</button>`;
        list.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    await fetch(baseUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, description: desc })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    fetchTasks();
}

fetchTasks();
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const priorityInput = document.getElementById('priority-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <div class="task-info">
                    <span>${task.text}</span>
                    <span>Category: ${task.category}</span>
                    <span>Priority: ${task.priority}</span>
                </div>
                <div class="task-actions">
                    <button onclick="toggleComplete(${index})">Complete</button>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        const taskCategory = categoryInput.value;
        const taskPriority = priorityInput.value;
        if (taskText !== '') {
            tasks.push({ text: taskText, category: taskCategory, priority: taskPriority, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.editTask = (index) => {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        const newTaskCategory = prompt('Edit category:', tasks[index].category);
        const newTaskPriority = prompt('Edit priority:', tasks[index].priority);
        if (newTaskText !== null && newTaskCategory !== null && newTaskPriority !== null) {
            tasks[index].text = newTaskText;
            tasks[index].category = newTaskCategory;
            tasks[index].priority = newTaskPriority;
            saveTasks();
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTaskBtn.addEventListener('click', addTask);

    renderTasks();
});

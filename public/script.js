async function fetchTodos() {
    const response = await fetch('/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.id = todo.id;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);
        li.appendChild(deleteButton);

        // Add cross-off functionality
        li.onclick = () => toggleDone(todo.id);

        // Add move up button
        const upButton = document.createElement('button');
        upButton.textContent = 'Up';
        upButton.onclick = (e) => {
            e.stopPropagation();
            moveTodoUp(todo.id);
        };
        li.appendChild(upButton);

        // Add move down button
        const downButton = document.createElement('button');
        downButton.textContent = 'Down';
        downButton.onclick = (e) => {
            e.stopPropagation();
            moveTodoDown(todo.id);
        };
        li.appendChild(downButton);

        if (todo.done) {
            li.style.textDecoration = 'line-through';
        }

        todoList.appendChild(li);
    });
}

async function addTodo() {
    const newTodoInput = document.getElementById('new-todo');
    const newTodo = {
        text: newTodoInput.value,
        done: false
    };
    await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    });
    newTodoInput.value = '';
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`/todos/${id}`, {
        method: 'DELETE'
    });
    fetchTodos();
}

async function toggleDone(id) {
    const response = await fetch(`/todos/${id}/toggle`, {
        method: 'PATCH'
    });
    fetchTodos();
}

async function moveTodoUp(id) {
    await fetch(`/todos/${id}/move-up`, {
        method: 'PATCH'
    });
    fetchTodos();
}

async function moveTodoDown(id) {
    await fetch(`/todos/${id}/move-down`, {
        method: 'PATCH'
    });
    fetchTodos();
}

document.addEventListener('DOMContentLoaded', fetchTodos);
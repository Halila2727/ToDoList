document.addEventListener('DOMContentLoaded', () => {
    const newTodoInput = document.getElementById('new-todo');
    const addButton = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    async function loadTodos() {
        try {
            const response = await fetch('http://localhost:3000/todos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const todos = await response.json();
            todoList.innerHTML = '';
            todos.forEach(todo => addTodoToDOM(todo));
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    async function addTodo() {
        const newTodoText = newTodoInput.value.trim();
        if (!newTodoText) return;

        try {
            const response = await fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newTodoText, completed: false }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const todo = await response.json();
            addTodoToDOM(todo);
            newTodoInput.value = '';
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async function deleteTodo(id, li) {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            todoList.removeChild(li);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    async function updateTodoStatus(id, completed) {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    }

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.dataset.id = todo._id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', async () => {
            try {
                await updateTodoStatus(todo._id, checkbox.checked);
                li.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            } catch (error) {
                checkbox.checked = !checkbox.checked; // Revert on error
            }
        });

        const textSpan = document.createElement('span');
        textSpan.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(todo._id, li));

        const upBtn = document.createElement('button');
        upBtn.textContent = '↑';
        upBtn.addEventListener('click', () => moveTodo(li, true));

        const downBtn = document.createElement('button');
        downBtn.textContent = '↓';
        downBtn.addEventListener('click', () => moveTodo(li, false));

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        li.appendChild(upBtn);
        li.appendChild(downBtn);

        if (todo.completed) {
            li.style.textDecoration = 'line-through';
        }

        todoList.appendChild(li);
    }

    function moveTodo(li, moveUp) {
        const sibling = moveUp ? li.previousElementSibling : li.nextElementSibling;
        if (sibling) {
            moveUp ? todoList.insertBefore(li, sibling) : todoList.insertBefore(sibling, li);
        }
        // Note: This doesn't update the order on the server. You'd need to implement that separately.
    }

    addButton.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    loadTodos();
});

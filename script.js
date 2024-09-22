document.getElementById('add-btn').addEventListener('click', function() {
    const newTodo = document.getElementById('new-todo').value;
    if (newTodo.trim() === '') return;
    
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            li.style.textDecoration = 'line-through';
        } else {
            li.style.textDecoration = 'none';
        }
        saveTodos();
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        document.getElementById('todo-list').removeChild(li);
        saveTodos();
    });

    const upBtn = document.createElement('button');
    upBtn.textContent = '^';
    upBtn.addEventListener('click', function() {
        move(li, true);
        saveTodos();
    });

    const downBtn = document.createElement('button');
    downBtn.textContent = 'v';
    downBtn.addEventListener('click', function() {
        move(li, false);
        saveTodos();
    });
    
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(newTodo));
    li.appendChild(deleteBtn);
    li.appendChild(upBtn);
    li.appendChild(downBtn);
    
    // TODO: Add new todo to the top of the list instead of the bottom
    document.getElementById('todo-list').appendChild(li);
    document.getElementById('new-todo').value = '';
    
    saveTodos();
});

function move(item, up) {
    const todoList = document.getElementById('todo-list');
    const index = Array.from(todoList.children).indexOf(item);

    if (up && index > 0) {
        todoList.insertBefore(item, todoList.children[index - 1]);
    } else if (!up && index < todoList.children.length - 1) {
        todoList.insertBefore(item, todoList.children[index + 2]);
    }
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        const todoText = li.childNodes[1].nodeValue;
        const isChecked = li.childNodes[0].checked;
        todos.push({ text: todoText, checked: isChecked });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
        todos.forEach(todo => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.checked;
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    li.style.textDecoration = 'line-through';
                } else {
                    li.style.textDecoration = 'none';
                }
                saveTodos();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                document.getElementById('todo-list').removeChild(li);
                saveTodos();
            });

            const upBtn = document.createElement('button');
            upBtn.textContent = '^';
            upBtn.addEventListener('click', function() {
                move(li, true);
                saveTodos();
            });

            const downBtn = document.createElement('button');
            downBtn.textContent = 'v';
            downBtn.addEventListener('click', function() {
                move(li, false);
                saveTodos();
            });
            
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(todo.text));
            li.appendChild(deleteBtn);
            li.appendChild(upBtn);
            li.appendChild(downBtn);
            
            document.getElementById('todo-list').appendChild(li);

            if (todo.checked) {
                li.style.textDecoration = 'line-through';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', loadTodos);
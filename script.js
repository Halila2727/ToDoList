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
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        document.getElementById('todo-list').removeChild(li);
    });

    const upBtn = document.createElement('button');
    upBtn.textContent = '^';
    upBtn.addEventListener('click', function() {
    move(li, true);
    });

    const downBtn = document.createElement('button');
    downBtn.textContent = 'v';
    downBtn.addEventListener('click', function() {
    move(li, false);
    });
    
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(newTodo));
    li.appendChild(deleteBtn);
    li.appendChild(upBtn);
    li.appendChild(downBtn);
    
    document.getElementById('todo-list').appendChild(li);
    document.getElementById('new-todo').value = '';
});

function move(item, directionUp) {
    const todoList = document.getElementById('todo-list');
    const todoArray = Array.from(todoList.children);
    const index = todoArray.indexOf(item);
    
    if (directionUp && index > 0) {
      // Move the item up
      todoList.insertBefore(item, todoList.children[index - 1]);
    } else if (!directionUp && index < todoArray.length - 1) {
      // Move the item down
      todoList.insertBefore(item, todoList.children[index + 1].nextSibling);
    }
}
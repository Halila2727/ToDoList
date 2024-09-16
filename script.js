document.getElementById('add-btn').addEventListener('click', function() {
    const newTodo = document.getElementById('new-todo').value;
    if (newTodo.trim() === '') return;

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(newTodo));

    document.getElementById('todo-list').appendChild(li);
    document.getElementById('new-todo').value = '';
  });
document.getElementById('add-btn').addEventListener('click', function() {
  const newTodo = document.getElementById('new-todo').value;
  if (newTodo.trim() === '') return;

  const li = document.createElement('li');
  li.textContent = newTodo;

  li.addEventListener('click', function() {
    document.getElementById('todo-list').removeChild(li);
  });

  document.getElementById('todo-list').appendChild(li);
  document.getElementById('new-todo').value = '';
});
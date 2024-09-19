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
  
  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(newTodo));
  li.appendChild(deleteBtn);
  
  document.getElementById('todo-list').appendChild(li);
  document.getElementById('new-todo').value = '';
});
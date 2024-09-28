const axios = require('axios');

// Example of posting a new todo
axios.post('http://localhost:3000/api/todos', {
    text: 'Learn how to post in run.js',
    done: false // set initial status of the todo
  })
  .then(response => {
    console.log('Todo created:', response.data);

    // Fetch and log the updated list of todos
    return axios.get('http://localhost:3000/api/todos');
  })
  .then(response => {
    console.log('Updated list of todos:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
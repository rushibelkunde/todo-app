// TodoItem.js
import React from 'react';
import axios from 'axios';

const TodoItem = ({ todo, token, currentTodos, setCurrentTodos }) => {
  const Url = "https://todo-app-rho-three-59.vercel.app"
  const { id, title, completed, created_at } = todo;

  const deleteTodo = () => {
    axios.delete(`${Url}/deleteTodo/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        console.log(response.data.message);
        const todos = [...currentTodos]
        const i = currentTodos.findIndex((t)=> t.id === id)
        if(i!==-1){
          todos.splice(i,1)
          setCurrentTodos(todos)
        }
        // onDelete()
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const toggleTodo = () => {
    axios.put(`${Url}/toggleTodo/${id}`, {}, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        console.log(response.data.message);
        const todos = [...currentTodos]
        const i = currentTodos.findIndex((t)=> t.id === id)
        if(i!==-1){
          todos[i].completed = !todos[i].completed
          setCurrentTodos(todos)
        }
        // onToggle(); // Refresh the todos list
      })
      .catch(error => {
        console.error('Error toggling todo:', error);
      });
  };

  return (
    <li className={`${completed ? 'bg-green-200' : 'bg-red-200'} p-2 flex gap-2 w-80 justify-around rounded-xl items-center`}>
      <h1 className='font-semibold'>{title}</h1>
      <button onClick={deleteTodo} className='font-extrabold text-red-600'>X</button>
      <input type="checkbox" value={completed} onChange={toggleTodo} checked={completed} />
      <span className='text-sm font-normal'>{new Date(created_at).toISOString().substring(0, 10)}</span>
    </li>
  );
};

export default TodoItem;
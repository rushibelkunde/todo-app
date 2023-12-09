// AddTodoForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTodoForm = ({ token,  setCurrentTodos, onSearch }) => {
  const Url = "https://todo-app-rho-three-59.vercel.app"
  const [newTodo, setNewTodo] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    setCurrentTodos((prev)=> [...prev, newTodo])
    setNewTodo('');
    axios.post(`${Url}/addTodo`, { title: newTodo }, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <form method='post' className='flex gap-2 w-full items-center justify-center mt-10'>
        <input
          type="text"
          name='todo'
          value={newTodo}
          placeholder='todo..'
          onChange={(e) => setNewTodo(e.target.value)}
          className='bg-slate-200 rounded-xl p-2'
        />
        <button
          type="submit"
          onClick={addTodo}
          className='bg-black rounded-xl p-2 text-white font-semibold'
        >
          Add todo
        </button>
      </form>

      <div className='flex gap-2 w-full items-center justify-center mt-2'>
        <input
          type="text"
          name='search'
          placeholder='Search...'
          onChange={(e) => handleSearch(e.target.value)}
          className='bg-slate-200 rounded-xl p-2'
        />
       
      </div>
    </div>
  );
};

export default AddTodoForm;

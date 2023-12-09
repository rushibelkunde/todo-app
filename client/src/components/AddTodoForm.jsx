// AddTodoForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTodoForm = ({ token,  setCurrentTodos, onSearch, onAdd }) => {
  const Url = "https://todo-app-rho-three-59.vercel.app"
  const [newTodo, setNewTodo] = useState('');
  const [disable, setDisable] = useState(false)
//   const [searchTerm, setSearchTerm] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    setDisable(true)
    axios.post(`${Url}/addTodo`, { title: newTodo }, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        console.log(response.data.message);
        setCurrentTodos((prev)=> [...prev, newTodo])
        setNewTodo('');
        setDisable(false)
        onAdd()
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
          className={`${disable? 'bg-gray-700': 'bg-black'} rounded-xl p-2 text-white font-semibold`}
          disabled = {disable}
        > 
          {disable? 'Adding...': 'Add todo'}
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

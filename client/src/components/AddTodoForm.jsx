// AddTodoForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddTodoForm = ({ token, setCurrentTodos, onSearch, onAdd, fetchCategories, categories }) => {
  const Url = "https://todo-app-rho-three-59.vercel.app"
  // const Url = "http://localhost:5000"
  const [newTodo, setNewTodo] = useState('');
  const [disable, setDisable] = useState(false)
  const [category, setCategory] = useState("")
  //   const [searchTerm, setSearchTerm] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo === "") {
      return alert("Todo can't be empty string")
    }
    if (category=="") {
      return alert("please create/select the category!!")
    }
    setDisable(true)
    axios.post(`${Url}/addTodo`, { title: newTodo, category_id: category }, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        console.log(response.data.message);
        onAdd()
        setDisable(false)
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm);
  };

  useEffect(()=>{
    fetchCategories()
  },[])

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
          required={true}
        />
        <select name="category" id="" value={category} onChange={(e)=> setCategory(e.target.value)}>
          <option value="">select</option>
          {categories.map((category)=>(
            <option value={category.id} onChange={(e)=> setCategory(e.target.value)}>{category.display_name}</option>
          ))}
        </select>
        <button
          type="submit"
          onClick={addTodo}
          className={`${disable ? 'bg-gray-700' : 'bg-black'} rounded-xl p-1 sm:p-2  text-white font-semibold`}
          disabled={disable}
        >
          {disable ? 'Adding...' : 'Add'}
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

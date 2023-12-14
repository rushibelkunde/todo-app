// Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import TodoList from './TodoList';
import axios from 'axios';
import AddTodoForm from './components/AddTodoForm';

import CategoryForm from './components/CategoryForm';

const Home = () => {
  // const Url = "http://localhost:5000";
  const Url = "https://todo-app-rho-three-59.vercel.app"

  const navigate = useNavigate();

  const [showCategory, setShowCategory] = useState(false)
  
  const token = localStorage.getItem('todoToken');
  const [categories, setCategories] = useState([])
 

  const signout = () => {
    localStorage.removeItem("todoToken");
    alert("Sign Out Successfully");
    navigate('/login');
  }

  const fetchCategories = () => {
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to retrieve categories
    axios.get(`${Url}/categories`,{
      headers:{
        Authorization: token
      }
    })
      .then(response => {
        console.log(response.data)
        setCategories(response.data);
        // setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        // setLoading(false);
      });
  };


  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  

  return (
    <div>
      
      <h1 className='text-3xl m-2 text-center font-bold mt-5'>Todo-App</h1>
      <div className='flex gap-2 items-center justify-center m-5'>
        <button onClick={signout} className='bg-red-700 text-white font-bold p-2 rounded-xl'>
          Signout
        </button>
        <button className='bg-zinc-200 p-2 rounded-xl font-semibold' onClick={()=>setShowCategory(!showCategory)}>
        {showCategory? <span className='text-red-600 font-bold'>close</span>: "Create Catagory"}
        </button>
      </div>
      <div className=''>
        {showCategory? <CategoryForm token={token} fetchCategories={fetchCategories} categories={categories} setCategories={setCategories} />: ""}
      </div>
     
      <TodoList token={token} categories={categories} fetchCategories={fetchCategories}  />
    </div>
  );
};

export default Home;

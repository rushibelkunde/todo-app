// Home.js
import React from 'react';
import { useNavigate } from 'react-router';
import TodoList from './TodoList';
import axios from 'axios';
import AddTodoForm from './components/AddTodoForm';

const Home = () => {
  // const Url = "http://localhost:5000";
  const Url = "https://todo-app-rho-three-59.vercel.app"

  const navigate = useNavigate();
  const token = localStorage.getItem('todoToken');

  const signout = () => {
    localStorage.removeItem("todoToken");
    alert("Sign Out Successfully");
    navigate('/login');
  }

  return (
    <div>
      <h1 className='text-3xl m-2 text-center font-bold mt-5'>Todo-App</h1>
      <div className='flex gap-2 items-center justify-center m-5'>
        <button onClick={signout} className='bg-red-700 text-white font-bold p-2 rounded-xl'>
          Signout
        </button>
      </div>
      <TodoList token={token} Url={Url} />
    </div>
  );
};

export default Home;

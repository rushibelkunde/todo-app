import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Login = () => {
    
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const handleLogin = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/login`, { username, password })
          .then(response => {
            setToken(response.data.token);
            localStorage.setItem("todoToken", response.data.token)
            alert("logged in successfully")
            navigate('/')
          })
          .catch(error => {
            alert("invalid credentials")
            console.error('Error logging in:', error);
          });
      };

      useEffect(()=>{
        if(localStorage.getItem("todoToken")){
            navigate('/')
        }
      },[])
  return (
    <div>
        <h1 className='text-center font-semibold text-2xl mt-60 mb-5'>Login</h1>
        <form method="post" className='flex flex-col w-72 gap-2 m-auto'>
            <input type="text" value={username} name="username" className='bg-slate-100 p-2 rounded-xl'
            onChange={(e)=>setUsername(e.target.value)} id="" placeholder='username' />

            <input type="password" value={password} name="password" className='bg-slate-100 p-2 rounded-xl'
            onChange={(e)=>setPassword(e.target.value)} id="" placeholder='password'/>

            <button type="submit" onClick={handleLogin} 
            className='bg-black w-32 rounded-xl p-2 text-white font-semibold m-auto'>Login</button>
        </form>
        <h1 className='text-center text-zinc-500 mt-2'>don't have an account? 
            <span className='font-semibold ml-2 cursor-pointer text-black' onClick={()=>navigate('/register')}>
              Register</span>
              </h1>

    </div>
  )
}

export default Login
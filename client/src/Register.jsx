import React, { useState } from 'react'

import axios from 'axios'
import { redirect, useNavigate } from 'react-router'

const Register = () => {
  const Url = "https://todo-app-rho-three-59.vercel.app"
    // const Url = "http://localhost:5000"
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [disable, setDisable] = useState(false)

    const navigate = useNavigate()
    
    const handleRegister = (e) => {
        e.preventDefault()
        setDisable(true)

        if(localStorage.getItem('todoToken')){
            localStorage.removeItem('todoToken')
        }
        console.log(username, password)
        axios.post(`${Url}/register`, { username, password })
          .then((response)=> {
            if(response.data.message.code == "ER_DUP_ENTRY"){
              console.log(response)
                return alert("User already exist")
            }
                alert("User Registered");
                setDisable(false)
                navigate('/login')
                
          })
          .catch(error => {
            alert("error",error)
            console.error('Error registering user:', error);
          });
      };
  return (
    <div>
        <h1 className='text-center font-semibold text-2xl mt-60 mb-5'>Register</h1>
        <form method="post" className='flex flex-col w-72 gap-2 m-auto'>
            <input type="text" value={username} name="username" className='bg-slate-100 p-2 rounded-xl'
            onChange={(e)=>setUsername(e.target.value)} id="" placeholder='username' />

            <input type="password" value={password} name="password" className='bg-slate-100 p-2 rounded-xl'
            onChange={(e)=>setPassword(e.target.value)} id="" placeholder='password'/>

            <button type="submit" onClick={handleRegister} 
            className='bg-black w-32 rounded-xl p-2 text-white font-semibold m-auto' disabled={disable}>
              {disable? 'Registering...' : "Register"}
              </button>

            <h1 className='text-center text-zinc-500'>already have an account? 
            <span className='font-semibold ml-2 cursor-pointer text-black' onClick={()=>navigate('/login')}>
              LogIn</span>
              </h1>


        </form>

    </div>
  )
}

export default Register
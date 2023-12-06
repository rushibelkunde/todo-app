import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const Home = () => {

  const Url = "https://todo-app-rho-three-59.vercel.app"
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('todoToken'))
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const signout = () => {
    localStorage.removeItem("todoToken")
    alert("Sign Out Successfully")
    navigate('/login')
  }

  const fetchTodos = () => {
    // Replace the URL with your Express server endpoint for fetching todos
    axios.get(`${Url}/todos`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };

  const addTodo = (e) => {
    e.preventDefault()
    // Replace the URL with your Express server endpoint for adding a todo
    axios.post(`${Url}/addTodo`, { title: newTodo }, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        console.log(response.data.message); // Log success message
        setNewTodo(''); // Clear the input field
        fetchTodos(); // Refresh the todos list
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  const deleteTodo = (todoId) => {
    // Replace the URL with your Express server endpoint for deleting a todo
    axios.delete(`${Url}/deleteTodo/${todoId}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        console.log(response.data.message); // Log success message
        fetchTodos(); // Refresh the todos list
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const toggleTodo = (todoId) => {
    // Replace the URL with your Express server endpoint for toggling a todo
    console.log(token)
    axios.put(`${Url}/toggleTodo/${todoId}`, {}, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        console.log(response.data.message); // Log success message
        fetchTodos(); // Refresh the todos list
      })
      .catch(error => {
        console.error('Error toggling todo:', error);
      });
  };




  useEffect(() => {
    if (!token) {
      navigate('/login')

    }
    console.log(token)
    fetchTodos()

  }, [])
  return (
    <div>
      <h1 className=' text-3xl m-2 text-center font-bold mt-5'>Todo-App</h1>
      <div className='flex gap-2 items-center justify-center m-5'>
        <button onClick={signout} className='bg-red-700 text-white font-bold p-2 rounded-xl'>
          Signout
        </button>


      </div>

      <form method='post' className='flex gap-2 w-full items-center justify-center mt-10'>

        <input type="text" name='todo' value={newTodo} placeholder='todo..'
          onChange={(e) => setNewTodo(e.target.value)} className='bg-slate-200 rounded-xl p-2' />
        <button type="submit" onClick={addTodo} className='bg-black rounded-xl p-2 text-white font-semibold'>add todo</button>
      </form>

      <br />
      <ul className='flex flex-col items-center  gap-2'>
        {todos.map(todo => (
          <li key={todo.id} className={`${todo.completed ? 'bg-green-200' : 'bg-red-200'} p-2 flex gap-2 w-80 justify-around rounded-xl items-center`}>
            <h1 className='font-semibold'>{todo.title}</h1>
            <button onClick={() => deleteTodo(todo.id)} className=' font-extrabold text-red-600'>X</button>
            {console.log(todo.completed)}
            <input type="checkbox" name="" id="" value={todo.completed} onChange={() => toggleTodo(todo.id)} checked={todo.completed} />
            <span className=' text-sm font-normal'>{new Date(todo.created_at).toISOString().substring(0, 10)}</span>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Home
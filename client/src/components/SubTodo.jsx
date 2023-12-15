import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubTodo = ({ todoId, token }) => {
    const [subTodos, setSubTodos] = useState([]);
    const [newSubTodo, setNewSubTodo] = useState('');
    const [loading, setLoading] = useState(false)
    const Url = "https://todo-app-rho-three-59.vercel.app"
    // const Url = "http://localhost:5000"

    useEffect(() => {
        // Fetch subtodos when the component mounts
        fetchSubTodos();
    }, [todoId]);

    const fetchSubTodos = () => {
        setLoading(true)
        axios.get(`${Url}/subtodos/${todoId}`, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                setSubTodos(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching subtodos:', error);
                setLoading(false)
            });
    };

    const toggleSubTodo = (subTodoId) => {
        axios.put(`${Url}/toggleSubTodo/${subTodoId}`, {}, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                console.log(response.data.message);
                // Refresh the subtodos list
                fetchSubTodos();
            })
            .catch(error => {
                console.error('Error toggling subtodo:', error);
            });
    };

    const deleteSubTodo = (subTodoId) => {
        axios.delete(`${Url}/deleteSubTodo/${subTodoId}`, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                console.log(response.data.message);
                // Refresh the subtodos list
                fetchSubTodos();
            })
            .catch(error => {
                console.error('Error deleting subtodo:', error);
            });
    };

    const addSubTodo = () => {
        axios.post( `${Url}/addSubTodo`, { title: newSubTodo, todoId }, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                console.log(response.data.message);
                setNewSubTodo('');
                // Refresh the subtodos list
                fetchSubTodos();
            })
            .catch(error => {
                console.error('Error adding subtodo:', error);
            });
    };

    return (
        <div className='w-80 bg-slate-300 rounded-xl p-2'>
            <div className='flex gap-2 justify-center '>
                <input
                    type="text"
                    value={newSubTodo}
                    onChange={(e) => setNewSubTodo(e.target.value)}
                    className='p-1 bg-slate-100 rounded-xl'
                    placeholder='add subtodo..'
                />
                <button onClick={addSubTodo} className='bg-black text-white p-2 rounded-xl'>Add</button>
            </div>
            <h1 className='text-center font-semibold mt-2'>SubTodos</h1>
            <ul className='flex flex-col items-center mt-2 gap-2'>
                {subTodos.map(subTodo => (
                    <li key={subTodo.id}
                    className={`${subTodo.completed ? 'bg-green-200' : 'bg-red-200'} p-2 flex gap-2 w-60 justify-around rounded-xl items-center`}>
                        <input
                            type="checkbox"
                            value={subTodo.completed}
                            onChange={() => toggleSubTodo(subTodo.id)}
                            checked={subTodo.completed}
                            className='p-2 bg-slate-100 rounded-xl'
                        />
                        <span>{subTodo.title}</span>
                        <button onClick={() => deleteSubTodo(subTodo.id)} >
                        <img src="delete.png" alt="" width={30}/>
                        </button>
                    </li>
                ))}
            </ul>
            {loading? 
         <div role="status" className='mt-10 m-auto'>
         <svg aria-hidden="true" className="m-auto w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
         </svg>
         <span className="sr-only">Loading...</span>
       </div> :
       ""}

        </div>
    );
};

export default SubTodo;

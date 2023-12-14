import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubTodo = ({ todoId, token }) => {
    const [subTodos, setSubTodos] = useState([]);
    const [newSubTodo, setNewSubTodo] = useState('');

    const Url = "https://todo-app-rho-three-59.vercel.app"
    // const Url = "http://localhost:5000"

    useEffect(() => {
        // Fetch subtodos when the component mounts
        fetchSubTodos();
    }, [todoId]);

    const fetchSubTodos = () => {
        axios.get(`${Url}/subtodos/${todoId}`, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                setSubTodos(response.data);
            })
            .catch(error => {
                console.error('Error fetching subtodos:', error);
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
            <ul className='flex flex-col items-center mt-2'>
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
        </div>
    );
};

export default SubTodo;

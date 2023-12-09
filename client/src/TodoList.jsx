// TodoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import Pagination from './components/Pagination';
import AddTodoForm from './components/AddTodoForm';

const TodoList = ({ token, Url }) => {
    
  const [todos, setTodos] = useState([]);
  const [currentTodos, setCurrentTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const fetchTodos = () => {
    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    axios.get(`${Url}/todos`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        setTodos(response.data);
        const filteredTodos = response.data.filter(todo =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCurrentTodos(filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo));
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        localStorage.removeItem('todoToken')
      });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTodos();
  }, [currentPage, token, Url, searchTerm]);

  return (
    <div>
      <AddTodoForm token={token} onSearch={handleSearch} setCurrentTodos={setCurrentTodos} />
      <ul className='flex flex-col items-center gap-2 mt-5'>
        {currentTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} token={token} currentTodos={currentTodos} setCurrentTodos={setCurrentTodos} />
        ))}
      </ul>
      <Pagination totalItems={todos.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default TodoList;

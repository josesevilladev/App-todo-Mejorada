import { useState, useEffect, useRef } from 'react'



function App() {
  const inputRef = useRef(null);
   const [todos, setTodos] = useState( () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [todoInput, setTodoInput] = useState('');

  const handleTodoInputChange = () => {
     if (todoInput.trim() === '') return;
  setTodos(prev => [...prev, todoInput]);
  setTodoInput('');
  };
 useEffect(() => {
  
inputRef.current.focus();

 }, [todos]);



  useEffect(() => {
     localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  return (
    <>
     <h1>My Todo App</h1>

<section className="inputs">
    <input ref={inputRef}  type="text" placeholder="Add a new todo item" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
    <button onClick={handleTodoInputChange}>Add</button>
    </section>
    <section className='todos'>{todos.map((todo, index) => (
      <div key={index}>{todo} <button onClick={() => setTodos(todos.filter((_, i) => i !== index))}>❌</button> </div>
    ))}</section>

    </>
  )
}


export default App

import { useState } from 'react';
import { ToDoForm } from './components/ToDoForm/ToDoForm';
import { ToDoItem } from './components/ToDoItem/ToDoItem';
import './App.css';

function App() {
  const [tasks, setTask] = useState([]);
  const addTask = (text) => {
    if(text){
      let item = {
        id: tasks.length,
        text: text
      }
      setTask([...tasks, item]);
      console.log(item)
    }
    
  }
  const deleteTask = (id) => {
    setTask([...tasks.filter((e)=> e.id !== id)]);
  }
  return (
    
    <div className='toDoAPP'>
      <h1>TO DO List</h1>
      <div className='container'>
          <ToDoForm setTask = {addTask}/>
        <hr style={{marginBottom : 15}}/>
        {tasks.map((todo) => <ToDoItem todo = {todo} id = {todo.id}  key = {todo.id} deleteTask = {deleteTask}/>)}
      </div>
    </div>

  );
}

export default App; 

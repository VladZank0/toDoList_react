import { useState } from 'react';
import { ToDoForm } from './components/ToDoForm/ToDoForm';
import { ToDoItem } from './components/ToDoItem/ToDoItem';
import './App.css';

function App() {
  const [tasks, setTask] = useState(window.localStorage.getItem('items') ? JSON.parse(window.localStorage.getItem('items')) : []);
  const addTask = (text) => {
    if(text){
      let item = {
        id: tasks.length,
        text: text,
        completed: false
      }
      let newState = [...tasks, item];
      window.localStorage.setItem('items', JSON.stringify(newState));
      setTask(newState);
      console.log(item)
    }
    
  }
  const deleteTask = (id) => {
    let newState = [...tasks.filter((e)=> e.id !== id)];
    window.localStorage.setItem('items', JSON.stringify(newState));
    setTask(newState);
  }
  
  const completed = (id) => {
    let newState = [...tasks.filter((e)=> e.id === id ? {...e.completed = !e.completed}  : e)]; 
    //! Обязательны {} так как нужно если e.id === id вернуть именно объект, без них мы просто изменим свойство, а самого объекта не будет
    window.localStorage.setItem('items', JSON.stringify(newState));
    setTask(newState);
  }
  // const completed = (id) => {
  //   let newState = tasks.filter((e)=>{
  //     if(e.id === id){
  //       e.completed = !e.completed;
  //     } 
  //     return e;
  //   });
  //   window.localStorage.setItem('items', JSON.stringify(newState));
  //   setTask(newState);
  // }
  return (
    
    <div className='toDoAPP'>
      <h1>TO DO List</h1>
      <div className='container'>
          <ToDoForm setTask = {addTask}/>
        <hr style={{marginBottom : 15}}/>
        {tasks.map((todo) => <ToDoItem todo = {todo} id = {todo.id} toggleComplete = {completed} key = {todo.id} deleteTask = {deleteTask}/>)}
      </div>
    </div>
    
  );
}

export default App; 

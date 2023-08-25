import './App.css';
import './responsive.css';
import { useState } from 'react';
import { TaskList } from './components/TaskList/TaskList';
import { ListAddButton } from './components/ListAddButton';
import { ContentItem } from './components/ContentItem/ContentItem';

import DB from './assets/db.json';

function App() {
  
  const [lists, setLists] = useState( 
    window.localStorage.getItem('items') ? JSON.parse(window.localStorage.getItem('items')) : []
    //      DB.lists.map((item) => {
    //     item.color = DB.colors.filter(color => item.colorId == color.id)[0].name;
    //     item.tasks = DB.tasks.filter(list => list.listId == item.id);
    //     return item;
  );
 
  const [activeList, activateList] = useState(window.localStorage.getItem('activeList') ? JSON.parse(window.localStorage.getItem('activeList')) : 0);
  const spreadList = (item) => {
    let newLists = [...lists, item];
    setLists(newLists);
    window.localStorage.setItem('items', JSON.stringify(newLists));
    onActiveList(item.id);
  };
  const onActiveList = (id) => {
    activateList(id);
    window.localStorage.setItem('activeList', JSON.stringify(id));
  };
  const onDeleteList = (id) => {
    let newLists = [...lists.filter((e) => e.id !== id)];
    setLists(newLists);
    window.localStorage.setItem('items', JSON.stringify(newLists));
  };
  const onDeleteTask = (id) => {
    let newLists = [...lists.map((e) => { return {...e, tasks: e.tasks.filter((task) => task.id != id)}})];
    setLists(newLists);
    window.localStorage.setItem('items', JSON.stringify(newLists));
  };
  const deleteAll = () => {
    let newLists = [];
    setLists(newLists);
    window.localStorage.setItem('items', JSON.stringify(newLists));
  }
  const onCompleteTask = (taskId) => {
    let newLists = [...lists.map((e) => {return {...e, tasks: e.tasks.map((task) => taskId === task.id ? {...task, completed: !task.completed} : task)}})];
    setLists(newLists);
    window.localStorage.setItem('items', JSON.stringify(newLists));
  }
  const onAddTask = (task) => {
    let newLists = [...lists.map((e) => task.listId == e.id ? {...e, tasks: [...e.tasks, task]} : e)];
    setLists(newLists);
    window.localStorage.setItem('items', JSON.stringify(newLists));
  }
  const onChangeTitle = (listId, title) => {
    let newLists = [...lists.map((e) => e.id === listId ? {...e, name: title} : e )];
    setLists(newLists);
    window.localStorage.setItem('items', JSON.stringify(newLists));
  }
  

  const [isBurgerShown, setBurger] = useState(false);

  return (
    
    <div className='APP'>
      {/* <h1>TO DO List</h1> */}
      <div className='container'>
        <div className='APP__inner'>
            <div className={isBurgerShown ? 'sidebar active' : 'sidebar'}> 

              <div onClick={()=>setBurger(!isBurgerShown)} className = {isBurgerShown ? 'burger-btn active' : 'burger-btn'}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              {lists.length >= 1 ?  
                (<li onClick={()=>{onActiveList('AllTasks'); setBurger()}}  className = {activeList ==  'AllTasks' ? 'taskList__item active' : 'taskList__item'}>
                    <span  className = 'taskList__item-iconAll'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="#000">
                            <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="#7C7C7C"/>
                        </svg>
                    </span>
                    <span className='taskList__item-text'><abbr title = 'Все задачи' >Все задачи</abbr></span>
                    <span onClick={()=> {let res = global.confirm('Вы уверены, что хотите удалить все списки и их содержимое?'); res && deleteAll();}} className='taskList__item-iconDelete'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z" fill="black"/>
                        </svg>
                    </span>
                  </li>) : null
              }
              <TaskList setBurger={setBurger} lists = {lists} onActiveList = {onActiveList} onDeleteList = {onDeleteList} activeList = {activeList}/> 
              <ListAddButton colors = {DB.colors} lists = {lists} spreadList = {spreadList}/>
            </div>
            <div className='content'>
                {activeList == null && lists.length != 0 && <h2>Выберите список задач</h2>}
                {activeList == 'AllTasks' 
                ? lists.map((e) => <ContentItem activeList = {activeList} key={e.id} list = {e} onDeleteTask = {onDeleteTask} onCompleteTask = {onCompleteTask}/>) 
                : lists.map((e) => e.id == activeList && <ContentItem key = {e.id} list = {e} onChangeTitle = {onChangeTitle} onDeleteTask = {onDeleteTask} onCompleteTask = {onCompleteTask} onAddTask = {onAddTask}/>)
                }
            </div>
        </div>
      </div>
    </div>
    
  );
}

export default App; 

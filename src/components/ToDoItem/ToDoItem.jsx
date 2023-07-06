import './ToDoItem.css'
export const ToDoItem = (props) => {
    
    return(
        <div className='todo-item'>
            <p onClick = {()=>{props.toggleComplete(props.id)}} className = {props.todo.completed === true ? 'completed' : '' }>{props.todo.text}</p>
            <button onClick={()=>{props.deleteTask(props.id)}}>x</button>
        </div>
    )
}
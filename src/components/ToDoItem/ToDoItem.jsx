import './ToDoItem.css'
export const ToDoItem = (props) => {
    return(
        <div className='todo-item'>
            <p >{props.todo.text}</p>
            <button onClick={()=>{props.deleteTask(props.id)}}>x</button>
        </div>
    )
}
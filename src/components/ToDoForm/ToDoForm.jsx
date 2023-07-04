import { useState } from 'react'
import './ToDoForm.css'
export const ToDoForm = (props) => {
    const [text, setText] = useState('');
    return(
        <div className='todo-form'>
            <input onKeyDown={(event)=>{if(event.key === "Enter" ){props.setTask(text); setText('')}}} onChange={(e) => setText(e.target.value)} value = {text} type="text" placeholder='Input some task...'/>
            <button onClick={() =>{props.setTask(text); setText('')}}>ADD TASK</button>
        </div>
    )
}
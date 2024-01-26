import React, { useEffect, useState } from 'react'
import {CheckCircleFill, CircleFill, Trash3Fill} from 'react-bootstrap-icons'
import './Home.css'
import axios from 'axios';
function Home() {
    const [todos , setTodos] = useState([]);
    const [task , setTask] = useState();
    
    useEffect(()=>
    {
        axios.get('http://localhost:3001/get')
        .then(result=>setTodos(result.data))
        .catch(error=>console.log(error))
    }, [])

    const handleClick = () => {
        axios.post('http://localhost:3001/add', {task: task})
        .then (result => console.log(result))
        .catch(error=> console.log(error))
    }
    const handleEdit = (id) =>
    {
        axios.put('http://localhost:3001/update/'+ id)
        .then (result => console.log(result))
        .catch(error=> console.log(error))
    }
  return (
    <div>
    <div className='heading'>
   <h1> To Do List </h1>
  </div>
  <div className='body'>
    <input type='text' placeholder='Enter Task Here' className='field' onChange={(e)=> setTask(e.target.value)}/>
    <button  className='button'  onClick={handleClick}>Add </button>
  </div>
  <div className='records'>
    {
        todos.length === 0 
        ?
        <div>
            <h2>No Records</h2>
            </div> 
        :
        todos.map(todo=>(
            <div className='task'>
                <div className='checkbox' onClick={()=>handleEdit(todo._id)}>
                    {todo.done ? 
                    <CheckCircleFill className='icon'></CheckCircleFill>
                :
                 <CircleFill className="icon"/>
                    }
               <p>{todo.task}</p>
               <div>
                <span><Trash3Fill className='icon'/></span>
                </div>
               </div>
                </div>
                
        ))
    }
  </div>
  </div>
  )
}

export default Home

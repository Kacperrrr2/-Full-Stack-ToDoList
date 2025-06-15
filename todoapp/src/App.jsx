import React, { useEffect, useState } from 'react'
import {Plus,Trash2} from 'lucide-react';
import { createTodo, deleteTodo, getAllTodos, updateTodo } from '../axios';
const App = () => {
  const[tasks,setTasks] =useState([])
  const[newTask,setNewTask]=useState("")

  const completedTasks= tasks.filter((task)=>task.isCompleted).length;
  const totalTasks= tasks.length
  //fetch task from backend
  useEffect(()=>{
    const fetchData= async()=>{
      try {
        const todo= await getAllTodos()
        setTasks(todo)
        console.log(todo)
      } catch (error) {
        console.log("Failed to fetch todos",error)
        
      }
    }
    fetchData()
  },[])

  const handleAddTask = async()=>{
    if(!newTask.trim()) return;
    try {
      const todo= await createTodo({title:newTask})
      setTasks((prev)=>[...prev, todo])
      setNewTask("")
    } catch (error) {
      console.log("Failed to adding todo",error)
      
    }
  }
//handle task completion
const handleToogleCompeter = async(task)=>{
  
    try {
      
      const updated= await updateTodo(task._id,{
        isCompleted: !task.isCompleted
      })     
      setTasks((prev=>prev.map((t)=>(t._id===task._id ? {...t, isCompleted: updated.isCompleted}:t))))
    
    } catch (error) {
      console.log("Failed to updating todo",error)
    }
}

// handleDelete
const handleDelte= async (id)=>{
  try {
    await deleteTodo(id)
    setTasks((prev)=>prev.filter((t)=> t._id !==id))
  } catch (error) {
    console.log("Failed to deleting todo",error)
  }
  
}

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4'>
      {/* header */}
      <div className='text-center mb-8'>
        <h1 className='text 4xl font-bold text-gray-800 mb-2'>Todo List</h1>
        <p className='text-gray-600'> You have {completedTasks} out of {totalTasks} tasks completed</p>
      </div>
      <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
        <div className='flex gap-4'>
          <input type="text"
          placeholder='Add a new task'
          value={newTask}
          onChange={(e)=>setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask(); 
            }
            if (e.key==="Delete"){
              setNewTask("")
            }
          }}
          
          className='w-full p-3 border border-gray-300 rounded-1g focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button onClick={handleAddTask} className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-1g font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-1g'>
            <Plus/>
            <p>Add Tasks</p>
          </button>
        </div>
        {/* task list */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='divide-y divide-gray-200'>
            {tasks.map((task)=>(
              <div key={task._id}
              className='flex items-center justify-between p-4 hover:bg-gray-50 trasnsition-colors duration-200'
              >
                <div>
                <input type='checkbox'
                checked={task.isCompleted}
                onChange={()=>handleToogleCompeter(task)}
                className='h-5 w-5 rounded border-gray-300 focus:ring-blue-500'
                />

                </div>
                <span>

                {task.title}

                </span>
                
                <button onClick={()=>handleDelte(task._id)}>
                <Trash2/>
                </button>

              </div>
            ))}
          </div>
        
        
        </div>

      </div>
      <div className='mt-6 text-center text-gray-600'>
        <p className='text-lg'>
          you have {totalTasks-completedTasks} task remaining
        </p>

      </div>
    </div>

  )
}

export default App
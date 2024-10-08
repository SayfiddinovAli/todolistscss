import logo from './logo.svg';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState } from 'react';

const Item =({task ,removeTask,index ,changeCompleted ,changeTasks})=>{
  const [isHover,setIsHover] = useState(false);
  const [value ,setValue]=useState(task.title);
  const[readOnly, setReadOnly]=useState(true);
  
  useEffect(()=>{
   console.log("hover holati o'zgardi"+index +"-element")
  },[isHover])


  return    <li className={`rounded overflow-hidden ${task.completed && "completed" || ""}`}
  onMouseEnter={()=>setIsHover(true)}
  onMouseLeave={()=>setIsHover(false)}
  onDoubleClick={()=>changeCompleted(!task.completed , index)}
  >
  
  
  <input type="text" 
  className="form-control"
   value={value} 
   readOnly={readOnly}
   onChange={(e)=>setValue(e.target.value)}
    />
  <div className={`${!isHover&& "d-none" || ""}`} >
  
  {
    !readOnly &&(
      <button className='btn btn-success ' 
  onClick={()=>{changeTasks(value ,index)}}>
   <FontAwesomeIcon icon={faCheck}/>
   </button> 

    )
  }
   {/* O'zgartrish uchun */}
  {
    readOnly &&(
      <button className='btn btn-warning  ' 
  onClick={()=>{setReadOnly(false)}}>
    
   <FontAwesomeIcon icon={faPen}/>
   </button>
    )
  }
{/* delete uchun */}
<button className='btn btn-danger ' 
  onClick={()=>removeTask(index)}>
   <FontAwesomeIcon icon={faTrash}/>
   </button>

  </div>
 
</li>

}

function App() {
  const [value , setValue]= useState("")
  const [tasks, setTasks]= useState([
    {
      title:"new task 01",
      completed:false,
    },
    {
      title:"new task 01",
      completed:false,
    },
    {
      title:"new task 03",
      completed:true,
    },
  ]);

  const uncompletedTaks=tasks.filter((task)=>!task.completed);
  const completedTaks=tasks.filter((task)=>task.completed);

  const deleteAll =()=>setTasks([]);

  const addTask =()=>{
    setTasks([ ...tasks, {title:value ,completed:false}]);
    setValue("")
  };
 
  const changeCompleted =(completedStatus,index)=>{
    const copy=[...tasks];
    copy[index].completed =completedStatus;
    setTasks(copy)
  }
  const changeTasks =(value ,index)=>{
    const copy=[...tasks];
   copy[index].title =value;
    setTasks(copy)
  }

  const removeTask =(index)=>{
   const copy=[...tasks];
   copy.splice(index , 1);
    setTasks(copy)
  }

  console.log(uncompletedTaks ,completedTaks);
  return (
    <div className="App">

      <div className="container py-5">
        <div className="mt-5 row justify-content-center ">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="bg-white rounded shadow py-3 overflow-hidden ">
              <h2 >Todo App</h2>
            
              <div className='d-flex aligin-items-center mb-4'>
                <input 
                type="text"
                value={value}
                onChange={(e)=>{
                  setValue(e.target.value);
                }}
                 className='form-control ms-3 me-3'  />
                <button className='btn btn-primary me-3' onClick={addTask}><FontAwesomeIcon icon={faPlus}/></button>
                
              </div>
              <ul className={`tasklist ms-3 me-3 mb-4 `}>
                {tasks.map((task , index  )=>( 
                    
                   <Item 
                   key={index + task.title}
                   task={task} 
                   removeTask={removeTask}
                    index={index} 
                    changeCompleted={changeCompleted}
                    changeTasks={changeTasks}/>
                ))}
                
              </ul>

              <div className='d-flex align-items-center justify-content-between me-3 ms-3'>
              <span>You have {uncompletedTaks.length} pending taks</span>
                  <button className='btn btn-primary' onClick={deleteAll}><FontAwesomeIcon icon={faTrash}/> Clear All</button>
                
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;

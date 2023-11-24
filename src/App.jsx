import React, { useState, useEffect, useRef } from "react";
import "./Styles.scss";



const TodoList = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null); 
  const inputRef = useRef(null);

useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  
  const task = { id: Date.now(), text: value};
  
  const addTask = () => {
    if (value === "") {
      alert("Please add a task");
      return;
    }
    setTasks([...tasks, task]);
    setValue("");
   localStorage.setItem('tasks', JSON.stringify([...tasks, task]))
    CreateTask(false);
    
  };

  const removeItem = (idToRemove) => {
    const task = tasks.filter((item) => item.id !== idToRemove);
    setTasks(task);
    const UpdatedLocalTask = JSON.stringify(task);
    localStorage.setItem('tasks', UpdatedLocalTask)
  };
 
  const CreateTask = () =>{
    if(add == false){
      setAdd(true)
    }else{
      setAdd(false)
    }
    inputRef.current.focus();
}
  const EditTaskView = () =>{
    if(edit == false){
      setEdit(true)
    }else{
      setEdit(false)
    }
}

const EditTask = (taskId) => {
  const taskToEdit =  tasks.find((task) => task.id === taskId)
  if(taskToEdit){
    setEdit(true);
    setEditedTaskText(taskToEdit.text);
    setEditingTaskId(taskId)
  }
}

useEffect(() => {
  inputRef.current?.focus();
},[edit]);

const saveEdit = () => {
  if (editingTaskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === editingTaskId) {
        return { ...task, text: editedTaskText };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEdit(false);
    setEditedTaskText("");
    setEditingTaskId(null); 
    const updatedLocalTasks = JSON.stringify(updatedTasks);
  localStorage.setItem('tasks', updatedLocalTasks);
  }
};




  return (
    <div className="wrapper">
      <div className="header"><h3>TODO-LIST</h3>
      <button onClick={CreateTask}>Add task <i class="fi fi-rr-layer-plus"></i> </button>
        </div>
      {add && 
      <div className="CreateView">
        <p onClick={CreateTask} className="closeBtn"><i class="fi fi-rr-cross"></i></p>
        <div className="AddBox">
          <h2>Add a task</h2>
          <div className="input">
          <input
            type="text"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <button onClick={addTask}>Add</button>
          </div>
        </div>
      </div> 
      }


      {
      tasks?.map((list) => (
        <div key={list.id} className="main">

{edit ? (
      
      <div className="EditView">
      <p onClick={EditTaskView} className="closeBtn"><i class="fi fi-rr-cross"></i></p>
          <button onClick={() => saveEdit(list.id)} >Save</button>
          <input type="text" ref={inputRef} value={editedTaskText} onChange={(e) => setEditedTaskText(e.target.value) } required />
      </div>


    ) : (

<div className="task">
          <p>{list.text}</p>
          <div className="editDelete">
          <button onClick={ () => EditTask(list.id)}><i class="fi fi-rr-edit"></i></button>
          <button
            onClick={() => {
              const confirm = window.confirm("Are you sure you want to delete this Task?");
              if (confirm) {
                removeItem(list.id);
              } else {
                alert("Not deleted!");
              }
            }}
          >
           <i class="fi fi-rr-trash"></i>
          </button>
          </div>
      </div>

  )}
  </div>
      ))}

    </div>
  );
};

export default TodoList;

// import React from "react";
// import { useState } from "react";

// const App = () => {
//   const [colorPicker, setColorPicker] = useState("black");

//   const style = {
//     backgroundColor: colorPicker,
//   };
//   return (
//     <>
//       <div style={style}>App</div>
//       <input
//         type="color"
//         name=""
//         id=""
//         onChange={(e) => setColorPicker(e.target.value)}
//       />
//     </>
//   );
// };

// export default App;

import React, { useState } from "react";
import "../../styles/pages/todolist.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ToDoList = () =>{

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleDateChange = (date) => {
        setDate(date);
      };
    



    const createTodo = () =>{
        fetch(process.env.BACKEND_URL + 'api/add-todo/' ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, date}) 
        })
        .then(resp => {								
            return resp.json();
        })
        .then(data=> {		
            console.log(data);            
        })
        .catch(err => console.log(err))
        }
    

    return(
        <main className="to-do">
            <div className="background-image">
                <img src="https://cdn.pixabay.com/photo/2020/02/08/14/36/trees-4830285_1280.jpg" alt="imagen-de-fondo" />
            </div>
            <h1>Tareas</h1>
      
            <div className="input-container bg-danger">
            <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"  // Puedes personalizar el formato de la fecha
      />
            <input  placeholder="Introduce nueva tarea..."
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }} 
                    />
     
            </div>
            
            <section className="todo-container"></section>

            <button className="btn btn-success" onClick={createTodo}>Añadir</button>
        </main>
    )
}
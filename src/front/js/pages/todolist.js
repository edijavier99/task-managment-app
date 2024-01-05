import React, { useState } from "react";
import "../../styles/pages/todolist.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ToDoList = () =>{
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const datePickerRef = React.createRef();


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

    const CustomDatePickerInput = ({ value, onClick }) => (
        <div className="custom-datepicker-input" onClick={onClick}>
         {value}
              <i className="fa-solid fa-calendar" ></i>
        </div>
        );
        

    return(
        <main className="to-do">
            <div className="background-image">
                <img src="https://cdn.pixabay.com/photo/2020/02/08/14/36/trees-4830285_1280.jpg" alt="imagen-de-fondo" />
            </div>
            <h1>Tareas</h1>
            <div className="container">
                <div className="input-container d-flex">
                    <input
                    className="todo-input"
                    placeholder="Introduce nueva tarea..."
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    />
                    <div className="datePickerContainer">
                    <DatePicker
                        className="dateTodo"
                        onChange={(newDate) => setDate(newDate)}
                        dateFormat="yyyy-MM-dd"
                        customInput={<CustomDatePickerInput />}
                    />
                    </div>
                </div>
            </div>
            <button className="btn btn-dark btn-submit-todo" onClick={createTodo}>Añadir</button>
            <section className="todo-container"></section>
        </main>
    )
}
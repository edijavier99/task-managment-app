import React, { useContext, useEffect, useState } from "react";
import "../../styles/pages/todolist.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from "../store/appContext";
import  { forwardRef } from 'react';

export const ToDoList = () =>{
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const {store,actions} = useContext(Context)
    const [todos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    const [selected, setSelected] = useState(false)


    const handleCheckClick = (id) => {
      setCompletedTodos((prevCompleted) => [...prevCompleted, id]);
      markAsCompleted(id)
      setTimeout(() => {
        setTodos(todos.filter(task => task.id !== id));
      }, 1000);
    };

    const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
        <div className="custom-datepicker-input" onClick={onClick} ref={ref}>
            {value}
            <i className={`fa-solid fa-calendar ${selected ? 'selected' : ''}`}></i>
        </div>
    ));
    
    const getAllTodos = () =>{
        fetch(process.env.BACKEND_URL + 'api/todo', {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            const incompleteTasks = data.filter(task => task.complete !== true);
            // Actualiza el estado con las tareas filtradas
            setTodos(incompleteTasks);
        })
        .catch(err => console.log(err));
    }

    const createTodo = () =>{
        if (!date){
            alert("Introduce una fecha antes de añadir ")
        }else if(!title){
            alert("Introduce una tarea antes de añadir")
        }else {
            const newTodo = { title, date };
            setTodos([...todos, newTodo]);
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
            .then(data=>{
                setTitle("")
                setSelected("")
            })
            .catch(err => console.log(err))
        }
    }

    const deleteTodo = (id,deletedItem) =>{
        const updatedTodo = todos.filter((item)=> item.title !== deletedItem.title);
        setTodos(updatedTodo);
        fetch(process.env.BACKEND_URL + 'api/delete-todo/' + id ,{
            method: 'DELETE',
            headers: {
                "Content-Type" : "Application/json"
            }
        })
        .then(response => response.json())
    }

    const markAsCompleted = (id) =>{
        fetch(process.env.BACKEND_URL + 'api/completedTodo/' + id ,{
            method: 'PUT',
            headers: {
                "Content-Type" : "Application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error(`Error al marcar tarea como completada: ${response.statusText}`);
                }
                return response.json();
              })
            .catch(error => {console.log(error)})
        
    }

    const showTodos = () =>{
        const shortedTodos = [...todos]
        shortedTodos.forEach((item)=>{
            item.date = new Date(item.date)
        })
        shortedTodos.sort((a,b)=> a.date - b.date)
        return  shortedTodos.map((item,index)=>{
            const dateObject = new Date(item.date);
            const isCompleted = completedTodos.includes(item.id);
            return <div className="todo-list-item" key={index}>
                       <span className="check" onClick={() => handleCheckClick(item.id)}>
                        {isCompleted && "✔"}
                        </span>
                        <li className="ps-5 d-flex" key={index}>{item.title}
                            <div className="ms-auto me-2 todo-delete-icon"><i className="fa-solid fa-trash" onClick={()=>deleteTodo(item.id,item)} style={{color:"#af3528"}}></i></div>
                        </li>
                        <span className="date-for-todos text-muted">{dateObject.toDateString()}</span>
                    </div>
            })
    }

    useEffect(()=>{
        getAllTodos()
    },[])

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
                        onChange={(newDate) => {
                            setDate(newDate)
                            setSelected(true)
                        }}
                        dateFormat="yyyy-MM-dd"
                        customInput={<CustomDatePickerInput />}
                    />
                    </div>
                </div>
            </div>
            <button className="btn btn-dark btn-submit-todo" onClick={()=>createTodo()}>Añadir</button>

            <div className="todo-container ">
               <ul className="todo-list p-0">
                  {showTodos()}
               </ul> 
                <div className="todos-counter">
                    <span className="text-muted m-3">{todos.length} tareas por completar</span> 
                </div>
            </div>
        </main>
    )
}
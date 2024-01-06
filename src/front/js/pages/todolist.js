import React, { useContext, useEffect, useState } from "react";
import "../../styles/pages/todolist.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from "../store/appContext";
import { format } from 'date-fns';


export const ToDoList = () =>{
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const {store,actions} = useContext(Context)
    const [todos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleCheckClick = (id) => {
      setCompletedTodos((prevCompleted) => [...prevCompleted, id]);
    };

    const CustomDatePickerInput = ({ value, onClick }) => (
        <div className="custom-datepicker-input" onClick={onClick}>
         {value}
              <i className="fa-solid fa-calendar" ></i>
        </div>
    );
    
    const getAllTodos = () =>{
        fetch(process.env.BACKEND_URL + 'api/todo', {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTodos(data);
        })
        .catch(err => console.log(err));
        
    }

    const createTodo = () =>{
        if (date == '' || null || undefined){
            alert("Introduce una fecha antes de añadir ")
        }else if(title == '' || null || undefined){
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
                        onChange={(newDate) => setDate(newDate.toLocaleDateString())}
                        dateFormat="yyyy-MM-dd"
                        customInput={<CustomDatePickerInput />}
                    />
                    </div>
                </div>
            </div>
            <button className="btn btn-dark btn-submit-todo" onClick={()=>createTodo()}>Añadir</button>

            <div className="todo-container ">
               <ul className="todo-list p-0">
                   {todos.map((item,index)=>{
                    const dateObject = new Date(item.date);
                    const isCompleted = completedTodos.includes(item.id);
                    return <div className="todo-list-item" key={index}>
                                <span className="check" onClick={() => handleCheckClick(item.id)}>
                                    {isCompleted && "✔"} 
                                </span>
                                <li className="ps-5 d-flex" key={index}>{item.title}
                                    <div className="ms-auto me-2 todo-delete-icon"><i class="fa-solid fa-trash" onClick={()=>deleteTodo(item.id,item)} style={{color:"#af3528"}}></i></div>
                                </li>
                                <span className="date-for-todos text-muted">{dateObject.toLocaleDateString()}</span>
                            </div>
                    })}
               </ul> 
                <div className="todos-counter">
                    <span className="text-muted m-3">{todos.length} tareas por completar</span> 
                </div>
            </div>
        </main>
    )
}
import React, { useEffect, useState,useContext } from "react";
import "../../styles/pages/todolist.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from "../store/appContext";
import  { forwardRef } from 'react';
import { SingleTodo } from "../component/singleTodo";
import Swal from 'sweetalert2';


export const ToDoList = () =>{
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const {store,actions} = useContext(Context)
    const [todos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    const [selected, setSelected] = useState(false)
    const owner_id= localStorage.getItem("user_id")

    const handleCheckClick = (id) => {
      setCompletedTodos((prevCompleted) => [...prevCompleted, id]);
      actions.markAsCompleted(id)
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
        fetch(`${process.env.BACKEND_URL}api/${localStorage.getItem("user_id")}/todo`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            const incompleteTasks = data.filter(task => task.complete !== true);
            setTodos(incompleteTasks);
        })
        .catch(err => console.log(err));
    }

    const createTodo = () =>{
        if (!date){
            Swal.fire({
                icon: 'error',
                title: 'oppss...',
                text:"Introduce una fecha antes de añadir"
              })
        }else if(!title){
            Swal.fire({
                icon: 'error',
                title: 'oppss...',
                text: "Introduce una tarea antes de añadir"
              })
        }else {
            const newTodo = { title, date };
            setTodos([...todos, newTodo]);
            fetch(process.env.BACKEND_URL + 'api/add-todo/' ,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, date, owner_id}) 
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

    const showTodos = () =>{
        const shortedTodos = [...todos]
        shortedTodos.forEach((item)=>{
            item.date = new Date(item.date)
        })
        shortedTodos.sort((a,b)=> a.date - b.date)
        return  shortedTodos.map((item,index)=>{
            const dateObject = new Date(item.date);
            const isCompleted = completedTodos.includes(item.id);
            return <SingleTodo  key={index}
                            index={index}
                            item={item}
                            completed={isCompleted}
                            date={dateObject}
                            deleteTodo={() => deleteTodo(item.id,item)}
                            handleCheckClick={() => handleCheckClick(item.id)}
             />
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
            <h1>Tasks</h1>
            <div className="container">
                <div className="input-container d-flex">
                    <input
                    className="todo-input"
                    placeholder="Type new task..."
                    value={title}
                    onChange={(e) => {
                        setTitle(actions.capitalizeFirstLetter(e.target.value))
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
                    <span className="text-muted m-3">{todos.length} tasks to complete</span> 
                </div>
            </div>
        </main>
    )
}
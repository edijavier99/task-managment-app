import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/components/todayTodos.css"

export const TodayTodos = () =>{
    const {store , actions} = useContext(Context)
    const navigate = useNavigate()
    const [todos,setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])


   
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
            const today = new Date().toLocaleDateString();
            const todayTodos = incompleteTasks.filter(task => new Date(task.date).toLocaleDateString() === today);
            setTodos(todayTodos);
        })
        .catch(err => console.log(err));
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

    const handleCheckClick = (id) => {
        setCompletedTodos((prevCompleted) => [...prevCompleted, id]);
        actions.markAsCompleted(id)
        setTimeout(() => {
          setTodos(todos.filter(task => task.id !== id));
        }, 1000);
      };

    useEffect(()=>{
        getAllTodos()
    },[])

    const showTodaysTodos = () =>{
        return todos.map((item,index)=>{
            const dateObject = new Date(item.date);
            const isCompleted = completedTodos.includes(item.id);
            return(
                <div key={index} className="todoContainer my-3" >
                    <span className="check-today" onClick={()=> handleCheckClick(item.id)} >{isCompleted && "✔"}</span>
                    <div className="d-flex flex-column todoInfo">
                        <li>{item.title}</li>
                        <span className="text-muted todayDate ">{dateObject.toDateString()}</span>
                    </div>
                    <i className="fa-solid fa-trash" onClick={()=> deleteTodo(item.id, item)} style={{color:"#af3528"}}></i>
                </div>
            )
        })
    }
   
    return(
        <section>
            <h4>Tareas que tienes pendientes para hoy</h4>
            <button className="btn  goButton" onClick={()=>navigate("/todo-list")}>Añadir Tareas</button>

            <ul id="todayList">
                {showTodaysTodos()}
            </ul>
        </section>
    )
}
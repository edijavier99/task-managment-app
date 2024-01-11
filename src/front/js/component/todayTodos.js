import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/components/notes.css"

export const TodayTodos = () =>{
    const {store , actions} = useContext(Context)
    const navigate = useNavigate()
    const [todos,setTodos] = useState([])

   
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
            const today = new Date().toLocaleDateString();
            const todayTodos = incompleteTasks.filter(task => new Date(task.date).toLocaleDateString() === today);
            setTodos(todayTodos);
        })
        .catch(err => console.log(err));
    }

    useEffect(()=>{
        getAllTodos()
    },[])

    const showTodaysTodos = () =>{
        return todos.map((item,index)=>{
            return(
                <div key={index} id="todayList">
                    <li>{item.title}</li>
                </div>
            )
        })
    }

   
    return(
        <section>
            <h6>Estos son las tareas que tienes para hoy</h6>
            <ul>
                {showTodaysTodos()}
            </ul>
            <button className="btn btn-success my-5" onClick={()=>navigate("/todo-list")}>ToDo</button>
        </section>
    )
}
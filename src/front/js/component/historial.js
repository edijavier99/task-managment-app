import React, { useEffect, useState } from "react";
import "../../styles/components/historial.css"

export const Historial = () =>{

    const [completedTask, setCompletedTask] = useState([])

    const getCompletedTasks = () =>{
        fetch(process.env.BACKEND_URL + 'api/completed-todos' , {
            method: 'GET',
            headers: {
                "Content-Type" : "Application/json"
            }
        })
        .then(res => res.json())
        .then(data =>{
            setCompletedTask(data)
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getCompletedTasks()
    },[])

    const showCompletedTasks = () => {
        return completedTask.map((task, index) => {
            const formattedDate = new Date(task.date);
            return (
                <div key={index}>
                    <li>{task.title}</li>
                    <span>{formattedDate.toDateString()}</span>
                </div>
            );
        });
    }
    
    return(
        <section className="text-center">
                <h5 className="text-center my-3">Estas son las tareas que has completado en los últimos 5 días</h5>
                <ul id="completedTaskList">
                    {showCompletedTasks()}
                </ul>
                <span className="text-muted small">{completedTask.length} Tareas completadas</span>
        </section>
    )
}
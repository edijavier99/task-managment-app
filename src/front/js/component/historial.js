import React, { useEffect, useState } from "react";
import "../../styles/components/historial.css"

const Historial = () =>{
    const user = localStorage.getItem("user_id")
    const [completedTask, setCompletedTask] = useState([])

    const getCompletedTasks = () =>{
        fetch(`${process.env.BACKEND_URL}api/user/${user}/completed-todos`, {
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
        const sortedTasks = [...completedTask];
        sortedTasks.forEach(task => {
            task.date = new Date(task.date);
        });
        sortedTasks.sort((a, b) => a.date - b.date);
        return sortedTasks.map((task, index) => {
            const formattedDate = new Date(task.date);
            return (
                <div key={index}>
                    <li>{task.title}</li>
                    <span>{formattedDate.toDateString()}</span>
                </div>
            );
        });
    };
    
    return(
        <section className="text-center">
                <h6 className="text-center my-3">These are the tasks you completed in the last days. Please note that after 5 days, they will be automatically removed.</h6>
                <ul id="completedTaskList">
                    {showCompletedTasks()}
                </ul>
                <span className="text-muted small">{completedTask.length} Task completed</span>
        </section>
    )
}

export default Historial
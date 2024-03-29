import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/todayTodos.css";

const TodayTodos = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const token = localStorage.getItem("jwt-token")
    const user_id = localStorage.getItem("user_id")
    
    const getAllTodos = () => {
        fetch(`${process.env.BACKEND_URL}api/${user_id}/todo`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const incompleteTasks = data.filter(task => !task.complete);
            const today = new Date().toLocaleDateString();
            const todayTodos = incompleteTasks.filter(task => new Date(task.date).toLocaleDateString() === today);
            setTodos(todayTodos);
            const currentHour = new Date().getHours();
            const currentMinutes = new Date().getMinutes();
                sendReminder(todayTodos);
        })
        .catch(error => {
            console.error("Error fetching todos:", error);
        });
    };
    
    const deleteTodo = (id, deletedItem) => {
        fetch(`${process.env.BACKEND_URL}api/delete-todo/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "Application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            setTodos(prevTodos => prevTodos.filter(item => item.title !== deletedItem.title));
        })
        .catch(error => {
            console.error("Error deleting todo:", error);
        });
    };

    const handleCheckClick = (id) => {
        setCompletedTodos(prevCompleted => [...prevCompleted, id]);
        setTimeout(() => {
            setTodos(prevTodos => prevTodos.filter(task => task.id !== id));
        }, 1000);
    };

    useEffect(() => {
        if(token){
            getAllTodos();
        }
    }, []);

    const sendReminder = (taskReminder) =>{
        fetch(`${process.env.BACKEND_URL}api/user/${user_id}/task-reminder`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({taskReminder})
        })
        .then(res => res.text())
        .catch(err => console.log(err))
    }

    const showTodaysTodos = () => {
        return todos.map((item, index) => {
            const dateObject = new Date(item.date);
            const isCompleted = completedTodos.includes(item.id);
            return (
                <div key={index} className="todoContainer my-3">
                    <span className="check-today" onClick={() => handleCheckClick(item.id)}>{isCompleted && "✔"}</span>
                    <div className="d-flex flex-column todoInfo">
                        <li>{item.title}</li>
                        <span className="text-muted todayDate">{dateObject.toDateString()}</span>
                    </div>
                    <i className="fa-solid fa-trash" onClick={() => deleteTodo(item.id, item)} style={{ color: "#af3528" }}></i>
                </div>
            );
        });
    };

    return (
        <section>
            <h6>Tasks remaining for today. Stay organized and focused on your daily priorities.</h6>
             <a className="btn goButton" href={token ? "/todo-list" : "/login"}>
                Add Tasks
             </a>
            <ul id="todayList">
                {showTodaysTodos()}
            </ul>
        </section>
    );
};

export default TodayTodos;

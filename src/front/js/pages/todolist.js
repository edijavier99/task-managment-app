import React from "react";
import "../../styles/pages/todolist.css"

export const ToDoList = () =>{
    return(
        <main className="to-do">
            <div className="background-image">
                <img src="https://cdn.pixabay.com/photo/2020/02/08/14/36/trees-4830285_1280.jpg" alt="imagen-de-fondo" />
            </div>
            <h1>Tareas</h1>
            <input placeholder="Introduce nueva tarea..." />
            <section className="todo-container">
                
            </section>
        </main>
    )
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/notes.css"
import { set } from "date-fns";

const Notes = () =>{
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()

    const getAllNotes = async () =>{
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/${localStorage.getItem("user_id")}/notes`, {
                method: 'GET',
                headers: {
                "Content-Type" : "Application/json"
                }
            })
            const data = await response.json();
            console.log(data);
            setNotes(data)
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllNotes()
    },[])
    
    const showAllNotes = () =>{
        return notes.map((notes,index)=>{
            const dateObject = new Date(notes.date)
            return(
                <div key={index} >
                    <li><h4>{notes.title}</h4></li>
                    <span>{notes.description}</span>
                    <span className = "text-muted small mt-2">{dateObject.toDateString()}</span>
                    <button className="btn btn-dark dark-text w-100 mt-4 mb-3">Ir</button>
                </div>
            )
        })
    }

    return(
        <section className="flex flex-column text-center">
            <h2 className="">Tus notas...📝</h2>
            <button className="btn goButton my-4" onClick={()=>navigate("/notas")}>Añadir Notas</button>
            <ul id="notesList">
                {showAllNotes()}
            </ul>
            <span className="text-muted small d-block">{notes.length} Notas añadidas</span>
        </section>
    )
}

export default Notes
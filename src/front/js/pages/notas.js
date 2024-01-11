import React, { useState,useEffect, useContext } from "react";
import "../../styles/pages/notas.css"
import { Context } from "../store/appContext";

export const Notas = () =>{
    const [description, setDescription] = useState("")
    const {store , actions} = useContext(Context)
    const [title,setTitle] = useState("")
    const today = new Date()
    const date = today.toLocaleDateString()

    const addNote = () =>{

        if(!title){
            alert("Inserta un titulo para la nota")
        }else if(!description){
            alert("Inserta una description para la nota")
        }else{
            fetch(process.env.BACKEND_URL + 'api/add-notes' , {
                method: 'POST',
                headers: {
                    "Content-Type" : "Application/json"
                },
                body: JSON.stringify({title,description,date})
            })
            .then(res=>{
                return(res.json())
            })
            .then(data=>{
                setTitle("")
                setDescription("")
            })
            .catch(err=>console.log(err))
        }
    }

    return(
        <section className="notas">
           <div className="background-image">
                <img src="https://cdn.pixabay.com/photo/2016/11/22/19/25/adult-1850177_1280.jpg" alt="imagen-de-fondo" />
            </div>
            <h1>Notas</h1>
            <section className="notas-container">
                <input id="nota-title" 
                       className="text-center" 
                       placeholder="Titulo"
                       value={title}
                       onChange={(e)=>{
                        setTitle(actions.capitalizeFirstLetter(e.target.value))
                       }}
                />
                <textarea  maxLength="1600" 
                           value={description} 
                           onChange={(e)=>{
                                setDescription(actions.capitalizeFirstLetter(e.target.value));
                        }}
                           ></textarea>
                <span className="character-number text-muted">{description.length }/1600</span>
            </section>
            <button className="btn btn-dark"
                    onClick={()=>{
                        console.log("Before Add Note - Title:", title, "Description:", description);
                        addNote()             
                    }}
            >Guardar</button>
        </section>
    )
}
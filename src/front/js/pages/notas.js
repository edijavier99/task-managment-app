import React, { useState } from "react";
import "../../styles/pages/notas.css"

export const Notas = () =>{
    const [description, setDescription] = useState("")
    return(
        <section className="notas">
           <div className="background-image">
                <img src="https://cdn.pixabay.com/photo/2016/11/22/19/25/adult-1850177_1280.jpg" alt="imagen-de-fondo" />
            </div>
            <h1>Notas</h1>
            <section className="notas-container">
                <input id="nota-title" className="text-center" placeholder="Titulo"/>
                <textarea  maxlength="1600" 
                           value={description} 
                           onChange={(e)=>{
                            setDescription(e.target.value)
                           }}
                           ></textarea>
                <span className="character-number text-muted">{description.length }/1600</span>
            </section>
            <button className="btn btn-dark">Guardar</button>
        </section>
    )
}
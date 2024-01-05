import React from "react";
import "../../styles/pages/notas.css"

export const Notas = () =>{
    return(
        <section className="notas">
           <div className="background-image">
                <img src="https://cdn.pixabay.com/photo/2016/11/22/19/25/adult-1850177_1280.jpg" alt="imagen-de-fondo" />
            </div>
            <h1>Notas</h1>
            <section className="notas-container">
               <textarea>
               </textarea>
            </section>
        </section>
    )
}
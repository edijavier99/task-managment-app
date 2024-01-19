import React from "react";
import { useNavigate } from "react-router-dom";

export const OrganizerHome = () =>{
    const navigate = useNavigate()

    return(
    <section className="flex flex-column text-center">
        <h2 className="">Organizador</h2>
        <button className="btn goButton my-4" onClick={()=>navigate("/organizador")}>Añadir Proyecto</button>
        {/* <ul id="notesList">
            {showAllNotes()}
        </ul> */}
        {/* <span className="text-muted small d-block">{notes.length} Notas añadidas</span> */}
    </section>
    )
}
import React from "react";
import { useNavigate } from "react-router-dom";

const OrganizerHome = () =>{
    const navigate = useNavigate()
    const token = localStorage.getItem("jwt-token")
    return(
    <section className="flex flex-column text-center">
        <h2 className="">Organizador</h2>
        <a className="btn goButton" href={token ? "/organizador" : "/login"}>
            Añadir Proyecto
        </a>
    </section>
    )
}

export default OrganizerHome
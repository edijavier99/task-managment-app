import React from "react";
import { useNavigate } from "react-router-dom";

const OrganizerHome = () =>{
    const navigate = useNavigate()
    const token = localStorage.getItem("jwt-token")
    return(
    <section className="flex flex-column text-center">
        <h6 className="">Dynamic workspace for your projects. Ideal for both individual initiatives and collaborative efforts. </h6>
        <a className="btn goButton" href={token ? "/organizador" : "/login"}>
            Add Project
        </a>
    </section>
    )
}

export default OrganizerHome
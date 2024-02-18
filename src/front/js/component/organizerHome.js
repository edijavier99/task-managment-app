import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const OrganizerHome = () =>{
    const {store,actions} = useContext(Context)
    const { getAllProjects } = actions;
    const token = localStorage.getItem("jwt-token")
    const user_id = localStorage.getItem("user_id")
    const [projects, setProjects] = useState("")
    useEffect(()=>{
        getAllProjects(user_id)
        .then(data => {
            setProjects(data.projects);
        })
        .catch(error => {
            console.log(error);
        });
    },[token])

    const showProjects = () => {
        return projects.map((item, index) => {
            return <span className="todoContainer my-3" key={index}>{item.title}</span>; 
        });
    }
    
    return (
        <section className="flex flex-column text-center">
            <h6 className="">Dynamic workspace for your projects. Ideal for both individual initiatives and collaborative efforts.</h6>
            <a className="btn goButton" href={token ? "/organizador" : "/login"}>
                Projects Area
            </a>
            <div>
                {projects && projects.length > 0 && showProjects()} 
            </div>
        </section>
    );    
}

export default OrganizerHome
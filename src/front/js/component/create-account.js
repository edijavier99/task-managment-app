import React, { useState } from "react";
import "../../styles/components/create-account.css"

export const CreateAccount = () =>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [surname, setSurname] = useState("")
    return(
        <section className="create-account">
           <header className="header">
                <h1 id="title">Task Managment <br/>Crear una cuenta</h1>
                <p id="description">Empieza a organizar tu dia con nosotros...</p>
           </header>
           <form className="survey-form">
                <div className="form-group">
                    <label for="name" id="name-label">Nombre</label>
                    <input id="name" 
                           placeholder="Introduce tu nombre"
                           name="name"
                           type="text"
                           onChange={(e)=>{
                                setName(e.target.value)
                           }}
                           value={name}
                           required
                    />
                </div>
                <div className="form-group">
                    <label for="surname" id="surname-label">Apellido</label>
                    <input id="surname" 
                           placeholder="Introduce tu nombre"
                           name="surname"
                           type="text"
                           onChange={(e)=>{
                                setSurname(e.target.value)
                           }}
                           value={surname}
                           required
                    />
                </div>
                <div className="form-group">
                    <label for="email" id="email-label">Email</label>
                    <input id="email" 
                           placeholder="Introduce tu email"
                           name="email"
                           type="email"
                           onChange={(e)=>{
                                setEmail(e.target.value)
                           }}
                           value={email}
                           required
                    />
                </div>
                <div className="form-group">
                    <button type="submit"  id="submit" className="submit-button">Crear</button>
                </div>
           </form>
        </section>
    )
}
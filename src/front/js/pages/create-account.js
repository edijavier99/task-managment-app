import React, { useState } from "react";
import "../../styles/components/create-account.css"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const CreateAccount = () =>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [surname, setSurname] = useState("")
    const [password, setPassword] = useState("")
    const randomNumber = Math.floor(Math.random() * 999);
    const profileImg =`https://picsum.photos/seed/${randomNumber}/500/600`
    const navigate = useNavigate()

    const createUser = () =>{
        fetch(process.env.BACKEND_URL + 'api/create-user', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ name, email, surname, password, profileImg })
        })
        .then(response => {
            if (response.ok) {
                navigate('/login')}
            else {
                response.json().then(data => {
                    Swal.fire({
                        icon: 'error',
                        title: 'oppss...',
                        text: data.msg    
                      })
                })
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return(
        <div id="createAccount">
            <section className="create-account">
            <header className="header">
                    <h1 id="title">Task Managment <br/>Crear una cuenta</h1>
                    <p id="description">Empieza a organizar tu dia con nosotros...</p>
            </header>
            <form className="survey-form"  onSubmit={(e) => {
                        e.preventDefault();
                        createUser();
                    }}>
                    <div className="form-group">
                        <label htmlFor="name" id="name-label">Nombre</label>
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
                        <label htmlFor="surname" id="surname-label">Apellido</label>
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
                        <label htmlFor="email" id="email-label">Email</label>
                        <input id="email" 
                            placeholder="Introduce tu email"
                            name="email"
                            type="email"
                            onChange={(e)=>{
                                    setEmail(e.target.value)
                            }}
                            value={email}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Por favor, introduce un email válido"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" id="password-label">Contraseña</label>
                        <input id="password" 
                            placeholder="Introduce contraseña"
                            name="password"
                            type="password"
                            onChange={(e)=>{
                                    setPassword(e.target.value)
                            }}
                            value={password}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" id="createAccountBtn" className="submit-button">Crear cuenta</button>
                    </div>
            </form>
                <a className="linkToCreateAccount small mt-3" href="/login">Iniciar sesión</a>
            </section>
        </div>
    )
}
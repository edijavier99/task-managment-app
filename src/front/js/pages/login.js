import React, { useState } from "react";
import "../../styles/components/create-account.css"
import { useNavigate } from "react-router-dom";

export const Login = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = () =>{
        fetch(process.env.BACKEND_URL + 'api/login', {
            method : 'POST',
            headers: {
                "Content-Type" : "Application/json"
            },
            body : JSON.stringify({email, password})
        })
        .then(res =>res.json())
        .then(data =>{
           if(!data.msg){
            localStorage.setItem('jwt-token', data.token);
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('username', data.name);
            navigate("/")
           }
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return(
        <section className="login">
            <header className="header">
                <img className="login-image" src="" alt="" />
                <h1 className="text-center">Iniciar sesión</h1>
                <p className="text-center">Inicia sesion</p>
            </header>
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleLogin()
            }}>
                <label id="email-label" htmlFor="email" >Email</label>
                <input id="email-label"
                       name="email"
                       type="email"
                       value={email}
                       onChange={(e)=>{
                        setEmail(e.target.value)
                       }}
                />
                <label id="password-label" htmlFor="password" >Contraseña</label>
                <input id="password-label"
                       name="password"
                       type="password"
                       value={password}
                       onChange={(e)=>{
                        setPassword(e.target.value)
                       }}
                />
                <button type="submit">Log In</button>
            </form>
        </section>
    )
}
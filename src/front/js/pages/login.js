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
            alert(data.loginOK)
            localStorage.setItem('jwt-token', data.token);
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('username', data.name);
            localStorage.setItem('userImage', data.profileImg)
            navigate("/")
           }
           else
            alert(data.msg)
        })
        .catch(err =>{
            console.log(err)
        })
    }
    return(
        <div id="login">
            <section className="login">
                <header className="header">
                    <img className="login-image" src="https://cdn.pixabay.com/photo/2016/08/25/07/30/red-1618916_1280.png" alt="logo" />
                    <h1>Iniciar sesión</h1>
                    <p className="m-0">Inicia sesion</p>
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
                        autoComplete="current-password"
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <button className="loginButton" type="submit">Log In</button>
                </form>
                <a className="linkToCreateAccount small mt-3" href="/crear-cuenta">Crear una cuenta</a>
            </section>
        </div>
    )
}
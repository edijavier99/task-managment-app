import React, { useState } from "react";
import "../../styles/components/create-account.css"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import logo from "./../../img/logo.png"


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
            Swal.fire({
                icon: 'success',
                text: data.loginOK 
              })
            localStorage.setItem('jwt-token', data.token);
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userImage', data.profileImg)
            navigate("/")
           }
           else
           Swal.fire({
            icon: 'error',
            title: 'oppss...',
            text: data.msg,
            customClass: {
                popup: 'custom-popup-class'
            }           
        });
        })
        .catch(err =>{
            console.log(err)
        })
    }
    return(
        <div id="login">
            <section className="login">
                <header className="header">
                    <img className="login-image" src={logo}  alt="logo" />
                    <h1>Iniciar sesión</h1>
                    <p className="m-0">Log In</p>
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
                    <label id="password-label" htmlFor="password" >Password</label>
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
                <a className="linkToCreateAccount small mt-3" href="/crear-cuenta">Create account</a>
            </section>
        </div>
    )
}
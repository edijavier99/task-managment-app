import React, { useState } from "react";

export const Login = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    return(
        <section className="login">
            <header className="header">
                <img className="login-image" src="" alt="" />
                <h1 className="text-center">Iniciar sesión</h1>
                <p className="text-center">Inicia sesion</p>
            </header>
            <form>
                <label id="email-label" for="email" >Email</label>
                <input id="email-label"
                       name="email"
                       type="email"
                       value={email}
                       onChange={(e)=>{
                        setEmail(e.target.value)
                       }}
                />
                <label id="password-label" for="password" >Contraseña</label>
                <input id="password-label"
                       name="password"
                       type="password"
                       value={password}
                       onChange={(e)=>{
                        setPassword(e.target.value)
                       }}
                />
                <button type="submit"
                        // onClick={}
                >Log In</button>
            </form>
        </section>
    )
}
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
                    <h1 id="title">Task Managment <br/>Create Account</h1>
                    <p id="description">You're one step closer to taking advantage of your day with us...</p>
            </header>
            <form className="survey-form"  onSubmit={(e) => {
                        e.preventDefault();
                        createUser();
                    }}>
                    <div className="form-group">
                        <label htmlFor="name" id="name-label">Name</label>
                        <input id="name" 
                            placeholder="Type your name"
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
                        <label htmlFor="surname" id="surname-label">Surname</label>
                        <input id="surname" 
                            placeholder="Type your surname"
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
                            placeholder="Type your email"
                            name="email"
                            type="email"
                            onChange={(e)=>{
                                    setEmail(e.target.value)
                            }}
                            value={email}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Please, type a valid email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" id="password-label">Password</label>
                        <input id="password" 
                            placeholder="Type a password"
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
                        <button type="submit" id="createAccountBtn" className="submit-button">Create account</button>
                    </div>
            </form>
                <a className="linkToCreateAccount small mt-3" href="/login">Login</a>
            </section>
        </div>
    )
}
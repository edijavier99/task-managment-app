import React, { useState } from "react";
import "../../styles/pages/welcome.css";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate()

  return (
    <section className="welcome-page">
        <div className="welcome-container">
          <img
            className="welcome-logo mt-3"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Tasks_2021.svg/2159px-Google_Tasks_2021.svg.png"
            alt="logo"
          />
          <h1 className="mt-3">Task Manager</h1>
          <p className="my-4">
            Organiza tus tareas, organiza tu día, crea, guarda tus notas y muchos más...
          </p>
          <button className="btn btn-primary mb-3" onClick={()=>navigate("/login")}>
            Iniciar sesión
          </button>{" "}
          <br />
          <button className="btn btn-secondary" onClick={()=>navigate("/crear-cuenta")}>
            Crear una cuenta
          </button>
        </div>
    </section>
  );
};

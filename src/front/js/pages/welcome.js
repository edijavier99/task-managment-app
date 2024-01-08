import React, { useState } from "react";
import "../../styles/pages/welcome.css";
import { Login } from "../component/login";
import { CreateAccount } from "../component/create-account";

export const Welcome = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowCreateAccount(false);
  };

  const handleCreateAccountClick = () => {
    setShowCreateAccount(true);
    setShowLogin(false);
  };

  return (
    <section className="welcome-page">
      {showLogin ? (
        <Login />
      ) : showCreateAccount ? (
        <CreateAccount />
      ) : (
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
          <button className="btn btn-primary mb-3" onClick={handleLoginClick}>
            Iniciar sesión
          </button>{" "}
          <br />
          <button className="btn btn-secondary" onClick={handleCreateAccountClick}>
            Crear una cuenta
          </button>
        </div>
      )}
    </section>
  );
};

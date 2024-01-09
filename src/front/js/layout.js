import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { ToDoList } from "./pages/todolist";
import { Notas } from "./pages/notas";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Welcome } from "./pages/welcome";
import { Login } from "./pages/login";
import { CreateAccount } from "./pages/create-account";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Welcome />} path="/welcome"/>
                        <Route element={<Login/>} path="/login" />
                        <Route element={<CreateAccount/>} path="/crear-cuenta" />
                        <Route element={<ToDoList />} path="/todo-list" />
                        <Route element={<Notas />} path="/notas" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

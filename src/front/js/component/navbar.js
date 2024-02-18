import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const navigate = useNavigate()
	const currentUser = localStorage.getItem("jwt-token")	
	const {store,actions} = useContext(Context)

	return (
	<nav className="navbar navbar-expand-lg navbar-light">
		<div className="container-fluid">
			<a className="navbar-brand" href="#">Navbar</a>
			{currentUser ? <i className="fa-solid fa-right-to-bracket" onClick={()=> actions.logOut()}></i> :
			 <i className="fa-solid fa-user" onClick={() => navigate('/login')}></i>}		
		</div>
	</nav>
	);
};

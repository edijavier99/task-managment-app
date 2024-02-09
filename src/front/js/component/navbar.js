import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate()
	const currentUser = localStorage.getItem("jwt-token")
	
	const logOut = () => {
		localStorage.removeItem('jwt-token');
		localStorage.removeItem('user_id');
		localStorage.removeItem('username');
		localStorage.removeItem('userImage')
		window.location.reload()
	}

	return (
	<nav className="navbar navbar-expand-lg navbar-light">
		<div className="container-fluid">
			<a className="navbar-brand" href="#">Navbar</a>
			{currentUser ? <i className="fa-solid fa-right-to-bracket" onClick={logOut}></i> :
			 <i className="fa-solid fa-user" onClick={() => navigate('/login')}></i>}
			
		</div>
	</nav>
	);
};

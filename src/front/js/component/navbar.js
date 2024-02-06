import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate()
	return (
	<nav className="navbar navbar-expand-lg navbar-light">
		<div className="container-fluid">
			<a className="navbar-brand" href="#">Navbar</a>
			<i className="fa-solid fa-user" onClick={() => navigate('/login')}></i>
		</div>
	</nav>
	);
};

import React from "react";

export const Navbar = () => {
	return (
	<nav className="navbar navbar-expand-lg navbar-light">
		<div className="container-fluid">
			<a className="navbar-brand" href="#">Navbar</a>
			<i className="fa-solid fa-user" onClick={() => navigate('/login')}></i>
		</div>
	</nav>
	);
};

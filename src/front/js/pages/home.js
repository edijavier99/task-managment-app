import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Profile } from "../component/profile";
import { Dashboard } from "../component/dashboard";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [selectedDate, setSelectedDate] = useState(null)

	return (
		<section>
			<header className="">
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">Navbar</a>
					<i className="fa-solid fa-user"></i>
				</div>
			</nav>
			</header>
			<main id="main">
				<Profile/>
				<form className="d-flex" id="searchBar">
					<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
					<button className="btn btn-outline-success" type="submit">Search</button>
				</form>
				<Dashboard/>
			</main>
		</section>
		
	);
};

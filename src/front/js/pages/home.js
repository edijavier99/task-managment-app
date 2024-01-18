import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Profile } from "../component/profile";
import { Dashboard } from "../component/dashboard";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [searchQuery, setSearchQuery] = useState("")
	const [searchResults, setSearchResults] = useState([]);

	const getFilteredSearch = (query)=>{
			try {
				fetch(`${process.env.BACKEND_URL}/api/search?query=${query}`, { 
					method: "GET", 
					headers: { 
						"Content-Type": "application/json",
					},
				})
				.then((res) => res.json())
				.then((result) => {  
					setSearchResults(result.Results)
					console.log(result.Results);
				})
				  } catch (error) {
			  console.error('Error al realizar la búsqueda:', error);
			}
		}	

	const showSearchResults = () =>{
		return searchResults.map((result, index) => {
			return (
					<span  key={index} id="item-result">
						<a id="item-result-title">
							{result.title}
						</a>
					</span>
				);
			})
	}
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
				<form className="d-flex" id="searchBar" onSubmit={(e)=>{
					e.preventDefault()
				}}>
					<input className="form-control me-2" 
						   type="search" 
						   placeholder="Search" 
						   aria-label="Search"
						   value={searchQuery}
						   onChange={(e) => {
							setSearchQuery(e.target.value);
							getFilteredSearch(e.target.value)
						}}
					/>
					<button className="btn btn-outline-success" type="button" onClick={()=>{
						getFilteredSearch(searchQuery)
						
					}}>Buscar</button>
				</form>
				<div>
					{searchResults.length > 0 && (
					<div className="d-flex flex-column">
						{showSearchResults()}
					</div>
		 		)}
				</div>
				<Dashboard/>
			</main>
		</section>
		
	);
};

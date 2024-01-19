import React from 'react';
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			todayTodos : [],
			filteredResults : [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			capitalizeFirstLetter : (text) => {
				return text.charAt(0).toUpperCase() + text.slice(1);
			},
			saveTodosInFlux : (arr) =>{
				const store = getStore()
				setStore({ todayTodos: [...store.todayTodos, ...arr] });
			},
			markAsCompleted : (id) =>{
				fetch(process.env.BACKEND_URL + 'api/completedTodo/' + id ,{
					method: 'PUT',
					headers: {
						"Content-Type" : "Application/json"
					}
				})
				.then(response => {
					if (!response.ok) {
						throw new Error(`Error al marcar tarea como completada: ${response.statusText}`);
					}
					return response.json();
				})
				.catch(error => {console.log(error)})
			},
			getAllTodos : () =>{
				fetch(process.env.BACKEND_URL + 'api/todo' ,{
					method: 'GET',
					headers: {
						"Content-Type" : "Application/json"
					}
				})
				.then(response => response.json())
				.then(data =>{
					const store = getStore()
					setStore({todayTodos : [...store.todayTodos, ...data]})
				})
				.catch(error => {console.log(error)})
			},
			getAllProjects : async () =>{
					try {
					const res = await fetch(process.env.BACKEND_URL + "api/projects", {
						method: 'GET',
						headers: {
							"Content-Type": "Application/json"
						}
					});
					return await res.json();
				} catch (err) {
					return console.log(err);
				}
			},
			showTheItems : (arr) =>{
				return arr.map((item,index)=>{
					return(
						<div className="showTheItems" key={index}>
							<span>{item.title}</span>
						</div>
					)
				})
			}
		}
	};
};
export default getState;

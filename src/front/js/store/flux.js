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
			showTheItems: (arr, onClickHandler) => {
				return arr.map((item) => {
				  return (
					<div
					  className="showTheItems"
					  key={item.id}
					  onClick={() => onClickHandler(item.id)}
					>
					  <span>{item.title}</span>
					</div>
				  );
				});
			  },
			   addStepToProject : async (title, category, proyecto_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/projects/${proyecto_id}/steps`, {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ title, category })
					});
					const data = await response.json();
					return data;
				} catch (error) {
					throw error; // Lanza el error para que sea manejado externamente si es necesario
				}
			},
			sendProject : async (title) =>{
				try{
					const response = await fetch(`${process.env.BACKEND_URL}api/project`, {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ title })
					});
					const data = await response.json();
					return data;
				} catch(err){
					throw err; 
				}
			}
		}
	};
};
export default getState;

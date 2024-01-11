const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			todayTodos : [],
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
			}		  
		}
	};
};

export default getState;

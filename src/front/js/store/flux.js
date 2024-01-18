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
			// getFilteredSearch : (query)=>{
			// 	try {
			// 		fetch(`${process.env.BACKEND_URL}/api/search?query=${query}`, { 
			// 			method: "GET", 
			// 			headers: { 
			// 				"Content-Type": "application/json",
			// 			},
			// 		})
			// 		.then((res) => res.json())
			// 		.then((result) => {  
			// 			const store = getStore()
			// 			setStore({filteredResults : [...store.filteredResults, result.Results]})
			// 			console.log(store.filteredResults);
			// 		})
			// 		  } catch (error) {
			// 	  console.error('Error al realizar la búsqueda:', error);
			// 	}
			// }	  
		}
	};
};

export default getState;

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
			}			  
		}
	};
};

export default getState;

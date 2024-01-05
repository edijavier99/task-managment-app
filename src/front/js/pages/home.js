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

	const handleDateChange = (date) => {
	  setSelectedDate(date);
	};
  

	return (
		<main id="main">
			<Profile/>
			<Dashboard/>

			<div>
      <label>Select a Date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"  // Puedes personalizar el formato de la fecha
      />
      {selectedDate && (
        <p>You selected: {selectedDate.toISOString().split('T')[0]}</p>
      )}
    </div>

		</main>
	);
};

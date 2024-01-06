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
		</main>
	);
};

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Profile } from "../component/profile";
import { Dashboard } from "../component/dashboard";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<main id="main">
			<Profile/>
			<Dashboard/>
		</main>
	);
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/notes.css";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const getAllNotes = () => {
        fetch(`${process.env.BACKEND_URL}api/${localStorage.getItem("user_id")}/notes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setNotes(data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    // Llama a getAllNotes cuando el componente se monta
    useEffect(() => {
        getAllNotes();
    }, []);

    const showAllNotes = () => {
        return notes.map((note, index) => {
            const dateObject = new Date(note.date);
            return (
                <div key={index}>
                    <li><h4>{note.title}</h4></li>
                    <span>{note.description}</span>
                    <span className="text-muted small mt-2">{dateObject.toDateString()}</span>
                    <button className="btn btn-dark dark-text w-100 mt-4 mb-3">Ir</button>
                </div>
            );
        });
    };

    return (
        <section className="flex flex-column text-center">
            <h2 className="">Tus notas...📝</h2>
            <button className="btn goButton my-4" onClick={() => navigate("/notas")}>Añadir Notas</button>
            <ul id="notesList">
                {showAllNotes()}
            </ul>
            <span className="text-muted small d-block">{notes.length} Notas añadidas</span>
        </section>
    );
};

export default Notes;

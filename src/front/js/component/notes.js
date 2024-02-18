import React, { useEffect, useState } from "react";
import "../../styles/components/notes.css";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const token = localStorage.getItem("jwt-token")
    const navigate = useNavigate()
    
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
                    <button className="btn btn-dark dark-text w-100 mt-4 mb-3" onClick={()=>navigate(`/notas/${note.id}`)}>See</button>
                </div>
            );
        });
    };

    return (
        <section className="flex flex-column text-center">
            <h6 className="">Your Notes...📝</h6>
            <a className="btn goButton" href={token ? "/notas" : "/login"}>
                Add Note
             </a>
            <ul id="notesList">
                {showAllNotes()}
            </ul>
            <span className="text-muted small d-block">{notes.length} Notes added</span>
        </section>
    );
};

export default Notes;

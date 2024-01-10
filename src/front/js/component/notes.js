import React, { useEffect, useState } from "react";

const Notes = () =>{
    const [notes, setNotes] = useState([])

    const getAllNotes = () =>{
        fetch(process.env.BACKEND_URL + 'api/notes', {
            method: 'GET',
            headers: {
            "Content-Type" : "Application/json"
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setNotes(data)
        })
        .catch(err =>console.log(err))
    }

    useEffect(()=>{
        getAllNotes()
    },[])
    
    const showAllNotes = () =>{
        return notes.map((notes,index)=>{
            return(
                <div key={index}>
                    <li>{notes.title}</li>
                    <span>{notes.description}</span>
                </div>
            )
        })
    }

    return(
        <section>
            <p>Tus notas...</p>

            <ul>
                {showAllNotes()}
            </ul>
            <button className="btn btn-success" onClick={()=>navigate("/notas")}>Notas</button>
        </section>
    )
}
export default Notes
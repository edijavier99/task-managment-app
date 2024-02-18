import React, { useState,useEffect, useContext } from "react";
import "../../styles/pages/notas.css"
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

export const Notas = () =>{
    const [description, setDescription] = useState("")
    const {store , actions} = useContext(Context)
    const [title,setTitle] = useState("")
    const today = new Date()
    const date = today.toLocaleDateString()
    const owner_id= localStorage.getItem("user_id")
    const params = useParams()

    const addNote = () =>{
        if(!title){
            Swal.fire({
                icon: 'error',
                title: 'oppss...',
                text: "Insert a title for the note"
              })            
        }else if(!description){
            Swal.fire({
                icon: 'error',
                title: 'oppss...',
                text: "Insert a description for the note"
              })
        }else{
            fetch(process.env.BACKEND_URL + 'api/add-notes' , {
                method: 'POST',
                headers: {
                    "Content-Type" : "Application/json"
                },
                body: JSON.stringify({title,description,date ,owner_id})
            })
            .then(res=>{
                return(res.json())
            })
            .then(data=>{
                setTitle("")
                setDescription("")
            })
            .catch(err=>console.log(err))
        }
    }

    const editNote = () =>{
        console.log("dedo");
    }

    useEffect(() => {
        if (params.id) {
            const getSingleNote = () => {
                fetch(process.env.BACKEND_URL + "api/notes/" + params.id, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then(res => res.json())
                .then(data =>{
                    setTitle(data.title)
                    setDescription(data.description)
                })
                .catch(err => console.log(err));
            };
            getSingleNote();
        }
    }, [params.id]);

    return(
        <section className="notas">
           <div className="background-image">
                <img src="https://cdn.pixabay.com/photo/2016/11/22/19/25/adult-1850177_1280.jpg" alt="imagen-de-fondo" />
            </div>
            <h1>Notes</h1> 
            <section className="notas-container">
                <input id="nota-title" 
                       className="text-center" 
                       placeholder="Titulo"
                       value={title}
                       onChange={(e)=>{
                        setTitle(actions.capitalizeFirstLetter(e.target.value))
                       }}
                />
                <textarea  maxLength="1600" 
                           value={description} 
                           onChange={(e)=>{
                                setDescription(actions.capitalizeFirstLetter(e.target.value));
                        }}
                           ></textarea>
                <span className="character-number text-muted">{description.length }/1600</span>
            </section>
            <button className="btn btn-dark"
                    id="saveNoteBtn"
                    onClick={()=>{
                        params.id ? editNote() :  addNote()     
                    }}
            >Save</button>
            <button className="btn btn-dark"
            >Delete</button>
        </section>
    )
}
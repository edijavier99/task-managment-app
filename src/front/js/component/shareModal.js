import React, { useState } from "react";

export const ShareModal = (props) =>{
    const [email, setEmail] = useState()

    const shareProyect = ()=>{
        fetch(`${process.env.BACKEND_URL}/api/share/project/${props.projectId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <i className="fa-solid fa-ellipsis" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Compartir proyecto</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Introduce el correo electronico de la persona con la que quieres compartir el proyecto.</p>
                    <input type="text" id="shareWithEmail" name="shareWithEmail" onChange={(e)=>{
                        setEmail(e.target.value)
                    }} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={shareProyect}>Compartir</button>
                </div>
                </div>
            </div>
            </div>
        </div>
       
    )
}
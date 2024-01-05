import React from "react";
import "../../styles/components/profile.css"

export const Profile = () =>{
    const  date = new Date()
    const today = date.toDateString()
    return(
        <main id="profile">
            <section className="profile-img-container">
                <img className="img" src="https://cdn.pixabay.com/photo/2016/11/29/03/15/man-1867009_1280.jpg" alt="user-profile-image" />
            </section>
            <section className="personal-information">
                <img id="chincheta" src="https://cdn.icon-icons.com/icons2/1632/PNG/512/62931pushpin_109275.png" alt="chincheta" />
                <p>Bienvenido <strong>Edison Javier</strong></p>
                <blockquote >
                    <p className="text-center"><i>Ordena tu día, y verás cómo cada pequeño paso se convierte en una danza armoniosa de logros y serenidad.</i></p>
                    <cite>Anónimo</cite>
                </blockquote>
                <p className="text-muted small">Fecha de hoy : <span className="date"> {today} </span></p>
            </section>
        </main>
    )
}

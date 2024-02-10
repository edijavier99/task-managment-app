import React, { useState, useEffect, useMemo } from "react";
import "../../styles/components/profile.css";
import {ChangeProfileImg} from "../component/changeProfileImg"


const useScrollHeight = () => {
    const [height, setHeight] = useState(180);

    useEffect(() => {
        const handleScroll = () => {
            const newHeight = Math.max(40, 180 - window.scrollY);
            setHeight(newHeight);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return height;
};

export const Profile = () => {
    const height = useScrollHeight();
    const username = localStorage.getItem("username");
    const today = useMemo(() => new Date().toDateString(), []);
    const [userImage, setUserImage] = useState(localStorage.getItem("userImage"));
    const token = localStorage.getItem("jwt-token")

    const handleImageChange = (imageUrl) => {
        setUserImage(imageUrl);
    };


    return (
        <main id="profile">
            <section className="profile-img-container">
                <img className="img" src={token ? userImage : "https://cdn.pixabay.com/photo/2016/11/29/03/15/man-1867009_1280.jpg" } alt="user-profile-image" />
                <ChangeProfileImg onImageChange={handleImageChange} />
            </section>
            <section className="personal-information dynamic-div" style={{ height: `${height}px` }}>
                <img id="chincheta" src="https://cdn.icon-icons.com/icons2/1632/PNG/512/62931pushpin_109275.png" alt="chincheta" />
                <p className="user-name">Bienvenido <strong>{username}</strong></p>
                <blockquote>
                    <p className="text-center"><i>Ordena tu día, y verás cómo cada pequeño paso se convierte en una danza armoniosa de logros y serenidad.</i></p>
                    <cite>Anónimo</cite>
                </blockquote>
                <p className="todayDate">Fecha de hoy: <span className="date">{today}</span></p>
            </section>
        </main>
    );
};

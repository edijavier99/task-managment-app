import React, { useEffect, useState } from "react";

export const RamdonText = () =>{
    const [text,setText] = useState()
    useEffect(()=>{
        const randomTextSelection = () => {
            const number = Math.floor(Math.random() * textArr.length);
            setText(textArr[number]);
        };
        randomTextSelection();
    },[])
    const textArr = [
        "La organización es la clave del éxito; planifica tu día, define tus tareas y haz que cada momento cuente.",
        "Ordena tu día, y verás cómo cada pequeño paso se convierte en una danza armoniosa de logros y serenidad.",
        "Un día bien organizado es un día bien vivido. Organiza tus tareas y proyectos para alcanzar tus metas.",
        "La planificación eficiente es el primer paso hacia el logro. Organiza tus tareas con sabiduría y verás grandes resultados.",
        "Un día bien planificado es un día lleno de oportunidades. Organiza tus prioridades y haz que cada momento cuente.",
        "El secreto de un día productivo radica en una buena organización. Toma el control, organiza tus tareas y alcanza tus objetivos.",
        "La organización te da el poder de transformar tus sueños en realidad. Organiza tu día, enfoca tus energías y alcanza la grandeza.",
        "El caos nunca conduce al éxito. Organiza tus proyectos, gestiona tu tiempo y disfruta de la paz interior que trae la organización.",
        "La organización es la brújula que te guía hacia el éxito. Organiza tus tareas, planifica tus proyectos y avanza con confianza hacia tus metas."
    ];
    return(
        <section>
            <p className="text-center"><i>{text}</i></p>
        </section>
    )
}
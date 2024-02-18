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
        "Organization is the key to success; plan your day, define your tasks, and make every moment count.",
        "Order your day, and you'll see how every small step becomes a harmonious dance of achievements and serenity.",
        "A well-organized day is a well-lived day. Organize your tasks and projects to reach your goals.",
        "Efficient planning is the first step towards achievement. Organize your tasks wisely and you'll see great results.",
        "A well-planned day is a day full of opportunities. Organize your priorities and make every moment count.",
        "The secret to a productive day lies in good organization. Take control, organize your tasks, and achieve your objectives.",
        "Organization gives you the power to turn your dreams into reality. Organize your day, focus your energies, and achieve greatness.",
        "Chaos never leads to success. Organize your projects, manage your time, and enjoy the inner peace that organization brings.",
        "Organization is the compass that guides you to success. Organize your tasks, plan your projects, and move forward with confidence towards your goals."
    ];    
    return(
        <section>
            <p className="text-center"><i>{text}</i></p>
        </section>
    )
}
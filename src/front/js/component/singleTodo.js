import React from "react";

export const SingleTodo = (props) =>{
    return(
        <div className="todo-list-item" key={props.index}>
            <span className="check" onClick={() =>{ props.handleCheckClick(props.item.id)}}>
                {props.completed && "✔"}            
            </span>
            <li className="ps-5 d-flex">{props.item.title}
                <div className="ms-auto me-2 todo-delete-icon"><i className="fa-solid fa-trash" onClick={()=>{props.deleteTodo(props.item.id,props.item)}} style={{color:"#af3528"}}></i></div>
            </li>
            <span className="date-for-todos text-muted">{props.date.toDateString()}</span>
        </div>
    )
}
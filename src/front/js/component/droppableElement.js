import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export const DroppableElement = (props) => {
  const [addCart, setAddCart] = useState(false);
  const [stepTitle, setStepTitle] = useState("");

  const closeAddCart = () => {
    setAddCart(false);
    setStepTitle("");
  };

  const submitAddCart = () => {
    if (stepTitle.trim() !== "") {
      props.onTextareaChange(stepTitle, props.droppableId);
      setStepTitle("");
    }
  };

  return (
    <section className="organizer-inner-container mb-3">
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <div
            className={`organizer-board ${
              snapshot.isDraggingOver ? "draggingActive" : ""
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h3>Pasos</h3>
            {props.stageContainer.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <span
                    className={`organizer-item ${
                      snapshot.isDragging ? "drag" : ""
                    }`}
                    key={item.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <p>{item.name}</p>
                    <p>{item.surname}</p>
                  </span>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className={`addCartBoard ${addCart ? "" : "d-none"}`}>
        <textarea
          rows={3}
          placeholder="Introduce un titulo a esta carta..."
          onChange={(e) => setStepTitle(e.target.value)}
          value={stepTitle}
        ></textarea>
      </div>

      <div className="addCartToOrganizer">
        <button
          className={`btn text-muted ${addCart ? "addCartActive" : ""}`}
          onClick={addCart ? submitAddCart : () => setAddCart(true)}
        >
          <i className="fa-solid fa-plus"></i> {addCart ? "Añadir Tarjeta" : "Añadir"}
        </button>
        <i
          className={`fa-solid fa-times text-muted ps-4 ${
            addCart ? "" : "d-none"
          }`}
          onClick={closeAddCart}
        ></i>
      </div>
    </section>
  );
};

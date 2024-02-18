import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export const DroppableElement = (props) => {
  const [addCart, setAddCart] = useState(false);
  const [stepTitle, setStepTitle] = useState("");
  const [stageContainer, setStageContainer] = useState(props.stageContainer);

  useEffect(() => {
    setStageContainer(props.stageContainer);
  }, [props.stageContainer]);

  const closeAddCart = () => {
    setAddCart(false);
    setStepTitle("");
  };
  const submitAddCart = () => {
      props.onTextareaChange(stepTitle, props.droppableId);
      setStepTitle("");
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
            <h3 className="mb-3">{props.stageName}</h3>
            {stageContainer.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
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
                    <p>{item.title}</p>
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
          rows={5}
          placeholder="Write a title to this card..."
          onChange={(e) => setStepTitle(e.target.value)}
          value={stepTitle}
        ></textarea>
      </div>

      <div className="addCartToOrganizer">
        <button
          className={`btn text-muted ${addCart ? "addCartActive" : ""}`}
          onClick={addCart ? submitAddCart : () => setAddCart(true)}
        >
          <i className="fa-solid fa-plus"></i> {addCart ? "Add Card" : "Add"}
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

import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd";

export const DroppableElement = (props) =>{
    return(
        <Droppable droppableId={props.droppableId}>
          {(provided) => (
            <section className="organizer-inner-container" {...provided.droppableProps} ref={provided.innerRef}>
              <div className="organizer-board">
                <h3>Pasos</h3>
                {props.stageContainer.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <span
                        className="organizer-item"
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
            </section>
          )}
        </Droppable>
    )
}
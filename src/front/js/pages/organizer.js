// App.js
import React,{ useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../styles/pages/organizer.css"

export const Organizer = () => {


  const finalSpaceCharacters = [
    {
      id: 'gary',
      name: 'Gary Goodspeed',
      surname: 'Esponja'
    },
    {
      id: 'leopoldo',
      name: 'Leopoldo Goodspeed',
      surname: 'Calamardo'
    }
  ];

  const pasosArray = [
    {
      id: 'gary',
      name: 'Gary Goodspeed',
      surname: 'Esponja'
    },
    {
      id: 'leopoldo',
      name: 'Leopoldo Goodspeed',
      surname: 'Calamardo'
    },
    {
      id: 'tigre',
      name: 'Tigre Goodspeed',
      surname: 'Nobita'
    },
  ];


  const [pasos, setPasos ] = useState(pasosArray)
  const [characters, updateCharacters] = useState(finalSpaceCharacters);


  const onDragEnd = (result) => {
    console.log(result);
    const items = Array.from(pasos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPasos(items);
  };

  return (
    <section>
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters">
        {(provided) => {
            return (
              <ul style={{listStyle: "none" , backgroundColor: "black"}} className="character" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ id, name, surname }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        key={id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                        <p>{surname}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                   {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
      </DragDropContext> */}


     
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="prueba" >
            {(provided)=>{
              return(
                <section className=" organizer-container" {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="organizer-board">
                      <h3>Pasos</h3>
                      {pasos.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <span
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
                    <div className="organizer-board">
                    <h3>En proceso</h3>
                    </div>
                    <div className="organizer-board">
                    <h3>Terminado</h3>
                  </div>
                </section>
              )
            }}
          </Droppable>
        </DragDropContext>
    </section>
  );
};

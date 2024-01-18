import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../styles/pages/organizer.css";

export const Organizer = () => {
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

  const [pasos, setPasos] = useState(pasosArray);
  const [enProceso, setEnProceso] = useState([]);
  const [terminado, setTerminado] = useState([]);

 
    const onDragEnd = (result) => {
      const { source, destination, draggableId } = result;
      console.log(result);
      
      if(!destination) return;
      if(destination.droppableId === source.droppableId && destination.index === source.index) return;
      
      const reorderList = (startIndex, endIndex, list) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };
  

      if (source.droppableId === destination.droppableId) {
        let updatedList;
        if (source.droppableId === 'prueba-pasos') {
          updatedList = reorderList(source.index, destination.index, pasos);
          setPasos(updatedList);
        } else if (source.droppableId === 'prueba-enProceso') {
          updatedList = reorderList(source.index, destination.index, enProceso);
          setEnProceso(updatedList);
        } else if (source.droppableId === 'prueba-terminado') {
          updatedList = reorderList(source.index, destination.index, terminado);
          setTerminado(updatedList);
        }
      }else{
        let draggedItem;

  // Eliminar el elemento del contenedor de origen
        if (source.droppableId === 'prueba-pasos') {
          setPasos((prevPasos) => {
            const newPasos = [...prevPasos];
            draggedItem = newPasos.splice(source.index, 1)[0];
            return newPasos;
          });
        } else if (source.droppableId === 'prueba-enProceso') {
          setEnProceso((prevEnProceso) => {
            const newEnProceso = [...prevEnProceso];
            draggedItem = newEnProceso.splice(source.index, 1)[0];
            return newEnProceso;
          });
        } else if (source.droppableId === 'prueba-terminado') {
          setTerminado((prevTerminado) => {
            const newTerminado = [...prevTerminado];
            draggedItem = newTerminado.splice(source.index, 1)[0];
            return newTerminado;
          });
        }
        if (destination.droppableId === 'prueba-enProceso') {
          setEnProceso((prevEnProceso) => {
            const newEnProceso = [...prevEnProceso];
            newEnProceso.splice(destination.index, 0, draggedItem);
            return newEnProceso;
          });
        } else if (destination.droppableId === 'prueba-terminado') {
          setTerminado((prevTerminado) => {
            const newTerminado = [...prevTerminado];
            newTerminado.splice(destination.index, 0, draggedItem);
            return newTerminado;
          });
        }
        else if (destination.droppableId === 'prueba-pasos') {
          setPasos((prevPasos) => {
            const newPasos = [...prevPasos];
            newPasos.splice(destination.index, 0, draggedItem);
            return newPasos;
          });
        }
      }
    }
  return (
    <section className="organizer-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="prueba-pasos">
          {(provided) => (
            <section className="organizer-inner-container" {...provided.droppableProps} ref={provided.innerRef}>
              <div className="organizer-board">
                <h3>Pasos</h3>
                {pasos.map((item, index) => (
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

        <Droppable droppableId="prueba-enProceso">
          {(provided) => (
            <section className="organizer-inner-container" {...provided.droppableProps} ref={provided.innerRef}>
              <div className="organizer-board">
                <h3>En proceso</h3>
                {enProceso.map((item, index) => (
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

        <Droppable droppableId="prueba-terminado">
          {(provided) => (
            <section className="organizer-inner-container" {...provided.droppableProps} ref={provided.innerRef}>
              <div className="organizer-board">
                <h3>Terminado</h3>
                {terminado.map((item, index) => (
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
      </DragDropContext>
    </section>
  );
};

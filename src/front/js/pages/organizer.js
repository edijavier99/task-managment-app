import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../styles/pages/organizer.css";
import { DroppableElement } from "../component/droppableElement";


export const Organizer = () => {
  const [newItem, setNewItem] = useState()
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
      const { source, destination } = result;      
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

  const handleTextareaChange = (value, droppableId) => {
      setNewItem("")
      if (droppableId === "prueba-pasos") {
        setPasos((prevPasos) => [...prevPasos, { id: Date.now().toString(), name: value }]);
      } else if (droppableId === "prueba-enProceso") {
        setEnProceso((prevEnProceso) => [...prevEnProceso, { id: Date.now().toString(), name: value }]);
      } else if (droppableId === "prueba-terminado") {
        setTerminado((prevTerminado) => [...prevTerminado, { id: Date.now().toString(), name: value }]);
      }
  };
  
  return (
    <section id="projects">
      <header className="projects-header d-flex align-items-center justify-content-center">
          <h1>Área de Proyectos</h1>
      </header>
      <main>
      <div > 
        <h3>Tus proyectos</h3>
      </div>
      <h2 className="text-center my-5">Panel de proceso</h2>
        <section className="organizer-container">
          <DragDropContext onDragEnd={onDragEnd}>
            <DroppableElement droppableId ="prueba-pasos" stageName="Pasos" stageContainer ={pasos} onTextareaChange={handleTextareaChange}  />
            <DroppableElement droppableId ="prueba-enProceso" stageName="En Proceso" stageContainer ={enProceso}  onTextareaChange={handleTextareaChange} />
            <DroppableElement droppableId ="prueba-terminado" stageName="Finalizado" stageContainer ={terminado}  onTextareaChange={handleTextareaChange} />
          </DragDropContext>
        </section>
      </main>
    </section>
  );
};

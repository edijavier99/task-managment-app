import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, CardBody, Collapse } from 'reactstrap';
import "../../styles/components/dashboard.css"
import { useNavigate } from "react-router-dom";
export const Dashboard = () =>{
    const navigate = useNavigate()
    const [openPanel, setOpenPanel] = useState(null);
    const togglePanel = (key) => {
        setOpenPanel(openPanel === key ? null : key);
      };
    const Hoy = () =>{
        return(
            <>
                <p>Le Lorem Ipsum est simplement...</p>
                <button className="btn btn-success" onClick={()=>navigate("/todo-list")}>ToDo</button>
            </>
        )
    }
    const Notas = () =>{
        return(
            <>
                <p>Le Lorem Ipsum est simplement...</p>
                <button className="btn btn-success" onClick={()=>navigate("/notas")}>Notas</button>
            </>
        )
    }
    const panelData = [
        { key: 'Hoy', content:'Some placeholder content for the Carrito panel.' },
        { key: 'Tareas', content:  <Hoy/> },
        { key: 'Notas', content: <Notas/> },
        { key: 'Historial', content: 'Some placeholder content for the About Me panel.' },
      ];
    useEffect(()=>{
        togglePanel(panelData[0].key)
    },[])
      
   
   return(
    <section className="dashboard">
        <div className="titles ">
        {panelData.map(({ key }) => (
                <Button key={key}onClick={() => togglePanel(key)}>
                  {key}
                </Button>
              ))}
        </div>
        <div className="dasboard-info">
            {panelData.map(({ key, content }) => (
                <Collapse key={key} isOpen={openPanel === key}>
                <Card>
                    <CardBody>{content}</CardBody>
                </Card>
                </Collapse>
            ))}
        </div>
    </section>
   )
}
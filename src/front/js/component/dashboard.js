import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, CardBody, Collapse } from 'reactstrap';
import "../../styles/components/dashboard.css"
import { useNavigate } from "react-router-dom";
import { Historial } from "./historial";
import Notes from "./notes";
import {TodayTodos} from "./todayTodos"

export const Dashboard = () =>{
    const navigate = useNavigate()
    const [openPanel, setOpenPanel] = useState(null);
    const togglePanel = (key) => {
        setOpenPanel(openPanel === key ? null : key);
    };
  
    const panelData = [
        { key: 'Hoy', content:  <TodayTodos/> },
        { key: 'Organizador', content:'Some placeholder content for the Carrito panel.' },
        { key: 'Notas', content:<Notes /> },
        { key: 'Historial', content: <Historial /> },
      ];
    useEffect(()=>{
        togglePanel(panelData[0].key)
    },[])
      
   
   return(
    <section className="dashboard">
        <div className="titles ">
        {panelData.map(({ key }) => (
                <Button key={key} onClick={() => togglePanel(key)}>
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
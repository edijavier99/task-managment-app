
import React, { useState } from "react";
import { Button, Card, CardBody, Collapse } from 'reactstrap';
import "../../styles/components/dashboard.css"
import { useNavigate } from "react-router-dom";
import { Historial } from "./historial";
import Notes from "./notes";
import { TodayTodos } from "./todayTodos";
import { OrganizerHome } from "./organizerHome";

const PanelButton = ({ panelKey, onClick, label }) => (
    <Button onClick={() => onClick(panelKey)}>
      {label}
    </Button>
  );
  
  const PanelContent = ({ children }) => (
    <Card>
      <CardBody>{children}</CardBody>
    </Card>
  );
  
  export const Dashboard = () => {
    const navigate = useNavigate();
    const [openPanel, setOpenPanel] = useState("Hoy");
  
    const togglePanel = (key) => {
      setOpenPanel(openPanel === key ? null : key);
    };
  
    const panelData = [
      { key: 'Hoy', content: <TodayTodos /> },
      { key: 'Proyectos', content: <OrganizerHome /> },
      { key: 'Notas', content: <Notes /> },
      { key: 'Historial', content: <Historial /> },
    ];
  
    return (
      <section className="dashboard">
        <div className="titles ">
          {panelData.map(({ key }) => (
            <PanelButton
              key={key}
              onClick={() => togglePanel(key)}
              label={key}
            />
          ))}
        </div>
        <div className="dasboard-info">
          {panelData.map(({ key, content }) => (
            key === openPanel && (
              <Collapse key={key} isOpen={openPanel === key}>
                <PanelContent>{content}</PanelContent>
              </Collapse>
            )
          ))}
        </div>
      </section>
    );
  };
  
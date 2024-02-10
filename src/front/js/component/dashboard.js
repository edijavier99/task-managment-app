import React, { useState, Suspense,lazy } from "react";
import { Button, Card, CardBody, Collapse } from 'reactstrap';
import "../../styles/components/dashboard.css"
import { useNavigate } from "react-router-dom";

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

const LazyTodayTodos = lazy(() => import('./todayTodos.js'));
const LazyOrganizerHome = lazy(() => import('./organizerHome.js'));
const LazyNotes = lazy(() => import('./notes.js'));
const LazyHistorial = lazy(() => import('./historial.js'));

export const Dashboard = () => {
  const [openPanel, setOpenPanel] = useState("Hoy");
  const togglePanel = (key) => {
    setOpenPanel(openPanel === key ? null : key);
  };

  const panelData = [
    { key: 'Hoy', content: <LazyTodayTodos /> },
    { key: 'Proyectos', content: <LazyOrganizerHome /> },
    { key: 'Notas', content: <LazyNotes /> },
    { key: 'Historial', content: <LazyHistorial /> },
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
              <PanelContent>
                <Suspense fallback={<div>Loading...</div>}>
                  {content}
                </Suspense>
              </PanelContent>
            </Collapse>
          )
        ))}
      </div>
    </section>
  );
};

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { ActionList } from "./components/ActionList";
import "./App.css";

export type Tag = {
  key?: string | number;
  id: string;
  label: string;
};

function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<ActionList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;

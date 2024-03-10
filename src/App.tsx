import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Container className="my-4">
        <Routes>
          <Route path="/" />
          <Route path="/new" />
          <Route path="/edit" />
        </Routes>
      </Container>
    </>
  );
}

export default App;

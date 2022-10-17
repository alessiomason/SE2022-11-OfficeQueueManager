import { Button, Col, Nav, Row, ListGroup, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { default as Client } from "../icons/client.svg";
import { default as Manager } from "../icons/manager.svg";
import { default as Officer } from "../icons/officer.svg";

function MyHome() {

  const navigate = useNavigate();

  return (

    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}> 
        <Container  className="home-border">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1> Choose  user type: </h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={{ span: 3, offset: 2 }}>
          <Button size="lg" onClick={() => navigate("/client")}>
            <img src={Client} alt="client" className='me-2 svg' /> Client
          </Button>
        </Col>
        <Col md={3}>
          <Button size="lg" onClick={() => navigate("/officer")}>
            <img src={Officer} alt="officer" className='me-2' /> Officer
          </Button>
        </Col>
        <Col md={3}>
          <Button size="lg" onClick={() => navigate("/manager")}>
            <img src={Manager} alt="manager" className='me-2' /> Manager
          </Button>
        </Col>
      </Row>
    </Container>
        </Col>
      </Row>
    </Container>
    
  );
}

export default MyHome;

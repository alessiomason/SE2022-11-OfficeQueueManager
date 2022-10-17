import { Button, Col, Nav, Row, ListGroup, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { default as Client } from "../icons/client.svg";
import { default as Manager } from "../icons/manager.svg";
import { default as Officier } from "../icons/officier.svg";

function MyHome() {

  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 4 }}>
          <h1> Choose  user type: </h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={{ span: 2, offset: 4 }}>
          <Button size="lg" onClick={() => navigate("/client")}>
            <img src={Client} alt="client" className='me-2 svg' /> Client
          </Button>
        </Col>
        <Col md={2}>
          <Button size="lg" onClick={() => navigate("/officier")}>
            <img src={Officier} alt="officier" className='me-2' /> Officier
          </Button>
        </Col>
        <Col md={2}>
          <Button size="lg" onClick={() => navigate("/manager")}>
            <img src={Manager} alt="manager" className='me-2' /> Manager
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MyHome;

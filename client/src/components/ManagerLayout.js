import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown } from "react-bootstrap";
import MyLoginForm from './LoginForm';
import { useNavigate } from "react-router-dom";
import { default as Manager } from "../icons/manager.svg";
function MyManagerLayout(props) {
  const navigate = useNavigate();
  return (
    <>
   
       <Container>
       <Row>
         <Col md={{ span: 6, offset: 4 }}>
           <h1> Create new service type: </h1>
         </Col>
       </Row>
       <Row className="mt-5">
         <Col md={{ span: 2, offset: 4 }}>
           <Button size="lg" onClick={() => navigate("/manager")}>
             <img src={Manager} alt="manager" className='me-2 svg' /> Create
           </Button>
         </Col>
       </Row>
     </Container>
    
    </>
  );
}

export default MyManagerLayout;
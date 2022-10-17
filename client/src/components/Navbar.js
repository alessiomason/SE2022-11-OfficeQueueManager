import { Button, Col, Nav, Row, ListGroup, Navbar, Container, NavDropdown } from "react-bootstrap";
import { default as Menu } from "../icons/menu.svg";
import { default as Client } from "../icons/client.svg";
import { default as Worker } from "../icons/worker.svg";
import { default as User } from '../icons/user.svg';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../Navbar.css';

function MyNavbar(props) {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const navigate = useNavigate();

  return (

    <>

      <Navbar fixed="top" expand="lg" bg="success" variant="dark">
        <Container fluid className="mx-1">
          <Col md={1}>
            <Navbar.Brand type="button">
              <img src={Menu} alt="menu" onClick={showSidebar} />
            </Navbar.Brand>
          </Col>
          <Col md={{ span: 3, offset: 3 }}>
            <Navbar.Brand type="button" bg='white' onClick={() => navigate("/")} >
              <h3 className='pTag'> Office Queue Management System </h3>
            </Navbar.Brand>
          </Col>
          <Col md={{ span: 1, offset: 4 }} >
            <Navbar.Brand>
              {props.loggedIn ? <Button onClick={props.doLogout}>Logout</Button> :
              <img src={User} alt="user_image" bg="blue" className="float-end" /> }
            </Navbar.Brand>
          </Col>
        </Container>
      </Navbar>

      <Nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        
        <ListGroup variant="flush">
          <ListGroup.Item className='menu-item mb-3'> 
            <h4 className='side-title'> Choose user: </h4> 
            </ListGroup.Item>
          <ListGroup.Item action className='menu-item' onClick={() => navigate("/client")}>
            <img src={Client} alt="client" className='me-2 svg' /> Client
          </ListGroup.Item>
          <ListGroup.Item action className='menu-item' onClick={() => navigate("/manager")}>
            <img src={Worker} alt="manager" className='me-2' /> Worker
          </ListGroup.Item>
        </ListGroup>
        
      </Nav>

    </>
  );
}

export default MyNavbar;
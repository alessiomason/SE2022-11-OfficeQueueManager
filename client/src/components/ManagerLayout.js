import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown } from "react-bootstrap";
import { default as UserLogin } from "../icons/user-login.svg";
import { default as Password } from "../icons/password.svg";
import MyLoginForm from './LoginForm';

function MyManagerLayout(props) {
  return (
    <>
    {!props.loggedIn ? <MyLoginForm /> :
        <Container>

        </Container>
    }
    </>
  );
}

export default MyManagerLayout;
import { useState } from 'react';
import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown, Alert } from "react-bootstrap";
import { default as UserLogin } from "../icons/user-login.svg";
import { default as Password } from "../icons/password.svg";
import '../App.css';

function MyLoginForm(props) {

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [username, setUsername] = useState('u2@p.it');
  const [password, setPassword] = useState('password');

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    props.setMessage('');
    const credentials = { username, password };

    if (username.trim() === '') {
      valid = false;
      props.setMessage('Lo username non può essere vuoto o contenere solo spazi.');
    }

    if (valid && password.trim() === '') {
      valid = false;
      props.setMessage('La password non può essere vuota o contenere solo spazi.');
    }

    if (valid && !validateEmail(username)) {
      valid = false;
      props.setMessage('Email non valida.');
    }

    if (valid) {
      props.doLogin(credentials);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Container className="login-border">
              <Row className="mb-5">
                <Col md={{ span: 10, offset: 2 }}>
                  <h2 className="login-title"> {"Login as " + props.userType} </h2>
                </Col>
              </Row>
              <Row>
                <Col >
                  <Form onSubmit={handleSubmit}>
                    {props.message && <Alert variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert>}
                    <Row>
                      <Col md={1}>
                        <img src={UserLogin} alt="user" />
                      </Col>
                      <Col md={11}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control type="email" placeholder="Enter email address" value={username} onChange={ev => setUsername(ev.target.value)} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={1}>
                        <img src={Password} alt="password" className='me-2 svg login' />
                      </Col>
                      <Col md={11}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Control type="password" placeholder="Enter password" value={password} onChange={ev => setPassword(ev.target.value)} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={{ span: 4, offset: 4 }}>
                        <Button variant="primary" type="submit" > Submit </Button>
                      </Col>
                    </Row>

                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default MyLoginForm;
import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown } from "react-bootstrap";
import { default as UserLogin } from "../icons/user-login.svg";
import { default as Password } from "../icons/password.svg";

function MyLoginForm() {
  return (
    <>
      <Container>
        <Row className="mb-4">
          <Col md={{ span: 4, offset: 4 }}>
            <h2 className="login-title"> Login </h2>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form>
              <Row>
                <Col md={1}>
                  <img src={UserLogin} alt="user" />
                </Col>
                <Col md={11}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email address" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <img src={Password} alt="password" className='me-2 svg login' />
                </Col>
                <Col md={11}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Enter password" />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyLoginForm;
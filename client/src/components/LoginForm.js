import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown } from "react-bootstrap";
import { default as UserLogin } from "../icons/user-login.svg";
import { default as Password } from "../icons/password.svg";
import '../App.css';

function MyLoginForm(props) {
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
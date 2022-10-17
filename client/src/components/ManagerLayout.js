import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown } from "react-bootstrap";

function MyManagerLayout() {
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email address" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>
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

export default MyManagerLayout;
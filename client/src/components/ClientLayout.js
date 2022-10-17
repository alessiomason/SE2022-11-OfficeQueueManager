import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown, ButtonGroup } from "react-bootstrap";
import '../App.css';

import { default as Confirm } from '../icons/confirm.svg';

function MyClientLayout() {
  return ( 
        <>
      <Container>
        <Row>
          <Col md={{ span: 5, offset: 1 }}>
            <Form >
              <Row className="client-border1">
                <Col md={{ span: 8, offset: 1 }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter client name" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Button variant="primary" type="submit" > Submit </Button>
                </Col>
              </Row>
            </Form>
            <Row className="client-border2 mt-5">
              <Col md={{ span: 5, offset: 1 }}>
                <Col md={{ span: 8, offset: 4 }}>
                  <h4 > Your tickets: </h4>
                </Col>
                <ListGroup variant="flush">
                  <ListGroup.Item action className='ticket-item'>
                    aaaaaaaaaaaaaaaaaaaaaaaa
                  </ListGroup.Item>
                  <ListGroup.Item action className='ticket-item' >
                    bbbbbbbbbbbbbbbbbbbbbbbb
                  </ListGroup.Item>
                  <ListGroup.Item action className='ticket-item'>
                    cccccccccccccccccccccccc
                  </ListGroup.Item>
                  <ListGroup.Item action className='ticket-item'>
                    dddddddddddddddddddddddd
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Col>
          <Col md={{span: 4, offset: 1 }} className="client-border3">
                <Col md={{ span: 8, offset: 4 }}>
                  <h4 > Services list: </h4>
                </Col>
                <ListGroup variant="flush">
                  <ListGroup.Item action className='ticket-item'>
                    aaaaaaaaaaaaaaaaaaaaaaaa
                    <Button> <img src={Confirm} alt="confirm" /></Button>
                  </ListGroup.Item>
                  <ListGroup.Item action className='ticket-item' >
                    bbbbbbbbbbbbbbbbbbbbbbbb
                    <Button> <img src={Confirm} alt="confirm" /></Button>
                  </ListGroup.Item>
                  <ListGroup.Item action className='ticket-item'>
                    cccccccccccccccccccccccc
                    <Button> <img src={Confirm} alt="confirm" /></Button>
                  </ListGroup.Item>
                  <ListGroup.Item action className='ticket-item'>
                    dddddddddddddddddddddddd
                    <Button> <img src={Confirm} alt="confirm" /></Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={{span:6, offset: 5}} >
                <Button> Show the pannel to check queues</Button>
              </Col>
            </Row>
          </Container>
        </>
        );
}

        export default MyClientLayout;
import { useState } from 'react';
import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown, ButtonGroup } from "react-bootstrap";
import '../App.css';
import API from '../API';

import { default as Confirm } from '../icons/confirm.svg';

function MyClientLayout() {
  const [clientName, setClientName] = useState('');
  const [ticketNumber, setTicketNumber] = useState(-1);
  const [serviceType, setServiceType] = useState('');

  async function handleSubmit() {
    const t = await API.getTicket(clientName);
    setTicketNumber(t);
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Row className="client-border1">
            {ticketNumber < 0 ?
              <RequestTicket handleSubmit={handleSubmit} clientName={clientName} setClientName={setClientName} serviceType={serviceType} setServiceType={setServiceType} /> :
              <ShowTicket clientName={clientName} ticketNumber={ticketNumber} />}
          </Row>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col></Col>
        <Col md={4} >
          <Button className='queues-btn'>Show the panel to check queues</Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

function RequestTicket(props) {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Row>
        <h3 className="title">Enter your name, pick the type of service needed and request a ticket:</h3>
        <Col md={{ span: 8, offset: 1 }}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter client name" value={props.clientName} onChange={ev => props.setClientName(ev.target.value)} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Button variant="primary" type="submit">Submit</Button>
        </Col>
      </Row>
      <Row className='select-row'>
        <Col md={{ span: 3, offset: 1 }}>
          <h6>Select the type of service needed:</h6>
        </Col>
        <Col md={{ span: 5, offset: 1 }}>
          <select value={props.serviceType} onChange={ev => props.setServiceType(ev.target.value)} className="select">
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col md={4}>
          <Button type='submit' className='request-button'>Request a ticket</Button>
        </Col>
        <Col></Col>
      </Row>
    </Form>
  );
}

function ShowTicket(props) {
  return (
    <>
      <h3 className='title'>Your name:</h3>
      <div className='d-flex justify-content-center'>
        <h4 className='client-name'>{props.clientName}</h4>
      </div>
      <h3 className='title'>Your ticket number:</h3>
      <div className='d-flex justify-content-center'>
        <h4 className='ticket-number'>{props.ticketNumber}</h4>
      </div>
    </>
  );
}

export default MyClientLayout;
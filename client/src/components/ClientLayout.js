import { useEffect, useState } from 'react';
import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown, ButtonGroup, Alert } from "react-bootstrap";
import '../App.css';
import API from '../API';

function MyClientLayout(props) {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [clientName, setClientName] = useState('');
  const [ticketNumber, setTicketNumber] = useState(-1);
  const [serviceTypeRequested, setServiceTypeRequested] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.getServices()
      .then(sTypes => { setServiceTypes(sTypes); setServiceTypeRequested(sTypes[0].tagName); })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (clientName == '') {
      setMessage('Your name cannot be empty!');
      return;
    }

    const ticket = API.getTicket(clientName, serviceTypeRequested);

    ticket.then(value => {
      setTicketNumber(value);
    }).catch(err => {
      console.log(err);
    })

  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Row className="client-border1">
            {ticketNumber < 0 ?
              <RequestTicket serviceTypes={serviceTypes} handleSubmit={handleSubmit} clientName={clientName} setClientName={setClientName} services={props.services} serviceTypeRequested={serviceTypeRequested} setServiceTypeRequested={setServiceTypeRequested} message={message} setMessage={setMessage} /> :
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
        <Col md={{ span: 10, offset: 1 }}>
        {props.message && <Alert variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert>}
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter client name" value={props.clientName} onChange={ev => props.setClientName(ev.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Row className='select-row'>
        <Col md={{ span: 3, offset: 1 }}>
          <h6>Select the type of service needed:</h6>
        </Col>
        <Col md={{ span: 5, offset: 1 }}>
          <select value={props.serviceTypeRequested} onChange={ev => props.setServiceTypeRequested(ev.target.value)} className="select">
            {props.serviceTypes.map(s => <option key={s.id} value={s.tagName}>{s.tagName}</option>)}
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
import { Button, Alert, Form } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function ServiceTypeForm(props) {
  const { serviceTypeId } = useParams();

  const serviceTypeToEdit = props.serviceTypes.find( (s) => s.id === serviceTypeId );

  const [tagName, setTagName] = useState(serviceTypeToEdit ? serviceTypeToEdit.tagName : '');
  const [serviceTime, setServiceTime] = useState(serviceTypeToEdit  ? serviceTypeToEdit.serviceTime : 0);

  const [errorMsg, setErrorMsg] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
     if (tagName.trim().length === 0) {
      setErrorMsg('Il nome del tipo di servizio deve contenere dei caratteri che non siano solo spazi');
    } else {
      // add
      const newServiceType = { tagName: tagName.trim(), serviceTime: serviceTime }
      props.addServiceType(newServiceType);
      navigate('/manager');
    }
  }

  

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Form  code: {serviceTypeId}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Tag name</Form.Label>
                <Form.Control required={true} value={tagName} onChange={ev => setTagName(ev.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>ServiceTime</Form.Label>
                <Form.Control type='number' min={0} value={serviceTime} onChange={ev => setServiceTime(ev.target.value)} />
              </Form.Group>
              <Button type='submit' >Save</Button>
              <Button onClick={ ()=> navigate('/manager')} variant='secondary' >Cancel</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ServiceTypeForm;
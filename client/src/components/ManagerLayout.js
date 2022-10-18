import { Button, Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown ,Table} from "react-bootstrap";
import MyLoginForm from './LoginForm';
import { useNavigate } from "react-router-dom";
import { default as Manager } from "../icons/worker.svg";
function MyManagerLayout(props) {
  const navigate = useNavigate();
  return (
    <>
    {!props.loggedIn ? <MyLoginForm doLogin={props.doLogin} doLogout={props.doLogout} message={props.message} setMessage={props.setMessage} /> :
       <Container>
       <Row>
         <Col md={{ span: 6, offset: 4 }}>
           <h1> Create new service type: </h1>
         </Col>
       </Row>
       <Row className="mt-5">
         <Col md={6}>
           <Button size="lg" onClick={() => navigate("/service")}>
             <img src={Manager} alt="manager" className='me-2 svg' /> Create
            </Button>
         </Col>
       </Row>
       <Row>
         <Col md={{ span: 6, offset: 4 }}>
           <h1>Existing service types: </h1>
         </Col>
       </Row>
       <Row>
         <Col md={{ span: 6 }}>
         <ServiceTable services={props.services}></ServiceTable>
         </Col>
       </Row>
     </Container>
}
    </>
  );
}

function ServiceTable(props) {


  return (
      <>

          <Table>
              <thead >
                  <tr>
                      <th>Nome</th>
                      <th>Service Time</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      props.services.map((s) => <ServiceRow service={s} key={s.id}/>)
                  }
              </tbody>
          </Table>

      </>
  );

}


function ServiceRow(props) {

  return (
      <tr >
          <ServiceData service={props.service}/>
      </tr>
  );
}

function ServiceData(props) {
  return (
      <>
          <td>{props.service.tagName}</td>
          <td> {props.service.serviceTime}</td>
           </>
  );
}



export default MyManagerLayout;
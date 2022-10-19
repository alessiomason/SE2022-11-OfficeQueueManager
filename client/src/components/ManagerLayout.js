import {Col, Form, Nav, Row, ListGroup, Navbar, Container, NavDropdown, Table } from "react-bootstrap";
import MyLoginForm from './LoginForm';
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import "rsuite/dist/rsuite.min.css";
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
const EdIcon = ({ size }) => <EditIcon style={{ fontSize: size, marginRight: 10 }} />;
const DeleteIcon = ({ size }) => <TrashIcon style={{ fontSize: size, marginRight: 10 }} />;
const OutlineIcon = ({ size }) => <AddOutlineIcon style={{ fontSize: size, marginRight: 10 }} />;
function MyManagerLayout(props) {
  const navigate = useNavigate();
  return (
    <>
      {!props.loggedIn ? <MyLoginForm doLogin={props.doLogin} doLogout={props.doLogout} message={props.message} setMessage={props.setMessage} /> :
        <Container>
          <Row>
            <Col style={{display: 'flex', justifyContent: 'center'}}>
              <h1 style={{color:'azure'}}>Service types: </h1>
            </Col>
          </Row>
          <Row>
            <Col style={{display: 'flex', justifyContent: 'center', paddingLeft: '5em',paddingRight: '5em'}}>
              <ServiceTable services={props.services}></ServiceTable>
            </Col>
          </Row>
          <Row>
            <Col style={{display: 'flex', paddingLeft:'5em'}}>
              <Button className='m-1' onClick={()=>{navigate(`/create`)} }>
                <OutlineIcon size="1.5em"></OutlineIcon>  Create new service type
              </Button>
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            props.services.map((s) => <ServiceRow service={s} key={s.id} />)
          }
        </tbody>
      </Table>

    </>
  );

}


function ServiceRow(props) {

  return (
    <tr >
      <ServiceData service={props.service} />
    </tr>
  );
}

function ServiceData(props) {
  const navigate = useNavigate();

  return (
    <>
      <td>{props.service.tagName}</td>
      <td> {props.service.serviceTime}</td>
      <td><Button className='mx-2' onClick={()=>{navigate(`/edit/${props.service.id}`)} }> <EdIcon size="1.5em"></EdIcon>Edit</Button></td>
      <td><Button className='mx-2' color='red' appearance="primary" onClick={props.deleteServiceType(props.service.id)  }> <DeleteIcon size="1.5em"></DeleteIcon>Delete</Button></td>
    </>
  );
}



export default MyManagerLayout;
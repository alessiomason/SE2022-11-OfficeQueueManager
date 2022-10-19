import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import MyClientLayout from './components/ClientLayout';
import MyOfficerLayout from './components/OfficerLayout';
import MyServiceTypeForm from './components/ServiceTypeForm';
import MyManagerLayout from './components/ManagerLayout';
import MyHome from './components/Home';
import API from './API';

import { Col, Container, Row } from 'react-bootstrap';




function App() {
  return (
    <Router>
      <App2 />
    </Router>
  );
}

function App2() {




 const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [services, setServices] = useState('');


  function deleteServiceType(id) {
    //setServices( services.filter( (s)=> s.id !== id ) );
  }

  function addServiceType(serviceType) {
    setServices( oldServices => [...oldServices, serviceType] );
  }

  function updateServiceType(serviceType) {
    setServices(services => services.map(
      s => (s.id === serviceType.id) ? Object.assign({}, serviceType) : s
    ));
  }


  const navigate = useNavigate();

  function handleError(err) {
    console.log(err);
  }

  const doLogin = (credentials) => {
    API.login(credentials)
      .then(user => {
        setLoggedIn(true);
        setUser(user);
        setMessage('');
        if (user.access_right == 'manager')
          navigate('/manager');
        else if (user.access_right == 'officer')
          navigate('/officer');
        else
          navigate('/');
      })
      .catch(err => {
        setMessage(err);
      })
  }

  const doLogout = async () => {
    await API.logout();
    setLoggedIn(false);
    setUser({});
    navigate('/');
  }

  useEffect(() => {
    API.getServices()
      .then((s) => { setServices(s) })
      .catch( err => handleError(err));

  }, []);

  function MyLayout(props) {

    return (
      <>
        <Container>
          <Row>
            <MyNavbar loggedIn={props.loggedIn} user={props.user} doLogout={props.doLogout} />
          </Row>
        </Container>
        <Container fluid className='main'>
          <Row className="vheight-100">
            <Outlet />
          </Row>
        </Container>
      </>
    );
  }

  return (

    <Routes>
      <Route path="/" element={<MyLayout loggedIn={loggedIn} user={user} doLogout={doLogout} />}>
        <Route index element={<MyHome />} />
        <Route path="manager/" element={<MyManagerLayout services={services} deleteServiceType={deleteServiceType}
        loggedIn={loggedIn} user={user} doLogin={doLogin} doLogout={doLogout} message={message} setMessage={setMessage} />} />
        <Route path="officer/" element={<MyOfficerLayout loggedIn={loggedIn} user={user} doLogin={doLogin} doLogout={doLogout} message={message} setMessage={setMessage} />} />
        <Route path="client/" element={<MyClientLayout services={services} />} />
        <Route path="create/" element={<MyServiceTypeForm addServiceType={addServiceType} services={services} />} />
        <Route path="service/:serviceTypeId/" element={<MyServiceTypeForm services={services} addServiceType={updateServiceType}/>} />
      </Route>
    </Routes>

  );
}

export default App;

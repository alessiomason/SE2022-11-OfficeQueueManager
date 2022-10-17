import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import MyClientLayout from './components/ClientLayout';
import MyOfficerLayout from './components/OfficerLayout';
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
    }

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
          <Route path="manager/" element={<MyManagerLayout loggedIn={loggedIn} user={user} doLogin={doLogin} doLogout={doLogout} message={message} setMessage={setMessage} />} />
          <Route path="officer/" element={<MyOfficerLayout loggedIn={loggedIn} user={user} doLogin={doLogin} doLogout={doLogout} message={message} setMessage={setMessage} />} />
          <Route path="client/" element={<MyClientLayout />} />
        </Route>
      </Routes>

  );
}

export default App;

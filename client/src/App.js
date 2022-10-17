import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import MyClientLayout from './components/ClientLayout';
import MyOfficierLayout from './components/OfficierLayout';
import MyManagerLayout from './components/ManagerLayout';
import MyHome from './components/Home';

import { Col, Container, Row } from 'react-bootstrap';


function App() {

  function MyLayout() {

    return (
      <>
        <Container>
          <Row>
            <MyNavbar />
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

    <Router>
      <Routes>
        <Route path="/" element={<MyLayout />}>
          <Route index element={<MyHome />} />
          <Route path="manager/" element={<MyManagerLayout />} />
          <Route path="officier/" element={<MyOfficierLayout />} />
          <Route path="client/" element={<MyClientLayout />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;

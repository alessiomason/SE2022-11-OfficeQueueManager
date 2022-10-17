import { Container } from "react-bootstrap";
import MyLoginForm from './LoginForm';

function MyOfficierLayout(props) { 

    return ( 
        <>
        {!props.loggedIn ? <MyLoginForm doLogin={props.doLogin} doLogout={props.doLogout} message={props.message} setMessage={props.setMessage} /> :
            <Container>

            </Container>
        }
        </>
    );
}

export default MyOfficierLayout;
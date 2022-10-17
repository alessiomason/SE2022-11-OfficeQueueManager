import { Container } from "react-bootstrap";
import MyLoginForm from './LoginForm';

function MyOfficierLayout(props) { 

    return ( 
        <>
        {!props.loggedIn ? <MyLoginForm /> :
            <Container>

            </Container>
        }
        </>
    );
}

export default MyOfficierLayout;
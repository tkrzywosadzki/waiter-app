import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    return ( 
        <Navbar bg='primary' variant='dark' expand='lg' className='mt-4 mb-4 rounded'>
            <Container>
                <Navbar.Brand as={NavLink} to="/">Waiter.app</Navbar.Brand>
                <Nav className='d-flex justify-content-end'>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
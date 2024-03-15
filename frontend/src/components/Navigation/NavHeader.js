import { useContext } from 'react';
import './NavHeader.scss';
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {logoutUser} from '../../services/userService';
import { toast } from 'react-toastify';

const NavHeader = () => {
    const {user, logoutContext} = useContext(UserContext); 
    const location = useLocation();
    const history = useHistory();

    
    const handleLogout = async () => {
        let data = await logoutUser();

        localStorage.removeItem('jwt');
        logoutContext();

        if (data && +data.EC === 0) {
            toast.success('Logout succeds...');
            history.push('/login');
        } else {
            toast.error(data.EM);
        }
    }

    if(user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <div className='nav-header'>
                <Navbar expand="lg" bg="dark"  data-bs-theme="dark" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/">MICHI</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/" exact className="nav-link">Home</NavLink>
                                <NavLink to="/users" className="nav-link">Users</NavLink>
                                <NavLink to="/roles" className="nav-link">Roles</NavLink>
                                <NavLink to="/projects" className="nav-link">Projects</NavLink>
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </Nav>

                            <Nav>
                                {user && user.isAuthenticated === true ?
                                    <>
                                        <Nav.Item className="nav-link">
                                            Welcome {user.account.userName}!
                                        </Nav.Item>
                                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <span onClick={() => handleLogout()}>Logout</span>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                    :
                                    <Link to="/login" exact className="nav-link">Login</Link>
                                } 
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    } else {
        return <></>
    }
};

export default NavHeader;
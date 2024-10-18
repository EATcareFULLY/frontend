import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {useKeycloak} from "@react-keycloak/web";

function MainNavBar() {

  const { keycloak, initialized } = useKeycloak();

  const handleLogout = () => {
    if (initialized) {
      keycloak.logout({
        redirectUri: "http://localhost:3000/"
      });
    }
  };


  if (!initialized || !keycloak.authenticated) {
    return null;
  }

  return (
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">EATcareFULLY</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/Scan">Scan</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/History">History</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/Analyze">Analyze</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default MainNavBar;

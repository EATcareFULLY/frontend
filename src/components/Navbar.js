import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {useKeycloak} from "@react-keycloak/web"; // Importowanie pliku CSS

function MainNavBar() {

  const { keycloak, initialized } = useKeycloak();

  //TODO reafactor and toast and 401

  const handleAuthAction = () => {
    if (initialized) {
      if (keycloak.authenticated) {
        keycloak.logout({
          redirectUri: "http://localhost:3000/"
        });
      } else {
        keycloak.login();
      }
    }
  };


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
              <Nav.Link onClick={handleAuthAction}>
                {keycloak.authenticated ? 'Logout' : 'Sign in'}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default MainNavBar;

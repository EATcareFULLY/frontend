import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
import logo from "../assets/logo-horizontal.svg";
import { NavDropdown } from "react-bootstrap";

function MainNavBar() {
  const { keycloak, initialized } = useKeycloak();
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => setExpanded(!expanded);

  const closeNavbar = () => setExpanded(false);

  const handleLogout = () => {
    if (initialized) {
      keycloak.logout({ redirectUri: "http://localhost:3000/" });
      closeNavbar();
    }
  };

  if (!initialized || !keycloak.authenticated) return null;


  return (
      <Navbar expand="lg" bg="primary" variant="dark" className="p-1" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
            <img src={logo} width="150" className="d-inline-block align-top" alt="EATcareFULLY" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleNavbar} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Scan" onClick={closeNavbar}>Scan</Nav.Link>
              <Nav.Link as={Link} to="/History" onClick={closeNavbar}>History</Nav.Link>
              <Nav.Link as={Link} to="/Analyze" onClick={closeNavbar}>Analyze</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={`Logged in as: ${keycloak.tokenParsed?.preferred_username}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default MainNavBar;

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavBar = ({ isAuthenticated, logout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">EATcareFULLY</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Scan">Scan</Nav.Link>
            <Nav.Link as={Link} to="/History">History</Nav.Link>
            <Nav.Link as={Link} to="/Analyze">Analyze</Nav.Link>
            <Nav.Link as={Link} to="/Details">Details</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/Login">Login/Register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavBar;

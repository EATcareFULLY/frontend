import React, {useContext, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
import logo from "../../assets/logos/logo-horizontal.svg";
import { NavDropdown } from "react-bootstrap";
import {ConnectionContext} from "../../utils/ConnectionContext"
import {APP_URLS} from "../../utils/URLS";

function MainNavBar() {
  const { keycloak, initialized } = useKeycloak();
  const [expanded, setExpanded] = useState(false);
  const {connected} = useContext(ConnectionContext)
  const toggleNavbar = () => setExpanded(!expanded);

  const closeNavbar = () => setExpanded(false);

  const handleLogout = () => {
    if (initialized) {
      keycloak.logout({ redirectUri: `${APP_URLS.home}` });
      closeNavbar();
    }
  };

  if (!initialized || !keycloak.authenticated) return null;


  return (
      <Navbar expand="lg" bg="primary" variant="dark" className="p-1" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={closeNavbar} className="d-flex">
            <img src={logo} width="150" className="d-inline-block align-top" alt="EATcareFULLY" />
            {!connected && (
                <div
                    className="ms-auto text-white mt-2"
                    style={{
                      fontSize: "0.8rem",
                      whiteSpace: "nowrap",
                      alignSelf: "flex-start",
                    }}
                >
                  OFFLINE
                </div>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleNavbar}/>
          <Navbar.Collapse id="responsive-navbar-nav" data-testid="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Scan" onClick={closeNavbar}>Scan</Nav.Link>
              <Nav.Link as={Link} to="/Label" onClick={closeNavbar}>Label</Nav.Link>
              <Nav.Link as={Link} to="/History" onClick={closeNavbar}>History</Nav.Link>
              <Nav.Link as={Link} to="/Leaderboard" onClick={closeNavbar}>Leaderboard</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={`Logged in as: ${keycloak.tokenParsed?.preferred_username}`} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/Achievements" onClick={closeNavbar}>Achievements</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Settings" onClick={closeNavbar}>Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default MainNavBar;

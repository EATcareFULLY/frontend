import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
import logo from "../assets/logo-horizontal.svg";
import { NavDropdown } from "react-bootstrap";

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
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
                src={logo}
                width="150"
                className="d-inline-block align-top"
                alt="EATcareFULLY"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Scan">Scan</Nav.Link>
              <Nav.Link as={Link} to="/History">History</Nav.Link>
              <Nav.Link as={Link} to="/Analyze">Analyze</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={`Logged in as: ${keycloak.tokenParsed?.preferred_username}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default MainNavBar;

import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default class Izbornik extends Component{
    
    
    render()
    {
        return(

            <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Teretana app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/nadzornaploca">Nadzorna ploča</Nav.Link>
            <NavDropdown title="Programi" id="basic-nav-dropdown">
              <NavDropdown.Item href="/korisnici">Korisnici</NavDropdown.Item>
              <NavDropdown.Item href="/treninzi">
                Treninzi
              </NavDropdown.Item>
              <NavDropdown.Item href="/oprema">Oprema</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item target="_blank" href="/swagger/index.html">
                Swagger
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


        );
    }
}
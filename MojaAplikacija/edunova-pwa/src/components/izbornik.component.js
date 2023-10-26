import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../logo.svg';


export default class Izbornik extends Component{
    
    
    render(){
        return (


            <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"> <img className="App-logo" src={logo} alt="" /> Auto Oglasnik</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Nadzorna ploča</Nav.Link>
            <NavDropdown title="Programi" id="basic-nav-dropdown">
              <NavDropdown.Item href="/osobe">Osobe</NavDropdown.Item>
              <NavDropdown.Item href="/vozila">
                Vozila
              </NavDropdown.Item>
              <NavDropdown.Item href="/oglasi">Oglasi</NavDropdown.Item>
              <NavDropdown.Item href="/upiti">Upiti</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link target ="_blank" href="http://dljubicic2-001-site1.itempurl.com/swagger/index.html">API dokumentacija</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>




        );
    }
}
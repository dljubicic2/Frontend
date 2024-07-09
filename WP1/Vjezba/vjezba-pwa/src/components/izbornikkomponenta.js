import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import logo from '../logo.svg';


export default class Izbornik extends Component{

    render(){

    


    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/"><img src={logo} className="App-logo" alt="logo" /> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/nadzornaploca">Nadzorna ploča</Nav.Link>
                            <NavDropdown title="Programi" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/djelatnici">Djelatnici</NavDropdown.Item>
                                <NavDropdown.Item href="/prostorije">Prostorije</NavDropdown.Item>
                                <NavDropdown.Item href="/zivotinje">Životinje</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/odjava">Odjava</Nav.Link>
                            <Nav.Link target="_blank" href="/swagger/index.html">API dokumentacija</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar.Toggle>
            </Container>
        </Navbar>
    
    );

    }

}



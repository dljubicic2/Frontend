import React,  { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import OsobaDataService from "../../services/osoba.service";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import { Form } from "react-bootstrap/lib/Navbar";
import { Col, Row } from "react-bootstrap/esm";


export default class DodajOsobu extends Component{

    constructor(props){
        super(props);
        
    }
    

    async DodajOsobu(osoba){
        const odgovor = await OsobaDataService.post(osoba);
        if(odgovor.ok){
            window.location.href='/osobe';
        }else{
            let poruka=' ';
            for(const key in odgovor.poruka.errors){
                if(odgovor.poruka.errors.hasOwnProperty(key)) {
                    poruke += `${odgovor.poruka.errors[key]}` + '\n';
                }
            }
            alert(poruka);
        }
    }

    handleSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        this.DodajOsobu({
            nadimak: podaci.get('nadimak'),
            email: podaci.get('email'),
            lozinka: podaci.get('lozinka')
        });
    }

    

    render(){

        const  { osobe } = this.state;

        return (

            <Container>
               <Form onSubmit={this.handleSubmit}>
                
                <Form.Group className="mb-3" controlId="nadimak">
                    <Form.Label>Nadimak</Form.Label>
                    <Form.Control type="text" name="nadimak" placeholder="Nadimak osobe" maxlenght={255} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" placeholder="Email osobe" maxlenght={255} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lozinka">
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control type="text" name="lozinka" placeholder="Lozinka osobe" maxlenght={255} required />
                </Form.Group>

                <Row>
                    <Col>
                        <Link className="btn btn-danger gumb" to={`/osobe`}>Odustani</Link> 
                    </Col>
                    <Col>
                        <Button variant="primary" className="gumb" type="submit">

                        </Button>
                    </Col>
                </Row>
                </Form>

            

            </Container>
            



        );
    }
}
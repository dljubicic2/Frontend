import React,  { Component } from "react";
import { Button, Container } from "react-bootstrap";
import OsobaDataService from "../../services/osoba.service";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap/lib/Navbar";
import { Col, Row } from "react-bootstrap/esm";


export default class PromjeniOsobu extends Component{

    constructor(props){
        super(props);

       this.osoba = this.dohvatiOsobu();
       this.promjeniOsobu = this.promjeniOsobu.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    

    async dohvatiOsobu(osoba){
        let href = window.location.href;
        let niz = href.split('/');
        await OsobaDataService.getBySifra(niz[niz.length-1])
        .then(response => {
            this.setState({
                osoba: response.data
            });
        })

        .catch(e=>{
            console.log(e);
        });
    }

    async promjeniOsobu(osoba){
        let href = window.location.href;
        let niz = href.split('/');
        const odgovor = await OsobaDataService.put(niz[niz.length-1],osoba);
        if(odgovor.ok){
            window.location.href='/osobe';
        }else{
            console.log(odgovor);
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
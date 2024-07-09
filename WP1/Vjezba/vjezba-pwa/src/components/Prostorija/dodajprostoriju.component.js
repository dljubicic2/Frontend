import { Component } from "react";
import Prostorije from "./prostorije.component";
import { Button, ButtonToolbar, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProstorijaDataService from "../../services/djelatnik.service";

export default class DodajProstoriju extends Component {

    constructor(props){
        super(props);

        this.dodajProstoriju = this.dodajProstoriju.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async dodajProstoriju(prostorija){
        const odgovor = await ProstorijaDataService.post(Prostorije);
        if(odgovor.ok){
            window.location.href='/prostorije';
        }else{
            let poruke = '';
            for(const key in odgovor.poruka.errors) {
                if(odgovor.poruka.errors.hasOwnProperty(key)) {
                    poruke += `${odgovor.poruka.errors[key]}` + '/n';
                }
            }

            alert(poruke);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        this.dodajProstoriju({
            dimenzije: podaci.get('dimenzije'),
            maxbroj: podaci.get('maxbroj'),
            mjesto: podaci.get('mjesto')
        });
    }

    render() {
        return(
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="naziv">
                        <Form.Label>Dimenzije</Form.Label>
                        <Form.Control type="text" name="dimenzije" placeholder="dimenzije prostora" maxLength={225} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="maxbroj">
                        <Form.Label>Maksimalan broj</Form.Label>
                        <Form.Control type="text" name="maxbroj" placeholder="maksimalan broj životinja" maxLength={225} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mjesto">
                        <Form.Label>Mjesto</Form.Label>
                        <Form.Control type="text" name="mjesto" placeholder="mjesto" maxLength={225} required />
                    </Form.Group>

                    <Row>
                        <Col>
                        <Link className="btn btn-danger gumb" to={`/prostorije`}>Odustani</Link>
                        </Col>
                        <col>
                        <Button variant="primary" className="gumb" type="submit">

                        </Button>
                        </col>
                    </Row>
                    
                </Form>
            </Container>
        );
    }

    
}
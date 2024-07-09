import { extend } from "highcharts";
import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProstorijaDataService from "../../services/djelatnik.service";


export default class PromjeniProstoriju extends Component{

    constructor(props){
        super(props);

        this.prostorija = this.dohvatiProstoriju();
        this.promjeniProstoriju = this.promjeniProstoriju.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            prostorija: []
        };
    }

    

    async dohvatiProstoriju(){
        let href = window.location.href;
        let niz = href.split('/');

        await ProstorijaDataService.getBySifra(niz[niz.length-1])
        .then(Response =>{
            this.setState({
                prostorija: Response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    async promjeniProstoriju(prostorija) {
        let href = window.location.href;
        let niz = href.split('/');

        const odgovor = await ProstorijaDataService.put(niz[niz.length-1],prostorija);
        if(odgovor.ok){
            window.location.href='/prostorije';
        }else{
            console.log(odgovor);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        this.promjeniProstoriju({
            dimenzije: (podaci.get('dimenzije')),
            maxbroj: (podaci.get('maxbroj')),
            mjesto: (podaci.get('mjesto'))
        });
    }

    render(){

        const {prostorija} = this.state;

        return(
            <Container>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Group className="mb-3" controlId="dimenzije">
                        <Form.Label>Dimenzije</Form.Label>
                        <Form.Control type="text" name="dimenzije prostora" maxLength={225} defaultValue={prostorija.dimenzije} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="maxbroj">
                        <Form.Label>Maksimalan broj</Form.Label>
                        <Form.Control type="text" name="maksimalan broj životinja" maxLength={225} defaultValue={prostorija.maxbroj} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mjesto">
                        <Form.Label>Mjesto</Form.Label>
                        <Form.Control type="text" name="mjesto" maxLength={225} defaultValue={prostorija.mjesto} required />
                    </Form.Group>

                    <Row>
                        <Col>
                        <Link className="btn btn-danger gumb" to={`/prostorije`}>Odustani</Link>
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
import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class DodajDjelatnika extends Component {

    constructor(props) {
        super(props);

        this.DodajDjelatnika = this.DodajDjelatnika.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async DodajDjelatnika() {
        const odgovor = await DjelatnikDataService.post(djelatnik);
        if(odgovor.ok){
            window.location.href='/djelatnici';
        }else{
            let poruke = '';
            for(const key in odgovor.poruka.errors) {
                if(odgovor.poruka.errors.hasOwnProperty(key)) {
                    poruke += `${odgovor.poruka.errors[key]}` + '/n';
                }
            }
            alert(poruka);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const podaci = new FormData(e.target);

        let Oib=0;
        if(podaci.get('oib').trim().lenght>0){
            Oib = parseInt(podaci.get('oib'))
        }

        this.DodajDjelatnika({
            Ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            Oib: Oib 
        });
    }

    render(){
        <Container>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" placeholder="Ime djelatnika" maxLength={225} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" placeholder="Prezime djelatnika" maxLength={225} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="obi">
                    <Form.Label>Oib</Form.Label>
                    <Form.Control type="text" name="oib" placeholder="11" />
                </Form.Group>

                <Row>
                    <Col>
                    <Link className="btn btn - danger gumb" to={`/djelatnici`}>Odustani</Link>
                    </Col>
                    <Col>
                    <Button variant="primary" className="gumb" type="submit">
                        Dodaj djelatnika
                    </Button>
                    </Col>
                </Row>

            </Form>
        </Container>
    };
}
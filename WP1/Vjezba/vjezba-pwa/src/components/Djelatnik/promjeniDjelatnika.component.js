import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DjelatnikDataService from "../../services/djelatnik.service";


export default class PromjeniDjelantika extends Component {

    constructor(props){
        super(props);

        this.djelatnik = this.dohvatiDjelatnika();
        this.PromjeniDjelantika = this.PromjeniDjelantika.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            djelatnik: []
        };
    }

    async dohvatiDjelatnika(){
        let href = window.location.href;
        let niz = href.split('/');
        await DjelatnikDataService.getBySifra(niz[niz.length-1])
        .then(Response=>{
            this.setState({
                djelatnik: Response.data
            });
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async PromjeniDjelantika(djelatnik) {

        let href = window.location.href;
        let niz = href.split('/');
        const odgovor = await DjelatnikDataService.put(niz[niz.length-1], djelatnik)
            if(odgovor.ok){
                window.location.href='/djelatnici';
            }else{
                console.log(odgovor);
            }
    }

    handleSubmit(e) {
        e.preventDeafult();

        const podaci = new FormData(e.target);

        this.PromjeniDjelantika({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            oib: parseInt(podaci.get('oib'))
        });
    }

    render() {
        <Container>
            <Form onSubmit={this.handleSubmit}>


                <Form.Group className="mb-3" controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" placeholder="Ime djelatnika" maxLength={225} defaultValue={djelatnik.ime} required />                   
                </Form.Group>

                <Form.Group className="mb-3" controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" placeholder="prezime djelatnika" maxLength={225} defaultValue={djelatnik.prezime} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="oib">
                    <Form.Label>Oib</Form.Label>
                    <Form.Control type="text" name="oib" defaultValue={djelatnik.oib} placeholder="130" />
                </Form.Group>

                <Row>
                    <Col>
                    <Link className="btn btn-danger gumb" to={'/djelatnici'}>Odustani</Link>
                    </Col>
                    <Col>
                    <Button variant="primary" className="gumb" type="submit">
                        Promjeni djelatnika
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    };
}

    



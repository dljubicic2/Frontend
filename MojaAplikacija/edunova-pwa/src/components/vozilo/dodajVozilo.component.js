import React, { Component } from "react";
import VoziloDataService from "../../services/osoba.service";
import OsobaDataService from "../../services/osoba.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';


export default class DodajVozilo extends Component{

    constructor(props){
        super(props);

        this.dodajVozilo = this.dodajVozilo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dohvatiOsobe = this.dohvatiOsobe.bind(this);




        this.state ={
            osobe: [],
            sifraOsoba:0
        };
    }
 

componentDidMount() {
    this.dohvatiOsobe();
}

    

    async dodajVozilo(vozilo){
        const odgovor = await VoziloDataService.post(vozilo);
        if(odgovor.ok){
            window.location.href='/vozila';
        }else{
            console.log(odgovor);
        }
    }

    async dohvatiOsobe(){
        await OsobaDataService.get()
        .then(response =>{
            this.setState({
                osobe: response.data,
                sifraOsoba: response.data[0].sifra
            });
        })
        .catch(e=> {
            console.log(e);
        });
        
    }

    handleSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        console.log('nadimak');
        console.log('email');
        console.log('lozinka');
        let godiste = moment.utc(podaci.get('datumPocetka')+' '+podaci.get('godiste'));
        console.log(godiste);

        this.dodajVozilo({
            marka: podaci.get('marka'),
            model: podaci.get('model'),
            pogon: podaci.get('pogon'),
            godiste: godiste,
            kilometraza: podaci.get('kilometraza'),
            sifraOsoba: this.state.sifraOsoba
        });
    }

    

    render(){

        const  { osobe } = this.state;

        return (

            <Container>
               <Form onSubmit={this.handleSubmit}>
                
                <Form.Group className="mb-3" controlId="marka">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control type="text" name="marka" placeholder="Marka vozila" maxlenght={255} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" placeholder="Model vozila" maxlenght={255} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pogon">
                    <Form.Label>Pogon</Form.Label>
                    <Form.Control type="text" name="pogon" placeholder="Pogon vozila" maxlenght={255} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="osoba">
                    <Form.Label>Osoba</Form.Label>
                    <Form.Select onChange={e => {
                        this.setState({sifraOsoba: e.target.value});
                    }}>
                
                <Form.Group className="mb-3" controlId="godiste">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control type="data" name="godiste" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="kilometraza">
                    <Form.Label>Kilometraza</Form.Label>
                    <Form.Control type="int" name="kilometraza" placeholder="Kilometraza vozila" maxlenght={255} required />
                </Form.Group>

                    </Form.Select>
                </Form.Group>

                <Row>
                    <Col>
                        <Link className="btn btn-danger gumb" to={`/vozila`}>Odustani</Link> 
                    </Col>
                    <Col>
                        <Button variant="primary" className="gumb" type="submit">
                            Dodaj vozilo

                        </Button>
                    </Col>
                </Row>
                </Form>
                

            

            </Container>
            



        );
    }
}
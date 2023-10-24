import React, { Component } from "react";
import OglasDataService from "../../services/osoba.service";
import OsobaDataService from "../../services/osoba.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';


export default class DodajOglas extends Component{

    constructor(props){
        super(props);

      

        this.dodajOglas = this.dodajOglas.bind(this);
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

    

    async dodajOglas(oglas){
        const odgovor = await OglasDataService.post(oglas);
        if(odgovor.ok){
            window.location.href='/oglasi';
        }else{
            console.log(odgovor);
        }
    }

    async dohvatiOglase(){
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

        this.dodajOglas({
            marka: podaci.get('naslov'),
            model: podaci.get('opis'),
            pogon: podaci.get('cijena'),
           sifraOsoba: this.state.sifraOsoba
        });
    }

    

    render(){

        const  { osobe } = this.state;

        return (

            <Container>
               <Form onSubmit={this.handleSubmit}>
                
                <Form.Group className="mb-3" controlId="naslov">
                    <Form.Label>Naslov</Form.Label>
                    <Form.Control type="text" name="naslov" placeholder="Naslov oglasa" maxlenght={255} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" name="opis" placeholder="Opis oglasa" maxlenght={255} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="decimal" name="cijena" placeholder="Cijena vozila" maxlenght={255} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="osoba">
                    <Form.Label>Osoba</Form.Label>
                    <Form.Select onChange={e => {
                        this.setState({sifraOsoba: e.target.value});
                    }}>
                
              

                    </Form.Select>
                </Form.Group>

                <Row>
                    <Col>
                        <Link className="btn btn-danger gumb" to={`/oglasi`}>Odustani</Link> 
                    </Col>
                    <Col>
                        <Button variant="primary" className="gumb" type="submit">
                            Dodaj oglas

                        </Button>
                    </Col>
                </Row>
                </Form>
                

            

            </Container>
            



        );
    }
}
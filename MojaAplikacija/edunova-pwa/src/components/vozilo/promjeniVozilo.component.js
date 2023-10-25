import React,  { Component } from "react";
import { Button, Container } from "react-bootstrap";
import VoziloDataService from "../../services/osoba.service";
import OsobaDataService from "../../services/osoba.service";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap/esm";
import moment from "moment";


export default class PromjeniVozilo extends Component{

    constructor(props){
        super(props);

       
        this.vozilo = this.dohvatiVozilo();
        this.promjeniVozilo = this.promjeniVozilo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.osobe = this.dohvatiOsobe();
    }

    
    

    async dohvatiVozilo(){
        let href = window.location.href;
        let niz = href.split('/');
        await VoziloDataService.getBySifra(niz[niz.length-1])
        .then(response => {
            let g = response.data;
            g.godiste = moment.utc(g.godiste).format("yyyy-MM");

            this.setState({
                osoba: g
            });
            console.log(response.data);
        })

        .catch(e=>{
            console.log(e);
        });
    }

    async promjeniVozilo(vozilo){
        
        const odgovor = await VoziloDataService.post(vozilo);
        if(odgovor.ok){
            window.location.href='/vozila';
        }else{
            console.log(odgovor);
        }
    }

    async dohvatiOsobe(){
        await OsobaDataService.get()
        .then(response => {
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

        this.DodajOsobu({
            nadimak: podaci.get('nadimak'),
            email: podaci.get('email'),
            lozinka: podaci.get('lozinka')
        });
    }

    

    render(){

        const  { osobe } = this.state;
        const {vozilo} = this.state;

        return (

        

            <Container>
               
               <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col key="1" sm={12} lg={6} md={6}>
                        <Form.Group className="mb-3" controlid="marka">
                            <Form.Label>Marka</Form.Label>
                            <Form.Control type="text" name="marka" placeholder="" maxLenght={255} defaultValue={vozilo.marka} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlid="model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="model" placeholder="" maxLenght={255} defaultValue={vozilo.model} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlid="pogon">
                            <Form.Label>Pogon</Form.Label>
                            <Form.Control type="text" name="pogon" placeholder="" maxLenght={255} defaultValue={vozilo.pogon} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlid="godiste">
                            <Form.Label>Godiste</Form.Label>
                            <Form.Control type="date" name="godiste" placeholder="" maxLenght={255} defaultValue={vozilo.godiste} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlid="kilometraza">
                            <Form.Label>Kilometraza</Form.Label>
                            <Form.Control type="number" name="kilometraza" placeholder="" maxLenght={255} defaultValue={vozilo.kilomatraza} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlid="osoba">
                            <Form.Label>Osoba</Form.Label>
                            <Form.Select defaultValue={vozilo.sifraOsoba} onChange={e=>{
                                this.setState({sifraOsoba: e.target.value});
                            }}>
                                {osobe && osobe.map((osoba,index) => (
                      <option key={index} value={osoba.sifra}>{osoba.nadimak}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Row>
                            <Col>
                            <Link className="btn btn -danger gumb" to={`/vozila`}>Odustani</Link>
                            </Col>
                            <Col>
                                <Button variant="primary" className="gumb" type="submit">
                                    Promjeni vozilo
                                </Button>
                            </Col>
                        </Row>
                        </Col>
                        </Row>

                        </Form>
                

            </Container>
            



        );
    }
}
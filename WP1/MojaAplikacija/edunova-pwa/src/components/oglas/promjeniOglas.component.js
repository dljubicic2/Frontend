import React,  { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import OglasDataService from "../../services/osoba.service";
import OsobaDataService from "../../services/osoba.service";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap/esm";
import moment from "moment";


export default class PromjeniOglas extends Component{

    constructor(props){
        super(props);

       
        this.oglas = this.dohvatiOglas();
        this.promjeniOglas = this.promjeniOglas.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.osobe = this.dohvatiOsobe();
        this.traziOsobu = this.traziOsobu.bind(this);
        this.obrisiOsobu = this.obrisiOsobu.bind(this);
        this.dodajOsobu = this.dodajOsobu.bind(this);

        this.state ={

            oglas: {},
            osobe: [],
            sifraOsoba: 0,
            pronadeneOsobe: []

        };
    }

    
    

    async dohvatiOglas(){
        let href = window.location.href;
        let niz = href.split('/');
        await OglasDataService.getBySifra(niz[niz.length-1])
        .then(response => {
            let g = response.data;
        

            this.setState({
                oglas: g

            });
            //console.log(response.data);
        })

        .catch(e=>{
            console.log(e);
        });
    }

    async promjeniOglas(oglas){
        
        const odgovor = await OglasDataService.post(oglas);
        if(odgovor.ok){
            window.location.href='/oglasi';
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

        console.log(podaci.get('nadimak'));
        console.log(podaci.get('email'));
        console.log(podaci.get('lozinka'));

        this.promjeniOglas({
            naslov: podaci.get('naslov'),
            opis: podaci.get('opis'),
            cijena: podaci.get('cijena')
        });
    }

    async traziOsobu(uvjet){
        await OsobaDataService.traziOsobu(uvjet)
        .then(response=>{
            this.setState({
                pronadeneOsobe: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    async obrisiOsobu(oglas,osoba){
        const odgovor = await OglasDataService.obrisiOsobu(oglas,osoba);
        if(odgovor.ok){
            this.dohvatiOsobe();
        }else{

        }
    }

    

    render(){

        const  { osobe } = this.state;
        const {oglas} = this.state;
        const {pronadeneOsobe} = this.state;

        const obradiTrazenje = (uvjet) =>{
            this.traziOsobu(uvjet);
        };

        const odabranaOsoba = (osoba) =>{
            if(osoba.length>0){
                this.dodajOsobu(oglas.sifra,osoba[0].sifra);
            }
        };

        return (

            <Container>
               <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col key="1" sm={12} lg={6} md={6}>
                        <Form.Group className="mb-3" controlid="naslov">
                            <Form.Label>Naslov</Form.Label>
                            <Form.Control type="text" name="naslov" placeholder="" maxLenght={255} defaultValue={oglas.naslov} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlid="osoba">
                            <Form.Label>Osoba</Form.Label>
                            <Form.Select defaultValue={oglas.sifraOsoba} onChange={e=>{
                                this.setState({sifraOsoba: e.target.value});
                            }}>
                                {osobe && osobe.map((osoba,index) => (
                      <option key={index} value={osoba.sifra}>{osoba.nadimak}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Row>
                            <Col>
                            <Link className="btn btn -danger gumb" to={`/oglasi`}>Odustani</Link>
                            </Col>
                            <Col>
                                <Button variant="primary" className="gumb" type="submit">
                                    Promjeni oglas
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
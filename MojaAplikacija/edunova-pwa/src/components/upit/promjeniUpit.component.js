import React,  { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import OglasDataService from "../../services/osoba.service";
import OsobaDataService from "../../services/osoba.service";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap/esm";
import moment from "moment";


export default class PromjeniUpit extends Component{

    constructor(props){
        super(props);

        this.upit = this.dohvatiUpit();
        this.promjeniUpit = this.promjeniUpit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.osobe = this.dohvatiOsobe();
        this.oglasi = this.dohvatiOglas();
        this.obrisiOglas = this.obrisiOglas.bind(this);
        this.traziOglas = this.traziOglas.bind(this);
        this.dodajOglas = this.dodajOglas.bind(this);
      

        this.state ={

            upit: {},
            osobe: [],
            oglasi: [],
            sifraOsoba:0,
            pronadeniOglasi: []

           

        };
    }

    
    

    async dohvatiUpit(){
        let href = window.location.href;
        let niz = href.split('/');
        await UpitDataService.getBySifra(niz[niz.length-1])
        .then(response => {
            let g = response.data;
        

            this.setState({
                upit: g,
                sifraOglas:0

            });
            //console.log(response.data);
        })

        .catch(e=>{
            console.log(e);
        });
    }

    async promjeniUpit(upit){
        
        const odgovor = await UpitDataService.post(upit);
        if(odgovor.ok){
            window.location.href='/upiti';
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

    async dohvatiOglas() {
        let href = window.location.href;
        let niz = href.split('/'); 
        await UpitDataService.getOglasi(niz[niz.length-1])
           .then(response => {
             this.setState({
               oglasi: response.data
             });
     
            // console.log(response.data);
           })
           .catch(e => {
             console.log(e);
           });
       }

    async traziOglas(){
        await OglasDataService.traziOglas(uvjet)
        .then(response=>{
            this.setState({
                pronadeniOglasi: response.data
            });
        })
        .catch(e=>{
            console.log(e);
        });
    }

    async traziOglas(uvjet){
        await OglasDataService.traziOglas(uvjet)
        .then(response=>{
            this.setState({
                pronadeniOglasi: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    async obrisiOglas(upit,oglas){
        const odgovor = await UpitDataService.obrisiOglas(upit,oglas);
        if(odgovor.ok){
            this.dohvatiOglase();
        }else{

        }
    }

    async dodajOglas(upit,oglas){
        const odgovor = await UpitDataService.dodajOglas(upit,oglas);
        if(odgovor.ok){
            this.dohvatiOglas();
        }else{

        }
    }

    

    handleSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        console.log(podaci.get('nadimak'));
        console.log(podaci.get('email'));
        console.log(podaci.get('lozinka'));
        
        console.log(podaci.get('naslov'));
        console.log(podaci.get('opis'));
        console.log(podaci.cijena('cijena'));

        this.promjeniUpit({
            pitanje: podaci.get('pitanje'),
            sifraOglas: this.state.sifraOsoba,
            sifraOsoba: this.state.sifraOsoba
         
        });
    }

    

    render(){

        const {osobe} = this.state;
        const {upit} = this.state;
        const {oglasi} = this.state;
        const {pronadeniOglasi} = this.state;


        const obradiTrazenje = (uvjet) =>{
            this.traziOglas(uvjet);
        };

        const odabranaOglas = (oglas) =>{
            if(oglas.length>0){
                this.dodajOsobu(upit.sifra,oglas[0].sifra);
            }
        };

        return (

            <Container>
               <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col key="1" sm={12} lg={6} md={6}>

                        <Form.Group className="mb-3" controlid="pitanje">
                            <Form.Label>Pitanje</Form.Label>
                            <Form.Control type="text" name="pitanje" placeholder="" maxLenght={255} defaultValue={oglas.naslov} required/>
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
                            <Link className="btn btn -danger gumb" to={`/upiti`}>Odustani</Link>
                            </Col>
                            <Col>
                                <Button variant="primary" className="gumb" type="submit">
                                    Promjeni upit
                                </Button>
                            </Col>
                        </Row>
                        </Col>
                        </Row>

                        <Col key="2" sm={12} lg={6} md={6} className="oglasiUpit">
                            <Form.Group className="mb-3" controlid="uvjet">
                                <Form.Label>Traži oglas</Form.Label>

                                <AsyncTypeahead
                            className="autocomplete"
                            id="uvjet"
                            emptyLabel="Nema rezultata"
                            searchText="Tražim..."
                            labelKey={(oglas) => `${oglas.pitanje} `}
                            minLength={3}
                            options={pronadeniOglasi}
                            onSearch={obradiTrazenje}
                            placeholder="dio pitanja"
                            renderMenuItemChildren={(oglas) => (
                            <>
                                <span>{oglas.pitanje}</span>
                            </>
                            )}
                            onChange={odabraniOglas}
                        />
                            </Form.Group>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Oglas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {oglasi && oglasi.map((oglas,index)=> (
                                        <tr key={index} >
                                            <td >{oglas.naslov} {oglas.opis}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => this.obrisiOglas(upit.sifra,oglas.sifra)}><FaTrash></FaTrash></Button>
                                            </td>
                                        </tr>
                                    ))
    }
                                </tbody>
                            </Table>
                        </Col>

                        </Form>
                

            </Container>
        );
    }
}
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


export default class DodajUpit extends Component{

    constructor(props){
        super(props);

      
        this.dodajUpit =this.dodajUpit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dohvatiOsobe = this.dohvatiOsobe.bind(this);
        this.dohvatiOglase = this.dohvatiOglase.bind(this);
     


        this.state ={
            osobe: [],
            sifraOsoba:0,
            oglas: [],
            sifraOglas:0
        };
    }
 

componentDidMount() {
    this.dohvatiOsobe();
    this.dohvatiOglase();
}

    

    async dodajUpit(upit){
        const odgovor = await UpitDataService.post(upit);
        if(odgovor.ok){
            window.location.href='/upiti';
        }else{
            console.log(odgovor);
        }
    }

    async dohvatiOsobe(){
        await OsobaDataService.get()
        .then(response=>{
            this.setState({
                osobe: response.data,
                sifraOsoba: response.data[0].sifra

            });
        })
        .catch(e=>{
            console.log(e);
        });
        
    }

    async dohvatiOglase(){
        await OglasDataService.get()
        .then(response=>{
            this.setState({
                oglasi: response.data,
                sifraOglas: response.data[0].sifra

            });
        })
        .catch(e=>{
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
        console.log(pitanje);

        this.dodajOglas({
            pitanje: podaci.get('pitanje'),
           sifraOsoba: this.state.sifraOsoba,
           sifraOglas: this.state.sifraOglas
        });
    }

    

    render(){

        const  { osobe } = this.state;
        const {oglasi} = this.state;

        return (

            <Container>
               <Form onSubmit={this.handleSubmit}>
                
                <Form.Group className="mb-3" controlId="pitanje">
                    <Form.Label>Pitanje</Form.Label>
                    <Form.Control type="text" name="pitanje" placeholder="Upit" maxlenght={255} required />
                </Form.Group>


                <Form.Group className="mb-3" controlId="osoba">
                    <Form.Label>Osoba</Form.Label>
                    <Form.Select onChange={e => {
                        this.setState({sifraOsoba: e.target.value});
                    }}>

                     {osobe && osobe.map((osoba,index) => (
                        <option key={index} value={osoba.sifra}>{osoba.nadimak}</option>
                     ))}

                <Form.Group className="mb-3" controlId="oglasi">
                    <Form.Label>Oglas</Form.Label>
                    <Form.Select onChange={e =>{
                        this.setState({sifraOglas: e.target.value});
                    }}>

                    {oglasi && oglasi.map((oglasi,index)=> (
                        <option key={index} value={oglas.sifra}>{oglas.pitanje}</option>

                        ))}

                    </Form.Select>
                </Form.Group>

                 

                    </Form.Select>
                </Form.Group>

                <Row>
                    <Col>
                        <Link className="btn btn-danger gumb" to={`/upiti`}>Odustani</Link> 
                    </Col>
                    <Col>
                        <Button variant="primary" className="gumb" type="submit">
                            Dodaj upit
                        </Button>
                    </Col>
                </Row>
                </Form>
                
              
              
                
            

            </Container>
            



        );
    }
}
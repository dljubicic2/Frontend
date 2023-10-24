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
               


            </Container>
            



        );
    }
}
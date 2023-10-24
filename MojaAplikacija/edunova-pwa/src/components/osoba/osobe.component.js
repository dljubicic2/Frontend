import React,  { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import OsobaDataService from "../../services/osoba.service";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";


export default class Osobe extends Component{

    constructor(props){
        super(props);
        

        this.state={
            osobe: []
        };

    }
    
    componentDidMount(){
        this.dohvatiOsobe();

    }

    async dohvatiOsobe(){
        await OsobaDataService.get()
        .then(response => {
            this.setState ({
                osobe: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    async obrisiOsobu(sifra){
        const odgovor = await OsobaDataService.delete(sifra)
        if(odgovor.ok){
            this.dohvatiOsobe();
        }else{
            alert(odgovor.poruka);
        }

    }

    

    render(){

        const  { osobe } = this.state;

        return (

            <Container>
                <a href="/osobe/dodaj" className="btn btn-success gumb">
                    Dodaj novu osobu
                </a>

                

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nadimak</th>
                        <th>Email</th>
                        <th>Lozinka</th>
                    </tr>
                </thead>
                <tbody>
                    {osobe && osobe.map((osoba,index) => (

                        <tr key={index}>
                            <td>{osoba.nadimak}</td>
                            <td>{osoba.email}</td>
                            <td>{osoba.lozinka}</td>
                            <td>
                                <Link className="btn btn-primary gumb"
                                to={`/osobe/${osoba.sifra}`}>
                                    <FaEdit />
                                </Link>

                                <Button variant="danger" className="gumb"
                                onClick={()=>this.obrisiOsobu(osoba.sifra)}>
                                    <FaTrash />
                                </Button>

                            </td>

                        </tr>


                    ))}
                </tbody>
            </Table>
            
                        
            

            </Container>
            



        );
    }
}
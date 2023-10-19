import React,  { Component } from "react";
import { Container, Table } from "react-bootstrap";
import OsobaDataService from "../../services/osoba.service";


export default class Osobe extends Component{

    constructor(props){
        super(props);
        this.dohvatiOsobe=this.dohvatiOsobe.bind(this);
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
                            <td></td>

                        </tr>


                    ))}
                </tbody>
            </Table>
            

            

            </Container>
            



        );
    }
}
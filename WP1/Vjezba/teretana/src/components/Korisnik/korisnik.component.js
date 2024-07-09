import { Component } from "react";
import { Container, Table } from "react-bootstrap";


export default class Korisnici extends Component{
    
    
    render()
    {
        return(

            <Container>
            <a href="/korisnici/dodaj" className="btn btn-success gumb">
                Dodaj novog korisnika
            </a>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Broj iskaznice</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Ovdje će doći podaci s backend-a */}
                </tbody>

            </Table>

            </Container>


        );
    }
}
import { Component } from "react";
import { Container, Table } from "react-bootstrap";

export default class Zivotinje extends Component{

    constructor(props){
        super(props);
    }

    
    
    dohvatiZivotinje(){
        ZivotinjaDataService.getAll()
        .then(Response =>{
            this.setState({
                Zivotinje: Response.data
            });
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiZivotinju(sifra) {
        if(odgovor.ok){
            this.dohvatiZivotinje();
        }else{
            
        }
    }

    render() {
        const {zivotinje} = this.state;
        return (

            <Container>
                <a href="/zivotinje/dodaj" className="btn btn-success gumb">Dodaj novu zivotinju</a>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Vrsta</th>
                            <th>Naziv</th>
                            <th>Datum</th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        )
    }
}
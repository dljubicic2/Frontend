import { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import ProstorijaDataService from "../../services/djelatnik.service";


export default class Prostorije extends Component{
    
    constructor(props){
        super(props);

        this.setState = {
            Prostorije: []
        };
    }

    componentDidMount(){
        this.dohvatiProstorije();
    }

    async dohvatiProstorije(){
        await ProstorijaDataService.get()
        .then(response=>{
            this.setState({
                Prostorije: response.data
            });
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        });
    }

    async obrisisProstoriju(sifra){
        const odgovor = await ProstorijaDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiProstorije();
        }else{
            alert(odgovor.poruka);
        }
    }

    render() {

        const {Prostorije} = this.state;

        return (
            <Container>
                <a href="/prostorije/dodaj" className="btn btn-success bumb">
                    Dodaj novu prostoriju
                </a>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Dimenzije</th>
                            <th>Maksimalni broj</th>
                            <th>Mjesto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Prostorije && Prostorije.map((prostorija,index) => (
                        <tr key={index}>
                            <td>{prostorija.dimenzije}</td>
                            <td className="broj">{prostorija.maxbroj}</td>
                            <td>{prostorija.mjesto}</td>
                        <td>
                            <link className="btn btn-primary gumb" to ={`/prostorije/${prostorija.sifra}`}>

                            </link>
                            <Button variant="danger" className="gumb" onClick={()=>this.obrisisProstoriju(prostorija.sifra)}>

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
import React, {Component} from "react";
import DjelatnikDataService from "../../services/djelatnik.service";
import djelatnikService from "../../services/djelatnik.service";
import { Button, Container, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";


export default class Djelatnici extends Component{

    constructor(props){
        super(props);

        this.state = {
            Djelatnici: []
        };
    }

   

    componentDidMount(){
        this.dohvatiDjelatnike();
    }

    
    
    async dohvatiDjelatnike(){

        await DjelatnikDataService.get()
        .then(Response =>{
            this.setState({
                Djelatnici: Response.data
            });
            console.log(Response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiDjelatnika(sifra){

        const odgovor = DjelatnikDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiDjelatnike();
        }else{
            alert(odgovor.poruka);
        }
    }

    render(){

        const {Djelatnici} = this.state;

        return(
            <Container>
                <a href="/djelatnici/dodaj" className="btn btn-success gumb">
                    Dodaj novog djelatnika
                </a>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Oib</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Djelatnici && Djelatnici.map((djelatnik, index)=> (
                            <tr key={index}>
                                <td>{djelatnik.ime}</td>
                                <td>{djelatnik.prezime}</td>
                                <td className="broj">{djelatnik.oib}</td>
                                <td className="broj">
                                    <NumericFormat
                                        value={djelatnik.oib}
                                        displayType={'text'}
                                        fixedDecimalScale>

                                        </NumericFormat>
                                        
                                </td>
                                <td>
                                    <link className="btn btn-primary gumb"
                                    to={`/djelatnici/${djelatnik.sifra}`}>
                                        
                                    </link>

                                    <Button variant="danger" className="gumb"
                                    onClick={()=>this.obrisiDjelatnika(djelatnik.sifra)}>
                                    
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




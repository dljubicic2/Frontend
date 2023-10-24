import React,  { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import VoziloDataService from "../../services/osoba.service";
import { Link } from "react-router-dom";
import {FaEdit, FaMailBulk, FaTrash} from "react-icons/fa";
import { Col, Row } from "react-bootstrap/esm";
import { Modal } from "bootstrap";



export default class Vozila extends Component{

    constructor(props){
        super(props);

        this.dohvatiVozila = this.dohvatiVozila.bind(this);
        

        this.state={
            vozila: []
        };

    }

    otvoriModal = () => this.setState({prikaziModal : true});
    zatvoriModal = () => this.setState({prikaziModal : false});
    
    componentDidMount(){
        this.dohvatiVozila();

    }

    async dohvatiVozila(){
        VoziloDataService.getAll()
        .then(response =>{
            this.setState({
                vozila: response.data
            });
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiVozilo(sifra){
        const odgovor = await VoziloDataService.delete(sifra)
        if(odgovor.ok){
            this.dohvatiVozila();
        }else{
            this.otvoriModal();
        }

    }

    

    render(){

        const  { vozila } = this.state;

        return (

            <Container>
              <a href="/vozila/dodaj" className="btn btn-success gumb">Dodaj novo vozilo</a>
              <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Pogon</th>
                        <th>Godiste</th>
                        <th>Kilometraza</th>
                    </tr>
                </thead>
                <tbody>
                {vozila && vozila.map((g,index) => (
                
                <tr key={index}>
                  <td> 
                    <p className="naslovVozilo">{g.nadimak} ({g.brojOsoba})</p>
                    {g.osoba}
                  </td>
                  <td>
                    <Row>
                        <Col>
                            <Link className="btn btn primary gumb" to={`/vozila/${g.sifra}`}><FaEdit /></Link>
                        </Col>
                        <Col>
                            {g.brojOsoba===0 &&
                                <Button variant="danger" className="gumb" onClick={()=> this.obrisiVozilo(g.sifra)}><FaTrash /></Button>
                            }
                        </Col>
                        <Col>
                            {g.brojOsoba>=0 &&
                                <Link className="email" to={"/grupe/email/" + g.sifra}><FaMailBulk /></Link>
                            
                            }
                        </Col>
                    </Row>
                  </td>
                  </tr>
                ))
                        }
                </tbody>
              </Table>

              <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Greška prilikom brisanja</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>Vozilo ima osobu</Modal.Body>
                     <Modal.Footer>
                        <Button variant="secondary" onClick={this.zatvoriModal}>
                             Zatvori
                        </Button>
                    </Modal.Footer>
              </Modal>
            

            

            </Container>
            



        );
    }
}
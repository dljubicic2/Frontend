import React,  { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import OglasDataService from "../../services/osoba.service";
import { Link } from "react-router-dom";
import {FaEdit, FaMailBulk, FaTrash} from "react-icons/fa";
import { Col, Row } from "react-bootstrap/esm";
import { Modal } from "bootstrap";


export default class Oglasi extends Component{

    constructor(props){
        super(props);
        
      this.dohvatiOglase = this.dohvatiOglase.bind(this);


        this.state={
            upiti: [],
            prikaziModal: false
            
        };

    }

    otvoriModal = () => this.setState({prikaziModal : true});
    zatvoriModal = () => this.setState({prikaziModal : false});
    
    componentDidMount(){
        this.dohvatiOglase();

    }

    dohvatiOglase(){
        OglasDataService.getAll()
        .then(response =>{
            this.setState({
                upiti: response.data
            });
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiOglas(sifra){
        const odgovor = await OglasDataService.delete(sifra)
        if(odgovor.ok){
            this.dohvatiOglase();
        }else{
            this.otvoriModal();
        }

    }

    

    render(){

        const  { oglasi } = this.state;

        return (

            <Container>
              <a href="/oglasi/dodaj" className="btn btn-success gumb">Dodaj novi oglas</a>
              <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naslov</th>
                        <th>Opis</th>
                        <th>Cijena</th>
                        
                    </tr>
                </thead>
                <tbody>
                {oglasi && oglasi.map((g,index) => (
                
                <tr key={index}>
                  <td> 
                    <p className="naslovOglas">{g.naslov} ({g.brojOsoba})</p>
                    {g.osoba}
                  </td>
                  <td>
                    <Row>
                        <Col>
                            <Link className="btn btn primary gumb" to={`/oglasi/${g.sifra}`}><FaEdit /></Link>
                        </Col>
                        <Col>
                            {g.brojOsoba===0 &&
                                <Button variant="danger" className="gumb" onClick={()=> this.obrisiOglas(g.sifra)}><FarTrash /></Button>
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
                     <Modal.Body>Oglas ima osobu</Modal.Body>
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
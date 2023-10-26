import React,  { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import UpitDataService from "../../services/upit.service";
import { Await, Link } from "react-router-dom";
import {FaEdit, FaMailBulk, FaTrash} from "react-icons/fa";
import { Col, Row } from "react-bootstrap/esm";
import { Modal } from "react-bootstrap";


export default class Upiti extends Component{

    constructor(props){
        super(props);
        
        this.dohvatiUpite = this.dohvatiUpite.bind(this);


        this.state={
            upiti: [],
            prikaziModal: false

            
        };

    }

    otvoriModal = () => this.setState({prikaziModal : true});
    zatvoriModal = () => this.setState({prikaziModal : false});
    
    componentDidMount(){
        this.dohvatiUpite();

    }

    dohvatiUpite(){
         UpitDataService.getAll()
        .then(response =>{
            this.setState({
                upiti: response.data
            });
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiUpit(sifra){
        const odgovor = await UpitDataService.delete(sifra)
        if(odgovor.ok){
            this.dohvatiUpite();
        }else{
            this.otvoriModal();
        }

    }

    

    render(){

        const  { upiti } = this.state;

        return (

            <Container>

                <a href="/upiti/dodaj" className="btn btn-success gumb">
                    Dodaj novi upit
                </a>

              <a href="/upiti/dodaj" className="btn btn-success gumb">Dodaj novi upit</a>
              <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Pitanje</th>
                        
                    </tr>
                </thead>
                <tbody>
                {upiti && upiti.map((g,index) => (
                
                <tr key={index}>
                  <td> 
                    <p className="pitanjeUpit">{g.pitanje} ({g.brojOsoba})</p>
                    <p className="pitanjeUpit">{g.pitanje} ({g.brojOglasa})</p>
                    {g.osoba}
                    {g.oglas}
                  </td>
                  <td>
                    <Row>
                        <Col>
                            <Link className="btn btn primary gumb" to={`/upiti/${g.sifra}`}><FaEdit /></Link>
                        </Col>
                        <Col>
                            {g.brojOsoba===0 &&
                                <Button variant="danger" className="gumb" onClick={()=> this.obrisiUpit(g.sifra)}><FaTrash /></Button>
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
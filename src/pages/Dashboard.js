import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useAuth } from "../Authentication";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginRequired from '../components/LoginRequired';
export default function Dashboard() {

    
const [certificates,setCertificates]=useState(true);
const auth=useAuth();
    if(!auth.user){
      return <LoginRequired/>
    }
const toggle=()=>{
    setCertificates(!certificates)
}

    
  return (
    <>
    <Header/>
    <Container>
        <h2>Dashboard</h2>
        <br/>
        <br/>
        <Row>
            <Col>
            <Row>
            <div className="button-wrapper">
         
                <Button className='success w-75' onClick={toggle}>My Certificates</Button>
                </div>
            </Row>
            </Col>
            <Col>
            
            <Row>
            <div className="button-wrapper">
         
                <Button className='success w-75' onClick={toggle}>Upload</Button>
                </div>
            </Row>
            </Col>
        </Row>
    </Container>
    <Footer/>
    
    </>
  )
}

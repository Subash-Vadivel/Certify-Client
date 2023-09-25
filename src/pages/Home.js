import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container,Row,Col } from 'react-bootstrap'
import video from '../images/video.mp4'
import safe from "../images/safe certificate.jpg"
export default function Home() {
  return (
    <>
    <Header/>
    <Container>
      <Row>
        <Col style={{padding:"2em",fontSize:"2em"}}>
        Safe certificates on our website ensure secure, encrypted connections for user data protection & verification.
        </Col>
        <Col>
        <img src={safe} />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        
      </Row>
      <Row>

      <video controls width="100%" height="360" style={{marginTop:"4em"}}>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      </Row>
    </Container>
    <Footer/>
    </>
  )
}

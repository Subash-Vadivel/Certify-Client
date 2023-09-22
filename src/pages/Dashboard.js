import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useAuth } from "../Authentication";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginRequired from '../components/LoginRequired';
import axiosPrivate from '../api/axiosPrivate';
import Card from 'react-bootstrap/Card';

export default function Dashboard() {

    const [certificateData,setCertificateData]=useState([]);
    const [uploadData,setUploadData]=useState([]);


    
const [certificates,setCertificates]=useState(true);

const toggle=()=>{
    setCertificates(!certificates)
}
const load=async()=>{
    if(auth.user)
    {
    try{
       const result1=await axiosPrivate.get(`/certificate/${auth.user._id}`)
       console.log(result1.data);
       setCertificateData(result1.data)
       const result2=await axiosPrivate.get(`/transaction/${auth.user._id}`)
       console.log(result2.data);
       setUploadData(result2.data)
    }
    catch(err){
        console.log(err);
    }}
}
useEffect(()=>{
    load()
},[])
const auth=useAuth();
if(!auth.user){
  return <LoginRequired/>
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
        <br/>
        <br/>
        {certificates?<>
           {certificateData.map((item,idx)=>
           <Row key={idx} className='card-wrapper justify-content-center'>
              <Card className='w-75 mx-auto'>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.issuedBy}</Card.Subtitle>
              <Card.Text>
                Issue Date: {new Date(item.issueDate).toLocaleDateString()}
              </Card.Text>
              <Card.Link href={item.pdfUrl}>View Certificate</Card.Link>
            </Card.Body>
          </Card>
           </Row>
           )}
        </>:<>
        {uploadData.map((item,idx)=>
           <Row key={idx} className='card-wrapper justify-content-center'>
              <Card className='w-75 mx-auto'>
            <Card.Body>
              <Card.Title>{item.certificateName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.issuedBy}</Card.Subtitle>
              <Card.Text>
                Issue Date: {new Date(item.issueDate).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                Transaction Status: {item.transactionStatus}
              </Card.Text>
              <Card.Link href={`https://sepolia.etherscan.io/tx/${item.blockAddress}`}>View Block</Card.Link>
            </Card.Body>
          </Card>
           </Row>
           )}
        
        </>}
    </Container>
    <Footer/>
    
    </>
  )
}

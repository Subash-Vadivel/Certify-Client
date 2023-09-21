import React, { useState } from 'react';
import { Button, Col, Container,Row } from 'react-bootstrap';
import gifImg from '../images/Certify.gif'
import Form from "react-bootstrap/Form";
import { useAuth } from '../Authentication';
import axios from '../api/axiosPrivate';

export default function Signup(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [username,setUserName]=useState();
  const [email,setEmail]=useState();
  const [dateOfBirth,setDateOfBirth]=useState();
  const [password,setPassword]=useState();

  const auth=useAuth();

  const toggleForm = () => {
    setDateOfBirth('');
    setEmail('');
    setPassword('');
    setUserName('');
    setIsLogin(!isLogin);
  };

  const register=async(e)=>{
    e.preventDefault();
    try{
    await axios.post('/accounts/signup',{username,password,email,dateOfBirth})
    toggleForm();
    }
    catch(err)
    {
        console.log(err);
    }
  }
  const login=(e)=>{
    e.preventDefault();
    auth.login({email,password},props.setOpen)
  }

  return (
    <Container className="signup-container">
        
        <Row>
            <Col>
            <img
          src={gifImg}
          alt="Signup Image"
          className="signup-image"
        />
            </Col>
            <Col>
            <Container>
                <Row>
                    
          <div onClick={()=>props.setOpen(false)} className="float-right">
            <h1 style={{color:"black"}}>X</h1>
              </div>
                </Row>
                <Row>
                <Col>
          <Button
            onClick={toggleForm}
            className={`float-right ${!isLogin?"primary":"success"}`}
          >
            Sign In
          </Button>
          </Col>
          <Col>
          
          <Button
            onClick={toggleForm}
            className={`float-left ${isLogin?"primary":"success"}`}
          >
            Sign Up
          </Button>
          </Col>
          </Row>
          <br/>
          <Row>
        {!isLogin ? (
          // Login form JSX
          <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" 
                value={username}
                onChange={(e) => setUserName(e.target.value)}/>
                  </Form.Group>

                </Row>

                <Row className="mb-3">
                  
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Group>
                </Row>

                
                <Row className="mb-3">
                  
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                
                <Form.Group as={Col} className="mb-3" controlId="formGridDate">
                  <Form.Label>Date Of Birth</Form.Label>
                  <Form.Control type="date" placeholder="issued date" onChange={(e)=>setDateOfBirth(e.target.value)} />
                </Form.Group>
                </Row>


                <Button variant="primary" type="submit" className='success' onClick={register}>
                  Register
                </Button>
            </Form>
        ) : (
          // Register form JSX
          <Form>

                <Row className="mb-3">
                  
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Group>
                </Row>

                
                <Row className="mb-3">
                  
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                </Row>

                <Button variant="primary" type="submit" className='success' onClick={login}>
                  Login
                </Button>
            </Form>
        )}
        </Row>
        </Container>
            </Col>
      
      </Row>
    </Container>
  );
}

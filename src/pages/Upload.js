import React, { useEffect, useState } from "react";
import Web3 from "web3";
import abi from "../utils/abi.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MetaMaskNotInstalled from "./MetaMaskNotInstalled";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useAuth } from "../Authentication";
import LoginRequired from "../components/LoginRequired";
import axiosPrivate from "../api/axiosPrivate";

const Upload = () => {
  const auth=useAuth();
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificateHash, setCertificateHash] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [transactionStatus,setTransactionStatus]=useState("Pending")
  const [isPending,setIsPending]=useState(false);
  const [url,setUrl]=useState(null)

  console.log(auth.user._id)
  if(!auth.user){
    return <LoginRequired/>
  }

  // Check if MetaMask (ethereum) is available
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    // const contractAddress='0x6f0a67CD6447208010cea46971671aF1617d3EEb';
    const contractAddress = "0x4C2612EC307c81dbD5FB79185399c83C79C7dD68"; // Replace with your contract's address
    // const contractAddress ='0x5247eAe8d70DCC1c451f894D37A7d24F7c0F32Aa'
    const contract = new web3.eth.Contract(abi, contractAddress);
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setCertificateFile(file);
    };

    const handleUpload = async (e) => {
      e.preventDefault();
      const accounts = await web3.eth.getAccounts();

      if (!certificateFile) {
        alert("Please select a certificate file.");
        return;
      }

      const reader = new FileReader();

      reader.onload = async (e) => {
        const fileBuffer = e.target.result;
        const fileBytes = new Uint8Array(fileBuffer);
        const unixTimestamp = Date.parse(date) / 1000;
        const certificateHash = await web3.utils.keccak256(
          "0x" +
            [...fileBytes].map((x) => x.toString(16).padStart(2, "0")).join("")
        );
        setCertificateHash(certificateHash);

        try {
          console.log(typeof certificateHash, name, issuer);
          const functionAbi = contract.methods
            .addCertificate(certificateHash, name, issuer, unixTimestamp)
            .encodeABI();
          console.log(functionAbi);
          const transactionObject = {
            to: contractAddress,
            data: functionAbi,
            gasLimit: "3000000", // Gas limit as a string
            gasPrice: web3.utils.toWei("2.500688064", "Gwei"),
            from: accounts[0],
          };
          web3.eth
            .sendTransaction(transactionObject)
            .on("transactionHash", (hash) => {
              setIsPending(true);
              setUrl(hash);
              console.log("Transaction Hash:", hash);
            })
            .on("receipt",async (receipt) => {
              console.log("Receipt:", receipt);
              try{
              await axiosPrivate.post('/transaction/log',{issueDate:date,issuedBy:issuer,blockAddress:receipt.transactionHash,transactionStatus:"Success",certificateName:name,user:auth.user._id})
              }
              catch(err){
                console.log(err);
              }
              // Handle the receipt here
            })
            .on("error", (error) => {
              setIsPending(false);
              console.error("Error:", error);
              // Handle the error here
            });
          setTransactionStatus("Transaction successful");
        } catch (error) {
          setIsPending(false)
          console.error("Error:", error);
          setTransactionStatus("Transaction failed");
        }
      };

      reader.readAsArrayBuffer(certificateFile);
    };

    const UploadCertificate=()=>{
      return (<Container>
          
        <h2 className="start">Upload Certificate</h2>

          <Row>
            <Col xs={1} sm={1} md={4} ></Col>
            <Col xs={10} sm={10} md={4}>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" 
                value={name}
                onChange={(e) => setName(e.target.value)}/>
                  </Form.Group>

                </Row>

                <Row className="mb-3">
                  
                <Form.Group as={Col} controlId="formGridIssuer">
                    <Form.Label>Issuer</Form.Label>
                    <Form.Control type="text" placeholder="Issued By" 
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}/>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                
                <Form.Group as={Col} className="mb-3" controlId="formGridDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" placeholder="issued date" onChange={(e)=>setDate(e.target.value)} />
                </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Upload Certificate</Form.Label>
                    <Form.Control type="file"  onChange={handleFileChange} />
                  </Form.Group>
                </Row>


                <Button variant="primary" type="submit" onClick={handleUpload} className="success">
                  Upload
                </Button>
              </Form>
            </Col>
            <Col xs={1} sm={1} md={4}></Col>
          </Row>
        </Container>
)
    }

    const status=()=>{
      return (
        <Container>
          <Row>
          <h3>Transaction Details</h3>
          <p>Transaction Hash: {transactionHash}</p>
          <p>Transaction Status: {transactionStatus}</p>
          {transactionHash !== 'Transaction failed' && (
            <p>
              View on <a href={`https://sepolia.etherscan.io/tx/${url}`} target="_blank" rel="noopener noreferrer">Etherscan</a>
            </p>
          )}
          <div className="button-wrapper">
          <Button className="btn btn-md success" onClick={()=>setIsPending(false)} >Upload New</Button>
          </div>
          </Row>

        </Container>
      )
    }

    return (
      <>
        <Header />
        {!isPending?UploadCertificate():status()}
        <Footer />
      </>
    );
  } else {
    return <MetaMaskNotInstalled />;
  }
};

export default Upload;

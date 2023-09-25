import React, { useState } from "react";
import Web3 from "web3";
import abi from "../utils/abi.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MetaMaskNotInstalled from "./MetaMaskNotInstalled";
import axiosPrivate from "../api/axiosPrivate";
import { useAuth } from "../Authentication";
import Dropzone from 'react-dropzone'

export default function Verify() {
  const auth = useAuth();
  const [rawFile, setRawFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState("");
  const [date, setDate] = useState("");
  if (!window.ethereum) return <MetaMaskNotInstalled />;

  const web3 = new Web3(window.ethereum);
  const contractAddress = "0x4C2612EC307c81dbD5FB79185399c83C79C7dD68"; // Replace with your contract's address
  const contract = new web3.eth.Contract(abi, contractAddress);


  const hashFile = async () => {
    if (!certificateFile) {
      alert("Please select a certificate file.");
      return;
    }

    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = async (e) => {
        const fileBuffer = e.target.result;
        const fileBytes = new Uint8Array(fileBuffer);

        const certificateHash = await web3.utils.keccak256(
          "0x" +
            [...fileBytes].map((x) => x.toString(16).padStart(2, "0")).join("")
        );
        resolve(certificateHash);
      };
      reader.readAsArrayBuffer(rawFile);
    });
  };

  const handleVerify = async () => {
    try {
      const certHash = await hashFile();
      console.log(certHash);
      const result = await contract.methods.verifyCertificate(certHash).call();
      console.log(result);
      const unixTimestamp = Number(result[3]); // Convert BigInt to a number
      const dateObject = new Date(unixTimestamp * 1000); // Convert to Date object
      const formattedDate = dateObject.toLocaleDateString();
      setDate(formattedDate);
      setVerificationResult(result);

      try {
        if (result[0] && auth.user) {
          const formData = new FormData();
          formData.append("fileType",fileType);
          formData.append("user", auth.user._id);
          formData.append("issuedBy", result[2]);
          formData.append("issueDate", formattedDate);
          formData.append("name", result[1]);
          formData.append("file", certificateFile);
          formData.append("certificateHash", certHash);
          console.log(formData);
          await axiosPrivate.post("/certificate/add", formData, {
            headers: {
              "Content-Type": "application/octet-stream",
            },
          });
        }
      } catch (err) {
        console.log("error saving certificate", err);
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      setVerificationResult("Error verifying certificate");
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileType(file.name);
    setRawFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCertificateFile(reader.result);
      };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header />
      <Container>
        {!verificationResult && (
          <>
            <h2 className="mt-5 mb-4">Verify Certificate</h2>
            <Row className="mb-3">
             <Col xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
                <Dropzone onDrop={handleDrop}>
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone" {...getRootProps()}>
                              <input
                                {...getInputProps({
                                  accept: "image/*, application/pdf",
                                })}
                              />

                              <p>
                               { certificateFile?fileType:"Drag and drop an image here, or click to select"}
                              </p>
                            </div>
                          )}
                </Dropzone>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button
                  variant="primary"
                  onClick={handleVerify}
                  className="success"
                >
                  Verify
                </Button>
              </Col>
            </Row>
          </>
        )}
        {verificationResult && (
          <>
            <h2 className="mt-5 mb-4">Certificate Details</h2>
            <Row className="mb-3">
              <Col>
                <h6>Status : </h6>
                <p>{verificationResult[0] && "Verified"}</p>
                {verificationResult[0] && (
                  <>
                    <p>Name : {verificationResult[1]}</p>
                    <p>Issued By : {verificationResult[2]}</p>
                    <p>Date : {date}</p>
                  </>
                )}
                {!verificationResult[0] && <h6>Corrupted Certificate!!</h6>}
                <div className="button-wrapper">
                  <Button
                    className="btn btn-md button-wrapper success"
                    onClick={() => setVerificationResult("")}
                  >
                    {verificationResult[0] ? "Back" : "Retry"}
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

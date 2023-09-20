import React, { useState } from 'react';
import Web3 from 'web3';
import abi from '../utils/abi.json';


const Upload = () => {
  const [name, setName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificateHash, setCertificateHash] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  // Check if MetaMask (ethereum) is available
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    const contractAddress = '0x5725cd0759b5ad3dc2ac2e990cb8bb96951b7ef1'; // Replace with your contract's address
    // const contractAddress ='0x5247eAe8d70DCC1c451f894D37A7d24F7c0F32Aa'
    const contract = new web3.eth.Contract(abi, contractAddress);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setCertificateFile(file);
    };

    const handleUpload = async () => {
      const accounts = await web3.eth.getAccounts();

      if (!certificateFile) {
        alert('Please select a certificate file.');
        return;
      }

      const reader = new FileReader();

      reader.onload = async (e) => {
        const fileBuffer = e.target.result;
        const fileBytes = new Uint8Array(fileBuffer);

        const certificateHash = await web3.utils.keccak256(
          '0x' + [...fileBytes].map((x) => x.toString(16).padStart(2, '0')).join('')
        );
        setCertificateHash(certificateHash);

        try {
          await contract.methods
            .addCertificate(certificateHash, name, issuer, 123)
            .send({ from: accounts[0] });

          setTransactionHash('Transaction successful');
        } catch (error) {
          console.error('Error:', error);
          setTransactionHash('Transaction failed');
        }
      };

      reader.readAsArrayBuffer(certificateFile);
    };

    const handleVerify = async () => {
      const certHash = certificateHash;
      try {
        const result = await contract.methods.verifyCertificate(certHash).call();
        setVerificationResult(result);
      } catch (error) {
        console.error('Error verifying certificate:', error);
      }
    };

    return (
      <div>
        <h1>Certificate Upload and Verification</h1>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Issuer:</label>
          <input type="text" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Upload Certificate:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button onClick={handleUpload}>Upload and Hash</button>
        {certificateHash && <p>Certificate Hash: {certificateHash}</p>}
        {transactionHash && <p>Transaction Status: {transactionHash}</p>}
        <button onClick={handleVerify}>Verify Certificate</button>
        {verificationResult && (
          <div>
            <p>Certificate Verified: {verificationResult[0] ? 'Yes' : 'No'}</p>
            <p>Name: {verificationResult[1]}</p>
            <p>Issuer: {verificationResult[2]}</p>
            <p>Date: {new Date(verificationResult[3] * 1000).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    );
  } else {
    // Display a message if MetaMask is not installed
    return (
      <div>
        <h1>MetaMask is not installed</h1>
        <p>Please install and unlock MetaMask to use this application.</p>
      </div>
    );
  }
};

export default Upload;

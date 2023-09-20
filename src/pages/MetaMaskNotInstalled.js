import React from 'react';
import MetaMaskImage from '../images/metamask.jpg'; // Replace with the actual path to your MetaMask image
import Header from '../components/Header';
import Footer from '../components/Footer';

const MetaMaskNotInstalled = () => {
  return (
    <>
    <Header/>
    <div className="container">
      <img src={MetaMaskImage} alt="MetaMask Logo" className="image" />
      <h1 className="heading">MetaMask is not installed</h1>
      <p className="paragraph">Please install and unlock MetaMask to use this application.</p>
    </div>
    <Footer/>
    </>
  );
};

export default MetaMaskNotInstalled;

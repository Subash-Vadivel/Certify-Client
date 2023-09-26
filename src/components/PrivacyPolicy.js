import React from 'react';
import '../StyleSheet/PrivacyPolicy.css'; // Import your CSS file
import Header from './Header';
import Footer from './Footer';

function PrivacyPolicy() {
  return (
    <><Header />
    <div className="privacy-policy">
      <h1>Privacy Policy for Certify - Your Secure Document Locker</h1>
      <p>Last updated: 25/09/2023</p>
      <p>
        Thank you for choosing Certify for securely storing and managing your
        important documents. At Certify, we value your privacy and are
        committed to protecting your personal information. This Privacy Policy
        outlines how we collect, use, disclose, and safeguard your data. By
        using Certify, you consent to the practices described in this policy.
      </p>
      <h2>1. Information We Collect</h2>
      <h3>1.1. Account Information</h3>
      <p>
        To use Certify, you must create an account. During the account creation
        process, we collect the following information:
      </p>
      <ul>
        <li>Your name</li>
        <li>Email address</li>
        <li>Password</li>
      </ul>
      <h3>1.2. Document Information</h3>
      <p>
        When you use Certify, you can upload and store various types of
        documents, which may include but are not limited to:
      </p>
      <ul>
        <li>Diplomas and transcripts</li>
        <li>Certificates and licenses</li>
        <li>Passports and other government-issued IDs</li>
        <li>Insurance policies</li>
        <li>Legal documents</li>
        <li>Financial documents</li>
        <li>Medical records</li>
      </ul>
      {/* ... Continue with the rest of the content */}
      
      <h2>2. How We Use Your Information</h2>
      <h3>2.1. Providing Services</h3>
      <p>
        We use your personal information to provide you with access to Certify's
        services, including document storage, retrieval, and sharing.
      </p>
      {/* ... Continue with the rest of the content */}
      
      <h2>3. Data Security</h2>
      <p>
        Certify takes data security seriously. We implement state-of-the-art
        encryption measures and utilize the Ethereum blockchain, known for its
        security and transparency, to protect your documents. Your documents are
        stored in a tamper-proof manner, and we continuously monitor and update
        our security practices.
      </p>
      {/* ... Continue with the rest of the content */}
      
      <h2>4. Disclosure of Information</h2>
      <p>
        Certify does not share your personal information or documents with third
        parties unless required by law or with your explicit consent.
      </p>
      {/* ... Continue with the rest of the content */}
      
      {/* Add more sections and content as needed */}
    </div>
    <Footer /> 
    </>
  );
}

export default PrivacyPolicy;

import React from 'react';
import '../StyleSheet/TermsAndConditions.css'; // Import your CSS file
import Header from './Header';
import Footer from './Footer';

function TermsAndConditions() {
  return (
    <><Header />
    <div className="terms-and-conditions">
      <h1>Terms and Conditions for Certify - Your Secure Document Locker</h1>
      <p>Last updated: 25/09/2023</p>
      <p>
        Welcome to Certify - Your Secure Document Locker. These Terms and
        Conditions outline the rules and regulations for the use of Certify's
        services. By accessing or using Certify, you agree to comply with these
        terms.
      </p>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By using Certify, you agree to be bound by these Terms and Conditions.
        If you do not agree to these terms, please refrain from using our
        services.
      </p>
      <h2>2. Use of Services</h2>
      <p>
        You must follow our guidelines and use Certify's services only for
        lawful purposes. You are responsible for all content and actions
        associated with your account.
      </p>
      <h2>3. Privacy</h2>
      <p>
        Certify values your privacy. Please review our Privacy Policy to
        understand how we collect, use, and protect your data.
      </p>
      {/* ... Continue with the rest of the content */}
    </div>
    <Footer />
    </>
  );
}

export default TermsAndConditions;

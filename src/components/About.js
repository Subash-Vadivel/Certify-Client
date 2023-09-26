import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import "../App.css";
export const About = () => {
  const documents = [
    "Diplomas and transcripts",
    "Certificates and licenses",
    "Passports and other government-issued IDs",
    "Insurance policies",
    "Legal documents",
    "Financial documents",
    "Medical records",
  ];

  return (
    <div>
      <Header />
      <Container>
        <h1>About Certify</h1>
        <p>
          Certify is a decentralized digital locker that allows users to store
          and manage their important documents securely and conveniently.
          Certify is built on the Ethereum blockchain, which means that it is
          tamper-proof and transparent. Users can be confident that their
          documents are safe and accessible at all times.
        </p>
        <br />
        <div className="about-us">
          <ul>
            <li>
              <strong> Security: </strong>Certify uses state-of-the-art
              encryption technology to protect users' documents. All documents
              are stored on the Ethereum blockchain, which is one of the most
              secure networks in the world.
            </li>
            <li>
              <strong>Convenience:</strong> Certify is easy to use and
              accessible from anywhere with an internet connection. Users can
              upload, download, and share documents with ease.
            </li>
            <li>
              <strong>Transparency: </strong>All documents stored on Certify are
              timestamped and recorded on the Ethereum blockchain. This means
              that users can be confident that their documents have not been
              tampered with.
            </li>
          </ul>
          <h4>
            Certify is the perfect solution for storing and managing a wide
            variety of important documents, such as:
          </h4>
          <ul>
            {documents.map((document) => (
              <li key={document}>{document}</li>
            ))}
          </ul>
          <h4>
            Certify is a decentralized digital locker, which means that it is
            not controlled by any single entity. This gives users complete
            control over their data and ensures that their documents remain
            private and secure.
          </h4>
<br/>
          <div>
            <strong>How to use Certify To use Certify</strong><br/>
             Users need to create an account
            and then deposit ETH into their account. Once users have ETH in
            their account, they can start uploading and storing documents. To
            upload a document, users simply need to select the document they
            want to upload and then click the "Upload" button. Certify will then
            encrypt the document and store it on the Ethereum blockchain. Once a
            document has been uploaded to Certify, users can access it from
            anywhere with an internet connection. Users can also share documents
            with others by sending them a link to the document. Certify is a
            powerful and secure digital locker that can be used to store and
            manage a wide variety of important documents. Certify is the perfect
            solution for individuals and businesses who need a secure and
            convenient way to store their important documents.
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

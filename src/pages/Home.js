import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import video from "../images/video.mp4";
import safe from "../images/safe certificate.jpg";

export default function Home() {
  const videoRef = useRef(null);

  const handleVideoPlay = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement
        .play()
        .then(() => {
          // Playback started successfully
        })
        .catch((error) => {
          console.error("Video playback error:", error);
        });
    }
  };

  useEffect(() => {
    handleVideoPlay();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col  className="desc">
            <p>
          Blockchain certificates: Securing trust in the digital age, one block at a time.
          </p></Col>
          <Col>
            <video
            controls
            width="100%"
            height="360"
            style={{ marginTop: "4em" }}
            autoPlay
            loop
            muted
            playsInline
            ref={videoRef}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row></Row>{" "}
        <Row>
          
        </Row>
      </Container>
      <Footer />
    </>
  );
}

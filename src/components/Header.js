import logo from "../images/logo.png";
import Nav from "react-bootstrap/Nav";
import { Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const connect=()=>{

  }
  return (
    <>
      <Navbar className="colorNav" collapseOnSelect expand="md">
        <Container>
          <Navbar.Brand>
            <div className="logoWrapper">
              <img src={logo} alt="logo" />
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                className="navLink"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="navLink"
                onClick={() => {
                  navigate("/verify");
                }}
              >
                Verify
              </Nav.Link>
              <Nav.Link
                className="navLink"
                onClick={() => {
                  navigate("/upload");
                }}
              >
                Upload
              </Nav.Link>
              <Nav.Link
                className="navLink"
                onClick={async(e) => {
                  e.preventDefault();
                  if (!user) {
                    alert("Login First")
                     await connect(e);
                  }
                  else{
                    navigate("/certificates");
                  }
                }}
              >
               My Certificates
              </Nav.Link>
              {user ? (
                <Nav.Link className="navLinkbtn">
                  <span style={{ color: "#ED117F" }}>Logout</span>{" "}
                </Nav.Link>
              ) : (
                <Nav.Link className="navLinkbtn" >
                  <span style={{ color: "#ED117F" }}>Login</span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;

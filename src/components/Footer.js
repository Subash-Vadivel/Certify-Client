import { Row,Col,Container } from 'react-bootstrap';
import logofoot from '../images/logo.png'
import { SocialIcon } from 'react-social-icons';
import {useNavigate} from 'react-router-dom';
function Footer()
{
    
    const navigate = useNavigate();
    return(<>
    <Container className="footerTop">
        <span className="footerTopItem"><img src={logofoot} alt="..."/></span>
    </Container>
    <Container fluid className="footerMain">
        <Row className="footRow">
            <Col md={3} sm={6}  xs={6}><ul type="none" className="footLi">
                <li onClick={()=>{navigate('/about')}}>About Certify</li>
                <li onClick={()=>{navigate('/')}}>Home</li>
                <li onClick={()=>{navigate('/verify')}}>Verify</li>
                <li onClick={()=>{navigate('/upload')}}>Upload</li>
                <li  onClick={()=>{navigate('/certificates')}}>My Certificates</li>
                <li>Blog</li>
                </ul></Col>
            <Col md={3} sm={6} xs={6}>
                <ul type="none" className="footLi">
                    <li>Info</li>
                    <li>Federation</li>
                    <li>Business Partner</li>
                    <li onClick={()=>{navigate('/becomemember')}}>Become a Member</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    {/* &#38; */}
                </ul>
            </Col>
            <Col md={6}>
            <ul type="none" className="footLi">
                <li>Availability</li>
                <li>We are in</li>
                <br></br>
                <SocialIcon url="https://subash.rido.live" bgColor="#4267B2" fgColor="#FEFEFE" network="facebook" style={{marginRight:"20px"}}/>
                <SocialIcon url="https://subash.rido.live" bgColor="#4267B2" fgColor="#FEFEFE" network="instagram" style={{marginRight:"20px"}}/>
                <SocialIcon url="https://subash.rido.live" bgColor="#4267B2" fgColor="#FEFEFE" network="twitter" style={{marginRight:"20px"}}/>
                </ul>
                </Col>
        </Row>
    </Container>
    <Container fluid className="footerEnd">
        <p className="footerEndTxt">© 2023 Team RIDO. All rights reserved.</p>
    </Container>
    </>);
}
export default Footer;
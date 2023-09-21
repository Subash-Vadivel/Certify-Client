import './App.css';
import Home from './pages/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Upload from './pages/Upload';
import Verify from './pages/Verify';
import Authentication from './Authentication';
import Certificates from './pages/Certificates';
function App() {
  return (
  <>
  <BrowserRouter>
  <Authentication> 
     <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/upload" element={<Upload/>}></Route>
    <Route path="/verify" element={<Verify/>}></Route>
    <Route path="/certificates" element={<Certificates/>}></Route>


  </Routes>
  </Authentication>

  </BrowserRouter>
  </>
  );
}

export default App;

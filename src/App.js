import './App.css';
import Home from './pages/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Upload from './pages/Upload';
import Verify from './pages/Verify';
function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/upload" element={<Upload/>}></Route>
    <Route path="/verify" element={<Verify/>}></Route>

  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import ProductDetail from './component/ProductDetail';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Foooter from './component/Foooter';
import Login from './Login';

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Foooter />
    </Router>
  );
}

export default App;
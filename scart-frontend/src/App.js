import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import ProductDetail from './component/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
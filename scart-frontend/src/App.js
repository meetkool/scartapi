import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/landing");
    }
  }, [user, navigate]);

  // This component does not render anything
  return null;
}

export default App;

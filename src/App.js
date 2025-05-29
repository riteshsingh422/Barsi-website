// src/App.jsx
import { useState, useEffect } from 'react'; // Removed 'React' import
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/AboutUs';
import Project from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import ContactInfo from './pages/ContactInfo';
import Loader from './components/Loader';
import MouseTrail from './components/MouseTrail';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/contact-info" element={<ContactInfo />} />
        </Routes>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
      <MouseTrail />
    </Router>
  );
}

export default AppWrapper;
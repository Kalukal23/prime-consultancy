import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <nav className="navbar container">
        <Link to="/" className="logo">
          <span>PRIME</span><span>CONSULTANCY</span>
        </Link>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu />
        </button>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e) => { e.preventDefault(); handleScroll('home'); }}>Home</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); handleScroll('services'); }}>Services</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); handleScroll('about'); }}>About</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleScroll('contact'); }}>Contact</a></li>
        </ul>
        <a href="#appointment" onClick={(e) => { e.preventDefault(); handleScroll('appointment'); }} className="btn-primary desktop-btn">
          Book Now <ArrowRight size={18} />
        </a>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>PRIME CONSULTANCY</h4>
            <p style={{marginBottom: '20px'}}>Strategic consulting solutions for sustainable growth across Ethiopia and beyond.</p>
            <div className="social-links">
              <a href="#"><FaLinkedin size={18} /></a>
              <a href="#"><FaFacebook size={18} /></a>
              <a href="#"><FaTwitter size={18} /></a>
              <a href="#"><FaInstagram size={18} /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <a href="#">Corporate Strategy</a>
            <a href="#">Feasibility Studies</a>
            <a href="#">Project Evaluation</a>
            <a href="#">Training</a>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{marginBottom: '16px'}}>Subscribe to our newsletter for the latest insights.</p>
            <div style={{display: 'flex', gap: '8px'}}>
              <input type="email" placeholder="Your email" style={{padding: '10px 16px', borderRadius: '8px', border: 'none', width: '100%'}} />
              <button className="btn-primary" style={{padding: '10px 16px', borderRadius: '8px'}}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Prime Consultancy PLC. All rights reserved.</p>
          <div style={{display: 'flex', gap: '16px'}}>
            <a href="#" style={{color: '#9CA3AF', textDecoration: 'none'}}>Privacy Policy</a>
            <a href="#" style={{color: '#9CA3AF', textDecoration: 'none'}}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

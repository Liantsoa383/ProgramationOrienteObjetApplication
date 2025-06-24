// frontend/src/components/TopNavbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopNavbar.css';
import  logo  from "../../../image/logo-Isstm.jpg";

const TopNavbar1 = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Effet pour détecter le défilement et changer l'apparence de la barre de navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <nav className={`top-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="ISSTM Logo" className="logo-img" />
            <span className="logo-text">ISSTM Scolarité</span>
          </Link>
        </div>

       

        <div className="navbar-actions">
          <div className="auth-buttons">
            <Link to="/login" className="nav-btn login-btn">Connexion</Link>
            <Link to="/register" className="nav-btn register-btn">Inscription</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar1;
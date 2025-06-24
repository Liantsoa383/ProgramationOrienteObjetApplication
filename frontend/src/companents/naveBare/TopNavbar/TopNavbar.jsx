// frontend/src/components/TopNavbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopNavbar.css';
import  logo  from "../../../image/logo-Isstm.jpg";

const TopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className={`top-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="ISSTM Logo" className="logo-img" />
            <span className="logo-text">ISSTM Scolarité</span>
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i> Accueil
          </Link>
          <Link to="/about" className="nav-link">
            <i className="fas fa-info-circle"></i> À propos
          </Link>
        </div>

        <div className="navbar-actions">
         

          <div className="profile-dropdown">
            <button className="profile-btn" onClick={toggleProfileMenu}>
              <i className="fas fa-user-circle"></i>
              <span>Mon Profil</span>
              <i className={`fas fa-chevron-down ${isProfileOpen ? 'rotate' : ''}`}></i>
            </button>
            
            {isProfileOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  <i className="fas fa-id-card"></i> Voir Profil
                </Link>
                <Link to="/dashboard" className="dropdown-item">
                  <i className="fas fa-tachometer-alt"></i> Tableau de bord
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <i className="fas fa-cog"></i> Paramètres
                </Link>
                <div className="divider"></div>
                <button className="dropdown-item logout">
                  <i className="fas fa-sign-out-alt"></i> Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
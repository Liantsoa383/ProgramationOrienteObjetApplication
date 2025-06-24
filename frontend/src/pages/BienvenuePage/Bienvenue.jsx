import React from 'react';
import TopNavbar from '../../companents/naveBare/TopNavbar/TopNavbar';
import './Bienvenue.css';
import houseIsstm from '../../image/houseIsstm.jpg';
import { Link } from 'react-router-dom';
import TopNavbar1 from '../../companents/naveBare/TopNavbar/TopNavbar1';

const Bienvenue = () => {
  return (
    <div className="bienvenue-container">
      <TopNavbar1 />
     <div className="welcome-section">
              <h1>Bienvenue sur le portail de scolarité de l'ISSTM</h1>
              <p className="subtitle">Université de Mahajanga</p>
              
              <div className="hero-image">
              <img src={houseIsstm} alt="" className="house-image"  style={{ width: '100%', height: '100%' }} />
              </div>
              
              <div className="intro-text">
                <p>Notre plateforme vous offre un outil complet de gestion de scolarité adapté aux besoins spécifiques de l'ISSTM.</p>
                <p>Accédez à tous les services numériques destinés aux étudiants, enseignants et personnel administratif.</p>
              </div>
              
              <div className="feature-cards">
                <div className="card">
                  <h3>Gestion des Utilisateurs</h3>
                  <p>Administration des comptes étudiants, enseignants et personnel</p>
                </div>
                
                <div className="card">
                  <h3>Planning & Ressources</h3>
                  <p>Gestion des emplois du temps et des ressources matérielles</p>
                </div>
                
                <div className="card">
                  <h3>Bibliothèque Numérique</h3>
                  <p>Accès aux ressources pédagogiques et manuscrits</p>
                </div>
              </div>
              
              <div className="cta-buttons">
                <Link to="/login" className="btn btn-primary">Connexion</Link>
                <Link to="/register" className="btn btn-secondary">Inscription</Link>
              </div>
            </div>
    </div>
  );
};

export default Bienvenue;
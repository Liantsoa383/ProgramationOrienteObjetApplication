// frontend/src/pages/AboutPage.jsx
import React from 'react';
import TopNavbar from '../../companents/naveBare/TopNavbar/TopNavbar';
import SideNavbar from '../../companents/naveBare/SideNavbar/SideNavbar';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <TopNavbar />
      
      <div className="main-content">
        <SideNavbar />
        
        <div className="content-area">
          <div className="about-section">
            <h1>À propos de l'ISSTM Scolarité</h1>
            
            <div className="about-intro">
              <p>Le système de gestion de scolarité de l'ISSTM est conçu pour répondre aux besoins spécifiques de l'Université de Mahajanga. Cette plateforme est adaptée à la réalité de l'institut et offre une alternative aux outils génériques comme ScolarX et ScolarVox.</p>
            </div>
            
            <div className="mission-vision">
              <div className="mission">
                <h2>Notre Mission</h2>
                <p>Fournir un outil simple mais complet pour la gestion de la scolarité, adapté aux besoins spécifiques de l'ISSTM et aux réalités universitaires malgaches.</p>
              </div>
              
              <div className="vision">
                <h2>Notre Vision</h2>
                <p>Devenir la référence en matière de gestion de scolarité pour les établissements universitaires à Madagascar, en offrant une solution évolutive et adaptée au contexte local.</p>
              </div>
            </div>
            
            <div className="about-features">
              <h2>Caractéristiques de notre solution</h2>
              
              <div className="features-grid">
                <div className="feature-card">
                  <i className="fas fa-user-graduate"></i>
                  <h3>Gestion des Utilisateurs</h3>
                  <p>Administration complète des comptes étudiants, enseignants et personnel administratif.</p>
                </div>
                
                <div className="feature-card">
                  <i className="fas fa-calendar-alt"></i>
                  <h3>Gestion des Emplois du Temps</h3>
                  <p>Planification optimisée des cours, des rotations et de l'utilisation des salles.</p>
                </div>
                
                <div className="feature-card">
                  <i className="fas fa-laptop"></i>
                  <h3>Gestion du Matériel</h3>
                  <p>Suivi et maintenance des équipements informatiques et pédagogiques.</p>
                </div>
                
                <div className="feature-card">
                  <i className="fas fa-flask"></i>
                  <h3>Travaux Pratiques</h3>
                  <p>Organisation et suivi des séances de travaux pratiques et des ressources nécessaires.</p>
                </div>
                
                <div className="feature-card">
                  <i className="fas fa-book-reader"></i>
                  <h3>Bibliothèque Numérique</h3>
                  <p>Accès et gestion des ressources pédagogiques numériques.</p>
                </div>
                
                <div className="feature-card">
                  <i className="fas fa-network-wired"></i>
                  <h3>Réseaux Informatiques</h3>
                  <p>Administration et maintenance de l'infrastructure réseau de l'établissement.</p>
                </div>
              </div>
            </div>
            
            <div className="about-team">
              <h2>Notre Équipe</h2>
              <p>Ce projet est développé par les étudiants de l'ISSTM dans le cadre d'un projet de fin d'études, sous la supervision des enseignants de l'établissement. L'objectif est de créer une solution sur mesure qui répond aux besoins spécifiques de notre institut.</p>
            </div>
            
            <div className="contact-info">
              <h2>Contact</h2>
              <p>Pour toute question ou suggestion concernant cette plateforme, n'hésitez pas à nous contacter :</p>
              <p><i className="fas fa-envelope"></i> contact@isstm-mahajanga.mg</p>
              <p><i className="fas fa-phone"></i> +261 XX XX XX XX</p>
              <p><i className="fas fa-map-marker-alt"></i> Campus Universitaire Ambondrona, Mahajanga 401, Madagascar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
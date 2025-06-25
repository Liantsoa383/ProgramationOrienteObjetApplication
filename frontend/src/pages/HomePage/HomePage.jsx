// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import TopNavbar from '../../companents/naveBare/TopNavbar/TopNavbar';
import SideNavbar from '../../companents/naveBare/SideNavbar/SideNavbar';
import { FaUsers, FaLaptop, FaWifi, FaNetworkWired, FaBook, FaFileAlt, FaProjectDiagram, FaClock } from 'react-icons/fa';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut, Bar } from 'react-chartjs-2';
import houseIsstm from '../../image/houseIsstm.jpg';
import axios from 'axios';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    etudiants: 325,
    enseignants: 42,
    ordinateurs: 78,
    livresNumeriques: 1240,
    tauxUtilisation: 87,
    sallesOccupees: 12,
    projetsEnCours: 15
  });

  useEffect(()=>{
    const fetchData = async()=>{
      const res = await axios.get("http://localhost:8080/api/utilisateurs/stats");
      setStats({...stats,etudiants:res.data.totalEtudiants,enseignants:res.data.totalEnseignants})
    }
    fetchData()
  },[])
  // Données pour les graphiques
  const utilisationMaterielData = {
    labels: ['Ordinateurs', 'Vidéoprojecteurs', 'Bornes WiFi', 'Switches'],
    datasets: [{
      label: 'Taux d\'utilisation (%)',
      data: [85, 72, 95, 62],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 206, 86, 0.7)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  const repartitionEtudiantsData = {
    labels: ['Informatique', 'Télécommunications', 'Réseaux', 'Autre'],
    datasets: [{
      label: 'Nombre d\'étudiants',
      data: [120, 95, 80, 30],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)'
      ],
      borderWidth: 0
    }]
  };

  // Événements récents simulés
  const recentEvents = [
    { id: 1, title: 'Maintenance réseau programmée', date: '10/05/2025', type: 'maintenance' },
    { id: 2, title: 'Nouvelle acquisition - 15 ordinateurs portables', date: '02/05/2025', type: 'acquisition' },
    { id: 3, title: 'Mise à jour de la bibliothèque numérique', date: '29/04/2025', type: 'update' },
    { id: 4, title: 'Formation sur les nouveaux équipements réseau', date: '25/04/2025', type: 'formation' }
  ];

  // Liste des tâches à faire
  const todoList = [
    { id: 1, task: 'Inventaire des équipements informatiques', done: false },
    { id: 2, task: 'Mise à jour des emplois du temps', done: true },
    { id: 3, task: 'Maintenance des bornes WiFi', done: false },
    { id: 4, task: 'Classification des nouveaux manuscrits', done: false }
  ];

  return (
    <div className="home-container">
      <TopNavbar />
      
      <div className="main-content">
        <SideNavbar />
        
        <div className="content-area">
          {activeTab === 'welcome' ? (
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
          ) : (
            <div className="dashboard-container">
              <div className="dashboard-header">
                <h1>Tableau de bord - ISSTM Gestion de la Scolarité</h1>
                <div className="dashboard-tabs">
                  <button 
                    className={activeTab === 'dashboard' ? 'active' : ''} 
                    onClick={() => setActiveTab('dashboard')}
                  >
                    Tableau de bord
                  </button>
                  <button 
                    className={activeTab === 'welcome' ? 'active' : ''} 
                    onClick={() => setActiveTab('welcome')}
                  >
                    Page d'accueil
                  </button>
                </div>
              </div>
              
              <div className="stats-cards">
                <div className="stat-card">
                  <div className="stat-icon"><FaUsers /></div>
                  <div className="stat-content">
                    <h3>Étudiants</h3>
                    <p className="stat-number">{stats.etudiants}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon"><FaUsers /></div>
                  <div className="stat-content">
                    <h3>Enseignants</h3>
                    <p className="stat-number">{stats.enseignants}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon"><FaLaptop /></div>
                  <div className="stat-content">
                    <h3>Ordinateurs</h3>
                    <p className="stat-number">{stats.ordinateurs}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon"><FaBook /></div>
                  <div className="stat-content">
                    <h3>Ressources numériques</h3>
                    <p className="stat-number">{stats.livresNumeriques}</p>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-grid">
                <div className="dashboard-card chart-card">
                  <h3>Utilisation des matériels informatiques</h3>
                  <div className="chart-container">
                    <Bar data={utilisationMaterielData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
                
                <div className="dashboard-card chart-card">
                  <h3>Répartition des étudiants</h3>
                  <div className="chart-container">
                    <Doughnut data={repartitionEtudiantsData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
                
                <div className="dashboard-card">
                  <h3>Événements récents</h3>
                  <div className="events-list">
                    {recentEvents.map(event => (
                      <div key={event.id} className={`event-item event-${event.type}`}>
                        <div className="event-date">{event.date}</div>
                        <div className="event-title">{event.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="dashboard-card">
                  <h3>Tâches à faire</h3>
                  <div className="todo-list">
                    {todoList.map(item => (
                      <div key={item.id} className={`todo-item ${item.done ? 'done' : ''}`}>
                        <input type="checkbox" checked={item.done} readOnly />
                        <span>{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="quick-access">
                <h3>Accès rapide</h3>
                <div className="quick-access-buttons">
                  <Link to="/gestion-utilisateurs" className="quick-btn">
                    <FaUsers />
                    <span>Gestion des utilisateurs</span>
                  </Link>
                  <Link to="/gestion-materiel" className="quick-btn">
                    <FaLaptop />
                    <span>Matériels informatiques</span>
                  </Link>
                  <Link to="/gestion-reseau" className="quick-btn">
                    <FaNetworkWired />
                    <span>Réseaux informatiques</span>
                  </Link>
                  <Link to="/emploi-temps" className="quick-btn">
                    <FaClock />
                    <span>Emplois du temps</span>
                  </Link>
                  <Link to="/bibliotheque" className="quick-btn">
                    <FaBook />
                    <span>Bibliothèque numérique</span>
                  </Link>
                  <Link to="/travaux-pratiques" className="quick-btn">
                    <FaProjectDiagram />
                    <span>Travaux pratiques</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
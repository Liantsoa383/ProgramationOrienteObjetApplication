// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import HomePage from './pages/HomePage/HomePage';

// Import des pages
import AboutPage from './pages/AboutPage/AboutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Bienvenue from './pages/BienvenuePage/Bienvenue';
import GestionUtilisateurs from './pages/GestionUtilisateurs/GestionUtilisateurs';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Conserver l'API call existant
    axios.get('http://localhost:8080/api/welcome/message')
      .then(response => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des messages', error);
        setLoading(false);
      });
  }, []);

  return (
    
      <div className="App">
        <Routes>
          
          {/* Route principale pour la page d'accueil */}
          <Route path='/' element={<Bienvenue/>}/>
          <Route path="/home" element={<HomePage  />} />
          {/* Routes pour les pages du menu principal */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Routes pour M1 Télécommunications */}
          <Route path="/telecom/users" element={<GestionUtilisateurs/>} />
          <Route path="/telecom/schedules" element={<div>Gestion des répartitions</div>} />
          <Route path="/telecom/hardware" element={<div>Gestion des matériels informatiques</div>} />
          <Route path="/telecom/practicals" element={<div>Gestion des travaux pratiques</div>} />
          <Route path="/telecom/student-needs" element={<div>Gestion des besoins estudiantins</div>} />
          <Route path="/telecom/digital-library" element={<div>Gestion d'une bibliothèque numérique</div>} />
          <Route path="/telecom/manuscripts" element={<div>Gestion des manuscrits et livres</div>} />
          <Route path="/telecom/resources" element={<div>Gestion des ressources</div>} />
          <Route path="/telecom/networks" element={<div>Gestion des réseaux informatiques</div>} />

          {/* Routes pour M1 Électronique */}
          <Route path="/electronique/plannings" element={<div>Gestion des plannings</div>} />
          <Route path="/electronique/hardware" element={<div>Gestion des matériels</div>} />
          <Route path="/electronique/courses" element={<div>Gestion des cours</div>} />
          <Route path="/electronique/practicals" element={<div>Gestion des travaux pratiques</div>} />
          <Route path="/electronique/student-needs" element={<div>Gestion des besoins estudiantins</div>} />
          <Route path="/electronique/projects" element={<div>Gestion des projets et mémoires</div>} />
          <Route path="/electronique/manuscripts" element={<div>Gestion des manuscrits et livres</div>} />
          <Route path="/electronique/resources" element={<div>Gestion des ressources pédagogiques</div>} />
        </Routes>
      </div>
   
  );
}

export default App;
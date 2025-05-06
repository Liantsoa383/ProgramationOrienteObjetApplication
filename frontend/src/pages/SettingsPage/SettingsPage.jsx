// frontend/src/pages/SettingsPage/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SettingsPage.css';

function SettingsPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'administrateur',
    department: 'Télécommunications et réseaux',
    language: 'fr',
    theme: 'light',
    notifications: true,
    twoFactorAuth: false
  });
 
  const [formData, setFormData] = useState({...currentUser});
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Simuler la récupération de l'utilisateur actuel
  useEffect(() => {
    // En production, vous feriez un appel API comme:
    // axios.get('http://localhost:8080/api/users/current')
    //   .then(response => setCurrentUser(response.data))
    //   .catch(error => console.error('Erreur lors de la récupération du profil', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
   
    // Simulation de l'envoi des données
    setTimeout(() => {
      // En production, vous feriez un appel API comme:
      // axios.put(`http://localhost:8080/api/users/${currentUser.id}`, formData)
      //   .then(response => {
      //     setCurrentUser(response.data);
      //     setMessage({ text: 'Paramètres mis à jour avec succès', type: 'success' });
      //   })
      //   .catch(error => {
      //     setMessage({ text: 'Erreur lors de la mise à jour des paramètres', type: 'error' });
      //   })
      //   .finally(() => setIsLoading(false));
     
      setCurrentUser(formData);
      setMessage({ text: 'Paramètres mis à jour avec succès', type: 'success' });
      setIsLoading(false);
     
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({...currentUser});
    setMessage({ text: 'Formulaire réinitialisé', type: 'info' });
   
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Paramètres</h1>
        <p>Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <button
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <i className="fas fa-user"></i>
            Général
          </button>
          <button
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <i className="fas fa-lock"></i>
            Sécurité
          </button>
          <button
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <i className="fas fa-bell"></i>
            Notifications
          </button>
          <button
            className={`tab-button ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <i className="fas fa-palette"></i>
            Apparence
          </button>
          <button
            className={`tab-button ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            <i className="fas fa-cog"></i>
            Système
          </button>
        </div>
       
        <div className="settings-content">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {activeTab === 'general' && (
              <div className="settings-panel">
                <h2>Informations générales</h2>
               
                <div className="form-group">
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="department">Département</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="Télécommunications et réseaux">Télécommunications et réseaux</option>
                    <option value="Électronique">Électronique</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-panel">
                <h2>Sécurité</h2>
               
                <div className="form-group">
                  <label htmlFor="currentPassword">Mot de passe actuel</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Entrez votre mot de passe actuel"
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="newPassword">Nouveau mot de passe</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Entrez votre nouveau mot de passe"
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmez votre nouveau mot de passe"
                  />
                </div>
               
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    checked={formData.twoFactorAuth}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="twoFactorAuth">Activer l'authentification à deux facteurs</label>
                </div>
               
                <div className="info-box">
                  <p><strong>Conseils de sécurité :</strong></p>
                  <ul>
                    <li>Utilisez un mot de passe fort avec au moins 8 caractères</li>
                    <li>Incluez des lettres majuscules, minuscules, chiffres et symboles</li>
                    <li>Ne réutilisez pas vos anciens mots de passe</li>
                    <li>Changez régulièrement votre mot de passe</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-panel">
                <h2>Préférences de notifications</h2>
               
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="emailNotifications">Recevoir des notifications par email</label>
                </div>
               
                <div className="notification-options">
                  <h3>Notifications pour:</h3>
                 
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="notifySchedule"
                      name="notifySchedule"
                      checked={true}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="notifySchedule">Changements d'emploi du temps</label>
                  </div>
                 
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="notifyAssignments"
                      name="notifyAssignments"
                      checked={true}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="notifyAssignments">Nouveaux travaux pratiques</label>
                  </div>
                 
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="notifySystem"
                      name="notifySystem"
                      checked={true}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="notifySystem">Mises à jour système</label>
                  </div>
                 
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="notifyResources"
                      name="notifyResources"
                      checked={true}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="notifyResources">Nouvelles ressources disponibles</label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="settings-panel">
                <h2>Apparence</h2>
               
                <div className="form-group">
                  <label htmlFor="theme">Thème</label>
                  <select
                    id="theme"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                  >
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                    <option value="system">Système (auto)</option>
                  </select>
                </div>
               
                <div className="form-group">
                  <label htmlFor="language">Langue</label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="mg">Malagasy</option>
                  </select>
                </div>
               
                <div className="theme-preview">
                  <h3>Aperçu du thème</h3>
                  <div className={`preview-box ${formData.theme}`}>
                    <div className="preview-header">
                      <div className="preview-title">Gestion de scolarité ISSTM</div>
                    </div>
                    <div className="preview-content">
                      <div className="preview-sidebar"></div>
                      <div className="preview-main"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="settings-panel">
                <h2>Paramètres système</h2>
               
                <div className="info-box">
                  <p><strong>Informations système :</strong></p>
                  <ul>
                    <li>Version de l'application: 1.0.0</li>
                    <li>Dernière mise à jour: 06/05/2025</li>
                    <li>Espace de stockage utilisé: 1.2 GB</li>
                  </ul>
                </div>
               
                <div className="form-group">
                  <label htmlFor="dataExport">Exporter les données</label>
                  <button type="button" className="btn secondary-btn">
                    Exporter au format CSV
                  </button>
                </div>
               
                <div className="danger-zone">
                  <h3>Zone de danger</h3>
                  <p>Ces actions sont irréversibles. Procédez avec précaution.</p>
                 
                  <button type="button" className="btn warning-btn">
                    Réinitialiser les paramètres par défaut
                  </button>
                 
                  <button type="button" className="btn danger-btn">
                    Supprimer mon compte
                  </button>
                </div>
              </div>
            )}

            <div className="settings-actions">
              <button type="button" className="btn secondary-btn" onClick={handleReset}>
                Réinitialiser
              </button>
              <button type="submit" className="btn primary-btn" disabled={isLoading}>
                {isLoading ? 'Sauvegarde en cours...' : 'Sauvegarder les modifications'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
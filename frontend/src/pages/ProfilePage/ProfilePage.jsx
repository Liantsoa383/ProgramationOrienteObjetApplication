import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    filiere: '',
    niveau: '',
    address: '',
    birthDate: '',
    bio: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [activities, setActivities] = useState([]);

  // Récupération des données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      // Vérifier si l'utilisateur est connecté (token)
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
     
      if (!token) {
        navigate('/login');
        return;
      }
     
      try {
        setLoading(true);
        // API de récupération du profil utilisateur
        const response = await axios.get('/api/utilisateur/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
        const user = response.data;
        setUserData(user);
        
        // Adapter les noms de champs pour correspondre au backend
        setFormData({
          prenom: user.prenom || '',
          nom: user.nom || '',
          email: user.email || '',
          telephone: user.telephone || '',
          filiere: user.filiere || '',
          niveau: user.niveau || '',
          address: user.address || '',
          birthDate: user.birthDate || '',
          bio: user.bio || ''
        });
       
        // Récupération des activités récentes
        const activitiesResponse = await axios.get('/api/utilisateur/activities', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
        setActivities(activitiesResponse.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de charger les informations de profil. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };
   
    fetchUserData();
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset feedback messages when changing tabs
    setUpdateSuccess(false);
    setPasswordSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
   
    // Clear error for this field if any
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
   
    // Clear error for this field if any
    if (passwordErrors[name]) {
      setPasswordErrors({
        ...passwordErrors,
        [name]: ''
      });
    }
  };

  const validateProfileForm = () => {
    const errors = {};
   
    if (!formData.prenom.trim()) {
      errors.prenom = 'Le prénom est obligatoire';
    }
   
    if (!formData.nom.trim()) {
      errors.nom = 'Le nom est obligatoire';
    }
   
    if (!formData.email) {
      errors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
   
    if (formData.telephone && !/^[0-9+\s-]{8,15}$/.test(formData.telephone)) {
      errors.telephone = 'Format de téléphone invalide';
    }
   
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      if (birthDate > today) {
        errors.birthDate = 'La date de naissance ne peut pas être dans le futur';
      }
    }
   
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
   
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Le mot de passe actuel est obligatoire';
    }
   
    if (!passwordData.newPassword) {
      errors.newPassword = 'Le nouveau mot de passe est obligatoire';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      errors.newPassword = 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
    }
   
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'La confirmation du mot de passe est obligatoire';
    } else if (passwordData.confirmPassword !== passwordData.newPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
   
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
   
    if (validateProfileForm()) {
      setLoading(true);
     
      try {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        
        // Adaptation des noms de champs pour le backend
        const profileData = {
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          filiere: formData.filiere,
          niveau: formData.niveau,
          address: formData.address,
          birthDate: formData.birthDate,
          bio: formData.bio
        };
        
        // Appel API pour mettre à jour le profil
        await axios.put('/api/utilisateur/update', profileData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
        setUserData({
          ...userData,
          ...formData
        });
       
        setEditMode(false);
        setUpdateSuccess(true);
       
        // Cacher le message de succès après 3 secondes
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      } catch (err) {
        console.error('Erreur lors de la mise à jour du profil:', err);
        setFormErrors({
          ...formErrors,
          general: 'Erreur lors de la mise à jour du profil. Veuillez réessayer.'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
   
    if (validatePasswordForm()) {
      setLoading(true);
     
      try {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        
        // Appel API pour changer le mot de passe
        await axios.put('/api/utilisateur/changePassword', {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
        // Reset password form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
       
        setPasswordSuccess(true);
       
        // Cacher le message de succès après 3 secondes
        setTimeout(() => {
          setPasswordSuccess(false);
        }, 3000);
      } catch (err) {
        console.error('Erreur lors du changement de mot de passe:', err);
        setPasswordErrors({
          ...passwordErrors,
          general: 'Erreur lors du changement de mot de passe. Veuillez vérifier votre mot de passe actuel.'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const cancelEdit = () => {
    // Reset form data to original values
    if (userData) {
      setFormData({
        prenom: userData.prenom || '',
        nom: userData.nom || '',
        email: userData.email || '',
        telephone: userData.telephone || '',
        filiere: userData.filiere || '',
        niveau: userData.niveau || '',
        address: userData.address || '',
        birthDate: userData.birthDate || '',
        bio: userData.bio || ''
      });
    }
   
    setEditMode(false);
    setFormErrors({});
  };

  // Fonction pour convertir les rôles en type d'utilisateur lisible
  const getUserRole = (roles) => {
    if (!roles) return 'Utilisateur';
    if (roles.includes('ROLE_ETUDIANT')) return 'Étudiant';
    if (roles.includes('ROLE_ENSEIGNANT')) return 'Enseignant';
    if (roles.includes('ROLE_ADMIN')) return 'Administrateur';
    return 'Utilisateur';
  };

  // Fonction pour convertir la filière en texte lisible
  const getFiliereText = (filiere) => {
    if (!filiere) return '';
    switch(filiere.toLowerCase()) {
      case 'telecom': return 'Télécommunications et réseaux';
      case 'electronics': return 'Électronique';
      case 'computer': return 'Informatique';
      default: return filiere;
    }
  };

  // Fonction pour convertir le niveau en texte lisible
  const getNiveauText = (niveau) => {
    if (!niveau) return '';
    switch(niveau) {
      case 1: return 'Licence 1';
      case 2: return 'Licence 2';
      case 3: return 'Licence 3';
      case 4: return 'Master 1';
      case 5: return 'Master 2';
      default: return `Niveau ${niveau}`;
    }
  };

  if (loading && !userData) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <h3>Erreur</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/login')}>Retour à la connexion</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {userData?.prenom?.charAt(0)}{userData?.nom?.charAt(0)}
        </div>
        <div className="profile-title">
          <h1>{userData?.prenom} {userData?.nom}</h1>
          <p>{getUserRole(userData?.roles)}</p>
          {userData?.roles?.includes('ROLE_ETUDIANT') && (
            <span className="student-info">
              {getFiliereText(userData?.filiere)} - {getNiveauText(userData?.niveau)}
            </span>
          )}
        </div>
      </div>
     
      <div className="profile-content">
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => handleTabChange('personal')}
          >
            Informations personnelles
          </button>
          <button
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => handleTabChange('security')}
          >
            Sécurité
          </button>
          <button
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => handleTabChange('activity')}
          >
            Activités récentes
          </button>
        </div>
       
        <div className="profile-tab-content">
          {activeTab === 'personal' && (
            <div className="personal-info">
              {!editMode ? (
                <>
                  {updateSuccess && (
                    <div className="success-message">
                      Votre profil a été mis à jour avec succès!
                    </div>
                  )}
                 
                  <div className="info-section">
                    <h3>Informations de base</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Prénom</span>
                        <span className="info-value">{userData?.prenom}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Nom</span>
                        <span className="info-value">{userData?.nom}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email</span>
                        <span className="info-value">{userData?.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Téléphone</span>
                        <span className="info-value">{userData?.telephone || 'Non renseigné'}</span>
                      </div>
                    </div>
                  </div>
                 
                  {userData?.roles?.includes('ROLE_ETUDIANT') && (
                    <div className="info-section">
                      <h3>Informations académiques</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Numéro étudiant</span>
                          <span className="info-value">{userData?.numMatricule}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Filière</span>
                          <span className="info-value">{getFiliereText(userData?.filiere)}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Niveau</span>
                          <span className="info-value">{getNiveauText(userData?.niveau)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {userData?.roles?.includes('ROLE_ENSEIGNANT') && (
                    <div className="info-section">
                      <h3>Informations professionnelles</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Spécialité</span>
                          <span className="info-value">{userData?.specialite || 'Non renseignée'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Grade</span>
                          <span className="info-value">{userData?.grade || 'Non renseigné'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                 
                  <div className="info-section">
                    <h3>Informations additionnelles</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Adresse</span>
                        <span className="info-value">{userData?.address || 'Non renseignée'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Date de naissance</span>
                        <span className="info-value">
                          {userData?.birthDate ? new Date(userData.birthDate).toLocaleDateString() : 'Non renseignée'}
                        </span>
                      </div>
                    </div>
                  </div>
                 
                  <div className="info-section">
                    <h3>Biographie</h3>
                    <p className="bio">{userData?.bio || 'Aucune biographie renseignée.'}</p>
                  </div>
                 
                  <div className="profile-actions">
                    <button className="edit-button" onClick={() => setEditMode(true)}>
                      Modifier le profil
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveProfile} className="edit-profile-form">
                  <h3>Modifier le profil</h3>
                 
                  {formErrors.general && (
                    <div className="error-message general-error">
                      {formErrors.general}
                    </div>
                  )}
                 
                  <div className="form-section">
                    <h4>Informations de base</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="prenom">Prénom</label>
                        <input
                          type="text"
                          id="prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleInputChange}
                          className={formErrors.prenom ? 'input-error' : ''}
                        />
                        {formErrors.prenom && <span className="error-message">{formErrors.prenom}</span>}
                      </div>
                     
                      <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleInputChange}
                          className={formErrors.nom ? 'input-error' : ''}
                        />
                        {formErrors.nom && <span className="error-message">{formErrors.nom}</span>}
                      </div>
                    </div>
                   
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={formErrors.email ? 'input-error' : ''}
                        />
                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                      </div>
                     
                      <div className="form-group">
                        <label htmlFor="telephone">Téléphone</label>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleInputChange}
                          className={formErrors.telephone ? 'input-error' : ''}
                        />
                        {formErrors.telephone && <span className="error-message">{formErrors.telephone}</span>}
                      </div>
                    </div>
                  </div>
                 
                  <div className="form-section">
                    <h4>Informations additionnelles</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="address">Adresse</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                     
                      <div className="form-group">
                        <label htmlFor="birthDate">Date de naissance</label>
                        <input
                          type="date"
                          id="birthDate"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className={formErrors.birthDate ? 'input-error' : ''}
                        />
                        {formErrors.birthDate && <span className="error-message">{formErrors.birthDate}</span>}
                      </div>
                    </div>
                  </div>
                 
                  <div className="form-section">
                    <h4>Biographie</h4>
                    <div className="form-group">
                      <label htmlFor="bio">À propos de vous</label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                 
                  <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={cancelEdit}>
                      Annuler
                    </button>
                    <button type="submit" className="save-button" disabled={loading}>
                      {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
         
          {activeTab === 'security' && (
            <div className="security-settings">
              <h3>Changement de mot de passe</h3>
             
              {passwordSuccess && (
                <div className="success-message">
                  Votre mot de passe a été changé avec succès!
                </div>
              )}
             
              {passwordErrors.general && (
                <div className="error-message general-error">
                  {passwordErrors.general}
                </div>
              )}
             
              <form onSubmit={handleChangePassword} className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Mot de passe actuel</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={passwordErrors.currentPassword ? 'input-error' : ''}
                  />
                  {passwordErrors.currentPassword && <span className="error-message">{passwordErrors.currentPassword}</span>}
                </div>
               
                <div className="form-group">
                  <label htmlFor="newPassword">Nouveau mot de passe</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={passwordErrors.newPassword ? 'input-error' : ''}
                  />
                  {passwordErrors.newPassword && <span className="error-message">{passwordErrors.newPassword}</span>}
                </div>
               
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={passwordErrors.confirmPassword ? 'input-error' : ''}
                  />
                  {passwordErrors.confirmPassword && <span className="error-message">{passwordErrors.confirmPassword}</span>}
                </div>
               
                <div className="password-requirements">
                  <h4>Exigences de sécurité:</h4>
                  <ul>
                    <li>Au moins 8 caractères</li>
                    <li>Au moins une lettre majuscule</li>
                    <li>Au moins une lettre minuscule</li>
                    <li>Au moins un chiffre</li>
                  </ul>
                </div>
               
                <button type="submit" className="change-password-button" disabled={loading}>
                  {loading ? 'Modification en cours...' : 'Changer le mot de passe'}
                </button>
              </form>
             
              <div className="security-section">
                <h3>Sessions actives</h3>
                <p>Vous êtes actuellement connecté sur cet appareil.</p>
                <button className="logout-button" onClick={() => {
                  localStorage.removeItem('authToken');
                  sessionStorage.removeItem('authToken');
                  navigate('/login');
                }}>
                  Se déconnecter de tous les appareils
                </button>
              </div>
            </div>
          )}
         
          {activeTab === 'activity' && (
            <div className="activity-log">
              <h3>Activités récentes</h3>
             
              {activities.length > 0 ? (
                <div className="activities-list">
                  {activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === 'LOGIN' ? '🔐' :
                         activity.type === 'PROFILE_UPDATE' ? '✏️' :
                         activity.type === 'PASSWORD_CHANGE' ? '🔑' :
                         activity.type === 'DOCUMENT_UPLOAD' ? '📁' : '🔔'}
                      </div>
                      <div className="activity-details">
                        <p className="activity-description">{activity.description}</p>
                        <p className="activity-time">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-activities">Aucune activité récente à afficher.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
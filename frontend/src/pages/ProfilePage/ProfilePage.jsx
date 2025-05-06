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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    level: '',
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

  // Simuler la récupération des données utilisateur
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
        // Remplacez cette URL par votre API réelle
        const response = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
        setUserData(response.data);
        setFormData({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          department: response.data.department || '',
          level: response.data.level || '',
          address: response.data.address || '',
          birthDate: response.data.birthDate || '',
          bio: response.data.bio || ''
        });
       
        // Simuler la récupération des activités récentes
        const activitiesResponse = await axios.get('http://localhost:8080/api/user/activities', {
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
   
    if (!formData.firstName.trim()) {
      errors.firstName = 'Le prénom est obligatoire';
    }
   
    if (!formData.lastName.trim()) {
      errors.lastName = 'Le nom est obligatoire';
    }
   
    if (!formData.email) {
      errors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
   
    if (formData.phone && !/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = 'Format de téléphone invalide';
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
        // Remplacez cette URL par votre API réelle
        await axios.put('http://localhost:8080/api/user/profile', formData, {
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
        // Remplacez cette URL par votre API réelle
        await axios.put('http://localhost:8080/api/user/password', {
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
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        department: userData.department || '',
        level: userData.level || '',
        address: userData.address || '',
        birthDate: userData.birthDate || '',
        bio: userData.bio || ''
      });
    }
   
    setEditMode(false);
    setFormErrors({});
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
          {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
        </div>
        <div className="profile-title">
          <h1>{userData?.firstName} {userData?.lastName}</h1>
          <p>{userData?.role === 'student' ? 'Étudiant' : userData?.role === 'teacher' ? 'Enseignant' : 'Administrateur'}</p>
          {userData?.role === 'student' && (
            <span className="student-info">
              {userData?.department === 'telecom' ? 'Télécommunications et réseaux' :
               userData?.department === 'electronics' ? 'Électronique' :
               userData?.department === 'computer' ? 'Informatique' : userData?.department} -
              {userData?.level === 'l1' ? 'Licence 1' :
               userData?.level === 'l2' ? 'Licence 2' :
               userData?.level === 'l3' ? 'Licence 3' :
               userData?.level === 'm1' ? 'Master 1' :
               userData?.level === 'm2' ? 'Master 2' : userData?.level}
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
                        <span className="info-value">{userData?.firstName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Nom</span>
                        <span className="info-value">{userData?.lastName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email</span>
                        <span className="info-value">{userData?.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Téléphone</span>
                        <span className="info-value">{userData?.phone || 'Non renseigné'}</span>
                      </div>
                    </div>
                  </div>
                 
                  {userData?.role === 'student' && (
                    <div className="info-section">
                      <h3>Informations académiques</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Numéro étudiant</span>
                          <span className="info-value">{userData?.studentId}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Département</span>
                          <span className="info-value">
                            {userData?.department === 'telecom' ? 'Télécommunications et réseaux' :
                             userData?.department === 'electronics' ? 'Électronique' :
                             userData?.department === 'computer' ? 'Informatique' : userData?.department}
                          </span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Niveau</span>
                          <span className="info-value">
                            {userData?.level === 'l1' ? 'Licence 1' :
                             userData?.level === 'l2' ? 'Licence 2' :
                             userData?.level === 'l3' ? 'Licence 3' :
                             userData?.level === 'm1' ? 'Master 1' :
                             userData?.level === 'm2' ? 'Master 2' : userData?.level}
                          </span>
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
                        <label htmlFor="firstName">Prénom</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={formErrors.firstName ? 'input-error' : ''}
                        />
                        {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
                      </div>
                     
                      <div className="form-group">
                        <label htmlFor="lastName">Nom</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={formErrors.lastName ? 'input-error' : ''}
                        />
                        {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
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
                        <label htmlFor="phone">Téléphone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={formErrors.phone ? 'input-error' : ''}
                        />
                        {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
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
                        {activity.type === 'login' ? '🔐' :
                         activity.type === 'profile_update' ? '✏️' :
                         activity.type === 'password_change' ? '🔑' :
                         activity.type === 'document_upload' ? '📁' : '🔔'}
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
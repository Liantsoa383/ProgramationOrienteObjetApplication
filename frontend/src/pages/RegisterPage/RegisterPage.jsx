import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Champs correspondant au backend
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    username: '',
    password: '',
    confirmPassword: '', // Champ pour la validation (pas dans le backend)
    roles: new Set(['ETUDIANT']), // Set pour correspondre au backend
    acceptTerms: false, // Pour validation côté client seulement
    
    // Champs spécifiques pour les étudiants
    numMatricule: '',
    dateNaissance: '',
    lieuNaissance: '',
    filiereCode: '',
    niveau: null,
    
    // Champs spécifiques pour les enseignants
    specialite: '',
    grade: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'roles') {
      // Gérer roles comme un Set pour correspondre au backend
      setFormData({
        ...formData,
        [name]: new Set([value])
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }

    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est obligatoire';
    }

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    }

    if (!formData.email) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.telephone) {
      newErrors.telephone = 'Le numéro de téléphone est obligatoire';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.telephone)) {
      newErrors.telephone = 'Format de téléphone invalide';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = 'Le mot de passe est obligatoire';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est obligatoire';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Vérification des champs spécifiques selon le rôle
    const userRole = Array.from(formData.roles)[0]; // Convertir Set en Array pour récupérer la première valeur
    
    if (userRole === 'ETUDIANT') {
      if (!formData.numMatricule.trim()) {
        newErrors.numMatricule = 'Le numéro de matricule est obligatoire';
      }
     
      if (!formData.filiereCode.trim()) {
        newErrors.filiereCode = 'La filière est obligatoire';
      }
     
      if (!formData.niveau) {
        newErrors.niveau = 'Le niveau est obligatoire';
      }
      
      if (!formData.dateNaissance) {
        newErrors.dateNaissance = 'La date de naissance est obligatoire';
      }
      
      if (!formData.lieuNaissance.trim()) {
        newErrors.lieuNaissance = 'Le lieu de naissance est obligatoire';
      }
    } else if (userRole === 'ENSEIGNANT') {
      if (!formData.specialite.trim()) {
        newErrors.specialite = 'La spécialité est obligatoire';
      }
      
      if (!formData.grade.trim()) {
        newErrors.grade = 'Le grade est obligatoire';
      }
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep2()) {
      setLoading(true);
      setRegisterError('');
      
      try {
        // Conversion du Set en Array pour l'envoi au backend (JSON ne supporte pas les Sets)
        const requestData = {
          username: formData.username,
          motDePasse: formData.password,
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          role: Array.from(formData.roles)[0], // Convertir Set en Array pour JSON
        };
        
        // Ajout des champs spécifiques en fonction du rôle
        const userRole = Array.from(formData.roles)[0]; // Convertir Set en Array pour récupérer la première valeur
        if (userRole === 'ETUDIANT') {
          requestData.numMatricule = formData.numMatricule;
          requestData.dateNaissance = formData.dateNaissance ? new Date(formData.dateNaissance) : null;
          requestData.lieuNaissance = formData.lieuNaissance;
          requestData.filiereCode = formData.filiereCode;
          requestData.niveau = parseInt(formData.niveau, 10);
        } else if (userRole === 'ENSEIGNANT') {
          requestData.specialite = formData.specialite;
          requestData.grade = formData.grade;
        }
        
        // URL CORRIGÉE pour correspondre au contrôleur backend
        const response = await axios.post('http://localhost:8080/api/auth/inscription', requestData);
       
        navigate('/login', {
          state: {
            message: 'Inscription réussie! Veuillez vous connecter.'
          }
        });
      } catch (error) {
        console.error('Erreur d\'inscription:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setRegisterError(error.response.data.message);
        } else {
          setRegisterError('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Créer un compte</h2>
          <p>Rejoignez notre système de gestion de scolarité</p>
          
          <div className="steps-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>
        </div>
       
        {registerError && <div className="register-error">{registerError}</div>}
       
        <form onSubmit={handleSubmit} className="register-form">
          {step === 1 ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prenom">Prénom</label>
                  <input
                    type="text"
                    id="prenom" 
                    name="prenom" 
                    value={formData.prenom}
                    onChange={handleChange}
                    className={errors.prenom ? 'input-error' : ''}
                    placeholder="Entrez votre prénom"
                  />
                  {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                </div>
               
                <div className="form-group">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={errors.nom ? 'input-error' : ''}
                    placeholder="Entrez votre nom"
                  />
                  {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'input-error' : ''}
                  placeholder="Choisissez un nom d'utilisateur"
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
             
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                  placeholder="Entrez votre email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
             
              <div className="form-group">
                <label htmlFor="telephone">Téléphone</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={errors.telephone ? 'input-error' : ''}
                  placeholder="Entrez votre numéro de téléphone"
                />
                {errors.telephone && <span className="error-message">{errors.telephone}</span>}
              </div>
             
              <div className="form-group">
                <label htmlFor="roles">Rôle</label>
                <select
                  id="roles"
                  name="roles"
                  value={Array.from(formData.roles)[0]}
                  onChange={handleChange}
                >
                  <option value="ETUDIANT">Étudiant</option>
                  <option value="ENSEIGNANT">Enseignant</option>
                  <option value="ADMINISTRATEUR">Administrateur</option>
                </select>
              </div>
              
              <button type="button" onClick={nextStep} className="next-button">
                Suivant
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  placeholder="Créez votre mot de passe"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
             
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'input-error' : ''}
                  placeholder="Confirmez votre mot de passe"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
             
              {Array.from(formData.roles)[0] === 'ETUDIANT' && (
                <>
                  <div className="form-group">
                    <label htmlFor="numMatricule">Numéro matricule</label>
                    <input
                      type="text"
                      id="numMatricule"
                      name="numMatricule"
                      value={formData.numMatricule}
                      onChange={handleChange}
                      className={errors.numMatricule ? 'input-error' : ''}
                      placeholder="Entrez votre numéro matricule"
                    />
                    {errors.numMatricule && <span className="error-message">{errors.numMatricule}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="dateNaissance">Date de naissance</label>
                    <input
                      type="date"
                      id="dateNaissance"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleChange}
                      className={errors.dateNaissance ? 'input-error' : ''}
                    />
                    {errors.dateNaissance && <span className="error-message">{errors.dateNaissance}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lieuNaissance">Lieu de naissance</label>
                    <input
                      type="text"
                      id="lieuNaissance"
                      name="lieuNaissance"
                      value={formData.lieuNaissance}
                      onChange={handleChange}
                      className={errors.lieuNaissance ? 'input-error' : ''}
                      placeholder="Entrez votre lieu de naissance"
                    />
                    {errors.lieuNaissance && <span className="error-message">{errors.lieuNaissance}</span>}
                  </div>
                 
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="filiereCode">Filière</label>
                      <select
                        id="filiereCode"
                        name="filiereCode"
                        value={formData.filiereCode}
                        onChange={handleChange}
                        className={errors.filiereCode ? 'input-error' : ''}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="TR">Télécommunications et réseaux</option>
                        <option value="EL">Électronique</option>
                        <option value="INF">Informatique</option>
                      </select>
                      {errors.filiereCode && <span className="error-message">{errors.filiereCode}</span>}
                    </div>
                   
                    <div className="form-group">
                      <label htmlFor="niveau">Niveau</label>
                      <select
                        id="niveau"
                        name="niveau"
                        value={formData.niveau}
                        onChange={handleChange}
                        className={errors.niveau ? 'input-error' : ''}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="1">Licence 1</option>
                        <option value="2">Licence 2</option>
                        <option value="3">Licence 3</option>
                        <option value="4">Master 1</option>
                        <option value="5">Master 2</option>
                      </select>
                      {errors.niveau && <span className="error-message">{errors.niveau}</span>}
                    </div>
                  </div>
                </>
              )}
              
              {Array.from(formData.roles)[0] === 'ENSEIGNANT' && (
                <>
                  <div className="form-group">
                    <label htmlFor="specialite">Spécialité</label>
                    <input
                      type="text"
                      id="specialite"
                      name="specialite"
                      value={formData.specialite}
                      onChange={handleChange}
                      className={errors.specialite ? 'input-error' : ''}
                      placeholder="Entrez votre spécialité"
                    />
                    {errors.specialite && <span className="error-message">{errors.specialite}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="grade">Grade</label>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className={errors.grade ? 'input-error' : ''}
                    >
                      <option value="">Sélectionnez</option>
                      <option value="Assistant">Assistant</option>
                      <option value="Maître-Assistant">Maître-Assistant</option>
                      <option value="Maître de Conférences">Maître de Conférences</option>
                      <option value="Professeur">Professeur</option>
                    </select>
                    {errors.grade && <span className="error-message">{errors.grade}</span>}
                  </div>
                </>
              )}
             
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <label htmlFor="acceptTerms">
                  J'accepte les <a href="/terms" target="_blank" rel="noopener noreferrer">conditions d'utilisation</a> et la <a href="/privacy" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>
                </label>
                {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
              </div>
             
              <div className="form-buttons">
                <button type="button" onClick={prevStep} className="back-button">
                  Retour
                </button>
                <button type="submit" className="register-button" disabled={loading}>
                  {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
              </div>
            </>
          )}
        </form>
       
        <div className="register-footer">
          <p>Vous avez déjà un compte? <Link to="/login" className="login-link">Se connecter</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
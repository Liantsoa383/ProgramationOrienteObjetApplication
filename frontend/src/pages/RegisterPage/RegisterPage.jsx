import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Par défaut: student, teacher, admin
    studentId: '',
    department: '',
    level: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
   
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
   
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est obligatoire';
    }
   
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est obligatoire';
    }
   
    if (!formData.email) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
   
    if (!formData.phone) {
      newErrors.phone = 'Le numéro de téléphone est obligatoire';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide';
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
   
    if (formData.role === 'student') {
      if (!formData.studentId.trim()) {
        newErrors.studentId = 'Le numéro étudiant est obligatoire';
      }
     
      if (!formData.department.trim()) {
        newErrors.department = 'Le département est obligatoire';
      }
     
      if (!formData.level.trim()) {
        newErrors.level = 'Le niveau est obligatoire';
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
        const response = await axios.post('http://localhost:8080/api/auth/register', formData);
       
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
       
        <form onSubmit={step === 1 ? nextStep : handleSubmit} className="register-form">
          {step === 1 ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'input-error' : ''}
                    placeholder="Entrez votre prénom"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
               
                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'input-error' : ''}
                    placeholder="Entrez votre nom"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
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
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                  placeholder="Entrez votre numéro de téléphone"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
             
              <div className="form-group">
                <label htmlFor="role">Rôle</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Étudiant</option>
                  <option value="teacher">Enseignant</option>
                  <option value="admin">Administrateur</option>
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
             
              {formData.role === 'student' && (
                <>
                  <div className="form-group">
                    <label htmlFor="studentId">Numéro étudiant</label>
                    <input
                      type="text"
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className={errors.studentId ? 'input-error' : ''}
                      placeholder="Entrez votre numéro étudiant"
                    />
                    {errors.studentId && <span className="error-message">{errors.studentId}</span>}
                  </div>
                 
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="department">Département</label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={errors.department ? 'input-error' : ''}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="telecom">Télécommunications et réseaux</option>
                        <option value="electronics">Électronique</option>
                        <option value="computer">Informatique</option>
                      </select>
                      {errors.department && <span className="error-message">{errors.department}</span>}
                    </div>
                   
                    <div className="form-group">
                      <label htmlFor="level">Niveau</label>
                      <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className={errors.level ? 'input-error' : ''}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="l1">Licence 1</option>
                        <option value="l2">Licence 2</option>
                        <option value="l3">Licence 3</option>
                        <option value="m1">Master 1</option>
                        <option value="m2">Master 2</option>
                      </select>
                      {errors.level && <span className="error-message">{errors.level}</span>}
                    </div>
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
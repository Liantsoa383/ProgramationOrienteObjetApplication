import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';


const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', // Correspond au backend qui utilise username
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Le nom d\'utilisateur est obligatoire';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est obligatoire';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setLoginError('');
      
      try {
        console.log({
          email: formData.username,
          motDePasse: formData.password
        })
        // Appel à l'endpoint d'authentification de votre backend
        const response = await axios.post('http://localhost:8080/api/auth/connexion', {
          email: formData.username,
          motDePasse: formData.password
        });
        
        // Gestion de la réponse selon la structure de votre backend
        const { token, user, refreshToken, accessToken } = response.data;
        
        // Stockage du token principal (token ou accessToken selon votre implémentation)
        const authToken = token || accessToken;
        if (authToken) {
          if (formData.rememberMe) {
            localStorage.setItem('authToken', authToken);
          } else {
            sessionStorage.setItem('authToken', authToken);
          }
        }
        
        // Stockage du refresh token s'il existe
        if (refreshToken) {
          if (formData.rememberMe) {
            localStorage.setItem('refreshToken', refreshToken);
          } else {
            sessionStorage.setItem('refreshToken', refreshToken);
          }
        }
        
        // Stockage des informations utilisateur
        if (user) {
          const userData = JSON.stringify(user);
          if (formData.rememberMe) {
            localStorage.setItem('userData', userData);
          } else {
            sessionStorage.setItem('userData', userData);
          }
        }
        
        // Configuration d'axios pour les futures requêtes
        if (authToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        }
        
        // Redirection vers la page d'accueil (garde votre logique originale)
        navigate('/home');
        
      } catch (error) {
        console.error('Erreur de connexion:', error);
        
        // Gestion des erreurs spécifiques à votre backend
        if (error.response) {
          const { status, data } = error.response;
          
          switch (status) {
            case 401:
              setLoginError('Nom d\'utilisateur ou mot de passe incorrect');
              break;
            case 403:
              setLoginError('Votre compte est désactivé. Contactez l\'administrateur.');
              break;
            case 404:
              setLoginError('Utilisateur non trouvé');
              break;
            case 429:
              setLoginError('Trop de tentatives de connexion. Veuillez réessayer plus tard.');
              break;
            case 500:
              setLoginError('Erreur serveur. Veuillez réessayer plus tard.');
              break;
            default:
              if (data && data.message) {
                setLoginError(data.message);
              } else {
                setLoginError('Erreur de connexion. Veuillez vérifier vos identifiants et réessayer.');
              }
          }
        } else if (error.request) {
          setLoginError('Impossible de contacter le serveur. Vérifiez votre connexion internet.');
        } else {
          setLoginError('Erreur de connexion. Veuillez vérifier vos identifiants et réessayer.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Connexion</h2>
          <p>Connectez-vous pour accéder à votre espace de gestion</p>
        </div>
        
        {loginError && <div className="login-error">{loginError}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
              placeholder="Entrez votre nom d'utilisateur"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="Entrez votre mot de passe"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Se souvenir de moi</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">Mot de passe oublié?</Link>
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Vous n'avez pas de compte? <Link to="/register" className="register-link">S'inscrire</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
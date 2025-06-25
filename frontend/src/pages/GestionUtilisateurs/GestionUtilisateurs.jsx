import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GestionUtilisateurs.css';
import TopNavbar from '../../companents/naveBare/TopNavbar/TopNavbar';
import SideNavbar from '../../companents/naveBare/SideNavbar/SideNavbar';

const GestionUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/utilisateurs'); 
        setUtilisateurs(response.data.content);
      } catch (err) {
        setError('Erreur lors de la récupération des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateurs();
  }, []);

  const supprimerUtilisateur = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/utilisateurs/${id}`);
      setUtilisateurs(utilisateurs.filter(user => user.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
      <TopNavbar />
      
      <div className="main-content">
        <SideNavbar />

    <div className="gestion-utilisateurs">
      <h1>Gestion des Utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Rôle</th>
            <th>Actif</th>
            <th>Date de Création</th>
            <th>Dernière Connexion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur) => (
            <tr key={utilisateur.id}>
              <td>{utilisateur.id}</td>
              <td>{utilisateur.matricule}</td>
              <td>{utilisateur.nom}</td>
              <td>{utilisateur.prenom}</td>
              <td>{utilisateur.email}</td>
              <td>{utilisateur.telephone}</td>
              <td>{utilisateur.role.nom}</td> {/* Afficher le nom du rôle */}
              <td>{utilisateur.actif ? 'Oui' : 'Non'}</td>
              <td>{utilisateur.dateCreation}</td>
              <td>{utilisateur.derniereConnexion}</td>
              <td>
                <button onClick={() => supprimerUtilisateur(utilisateur.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default GestionUtilisateurs;
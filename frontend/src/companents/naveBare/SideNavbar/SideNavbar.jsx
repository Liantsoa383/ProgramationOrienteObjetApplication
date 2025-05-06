// frontend/src/components/SideNavbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideNavbar.css';

const SideNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setExpandedCategory(null);
    }
  };

  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Données pour M1 Télécommunications
  const telecomThemes = [
    { name: 'Gestion des utilisateurs', path: '/telecom/users', icon: 'fas fa-users' },
    { name: 'Gestion des répartitions', path: '/telecom/schedules', icon: 'fas fa-calendar-alt' },
    { name: 'Gestion des matériels', path: '/telecom/hardware', icon: 'fas fa-laptop' },
    { name: 'Travaux pratiques', path: '/telecom/practicals', icon: 'fas fa-flask' },
    { name: 'Besoins estudiantins', path: '/telecom/student-needs', icon: 'fas fa-graduation-cap' },
    { name: 'Bibliothèque numérique', path: '/telecom/digital-library', icon: 'fas fa-book-reader' },
    { name: 'Manuscrits et livres', path: '/telecom/manuscripts', icon: 'fas fa-book' },
    { name: 'Ressources', path: '/telecom/resources', icon: 'fas fa-boxes' },
    { name: 'Réseaux informatiques', path: '/telecom/networks', icon: 'fas fa-network-wired' },
  ];

  // Données pour M1 Électronique
  const electroniqueThemes = [
    { name: 'Gestion des plannings', path: '/electronique/plannings', icon: 'fas fa-calendar-week' },
    { name: 'Gestion des matériels', path: '/electronique/hardware', icon: 'fas fa-microchip' },
    { name: 'Gestion des cours', path: '/electronique/courses', icon: 'fas fa-chalkboard-teacher' },
    { name: 'Travaux pratiques', path: '/electronique/practicals', icon: 'fas fa-tools' },
    { name: 'Besoins estudiantins', path: '/electronique/student-needs', icon: 'fas fa-user-graduate' },
    { name: 'Projets et mémoires', path: '/electronique/projects', icon: 'fas fa-project-diagram' },
    { name: 'Manuscrits et livres', path: '/electronique/manuscripts', icon: 'fas fa-book-open' },
    { name: 'Ressources pédagogiques', path: '/electronique/resources', icon: 'fas fa-cubes' },
  ];

  // Fonctions de rendu
  const renderLinks = (items) => {
    return items.map((item) => (
      <Link key={item.path} to={item.path} className="sidebar-link">
        <i className={item.icon}></i>
        {!isCollapsed && <span className="link-text">{item.name}</span>}
      </Link>
    ));
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h3>Navigation</h3>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      <div className="sidebar-content">
        {/* Catégorie M1 Télécommunications */}
        <div className="sidebar-category">
          <button 
            className={`category-header ${expandedCategory === 'telecom' ? 'active' : ''}`} 
            onClick={() => toggleCategory('telecom')}
          >
            <i className="fas fa-broadcast-tower"></i>
            {!isCollapsed && (
              <>
                <span className="category-title">Gestion du partie informatique </span>
                <i className={`fas ${expandedCategory === 'telecom' ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
              </>
            )}
          </button>
          
          {(!isCollapsed && expandedCategory === 'telecom') && (
            <div className="category-links">
              {renderLinks(telecomThemes)}
            </div>
          )}
        </div>

        {/* Catégorie M1 Électronique */}
        <div className="sidebar-category">
          <button 
            className={`category-header ${expandedCategory === 'electronique' ? 'active' : ''}`} 
            onClick={() => toggleCategory('electronique')}
          >
            <i className="fas fa-microchip"></i>
            {!isCollapsed && (
              <>
                <span className="category-title">Gestion des laboratoires</span>
                <i className={`fas ${expandedCategory === 'electronique' ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
              </>
            )}
          </button>
          
          {(!isCollapsed && expandedCategory === 'electronique') && (
            <div className="category-links">
              {renderLinks(electroniqueThemes)}
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="sidebar-info">
            <p>© 2025 ISSTM Université de Mahajanga</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
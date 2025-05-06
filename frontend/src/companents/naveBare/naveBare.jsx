// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './naveBare.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ telecom: false, electronique: false });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (section) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const telecomThemes = [
    { name: 'Gestion des utilisateurs', path: '/telecom/users' },
    { name: 'Gestion des répartitions et utilisations', path: '/telecom/schedules' },
    { name: 'Gestion des matériels informatiques', path: '/telecom/hardware' },
    { name: 'Gestion des travaux pratiques', path: '/telecom/practicals' },
    { name: 'Gestion des besoins estudiantins', path: '/telecom/student-needs' },
    { name: 'Gestion d’une bibliothèque numérique', path: '/telecom/digital-library' },
    { name: 'Gestion des manuscrits et livres', path: '/telecom/manuscripts' },
    { name: 'Gestion des ressources', path: '/telecom/resources' },
    { name: 'Gestion des réseaux informatiques', path: '/telecom/networks' },
  ];

  const electroniqueThemes = [
    { name: 'Gestion des plannings', path: '/electronique/plannings' },
    { name: 'Gestion des matériels', path: '/electronique/hardware' },
    { name: 'Gestion des cours', path: '/electronique/courses' },
    { name: 'Gestion des travaux pratiques', path: '/electronique/practicals' },
    { name: 'Gestion des besoins estudiantins', path: '/electronique/student-needs' },
    { name: 'Gestion des projets et mémoires', path: '/electronique/projects' },
    { name: 'Gestion des manuscrits et livres', path: '/electronique/manuscripts' },
    { name: 'Gestion des ressources pédagogiques', path: '/electronique/resources' },
  ];

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                ISSTM Scolarité
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Dropdown M1 Télécommunications et réseaux */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('telecom')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none"
              >
                M1 Télécommunications
              </button>
              {dropdownOpen.telecom && (
                <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white text-gray-800">
                  <div className="py-1">
                    {telecomThemes.map((theme) => (
                      <Link
                        key={theme.path}
                        to={theme.path}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setDropdownOpen({ telecom: false, electronique: false })}
                      >
                        {theme.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Menu hamburger pour mobile */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Menu mobile */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => toggleDropdown('telecom')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 w-full text-left"
            >
              M1 Télécommunications
            </button>
            {dropdownOpen.telecom && (
              <div className="pl-4">
                {telecomThemes.map((theme) => (
                  <Link
                    key={theme.path}
                    to={theme.path}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                    onClick={() => {
                      setIsOpen(false);
                      setDropdownOpen({ telecom: false, electronique: false });
                    }}
                  >
                    {theme.name}
                  </Link>
                ))}
              </div>
            )}
            <button
              onClick={() => toggleDropdown('electronique')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 w-full text-left"
            >
              M1 Électronique
            </button>
            {dropdownOpen.electronique && (
              <div className="pl-4">
                {electroniqueThemes.map((theme) => (
                  <Link
                    key={theme.path}
                    to={theme.path}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                    onClick={() => {
                      setIsOpen(false);
                      setDropdownOpen({ telecom: false, electronique: false });
                    }}
                  >
                    {theme.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
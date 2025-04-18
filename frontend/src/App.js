// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react';
import axios from 'axios';
import ThemeComponent from './getionDesUtilisateurs';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/welcome/message')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des messages', error);
            });
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav>
                        <Link to="/">Accueil</Link> | <Link to="/gestionDesUtilisateurs">Votre Thème</Link>
                    </nav>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    <h1>ProgramationOrienteObjetApplication</h1>
                                    {messages.length > 0 ? (
                                        messages.map(msg => (
                                            <p key={msg.id}>{msg.message}</p>
                                        ))
                                    ) : (
                                        <p>Chargement...</p>
                                    )}
                                </div>
                            }
                        />
                        <Route path="/gestionDesUtilisateurs" element={<ThemeComponent />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
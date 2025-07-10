// src/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import './styles/global.css'; // Asegúrate de que esta importación sea correcta

function App() {
    return (
        <>
            <Sidebar />
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
                    <Dashboard />
                </main>
            </div>
        </>
    );
}

export default App;
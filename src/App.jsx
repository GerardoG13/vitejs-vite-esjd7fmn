// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';

// Importa todas las nuevas páginas
import DatosPrincipalesPage from './pages/DatosPrincipales/DatosPrincipalesPage';
import HistorialMedicoPage from './pages/HistorialMedico/HistorialMedicoPage';
import LaboratoriosPage from './pages/Laboratorios/LaboratoriosPage';
import ConsultasPage from './pages/Consultas/ConsultasPage';
import CitasPage from './pages/Citas/CitasPage';
import MenoresEdadPage from './pages/MenoresEdad/MenoresEdadPage';
import PerfilPage from './pages/Perfil/PerfilPage';
import OpcionesPage from './pages/Opciones/OpcionesPage';

import './styles/global.css';

function App() {
    // IMPORTANTE: El ID del paciente debe venir de un contexto global o autenticación
    // Por ahora, lo mantenemos aquí para que las páginas puedan cargar datos.
    const currentPacienteId = 1; // ¡Asegúrate que este ID exista en tu tabla de Pacientes!

    // useNavigate se usa para navegar programáticamente (ej. después de un logout)
    // Para la SidebarItem, usaremos el componente <Link> directamente.

    // Función para manejar "Cerrar Sección"
    const handleLogout = () => {
        alert('Cerrando sesión...');
        // Aquí iría la lógica para limpiar tokens/sesiones y redirigir al login
        // navigate('/login'); // Si tuvieras una página de login
    };

    return (
        <Router> {/* Envuelve toda la aplicación con BrowserRouter */}
            <Sidebar handleLogout={handleLogout} /> {/* Pasa la función de logout al Sidebar */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
                    <Routes> {/* Define tus rutas aquí */}
                        <Route path="/" element={<Dashboard pacienteId={currentPacienteId} />} /> {/* Ruta por defecto */}
                        <Route path="/dashboard" element={<Dashboard pacienteId={currentPacienteId} />} />
                        <Route path="/datos-principales" element={<DatosPrincipalesPage pacienteId={currentPacienteId} />} />
                        <Route path="/historial-medico" element={<HistorialMedicoPage pacienteId={currentPacienteId} />} />
                        <Route path="/laboratorios" element={<LaboratoriosPage pacienteId={currentPacienteId} />} />
                        <Route path="/consultas" element={<ConsultasPage pacienteId={currentPacienteId} />} />
                        <Route path="/citas" element={<CitasPage pacienteId={currentPacienteId} />} />
                        <Route path="/menores-edad" element={<MenoresEdadPage pacienteId={currentPacienteId} />} />
                        <Route path="/perfil" element={<PerfilPage pacienteId={currentPacienteId} />} />
                        <Route path="/opciones" element={<OpcionesPage pacienteId={currentPacienteId} />} />
                        {/* Puedes añadir una ruta de 404 Not Found si lo deseas */}
                        {/* <Route path="*" element={<div>404 - Página no encontrada</div>} /> */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
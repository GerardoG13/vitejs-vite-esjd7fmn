// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import DatosPrincipalesPage from './pages/DatosPrincipales/DatosPrincipalesPage';
import HistorialMedicoPage from './pages/HistorialMedico/HistorialMedicoPage';
import LaboratoriosPage from './pages/Laboratorios/LaboratoriosPage';
import ConsultasPage from './pages/Consultas/ConsultasPage';
import CitasPage from './pages/Citas/CitasPage';
import MenoresEdadPage from './pages/MenoresEdad/MenoresEdadPage';
import PerfilPage from './pages/Perfil/PerfilPage';
import OpcionesPage from './pages/Opciones/OpcionesPage';

import LayoutPrivado from './layouts/LayoutPrivado';
import './styles/global.css';

function App() {
  const currentPacienteId = 1;

  const handleLogout = () => {
    alert('Cerrando sesión...');
  };

  return (
    <Routes>
      {/* Login sin layout */}
      <Route path="/login" element={<Login />} />

      {/* Redirección por defecto al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas protegidas con layout */}
      <Route element={<LayoutPrivado handleLogout={handleLogout} />}>
        <Route path="/dashboard" element={<Dashboard pacienteId={currentPacienteId} />} />
        <Route path="/datos-principales" element={<DatosPrincipalesPage pacienteId={currentPacienteId} />} />
        <Route path="/historial-medico" element={<HistorialMedicoPage pacienteId={currentPacienteId} />} />
        <Route path="/laboratorios" element={<LaboratoriosPage pacienteId={currentPacienteId} />} />
        <Route path="/consultas" element={<ConsultasPage pacienteId={currentPacienteId} />} />
        <Route path="/citas" element={<CitasPage pacienteId={currentPacienteId} />} />
        <Route path="/menores-edad" element={<MenoresEdadPage pacienteId={currentPacienteId} />} />
        <Route path="/perfil" element={<PerfilPage pacienteId={currentPacienteId} />} />
        <Route path="/opciones" element={<OpcionesPage pacienteId={currentPacienteId} />} />
      </Route>
    </Routes>
  );
}

export default App;

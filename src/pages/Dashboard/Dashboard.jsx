// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import styles from './Dashboard.module.css';

// Importa todos los componentes de tarjeta
import DatosPersonalesCard from '../../components/Cards/DatosPersonalesCard';
import LabResultsCard from '../../components/Cards/LabResultsCard';
import ConsultasMedicasCard from '../../components/Cards/ConsultasMedicasCard';
import HistorialMedicoCard from '../../components/Cards/HistorialMedicoCard';
import ProximaCitaCard from '../../components/Cards/ProximaCitaCard';
import OtrasCitasCard from '../../components/Cards/OtrasCitasCard';

// El componente Dashboard ahora recibe 'pacienteId' como una prop.
// Este 'pacienteId' viene de la ruta en App.jsx.
function Dashboard({ pacienteId }) {
    // Ya NO necesitamos 'const currentPacienteId = 1;' aquí,
    // porque 'pacienteId' ya nos llega como prop desde App.jsx.
    // Esto hace que el ID del paciente sea más gestionable a nivel de aplicación.

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.pageTitle}>Inicio</h1>
            <p className={styles.welcomeText}>Bienvenido "Usuario", Tu Información Medica:</p>

            <div className={styles.cardGrid}>
                {/* Pasa el 'pacienteId' a TODAS las tarjetas que lo necesitan
                    para cargar datos específicos de ese paciente. */}
                <DatosPersonalesCard pacienteId={pacienteId} />
                <LabResultsCard pacienteId={pacienteId} />
                <ConsultasMedicasCard pacienteId={pacienteId} />
                <HistorialMedicoCard pacienteId={pacienteId} />
                <ProximaCitaCard pacienteId={pacienteId} />
                <OtrasCitasCard pacienteId={pacienteId} />
            </div>
        </div>
    );
}

export default Dashboard;
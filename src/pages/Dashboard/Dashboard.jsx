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

function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.pageTitle}>Inicio</h1>
            <p className={styles.welcomeText}>Bienvenido "Usuario", Tu Información Medica:</p>

            <div className={styles.cardGrid}>
                <DatosPersonalesCard />
                <LabResultsCard />
                <ConsultasMedicasCard />
                <HistorialMedicoCard />
                <ProximaCitaCard />
                <OtrasCitasCard />
            </div>
        </div>
    );
}

export default Dashboard;
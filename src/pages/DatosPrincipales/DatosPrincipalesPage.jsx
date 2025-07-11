// src/pages/DatosPrincipales/DatosPrincipalesPage.jsx
import React, { useEffect, useState } from 'react';
import { getPacienteById } from '../../services/api';
import styles from './DatosPrincipalesPage.module.css'; 

function DatosPrincipalesPage({ pacienteId }) {
    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaciente = async () => {
            if (!pacienteId) {
                setLoading(false);
                setError(new Error("ID de paciente no proporcionado."));
                return;
            }
            try {
                const response = await getPacienteById(pacienteId);
                setPaciente(response.data);
            } catch (err) {
                console.error("Error al obtener datos principales:", err);
                setError(new Error(`Error al cargar datos: ${err.message}. `));
            } finally {
                setLoading(false);
            }
        };
        fetchPaciente();
    }, [pacienteId]);

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Datos Principales </h1>
                <p>Cargando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Datos Principales </h1>
                <p style={{ color: 'red' }}>Error: {error.message}</p>
            </div>
        );
    }

    if (!paciente) {
        return (
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Datos Principales</h1>
                <p>No se encontraron datos para este paciente.</p>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Datos Principales de {paciente.nombre || ''} {paciente.apellidoPaterno || ''}</h1>
            <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                    <strong>Nombre Completo:</strong> {paciente.nombre || 'N/A'} {paciente.apellidoPaterno || ''} {paciente.apellidoMaterno || ''}
                </div>
                <div className={styles.detailItem}>
                    <strong>CURP/ID:</strong> {paciente.curp || paciente.id || 'N/A'}
                </div>
                <div className={styles.detailItem}>
                    <strong>Fecha de Nacimiento:</strong> {new Date(paciente.fechaNacimiento).toLocaleDateString('es-ES') || 'N/A'}
                </div>
                <div className={styles.detailItem}>
                    <strong>Género:</strong> {paciente.genero || 'N/A'}
                </div>
                <div className={styles.detailItem}>
                    <strong>Teléfono:</strong> {paciente.telefono || 'N/A'}
                </div>
                <div className={styles.detailItem}>
                    <strong>Correo Electrónico:</strong> {paciente.correo || 'N/A'}
                </div>
                <div className={styles.detailItem}>
                    <strong>Dirección:</strong> {paciente.direccion || 'N/A'}
                </div>
            </div>
        </div>
    );
}

export default DatosPrincipalesPage;
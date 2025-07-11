// src/components/Cards/LabResultsCard.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { FaVial } from 'react-icons/fa';
import { getResultadosLaboratorio } from '../../services/api';

function LabResultsCard({ pacienteId }) {
    const [lastResult, setLastResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLabResults = async () => {
            if (!pacienteId) {
                setLoading(false);
                setError(new Error("ID de paciente no proporcionado."));
                return;
            }
            try {
                const response = await getResultadosLaboratorio(); 
                const allResults = response.data;

                const patientResults = allResults
                    .filter(res => res.idPaciente === pacienteId) 
                    .sort((a, b) => new Date(b.fechaEmision) - new Date(a.fechaEmision));

                setLastResult(patientResults.length > 0 ? patientResults[0] : null);
            } catch (err) {
                console.error("Error al obtener resultados de laboratorio:", err);
                setError(new Error(`Error al cargar resultados: ${err.message}`));
            } finally {
                setLoading(false);
            }
        };

        fetchLabResults();
    }, [pacienteId]);

    if (loading) {
        return <Card title="Resultados de laboratorio">Cargando resultados de laboratorio...</Card>;
    }

    if (error) {
        return <Card title="Resultados de laboratorio">Error: {error.message}</Card>;
    }

    if (!lastResult) {
        return <Card title="Resultados de laboratorio">No hay resultados de laboratorio recientes para este paciente.</Card>;
    }

    // Ajusta las propiedades 'tipo', 'fechaEmision', 'urlPdf' según tu API
    return (
        <Card
            title="Resultados de laboratorio"
            subtitle={`Emitido: ${new Date(lastResult.fechaEmision).toLocaleDateString('es-ES')}`}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <FaVial style={{ fontSize: '1.5em', color: 'var(--text-secondary)' }} />
                <div>
                    <p style={{ margin: '0 0 8px 0' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Nombre del estudio: </span>
                        <span style={{ fontWeight: 'bold' }}>{lastResult.tipo || 'N/A'}</span>
                    </p>
                    <p style={{ margin: '0 0 8px 0' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Fecha de emisión: </span>
                        <span style={{ fontWeight: 'bold' }}>{new Date(lastResult.fechaEmision).toLocaleDateString('es-ES') || 'N/A'}</span>
                    </p>
                    <p style={{ margin: '0' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Archivo: </span>
                        {lastResult.urlPdf ? (
                            <a href={lastResult.urlPdf} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 'bold' }}>
                                Ver PDF
                            </a>
                        ) : (
                            <span style={{ color: 'var(--text-secondary)' }}>No disponible</span>
                        )}
                    </p>
                </div>
            </div>
        </Card>
    );
}

export default LabResultsCard;
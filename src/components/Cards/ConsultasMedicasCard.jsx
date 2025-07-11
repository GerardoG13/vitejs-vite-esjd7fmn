// src/components/Cards/ConsultasMedicasCard.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getConsultas, getPersonalSalud } from '../../services/api';

function ConsultasMedicasCard({ pacienteId }) {
    const [consultas, setConsultas] = useState([]);
    const [personalSaludMap, setPersonalSaludMap] = useState({}); // Mapa de ID de personal a su nombre
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!pacienteId) {
                setLoading(false);
                setError(new Error("ID de paciente no proporcionado."));
                return;
            }
            try {
                // Obtener todas las consultas y el personal de salud en paralelo
                const [consultasRes, personalSaludRes] = await Promise.all([
                    getConsultas(),
                    getPersonalSalud()
                ]);

                // Crear un mapa de IDs de personal de salud a sus nombres
                const personalMap = personalSaludRes.data.reduce((acc, p) => {
                    acc[p.id] = p.nombre || p.nombreCompleto || 'Desconocido'; // Ajusta según la prop del nombre en tu API
                    return acc;
                }, {});
                setPersonalSaludMap(personalMap);

                // Filtrar las consultas por pacienteId y tomar las 4 más recientes
                const patientConsultas = consultasRes.data
                    .filter(c => c.idPaciente === pacienteId) // Ajusta 'idPaciente'
                    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordena por fecha descendente
                    .slice(0, 4); // Tomar solo las 4 más recientes

                setConsultas(patientConsultas);
            } catch (err) {
                console.error("Error al obtener consultas o personal de salud:", err);
                setError(new Error(`Error al cargar consultas: ${err.message}`));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pacienteId]);

    if (loading) {
        return <Card title="Consultas Medicas">Cargando consultas...</Card>;
    }

    if (error) {
        return <Card title="Consultas Medicas">Error: {error.message}</Card>;
    }

    if (consultas.length === 0) {
        return <Card title="Consultas Medicas">No hay consultas recientes para este paciente.</Card>;
    }

    return (
        <Card
            title="Consultas Medicas"
            actionText="Ver Todo"
            onActionClick={() => alert('Ver todas las consultas')}
        >
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr auto', gap: '10px 15px', fontSize: '0.9em' }}>
                {consultas.map((c, index) => (
                    <React.Fragment key={c.id || index}>
                        <span style={{ color: 'var(--text-secondary)' }}>{new Date(c.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>
                        <span style={{ fontWeight: '500' }}>{c.diagnostico || 'N/A'}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{personalSaludMap[c.idPersonalSalud] || 'Desconocido'}</span>
                        {/* Define colores basados en un campo de estado de tu API, o usa el diagnóstico */}
                        <span style={{ color: c.estado === 'Reposo' ? 'var(--accent-green)' : 'var(--text-secondary)', fontWeight: '600' }}>
                            {c.estado || 'N/A'}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </Card>
    );
}

export default ConsultasMedicasCard;
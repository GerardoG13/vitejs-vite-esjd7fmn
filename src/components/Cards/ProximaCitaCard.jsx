// src/components/Cards/ProximaCitaCard.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getConsultas, getPersonalSalud, getInstituciones } from '../../services/api'; // Necesitamos info de Instituciones y PersonalSalud

function ProximaCitaCard({ pacienteId }) {
    const [nextAppointment, setNextAppointment] = useState(null);
    const [personalSaludMap, setPersonalSaludMap] = useState({});
    const [institucionMap, setInstitucionMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNextAppointment = async () => {
            if (!pacienteId) {
                setLoading(false);
                setError(new Error("ID de paciente no proporcionado."));
                return;
            }
            try {
                const [consultasRes, personalSaludRes, institucionRes] = await Promise.all([
                    getConsultas(),
                    getPersonalSalud(),
                    getInstituciones()
                ]);

                const personalMap = personalSaludRes.data.reduce((acc, p) => {
                    acc[p.id] = p.nombre || p.nombreCompleto || 'Desconocido';
                    return acc;
                }, {});
                setPersonalSaludMap(personalMap);

                const instMap = institucionRes.data.reduce((acc, i) => {
                    acc[i.id] = i.nombre || i.nombreCompleto || 'Desconocido';
                    return acc;
                }, {});
                setInstitucionMap(instMap);

                const now = new Date();
                const upcomingConsultas = consultasRes.data
                    .filter(c => c.idPaciente === pacienteId && new Date(c.fecha) >= now) // Futuras citas
                    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Ordenar de más cercana a más lejana

                setNextAppointment(upcomingConsultas.length > 0 ? upcomingConsultas[0] : null);

            } catch (err) {
                console.error("Error al obtener próxima cita:", err);
                setError(new Error(`Error al cargar próxima cita: ${err.message}`));
            } finally {
                setLoading(false);
            }
        };

        fetchNextAppointment();
    }, [pacienteId]);

    if (loading) {
        return <Card title="Próxima Cita Medica">Cargando próxima cita...</Card>;
    }

    if (error) {
        return <Card title="Próxima Cita Medica">Error: {error.message}</Card>;
    }

    if (!nextAppointment) {
        return <Card title="Próxima Cita Medica">No hay próxima cita programada.</Card>;
    }

    const appointmentDate = new Date(nextAppointment.fecha);
    const doctorName = personalSaludMap[nextAppointment.idPersonalSalud] || 'Doctor Desconocido';
    const institucionName = institucionMap[nextAppointment.idInstitucion] || 'Centro Desconocido';

    return (
        <Card title="Próxima Cita Medica">
            <p style={{ margin: '0 0 15px 0' }}>
                <span style={{ fontWeight: '600' }}>{appointmentDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })}, {appointmentDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                {' - '}
                <span style={{ color: 'var(--text-secondary)' }}>{doctorName} ({nextAppointment.especialidad || 'Especialidad N/A'})</span> {/* Ajusta especialidad */}
            </p>
            <p style={{ margin: '0 0 20px 0', fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                Centro Medico: <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{institucionName}</span>
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => alert(`Ver detalles de cita ${nextAppointment.id}`)}>Ver Detalles</button>
                <button
                    style={{ backgroundColor: 'transparent', border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)' }}
                    onClick={() => alert(`Reprogramar cita ${nextAppointment.id}`)}
                >
                    Reprogramar
                </button>
            </div>
        </Card>
    );
}

export default ProximaCitaCard;
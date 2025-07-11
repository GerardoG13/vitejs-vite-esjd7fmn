// src/components/Cards/OtrasCitasCard.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getConsultas, getPersonalSalud } from '../../services/api';

function OtrasCitasCard({ pacienteId }) {
    const [otherAppointments, setOtherAppointments] = useState([]);
    const [personalSaludMap, setPersonalSaludMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOtherAppointments = async () => {
            if (!pacienteId) {
                setLoading(false);
                setError(new Error("ID de paciente no proporcionado."));
                return;
            }
            try {
                const [consultasRes, personalSaludRes] = await Promise.all([
                    getConsultas(),
                    getPersonalSalud()
                ]);

                const personalMap = personalSaludRes.data.reduce((acc, p) => {
                    acc[p.id] = p.nombre || p.nombreCompleto || 'Desconocido';
                    return acc;
                }, {});
                setPersonalSaludMap(personalMap);

                const now = new Date();
                const allUpcoming = consultasRes.data
                    .filter(c => c.idPaciente === pacienteId && new Date(c.fecha) >= now)
                    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));


                setOtherAppointments(allUpcoming.slice(1, 3)); // Muestra las siguientes 2 citas

            } catch (err) {
                console.error("Error al obtener otras citas:", err);
                setError(new Error(`Error al cargar otras citas: ${err.message}`));
            } finally {
                setLoading(false);
            }
        };

        fetchOtherAppointments();
    }, [pacienteId]);

    if (loading) {
        return <Card title="Otras Próximas Citas">Cargando otras citas...</Card>;
    }

    if (error) {
        return <Card title="Otras Próximas Citas">Error: {error.message}</Card>;
    }

    if (otherAppointments.length === 0) {
        return <Card title="Otras Próximas Citas">No hay otras citas programadas.</Card>;
    }

    return (
        <Card title="Otras Próximas Citas">
            {otherAppointments.map((appointment, index) => {
                const appointmentDate = new Date(appointment.fecha);
                const doctorName = personalSaludMap[appointment.idPersonalSalud] || 'Doctor Desconocido';
                return (
                    <p key={appointment.id || index} style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>
                        {appointmentDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })}, {appointmentDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {doctorName}
                    </p>
                );
            })}
            <button style={{ width: '100%', marginTop: '15px' }} onClick={() => alert('Ver calendario completo de citas')}>Ver Calendario Completo</button>
        </Card>
    );
}

export default OtrasCitasCard;
// src/components/Cards/ProximaCitaCard.jsx
import React from 'react';
import Card from './Card';

function ProximaCitaCard() {
    const appointment = {
        date: '03 de julio',
        time: '10:00 AM',
        doctor: 'Dr. Linares (Cardiólogo)',
        medicalCenter: 'IMSS',
    };

    return (
        <Card title="Próxima Cita Medica">
            <p style={{ margin: '0 0 15px 0' }}>
                <span style={{ fontWeight: '600' }}>{appointment.date}, {appointment.time}</span>
                {' - '}
                <span style={{ color: 'var(--text-secondary)' }}>{appointment.doctor}</span>
            </p>
            <p style={{ margin: '0 0 20px 0', fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                Centro Medico: <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{appointment.medicalCenter}</span>
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button>Ver Detalles</button>
                <button style={{ backgroundColor: 'transparent', border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)' }}>Reprogramar</button>
            </div>
        </Card>
    );
}

export default ProximaCitaCard;
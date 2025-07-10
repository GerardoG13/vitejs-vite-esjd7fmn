// src/components/Cards/ConsultasMedicasCard.jsx
import React from 'react';
import Card from './Card';

function ConsultasMedicasCard() {
    const consultations = [
        { date: '20 Jul', type: 'Gripe', doctor: 'Dr. Warner', status: 'Reposo', statusColor: 'var(--accent-green)' },
        { date: '04 Jul', type: 'Calentura', doctor: 'Dr. Ana', status: 'Ibuprofeno', statusColor: 'var(--accent-orange)' },
        { date: '30 Jun', type: 'Malaria', doctor: 'Dr. Juan', status: 'Terapia/ACT', statusColor: 'var(--accent-blue)' },
        { date: '26 Jun', type: 'Hemorroides', doctor: 'Dr. Jorge', status: 'Dieta', statusColor: 'var(--text-secondary)' },
    ];

    return (
        <Card
            title="Consultas Medicas"
            actionText="Ver Todo"
            onActionClick={() => alert('Ver todas las consultas')}
        >
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr auto', gap: '10px 15px', fontSize: '0.9em' }}>
                {consultations.map((c, index) => (
                    <React.Fragment key={index}>
                        <span style={{ color: 'var(--text-secondary)' }}>{c.date}</span>
                        <span style={{ fontWeight: '500' }}>{c.type}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{c.doctor}</span>
                        <span style={{ color: c.statusColor, fontWeight: '600' }}>{c.status}</span>
                    </React.Fragment>
                ))}
            </div>
        </Card>
    );
}

export default ConsultasMedicasCard;
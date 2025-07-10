// src/components/Cards/OtrasCitasCard.jsx
import React from 'react';
import Card from './Card';

function OtrasCitasCard() {
    const otherAppointments = [
        '10 de Julio, 1:00 PM - Dra. Carla Mendoza',
        '23 de Julio, 3:00 PM - Dr. Carlos Sanchez',
    ];

    return (
        <Card title="Otras Próximas Citas">
            {otherAppointments.map((appointment, index) => (
                <p key={index} style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>
                    {appointment}
                </p>
            ))}
            <button style={{ width: '100%', marginTop: '15px' }}>Ver Calendario Completo</button>
        </Card>
    );
}

export default OtrasCitasCard;
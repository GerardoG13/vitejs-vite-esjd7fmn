// src/components/Cards/DatosPersonalesCard.jsx
import React from 'react';
import Card from './Card';
import { FaUserCircle } from 'react-icons/fa';

function DatosPersonalesCard() {
    const personalData = {
        fullName: 'John Doe',
        idCurp: 'JD1234567890ABC',
        phoneEmail: '55 1234 5678 / john.doe@example.com',
    };

    return (
        <Card
            title="Datos Personales"
            subtitle="From 1-14 Mar, 2024"
            actionText="Editar datos"
            onActionClick={() => alert('Editar datos personales')}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <FaUserCircle style={{ fontSize: '4em', color: 'var(--text-secondary)' }} />
                <div>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9em', color: 'var(--text-secondary)' }}>Nombre completo:</p>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{personalData.fullName}</p>

                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9em', color: 'var(--text-secondary)' }}>ID/CURP del Paciente:</p>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{personalData.idCurp}</p>

                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9em', color: 'var(--text-secondary)' }}>Teléfono y Correo:</p>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>{personalData.phoneEmail}</p>
                </div>
            </div>
        </Card>
    );
}

export default DatosPersonalesCard;
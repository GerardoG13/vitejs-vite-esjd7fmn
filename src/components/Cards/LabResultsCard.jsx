// src/components/Cards/LabResultsCard.jsx
import React from 'react';
import Card from './Card';
import { FaVial } from 'react-icons/fa';

function LabResultsCard() {
    const labResult = {
        studyName: 'Glucosa de sangre.',
        issueDate: '20/07/2025',
        fileUrl: '#', // En una aplicación real, sería una URL a un PDF
    };

    return (
        <Card
            title="Resultados de laboratorio"
            subtitle="From 1-14 Mar, 2024"
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <FaVial style={{ fontSize: '1.5em', color: 'var(--text-secondary)' }} />
                <div>
                    <p style={{ margin: '0 0 8px 0' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Nombre del estudio: </span>
                        <span style={{ fontWeight: 'bold' }}>{labResult.studyName}</span>
                    </p>
                    <p style={{ margin: '0 0 8px 0' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Fecha de emisión: </span>
                        <span style={{ fontWeight: 'bold' }}>{labResult.issueDate}</span>
                    </p>
                    <p style={{ margin: '0' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Archivo: </span>
                        <a href={labResult.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 'bold' }}>
                            Ver PDF
                        </a>
                    </p>
                </div>
            </div>
        </Card>
    );
}

export default LabResultsCard;
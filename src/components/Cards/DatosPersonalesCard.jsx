// src/components/Cards/DatosPersonalesCard.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { FaUserCircle } from 'react-icons/fa';
import { getPacienteById } from '../../services/api';

function DatosPersonalesCard({ pacienteId }) {
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
                const response = await getPacienteById(pacienteId); // axios devuelve la respuesta completa
                setPaciente(response.data); // Los datos están en response.data
            } catch (err) {
                console.error("Error al obtener datos personales:", err);
                setError(new Error(`Error al cargar datos: ${err.message}`));
            } finally {
                setLoading(false);
            }
        };

        fetchPaciente();
    }, [pacienteId]);

    if (loading) {
        return <Card title="Datos Personales">Cargando datos personales...</Card>;
    }

    if (error) {
        return <Card title="Datos Personales">Error: {error.message}</Card>;
    }

    if (!paciente) {
        return <Card title="Datos Personales">No se encontraron datos personales para el ID {pacienteId}.</Card>;
    }

    // Asegúrate de que las propiedades coincidan con la respuesta de tu API
    // Por ejemplo: si tu backend envía 'primerNombre' y 'apellido', adapta aquí.
    const fullName = `${paciente.nombre || ''} ${paciente.apellidoPaterno || ''} ${paciente.apellidoMaterno || ''}`.trim();
    const idCurp = paciente.curp || paciente.id || 'No disponible';
    const phoneEmail = `${paciente.telefono || 'N/A'} / ${paciente.correo || 'N/A'}`;

    return (
        <Card
            title="Datos Personales"
            subtitle="Desde la API"
            actionText="Editar datos"
            onActionClick={() => alert('Funcionalidad de editar datos')}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <FaUserCircle style={{ fontSize: '4em', color: 'var(--text-secondary)' }} />
                <div>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9em', color: 'var(--text-secondary)' }}>Nombre completo:</p>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{fullName}</p>

                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9em', color: 'var(--text-secondary)' }}>ID/CURP del Paciente:</p>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{idCurp}</p>

                    <p style={{ margin: '0 0 5px 0', fontSize: '0.9em', color: 'var(--text-secondary)' }}>Teléfono y Correo:</p>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>{phoneEmail}</p>
                </div>
            </div>
        </Card>
    );
}

export default DatosPersonalesCard;
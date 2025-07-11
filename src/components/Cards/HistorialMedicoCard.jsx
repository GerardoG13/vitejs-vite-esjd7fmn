// src/components/Cards/HistorialMedicoCard.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { FaStethoscope, FaFileAlt } from 'react-icons/fa'; // Iconos para consultas/documentos
import { getConsultas, getDocumentosClinicos, getPacienteById, getPersonalSalud } from '../../services/api';

function HistorialMedicoCard({ pacienteId }) {
    const [historialItems, setHistorialItems] = useState([]);
    const [personalSaludMap, setPersonalSaludMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistorial = async () => {
            if (!pacienteId) {
                setLoading(false);
                setError(new Error("ID de paciente no proporcionado."));
                return;
            }
            try {
                const [consultasRes, documentosRes, pacienteRes, personalSaludRes] = await Promise.all([
                    getConsultas(),
                    getDocumentosClinicos(),
                    getPacienteById(pacienteId),
                    getPersonalSalud()
                ]);

                const personalMap = personalSaludRes.data.reduce((acc, p) => {
                    acc[p.id] = p.nombre || p.nombreCompleto || 'Desconocido';
                    return acc;
                }, {});
                setPersonalSaludMap(personalMap);

                const pacienteActual = pacienteRes.data;
                const nombrePaciente = `${pacienteActual.nombre || ''} ${pacienteActual.apellidoPaterno || ''}`.trim();

                // Filtrar y mapear consultas pasadas
                const pastConsultas = consultasRes.data
                    .filter(c => c.idPaciente === pacienteId && new Date(c.fecha) < new Date()) // Solo consultas pasadas
                    .map(c => ({
                        type: 'consulta',
                        id: c.id,
                        name: nombrePaciente,
                        date: new Date(c.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
                        medicOrCategory: personalMap[c.idPersonalSalud] || 'Desconocido',
                        diagnosisOrAmount: c.diagnostico || 'N/A',
                        icon: FaStethoscope,
                    }));

                // Filtrar y mapear documentos clínicos 
                const patientDocuments = documentosRes.data
                    .filter(doc => doc.idPaciente === pacienteId) // Ajusta 'idPaciente'
                    .map(doc => ({
                        type: 'documento',
                        id: doc.id,
                        name: nombrePaciente,
                        date: new Date(doc.fechaCreacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }), // Ajusta la prop de fecha
                        medicOrCategory: doc.tipoDocumento || 'Documento', 
                        diagnosisOrAmount: doc.descripcion || 'Ver documento', 
                        icon: FaFileAlt,
                    }));

                // Unir y ordenar por fecha descendente
                const combinedHistorial = [...pastConsultas, ...patientDocuments]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 6); // Mostrar solo los 6 más recientes para el dashboard

                setHistorialItems(combinedHistorial);

            } catch (err) {
                console.error("Error al obtener historial médico:", err);
                setError(new Error(`Error al cargar historial: ${err.message}`));
            } finally {
                setLoading(false);
            }
        };

        fetchHistorial();
    }, [pacienteId]);

    if (loading) {
        return <Card title="Historial Médico">Cargando historial...</Card>;
    }

    if (error) {
        return <Card title="Historial Médico">Error: {error.message}</Card>;
    }

    if (historialItems.length === 0) {
        return <Card title="Historial Médico">No hay historial médico para este paciente.</Card>;
    }

    return (
        <Card
            title="Historial Médico"
            subtitle="Desde la API"
            actionText="Ver Todo El Historial"
            onActionClick={() => alert('Ver todo el historial')}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '25px 1.5fr 0.8fr 1fr auto', gap: '10px 15px', alignItems: 'center', fontSize: '0.9em' }}>
                <span style={{ color: 'var(--text-secondary)' }}></span> {/* Espacio para el icono */}
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Nombre del Paciente</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Fecha</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Medico/Tipo</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Diagnóstico/Descripción</span>

                {historialItems.map((item) => (
                    <React.Fragment key={item.id}>
                        {item.icon && <item.icon style={{ color: 'var(--accent-purple)', fontSize: '1.2em' }} />}
                        <span style={{ fontWeight: '500' }}>{item.name}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.date}</span>
                        <span style={{ color: 'var(--text-primary)' }}>{item.medicOrCategory}</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'right' }}>
                            {item.diagnosisOrAmount}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </Card>
    );
}

export default HistorialMedicoCard;
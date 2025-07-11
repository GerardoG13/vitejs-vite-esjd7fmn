// src/pages/HistorialMedico/HistorialMedicoPage.jsx
import React, { useEffect, useState } from 'react';
import { getConsultas, getDocumentosClinicos, getPacienteById, getPersonalSalud, getMedicamentos, getPrescripciones } from '../../services/api'; // Necesitas más APIs
import styles from './HistorialMedicoPage.module.css'; // Crea este archivo también
import { FaStethoscope, FaFileAlt, FaPrescriptionBottleAlt, FaPills } from 'react-icons/fa'; // Más iconos

function HistorialMedicoPage({ pacienteId }) {
    const [historialCompleto, setHistorialCompleto] = useState([]);
    const [personalSaludMap, setPersonalSaludMap] = useState({});
    const [pacienteNombre, setPacienteNombre] = useState('Paciente');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistorialCompleto = async () => {
            if (!pacienteId) {
                setLoading(false);
                setError(new Error("ID de paciente no proporcionado."));
                return;
            }
            try {
                // Obtener todos los datos relevantes en paralelo
                const [consultasRes, documentosRes, pacienteRes, personalSaludRes, medicamentosRes, prescripcionesRes] = await Promise.all([
                    getConsultas(),
                    getDocumentosClinicos(),
                    getPacienteById(pacienteId),
                    getPersonalSalud(),
                    getMedicamentos(),
                    getPrescripciones()
                ]);

                // Mapear datos auxiliares
                const personalMap = personalSaludRes.data.reduce((acc, p) => { acc[p.id] = p.nombre || p.nombreCompleto || 'Desconocido'; return acc; }, {});
                setPersonalSaludMap(personalMap);
                setPacienteNombre(`${pacienteRes.data.nombre || ''} ${pacienteRes.data.apellidoPaterno || ''}`);

                let combinedItems = [];

                // Mapear Consultas
                const consultasMapeadas = consultasRes.data
                    .filter(c => c.idPaciente === pacienteId)
                    .map(c => ({
                        type: 'Consulta',
                        id: c.id,
                        date: new Date(c.fecha),
                        description: c.diagnostico || 'Consulta médica',
                        details: `Doctor: ${personalMap[c.idPersonalSalud] || 'N/A'}, Estado: ${c.estado || 'N/A'}`,
                        icon: FaStethoscope,
                        color: 'var(--accent-blue)'
                    }));
                combinedItems.push(...consultasMapeadas);

                // Mapear Documentos Clínicos
                const documentosMapeados = documentosRes.data
                    .filter(doc => doc.idPaciente === pacienteId)
                    .map(doc => ({
                        type: 'Documento Clínico',
                        id: doc.id,
                        date: new Date(doc.fechaCreacion),
                        description: doc.tipoDocumento || 'Documento',
                        details: doc.descripcion || 'N/A',
                        icon: FaFileAlt,
                        color: 'var(--accent-green)'
                    }));
                combinedItems.push(...documentosMapeados);

                // Mapear Prescripciones (y sus medicamentos si aplica)
                const medicamentosMap = medicamentosRes.data.reduce((acc, med) => { acc[med.id] = med.nombre || 'Desconocido'; return acc; }, {});

                const prescripcionesMapeadas = prescripcionesRes.data
                    .filter(presc => presc.idPaciente === pacienteId)
                    .map(presc => ({
                        type: 'Prescripción',
                        id: presc.id,
                        date: new Date(presc.fechaEmision), // Ajusta la prop de fecha
                        description: `Med: ${medicamentosMap[presc.idMedicamento] || 'N/A'}`, // Ajusta la prop de medicamento
                        details: `Dosis: ${presc.dosis || 'N/A'}, Frecuencia: ${presc.frecuencia || 'N/A'}`,
                        icon: FaPrescriptionBottleAlt,
                        color: 'var(--accent-purple)'
                    }));
                combinedItems.push(...prescripcionesMapeadas);

                // Ordenar todos los ítems por fecha descendente
                combinedItems.sort((a, b) => b.date - a.date);
                setHistorialCompleto(combinedItems);

            } catch (err) {
                console.error("Error al obtener historial completo:", err);
                setError(new Error(`Error al cargar historial: ${err.message}. `));
            } finally {
                setLoading(false);
            }
        };

        fetchHistorialCompleto();
    }, [pacienteId]);

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Historial Médico</h1>
                <p>Cargando historial completo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Historial Médico</h1>
                <p style={{ color: 'red' }}>Error: {error.message}</p>
            </div>
        );
    }

    if (historialCompleto.length === 0) {
        return (
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Historial Médico</h1>
                <p>No se encontraron entradas en el historial para {pacienteNombre}.</p>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Historial Médico de {pacienteNombre}</h1>
            <div className={styles.historialList}>
                {historialCompleto.map((item) => (
                    <div key={item.id} className={styles.historialItem}>
                        <div className={styles.iconContainer} style={{ backgroundColor: item.color }}>
                            {item.icon && <item.icon />}
                        </div>
                        <div className={styles.itemContent}>
                            <div className={styles.itemHeader}>
                                <span className={styles.itemType}>{item.type}</span>
                                <span className={styles.itemDate}>{item.date.toLocaleDateString('es-ES')}</span>
                            </div>
                            <p className={styles.itemDescription}>{item.description}</p>
                            <p className={styles.itemDetails}>{item.details}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HistorialMedicoPage;
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = '172.31.43.50';

// Crea una instancia de Axios con la URL base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Indica que enviamos y esperamos JSON
  },

});

// --- Métodos para AccesoExpediente ---
export const getAccesos = () => api.get('/accesos');
export const getAccesoById = (id) => api.get(`/accesos/${id}`);
export const createAcceso = (data) => api.post('/accesos', data);
export const updateAcceso = (id, data) => api.put(`/accesos/${id}`, data);
export const deleteAcceso = (id) => api.delete(`/accesos/${id}`);

// --- Métodos para Paciente (muy relevante para el dashboard) ---
export const getPacientes = () => api.get('/pacientes');
export const getPacienteById = (id) => api.get(`/pacientes/${id}`);
export const createPaciente = (data) => api.post('/pacientes', data); // Válida duplicados por CURP
export const updatePaciente = (id, data) => api.put(`/pacientes/${id}`, data);
export const deletePaciente = (id) => api.delete(`/pacientes/${id}`);

// --- Métodos para Consulta (relevante para el dashboard) ---
export const getConsultas = () => api.get('/consultas');
export const getConsultaById = (id) => api.get(`/consultas/${id}`);
export const createConsulta = (data) => api.post('/consultas', data);
export const updateConsulta = (id, data) => api.put(`/consultas/${id}`, data);
export const deleteConsulta = (id) => api.delete(`/consultas/${id}`);

// --- Métodos para ResultadoLaboratorio 
export const getResultadosLaboratorio = () => api.get('/resultados-laboratorio');
export const getResultadoLaboratorioById = (id) => api.get(`/resultados-laboratorio/${id}`);
export const createResultadoLaboratorio = (data) => api.post('/resultados-laboratorio', data);
export const updateResultadoLaboratorio = (id, data) => api.put(`/resultados-laboratorio/${id}`, data);
export const deleteResultadoLaboratorio = (id) => api.delete(`/resultados-laboratorio/${id}`);

// --- Métodos para Notificacion 
export const getNotificaciones = () => api.get('/notificaciones');
export const getNotificacionById = (id) => api.get(`/notificaciones/${id}`);
export const createNotificacion = (data) => api.post('/notificaciones', data);
export const updateNotificacion = (id, data) => api.put(`/notificaciones/${id}`, data);
export const deleteNotificacion = (id) => api.delete(`/notificaciones/${id}`);


// --- Otros métodos relevantes que podrías necesitar ---
export const getDocumentosClinicos = () => api.get('/documentos'); // DocumentoClinico
export const getPrescripciones = () => api.get('/prescripciones'); // Prescripcion
export const getMedicamentos = () => api.get('/medicamentos'); // Medicamento
export const getPersonalSalud = () => api.get('/personal-salud'); // PersonalSalud

export const getInstituciones = () => api.get('/instituciones'); 
export const getInstitucionById = (id) => api.get(`/instituciones/${id}`); 
export const createInstitucion = (data) => api.post('/instituciones', data);
export const updateInstitucion = (id, data) => api.put(`/instituciones/${id}`, data);
export const deleteInstitucion = (id) => api.delete(`/instituciones/${id}`);



// Puedes exportar la instancia de axios si la necesitas directamente en algún lugar
export default api;
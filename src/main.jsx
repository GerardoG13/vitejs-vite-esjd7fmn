// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css'; // Importa tus estilos globales

// Selecciona el elemento 'root' del HTML donde se montará la app
const rootElement = document.getElementById('root');

// Crea una raíz de React y renderiza tu componente App
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

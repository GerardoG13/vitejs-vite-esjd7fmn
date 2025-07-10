// src/components/Cards/HistorialMedicoCard.jsx
import React from 'react';
import Card from './Card';
import { FaUser, FaCoffee, FaMoneyBillAlt, FaShoppingBag, FaTruck } from 'react-icons/fa'; // Iconos representativos

function HistorialMedicoCard() {
    const historyItems = [
        { name: 'John Doe', date: 'Mar 14', medicOrCategory: 'Income', diagnosisOrAmount: '+2,320.00', icon: FaUser },
        { name: 'Moccups Coffee', date: 'Mar 12', medicOrCategory: 'Food', diagnosisOrAmount: '-5.50', icon: FaCoffee },
        { name: 'Maria Jose', date: 'Mar 10', medicOrCategory: 'Finance', diagnosisOrAmount: '+3,400.00', icon: FaMoneyBillAlt },
        { name: 'Jesus Jose', date: 'Mar 09', medicOrCategory: 'Shopping', diagnosisOrAmount: '-19.90', icon: FaShoppingBag },
        { name: 'Tom Harrison', date: 'Mar 08', medicOrCategory: 'Transport', diagnosisOrAmount: '-2.50', icon: FaTruck },
        { name: 'Juan Alberto', date: 'Mar 07', medicOrCategory: 'Food', diagnosisOrAmount: '-24.99', icon: FaCoffee },
    ];

    return (
        <Card
            title="Historial Médico"
            subtitle="From 1-14 Mar, 2024"
            actionText="Ver Todo El Historial"
            onActionClick={() => alert('Ver todo el historial')}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '25px 1.5fr 0.8fr 1fr auto', gap: '10px 15px', alignItems: 'center', fontSize: '0.9em' }}>
                <span style={{ color: 'var(--text-secondary)' }}></span> {/* Espacio para el icono */}
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Nombre del Paciente</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Fecha</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Medico</span> {/* O Categoría */}
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'right' }}>Diagnostico</span> {/* O Monto */}

                {historyItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.icon && <item.icon style={{ color: 'var(--accent-purple)', fontSize: '1.2em' }} />}
                        <span style={{ fontWeight: '500' }}>{item.name}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.date}</span>
                        <span style={{ color: 'var(--text-primary)' }}>{item.medicOrCategory}</span>
                        <span style={{ color: item.diagnosisOrAmount.startsWith('+') ? 'var(--accent-green)' : 'var(--text-primary)', fontWeight: '600', textAlign: 'right' }}>
                            {item.diagnosisOrAmount}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </Card>
    );
}

export default HistorialMedicoCard;
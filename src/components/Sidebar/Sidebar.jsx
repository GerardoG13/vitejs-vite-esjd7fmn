// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation
import styles from './Sidebar.module.css';
import SidebarItem from './SidebarItem';

import {
    FaHome, FaUser, FaHistory, FaVial, FaStethoscope,
    FaCalendarAlt, FaChild, FaCog, FaSignOutAlt, FaCreditCard
} from 'react-icons/fa';

// Recibe la función de logout como prop
function Sidebar({ handleLogout }) {
    const location = useLocation(); // Hook para obtener la URL actual

    const navItems = [
        { text: 'Dashboard', icon: FaHome, to: '/dashboard' },
        { text: 'Datos principales', icon: FaUser, to: '/datos-principales' },
        { text: 'Historial Med.', icon: FaHistory, to: '/historial-medico' },
        { text: 'Laboratorios', icon: FaVial, to: '/laboratorios' },
        { text: 'Consultas', icon: FaStethoscope, to: '/consultas' },
        { text: 'Citas', icon: FaCalendarAlt, to: '/citas' },
        { text: 'Menores Edad', icon: FaChild, to: '/menores-edad' },
    ];

    const accountItems = [
        { text: 'Perfil', icon: FaUser, to: '/perfil' },
        { text: 'Opciones', icon: FaCog, to: '/opciones' },
        { text: 'Cerrar Seccion', icon: FaSignOutAlt, onClick: handleLogout }, // Este tiene un onClick, no una ruta
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <FaCreditCard className={styles.logoIcon} />
                <span>Placeholder</span>
            </div>

            <nav className={styles.navigation}>
                {navItems.map((item) => (
                    // Usamos Link si tiene una propiedad 'to'
                    item.to ? (
                        <Link to={item.to} key={item.text} className={styles.linkWrapper}>
                            <SidebarItem
                                icon={item.icon}
                                text={item.text}
                                isActive={location.pathname === item.to || (item.to === '/dashboard' && location.pathname === '/')} // Resalta '/' si dashboard
                            />
                        </Link>
                    ) : (
                        // Para items sin ruta (ej. Cerrar Sección), usa el SidebarItem normal con onClick
                        <SidebarItem
                            key={item.text}
                            icon={item.icon}
                            text={item.text}
                            onClick={item.onClick}
                            isActive={false} // No estará activo por ruta
                        />
                    )
                ))}
            </nav>

            <div className={styles.divider}></div>

            <SidebarItem text="DETALLES DE CUENTA" isSectionTitle />
            <nav className={styles.accountNavigation}>
                {accountItems.map((item) => (
                    item.to ? (
                        <Link to={item.to} key={item.text} className={styles.linkWrapper}>
                            <SidebarItem
                                icon={item.icon}
                                text={item.text}
                                isActive={location.pathname === item.to}
                            />
                        </Link>
                    ) : (
                        <SidebarItem
                            key={item.text}
                            icon={item.icon}
                            text={item.text}
                            onClick={item.onClick}
                            isActive={false}
                        />
                    )
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
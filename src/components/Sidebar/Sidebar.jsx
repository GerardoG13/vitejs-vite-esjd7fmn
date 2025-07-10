// src/components/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import SidebarItem from './SidebarItem';

// Importa los íconos de react-icons
import {
  FaHome,
  FaUser,
  FaHistory,
  FaVial,
  FaStethoscope,
  FaCalendarAlt,
  FaChild,
  FaCog,
  FaSignOutAlt,
  FaCreditCard,
} from 'react-icons/fa';

function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard'); // Estado para el item activo

  const navItems = [
    { text: 'Dashboard', icon: FaHome },
    { text: 'Datos principales', icon: FaUser },
    { text: 'Historial Med.', icon: FaHistory },
    { text: 'Laboratorios', icon: FaVial },
    { text: 'Consultas', icon: FaStethoscope },
    { text: 'Citas', icon: FaCalendarAlt },
    { text: 'Menores Edad', icon: FaChild },
  ];

  const accountItems = [
    { text: 'Perfil', icon: FaUser },
    { text: 'Opciones', icon: FaCog },
    { text: 'Cerrar Seccion', icon: FaSignOutAlt },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FaCreditCard className={styles.logoIcon} />
        <span>Dashboard</span>
      </div>

      <nav className={styles.navigation}>
        {navItems.map((item) => (
          <SidebarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            isActive={activeItem === item.text}
            onClick={() => setActiveItem(item.text)}
          />
        ))}
      </nav>

      <div className={styles.divider}></div>

      <SidebarItem text="DETALLES DE CUENTA" isSectionTitle />
      <nav className={styles.accountNavigation}>
        {accountItems.map((item) => (
          <SidebarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            isActive={activeItem === item.text}
            onClick={() => setActiveItem(item.text)}
          />
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;

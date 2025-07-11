// src/components/Sidebar/SidebarItem.jsx
import React from 'react';
import styles from './SidebarItem.module.css';

// Ya no necesita el prop 'onClick' si va a ser envuelto por <Link>
// Solo se lo pasaremos si no hay 'to' (ej: Cerrar Sesión)
function SidebarItem({ icon: Icon, text, isActive, isSectionTitle, onClick }) {
    if (isSectionTitle) {
        return <div className={styles.sectionTitle}>{text}</div>;
    }

    return (
        <div
            className={`${styles.sidebarItem} ${isActive ? styles.active : ''}`}
            onClick={onClick} // Solo se activará si se pasa un onClick
        >
            {Icon && <Icon className={styles.icon} />}
            <span className={styles.text}>{text}</span>
        </div>
    );
}

export default SidebarItem;
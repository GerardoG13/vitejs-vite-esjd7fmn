// src/components/Sidebar/SidebarItem.jsx
import React from 'react';
import styles from './SidebarItem.module.css';

function SidebarItem({ icon: Icon, text, isActive, isSectionTitle, onClick }) {
    if (isSectionTitle) {
        return <div className={styles.sectionTitle}>{text}</div>;
    }

    return (
        <div
            className={`${styles.sidebarItem} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            {Icon && <Icon className={styles.icon} />}
            <span className={styles.text}>{text}</span>
        </div>
    );
}

export default SidebarItem;
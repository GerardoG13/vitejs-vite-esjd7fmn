// src/components/Header/Header.jsx
import React from 'react';
import styles from './Header.module.css';
import { FaBell, FaCommentDots, FaUserCircle, FaCalendarAlt } from 'react-icons/fa'; // Asegúrate de importar FaCalendarAlt aquí también

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.datePicker}>
                <span>Mostrar Fecha:</span>
                <input
                    type="text"
                    value="26 Jun, 2025 - 30 Jul, 2025"
                    readOnly
                    className={styles.dateInput}
                />
                <button className={styles.calendarButton}>
                    <FaCalendarAlt />
                </button>
            </div>
            <div className={styles.userSection}>
                <FaUserCircle className={styles.userAvatar} />
                <span className={styles.userName}>Robert Simmons</span>
                <FaBell className={styles.icon} />
                <FaCommentDots className={styles.icon} />
            </div>
        </header>
    );
}

export default Header;
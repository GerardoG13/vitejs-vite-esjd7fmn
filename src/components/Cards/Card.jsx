// src/components/Cards/Card.jsx
import React from 'react';
import styles from './Card.module.css';

function Card({ title, subtitle, actionText, onActionClick, children }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                {actionText && (
                    <button className="text-button" onClick={onActionClick}>
                        {actionText}
                    </button>
                )}
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default Card;
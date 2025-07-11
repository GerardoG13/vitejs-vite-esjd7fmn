// src/layouts/LayoutPrivado.jsx
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

export default function LayoutPrivado({ handleLogout }) {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar handleLogout={handleLogout} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header />

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

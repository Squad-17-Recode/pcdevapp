import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/AdminDashboardP.css';

function AdminDashboardP() {
  return (
    <div className="admin-dashboard-layout">
      <aside className="admin-sidebar">
        <h3 className="admin-sidebar-title">Painel Admin</h3>
        <nav className="admin-nav">
          <NavLink to="/admin/vagas">Gerenciar Oportunidades</NavLink>
          <NavLink to="/admin/cursos">Gerenciar Cursos</NavLink>
          <NavLink to="/admin/usuarios">Gerenciar Usuários</NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboardP;

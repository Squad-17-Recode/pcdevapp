import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './styles/App.css';

// Layout & Rotas
import Navbar from './components/navbar';
import Footer from './components/footer';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas Públicas
import HomeP from './pages/HomeP';
import LoginP from './pages/LoginP';
import CultureP from './pages/CultureP';
import CapacitacoesP from './pages/CapacitacoesP';
import OportunidadesP from './pages/OportunidadesP';
import BemEstarP from './pages/BemEstarP';
import SobreP from './pages/SobreP';

// Páginas Protegidas
import AccountSettingsP from './pages/AccountSettingsP';

// Páginas de Admin
import AdminDashboardP from './pages/AdminDashboardP';
import ManageJobsP from './pages/ManageJobsP';
import ManageUsersP from "./pages/ManageUsersP";
import ManageCoursesP from "./pages/ManageCoursesP";

import NotFoundP from './pages/NotFoundP';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* ★ ☆ ★ Rotas Públicas ★ ☆ ★ */}
            <Route path="/" element={<HomeP />} />
            <Route path="/login" element={<LoginP />} />
            <Route path="/inclusao" element={<InclusaoP />} />
            <Route path="/sobre" element={<SobreP />} />
            <Route path="/acessibilidade" element={<AcessibilidadeP />} />

            {/* ★ ☆ ★ Rotas Protegidas (Apenas para usuários logados) ★ ☆ ★ */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cursos" element={<CursosP />} />
              <Route path="/empregos" element={<EmpregosP />} />
              <Route path="/configuracao" element={<ConfiguracaoContaP />} />
            </Route>

            {/* ★ ☆ ★ Rotas de Admin (Apenas para usuários com role 'admin') ★ ☆ ★ */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminDashboardP />}>
                <Route index element={<Navigate to="vagas" replace />} />
                <Route path="vagas" element={<ManageJobsP />} />
                <Route path="usuarios" element={<ManageUsersP />} />
                <Route path="cursos" element={<ManageCoursesP />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFoundP />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

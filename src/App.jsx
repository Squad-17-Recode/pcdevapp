import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./styles/App.css";

import Footer from "./components/footer/footer";
import HighContrastToggle from "./components/high-contrast-toggle/HighContrastToggle";
// Layout & Rotas
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
// Páginas Protegidas
import AccountSettingsP from "./pages/AccountSettings/AccountSettingsP";
import AcessibilidadeP from "./pages/Acessibilidade/AcessibilidadeP";
// Páginas de Admin
import AdminDashboardP from "./pages/AdminDashboard/AdminDashboardP";
// Páginas Públicas
import HomeP from "./pages/HomeP";
import LoginP from "./pages/Login/LoginP";
import ManageCoursesP from "./pages/ManageCoursesP";
import ManageJobsP from "./pages/ManageJobsP";
import ManageUsersP from "./pages/ManageUsersP";

import NotFoundP from "./pages/NotFound/NotFoundP";

function App() {
	return (
		<Router>
			<div className="App">
				<HighContrastToggle />
				<Navbar />
				<main>
					<Routes>
						{/* ★ ☆ ★ Rotas Públicas ★ ☆ ★ */}
						<Route path="/" element={<HomeP />} />
						<Route path="/login" element={<LoginP />} />
						<Route path="/acessibilidade" element={<AcessibilidadeP />} />

						{/* ★ ☆ ★ Rotas Protegidas (Apenas para usuários logados) ★ ☆ ★ */}
						<Route element={<ProtectedRoute />}>
							<Route path="/settings" element={<AccountSettingsP />} />
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

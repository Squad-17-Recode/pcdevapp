import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/App.css";

import Footer from "./components/footer/footer";
import HighContrastToggle from "./components/high-contrast-toggle/HighContrastToggle";
// Layout & Rotas
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
// Páginas Protegidas
import AccountSettingsP from "./pages/AccountSettings/AccountSettingsP";
import AcessibilidadeP from "./pages/Acessibilidade/AcessibilidadeP";
import EmpregosP from "./pages/Empregos/EmpregosP";
import EmpresaP from "./pages/Empresa/EmpresaP";
// Páginas Públicas
import HomeP from "./pages/Home/HomeP";
import LoginP from "./pages/Login/LoginP";

import NotFoundP from "./pages/NotFound/NotFoundP";

function App() {
	return (
		<Router>
			<div className="App">
				<HighContrastToggle />
				<Navbar />
				<main>
					<Routes>
						{" "}
						{/* ★ ☆ ★ Rotas Públicas ★ ☆ ★ */}
						<Route path="/" element={<HomeP />} />
						<Route path="/login" element={<LoginP />} />
						<Route path="/empresa" element={<EmpresaP />} />
						<Route path="/vagas-pcd" element={<EmpregosP />} />
						<Route path="/acessibilidade" element={<AcessibilidadeP />} />
						{/* ★ ☆ ★ Rotas Protegidas (Apenas para usuários logados) ★ ☆ ★ */}
						<Route element={<ProtectedRoute />}>
							<Route path="/settings" element={<AccountSettingsP />} />
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

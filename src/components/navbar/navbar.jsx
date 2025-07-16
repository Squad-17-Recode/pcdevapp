import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";
import "./navbar.css";

function useOutsideAlerter(ref, onOutsideClick, isCollapsed) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (!isCollapsed && ref.current && !ref.current.contains(event.target)) {
				onOutsideClick();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, onOutsideClick, isCollapsed]);
}

function UserMenu({ user, onLogoutClick, isAdmin }) {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="user-menu-container" ref={menuRef}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Mouse interaction is sufficient for this dropdown menu */}
			<img
				src={user.profilePicture}
				alt="Foto de perfil"
				className="profile-picture"
				onClick={() => setIsOpen(!isOpen)}
			/>

			{isOpen && (
				<div className="dropdown-menu show">
					<span className="dropdown-item-text">Olá, {user.name}!</span>
					<div className="dropdown-divider"></div>

					{isAdmin && (
						<NavLink
							className="dropdown-item"
							to="/admin"
							onClick={() => setIsOpen(false)}
						>
							<i className="bi bi-shield-lock me-2"></i>Painel Admin
						</NavLink>
					)}

					<NavLink
						className="dropdown-item"
						to="/settings"
						onClick={() => setIsOpen(false)}
					>
						Minha Conta
					</NavLink>
					<div className="dropdown-divider"></div>
					<button
						type="button"
						className="dropdown-item"
						onClick={onLogoutClick}
					>
						Sair
					</button>
				</div>
			)}
		</div>
	);
}

function LogoutConfirmationModal({ isOpen, onClose, onConfirm, isClosing }) {
	if (!isOpen) return null;

	return (
		<div className={`logout-modal-backdrop ${isClosing ? "exiting" : ""}`}>
			<div className={`logout-modal-dialog ${isClosing ? "exiting" : ""}`}>
				<h5>Deseja Sair?</h5>
				<p>Tem certeza que deseja sair da sua conta no PCDev?</p>
				<div className="logout-modal-actions">
					<button type="button" onClick={onClose} className="btn btn-secondary">
						Cancelar
					</button>
					<button type="button" onClick={onConfirm} className="btn btn-danger">
						Sim, quero sair
					</button>
				</div>
			</div>
		</div>
	);
}

function Navbar() {
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);
	const [isClosing, setIsClosing] = useState(false);
	const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
	const [isModalClosing, setIsModalClosing] = useState(false);
	const { isAuthenticated, user, logout, isAdmin } = useAuth();
	const navigate = useNavigate();
	const collapseRef = useRef(null);

	const handleToggle = () => {
		isNavCollapsed ? setIsNavCollapsed(false) : closeMenu();
	};

	const closeMenu = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsNavCollapsed(true);
			setIsClosing(false);
		}, 400);
	};

	const handleCloseModal = () => {
		setIsModalClosing(true);
		setTimeout(() => {
			setIsLogoutConfirmOpen(false);
			setIsModalClosing(false);
		}, 300);
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
		setIsLogoutConfirmOpen(false);
	};

	useOutsideAlerter(collapseRef, closeMenu, isNavCollapsed);

	return (
		<>
			<LogoutConfirmationModal
				isOpen={isLogoutConfirmOpen}
				onClose={handleCloseModal}
				onConfirm={handleLogout}
				isClosing={isModalClosing}
			/>

			{!isNavCollapsed && (
				<button
					type="button"
					className={`mobile-menu-backdrop ${isClosing ? "exiting" : ""}`}
					onClick={closeMenu}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							closeMenu();
						}
					}}
					aria-label="Fechar menu"
				></button>
			)}

			<nav className="navbar navbar-expand-lg navbar-dark">
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/" onClick={closeMenu}>
						<img src={logo} alt="Logo PCDev" className="logo" />
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						onClick={handleToggle}
						aria-expanded={!isNavCollapsed}
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""} ${isClosing ? "exiting" : ""}`}
						id="navbarNav"
						ref={collapseRef}
					>
						<div className="mobile-menu-header">
							<span>Navegação</span>
							<button
								type="button"
								className="btn-close btn-close-white"
								onClick={closeMenu}
							></button>
						</div>
						<ul className="navbar-nav ms-auto align-items-center">
							<li className="nav-item">
								<NavLink className="nav-link" to="/empresa" onClick={closeMenu}>
									<i className="bi bi-buildings me-1"></i>Empresas
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className="nav-link"
									to="/acessibilidade"
									onClick={closeMenu}
								>
									<i className="bi bi-heart me-1"></i>Acessibilidade
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className="nav-link"
									to="/vagas-pcd"
									onClick={closeMenu}
								>
									<i className="bi bi-briefcase me-1"></i>Empregos
								</NavLink>
							</li>

							{isAuthenticated ? (
								<li className="nav-item ms-lg-2 mt-3 mt-lg-0">
									<UserMenu
										user={user}
										onLogoutClick={() => setIsLogoutConfirmOpen(true)}
										isAdmin={isAdmin}
									/>
								</li>
							) : (
								<li className="nav-item ms-lg-2 mt-3 mt-lg-0">
									<NavLink
										to="/login"
										className="btn btn-outline-light login-btn"
										onClick={closeMenu}
									>
										<i className="bi bi-person me-1"></i>Login / Cadastrar
									</NavLink>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;

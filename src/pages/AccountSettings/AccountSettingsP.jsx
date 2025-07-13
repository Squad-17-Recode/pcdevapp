import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../components/toast-notification/ToastNotification";
import { useAuth } from "../../context/AuthContext";
import "../../styles/AccountSettingsP.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isClosing }) {
	if (!isOpen) return null;

	return (
		<div className={`delete-modal-backdrop ${isClosing ? "exiting" : ""}`}>
			<div className={`delete-modal-dialog ${isClosing ? "exiting" : ""}`}>
				<h5>Excluir Conta</h5>
				<p>
					Esta ação é permanente e não pode ser desfeita. Todos os seus dados
					serão perdidos. Tem certeza?
				</p>
				<div className="delete-modal-actions">
					<button type="button" onClick={onClose} className="btn btn-secondary">
						Cancelar
					</button>
					<button type="button" onClick={onConfirm} className="btn btn-danger">
						Sim, Excluir
					</button>
				</div>
			</div>
		</div>
	);
}

function AccountSettingsP() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	// Campos comuns
	const [nickname, setNickname] = useState(user?.nickname || "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [notification, setNotification] = useState("");
	const [cpf, setCpf] = useState(user?.cpf || "");
	const [bio, setBio] = useState(user?.bio || "");
	const [tipoDeficiencia, setTipoDeficiencia] = useState(
		user?.tipoDeficiencia || "",
	);
	const [habilidades] = useState(user?.habilidades || []);
	const [cnpj, setCnpj] = useState(user?.cnpj || "");
	const [descricao, setDescricao] = useState(user?.descricao || "");
	const [rangeFuncionarios, setRangeFuncionarios] = useState(
		user?.rangeFuncionarios || "",
	);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isModalClosing, setIsModalClosing] = useState(false);

	if (!user) {
		return (
			<p className="text-center p-5">
				Você precisa estar logado para ver esta página.
			</p>
		);
	}

	const showNotification = (message) => {
		setNotification(message);
	};

	// Atualiza perfil conforme role
	const handleProfileUpdate = (e) => {
		e.preventDefault();
		// Aqui você pode enviar os dados específicos para o backend
		showNotification("Perfil atualizado com sucesso!");
	};

	const handleChangePassword = (e) => {
		e.preventDefault();
		const newErrors = {};
		if (newPassword.length < 6) {
			newErrors.password = "A nova senha deve ter no mínimo 6 caracteres.";
		}
		if (newPassword !== confirmPassword) {
			newErrors.passwordConfirm = "As senhas não coincidem.";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});
		showNotification("Senha alterada com sucesso!");
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
	};

	const handleDeleteAccount = () => {
		setIsModalClosing(true);
		setTimeout(() => {
			logout();
			navigate("/");
			alert("Conta excluída com sucesso. (simulação)");
		}, 300);
	};

	// Funções para controlar o modal
	const openDeleteModal = () => setIsDeleteModalOpen(true);
	const closeDeleteModal = () => {
		setIsModalClosing(true);
		setTimeout(() => {
			setIsDeleteModalOpen(false);
			setIsModalClosing(false);
		}, 300);
	};

	return (
		<div
			className={`account-settings-container container py-5${document.body.classList.contains("high-contrast") ? " high-contrast" : ""}`}
		>
			{notification && (
				<ToastNotification
					message={notification}
					onClose={() => setNotification("")}
				/>
			)}

			<DeleteConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirm={handleDeleteAccount}
				isClosing={isModalClosing}
			/>

			<h2 className="mb-5 text-center">Gerenciar Conta</h2>

			<div className="row">
				<div className="col-lg-8 mx-auto">
					{/* Card de Informações do Perfil */}
					<div className="card settings-card mb-4">
						<div className="card-header">
							<h5>Informações do Perfil</h5>
						</div>
						<div className="card-body">
							<form onSubmit={handleProfileUpdate}>
								<div className="d-flex align-items-center mb-4">
									<img
										src={user.fotoPerfil || user.profilePicture}
										alt="Perfil"
										className="settings-profile-pic"
									/>
									<div className="ms-3">
										<h5 className="card-title mb-1">
											{user.nome || user.name}
										</h5>
										<button
											type="button"
											className="btn btn-sm btn-outline-secondary"
										>
											Alterar foto
										</button>
									</div>
								</div>
								<div className="mb-3">
									<label htmlFor="nickname" className="form-label">
										Apelido (Nickname)
									</label>
									<input
										type="text"
										className="form-control"
										id="nickname"
										value={nickname}
										onChange={(e) => setNickname(e.target.value)}
										placeholder="Como você quer ser chamado?"
									/>
								</div>
								{/* Campos específicos por tipo de conta */}
								{user.role === "CANDIDATO" && (
									<>
										<div className="mb-3">
											<label htmlFor="cpf" className="form-label">
												CPF
											</label>
											<input
												type="text"
												className="form-control"
												id="cpf"
												value={cpf}
												onChange={(e) => setCpf(e.target.value)}
												maxLength={11}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="bio" className="form-label">
												Bio
											</label>
											<textarea
												className="form-control"
												id="bio"
												value={bio}
												onChange={(e) => setBio(e.target.value)}
												maxLength={250}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="tipoDeficiencia" className="form-label">
												Tipo de Deficiência
											</label>
											<input
												type="text"
												className="form-control"
												id="tipoDeficiencia"
												value={tipoDeficiencia}
												onChange={(e) => setTipoDeficiencia(e.target.value)}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="habilidades" className="form-label">
												Habilidades
											</label>
											<input
												type="text"
												className="form-control"
												id="habilidades"
												value={habilidades.join(", ")}
												readOnly
											/>
										</div>
									</>
								)}
								{user.role === "EMPRESA" && (
									<>
										<div className="mb-3">
											<label htmlFor="cnpj" className="form-label">
												CNPJ
											</label>
											<input
												type="text"
												className="form-control"
												id="cnpj"
												value={cnpj}
												onChange={(e) => setCnpj(e.target.value)}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="descricao" className="form-label">
												Descrição
											</label>
											<textarea
												className="form-control"
												id="descricao"
												value={descricao}
												onChange={(e) => setDescricao(e.target.value)}
												maxLength={250}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="rangeFuncionarios" className="form-label">
												Range de Funcionários
											</label>
											<input
												type="text"
												className="form-control"
												id="rangeFuncionarios"
												value={rangeFuncionarios}
												onChange={(e) => setRangeFuncionarios(e.target.value)}
											/>
										</div>
									</>
								)}
								<button type="submit" className="btn btn-primary">
									Salvar Alterações
								</button>
							</form>
						</div>
					</div>

					{/* Card para Mudar a Senha */}
					<div className="card settings-card mb-4">
						<div className="card-header">
							<h5>Alterar Senha</h5>
						</div>
						<div className="card-body">
							<form onSubmit={handleChangePassword}>
								<div className="mb-3">
									<label className="form-label" htmlFor="currentPassword">
										Senha Atual
									</label>
									<input
										type="password"
										id="currentPassword"
										className="form-control"
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
										required
									/>
								</div>
								<div className="mb-3">
									<label className="form-label" htmlFor="newPassword">
										Nova Senha
									</label>
									<input
										type="password"
										id="newPassword"
										className={`form-control ${errors.password ? "is-invalid" : ""}`}
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										required
									/>
									{errors.password && (
										<div className="invalid-feedback">{errors.password}</div>
									)}
								</div>
								<div className="mb-3">
									<label className="form-label" htmlFor="confirmPassword">
										Confirmar Nova Senha
									</label>
									<input
										type="password"
										id="confirmPassword"
										className={`form-control ${errors.passwordConfirm ? "is-invalid" : ""}`}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>
									{errors.passwordConfirm && (
										<div className="invalid-feedback">
											{errors.passwordConfirm}
										</div>
									)}
								</div>
								<button type="submit" className="btn btn-primary">
									Alterar Senha
								</button>
							</form>
						</div>
					</div>

					{/* Card de Zona de Perigo */}
					<div className="card settings-card border-danger">
						<div className="card-header bg-danger text-white">
							<h5>Zona de Perigo</h5>
						</div>
						<div className="card-body">
							<p>
								A exclusão da sua conta é uma ação permanente e não pode ser
								desfeita. Todos os seus dados serão removidos.
							</p>
							<button
								type="button"
								className="btn btn-danger"
								onClick={openDeleteModal}
							>
								Excluir Minha Conta
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountSettingsP;

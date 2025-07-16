import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../components/toast-notification/ToastNotification";
import { useAuth } from "../../context/AuthContext";
import "./LoginP.css";

function LoginP() {
	const [isSignUp, setIsSignUp] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loginUsername, setLoginUsername] = useState(""); // For login form

	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({});
	const [notification, setNotification] = useState({ message: "", type: "" });

	const togglePanel = () => {
		setIsSignUp(!isSignUp);
		setFormErrors({});
		// Clear form fields when switching panels
		setName("");
		setUsername("");
		setEmail("");
		setPhone("");
		setPassword("");
		setConfirmPassword("");
		setLoginUsername("");
	};

	const showNotification = (message, type = "success") => {
		setNotification({ message, type });
	};

	// Lógica de Validação para o Cadastro
	const validateSignUp = () => {
		const errors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;

		if (!name.trim()) errors.name = "O nome é obrigatório.";
		if (!username.trim()) {
			errors.username = "O nome de usuário é obrigatório.";
		} else if (username.length < 3) {
			errors.username = "O nome de usuário deve ter no mínimo 3 caracteres.";
		}
		if (!emailRegex.test(email)) errors.email = "Formato de e-mail inválido.";
		if (!phoneRegex.test(phone.replace(/\s/g, ''))) errors.phone = "Formato de telefone inválido. Use (xx) xxxxx-xxxx";
		if (password.length < 5)
			errors.password = "A senha deve ter no mínimo 5 caracteres.";
		if (password !== confirmPassword)
			errors.confirmPassword = "As senhas não coincidem.";

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setFormErrors({});

		if (!loginUsername || !password) {
			setFormErrors({ general: "Por favor, preencha o nome de usuário/email e a senha." });
			return;
		}

		setLoading(true);
		const result = await login(loginUsername, password);
		setLoading(false);

		if (result.success) {
			navigate("/");
		} else {
			setFormErrors({
				general: result.message || "Ocorreu um erro. Tente novamente.",
			});
		}
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (validateSignUp()) {
			setLoading(true);
			try {
				// Create the payload with required fields and mock data
				const candidatoData = {
					username: username, // Using actual username field
					email: email,
					senha: password,
					nome: name,
					cpf: "12345678900", // Mock CPF
					bio: "Novo candidato na plataforma PCDev", // Mock bio
					fotoPerfil: "https://www.ahnegao.com.br/wp-content/uploads/2019/04/olokinho.jpg.webp", // Optional field
					endereco: {
						cep: "01000000",
						rua: "Rua Exemplo",
						numero: "123",
						complemento: "",
						bairro: "Centro",
						cidade: "São Paulo",
						estado: "SP",
						pais: "Brasil"
					},
					tipoDeficiencia: "FISICA", // Mock tipo de deficiência
					contatos: [
						{
							numeroTelefone: phone
						}
					],
					habilidades: [
						{
							nome: "Programação",
							anosExperiencia: 1
						}
					]
				};

				console.log("Sending candidato data:", JSON.stringify(candidatoData, null, 2));

				// Add timeout to the fetch request
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

				const response = await fetch(
					"http://localhost:8080/api/candidatos",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json"
						},
						body: JSON.stringify(candidatoData),
						signal: controller.signal
					},
				);

				clearTimeout(timeoutId);

				console.log("Response status:", response.status);
				console.log("Response headers:", Object.fromEntries(response.headers.entries()));

				if (!response.ok) {
					const errorText = await response.text();
					console.error("Error response:", errorText);
					console.error("Response status:", response.status);
					console.error("Response statusText:", response.statusText);

					let errorData;
					try {
						errorData = JSON.parse(errorText);
						console.error("Parsed error data:", errorData);
					} catch {
						errorData = { message: errorText };
					}

					// More specific error handling
					if (response.status === 400) {
						throw new Error(`Dados inválidos: ${errorData.message || errorText}`);
					} else if (response.status === 409) {
						throw new Error("Email já cadastrado. Tente com outro email.");
					} else if (response.status === 500) {
						throw new Error(`Erro interno do servidor: ${errorData.message || errorText}`);
					} else {
						throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
					}
				}

				const responseData = await response.json();
				console.log("Success response:", responseData);

				showNotification("Conta criada com sucesso! Por favor, faça o login.");
				setIsSignUp(false);
				setName("");
				setUsername("");
				setEmail("");
				setPhone("");
				setPassword("");
				setConfirmPassword("");
			} catch (error) {
				console.error("Erro no cadastro:", error);
				if (error.name === 'AbortError') {
					setFormErrors({ general: "A solicitação expirou. Verifique sua conexão e tente novamente." });
				} else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
					setFormErrors({ general: "Erro de rede. Verifique sua conexão com a internet." });
				} else {
					setFormErrors({ general: error.message || "Erro de conexão. Tente novamente." });
				}
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div
			className={`login-app${document.body.classList.contains("high-contrast") ? " high-contrast" : ""}`}
		>
			{notification.message && (
				<ToastNotification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification({ message: "", type: "" })}
				/>
			)}

			<Link
				to="/"
				className="back-home-link"
				aria-label="Voltar para a página inicial"
			>
				<i className="bi bi-x-lg"></i>
			</Link>

			<div
				className={`login-container ${isSignUp ? "right-panel-active" : ""}`}
			>
				{/* Sign Up Form */}
				<div className="form-container sign-up-container">
					<form className="form" onSubmit={handleSignUp} noValidate>
						<h1 className="form-title">Criar Conta</h1>
						{formErrors.general && (
							<div className="invalid-feedback-form d-block mb-2">
								{formErrors.general}
							</div>
						)}

						<input
							className={`form-input ${formErrors.name ? "is-invalid" : ""}`}
							type="text"
							placeholder="Nome Completo"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						{formErrors.name && (
							<div className="invalid-feedback-form">{formErrors.name}</div>
						)}

						<input
							className={`form-input ${formErrors.username ? "is-invalid" : ""}`}
							type="text"
							placeholder="Nome de usuário"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						{formErrors.username && (
							<div className="invalid-feedback-form">{formErrors.username}</div>
						)}

						<input
							className={`form-input ${formErrors.email ? "is-invalid" : ""}`}
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{formErrors.email && (
							<div className="invalid-feedback-form">{formErrors.email}</div>
						)}

						<input
							className={`form-input ${formErrors.phone ? "is-invalid" : ""}`}
							type="tel"
							placeholder="Telefone (xx) xxxxx-xxxx"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
						{formErrors.phone && (
							<div className="invalid-feedback-form">{formErrors.phone}</div>
						)}

						<input
							className={`form-input ${formErrors.password ? "is-invalid" : ""}`}
							type="password"
							placeholder="Senha (mín. 6 caracteres)"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{formErrors.password && (
							<div className="invalid-feedback-form">{formErrors.password}</div>
						)}

						<input
							className={`form-input ${formErrors.confirmPassword ? "is-invalid" : ""}`}
							type="password"
							placeholder="Confirmar Senha"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{formErrors.confirmPassword && (
							<div className="invalid-feedback-form">
								{formErrors.confirmPassword}
							</div>
						)}
						<button
							type="button"
							className="form-link"
							style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
						>
							Sou empresa
						</button>
						<button
							className="form-button mt-3"
							type="submit"
							disabled={loading}
						>
							{loading && isSignUp ? (
								<span className="spinner-border spinner-border-sm"></span>
							) : (
								"Cadastrar"
							)}
						</button>
						<button
							type="button"
							className="mobile-toggle-panel"
							onClick={togglePanel}
						>
							Já tem uma conta? Entre
						</button>
					</form>
				</div>

				{/* Sign In Form */}
				<div className="form-container sign-in-container">
					<form className="form" onSubmit={handleLogin} noValidate>
						<h1 className="form-title">Entrar</h1>
						{formErrors.general && (
							<div className="invalid-feedback-form d-block mb-2">
								{formErrors.general}
							</div>
						)}
						<input
							className="form-input"
							type="text"
							placeholder="Nome de usuário ou Email"
							value={loginUsername}
							onChange={(e) => setLoginUsername(e.target.value)}
						/>
						<input
							className="form-input"
							type="password"
							placeholder="Senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="button"
							className="form-link"
							style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}
						>
							Sou empresa
						</button>
						<button className="form-button" type="submit" disabled={loading}>
							{loading && !isSignUp ? (
								<span className="spinner-border spinner-border-sm"></span>
							) : (
								"Entrar"
							)}
						</button>
						<button
							type="button"
							className="mobile-toggle-panel"
							onClick={togglePanel}
						>
							Não tem uma conta? Cadastre-se
						</button>
					</form>
				</div>

				{/* Overlay Container */}
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1 className="overlay-title">Que bom te ver de novo!</h1>
							<p className="overlay-text">
								Para continuar com a gente, acesse sua conta com seus dados de
								login.
							</p>
							<button
								type="button"
								className="overlay-button"
								onClick={togglePanel}
							>
								Entrar
							</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1 className="overlay-title">Olá, Amigo!</h1>
							<p className="overlay-text">
								Crie sua conta e venha fazer parte de uma comunidade acessível,
								diversa e acolhedora.
							</p>
							<button
								type="button"
								className="overlay-button"
								onClick={togglePanel}
							>
								Cadastrar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginP;

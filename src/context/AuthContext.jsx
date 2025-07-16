import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [highContrast, setHighContrast] = useState(false);

	useEffect(() => {
		const savedToken = sessionStorage.getItem("authToken");
		if (savedToken) {
			try {
				const decodedToken = jwtDecode(savedToken);
				if (decodedToken.exp * 1000 > Date.now()) {
					setToken(savedToken);
					setUser({
						name: decodedToken.nome,
						role: decodedToken.role,
					});
				} else {
					sessionStorage.removeItem("authToken");
				}
			} catch (error) {
				console.error("Token inválido:", error);
				sessionStorage.removeItem("authToken");
			}
		}
		// Recupera preferência de alto contraste do localStorage
		const hc = localStorage.getItem("highContrast");
		if (hc === "true") setHighContrast(true);
	}, []);
	// Alterna o modo alto contraste e salva no localStorage
	const toggleHighContrast = () => {
		setHighContrast((prev) => {
			localStorage.setItem("highContrast", !prev);
			return !prev;
		});
	};

	// Modo mock: se MOCK_LOGIN=true, simula login sem backend
	const MOCK_LOGIN = false; // Altere para false para usar o backend

	const login = async (emailOrUsername, password) => {
		if (MOCK_LOGIN) {
			// Simula delay de requisição
			await new Promise((res) => setTimeout(res, 500));
			// Usuário e token mock
			const mockToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
				btoa(
					JSON.stringify({
						nome: "Usuário Mock",
						role: emailOrUsername === "admin@admin.com" ? "admin" : "user",
						exp: Math.floor(Date.now() / 1000) + 3600,
					}),
				) +
				".MOCKSIGNATURE";
			sessionStorage.setItem("authToken", mockToken);
			setUser({
				name: emailOrUsername === "admin@admin.com" ? "Admin" : "Usuário",
				role: emailOrUsername === "admin@admin.com" ? "admin" : "user",
				profilePicture: `https://placehold.co/40x40/${emailOrUsername === "admin@admin.com" ? "9a3412" : "c2410c"}/FFFFFF?text=${emailOrUsername.charAt(0)}`,
			});
			return { success: true };
		}
		// ...código original para login real...
		try {
			const response = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: emailOrUsername, // LoginRequestDTO expects username field - can be username or email
					senha: password   // LoginRequestDTO expects senha field
				}),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error("Login error response:", errorText);
				throw new Error("Nome de usuário/email ou senha inválidos.");
			}

			const data = await response.json();
			const { token: authToken } = data;

			if (!authToken) {
				throw new Error("Token não recebido do servidor.");
			}

			sessionStorage.setItem("authToken", authToken);
			setToken(authToken);

			const decodedToken = jwtDecode(authToken);
			setUser({
				name: decodedToken.nome || decodedToken.name || emailOrUsername,
				role: decodedToken.role || "CANDIDATO",
				profilePicture: `https://placehold.co/40x40/${decodedToken.role === "admin" ? "9a3412" : "c2410c"}/FFFFFF?text=${(decodedToken.nome || emailOrUsername).charAt(0)}`,
			});

			return { success: true };
		} catch (error) {
			console.error("Falha no login:", error);
			return { success: false, message: error.message };
		}
	};

	const logout = () => {
		sessionStorage.removeItem("authToken");
		setToken(null);
		setUser(null);
	};

	const value = {
		user,
		token,
		isAuthenticated: !!user,
		isAdmin: user?.role === "admin",
		login,
		logout,
		highContrast,
		toggleHighContrast,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

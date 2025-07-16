import { useCallback, useEffect, useState } from "react";
import CardEmpresa from "../../components/card-empresa/cardEmpresa";
import ToastNotification from "../../components/toast-notification/ToastNotification";
import "./EmpresaP.css";

function EmpresaP() {
	const [empresas, setEmpresas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState({ message: "", type: "" });
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [pageSize] = useState(10);

	const showNotification = useCallback((message, type = "success") => {
		setNotification({ message, type });
	}, []);

	const fetchEmpresas = useCallback(async (page = 1) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(
				`http://localhost:8080/api/empresas?page=${page}&size=${pageSize}`
			);

			if (!response.ok) {
				throw new Error(`Erro ao carregar empresas: ${response.status}`);
			}

			const data = await response.json();

			// Handle paginated response structure
			if (data.content) {
				setEmpresas(data.content);
				setTotalPages(data.totalPages);
				setTotalElements(data.totalElements);
				setCurrentPage(data.currentPage);
			} else {
				// Fallback for non-paginated response
				setEmpresas(data);
			}
		} catch (err) {
			console.error("Erro ao buscar empresas:", err);
			setError(err.message || "Erro ao carregar empresas");
			showNotification("Erro ao carregar empresas. Tente novamente.", "error");
		} finally {
			setLoading(false);
		}
	}, [pageSize, showNotification]);

	useEffect(() => {
		fetchEmpresas(1);
	}, [fetchEmpresas]);

	const handleEntrarContato = (empresa) => {
		// TODO: Open contact modal or navigate to contact page
		console.log("Entrar em contato com empresa:", empresa);
		showNotification(`Em breve: contato com ${empresa.nome}`, "info");
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
			setCurrentPage(newPage);
			fetchEmpresas(newPage);
			// Scroll to top when changing pages
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleRetry = () => {
		fetchEmpresas(currentPage);
	};

	return (
		<div
			className={`empresas-page${document.body.classList.contains("high-contrast") ? " high-contrast" : ""}`}
		>
			{notification.message && (
				<ToastNotification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification({ message: "", type: "" })}
				/>
			)}

			<div className="empresas-container">
				<div className="empresas-header">
					<h1 className="empresas-title">Empresas Parceiras</h1>
					<p className="empresas-subtitle">
						Descubra empresas comprometidas com a inclusão e diversidade
					</p>
				</div>

				{loading && (
					<div className="empresas-loading">
						<div className="spinner-border text-primary">
							<output className="visually-hidden">Carregando...</output>
						</div>
						<p>Carregando empresas...</p>
					</div>
				)}

				{error && (
					<div className="empresas-error">
						<div className="alert alert-danger" role="alert">
							<i className="bi bi-exclamation-triangle-fill me-2"></i>
							{error}
						</div>
						<button type="button" className="btn-retry" onClick={handleRetry}>
							Tentar Novamente
						</button>
					</div>
				)}

				{!loading && !error && empresas.length === 0 && (
					<div className="empresas-empty">
						<div className="empty-state">
							<i className="bi bi-building"></i>
							<h3>Nenhuma empresa encontrada</h3>
							<p>Não há empresas cadastradas no momento.</p>
						</div>
					</div>
				)}

				{!loading && !error && empresas.length > 0 && (
					<>
						<div className="empresas-info">
							<p className="results-info">
								Mostrando {empresas.length} de {totalElements} empresas
								{totalPages > 1 && ` - Página ${currentPage} de ${totalPages}`}
							</p>
						</div>

						<div className="empresas-grid">
							{empresas.map((empresa) => (							<CardEmpresa
								key={empresa.id || empresa.username}
								empresa={empresa}
								onEntrarContato={handleEntrarContato}
							/>
							))}
						</div>

						{totalPages > 1 && (
							<div className="pagination-container">
								<div className="pagination">
									<button
										type="button"
										className="pagination-btn"
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={currentPage <= 1}
										aria-label="Página anterior"
									>
										<i className="bi bi-chevron-left"></i>
									</button>

									{/* Page numbers */}
									{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
										let pageNum;
										if (totalPages <= 5) {
											pageNum = i + 1;
										} else if (currentPage <= 3) {
											pageNum = i + 1;
										} else if (currentPage >= totalPages - 2) {
											pageNum = totalPages - 4 + i;
										} else {
											pageNum = currentPage - 2 + i;
										}

										return (
											<button
												key={pageNum}
												type="button"
												className={`pagination-btn ${
													pageNum === currentPage ? "active" : ""
												}`}
												onClick={() => handlePageChange(pageNum)}
												aria-label={`Página ${pageNum}`}
												aria-current={pageNum === currentPage ? "page" : undefined}
											>
												{pageNum}
											</button>
										);
									})}

									<button
										type="button"
										className="pagination-btn"
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={currentPage >= totalPages}
										aria-label="Próxima página"
									>
										<i className="bi bi-chevron-right"></i>
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default EmpresaP;

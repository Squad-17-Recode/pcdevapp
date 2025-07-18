import { useCallback, useEffect, useState } from "react";
import CardEmpregos from "../../components/card-vagas/cardEmpregos";
import ToastNotification from "../../components/toast-notification/ToastNotification";
import "./EmpregosP.css";

function EmpregosP() {
	const [vagas, setVagas] = useState([]);
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

	const fetchVagas = useCallback(async (page = 1) => {
		try {
			setLoading(true);
			setError(null);
		const response = await fetch(
			`http://localhost:8080/api/vagas?page=${page}&size=${pageSize}`
		);

		if (!response.ok) {
			if (response.status === 404) {
				// Handle 404 specifically - no jobs available
				setVagas([]);
				setTotalPages(0);
				setTotalElements(0);
				setCurrentPage(1);
				showNotification("Não há vagas no momento", "info");
				return;
			}
			throw new Error(`Erro ao carregar vagas: ${response.status}`);
		}

		const data = await response.json();

			// Handle paginated response structure
			if (data.content) {
				setVagas(data.content);
				setTotalPages(data.totalPages);
				setTotalElements(data.totalElements);
				setCurrentPage(data.currentPage);
			} else {
				// Fallback for non-paginated response
				setVagas(data);
			}
		} catch (err) {
			console.error("Erro ao buscar vagas:", err);
			setError(err.message || "Erro ao carregar vagas");
			showNotification("Erro ao carregar vagas. Tente novamente.", "error");
		} finally {
			setLoading(false);
		}
	}, [pageSize, showNotification]);

	useEffect(() => {
		fetchVagas(1);
	}, [fetchVagas]);

	const handleCandidatar = (vaga) => {
		// TODO: Open application modal or navigate to application page
		console.log("Candidatar-se para vaga:", vaga);
		showNotification(`Em breve: candidatura para ${vaga.nomeCargo}`, "info");
	};

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
			setCurrentPage(newPage);
			fetchVagas(newPage);
			// Scroll to top when changing pages
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleRetry = () => {
		fetchVagas(currentPage);
	};

	return (
		<div className={`empregos-page${document.body.classList.contains("high-contrast") ? " high-contrast" : ""}`}>
			{notification.message && (
				<ToastNotification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification({ message: "", type: "" })}
				/>
			)}

			<div className="empregos-container">
				<div className="empregos-header">
					<h1 className="empregos-title">Oportunidades de Emprego</h1>
					<p className="empregos-subtitle">
						Encontre vagas inclusivas e acessíveis para sua carreira
					</p>
				</div>

				{loading && (
					<div className="empregos-loading">
						<div className="spinner-border text-primary">
							<output className="visually-hidden">Carregando...</output>
						</div>
						<p>Carregando vagas...</p>
					</div>
				)}

				{error && (
					<div className="empregos-error">
						<div className="alert alert-danger" role="alert">
							<i className="bi bi-exclamation-triangle-fill me-2"></i>
							{error}
						</div>
						<button type="button" className="btn-retry" onClick={handleRetry}>
							Tentar Novamente
						</button>
					</div>
				)}

				{!loading && !error && vagas.length === 0 && (
					<div className="empregos-empty">
						<div className="empty-state">
							<i className="bi bi-briefcase"></i>
							<h3>Sem vagas disponíveis no momento</h3>
							<p>Novas oportunidades serão publicadas em breve.</p>
						</div>
					</div>
				)}

				{!loading && !error && vagas.length > 0 && (
					<>
						<div className="empregos-info">
							<p className="results-info">
								Mostrando {vagas.length} de {totalElements} vagas
								{totalPages > 1 && ` - Página ${currentPage} de ${totalPages}`}
							</p>
						</div>

						<div className="empregos-grid">
							{vagas.map((vaga) => (
								<CardEmpregos
									key={vaga.id}
									vaga={vaga}
									onCandidatar={handleCandidatar}
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

export default EmpregosP;

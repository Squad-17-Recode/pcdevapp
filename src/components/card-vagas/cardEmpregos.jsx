import "./cardEmpregos.css";

function CardEmpregos({ vaga, onCandidatar }) {
	return (
		<div className="card-emprego">
			<div className="card-emprego-header">
				<div className="card-emprego-info">
					<h3 className="card-emprego-titulo">{vaga.nomeCargo}</h3>
					<p className="card-emprego-empresa">{vaga.empresa?.nome || "Empresa não informada"}</p>
					<p className="card-emprego-descricao">
						{vaga.descricao || "Descrição não disponível"}
					</p>
				</div>
			</div>

			{vaga.tags && vaga.tags.length > 0 && (
				<div className="card-emprego-tags">
					{vaga.tags.map((tag) => (
						<span key={`${vaga.id}-${tag}`} className="tag">
							{tag}
						</span>
					))}
				</div>
			)}

			<div className="card-emprego-details">
				{vaga.salario && (
					<div className="card-emprego-salario">
						<i className="bi bi-currency-dollar"></i>
						<span>R$ {vaga.salario.toLocaleString('pt-BR')}</span>
					</div>
				)}
				{vaga.tipoContrato && (
					<div className="card-emprego-contrato">
						<i className="bi bi-briefcase"></i>
						<span>{vaga.tipoContrato}</span>
					</div>
				)}
				{vaga.localizacao && (
					<div className="card-emprego-localizacao">
						<i className="bi bi-geo-alt"></i>
						<span>{vaga.localizacao}</span>
					</div>
				)}
			</div>

			<div className="card-emprego-actions">
				<button
					type="button"
					className="btn-candidatar"
					onClick={() => onCandidatar(vaga)}
					aria-label={`Candidatar-se para ${vaga.nomeCargo}`}
				>
					Candidatar-se
				</button>
			</div>
		</div>
	);
}

export default CardEmpregos;

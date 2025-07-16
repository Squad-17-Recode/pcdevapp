import "./cardEmpresa.css";

function CardEmpresa({ empresa, onEntrarContato }) {
	return (
		<div className="card-empresa">
			<div className="card-empresa-header">
				<img
					src={empresa.fotoPerfil || "https://placehold.co/80x80/e5e7eb/374151?text=E"}
					alt={`Logo da ${empresa.nome}`}
					className="card-empresa-logo"
					onError={(e) => {
						e.target.src = "https://placehold.co/80x80/e5e7eb/374151?text=E";
					}}
				/>
				<div className="card-empresa-info">
					<h3 className="card-empresa-nome">{empresa.nome}</h3>
					<p className="card-empresa-description">
						{empresa.description || "Descrição não disponível"}
					</p>
				</div>
			</div>
			<div className="card-empresa-actions">
				<button
					type="button"
					className="btn-ver-vagas"
					onClick={() => onEntrarContato(empresa)}
					aria-label={`Entrar em contato com ${empresa.nome}`}
				>
					Entrar em contato
				</button>
			</div>
		</div>
	);
}

export default CardEmpresa;

import acessibilidadeImage from "../../assets/images/acessibilidade-geral.png";
import heroImage from "../../assets/images/acessibilidade-hero.png";
import audioImage from "../../assets/images/audio.png";
import daltonismoImage from "../../assets/images/daltonismo.png";
import librasImage from "../../assets/images/libras.png";
import HeroP from "../Hero/HeroP";
import "./AcessibilidadeP.css";

function SupportSection({ image, title, description, link }) {
	return (
		<div className="row align-items-center mb-5">
			<div className="col-lg-6 mb-4 mb-lg-0">
				<img src={image} alt={title} className="img-fluid rounded shadow" />
			</div>
			<div className="col-lg-6">
				<h2 className="display-6 mb-4">{title}</h2>
				<p className="lead">{description}</p>
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="btn btn-primary btn-lg"
				>
					Saiba Mais
				</a>
			</div>
		</div>
	);
}

function AcessibilidadeP() {
	return (
		<>
			<HeroP
				title="Acessibilidade e Inclusão"
				subtitle="Promovendo ferramentas acessíveis e apoio a todas as pessoas com deficiência."
				image={heroImage}
			/>

			<section className="py-5">
				<div className="container">
					<SupportSection
						image={librasImage}
						title="Intérprete Virtual de LIBRAS"
						description="Nosso site conta com um assistente virtual de LIBRAS para tornar os conteúdos mais acessíveis à comunidade surda."
						link="#"
					/>
					<SupportSection
						image={audioImage}
						title="Leitura em Voz Alta"
						description="Funcionalidade de leitura de conteúdo em áudio para pessoas com deficiência visual ou com dificuldade de leitura."
						link="#"
					/>
					<SupportSection
						image={daltonismoImage}
						title="Modo Daltônico"
						description="Cores adaptadas para diferentes tipos de daltonismo, garantindo melhor leitura e compreensão das informações no site."
						link="#"
					/>
					<SupportSection
						image={acessibilidadeImage}
						title="Ferramentas de Acessibilidade Geral"
						description="Navegação facilitada por teclado, ajuste de contraste, tamanho da fonte e muito mais. Nossa meta é garantir acesso total a todos."
						link="#"
					/>
				</div>
			</section>

			<section className="py-5 bg-primary text-white">
				<div className="container text-center">
					<h2 className="h3 mb-4">Precisa de ajuda para navegar?</h2>
					<p className="lead mb-4">
						Estamos aqui para garantir que todas as pessoas consigam utilizar
						nosso site com conforto e autonomia.
					</p>
					<a
						href="mailto:acessibilidade@seusite.com"
						className="btn btn-light btn-lg"
					>
						<i className="bi bi-envelope me-2"></i>Fale com a nossa equipe
					</a>
				</div>
			</section>
		</>
	);
}

export default AcessibilidadeP;

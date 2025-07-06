import React from 'react';
import '../styles/AcessibilidadeP.css';
import HeroP from '../components/HeroP';
import heroImage from '../assets/images/acessibilidade-hero.png';
import librasImage from '../assets/images/libras.png';
import audioImage from '../assets/images/audio.png';
import daltonismoImage from '../assets/images/daltonismo.png';
import acessibilidadeImage from '../assets/images/acessibilidade-geral.png';

function SupportSection({ image, title, description, link }) {
  return (
    <div className="row align-items-center mb-5">
      <div className="col-lg-6 mb-4 mb-lg-0">
        <img src={image} alt={title} className="img-fluid rounded shadow" />
      </div>
      <div className="col-lg-6">
        <h2 className="display-6 mb-4">{title}</h2>
        <p className="lead">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Saiba Mais</a>
      </div>
    </div>
  );
}

function AccessibilityCard({ icon, title, text }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="wellness-card p-4 bg-white rounded shadow-sm text-center h-100">
        <i className={`bi ${icon} display-4 text-primary mb-3`}></i>
        <h3 className="h4 mb-3">{title}</h3>
        <p className="mb-4">{text}</p>
        <button className="btn btn-outline-primary mt-auto" disabled>Em breve</button>
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
            description="Em breve, nosso site contará com um assistente virtual de LIBRAS para tornar os conteúdos mais acessíveis à comunidade surda."
            link="#"
          />
          <SupportSection
            image={audioImage}
            title="Leitura em Voz Alta"
            description="Funcionalidade de leitura de conteúdo em áudio para pessoas com deficiência visual ou com dificuldade de leitura. Em breve disponível!"
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

          <div className="row mb-5">
            <div className="col-12 text-center mb-5">
              <h2 className="display-6">Funcionalidades Planejadas</h2>
              <p className="lead">Em breve, novas ferramentas para tornar nossa plataforma ainda mais inclusiva</p>
            </div>
            <AccessibilityCard icon="bi-sign-language" title="LIBRAS" text="Tradução simultânea de conteúdos em língua de sinais." />
            <AccessibilityCard icon="bi-volume-up" title="Áudio" text="Conversão de texto em fala para usuários com baixa visão." />
            <AccessibilityCard icon="bi-palette" title="Filtro de Cores" text="Opções visuais otimizadas para pessoas daltônicas." />
          </div>
        </div>
      </section>

      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="h3 mb-4">Dificuldade para navegar?</h2>
          <p className="lead mb-4">Nossa equipe está comprometida em oferecer o melhor suporte possível.</p>
          <a href="mailto:acessibilidade@seusite.com" className="btn btn-light btn-lg">
            <i className="bi bi-envelope me-2"></i>Entrar em Contato
          </a>
        </div>
      </section>
    </>
  );
}

export default AcessibilidadeP;

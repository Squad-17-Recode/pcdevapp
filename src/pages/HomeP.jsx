

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

function HomeP() {
  return (
    <>
      <HeroP
        title="Acessibilidade e Inclusão"
        subtitle="Promovendo ferramentas acessíveis e apoio a todas as pessoas com deficiência."
        image={heroImage}>

      </HeroP>

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
          {/* ...continue com o restante do conteúdo de AcessibilidadeP.jsx conforme necessário... */}
        </div>
      </section>
    </>
  );
}

export default HomeP;
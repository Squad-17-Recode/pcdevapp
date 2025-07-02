import React from 'react';
import '../styles/hero.css';
import heroImage from '../assets/images/pcd.png';

function Hero() {
  const heroStyle = {
    backgroundImage: `url(${heroImage})`
  };

  return (
    <section className="hero" style={heroStyle} role="region" aria-label="Seção de destaque PCDev">
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-lg-7 col-md-10">
            <div className="hero-content text-white">
              <p className="display-6 mb-4">
                Conectando pessoas com deficiência a oportunidades acessíveis, capacitação e acolhimento. Um espaço feito para valorizar a diversidade e promover inclusão real no mercado de trabalho.
              </p>
              <a href="/sobre" className="btn btn-primary btn-lg" aria-label="Saiba mais sobre o projeto PCDev">Saiba Mais</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
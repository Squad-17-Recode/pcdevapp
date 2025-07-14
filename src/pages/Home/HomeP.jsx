import HeroP from '../HeroP/HeroP';
import heroImage from '../assets/images/acessibilidade-hero.png';
import '../styles/HomeP.css';
import pcdOfficeImg from '../assets/images/pcd-office-1.jpg';
import pcdOfficeImg2 from '../assets/images/pcd-office-2.jpg';
import pcdOfficeImg3 from '../assets/images/pcd-office-3.png';
import pcdOfficeImg4 from '../assets/images/pcd-office-4.png';

function SupportSection({ image, title, description, description2, description3 }) {
  return (
    <div className="row align-items-center mb-5">
      <div className="col-lg-6 mb-4 mb-lg-0">
        <img src={image} alt={title} className="support-img img-fluid rounded shadow" />
      </div>
      <div className="col-lg-6">
        <h2 className="display-6 mb-4">{title}</h2>
        {description && <p className="lead description">{description}</p>}
        {description2 && <p className="lead description">{description2}</p>}
        {description3 && <p className="lead description">{description3}</p>}
      </div>
    </div>
  );
}

function HomeP() {
  return (
          <>

          <HeroP
        title="Transformando Potenciais em Oportunidades"
        subtitle="Seu Caminho para o Futuro Profissional"
        image={heroImage}
      />

          <section className="py-5">
                  <div className="container">
                    <SupportSection
                      image={pcdOfficeImg3}
                      title="Bem-vindo ao PcDev – a plataforma que conecta talentos diversos às melhores oportunidades de vagas e cursos no mercado de trabalho. Acreditamos que a inclusão não é apenas um direito, mas a força motriz para uma sociedade mais inovadora, justa e produtiva."
                      link="#"
                    />
                    <SupportSection
                      image={pcdOfficeImg2}
                      title="Por que somos importantes?"
                      description="No Brasil, milhões de pessoas com deficiência possuem um potencial extraordinário, mas muitas vezes enfrentam barreiras na busca por qualificação e emprego. Nós nascemos para romper essas barreiras, oferecendo um espaço dedicado onde a capacitação encontra a oportunidade, e a diversidade é valorizada."
                      link="#"
                    />
                    <SupportSection
                      image={pcdOfficeImg}
                      title="Como somos a solução que a sociedade precisa?"
                      description="O PcDev é mais do que um portal de vagas. Somos um movimento que impulsiona a inclusão em duas frentes essenciais:"
                      description2="• Para Pessoas com Deficiência: Você encontra aqui um leque de vagas personalizadas para suas habilidades e necessidades, além de cursos e treinamentos que impulsionarão sua carreira e abrirão novas portas. Seu talento tem valor, e nós te ajudamos a mostrá-lo."
                      description3="• Para Empresas: Oferecemos a conexão com um pool de profissionais qualificados e engajados, prontos para agregar valor e inovação à sua equipe. Ao contratar por meio de nossa plataforma, sua empresa não apenas cumpre cotas, mas constrói um ambiente de trabalho mais rico, diverso e humano, fortalecendo sua marca e seu impacto social."
                      link="#"
                    />
                    <SupportSection
                      image={pcdOfficeImg4}
                      title="Seu futuro começa agora. Sua empresa se fortalece aqui."
                      description="Junte-se a nós nesta jornada de transformação. Seja você um profissional buscando seu lugar no mercado ou uma empresa comprometida com a inclusão, o nosso projeto PcDev é o elo que faltava."
                      link="#"
                    />

                  </div>
                </section>

          {/* Features Section */}
          <div className="features-section">
            <div className="features-container">
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon blue-icon">
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Vagas Personalizadas</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <h3 className="feature-title">Vagas Personalizadas</h3>
                  <p className="feature-description">Encontre oportunidades que se alinham com suas habilidades e necessidades específicas</p>
                </div>

                <div className="feature-item">
                  <div className="feature-icon purple-icon">
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Inclusão Empresarial</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="feature-title">Inclusão Empresarial</h3>
                  <p className="feature-description">Conectamos empresas com profissionais qualificados para um ambiente mais diverso</p>
                </div>
              </div>
            </div>
          </div>
        </>
  );
}

export default HomeP;

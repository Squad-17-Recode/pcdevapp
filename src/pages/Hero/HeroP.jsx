import { useAuth } from '../../context/AuthContext';
import './HeroP.css';

function HeroP({ title, subtitle, image }) {
  const { highContrast } = useAuth();
  const heroStyle = highContrast
    ? {
        backgroundColor: '#000',
        backgroundImage: 'none',
        color: '#fff'
      }
    : {
        backgroundImage: `url(${image})`
      };

  return (
    <section className="HeroP" style={heroStyle}>
      {!highContrast && <div className="hero-overlay"></div>}
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className={`hero-content${highContrast ? ' high-contrast' : ' text-white'}`}>
              <h1 className="display-4 fw-bold mb-4">{title}</h1>
              <h2 className="lead display-6">{subtitle}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroP;

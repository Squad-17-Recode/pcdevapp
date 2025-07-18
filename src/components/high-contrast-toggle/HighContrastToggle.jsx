import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/high-contrast.css';

function HighContrastToggle() {
  const { highContrast, toggleHighContrast } = useAuth();

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    return () => {
      document.body.classList.remove('high-contrast');
    };
  }, [highContrast]);

  return (
    <button
      type="button"
      className="high-contrast-toggle"
      style={{
        position: 'fixed',
        bottom: '64px',
        right: '24px',
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: highContrast ? '#fff' : '#222',
        color: highContrast ? '#222' : '#fff',
        border: '2px solid #222',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        fontSize: '1.7rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
      }}
      aria-pressed={highContrast}
      aria-label={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
      onClick={toggleHighContrast}
      title={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block', margin: 'auto' }}>
          <title>Ícone de alto contraste</title>
          <defs>
            <linearGradient id="contrast-circle" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="50%" stopColor="#fff" />
              <stop offset="50%" stopColor="#222" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="15" fill="url(#contrast-circle)" stroke="#222" strokeWidth="2" />
        </svg>
      </span>
    </button>
  );
}

export default HighContrastToggle;

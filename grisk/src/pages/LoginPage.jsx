import { useState } from 'react';
import DrillingRig from '../components/DrillingRig';

const CREDENTIALS = { email: 'wajdimnari@gmail.com', password: 'Wajdi123' };
const ADMIN_CREDENTIALS = { email: 'admin@gmail.com', password: 'Wajdi123' };

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setError('');
      onLogin(email.trim(), 'admin');
    } else if (email.trim() === CREDENTIALS.email && password === CREDENTIALS.password) {
      setError('');
      onLogin(email.trim(), 'user');
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
      setPassword('');
    }
  }

  return (
    <div style={s.page}>
      <style>{`
        .grisk-login-input::placeholder { color: rgba(255,255,255,0.3); }
        .grisk-login-input:focus { outline: none; }
      `}</style>

      {/* Corner HUD brackets */}
      <div style={{ ...s.corner, top: 16, left: 16, borderTop: '2px solid rgba(255,140,0,0.65)', borderLeft: '2px solid rgba(255,140,0,0.65)' }} />
      <div style={{ ...s.corner, top: 16, right: 16, borderTop: '2px solid rgba(255,140,0,0.65)', borderRight: '2px solid rgba(255,140,0,0.65)' }} />
      <div style={{ ...s.corner, bottom: 16, left: 16, borderBottom: '2px solid rgba(255,140,0,0.65)', borderLeft: '2px solid rgba(255,140,0,0.65)' }} />
      <div style={{ ...s.corner, bottom: 16, right: 16, borderBottom: '2px solid rgba(255,140,0,0.65)', borderRight: '2px solid rgba(255,140,0,0.65)' }} />

      {/* Crane — fixed to bottom, decorative, never adds scroll height */}
      <div style={s.rigWrap}>
        <DrillingRig />
      </div>

      <div style={s.scroll}>
        {/* HUD Logo */}
        <div style={s.hudWrap}>
          <div style={s.hudOuter}>
            <div style={s.hudMiddle}>
              <div style={s.hudInner}>
                <div style={s.logoRow}>
                  <span style={s.logoG}>G</span>
                  <span style={s.logoRisk}>RISK</span>
                </div>
                <div style={s.logoDecor}>
                  <span style={s.decorLine} />
                  <span style={s.decorSlash}>///</span>
                  <span style={s.decorLine} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ ...s.hudTick, top: -1, left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ ...s.hudTick, bottom: -1, left: '50%', transform: 'translateX(-50%)' }} />
        </div>

        {/* Tagline */}
        <p style={s.tagline}>
          ANTICIPEZ LES <span style={s.orange}>RISQUES</span>.<br />
          SÉCURISEZ VOS <span style={s.orange}>FONDATIONS</span>.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate style={s.form}>
          <div style={s.group}>
            <label style={s.label}>Adresse e-mail</label>
            <div style={s.inputWrap}>
              <span style={s.icoWrap}><MailIcon /></span>
              <input
                className="grisk-login-input"
                style={s.input}
                type="email"
                placeholder="Entrez votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div style={s.group}>
            <label style={s.label}>Mot de passe</label>
            <div style={s.inputWrap}>
              <span style={s.icoWrap}><LockIcon /></span>
              <input
                className="grisk-login-input"
                style={s.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="button" style={s.eyeBtn} onClick={() => setShowPassword(p => !p)}>
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {error && <p style={s.error}>{error}</p>}
          </div>

          <button style={s.btn} type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

const s = {
  page: {
    height: '100vh',
    background: '#06111f',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  corner: {
    position: 'absolute',
    width: 36,
    height: 36,
    zIndex: 2,
    pointerEvents: 'none',
  },
  // Crane sits at the bottom, behind everything, never adds to scroll
  rigWrap: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 500,
    pointerEvents: 'none',
    zIndex: 0,
  },
  // Content column on top of the crane
  scroll: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px 0',
    maxWidth: 440,
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  hudWrap: {
    position: 'relative',
    width: 180,
    height: 180,
    marginBottom: 18,
    flexShrink: 0,
  },
  hudOuter: {
    width: 180,
    height: 180,
    borderRadius: '50%',
    border: '2px solid rgba(26,106,255,0.35)',
    boxShadow: '0 0 30px rgba(26,106,255,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hudMiddle: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    border: '1.5px solid rgba(26,106,255,0.5)',
    boxShadow: '0 0 18px rgba(26,106,255,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hudInner: {
    width: 104,
    height: 104,
    borderRadius: '50%',
    border: '2px solid rgba(245,124,0,0.65)',
    boxShadow: '0 0 28px rgba(245,124,0,0.28), inset 0 0 18px rgba(245,124,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hudTick: {
    position: 'absolute',
    width: 2,
    height: 8,
    background: '#f57c00',
    opacity: 0.8,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'baseline',
    lineHeight: 1,
  },
  logoG: {
    fontSize: 36,
    fontWeight: 900,
    color: '#f57c00',
    fontFamily: '"Arial Black", Arial, sans-serif',
    letterSpacing: -1,
  },
  logoRisk: {
    fontSize: 36,
    fontWeight: 900,
    color: '#ffffff',
    fontFamily: '"Arial Black", Arial, sans-serif',
    letterSpacing: -1,
  },
  logoDecor: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  decorLine: {
    display: 'inline-block',
    width: 16,
    height: 2,
    background: '#f57c00',
    opacity: 0.8,
  },
  decorSlash: {
    color: '#f57c00',
    fontSize: 10,
    letterSpacing: 2,
    opacity: 0.8,
  },
  tagline: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: 1.75,
    marginBottom: 22,
  },
  orange: { color: '#f57c00' },
  form: { width: '100%' },
  group: { marginBottom: 14 },
  label: {
    display: 'block',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 6,
  },
  inputWrap: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.055)',
    border: '1.5px solid rgba(100,150,255,0.22)',
    borderRadius: 12,
    padding: '0 14px',
    gap: 12,
  },
  icoWrap: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: 15,
    padding: '13px 0',
    fontFamily: 'inherit',
    width: '100%',
  },
  eyeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  error: {
    color: '#ff6b6b',
    fontSize: 13,
    marginTop: 6,
  },
  btn: {
    width: '100%',
    padding: '15px 24px',
    background: 'linear-gradient(135deg, #e65c00, #f9a020)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 6,
    letterSpacing: '0.04em',
    boxShadow: '0 4px 22px rgba(230,92,0,0.42)',
    fontFamily: 'inherit',
  },
};

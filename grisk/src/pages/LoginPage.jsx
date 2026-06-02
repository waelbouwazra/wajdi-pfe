import { useState } from 'react';

const CREDENTIALS = { email: 'wajdimnari@gmail.com', password: 'Wajdi123' };

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim() === CREDENTIALS.email && password === CREDENTIALS.password) {
      setError('');
      onLogin(email.trim());
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
      setPassword('');
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.cardWrap}>
        {/* The CSS class handles padding responsively */}
        <div className="login-card-inner" style={styles.card}>
          <div style={styles.logoWrap}>
            <div style={styles.logoIcon}>⚠</div>
            <h1 style={styles.logoTitle}>GRISK</h1>
            <p style={styles.logoSub}>Détection des Risques Géotechniques</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div style={styles.group}>
              <label style={styles.label}>Adresse e-mail</label>
              <input
                style={styles.input}
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Mot de passe</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              {error && <p style={styles.error}>{error}</p>}
            </div>

            <button style={styles.btn} type="submit">
              Connexion &nbsp;→
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f2744 0%, #1a3a5c 55%, #1e4976 100%)',
    padding: '16px',
  },
  cardWrap: { width: '100%', maxWidth: 420 },
  card: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0,0,0,.18)',
  },
  logoWrap: { textAlign: 'center', marginBottom: 32 },
  logoIcon: {
    width: 64, height: 64,
    background: 'linear-gradient(135deg, #1a3a5c, #e67e22)',
    borderRadius: 16,
    display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: 28, marginBottom: 14,
  },
  logoTitle: { fontSize: 26, fontWeight: 700, color: '#1a3a5c', margin: 0, letterSpacing: -0.5 },
  logoSub: { fontSize: 13, color: '#637488', marginTop: 4 },
  group: { marginBottom: 20 },
  label: {
    display: 'block', fontSize: 12, fontWeight: 700, color: '#1c2b3a',
    marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px',
  },
  input: {
    width: '100%', padding: '13px 14px',
    border: '1.5px solid #dde2ea', borderRadius: 8,
    fontSize: 16, color: '#1c2b3a', background: '#fafbfc',
    outline: 'none', boxSizing: 'border-box',
  },
  error: { color: '#c0392b', fontSize: 13, marginTop: 6 },
  btn: {
    width: '100%', padding: '14px 24px',
    background: 'linear-gradient(135deg, #1a3a5c, #2a5080)',
    color: '#fff', border: 'none', borderRadius: 8,
    fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 4,
  },
};

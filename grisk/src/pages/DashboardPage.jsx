import Topbar from '../components/Topbar';
import DrillingRig from '../components/DrillingRig';

function AnalyzeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

export default function DashboardPage({ user, onLogout, onGoAnalyze, onGoNote, onGoHistory }) {
  return (
    <div style={s.page}>
      <Topbar user={user} onLogout={onLogout} />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroLeft}>
          <div style={s.hudBadge}>
            <span style={s.badgeG}>G</span>
            <span style={s.badgeRisk}>RISK</span>
          </div>
          <h1 style={s.heroTitle}>
            Bienvenue sur <span style={s.orange}>GRISK</span>
          </h1>
          <p style={s.heroSub}>
            Plateforme de gestion des risques géotechniques — Tunisie
          </p>
          <div style={s.heroLine} />
        </div>
        <div style={s.heroRig}>
          <DrillingRig />
        </div>
      </div>

      {/* Action cards */}
      <main style={s.main}>
        <p style={s.chooseLabel}>Choisissez une action</p>

        <div style={s.cards}>
          {/* Analyser */}
          <button style={s.card} onClick={onGoAnalyze}>
            <div style={{ ...s.iconWrap, background: 'rgba(245,124,0,0.1)', border: '1.5px solid rgba(245,124,0,0.3)' }}>
              <AnalyzeIcon />
            </div>
            <div style={s.cardBody}>
              <div style={{ ...s.cardTitle, color: '#f57c00' }}>Analyser les risques</div>
              <div style={s.cardSub}>
                Détectez les risques géotechniques applicables à votre chantier en fonction des paramètres du site.
              </div>
            </div>
            <span style={{ ...s.cardArrow, color: '#f57c00' }}>→</span>
          </button>

          {/* Noter */}
          <button style={s.card} onClick={onGoNote}>
            <div style={{ ...s.iconWrap, background: 'rgba(74,138,255,0.1)', border: '1.5px solid rgba(74,138,255,0.3)' }}>
              <NoteIcon />
            </div>
            <div style={s.cardBody}>
              <div style={{ ...s.cardTitle, color: '#4a8aff' }}>Noter les risques</div>
              <div style={s.cardSub}>
                Enregistrez un nouveau risque rencontré sur le terrain avec sa localisation, recommandation et photo.
              </div>
            </div>
            <span style={{ ...s.cardArrow, color: '#4a8aff' }}>→</span>
          </button>

          {/* Historique */}
          <button style={s.card} onClick={onGoHistory}>
            <div style={{ ...s.iconWrap, background: 'rgba(167,139,250,0.1)', border: '1.5px solid rgba(167,139,250,0.3)' }}>
              <HistoryIcon />
            </div>
            <div style={s.cardBody}>
              <div style={{ ...s.cardTitle, color: '#a78bfa' }}>Historique des risques</div>
              <div style={s.cardSub}>
                Consultez tous les risques terrain enregistrés avec leurs photos et recommandations.
              </div>
            </div>
            <span style={{ ...s.cardArrow, color: '#a78bfa' }}>→</span>
          </button>
        </div>
      </main>

      <div style={s.bottomDecor}>///</div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: '#06111f',
    display: 'flex',
    flexDirection: 'column',
  },
  orange: { color: '#f57c00' },

  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 24px 8px',
    maxWidth: 900,
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    gap: 16,
  },
  heroLeft: { flex: 1, minWidth: 0 },
  hudBadge: {
    display: 'inline-flex',
    alignItems: 'baseline',
    background: 'rgba(245,124,0,0.08)',
    border: '1px solid rgba(245,124,0,0.2)',
    borderRadius: 8,
    padding: '4px 12px',
    marginBottom: 14,
  },
  badgeG: {
    fontSize: 16,
    fontWeight: 900,
    color: '#f57c00',
    fontFamily: '"Arial Black", Arial, sans-serif',
  },
  badgeRisk: {
    fontSize: 16,
    fontWeight: 900,
    color: '#ffffff',
    fontFamily: '"Arial Black", Arial, sans-serif',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
    lineHeight: 1.2,
    fontFamily: 'inherit',
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 8,
    lineHeight: 1.6,
  },
  heroLine: {
    width: 36,
    height: 3,
    background: '#f57c00',
    borderRadius: 2,
    marginTop: 14,
  },
  heroRig: {
    width: 120,
    flexShrink: 0,
    opacity: 0.8,
  },

  main: {
    flex: 1,
    padding: '16px 16px 32px',
    maxWidth: 900,
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  chooseLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: 14,
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: '#0d1e30',
    border: '1px solid rgba(100,150,255,0.12)',
    borderRadius: 16,
    padding: '20px 20px',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
    transition: 'border-color 0.18s, background 0.18s',
    width: '100%',
    boxSizing: 'border-box',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardBody: { flex: 1, minWidth: 0 },
  cardTitle: {
    fontSize: 17,
    fontWeight: 700,
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.5,
  },
  cardArrow: {
    fontSize: 22,
    fontWeight: 300,
    flexShrink: 0,
  },

  bottomDecor: {
    textAlign: 'center',
    color: '#f57c00',
    fontSize: 18,
    letterSpacing: 6,
    padding: '12px 0 20px',
    opacity: 0.7,
  },
};

import { useState, useEffect } from 'react';
import Topbar from '../components/Topbar';

const BACKEND = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function MapPinIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function CalendarIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function UserIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function ImageIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
}
function RefreshIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function RisqueCard({ r }) {
  const [imgOk, setImgOk] = useState(!!r.photo_url);

  const params = [
    r.type_sol,
    r.methode,
    r.profondeur != null ? `${r.profondeur} m prof.` : null,
    r.nappe      != null ? `Nappe: ${r.nappe} m`    : null,
    r.diametre   != null ? `⌀${r.diametre} mm`      : null,
    r.environnement,
  ].filter(Boolean);

  return (
    <div style={c.card}>
      {/* Photo */}
      {imgOk ? (
        <img
          src={`${BACKEND}${r.photo_url}`}
          alt="risque"
          style={c.photo}
          onError={() => setImgOk(false)}
        />
      ) : (
        <div style={c.photoPlaceholder}>
          <ImageIcon />
          <span style={c.photoPlaceholderText}>Pas de photo</span>
        </div>
      )}

      <div style={c.body}>
        {/* Top meta */}
        <div style={c.topMeta}>
          <div style={c.gouvernorat}>
            <MapPinIcon />
            {r.gouvernorat}
          </div>
          <div style={c.date}>
            <CalendarIcon />
            {formatDate(r.created_at)}
          </div>
        </div>

        {/* Params */}
        {params.length > 0 && (
          <div style={c.paramRow}>
            {params.map((p, i) => (
              <span key={i} style={c.paramChip}>{p}</span>
            ))}
          </div>
        )}

        {/* Recommandation */}
        {r.recommandation && (
          <div style={c.recWrap}>
            <div style={c.recLabel}>Recommandation</div>
            <p style={c.recText}>{r.recommandation}</p>
          </div>
        )}

        {/* Author */}
        <div style={c.author}>
          <UserIcon />
          {r.author}
        </div>
      </div>
    </div>
  );
}

const c = {
  card: {
    background: '#0d1e30',
    border: '1px solid rgba(100,150,255,0.12)',
    borderRadius: 14,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
    display: 'block',
  },
  photoPlaceholder: {
    width: '100%',
    height: 100,
    background: 'rgba(255,255,255,0.03)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  photoPlaceholderText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.2)',
  },
  body: { padding: '14px 16px 16px' },
  topMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  gouvernorat: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: '#4a8aff',
    fontSize: 14,
    fontWeight: 700,
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
  },
  paramRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  paramChip: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 6,
    padding: '3px 9px',
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
  },
  recWrap: {
    background: 'rgba(74,138,255,0.07)',
    border: '1px solid rgba(74,138,255,0.15)',
    borderRadius: 8,
    padding: '10px 12px',
    marginBottom: 10,
  },
  recLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: '#4a8aff',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    marginBottom: 4,
  },
  recText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.5,
    margin: 0,
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
  },
};

export default function HistoriquePage({ user, onLogout, onBack }) {
  const [risques, setRisques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND}/api/risques`);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      setRisques(await res.json());
    } catch (e) {
      setError(e.message || 'Impossible de charger les données.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={s.page}>
      <Topbar user={user} onLogout={onLogout} onMenu={onBack} />

      {/* Hero */}
      <div style={s.hero}>
        <div>
          <h1 style={s.heroTitle}>
            Historique des <span style={s.blue}>Risques Notés</span>
          </h1>
          <p style={s.heroSub}>
            Tous les risques enregistrés sur le terrain par vos équipes.
          </p>
          <div style={s.heroLine} />
        </div>
        <div style={s.heroRight}>
          <span style={s.totalBadge}>{loading ? '…' : risques.length}</span>
          <span style={s.totalLabel}>risque{risques.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <main style={s.main}>
        {/* Refresh */}
        <div style={s.toolbar}>
          <button style={s.refreshBtn} onClick={load} disabled={loading}>
            <RefreshIcon />
            {loading ? 'Chargement…' : 'Actualiser'}
          </button>
        </div>

        {error && (
          <div style={s.errorBox}>{error}</div>
        )}

        {!loading && !error && risques.length === 0 && (
          <div style={s.emptyBox}>
            <p style={s.emptyText}>Aucun risque enregistré pour le moment.</p>
            <p style={s.emptySub}>Utilisez « Noter les risques » pour en ajouter un.</p>
          </div>
        )}

        {!error && risques.length > 0 && (
          <div className="risk-grid">
            {risques.map(r => <RisqueCard key={r.id} r={r} />)}
          </div>
        )}
      </main>

      <div style={s.bottomDecor}>///</div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: '#06111f', display: 'flex', flexDirection: 'column' },
  blue: { color: '#4a8aff' },

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
  heroTitle: { fontSize: 24, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.3, fontFamily: 'inherit' },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8, lineHeight: 1.6 },
  heroLine: { width: 36, height: 3, background: '#4a8aff', borderRadius: 2, marginTop: 14 },
  heroRight: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 },
  totalBadge: {
    fontSize: 36,
    fontWeight: 900,
    color: '#4a8aff',
    fontFamily: '"Arial Black", Arial, sans-serif',
    lineHeight: 1,
  },
  totalLabel: { fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.6px', marginTop: 2 },

  main: { flex: 1, padding: '12px 16px 32px', maxWidth: 900, margin: '0 auto', width: '100%', boxSizing: 'border-box' },

  toolbar: { display: 'flex', justifyContent: 'flex-end', marginBottom: 16 },
  refreshBtn: {
    display: 'flex', alignItems: 'center', gap: 7,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '8px 14px', color: 'rgba(255,255,255,0.6)',
    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
  },

  errorBox: {
    background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)',
    borderRadius: 10, padding: '14px 18px', color: '#ff6b6b', fontSize: 14,
    marginBottom: 16,
  },
  emptyBox: {
    textAlign: 'center', padding: '60px 24px',
    background: '#0d1e30', borderRadius: 14,
    border: '1px solid rgba(100,150,255,0.1)',
  },
  emptyText: { color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: 600, margin: '0 0 6px' },
  emptySub: { color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: 0 },

  bottomDecor: { textAlign: 'center', color: '#4a8aff', fontSize: 18, letterSpacing: 6, padding: '12px 0 20px', opacity: 0.7 },
};

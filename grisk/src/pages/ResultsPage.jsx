import Topbar from '../components/Topbar';
import RiskCard from '../components/RiskCard';

export default function ResultsPage({ user, onLogout, analysis, onBack }) {
  const { risks, formData } = analysis;

  const critique = risks.filter((r) => r.criticite === 'Critique').length;
  const elevee   = risks.filter((r) => r.criticite === 'Élevée').length;
  const moyenne  = risks.filter((r) => r.criticite === 'Moyenne').length;

  const paramLine = [
    formData.sol,
    formData.methode,
    formData.profondeur ? formData.profondeur + ' m prof.' : null,
    formData.nappe      ? 'Nappe: ' + formData.nappe + ' m' : null,
    formData.diametre   ? '⌀' + formData.diametre + ' mm' : null,
    formData.env,
  ].filter(Boolean).join(' · ');

  return (
    <div style={styles.page}>
      <Topbar user={user} onLogout={onLogout} />

      <main className="app-main">
        {/* Back button + header */}
        <div style={styles.topRow}>
          <button style={styles.backBtn} onClick={onBack}>
            ← Modifier les paramètres
          </button>
        </div>

        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Résultats de l'Analyse</h1>
          <p style={styles.paramLine}>{paramLine}</p>
        </div>

        {/* Summary chips */}
        <div style={styles.chips}>
          {critique > 0 && <Chip color="danger">⛔ {critique} Critique{critique > 1 ? 's' : ''}</Chip>}
          {elevee   > 0 && <Chip color="warning">⚠ {elevee} Élevé{elevee > 1 ? 's' : ''}</Chip>}
          {moyenne  > 0 && <Chip color="medium">ℹ {moyenne} Moyen{moyenne > 1 ? 's' : ''}</Chip>}
          {risks.length === 0 && <Chip color="ok">✓ Aucun risque détecté</Chip>}
        </div>

        {/* Risk cards or empty state */}
        {risks.length === 0 ? (
          <div style={styles.noRisk}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>✓</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: '#1a6b3c' }}>
              Aucun risque détecté
            </h3>
            <p style={{ fontSize: 14, color: '#2d8a52' }}>
              Les paramètres saisis ne correspondent à aucun déclencheur de risque connu pour cette méthode.
            </p>
          </div>
        ) : (
          <div className="risk-grid">
            {risks.map((r) => <RiskCard key={r.id} risk={r} />)}
          </div>
        )}

        {/* Bottom back button */}
        {risks.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <button style={styles.backBtn} onClick={onBack}>
              ← Nouvelle analyse
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function Chip({ color, children }) {
  const palette = {
    danger:  { bg: 'rgba(192,57,43,0.15)',  color: '#ff6b6b', border: 'rgba(192,57,43,0.4)' },
    warning: { bg: 'rgba(211,84,0,0.15)',   color: '#f57c00', border: 'rgba(211,84,0,0.4)' },
    medium:  { bg: 'rgba(41,128,185,0.15)', color: '#4a8aff', border: 'rgba(41,128,185,0.4)' },
    ok:      { bg: 'rgba(40,200,100,0.12)', color: '#4cdb8a', border: 'rgba(40,200,100,0.3)' },
  }[color];
  return (
    <span style={{
      padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600,
      border: `1px solid ${palette.border}`, background: palette.bg, color: palette.color,
    }}>
      {children}
    </span>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#06111f', display: 'flex', flexDirection: 'column' },
  topRow: { marginBottom: 16 },
  backBtn: {
    background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)',
    border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 8,
    padding: '10px 18px', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
  },
  pageHeader: { marginBottom: 16 },
  pageTitle: { fontSize: 22, fontWeight: 700, color: '#ffffff', margin: 0 },
  paramLine: { fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 5, marginBottom: 0, lineHeight: 1.5 },
  chips: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 },
  noRisk: {
    background: 'rgba(40,200,100,0.08)', border: '1.5px solid rgba(40,200,100,0.25)',
    borderRadius: 12, padding: 40, textAlign: 'center', color: '#4cdb8a',
  },
};

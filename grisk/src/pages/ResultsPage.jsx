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
    danger:  { bg: '#fde8e8', color: '#c0392b', border: '#f5c6c6' },
    warning: { bg: '#fef0e2', color: '#d35400', border: '#f8d5b0' },
    medium:  { bg: '#e3f0fb', color: '#2980b9', border: '#b0d4f1' },
    ok:      { bg: '#e3f7ed', color: '#1a6b3c', border: '#a8dfc0' },
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
  page: { minHeight: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column' },
  topRow: { marginBottom: 16 },
  backBtn: {
    background: '#fff', color: '#1a3a5c',
    border: '1.5px solid #dde2ea', borderRadius: 8,
    padding: '10px 18px', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,.07)',
  },
  pageHeader: { marginBottom: 16 },
  pageTitle: { fontSize: 22, fontWeight: 700, color: '#1a3a5c', margin: 0 },
  paramLine: { fontSize: 13, color: '#637488', marginTop: 5, marginBottom: 0, lineHeight: 1.5 },
  chips: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 },
  noRisk: {
    background: '#e3f7ed', border: '1.5px solid #a8dfc0',
    borderRadius: 12, padding: 40, textAlign: 'center', color: '#1a6b3c',
  },
};

import { useState, useEffect } from 'react';
import { TRIGGER_LABELS, RISK_IMAGES } from '../data/risks';

const LEVEL_STYLES = {
  Critique: {
    border: 'rgba(192,57,43,0.45)', bg: '#0f1e28', headerBg: 'rgba(192,57,43,0.15)',
    nameColor: '#ff6b6b', badgeBg: '#c0392b', barColor: '#e74c3c',
    icon: '⛔', barPct: 100, recBorder: 'rgba(192,57,43,0.3)', recBg: 'rgba(192,57,43,0.07)',
  },
  Élevée: {
    border: 'rgba(211,84,0,0.45)', bg: '#0f1e28', headerBg: 'rgba(211,84,0,0.15)',
    nameColor: '#f57c00', badgeBg: '#d35400', barColor: '#e67e22',
    icon: '⚠', barPct: 68, recBorder: 'rgba(211,84,0,0.3)', recBg: 'rgba(211,84,0,0.07)',
  },
  Moyenne: {
    border: 'rgba(41,128,185,0.45)', bg: '#0f1e28', headerBg: 'rgba(41,128,185,0.15)',
    nameColor: '#4a8aff', badgeBg: '#2980b9', barColor: '#2980b9',
    icon: 'ℹ', barPct: 38, recBorder: 'rgba(41,128,185,0.3)', recBg: 'rgba(41,128,185,0.07)',
  },
};

export default function RiskCard({ risk }) {
  const s = LEVEL_STYLES[risk.criticite] || LEVEL_STYLES['Moyenne'];
  const imgFilename = RISK_IMAGES[risk.id];
  const imgUrl = imgFilename ? `/api/images/${encodeURIComponent(imgFilename)}` : null;

  const [imgVisible, setImgVisible] = useState(!!imgUrl);
  const [userRecs, setUserRecs] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetch(`/api/recommendations/${risk.id}`)
      .then((r) => r.json())
      .then((data) => setUserRecs(Array.isArray(data) ? data : []))
      .catch(() => setUserRecs([]))
      .finally(() => setLoadingRecs(false));
  }, [risk.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          risk_id: risk.id,
          risk_name: risk.nom,
          content: content.trim(),
          author: author.trim() || 'Anonyme',
        }),
      });
      if (!res.ok) throw new Error();
      const rec = await res.json();
      setUserRecs((prev) => [rec, ...prev]);
      setContent('');
      setAuthor('');
      setShowForm(false);
    } catch {
      setSubmitError("Impossible d'enregistrer. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }

  return (
    <div style={{ ...styles.card, border: `1.5px solid ${s.border}`, background: s.bg }}>

      {/* Header */}
      <div style={{ ...styles.header, background: s.headerBg }}>
        <span style={{ ...styles.riskName, color: s.nameColor }}>
          {s.icon}&nbsp;{risk.nom}
        </span>
        <span style={{ ...styles.badge, background: s.badgeBg }}>{risk.criticite}</span>
      </div>

      {/* Severity bar */}
      <div style={styles.barTrack}>
        <div style={{ ...styles.barFill, width: `${s.barPct}%`, background: s.barColor }} />
      </div>

      {/* CFA compatibility warning */}
      {risk.cfaWarning && (
        <div style={styles.cfaWarning}>
          ⚠ {risk.cfaWarning}
        </div>
      )}

      {/* Risk image */}
      {imgVisible && (
        <div style={styles.imgWrap}>
          <img
            src={imgUrl}
            alt={risk.nom}
            style={styles.img}
            onError={() => setImgVisible(false)}
          />
          <div style={{ ...styles.imgGradient, background: `linear-gradient(to bottom, transparent 50%, ${s.bg})` }} />
        </div>
      )}

      {/* Body */}
      <div style={styles.body}>
        <Section title="Définition" content={risk.definition} />

        <div style={styles.section}>
          <div style={styles.sectionTitle}>Déclencheurs principaux actifs</div>
          <div style={styles.tagRow}>
            {risk.activePrimary.map((t) => (
              <span key={t} style={styles.tagPrimary}>● {TRIGGER_LABELS[t]}</span>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>Facteurs aggravants actifs</div>
          {risk.activeAggravating.length > 0 ? (
            <>
              <div style={styles.tagRow}>
                {risk.activeAggravating.map((t) => (
                  <span key={t} style={styles.tagAggravant}>▲ {TRIGGER_LABELS[t]}</span>
                ))}
              </div>
              <p style={styles.aggNote}>
                ▲ {risk.activeAggravating.length} facteur{risk.activeAggravating.length > 1 ? 's' : ''} aggravant{risk.activeAggravating.length > 1 ? 's' : ''} actif{risk.activeAggravating.length > 1 ? 's' : ''} — criticité augmentée
              </p>
            </>
          ) : (
            <span style={{ fontSize: 12, color: '#637488' }}>Aucun</span>
          )}
        </div>

        <Section title="Conséquences possibles" content={risk.consequences} />
        <Section title="Mesures préventives" content={risk.preventive} />
        <Section title="Solutions correctives" content={risk.corrective} />

        {/* ── Community Recommendations ── */}
        <div style={{ ...styles.recSection, borderColor: s.recBorder, background: s.recBg }}>
          <div style={styles.recHeader}>
            <span style={styles.recTitle}>
              Recommandations
              {!loadingRecs && userRecs.length > 0 && (
                <span style={styles.recCount}>{userRecs.length}</span>
              )}
            </span>
            {!showForm && (
              <button style={styles.addBtn} onClick={() => setShowForm(true)}>
                + Ajouter
              </button>
            )}
          </div>

          {loadingRecs ? (
            <p style={styles.emptyText}>Chargement…</p>
          ) : userRecs.length > 0 ? (
            <div style={styles.recList}>
              {userRecs.map((rec) => (
                <div key={rec.id} style={styles.recItem}>
                  <p style={styles.recContent}>{rec.content}</p>
                  <div style={styles.recMeta}>
                    <span style={styles.recAuthor}>{rec.author}</span>
                    <span style={styles.recDate}>{formatDate(rec.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !showForm && (
              <p style={styles.emptyText}>
                Soyez le premier à ajouter une recommandation.
              </p>
            )
          )}

          {showForm && (
            <form onSubmit={handleSubmit} style={styles.form} noValidate>
              <textarea
                style={styles.textarea}
                placeholder="Décrivez votre recommandation ou solution…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                required
              />
              <input
                style={styles.authorInput}
                type="text"
                placeholder="Votre nom (optionnel)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={80}
              />
              {submitError && <p style={styles.formError}>{submitError}</p>}
              <div style={styles.formActions}>
                <button
                  style={{ ...styles.submitBtn, opacity: (!content.trim() || submitting) ? 0.5 : 1 }}
                  type="submit"
                  disabled={submitting || !content.trim()}
                >
                  {submitting ? 'Publication…' : 'Publier'}
                </button>
                <button
                  style={styles.cancelBtn}
                  type="button"
                  onClick={() => { setShowForm(false); setContent(''); setAuthor(''); setSubmitError(''); }}
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, content }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>{title}</div>
      <p style={styles.sectionContent}>{content}</p>
    </div>
  );
}

const styles = {
  card: { borderRadius: 12, overflow: 'hidden' },
  header: {
    padding: '14px 16px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
  },
  riskName: { fontSize: 15, fontWeight: 700, lineHeight: 1.3 },
  badge: {
    padding: '4px 10px', borderRadius: 12, fontSize: 11,
    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
    color: '#fff', whiteSpace: 'nowrap', flexShrink: 0,
  },
  barTrack: { height: 5, background: 'rgba(255,255,255,0.08)' },
  barFill: { height: '100%', transition: 'width .6s ease' },

  // Image
  imgWrap: { position: 'relative', width: '100%', height: 280, overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  imgGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, pointerEvents: 'none' },

  body: { padding: '16px 16px 18px' },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.6px', color: 'rgba(255,255,255,0.45)', marginBottom: 5,
  },
  sectionContent: { fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, margin: 0 },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  tagPrimary: {
    padding: '4px 10px', borderRadius: 6, fontSize: 12,
    fontWeight: 600, background: 'rgba(192,57,43,0.18)', color: '#ff6b6b',
  },
  tagAggravant: {
    padding: '4px 10px', borderRadius: 6, fontSize: 12,
    fontWeight: 600, background: 'rgba(211,84,0,0.15)', color: '#f57c00',
  },
  aggNote: { fontSize: 12, color: '#f57c00', fontWeight: 600, marginTop: 6, marginBottom: 0 },
  cfaWarning: {
    margin: '0', padding: '8px 14px', fontSize: 12, fontWeight: 600,
    background: 'rgba(255,200,0,0.12)', color: '#ffd740',
    borderBottom: '1px solid rgba(255,200,0,0.2)',
  },

  // Recommendations
  recSection: {
    marginTop: 16, borderRadius: 8, border: '1.5px solid', padding: '14px 14px',
  },
  recHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10,
  },
  recTitle: {
    fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.6px', color: 'rgba(255,255,255,0.4)',
    display: 'flex', alignItems: 'center', gap: 6,
  },
  recCount: {
    background: 'rgba(74,138,255,0.2)', color: '#4a8aff',
    borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 700,
  },
  addBtn: {
    background: 'rgba(74,138,255,0.15)', color: '#4a8aff', border: '1px solid rgba(74,138,255,0.3)',
    borderRadius: 6, padding: '6px 13px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  },
  emptyText: { fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0, fontStyle: 'italic' },
  recList: { display: 'flex', flexDirection: 'column', gap: 8 },
  recItem: {
    background: 'rgba(255,255,255,0.04)', borderRadius: 7, padding: '10px 12px',
    border: '1px solid rgba(255,255,255,0.07)',
  },
  recContent: { fontSize: 13.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: '0 0 6px 0' },
  recMeta: { display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' },
  recAuthor: { fontSize: 11, fontWeight: 700, color: '#4a8aff' },
  recDate: { fontSize: 11, color: 'rgba(255,255,255,0.35)' },

  // Form
  form: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 },
  textarea: {
    width: '100%', padding: '10px 12px',
    border: '1.5px solid rgba(100,150,255,0.2)', borderRadius: 7,
    fontSize: 14, color: '#fff', resize: 'vertical',
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
  },
  authorInput: {
    width: '100%', padding: '10px 12px',
    border: '1.5px solid rgba(100,150,255,0.2)', borderRadius: 7,
    fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)', fontFamily: 'inherit',
  },
  formError: { fontSize: 12, color: '#ff6b6b', margin: 0 },
  formActions: { display: 'flex', gap: 8 },
  submitBtn: {
    flex: 1, padding: '11px 18px', background: 'linear-gradient(135deg, #1a5aff, #4a8aff)', color: '#fff',
    border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  },
  cancelBtn: {
    padding: '11px 14px', background: 'transparent', color: 'rgba(255,255,255,0.45)',
    border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 6, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
  },
};

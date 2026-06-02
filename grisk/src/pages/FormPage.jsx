import { useState } from 'react';
import { computeRisks } from '../data/risks';
import Topbar from '../components/Topbar';
import CustomSelect from '../components/CustomSelect';

const METHODES = [
  'Pieux Forés',
  'Pieux CFA (Continuous Flight Auger)',
  'Pieux battus métalliques',
  'Pieux battus préfabriqués béton',
  'Pieux hélicoïdaux',
  'Pieux inclinés',
  'Pieux vibrofoncés',
  'Parois moulées',
  'Parois sécantes',
  'Jet grouting',
];

const SOL_GROUPS = [
  {
    label: 'Sols cohérents (argiles)',
    options: ['Argile gonflante','Argile marneuse','Argile molle','Argile plastique','Argile raide','Sol expansif'],
  },
  {
    label: 'Sols fins peu cohérents (limons)',
    options: ['Limon','Limon argileux','Limon sableux'],
  },
  {
    label: 'Sols granulaires',
    options: ['Grave','Grave argileuse','Grave limoneuse','Gravier','Gravier sableux','Sable argileux','Sable fin','Sable graveleux','Sable grossier','Sable limoneux','Sable moyen','Sol sablo-argileux'],
  },
  {
    label: 'Sols organiques',
    options: ['Vase','Tourbe','Sol organique'],
  },
  {
    label: 'Roches',
    options: ['Basalte','Calcaire','Calcaire fissuré','Craie','Granite','Marne','Roche altérée','Roche fracturée','Roche saine','Schiste','Tuf'],
  },
  {
    label: 'Sols géologiques spécifiques',
    options: ['Alluvions','Colluvions','Dépôts éoliens','Dépôts fluviaux','Dépôts marins'],
  },
  {
    label: 'Sols artificiels',
    options: ['Remblai compacté','Remblai non compacté'],
  },
  {
    label: 'Sols par état mécanique',
    options: ['Sol dense','Sol hétérogène','Sol latéritique','Sol meuble','Sol saturé'],
  },
];

const ENV_GROUPS = [
  {
    label: 'Urbains & Anthropiques',
    options: ['Zone agricole','Zone avec bâtiments sensibles','Zone avec infrastructures sensibles (ponts, métro)','Zone avec réseaux enterrés','Zone industrielle','Zone portuaire','Zone résidentielle','Zone rurale','Zone urbaine dense'],
  },
  {
    label: 'Naturels & Géographiques',
    options: ['Zone désertique','Zone fluviale','Zone maritime','Zone montagneuse','Zone offshore'],
  },
  {
    label: 'Hydrogéologiques',
    options: ['Zone à nappe phréatique élevée'],
  },
  {
    label: 'Géotechniques Spécifiques',
    options: ['Zone argileuse molle','Zone compressible','Zone instable (glissement)','Zone rocheuse','Zone sablonneuse'],
  },
  {
    label: 'Contraintes Opérationnelles',
    options: ['Zone à accès limité','Zone à contraintes sonores réglementées','Zone à forte contrainte planning','Zone à fortes contraintes de vibration','Zone protégée environnementalement','Zone sismique'],
  },
];

export default function FormPage({ user, onLogout, onAnalyze }) {
  const [form, setForm] = useState({ sol: '', methode: '', profondeur: '', nappe: '', diametre: '', env: '' });
  const [analyzing, setAnalyzing] = useState(false);
  const [formError, setFormError] = useState('');

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAnalyze(e) {
    e.preventDefault();
    if (!form.sol || !form.methode) {
      setFormError('Veuillez sélectionner au minimum le type de sol et la méthode de travaux.');
      return;
    }
    setFormError('');
    setAnalyzing(true);

    setTimeout(() => {
      const risks = computeRisks(
        form.sol,
        form.methode,
        form.profondeur !== '' ? parseFloat(form.profondeur) : null,
        form.nappe !== '' ? parseFloat(form.nappe) : null,
        form.diametre !== '' ? parseFloat(form.diametre) : null,
        form.env
      );
      setAnalyzing(false);
      onAnalyze(risks, form);
    }, 500);
  }

  function handleReset() {
    setForm({ sol: '', methode: '', profondeur: '', nappe: '', diametre: '', env: '' });
    setFormError('');
  }

  return (
    <div style={styles.page}>
      <Topbar user={user} onLogout={onLogout} />

      <main className="app-main">
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Analyse d'un Nouveau Chantier</h1>
          <p style={styles.pageSubtitle}>
            Renseignez les paramètres du site pour détecter les risques géotechniques applicables.
          </p>
        </div>

        {/* Form card */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            <span style={styles.cardIcon}>⚙</span>
            Paramètres du Chantier
          </div>

          <form onSubmit={handleAnalyze} noValidate>
            <div className="form-grid">
              <Field label="Type de sol">
                <CustomSelect
                  value={form.sol}
                  onChange={(v) => set('sol', v)}
                  placeholder="— Sélectionner —"
                  groups={SOL_GROUPS}
                />
              </Field>

              <Field label="Type des travaux (Méthode)">
                <CustomSelect
                  value={form.methode}
                  onChange={(v) => set('methode', v)}
                  placeholder="— Sélectionner —"
                  options={METHODES}
                />
              </Field>

              <Field label="Profondeur" hint="Profondeur totale du forage / battage">
                <div className="field-input-unit">
                  <input
                    className="field-input"
                    type="number"
                    min="1" max="100" step="0.5"
                    placeholder="ex. 20"
                    value={form.profondeur}
                    onChange={(e) => set('profondeur', e.target.value)}
                  />
                  <span className="unit-badge">m</span>
                </div>
              </Field>

              <Field label="Profondeur de la nappe" hint="Valeur faible = nappe élevée (proche de la surface)">
                <div className="field-input-unit">
                  <input
                    className="field-input"
                    type="number"
                    min="0" max="50" step="0.5"
                    placeholder="ex. 3.5"
                    value={form.nappe}
                    onChange={(e) => set('nappe', e.target.value)}
                  />
                  <span className="unit-badge">m</span>
                </div>
              </Field>

              <Field label="Diamètre" hint="Diamètre du pieu / forage">
                <div className="field-input-unit">
                  <input
                    className="field-input"
                    type="number"
                    min="100" max="3000" step="50"
                    placeholder="ex. 600"
                    value={form.diametre}
                    onChange={(e) => set('diametre', e.target.value)}
                  />
                  <span className="unit-badge">mm</span>
                </div>
              </Field>

              <Field label="Environnement">
                <CustomSelect
                  value={form.env}
                  onChange={(v) => set('env', v)}
                  placeholder="— Sélectionner —"
                  groups={ENV_GROUPS}
                />
              </Field>
            </div>

            {formError && <p style={styles.formError}>{formError}</p>}

            <div style={styles.actions}>
              <button style={styles.btnAccent} type="submit" disabled={analyzing}>
                {analyzing ? '⏳ Analyse en cours…' : '🔍 Analyser les risques'}
              </button>
              <button style={styles.btnOutline} type="button" onClick={handleReset}>
                Réinitialiser
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <label className="field-label">{label}</label>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column' },
  pageHeader: { marginBottom: 24 },
  pageTitle: { fontSize: 22, fontWeight: 700, color: '#1a3a5c', margin: 0 },
  pageSubtitle: { fontSize: 14, color: '#637488', marginTop: 4 },
  card: {
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #dde2ea',
    boxShadow: '0 2px 12px rgba(0,0,0,.08)',
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 13, fontWeight: 700, color: '#1a3a5c',
    textTransform: 'uppercase', letterSpacing: '0.8px',
    marginBottom: 20, paddingBottom: 12, borderBottom: '2px solid #f0f2f5',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  cardIcon: {
    width: 26, height: 26, background: '#1a3a5c', color: '#fff',
    borderRadius: 6, display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 13,
  },
  formError: { color: '#c0392b', fontSize: 13, marginTop: 12, marginBottom: 0 },
  actions: { display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' },
  btnAccent: {
    flex: 1,
    minWidth: 160,
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #e67e22, #f39c12)',
    color: '#fff', border: 'none', borderRadius: 8,
    fontSize: 15, fontWeight: 700, cursor: 'pointer',
  },
  btnOutline: {
    padding: '14px 20px',
    background: 'transparent', color: '#637488',
    border: '1.5px solid #dde2ea', borderRadius: 8,
    fontSize: 15, fontWeight: 600, cursor: 'pointer',
  },
};

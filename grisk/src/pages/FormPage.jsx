import { useState } from 'react';
import { computeRisks } from '../data/risks';
import Topbar from '../components/Topbar';
import CustomSelect from '../components/CustomSelect';
import DrillingRig from '../components/DrillingRig';

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

// ── Icons ────────────────────────────────────────────────
function SoilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      <line x1="3" y1="14" x2="21" y2="14" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function ExcavatorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="14" width="8" height="6" rx="1" />
      <path d="M10 17h4l3-6h3" />
      <path d="M17 11l2-5" />
      <circle cx="6" cy="20" r="1" fill="#f57c00" />
    </svg>
  );
}
function RulerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 3L3 21" /><path d="M10 3H3v7" />
      <line x1="3" y1="7" x2="6" y2="7" /><line x1="3" y1="11" x2="5" y2="11" />
    </svg>
  );
}
function WaterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v10" /><path d="M8 18a4 4 0 0 0 8 0c0-4-4-8-4-8s-4 4-4 8z" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  );
}
function DiameterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
  );
}
function CityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="7" height="12" /><rect x="14" y="5" width="7" height="16" />
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="7" y1="9" x2="7" y2="5" /><line x1="7" y1="5" x2="14" y2="5" />
    </svg>
  );
}
function GearHexIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2l10.39 6v12L14 26 3.61 20V8z" stroke="#f57c00" strokeWidth="1.5" fill="rgba(245,124,0,0.1)" />
      <circle cx="14" cy="14" r="4" stroke="#f57c00" strokeWidth="1.5" />
      <line x1="14" y1="8" x2="14" y2="10" stroke="#f57c00" strokeWidth="1.5" />
      <line x1="14" y1="18" x2="14" y2="20" stroke="#f57c00" strokeWidth="1.5" />
      <line x1="8" y1="14" x2="10" y2="14" stroke="#f57c00" strokeWidth="1.5" />
      <line x1="18" y1="14" x2="20" y2="14" stroke="#f57c00" strokeWidth="1.5" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function ResetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export default function FormPage({ user, onLogout, onAnalyze, onMenu }) {
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
        form.sol, form.methode,
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
    <div style={s.page}>
      <style>{`
        .dark-input::placeholder { color: rgba(255,255,255,0.28); }
        .dark-input:focus { outline: none; border-color: rgba(245,124,0,0.55) !important; }
      `}</style>

      <Topbar user={user} onLogout={onLogout} onMenu={onMenu} />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroText}>
          <h1 style={s.heroTitle}>
            Analyse d'un <span style={s.orange}>Nouveau Chantier</span>
          </h1>
          <p style={s.heroSub}>
            Renseignez les paramètres du site pour détecter<br />les risques géotechniques applicables.
          </p>
          <div style={s.heroUnderline} />
        </div>
        <div style={s.heroRig}>
          <DrillingRig />
        </div>
      </div>

      {/* Form card */}
      <main style={s.main}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <GearHexIcon />
            <span style={s.cardTitle}>PARAMÈTRES DU CHANTIER</span>
          </div>
          <div style={s.cardDivider} />

          <form onSubmit={handleAnalyze} noValidate>
            <div className="form-grid">
              <DarkField label="TYPE DE SOL" icon={<SoilIcon />}>
                <CustomSelect
                  value={form.sol}
                  onChange={(v) => set('sol', v)}
                  placeholder="Sélectionner le type de sol"
                  groups={SOL_GROUPS}
                />
              </DarkField>

              <DarkField label="TYPE DES TRAVAUX (MÉTHODE)" icon={<ExcavatorIcon />}>
                <CustomSelect
                  value={form.methode}
                  onChange={(v) => set('methode', v)}
                  placeholder="Sélectionner la méthode"
                  options={METHODES}
                />
              </DarkField>

              <DarkField label="PROFONDEUR" hint="Profondeur totale du forage / battage">
                <div style={s.inputUnitWrap}>
                  <span style={s.inputFieldIcon}><RulerIcon /></span>
                  <input
                    className="dark-input"
                    style={s.darkInput}
                    type="number"
                    min="1" max="100" step="0.5"
                    placeholder="ex. 20"
                    value={form.profondeur}
                    onChange={(e) => set('profondeur', e.target.value)}
                  />
                  <span style={s.unitBadge}>m</span>
                </div>
              </DarkField>

              <DarkField label="PROFONDEUR DE LA NAPPE" hint="Valeur faible = nappe élevée (proche de la surface)">
                <div style={s.inputUnitWrap}>
                  <span style={s.inputFieldIcon}><WaterIcon /></span>
                  <input
                    className="dark-input"
                    style={s.darkInput}
                    type="number"
                    min="0" max="50" step="0.5"
                    placeholder="ex. 3.5"
                    value={form.nappe}
                    onChange={(e) => set('nappe', e.target.value)}
                  />
                  <span style={s.unitBadge}>m</span>
                </div>
              </DarkField>

              <DarkField label="DIAMÈTRE" hint="Diamètre du pieu / forage">
                <div style={s.inputUnitWrap}>
                  <span style={s.inputFieldIcon}><DiameterIcon /></span>
                  <input
                    className="dark-input"
                    style={s.darkInput}
                    type="number"
                    min="100" max="3000" step="50"
                    placeholder="ex. 600"
                    value={form.diametre}
                    onChange={(e) => set('diametre', e.target.value)}
                  />
                  <span style={s.unitBadge}>mm</span>
                </div>
              </DarkField>

              <DarkField label="ENVIRONNEMENT" icon={<CityIcon />}>
                <CustomSelect
                  value={form.env}
                  onChange={(v) => set('env', v)}
                  placeholder="Sélectionner l'environnement"
                  groups={ENV_GROUPS}
                />
              </DarkField>
            </div>

            {formError && <p style={s.formError}>{formError}</p>}

            <div style={s.actions}>
              <button style={s.btnAccent} type="submit" disabled={analyzing}>
                <SearchIcon />
                {analyzing ? 'Analyse en cours…' : 'ANALYSER LES RISQUES'}
                {!analyzing && <span style={s.btnArrow}>→</span>}
              </button>
              <button style={s.btnOutline} type="button" onClick={handleReset}>
                <ResetIcon />
                RÉINITIALISER
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom decoration */}
      <div style={s.bottomDecor}>///</div>
    </div>
  );
}

function DarkField({ label, hint, icon, children }) {
  return (
    <div style={df.wrap}>
      <label style={df.label}>{label}</label>
      {children}
      {hint && <span style={df.hint}>{hint}</span>}
    </div>
  );
}

const df = {
  wrap: { display: 'flex', flexDirection: 'column', gap: 0 },
  label: {
    display: 'block',
    fontSize: 11,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.7px',
    marginBottom: 8,
  },
  hint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.38)',
    marginTop: 5,
    lineHeight: 1.4,
  },
};

const s = {
  page: {
    minHeight: '100vh',
    background: '#06111f',
    display: 'flex',
    flexDirection: 'column',
  },
  orange: { color: '#f57c00' },

  // Hero
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
  heroText: { flex: 1, minWidth: 0 },
  heroTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
    lineHeight: 1.3,
    fontFamily: 'inherit',
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 8,
    lineHeight: 1.6,
  },
  heroUnderline: {
    width: 36,
    height: 3,
    background: '#f57c00',
    borderRadius: 2,
    marginTop: 14,
  },
  heroRig: {
    width: 130,
    flexShrink: 0,
    opacity: 0.85,
  },

  // Main
  main: {
    flex: 1,
    padding: '16px 16px 32px',
    maxWidth: 900,
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },

  // Card
  card: {
    background: '#0d1e30',
    borderRadius: 16,
    border: '1px solid rgba(100,150,255,0.12)',
    padding: '20px 20px 24px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '0.9px',
  },
  cardDivider: {
    height: 2,
    background: 'linear-gradient(to right, #f57c00, rgba(245,124,0,0))',
    borderRadius: 1,
    margin: '14px 0 20px',
  },

  // Dark inputs
  inputUnitWrap: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.05)',
    border: '1.5px solid rgba(100,150,255,0.2)',
    borderRadius: 10,
    padding: '0 12px',
    gap: 10,
  },
  inputFieldIcon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  darkInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: 15,
    padding: '14px 0',
    fontFamily: 'inherit',
    width: '100%',
    MozAppearance: 'textfield',
  },
  unitBadge: {
    fontSize: 11,
    fontWeight: 700,
    color: '#4a8aff',
    background: 'rgba(74,138,255,0.1)',
    padding: '3px 8px',
    borderRadius: 5,
    flexShrink: 0,
    lineHeight: 1,
  },

  formError: {
    color: '#ff6b6b',
    fontSize: 13,
    marginTop: 14,
  },

  // Actions
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 24,
  },
  btnAccent: {
    width: '100%',
    padding: '17px 24px',
    background: 'linear-gradient(135deg, #e65c00, #f9a020)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.08em',
    boxShadow: '0 4px 20px rgba(230,92,0,0.38)',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnArrow: {
    marginLeft: 4,
    fontSize: 17,
  },
  btnOutline: {
    width: '100%',
    padding: '15px 24px',
    background: 'rgba(255,255,255,0.04)',
    color: '#4a8aff',
    border: '1.5px solid rgba(74,138,255,0.3)',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.08em',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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

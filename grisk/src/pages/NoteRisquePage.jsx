import { useState, useRef } from 'react';
import Topbar from '../components/Topbar';
import CustomSelect from '../components/CustomSelect';
import DrillingRig from '../components/DrillingRig';

const BACKEND = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const GOUVERNORATS = [
  'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa',
  'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia',
  'Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid',
  'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan',
];

const METHODES = [
  'Pieux Forés', 'Pieux CFA (Continuous Flight Auger)', 'Pieux battus métalliques',
  'Pieux battus préfabriqués béton', 'Pieux hélicoïdaux', 'Pieux inclinés',
  'Pieux vibrofoncés', 'Parois moulées', 'Parois sécantes', 'Jet grouting',
];

const SOL_GROUPS = [
  { label: 'Sols cohérents (argiles)', options: ['Argile gonflante','Argile marneuse','Argile molle','Argile plastique','Argile raide','Sol expansif'] },
  { label: 'Sols fins peu cohérents (limons)', options: ['Limon','Limon argileux','Limon sableux'] },
  { label: 'Sols granulaires', options: ['Grave','Grave argileuse','Grave limoneuse','Gravier','Gravier sableux','Sable argileux','Sable fin','Sable graveleux','Sable grossier','Sable limoneux','Sable moyen','Sol sablo-argileux'] },
  { label: 'Sols organiques', options: ['Vase','Tourbe','Sol organique'] },
  { label: 'Roches', options: ['Basalte','Calcaire','Calcaire fissuré','Craie','Granite','Marne','Roche altérée','Roche fracturée','Roche saine','Schiste','Tuf'] },
  { label: 'Sols géologiques spécifiques', options: ['Alluvions','Colluvions','Dépôts éoliens','Dépôts fluviaux','Dépôts marins'] },
  { label: 'Sols artificiels', options: ['Remblai compacté','Remblai non compacté'] },
  { label: 'Sols par état mécanique', options: ['Sol dense','Sol hétérogène','Sol latéritique','Sol meuble','Sol saturé'] },
];

const ENV_GROUPS = [
  { label: 'Urbains & Anthropiques', options: ['Zone agricole','Zone avec bâtiments sensibles','Zone avec infrastructures sensibles (ponts, métro)','Zone avec réseaux enterrés','Zone industrielle','Zone portuaire','Zone résidentielle','Zone rurale','Zone urbaine dense'] },
  { label: 'Naturels & Géographiques', options: ['Zone désertique','Zone fluviale','Zone maritime','Zone montagneuse','Zone offshore'] },
  { label: 'Hydrogéologiques', options: ['Zone à nappe phréatique élevée'] },
  { label: 'Géotechniques Spécifiques', options: ['Zone argileuse molle','Zone compressible','Zone instable (glissement)','Zone rocheuse','Zone sablonneuse'] },
  { label: 'Contraintes Opérationnelles', options: ['Zone à accès limité','Zone à contraintes sonores réglementées','Zone à forte contrainte planning','Zone à fortes contraintes de vibration','Zone protégée environnementalement','Zone sismique'] },
];

// ── Icons ────────────────────────────────────────────────
function SoilIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function ExcavatorIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="14" width="8" height="6" rx="1"/><path d="M10 17h4l3-6h3"/><path d="M17 11l2-5"/><circle cx="6" cy="20" r="1" fill="#4a8aff"/></svg>;
}
function RulerIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3L3 21"/><path d="M10 3H3v7"/><line x1="3" y1="7" x2="6" y2="7"/><line x1="3" y1="11" x2="5" y2="11"/></svg>;
}
function WaterIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M8 18a4 4 0 0 0 8 0c0-4-4-8-4-8s-4 4-4 8z"/></svg>;
}
function DiameterIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><line x1="4" y1="20" x2="20" y2="4"/></svg>;
}
function CityIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="7" height="12"/><rect x="14" y="5" width="7" height="16"/><line x1="3" y1="21" x2="21" y2="21"/><line x1="7" y1="9" x2="7" y2="5"/><line x1="7" y1="5" x2="14" y2="5"/></svg>;
}
function MapPinIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function NoteTextIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
function CameraIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a8aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
}
function CheckIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function SaveIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
}
function ResetIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
}
function GearHexIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2l10.39 6v12L14 26 3.61 20V8z" stroke="#4a8aff" strokeWidth="1.5" fill="rgba(74,138,255,0.1)"/>
      <circle cx="14" cy="14" r="4" stroke="#4a8aff" strokeWidth="1.5"/>
      <line x1="14" y1="8" x2="14" y2="10" stroke="#4a8aff" strokeWidth="1.5"/>
      <line x1="14" y1="18" x2="14" y2="20" stroke="#4a8aff" strokeWidth="1.5"/>
      <line x1="8" y1="14" x2="10" y2="14" stroke="#4a8aff" strokeWidth="1.5"/>
      <line x1="18" y1="14" x2="20" y2="14" stroke="#4a8aff" strokeWidth="1.5"/>
    </svg>
  );
}

const EMPTY = { sol: '', methode: '', profondeur: '', nappe: '', diametre: '', env: '', gouvernorat: '', recommandation: '' };

export default function NoteRisquePage({ user, onLogout, onBack, onGoHistory }) {
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  function handleReset() {
    setForm(EMPTY);
    removePhoto();
    setError('');
    setSuccess(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.gouvernorat) {
      setError('Le gouvernorat est requis.');
      return;
    }
    setError('');
    setSubmitting(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
    fd.append('author', user || 'Anonyme');
    if (photo) fd.append('photo', photo);

    try {
      const res = await fetch(`${BACKEND}/api/risques`, { method: 'POST', body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Erreur ${res.status}`);
      }
      setSuccess(true);
      handleReset();
      setTimeout(() => { setSuccess(false); if (onGoHistory) onGoHistory(); }, 2500);
    } catch (err) {
      setError(err.message || 'Erreur de connexion au serveur.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={s.page}>
      <style>{`
        .note-input::placeholder { color: rgba(255,255,255,0.28); }
        .note-input:focus { outline: none; }
        .note-textarea::placeholder { color: rgba(255,255,255,0.28); }
        .note-textarea:focus { outline: none; }
        .note-input::-webkit-outer-spin-button,
        .note-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .note-input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <Topbar user={user} onLogout={onLogout} onMenu={onBack} />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroText}>
          <h1 style={s.heroTitle}>
            Enregistrement d'un <span style={s.blue}>Nouveau Risque</span>
          </h1>
          <p style={s.heroSub}>
            Renseignez les informations du risque rencontré sur le terrain.
          </p>
          <div style={s.heroUnderline} />
        </div>
        <div style={s.heroRig}>
          <DrillingRig />
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div style={s.successBanner}>
          <CheckIcon />
          Risque enregistré avec succès dans la base de données.
        </div>
      )}

      <main style={s.main}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <GearHexIcon />
            <span style={s.cardTitle}>PARAMÈTRES DU RISQUE</span>
          </div>
          <div style={{ ...s.cardDivider, background: 'linear-gradient(to right, #4a8aff, rgba(74,138,255,0))' }} />

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* Type de sol */}
              <NoteField label="TYPE DE SOL">
                <CustomSelect value={form.sol} onChange={v => set('sol', v)} placeholder="Sélectionner le type de sol" groups={SOL_GROUPS} icon={<SoilIcon/>}/>
              </NoteField>

              {/* Méthode */}
              <NoteField label="TYPE DES TRAVAUX (MÉTHODE)">
                <CustomSelect value={form.methode} onChange={v => set('methode', v)} placeholder="Sélectionner la méthode" options={METHODES} icon={<ExcavatorIcon/>}/>
              </NoteField>

              {/* Profondeur */}
              <NoteField label="PROFONDEUR" hint="Profondeur totale du forage / battage">
                <div style={s.inputUnitWrap}>
                  <span style={s.fieldIco}><RulerIcon/></span>
                  <input className="note-input" style={s.darkInput} type="number" min="1" max="100" step="0.5" placeholder="ex. 20" value={form.profondeur} onChange={e => set('profondeur', e.target.value)}/>
                  <span style={s.unitBadge}>m</span>
                </div>
              </NoteField>

              {/* Nappe */}
              <NoteField label="PROFONDEUR DE LA NAPPE" hint="Valeur faible = nappe élevée (proche de la surface)">
                <div style={s.inputUnitWrap}>
                  <span style={s.fieldIco}><WaterIcon/></span>
                  <input className="note-input" style={s.darkInput} type="number" min="0" max="50" step="0.5" placeholder="ex. 3.5" value={form.nappe} onChange={e => set('nappe', e.target.value)}/>
                  <span style={s.unitBadge}>m</span>
                </div>
              </NoteField>

              {/* Diamètre */}
              <NoteField label="DIAMÈTRE" hint="Diamètre du pieu / forage">
                <div style={s.inputUnitWrap}>
                  <span style={s.fieldIco}><DiameterIcon/></span>
                  <input className="note-input" style={s.darkInput} type="number" min="100" max="3000" step="50" placeholder="ex. 600" value={form.diametre} onChange={e => set('diametre', e.target.value)}/>
                  <span style={s.unitBadge}>mm</span>
                </div>
              </NoteField>

              {/* Environnement */}
              <NoteField label="ENVIRONNEMENT">
                <CustomSelect value={form.env} onChange={v => set('env', v)} placeholder="Sélectionner l'environnement" groups={ENV_GROUPS} icon={<CityIcon/>}/>
              </NoteField>
            </div>

            {/* Separator */}
            <div style={s.sectionSep}>
              <div style={s.sepLine}/>
              <span style={s.sepLabel}>Informations de localisation et notes</span>
              <div style={s.sepLine}/>
            </div>

            {/* Gouvernorat */}
            <NoteField label="GOUVERNORAT *" style={{ marginBottom: 20 }}>
              <CustomSelect value={form.gouvernorat} onChange={v => set('gouvernorat', v)} placeholder="Sélectionner le gouvernorat" options={GOUVERNORATS} icon={<MapPinIcon/>}/>
            </NoteField>

            {/* Recommandation */}
            <NoteField label="RECOMMANDATION" hint="Décrivez les mesures préventives ou correctives recommandées" style={{ marginBottom: 20 }}>
              <div style={s.textareaWrap}>
                <span style={{ ...s.fieldIco, alignSelf: 'flex-start', paddingTop: 14 }}><NoteTextIcon/></span>
                <textarea
                  className="note-textarea"
                  style={s.textarea}
                  rows={4}
                  placeholder="Décrivez vos recommandations pour ce risque…"
                  value={form.recommandation}
                  onChange={e => set('recommandation', e.target.value)}
                />
              </div>
            </NoteField>

            {/* Photo */}
            <NoteField label="PHOTO DU RISQUE" hint="Optionnel — JPG, PNG ou WebP, max 10 Mo" style={{ marginBottom: 0 }}>
              {!photoPreview ? (
                <button type="button" style={s.photoBtn} onClick={() => fileRef.current?.click()}>
                  <CameraIcon/>
                  <span>Choisir une photo</span>
                </button>
              ) : (
                <div style={s.photoPreviewWrap}>
                  <img src={photoPreview} alt="aperçu" style={s.photoPreviewImg}/>
                  <button type="button" style={s.photoRemoveBtn} onClick={removePhoto}>✕ Supprimer</button>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto}/>
            </NoteField>

            {error && <p style={s.formError}>{error}</p>}

            <div style={s.actions}>
              <button style={s.btnAccent} type="submit" disabled={submitting}>
                <SaveIcon/>
                {submitting ? 'Enregistrement…' : 'ENREGISTRER LE RISQUE'}
              </button>
              <button style={s.btnOutline} type="button" onClick={handleReset}>
                <ResetIcon/>
                RÉINITIALISER
              </button>
            </div>
          </form>
        </div>
      </main>

      <div style={s.bottomDecor}>///</div>
    </div>
  );
}

function NoteField({ label, hint, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <label style={nf.label}>{label}</label>
      {children}
      {hint && <span style={nf.hint}>{hint}</span>}
    </div>
  );
}
const nf = {
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 8 },
  hint: { fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 5, lineHeight: 1.4 },
};

const s = {
  page: { minHeight: '100vh', background: '#06111f', display: 'flex', flexDirection: 'column' },
  blue: { color: '#4a8aff' },

  hero: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 24px 8px', maxWidth: 900, margin: '0 auto', width: '100%', boxSizing: 'border-box', gap: 16 },
  heroText: { flex: 1, minWidth: 0 },
  heroTitle: { fontSize: 24, fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.3, fontFamily: 'inherit' },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 8, lineHeight: 1.6 },
  heroUnderline: { width: 36, height: 3, background: '#4a8aff', borderRadius: 2, marginTop: 14 },
  heroRig: { width: 130, flexShrink: 0, opacity: 0.85 },

  successBanner: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(40,200,100,0.12)', border: '1px solid rgba(40,200,100,0.3)',
    borderRadius: 10, padding: '12px 20px',
    color: '#4cdb8a', fontSize: 14, fontWeight: 600,
    maxWidth: 900, margin: '0 auto 0', width: '100%', boxSizing: 'border-box',
    paddingLeft: 24, paddingRight: 24,
  },

  main: { flex: 1, padding: '16px 16px 32px', maxWidth: 900, margin: '0 auto', width: '100%', boxSizing: 'border-box' },

  card: { background: '#0d1e30', borderRadius: 16, border: '1px solid rgba(100,150,255,0.12)', padding: '20px 20px 24px' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: 10 },
  cardTitle: { fontSize: 13, fontWeight: 700, color: '#ffffff', letterSpacing: '0.9px' },
  cardDivider: { height: 2, borderRadius: 1, margin: '14px 0 20px' },

  inputUnitWrap: { display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(100,150,255,0.2)', borderRadius: 10, padding: '0 12px', gap: 10 },
  fieldIco: { display: 'flex', alignItems: 'center', flexShrink: 0 },
  darkInput: { flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: 15, padding: '14px 0', fontFamily: 'inherit', width: '100%' },
  unitBadge: { fontSize: 11, fontWeight: 700, color: '#4a8aff', background: 'rgba(74,138,255,0.1)', padding: '3px 8px', borderRadius: 5, flexShrink: 0, lineHeight: 1 },

  sectionSep: { display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 20px' },
  sepLine: { flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' },
  sepLabel: { fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.6px', whiteSpace: 'nowrap' },

  textareaWrap: { display: 'flex', alignItems: 'flex-start', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(100,150,255,0.2)', borderRadius: 10, padding: '0 12px', gap: 10 },
  textarea: { flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: 15, padding: '14px 0', fontFamily: 'inherit', resize: 'vertical', minHeight: 90, lineHeight: 1.5 },

  photoBtn: { display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: '1.5px dashed rgba(74,138,255,0.35)', borderRadius: 10, padding: '16px 20px', color: '#4a8aff', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' },
  photoPreviewWrap: { display: 'flex', flexDirection: 'column', gap: 8 },
  photoPreviewImg: { width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 10, border: '1.5px solid rgba(74,138,255,0.2)' },
  photoRemoveBtn: { background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', borderRadius: 8, color: '#ff6b6b', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '7px 14px', fontFamily: 'inherit', alignSelf: 'flex-start' },

  formError: { color: '#ff6b6b', fontSize: 13, marginTop: 14 },
  actions: { display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 },
  btnAccent: { width: '100%', padding: '17px 24px', background: 'linear-gradient(135deg, #1a5aff, #4a8aff)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.08em', boxShadow: '0 4px 20px rgba(74,138,255,0.3)', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 },
  btnOutline: { width: '100%', padding: '15px 24px', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.08em', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 },

  bottomDecor: { textAlign: 'center', color: '#4a8aff', fontSize: 18, letterSpacing: 6, padding: '12px 0 20px', opacity: 0.7 },
};

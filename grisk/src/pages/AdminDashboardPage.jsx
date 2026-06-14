import { useState, useEffect } from 'react';

/* ── Utility: responsive hook ───────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

/* ── Sidebar nav icons ──────────────────────────────────── */
const Ico = ({ d, d2 }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d.map((p, i) => <path key={i} d={p} />)}
    {d2 && d2.map((p, i) => <line key={i} x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]} />)}
  </svg>
);

function IcoHome()        { return <Ico d={['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10']} />; }
function IcoBarChart()    { return <Ico d={[]} d2={[[18,20,18,10],[12,20,12,4],[6,20,6,14],[2,20,22,20]]} />; }
function IcoTriangle()    { return <Ico d={['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z']} d2={[[12,9,12,13],[12,17,12.01,17]]} />; }
function IcoGear()        { return <Ico d={['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z','M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z']} />; }
function IcoUser()        { return <Ico d={['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2','M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z']} />; }
function IcoDoc()         { return <Ico d={['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z','M14 2v6h6']} d2={[[16,13,8,13],[16,17,8,17]]} />; }
function IcoSliders()     { return <Ico d={[]} d2={[[4,21,4,14],[4,10,4,3],[12,21,12,12],[12,8,12,3],[20,21,20,16],[20,12,20,3],[1,14,7,14],[9,8,15,8],[17,16,23,16]]} />; }
function IcoLogout()      { return <Ico d={['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4','M16 17l5-5-5-5']} d2={[[21,12,9,12]]} />; }
function IcoMenu()        { return <Ico d={[]} d2={[[3,12,21,12],[3,6,21,6],[3,18,21,18]]} />; }
function IcoBell()        { return <Ico d={['M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9','M13.73 21a2 2 0 0 1-3.46 0']} />; }
function IcoChevron()     { return <Ico d={['M6 9l6 6 6-6']} />; }
function IcoEye()         { return <Ico d={['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z','M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z']} />; }
function IcoClose()       { return <Ico d={[]} d2={[[18,6,6,18],[6,6,18,18]]} />; }

/* ── Large stat icons (white on coloured bg) ────────────── */
function IcoStatChart()   { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>; }
function IcoStatFolder()  { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>; }
function IcoStatAlert()   { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function IcoStatShield()  { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }

/* ── Level badge ────────────────────────────────────────── */
const BADGE = {
  'Élevé':       { bg: '#fff3e0', color: '#e65c00', border: '#ffcc80' },
  'Moyen':       { bg: '#e3f2fd', color: '#1565c0', border: '#90caf9' },
  'Faible':      { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
  'Très faible': { bg: '#f5f5f5', color: '#616161', border: '#e0e0e0' },
};
function LevelBadge({ niveau }) {
  const st = BADGE[niveau] || BADGE['Faible'];
  return (
    <span style={{ padding: '3px 11px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
      {niveau}
    </span>
  );
}

/* ── Donut Chart ────────────────────────────────────────── */
const DONUT_COLORS = {
  'Élevé':      '#f57c00',
  'Moyen':      '#1a3a5c',
  'Faible':     '#90bcd4',
  'Très faible':'#c8c8c8',
};

function DonutChart({ data }) {
  const cx = 85, cy = 85, r = 62, sw = 24;
  function pt(deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function arcD(s, e) {
    if (e - s >= 359.9) e = s + 359.5; // avoid full-circle degenerate path
    const a = pt(s), b = pt(e);
    const large = e - s > 180 ? 1 : 0;
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
  }
  if (!data || data.length === 0) {
    return (
      <svg width="170" height="170" viewBox="0 0 170 170">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e0e0e0" strokeWidth={sw} />
      </svg>
    );
  }
  const G = data.length > 1 ? 3 : 0;
  let angle = 0;
  const segs = data.map(d => {
    const color = DONUT_COLORS[d.level] || '#ccc';
    const sweep = d.pct / 100 * 360;
    const out = { color, start: angle + G / 2, end: angle + sweep - G / 2 };
    angle += sweep;
    return out;
  });
  return (
    <svg width="170" height="170" viewBox="0 0 170 170">
      {segs.map((s, i) => (
        <path key={i} d={arcD(s.start, s.end)} fill="none" stroke={s.color} strokeWidth={sw} strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* ── Line Chart ─────────────────────────────────────────── */
function LineChart({ data }) {
  if (!data || data.length === 0) return <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 13 }}>Aucune donnée</div>;
  const vals   = data.map(d => d.count);
  const months = data.map(d => d.month);
  const maxVal = Math.max(...vals, 10);
  const W = 440, H = 170, pL = 36, pR = 16, pT = 14, pB = 34;
  const cW = W - pL - pR, cH = H - pT - pB;
  const xv = i => pL + (vals.length > 1 ? (i / (vals.length - 1)) * cW : cW / 2);
  const yv = v => pT + (1 - v / (maxVal * 1.15)) * cH;
  const pts = vals.map((v, i) => `${xv(i).toFixed(1)},${yv(v).toFixed(1)}`).join(' ');
  const yTicks = [0, Math.round(maxVal * 0.25), Math.round(maxVal * 0.5), Math.round(maxVal * 0.75), Math.round(maxVal)];
  const area = [
    `M ${xv(0).toFixed(1)},${yv(vals[0]).toFixed(1)}`,
    ...vals.slice(1).map((v, i) => `L ${xv(i + 1).toFixed(1)},${yv(v).toFixed(1)}`),
    `L ${xv(vals.length - 1).toFixed(1)},${(pT + cH).toFixed(1)}`,
    `L ${xv(0).toFixed(1)},${(pT + cH).toFixed(1)} Z`,
  ].join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      {yTicks.map(v => (
        <g key={v}>
          <line x1={pL} y1={yv(v)} x2={W - pR} y2={yv(v)} stroke="#f0f0f0" strokeWidth="1" />
          <text x={pL - 6} y={yv(v) + 4} textAnchor="end" fontSize="10" fill="#bbb">{v}</text>
        </g>
      ))}
      <path d={area} fill="rgba(245,124,0,0.07)" />
      <polyline points={pts} fill="none" stroke="#f57c00" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {vals.map((v, i) => <circle key={i} cx={xv(i)} cy={yv(v)} r="4.5" fill="#f57c00" />)}
      {months.map((m, i) => (
        <text key={m} x={xv(i)} y={H - pB + 20} textAnchor="middle" fontSize="11" fill="#bbb">{m}</text>
      ))}
    </svg>
  );
}

/* ── Loading skeleton ───────────────────────────────────── */
function Skeleton({ h = 20, w = '100%', r = 6 }) {
  return (
    <div style={{ height: h, width: w, borderRadius: r, background: 'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function AdminDashboardPage({ onLogout }) {
  const w = useWindowWidth();
  const isMobile  = w < 768;
  const isTablet  = w < 1100;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav]     = useState('dashboard');

  // ── Data ──────────────────────────────────────────────
  const [stats,        setStats]        = useState(null);
  const [monthly,      setMonthly]      = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [recent,       setRecent]       = useState([]);
  const [frequent,     setFrequent]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [s, m, d, r, f] = await Promise.all([
          fetch('/api/admin/stats').then(x => x.json()),
          fetch('/api/admin/monthly').then(x => x.json()),
          fetch('/api/admin/distribution').then(x => x.json()),
          fetch('/api/admin/recent').then(x => x.json()),
          fetch('/api/admin/frequent').then(x => x.json()),
        ]);
        if (!cancelled) {
          setStats(s);
          setMonthly(m);
          setDistribution(d);
          setRecent(r);
          setFrequent(f);
          setError(null);
        }
      } catch {
        if (!cancelled) setError('Impossible de charger les données. Vérifiez la connexion au serveur.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // ── Nav items ─────────────────────────────────────────
  const navItems = [
    { key: 'dashboard',    label: 'Tableau de bord', Icon: IcoHome },
    { key: 'analyses',     label: 'Analyses',        Icon: IcoBarChart },
    { key: 'risques',      label: 'Risques',         Icon: IcoTriangle },
    { key: 'regles',       label: 'Règles',          Icon: IcoGear },
    { key: 'utilisateurs', label: 'Utilisateurs',    Icon: IcoUser },
    { key: 'rapports',     label: 'Rapports',        Icon: IcoDoc },
    { key: 'parametres',   label: 'Paramètres',      Icon: IcoSliders },
  ];

  const statCards = [
    { label: 'Analyses totales', key: 'analyses', gKey: 'analyses_growth', Icon: IcoStatChart,  bg: '#1a3a5c' },
    { label: 'Projets',          key: 'projets',  gKey: 'projets_growth',  Icon: IcoStatFolder, bg: '#f57c00' },
    { label: 'Risques détectés', key: 'risques',  gKey: 'risques_growth',  Icon: IcoStatAlert,  bg: '#1a3a5c' },
    { label: 'Risque élevé',     key: 'risques_eleves', gKey: 'eleves_growth', Icon: IcoStatShield, bg: '#f57c00' },
  ];

  function closeSidebar() { setSidebarOpen(false); }

  // ─── Render ─────────────────────────────────────────
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '"Segoe UI", Arial, sans-serif', overflow: 'hidden', background: '#f4f6f9' }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        * { box-sizing: border-box; }
      `}</style>

      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div onClick={closeSidebar} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 299 }} />
      )}

      {/* ── Sidebar ───────────────────────────────────── */}
      <aside style={{
        width: 232, background: '#0d1e35', display: 'flex', flexDirection: 'column', flexShrink: 0,
        ...(isMobile ? {
          position: 'fixed', top: 0, left: 0, height: '100%', zIndex: 300,
          transition: 'transform 0.25s ease',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        } : {}),
      }}>
        {/* Logo row */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: 24, fontWeight: 900, fontFamily: '"Arial Black", Arial, sans-serif', letterSpacing: -1 }}>
            <span style={{ color: '#f57c00' }}>G</span><span style={{ color: '#fff' }}>RISK</span>
          </span>
          {isMobile && (
            <button onClick={closeSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex', padding: 4 }}>
              <IcoClose />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '14px 14px 14px 0', overflowY: 'auto' }}>
          {navItems.map(({ key, label, Icon }) => {
            const active = activeNav === key;
            return (
              <button key={key} onClick={() => { setActiveNav(key); if (isMobile) closeSidebar(); }} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '11px 18px',
                background: active ? '#f57c00' : 'transparent', border: 'none', cursor: 'pointer',
                color: active ? '#fff' : 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: active ? 600 : 400,
                borderRadius: active ? '0 28px 28px 0' : 0, textAlign: 'left', marginBottom: 2,
                transition: 'background 0.15s, color 0.15s',
              }}>
                <Icon />{label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <button onClick={onLogout} style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 18px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.6)', fontSize: 14, textAlign: 'left',
          }}>
            <IcoLogout />Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main area ─────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Top bar */}
        <header style={{
          background: '#fff', borderBottom: '1px solid #e8eaed',
          padding: '0 16px 0 20px', height: 64, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
        }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', borderRadius: 8 }}>
            <IcoMenu />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: isMobile ? 16 : 19, fontWeight: 700, color: '#1a1a2e', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Tableau de bord</div>
            {!isMobile && <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Bienvenue sur votre espace de gestion GRISK</div>}
          </div>
          {!isMobile && (
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', color: '#777' }}>
              <IcoBell />
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1a3a5c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, flexShrink: 0 }}>AD</div>
            {!isMobile && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>Admin</div>
                <div style={{ fontSize: 11, color: '#999' }}>Administrateur</div>
              </div>
            )}
            {!isMobile && <IcoChevron />}
          </div>
        </header>

        {/* Scrollable content */}
        <main style={{ flex: 1, overflow: 'auto', padding: isMobile ? 12 : 20 }}>

          {/* Error */}
          {error && (
            <div style={{ background: '#fff3e0', border: '1px solid #ffcc80', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#e65c00', fontSize: 13 }}>
              {error}
            </div>
          )}

          {/* ── Stat cards ────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 10 : 16, marginBottom: isMobile ? 12 : 18 }}>
            {statCards.map(({ label, key, gKey, Icon, bg }) => (
              <div key={key} style={{ background: '#fff', borderRadius: 12, padding: isMobile ? '14px 12px' : '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 14 }}>
                <div style={{ width: isMobile ? 42 : 50, height: isMobile ? 42 : 50, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: isMobile ? 11 : 12, color: '#999', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
                  {loading
                    ? <Skeleton h={28} w={60} />
                    : <div style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, color: '#1a1a2e', lineHeight: 1 }}>{stats ? stats[key] : '—'}</div>
                  }
                  {loading
                    ? <Skeleton h={13} w={80} r={4} />
                    : <div style={{ fontSize: 11, color: '#f57c00', marginTop: 4 }}>+{stats ? stats[gKey] : 0} ce mois</div>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* ── Charts row ────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 380px', gap: isMobile ? 10 : 16, marginBottom: isMobile ? 12 : 18 }}>
            {/* Line chart */}
            <div style={{ background: '#fff', borderRadius: 12, padding: isMobile ? '14px 12px 10px' : '20px 20px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', marginBottom: 12 }}>Risques notés par mois</div>
              {loading ? <Skeleton h={160} /> : <LineChart data={monthly} />}
            </div>

            {/* Donut chart */}
            <div style={{ background: '#fff', borderRadius: 12, padding: isMobile ? '14px 12px' : '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', marginBottom: 12 }}>Répartition des niveaux de risque</div>
              {loading
                ? <Skeleton h={170} />
                : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <DonutChart data={distribution} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 140 }}>
                      {distribution.length === 0
                        ? <span style={{ fontSize: 13, color: '#bbb' }}>Aucune donnée</span>
                        : distribution.map((d, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: DONUT_COLORS[d.level] || '#ccc', flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: '#555', flex: 1 }}>{d.level}</span>
                            <span style={{ fontSize: 13, color: '#999', minWidth: 36, textAlign: 'right' }}>{d.pct}%</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </div>

          {/* ── Bottom row ────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 300px', gap: isMobile ? 10 : 16 }}>
            {/* Recent analyses */}
            <div style={{ background: '#fff', borderRadius: 12, padding: isMobile ? '14px 12px' : '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflowX: 'auto' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', marginBottom: 14 }}>Dernières analyses</div>
              {loading
                ? <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{[1,2,3,4,5].map(i => <Skeleton key={i} h={36} />)}</div>
                : recent.length === 0
                  ? <p style={{ color: '#bbb', fontSize: 13 }}>Aucune donnée disponible.</p>
                  : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 440 }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                          {['Projet','Localisation','Date','Niveau global','Action'].map(h => (
                            <th key={h} style={{ padding: '9px 10px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#999', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {recent.map((row, i) => (
                          <tr key={row.id} style={{ borderBottom: i < recent.length - 1 ? '1px solid #f7f7f7' : 'none' }}>
                            <td style={{ padding: '11px 10px', fontSize: 13, fontWeight: 500, color: '#1a1a2e', whiteSpace: 'nowrap' }}>{row.projet}</td>
                            <td style={{ padding: '11px 10px', fontSize: 13, color: '#666' }}>{row.gouvernorat}</td>
                            <td style={{ padding: '11px 10px', fontSize: 13, color: '#666', whiteSpace: 'nowrap' }}>{row.date}</td>
                            <td style={{ padding: '11px 10px' }}><LevelBadge niveau={row.niveau} /></td>
                            <td style={{ padding: '11px 10px' }}>
                              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}><IcoEye /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
              }
            </div>

            {/* Most frequent risks */}
            <div style={{ background: '#fff', borderRadius: 12, padding: isMobile ? '14px 12px' : '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', marginBottom: 14 }}>Risques les plus fréquents</div>
              {loading
                ? <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{[1,2,3,4,5].map(i => <Skeleton key={i} h={32} />)}</div>
                : frequent.length === 0
                  ? <p style={{ color: '#bbb', fontSize: 13 }}>Aucune donnée disponible.</p>
                  : frequent.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: i < frequent.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                      <span style={{ fontSize: 13, color: '#444', paddingRight: 8 }}>{r.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', flexShrink: 0 }}>{r.count}</span>
                    </div>
                  ))
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

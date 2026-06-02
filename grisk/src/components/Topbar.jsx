export default function Topbar({ user, onLogout }) {
  return (
    <nav style={styles.topbar}>
      <div style={styles.brand}>
        <div style={styles.brandIcon}>⚠</div>
        <div>
          <div style={styles.brandTitle}>GRISK</div>
          <div className="topbar-brand-sub" style={styles.brandSub}>
            Risques Géotechniques — Tunisie
          </div>
        </div>
      </div>
      <div style={styles.right}>
        <span className="topbar-user-email" style={styles.userLabel}>{user}</span>
        <button style={styles.logoutBtn} onClick={onLogout}>Déconnexion</button>
      </div>
    </nav>
  );
}

const styles = {
  topbar: {
    background: '#1a3a5c',
    padding: '0 20px',
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandIcon: {
    width: 34, height: 34,
    background: 'rgba(255,255,255,.15)',
    borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, flexShrink: 0,
  },
  brandTitle: { fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: '#fff' },
  brandSub: { fontSize: 11, opacity: 0.65, color: '#fff' },
  right: { display: 'flex', alignItems: 'center', gap: 10 },
  userLabel: { color: 'rgba(255,255,255,.8)', fontSize: 13 },
  logoutBtn: {
    background: 'rgba(255,255,255,.12)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.2)',
    padding: '7px 14px',
    borderRadius: 6,
    fontSize: 13,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};

export default function Topbar({ user, onLogout, onMenu }) {
  const initials = user
    ? user.split('@')[0].slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <nav style={s.topbar}>
      <div style={s.left}>
        <div style={{ ...s.hamburger, cursor: onMenu ? 'pointer' : 'default' }} onClick={onMenu}>
          <span style={s.hLine} />
          <span style={s.hLine} />
          <span style={s.hLine} />
        </div>
        <div style={s.brand}>
          <span style={s.brandG}>G</span>
          <span style={s.brandRisk}>RISK</span>
        </div>
      </div>
      <button style={s.avatar} onClick={onLogout} title={`${user} — Déconnexion`}>
        {initials}
      </button>
    </nav>
  );
}

const s = {
  topbar: {
    background: '#06111f',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    padding: '0 20px',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    cursor: 'pointer',
    padding: 4,
  },
  hLine: {
    display: 'block',
    width: 22,
    height: 2,
    background: 'rgba(255,255,255,0.65)',
    borderRadius: 1,
  },
  brand: {
    display: 'flex',
    alignItems: 'baseline',
  },
  brandG: {
    fontSize: 22,
    fontWeight: 900,
    color: '#f57c00',
    fontFamily: '"Arial Black", Arial, sans-serif',
    letterSpacing: -0.5,
  },
  brandRisk: {
    fontSize: 22,
    fontWeight: 900,
    color: '#ffffff',
    fontFamily: '"Arial Black", Arial, sans-serif',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: 'transparent',
    border: '2px solid #f57c00',
    color: '#f57c00',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: 'inherit',
  },
};

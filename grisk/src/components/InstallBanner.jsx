import { useState, useEffect } from 'react';

export default function InstallBanner() {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function handleInstall() {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setVisible(false);
    setPrompt(null);
  }

  if (!visible) return null;

  return (
    <div style={styles.banner}>
      <div style={styles.left}>
        <img src="/icon-48.png" alt="GRISK" style={styles.icon} />
        <div>
          <div style={styles.title}>Installer GRISK</div>
          <div style={styles.sub}>Accès rapide depuis votre écran d'accueil</div>
        </div>
      </div>
      <div style={styles.actions}>
        <button style={styles.installBtn} onClick={handleInstall}>Installer</button>
        <button style={styles.dismissBtn} onClick={() => setVisible(false)}>✕</button>
      </div>
    </div>
  );
}

const styles = {
  banner: {
    position: 'fixed',
    bottom: 16,
    left: 16,
    right: 16,
    background: '#1a3a5c',
    borderRadius: 14,
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    boxShadow: '0 8px 32px rgba(0,0,0,.3)',
    zIndex: 999,
  },
  left: { display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 },
  icon: { width: 40, height: 40, borderRadius: 10, flexShrink: 0 },
  title: { color: '#fff', fontWeight: 700, fontSize: 14 },
  sub: { color: 'rgba(255,255,255,.65)', fontSize: 12, marginTop: 2 },
  actions: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
  installBtn: {
    background: '#e67e22', color: '#fff', border: 'none',
    borderRadius: 8, padding: '8px 16px',
    fontSize: 13, fontWeight: 700, cursor: 'pointer',
  },
  dismissBtn: {
    background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.7)',
    border: 'none', borderRadius: 8,
    width: 32, height: 32, fontSize: 14, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};

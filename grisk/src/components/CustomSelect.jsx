import { useState, useEffect, useRef } from 'react';

/**
 * Props:
 *   value      – current selected value (string)
 *   onChange   – (value: string) => void
 *   placeholder – string shown when nothing selected
 *   groups     – [{ label, options: string[] }]  (grouped list)
 *   options    – string[]                        (flat list, no groups)
 */
export default function CustomSelect({ value, onChange, placeholder = '— Sélectionner —', groups, options }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);

  // Normalise: always work with groups internally
  const allGroups = groups ?? (options ? [{ label: '', options }] : []);

  // Filter by search
  const filtered = search.trim()
    ? allGroups
        .map((g) => ({
          ...g,
          options: g.options.filter((o) =>
            o.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((g) => g.options.length > 0)
    : allGroups;

  const totalVisible = filtered.reduce((n, g) => n + g.options.length, 0);

  function openSheet() {
    setSearch('');
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setSearch('');
  }

  function pick(val) {
    onChange(val);
    close();
  }

  // Focus search when sheet opens
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 80);
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      {/* ── Trigger ── */}
      <button type="button" style={styles.trigger} onClick={openSheet}>
        <span style={{ color: value ? '#1c2b3a' : '#aab4c0', flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value || placeholder}
        </span>
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{ flexShrink: 0 }}>
          <path d="M1 1L6 6L11 1" stroke="#637488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Bottom sheet ── */}
      {open && (
        <div style={styles.overlay} onMouseDown={close}>
          <div style={styles.sheet} onMouseDown={(e) => e.stopPropagation()}>

            {/* Handle bar */}
            <div style={styles.handle} />

            {/* Search */}
            <div style={styles.searchWrap}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                ref={searchRef}
                style={styles.searchInput}
                type="text"
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button style={styles.clearBtn} type="button" onClick={() => setSearch('')}>✕</button>
              )}
            </div>

            {/* List */}
            <div style={styles.list}>
              {/* Clear option */}
              {value && (
                <div style={{ ...styles.option, color: '#c0392b', borderBottom: '1px solid #f0f2f5', marginBottom: 4 }}
                  onClick={() => pick('')}>
                  ✕ &nbsp;Effacer la sélection
                </div>
              )}

              {totalVisible === 0 && (
                <div style={styles.noResult}>Aucun résultat pour « {search} »</div>
              )}

              {filtered.map((g) => (
                <div key={g.label}>
                  {g.label && <div style={styles.groupHeader}>{g.label}</div>}
                  {g.options.map((o) => (
                    <div
                      key={o}
                      style={{
                        ...styles.option,
                        background: o === value ? '#eaf1fb' : 'transparent',
                        color: o === value ? '#1a3a5c' : '#1c2b3a',
                        fontWeight: o === value ? 700 : 400,
                      }}
                      onClick={() => pick(o)}
                    >
                      {o === value && <span style={styles.checkmark}>✓</span>}
                      {o}
                    </div>
                  ))}
                </div>
              ))}

              {/* Bottom safe-area spacer */}
              <div style={{ height: 24 }} />
            </div>

          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  trigger: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 16px',
    border: '1.5px solid #dde2ea',
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'inherit',
    background: '#fafbfc',
    cursor: 'pointer',
    textAlign: 'left',
    boxSizing: 'border-box',
    outline: 'none',
    WebkitAppearance: 'none',
  },

  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-end',
  },
  sheet: {
    width: '100%',
    maxHeight: '80vh',
    background: '#fff',
    borderRadius: '18px 18px 0 0',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 -4px 32px rgba(0,0,0,0.15)',
  },
  handle: {
    width: 40,
    height: 4,
    background: '#dde2ea',
    borderRadius: 2,
    margin: '12px auto 0',
    flexShrink: 0,
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    borderBottom: '1px solid #f0f2f5',
    flexShrink: 0,
  },
  searchIcon: { fontSize: 14, opacity: 0.6 },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 15,
    fontFamily: 'inherit',
    color: '#1c2b3a',
    background: 'transparent',
    padding: '4px 0',
  },
  clearBtn: {
    background: '#edf0f4',
    border: 'none',
    borderRadius: 12,
    width: 22,
    height: 22,
    fontSize: 11,
    color: '#637488',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  list: {
    overflowY: 'auto',
    flex: 1,
    padding: '4px 0',
    WebkitOverflowScrolling: 'touch',
  },
  groupHeader: {
    padding: '10px 18px 4px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: '#637488',
    background: '#f8f9fb',
    borderTop: '1px solid #f0f2f5',
    marginTop: 4,
  },
  option: {
    padding: '13px 18px',
    fontSize: 15,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderBottom: 'none',
    transition: 'background 0.1s',
  },
  checkmark: {
    color: '#1a3a5c',
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
  },
  noResult: {
    padding: '24px 18px',
    fontSize: 14,
    color: '#8a9bb0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

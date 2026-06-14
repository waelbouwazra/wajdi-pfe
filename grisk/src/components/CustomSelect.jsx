import { useState, useEffect, useRef } from 'react';

/**
 * Props:
 *   value       – current selected value (string)
 *   onChange    – (value: string) => void
 *   placeholder – string shown when nothing selected
 *   groups      – [{ label, options: string[] }]  (grouped list)
 *   options     – string[]                        (flat list)
 *   icon        – JSX element shown on the left of the trigger
 */
export default function CustomSelect({ value, onChange, placeholder = '— Sélectionner —', groups, options, icon }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);

  const allGroups = groups ?? (options ? [{ label: '', options }] : []);

  const filtered = search.trim()
    ? allGroups
        .map((g) => ({ ...g, options: g.options.filter((o) => o.toLowerCase().includes(search.toLowerCase())) }))
        .filter((g) => g.options.length > 0)
    : allGroups;

  const totalVisible = filtered.reduce((n, g) => n + g.options.length, 0);

  function openSheet() { setSearch(''); setOpen(true); }
  function close() { setOpen(false); setSearch(''); }
  function pick(val) { onChange(val); close(); }

  useEffect(() => { if (open) setTimeout(() => searchRef.current?.focus(), 80); }, [open]);
  useEffect(() => {
    if (open) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button type="button" style={s.trigger} onClick={openSheet}>
        {icon && <span style={s.triggerIcon}>{icon}</span>}
        <span style={{ color: value ? '#fff' : 'rgba(255,255,255,0.3)', flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 15 }}>
          {value || placeholder}
        </span>
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{ flexShrink: 0 }}>
          <path d="M1 1L6 6L11 1" stroke="#4a8aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Bottom sheet */}
      {open && (
        <div style={s.overlay} onMouseDown={close}>
          <div style={s.sheet} onMouseDown={(e) => e.stopPropagation()}>
            <div style={s.handle} />

            {/* Search */}
            <div style={s.searchWrap}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchRef}
                style={s.searchInput}
                type="text"
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button style={s.clearBtn} type="button" onClick={() => setSearch('')}>✕</button>
              )}
            </div>

            {/* List */}
            <div style={s.list}>
              {value && (
                <div style={{ ...s.option, color: '#ff6b6b', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 4 }}
                  onClick={() => pick('')}>
                  ✕ &nbsp;Effacer la sélection
                </div>
              )}

              {totalVisible === 0 && (
                <div style={s.noResult}>Aucun résultat pour « {search} »</div>
              )}

              {filtered.map((g) => (
                <div key={g.label}>
                  {g.label && <div style={s.groupHeader}>{g.label}</div>}
                  {g.options.map((o) => (
                    <div
                      key={o}
                      style={{
                        ...s.option,
                        background: o === value ? 'rgba(245,124,0,0.12)' : 'transparent',
                        color: o === value ? '#f57c00' : 'rgba(255,255,255,0.85)',
                        fontWeight: o === value ? 700 : 400,
                      }}
                      onClick={() => pick(o)}
                    >
                      {o === value && <span style={s.checkmark}>✓</span>}
                      {o}
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ height: 24 }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const s = {
  trigger: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 14px',
    border: '1.5px solid rgba(100,150,255,0.2)',
    borderRadius: 10,
    fontSize: 15,
    fontFamily: 'inherit',
    background: 'rgba(255,255,255,0.05)',
    cursor: 'pointer',
    textAlign: 'left',
    boxSizing: 'border-box',
    outline: 'none',
    WebkitAppearance: 'none',
  },
  triggerIcon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.65)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-end',
  },
  sheet: {
    width: '100%',
    maxHeight: '80vh',
    background: '#0d1e30',
    borderRadius: '18px 18px 0 0',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 -4px 32px rgba(0,0,0,0.4)',
    border: '1px solid rgba(100,150,255,0.12)',
    borderBottom: 'none',
  },
  handle: {
    width: 40,
    height: 4,
    background: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    margin: '12px auto 0',
    flexShrink: 0,
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 15,
    fontFamily: 'inherit',
    color: '#ffffff',
    background: 'transparent',
    padding: '4px 0',
  },
  clearBtn: {
    background: 'rgba(255,255,255,0.08)',
    border: 'none',
    borderRadius: 12,
    width: 22,
    height: 22,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
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
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: 'rgba(255,255,255,0.35)',
    background: 'rgba(255,255,255,0.03)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    marginTop: 4,
  },
  option: {
    padding: '13px 18px',
    fontSize: 15,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'background 0.1s',
  },
  checkmark: {
    color: '#f57c00',
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
  },
  noResult: {
    padding: '24px 18px',
    fontSize: 14,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

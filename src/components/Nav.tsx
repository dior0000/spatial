import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Проблема', href: '#problem' },
  { label: 'Демо', href: '#demo' },
  { label: 'Как это работает', href: '#how' },
  { label: 'Почему сейчас', href: '#why' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: 'rgba(6,8,13,0.80)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 no-underline" aria-label="Локус — на главную">
          {/* Coordinate-target glyph */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="12" stroke="#1FE3C2" strokeWidth="1.2" />
            <circle cx="14" cy="14" r="6.5" stroke="#1FE3C2" strokeWidth="1" />
            <line x1="1" y1="14" x2="6" y2="14" stroke="#1FE3C2" strokeWidth="1.2" />
            <line x1="22" y1="14" x2="27" y2="14" stroke="#1FE3C2" strokeWidth="1.2" />
            <line x1="14" y1="1" x2="14" y2="6" stroke="#1FE3C2" strokeWidth="1.2" />
            <line x1="14" y1="22" x2="14" y2="27" stroke="#1FE3C2" strokeWidth="1.2" />
            <circle cx="14" cy="14" r="2.5" fill="#1FE3C2" />
          </svg>
          <span
            className="font-display font-700 text-lg tracking-wide"
            style={{ color: 'var(--text)', letterSpacing: '0.06em' }}
          >
            ЛОКУС
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--text-dim)', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-dim)'; }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a href="#waitlist" className="btn-primary" style={{ padding: '9px 20px', fontSize: '14px' }}>
            В лист ожидания
          </a>
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-dim)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden px-5 pb-5 flex flex-col gap-4"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium py-1"
              style={{ color: 'var(--text-dim)', textDecoration: 'none' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

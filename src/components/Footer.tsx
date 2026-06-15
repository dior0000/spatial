export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="12" stroke="#1FE3C2" strokeWidth="1.2" />
              <circle cx="14" cy="14" r="6.5" stroke="#1FE3C2" strokeWidth="1" />
              <line x1="1" y1="14" x2="6" y2="14" stroke="#1FE3C2" strokeWidth="1.2" />
              <line x1="22" y1="14" x2="27" y2="14" stroke="#1FE3C2" strokeWidth="1.2" />
              <line x1="14" y1="1" x2="14" y2="6" stroke="#1FE3C2" strokeWidth="1.2" />
              <line x1="14" y1="22" x2="14" y2="27" stroke="#1FE3C2" strokeWidth="1.2" />
              <circle cx="14" cy="14" r="2.5" fill="#1FE3C2" />
            </svg>
            <span
              className="font-display font-semibold text-sm tracking-wider"
              style={{ color: 'var(--text)', letterSpacing: '0.08em' }}
            >
              ЛОКУС
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-5" aria-label="Footer navigation">
            {['#problem', '#demo', '#how', '#why', '#waitlist'].map((href) => (
              <a
                key={href}
                href={href}
                className="text-xs transition-colors"
                style={{ color: 'var(--text-mute)', textDecoration: 'none' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--text-dim)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-mute)'; }}
              >
                {href.replace('#', '')}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
            © {year} Локус · spatial grounding layer · СНГ
          </div>
        </div>

        <div
          className="mt-8 pt-6 font-mono text-xs"
          style={{ borderTop: '1px solid var(--line)', color: 'var(--text-mute)' }}
        >
          // Локус не является картой, не конкурирует с провайдерами геоданных. Это
          агент-оркестратор, грундящий LLM-ответы на верифицированных локальных данных СНГ.
        </div>
      </div>
    </footer>
  );
}

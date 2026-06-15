// Signature animated SVG panel — "grounding moment" hero element.
// All animations are CSS-only; disabled at prefers-reduced-motion.

export default function ScopePanel() {
  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: '1 / 1',
        maxWidth: 480,
        background: 'var(--surface)',
        border: '1px solid rgba(31,227,194,0.25)',
        borderRadius: 22,
        boxShadow: '0 0 60px rgba(31,227,194,0.06), inset 0 0 40px rgba(31,227,194,0.03)',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {/* Background coordinate grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={50 * i}
            y1="0"
            x2={50 * i}
            y2="400"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={50 * i}
            x2="400"
            y2={50 * i}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}

        {/* Teal terrain contour curves */}
        <path
          d="M 20 240 Q 100 180 200 200 Q 300 220 380 170"
          stroke="rgba(31,227,194,0.18)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 10 290 Q 120 240 210 260 Q 300 280 390 230"
          stroke="rgba(31,227,194,0.10)"
          strokeWidth="1"
          fill="none"
        />

        {/* ── LLM "guess" — drifts slowly ── */}
        <g className="animate-drift" style={{ transformOrigin: '130px 155px' }}>
          {/* Dashed magenta circle */}
          <circle
            cx="130"
            cy="155"
            r="42"
            stroke="#FF496B"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            fill="rgba(255,73,107,0.04)"
          />
          {/* Crosshair */}
          <line x1="108" y1="155" x2="152" y2="155" stroke="#FF496B" strokeWidth="1" opacity="0.7" />
          <line x1="130" y1="133" x2="130" y2="177" stroke="#FF496B" strokeWidth="1" opacity="0.7" />
          {/* Label */}
          <text
            x="136"
            y="142"
            fill="#FF496B"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            opacity="0.85"
          >
            догадка LLM
          </text>
        </g>

        {/* ── Locus locked point ── */}
        {/* Ping expanding ring */}
        <circle
          cx="248"
          cy="195"
          r="20"
          stroke="rgba(31,227,194,0.35)"
          strokeWidth="1"
          fill="none"
          className="animate-ping-expand"
          style={{ transformOrigin: '248px 195px' }}
        />
        {/* Pulsing concentric ring */}
        <circle
          cx="248"
          cy="195"
          r="28"
          stroke="rgba(31,227,194,0.25)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse-ring"
        />
        {/* Outer ring */}
        <circle
          cx="248"
          cy="195"
          r="18"
          stroke="#1FE3C2"
          strokeWidth="1.2"
          fill="rgba(31,227,194,0.06)"
        />
        {/* Crosshair arms */}
        <line x1="228" y1="195" x2="238" y2="195" stroke="#1FE3C2" strokeWidth="1.5" />
        <line x1="258" y1="195" x2="268" y2="195" stroke="#1FE3C2" strokeWidth="1.5" />
        <line x1="248" y1="175" x2="248" y2="185" stroke="#1FE3C2" strokeWidth="1.5" />
        <line x1="248" y1="205" x2="248" y2="215" stroke="#1FE3C2" strokeWidth="1.5" />
        {/* Centre dot */}
        <circle cx="248" cy="195" r="3.5" fill="#1FE3C2" />

        {/* Connector line: guess → locked */}
        <line
          x1="153"
          y1="155"
          x2="230"
          y2="191"
          stroke="rgba(31,227,194,0.20)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Readout card */}
      <div
        className="absolute bottom-4 left-4 right-4"
        style={{
          background: 'rgba(6,8,13,0.88)',
          border: '1px solid rgba(31,227,194,0.20)',
          borderRadius: 12,
          padding: '14px 16px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="block w-2 h-2 rounded-full"
            style={{ background: 'var(--teal)', boxShadow: '0 0 6px #1FE3C2' }}
          />
          <span className="font-mono text-xs" style={{ color: 'var(--teal)' }}>
            // resolved → verified
          </span>
        </div>
        <div className="space-y-1">
          {[
            ['lat / lng', '53.9006, 27.5590'],
            ['source', '2gis · osm'],
            ['confidence', '0.98'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
                {k}
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

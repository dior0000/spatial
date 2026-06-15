// DemoTrace — renders the full Locus agent trace (plan, grounding, reconciliation,
// computation, verification, confidence, sources, flywheel).
// Each layer is a collapsible accordion section.

import { useState } from 'react';
import {
  ChevronDown,
  CheckCircle,
  XCircle,
  MapPin,
  GitMerge,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import type { SpatialDemoResponse } from '../lib/types';

// ── Accordion section ──────────────────────────────────────────────────────
interface SectionProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  badgeVariant?: 'teal' | 'neutral';
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Section({ icon, label, badge, badgeVariant = 'teal', defaultOpen, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--line)', background: 'var(--surface-2)' }}
    >
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span style={{ color: 'var(--teal)', flexShrink: 0 }}>{icon}</span>
        <span className="text-sm font-semibold flex-1" style={{ color: 'var(--text)' }}>
          {label}
        </span>
        {badge && (
          <span className={`trace-badge badge-${badgeVariant}`}>{badge}</span>
        )}
        <ChevronDown
          size={16}
          style={{
            color: 'var(--text-mute)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        />
      </button>
      {open && (
        <div
          className="px-4 pb-4"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
interface DemoTraceProps {
  data: SpatialDemoResponse;
}

export default function DemoTrace({ data }: DemoTraceProps) {
  const allPassed = data.verification.passed;

  return (
    <div className="flex flex-col gap-3">
      {/* ── Plan ── */}
      <Section icon={<Zap size={15} />} label="План агента" defaultOpen>
        <ol className="mt-3 flex flex-col gap-2">
          {data.plan.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                className="font-mono text-xs mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded"
                style={{ background: 'var(--teal-soft)', color: 'var(--teal)', border: '1px solid var(--teal-line)' }}
              >
                {i + 1}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-dim)' }}>
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Grounding ── */}
      <Section
        icon={<MapPin size={15} />}
        label="Грундинг сущностей"
        badge={`${data.grounding.length} объектов`}
        defaultOpen
      >
        <div className="mt-3 flex flex-col gap-3">
          {data.grounding.map((e, i) => (
            <div
              key={i}
              className="p-3 rounded-lg"
              style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
            >
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <span className="text-xs font-medium" style={{ color: 'var(--text-dim)' }}>
                  {e.query}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-mute)' }}>→</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                  {e.resolvedName}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-mono text-xs" style={{ color: 'var(--teal)' }}>
                  {e.lat.toFixed(4)}, {e.lng.toFixed(4)}
                </span>
                <div className="flex gap-1 flex-wrap">
                  {e.sources.map((s) => (
                    <span key={s.provider} className="trace-badge badge-neutral">
                      {s.provider} {Math.round(s.confidence * 100)}%
                    </span>
                  ))}
                </div>
                {e.gersId && (
                  <span className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
                    #{e.gersId.split(':').pop()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Reconciliation ── */}
      <Section
        icon={<GitMerge size={15} />}
        label="Примирение источников"
        badge={`${data.reconciliation.length} конфликта`}
        badgeVariant="neutral"
      >
        <div className="mt-3 flex flex-col gap-4">
          {data.reconciliation.map((r, i) => (
            <div key={i}>
              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {r.field}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {r.candidates.map((c) => (
                  <div
                    key={c.provider}
                    className="px-3 py-1.5 rounded-lg text-xs"
                    style={{
                      background: c.value === r.chosen ? 'var(--teal-soft)' : 'var(--surface)',
                      border: `1px solid ${c.value === r.chosen ? 'var(--teal-line)' : 'var(--line)'}`,
                      color: c.value === r.chosen ? 'var(--teal)' : 'var(--text-dim)',
                    }}
                  >
                    <span className="font-mono mr-1.5" style={{ color: 'var(--text-mute)' }}>
                      {c.provider}
                    </span>
                    {c.value}
                    {c.value === r.chosen && ' ✓'}
                  </div>
                ))}
              </div>
              <div className="text-xs italic" style={{ color: 'var(--text-mute)' }}>
                ↳ {r.reason}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Computation ── */}
      <Section
        icon={<Cpu size={15} />}
        label="Детерминированный расчёт"
        badge="computedBy: tool"
      >
        <div className="mt-3 flex flex-col gap-3">
          {data.computation.map((c, i) => (
            <div
              key={i}
              className="p-3 rounded-lg"
              style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="trace-badge badge-teal">{c.kind}</span>
                <span className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
                  // not LLM
                </span>
              </div>
              <pre
                className="text-xs overflow-x-auto leading-relaxed"
                style={{ color: 'var(--text-dim)', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
              >
                {JSON.stringify(c.result, null, 2)}
              </pre>
              {c.note && (
                <div className="mt-2 text-xs" style={{ color: 'var(--text-mute)' }}>
                  {c.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Verification ── */}
      <Section
        icon={<ShieldCheck size={15} />}
        label="Верификация"
        badge={allPassed ? 'PASSED' : 'FAILED'}
        badgeVariant={allPassed ? 'teal' : 'neutral'}
        defaultOpen
      >
        <div className="mt-3 flex flex-col gap-2">
          {data.verification.checks.map((ch, i) => (
            <div key={i} className="flex gap-3 items-start">
              {ch.passed ? (
                <CheckCircle size={15} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: 1 }} />
              ) : (
                <XCircle size={15} style={{ color: 'var(--magenta)', flexShrink: 0, marginTop: 1 }} />
              )}
              <div>
                <span className="text-sm" style={{ color: ch.passed ? 'var(--text-dim)' : 'var(--text)' }}>
                  {ch.rule}
                </span>
                {ch.detail && (
                  <span className="ml-2 font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
                    — {ch.detail}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Confidence bar */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
              confidence
            </span>
            <span className="font-mono text-sm font-500" style={{ color: 'var(--teal)' }}>
              {data.confidence.toFixed(2)}
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--surface)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${data.confidence * 100}%`,
                background: 'linear-gradient(90deg, #1FE3C2, rgba(31,227,194,0.5))',
              }}
            />
          </div>
        </div>
      </Section>

      {/* ── Flywheel ── */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: 'rgba(31,227,194,0.06)',
          border: '1px solid var(--teal-line)',
        }}
      >
        <span
          className="block w-2 h-2 rounded-full flex-shrink-0 animate-pulse-ring"
          style={{ background: 'var(--teal)' }}
        />
        <span className="font-mono text-xs" style={{ color: 'var(--teal)' }}>
          flywheel
        </span>
        <span className="text-sm flex-1" style={{ color: 'var(--text-dim)' }}>
          +{data.flywheel.factsAdded} фактов · {data.flywheel.note}
        </span>
      </div>

      {/* ── Sources ── */}
      <div className="flex flex-wrap gap-2">
        {data.sources.map((s) => (
          <span key={s.provider} className="trace-badge badge-neutral flex items-center gap-1.5">
            <span
              className="block w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  s.confidence >= 0.9
                    ? 'var(--teal)'
                    : s.confidence >= 0.7
                    ? 'var(--text-dim)'
                    : 'var(--magenta)',
              }}
            />
            {s.name}
            <span style={{ color: 'var(--text-mute)' }}>{Math.round(s.confidence * 100)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

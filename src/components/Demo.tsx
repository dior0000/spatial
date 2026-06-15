// Demo — the centrepiece interactive section.
// Left panel: "Naive LLM" (pale, unverified).
// Right panel: Locus full agent trace with accordion layers.

import { useState, useRef, type FormEvent } from 'react';
import { Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useDemo } from '../hooks/useDemo';
import DemoTrace from './DemoTrace';
import { CHIPS } from '../lib/mock-demo';

export default function Demo() {
  const [query, setQuery] = useState('');
  const { status, data, error, run } = useDemo();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChip(chip: string) {
    setQuery(chip);
    inputRef.current?.focus();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) run(query.trim());
  }

  const isLoading = status === 'loading';

  return (
    <section id="demo" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <p className="eyebrow mb-5">Интерактивное демо</p>
        <h2
          className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text)' }}
        >
          Попробуйте сами — Минск
        </h2>
        <p className="text-base mb-10 max-w-xl" style={{ color: 'var(--text-dim)' }}>
          Задайте пространственный запрос по СНГ. Сравните, что ответит обычная LLM и что —
          Локус с полной трассой логики.
        </p>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div
            className="flex gap-3 p-2 rounded-xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line-strong)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ваш пространственный запрос по СНГ…"
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-sm px-3 py-2"
              style={{ color: 'var(--text)', fontFamily: 'Manrope, sans-serif' }}
              aria-label="Пространственный запрос"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="btn-primary"
              style={{ padding: '10px 18px', fontSize: '14px' }}
              aria-label="Отправить запрос"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {isLoading ? 'Запрос…' : 'Отправить'}
            </button>
          </div>
        </form>

        {/* Chip examples */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CHIPS.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleChip(chip)}
              disabled={isLoading}
              className="text-xs px-3.5 py-2 rounded-lg transition-colors"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                fontFamily: 'Manrope, sans-serif',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--teal-line)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)';
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div
            className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
          >
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--teal)' }} />
            <p className="font-mono text-sm" style={{ color: 'var(--text-dim)' }}>
              // orchestrating: geocoding → planning → grounding → verification…
            </p>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div
            className="rounded-2xl p-6 flex items-start gap-3"
            style={{ background: 'var(--magenta-soft)', border: '1px solid rgba(255,73,107,0.3)' }}
          >
            <AlertCircle size={18} style={{ color: 'var(--magenta)', flexShrink: 0, marginTop: 1 }} />
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--text)' }}>
                Ошибка запроса
              </div>
              <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
                {error}
              </div>
            </div>
          </div>
        )}

        {/* Results grid */}
        {status === 'success' && data && (
          <div className="grid lg:grid-cols-2 gap-6 animate-fade-in-up">
            {/* ── Left: Naive LLM ── */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(255,73,107,0.20)',
                opacity: 0.85,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: 'var(--magenta)' }}
                >
                  // Обычная LLM
                </span>
                <span className="trace-badge badge-magenta">непроверено</span>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-dim)', borderLeft: '2px solid rgba(255,73,107,0.3)', paddingLeft: 12 }}
              >
                {data.naive}
              </p>

              <div
                className="flex items-start gap-2 rounded-lg p-3 text-xs"
                style={{ background: 'var(--magenta-soft)', color: 'var(--text-dim)' }}
              >
                <AlertCircle
                  size={13}
                  style={{ color: 'var(--magenta)', flexShrink: 0, marginTop: 1 }}
                />
                <span>
                  Источники не указаны. Координаты не верифицированы. Часть информации может
                  быть выдумана.
                </span>
              </div>
            </div>

            {/* ── Right: Locus ── */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--teal-line)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: 'var(--teal)' }}
                >
                  // Локус
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} style={{ color: 'var(--teal)' }} />
                  <span className="trace-badge badge-teal">verified</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
                    {data.confidence.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Final answer */}
              <div
                className="rounded-xl p-4 text-sm leading-relaxed"
                style={{
                  background: 'var(--teal-soft)',
                  border: '1px solid var(--teal-line)',
                  color: 'var(--text)',
                  whiteSpace: 'pre-line',
                }}
              >
                {data.answer}
              </div>

              {/* Full trace */}
              <DemoTrace data={data} />
            </div>
          </div>
        )}

        {/* Idle state */}
        {status === 'idle' && (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
          >
            <p className="font-mono text-sm" style={{ color: 'var(--text-mute)' }}>
              // выберите пример или введите свой запрос
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

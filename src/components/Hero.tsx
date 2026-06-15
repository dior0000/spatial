import { ArrowDown } from 'lucide-react';
import ScopePanel from './ScopePanel';

const METRICS = [
  { value: '67%', label: 'потолок MapEval', note: '// лучший результат среди 30 моделей' },
  { value: '1 вызов', label: 'инструмента', note: '// геометрию считает инструмент, не LLM' },
  { value: 'СНГ', label: 'фокус данных', note: '// локальный верифицированный датасет' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: 80 }}
    >
      <div className="max-w-6xl mx-auto px-5 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="eyebrow mb-6">SPATIAL GROUNDING LAYER · СНГ</p>

            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)', color: 'var(--text)' }}
            >
              ИИ-агенты не знают,{' '}
              <br className="hidden sm:block" />
              где они.{' '}
              <span style={{ color: 'var(--teal)' }}>Локус</span> знает.
            </h1>

            <p
              className="text-lg mb-10 max-w-lg leading-relaxed"
              style={{ color: 'var(--text-dim)' }}
            >
              Пространственный оркестратор для выездных специалистов. LLM рассуждает —
              геометрию считают инструменты, каждый факт грундится на локальных данных СНГ,
              результат верифицируется и отдаётся с источниками и оценкой уверенности.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <a href="#demo" className="btn-primary">
                Посмотреть демо
                <ArrowDown size={16} />
              </a>
              <a href="#how" className="btn-ghost">
                Как это работает
              </a>
            </div>

            {/* Metrics */}
            <div
              className="grid grid-cols-3 gap-4 pt-8"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              {METRICS.map((m) => (
                <div key={m.value}>
                  <div
                    className="font-mono font-500 text-2xl mb-0.5"
                    style={{ color: 'var(--teal)' }}
                  >
                    {m.value}
                  </div>
                  <div className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                    {m.label}
                  </div>
                  <div className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
                    {m.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — signature scope panel */}
          <div className="flex justify-center lg:justify-end">
            <ScopePanel />
          </div>
        </div>
      </div>
    </section>
  );
}

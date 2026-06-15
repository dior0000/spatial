import { CheckCircle, XCircle } from 'lucide-react';

const POINTS = [
  {
    title: 'Локальные данные СНГ',
    desc: 'Верифицированный граф адресов, POI, маршрутов и связей — специально для рынка СНГ, не generic world-data.',
  },
  {
    title: 'Слой верификации',
    desc: 'Каждый факт в ответе помечен источником. Расхождения источников фиксируются и примиряются явно.',
  },
  {
    title: 'Логика вертикали',
    desc: 'Агент понимает домен «выездные услуги»: оптимизирует маршрут, учитывает рабочее время, строит изохроны.',
  },
];

const NOT = [
  'не карта',
  'не клон данных Google/HERE',
  'не конкурент данным Mapbox',
];
const IS = ['оркестратор агентного цикла'];

export default function Solution() {
  return (
    <section id="solution" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="eyebrow mb-5">Решение</p>
            <h2
              className="font-display font-bold mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text)' }}
            >
              Модель рассуждает.{' '}
              <span style={{ color: 'var(--teal)' }}>Геометрию считают инструменты.</span>
            </h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              Локус — тонкий агент-оркестратор. LLM планирует задачу и синтезирует ответ, но
              никогда не генерирует координаты или расстояния напрямую — он вызывает детерминированные
              инструменты, грундит каждый факт на проверенных локальных данных и верифицирует результат
              перед отдачей.
            </p>

            <div className="flex flex-col gap-5">
              {POINTS.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-4 items-start p-5 rounded-xl"
                  style={{ background: 'var(--teal-soft)', border: '1px solid var(--teal-line)' }}
                >
                  <span
                    className="mt-1 block w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: 'var(--teal)' }}
                  />
                  <div>
                    <div className="font-semibold mb-1" style={{ color: 'var(--text)' }}>
                      {p.title}
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — "What Locus is NOT" card */}
          <div
            className="card p-8 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--line-strong)' }}
          >
            <div className="font-mono text-xs mb-6" style={{ color: 'var(--text-mute)' }}>
              // чем Локус не является
            </div>

            <div className="flex flex-col gap-3 mb-8">
              {NOT.map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <XCircle size={16} style={{ color: 'var(--magenta)', flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: 'var(--text-dim)' }}>
                    {n}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="pt-6"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              <div className="font-mono text-xs mb-4" style={{ color: 'var(--text-mute)' }}>
                // чем является
              </div>
              {IS.map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={16} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                    {i}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini cycle diagram */}
            <div
              className="mt-8 p-5 rounded-xl flex flex-wrap gap-2 items-center justify-center text-xs font-mono"
              style={{ background: 'var(--surface-2)', color: 'var(--text-mute)' }}
            >
              {['LLM план', '→', 'инструмент', '→', 'грундинг', '→', 'верификация', '→', 'ответ'].map(
                (s, i) => (
                  <span
                    key={i}
                    style={{
                      color: s === '→' ? 'var(--text-mute)' : s === 'грундинг' ? 'var(--teal)' : 'var(--text-dim)',
                    }}
                  >
                    {s}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

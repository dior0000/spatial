import { Database, ShieldCheck, TrendingUp } from 'lucide-react';

const ASSETS = [
  {
    Icon: Database,
    title: 'Локальный верифицированный датасет СНГ',
    desc: 'Адреса, POI, маршруты и их атрибуты, специально выверенные для рынка СНГ. Не переупакованный global-датасет, а нативные локальные данные.',
  },
  {
    Icon: ShieldCheck,
    title: 'Слой верификации',
    desc: 'Каждый ответ проходит набор автоматических проверок: координаты в границах, правдоподобность времени, наличие источника у каждого факта.',
  },
  {
    Icon: TrendingUp,
    title: 'Растущий эталон точности',
    desc: 'Каждый запрос пополняет граф данных. Вместе с трафиком растёт покрытие и точность — классический data flywheel.',
  },
];

export default function Moat() {
  return (
    <section id="moat" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <p className="eyebrow mb-5">Ров</p>
        <h2
          className="font-display font-bold mb-16 max-w-xl"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text)' }}
        >
          Ров, который растёт с каждым запросом
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ASSETS.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="card p-7 flex flex-col gap-5"
              style={{ background: 'var(--surface)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--teal-soft)', border: '1px solid var(--teal-line)' }}
              >
                <Icon size={20} style={{ color: 'var(--teal)' }} />
              </div>
              <div>
                <div
                  className="font-display font-semibold text-base mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {title}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flywheel banner */}
        <div
          className="rounded-2xl p-7 flex flex-col sm:flex-row items-center gap-6"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--teal-line)',
          }}
        >
          {/* Spinning indicator */}
          <div className="flex-shrink-0 relative w-14 h-14" aria-hidden="true">
            <div
              className="w-14 h-14 rounded-full border-2 animate-spin-slow"
              style={{ borderColor: 'transparent', borderTopColor: 'var(--teal)' }}
            />
            <div
              className="absolute inset-2 rounded-full"
              style={{ background: 'var(--teal-soft)' }}
            />
          </div>

          <div>
            <div
              className="font-display font-semibold text-lg mb-1"
              style={{ color: 'var(--text)' }}
            >
              Маховик данных
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              Запросы → новые данные → лучшая точность → больше запросов. Каждый клиент
              вкладывает в точность системы, а не только потребляет её.
            </p>
          </div>

          <div
            className="sm:ml-auto flex-shrink-0 text-right"
          >
            <div className="font-mono text-2xl font-500" style={{ color: 'var(--teal)' }}>
              ∞
            </div>
            <div className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
              // self-improving
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

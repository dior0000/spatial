// HowItWorks — pure CSS/SVG 6-step agent cycle diagram.
// Steps are numbered cards; arrows between them on desktop; hidden on mobile.

const STEPS = [
  {
    n: 1,
    title: 'Запрос',
    desc: 'Пользователь формулирует пространственный запрос на естественном языке.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="#1FE3C2" strokeWidth="1.4" />
        <line x1="5" y1="8" x2="15" y2="8" stroke="#1FE3C2" strokeWidth="1.2" />
        <line x1="5" y1="11" x2="11" y2="11" stroke="#1FE3C2" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    n: 2,
    title: 'План',
    desc: 'LLM разбивает задачу на шаги и выбирает инструменты. Геометрию не считает сам.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4 L10 4 L16 10 L16 16 L4 16 Z" stroke="#1FE3C2" strokeWidth="1.4" fill="none" />
        <circle cx="10" cy="10" r="2" fill="#1FE3C2" opacity="0.6" />
        <line x1="10" y1="4" x2="10" y2="8" stroke="#1FE3C2" strokeWidth="1" />
      </svg>
    ),
  },
  {
    n: 3,
    title: 'Грундинг',
    desc: 'Spatial-RAG: каждая сущность разрезолвлена через локальный граф + 2ГИС/OSM/Яндекс.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#1FE3C2" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="3" stroke="#1FE3C2" strokeWidth="1" />
        <line x1="3" y1="10" x2="7" y2="10" stroke="#1FE3C2" strokeWidth="1" />
        <line x1="13" y1="10" x2="17" y2="10" stroke="#1FE3C2" strokeWidth="1" />
        <line x1="10" y1="3" x2="10" y2="7" stroke="#1FE3C2" strokeWidth="1" />
        <line x1="10" y1="13" x2="10" y2="17" stroke="#1FE3C2" strokeWidth="1" />
        <circle cx="10" cy="10" r="1.5" fill="#1FE3C2" />
      </svg>
    ),
  },
  {
    n: 4,
    title: 'Примирение',
    desc: '2ГИС / Яндекс / OSM / Mapbox могут расходиться. Локус явно выбирает значение и объясняет почему.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 7 L9 10 L3 13" stroke="#1FE3C2" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M17 7 L11 10 L17 13" stroke="#1FE3C2" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <line x1="9" y1="10" x2="11" y2="10" stroke="#1FE3C2" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    n: 5,
    title: 'Расчёт',
    desc: 'Расстояния, маршруты, ETA, изохроны — считает детерминированный инструмент, не LLM.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="#1FE3C2" strokeWidth="1.4" />
        <line x1="7" y1="10" x2="10" y2="7" stroke="#1FE3C2" strokeWidth="1.2" />
        <line x1="10" y1="7" x2="13" y2="13" stroke="#1FE3C2" strokeWidth="1.2" />
        <circle cx="7" cy="10" r="1" fill="#1FE3C2" />
        <circle cx="13" cy="13" r="1" fill="#1FE3C2" />
      </svg>
    ),
  },
  {
    n: 6,
    title: 'Верификация',
    desc: 'Проверки: координаты в границах, время/расстояние правдоподобны, все факты с источниками. Ответ выходит с confidence.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2 L17 5 L17 11 C17 15 13.5 18 10 18 C6.5 18 3 15 3 11 L3 5 Z" stroke="#1FE3C2" strokeWidth="1.4" fill="rgba(31,227,194,0.08)" />
        <path d="M7 10 L9 12 L13 8" stroke="#1FE3C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <p className="eyebrow mb-5">Как это работает</p>
        <h2
          className="font-display font-bold mb-16"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text)' }}
        >
          Агентный цикл
        </h2>

        {/* Steps grid with connectors */}
        <div className="relative">
          {/* Desktop: 3 columns × 2 rows */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <div key={step.n} className="relative">
                {/* Card */}
                <div
                  className="card p-6 h-full flex flex-col gap-4"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="flex items-start gap-4">
                    {/* Number badge */}
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-500"
                      style={{
                        background: 'var(--teal-soft)',
                        border: '1px solid var(--teal-line)',
                        color: 'var(--teal)',
                      }}
                    >
                      {step.n}
                    </div>
                    {step.icon}
                  </div>
                  <div>
                    <div
                      className="font-display font-semibold text-base mb-2"
                      style={{ color: 'var(--text)' }}
                    >
                      {step.title}
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                      {step.desc}
                    </div>
                  </div>
                </div>

                {/* Arrow connector — desktop only, not after last in row */}
                {i % 3 !== 2 && i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -right-3 items-center"
                    style={{ transform: 'translateY(-50%)', zIndex: 1 }}
                    aria-hidden="true"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12 H19 M14 7 L19 12 L14 17" stroke="rgba(31,227,194,0.40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

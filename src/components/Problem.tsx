const STATS = [
  {
    value: '67%',
    mono: '// потолок MapEval · 30 моделей протестировано',
    desc: 'Лучший результат среди всех протестированных LLM на пространственном бенчмарке. Человек — 87%+.',
  },
  {
    value: '34%',
    mono: '// выдуманные места и неверные атрибуты',
    desc: 'Без слоя грундинга модели галлюцинируют несуществующие адреса, ссылки и часы работы.',
  },
  {
    value: '100+ км',
    mono: '// дрейф геокоординат',
    desc: 'Координаты, генерируемые LLM напрямую, могут ошибаться на сотни километров от реального объекта.',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <p className="eyebrow mb-5">Проблема</p>
        <h2
          className="font-display font-bold mb-16 max-w-xl"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text)' }}
        >
          Языковые модели не брали уроков географии
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="card p-8 flex flex-col gap-4"
              style={{ background: 'var(--surface)' }}
            >
              <div
                className="font-display font-bold"
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--magenta)', lineHeight: 1 }}
              >
                {s.value}
              </div>
              <div className="font-mono text-xs" style={{ color: 'var(--text-mute)' }}>
                {s.mono}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Accent strip */}
        <div
          className="rounded-xl px-8 py-5 flex items-center gap-4"
          style={{
            background: 'var(--magenta-soft)',
            border: '1px solid rgba(255,73,107,0.25)',
          }}
        >
          <span
            className="block w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: 'var(--magenta)' }}
          />
          <p className="font-medium text-base" style={{ color: 'var(--text)' }}>
            Для чата — терпимо. Для агента — сорванный заказ.
          </p>
        </div>
      </div>
    </section>
  );
}

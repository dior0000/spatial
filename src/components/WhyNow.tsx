const COMPETITORS = [
  {
    name: 'Google · HERE · Mapbox',
    items: ['Грундят на своих данных', 'Прицел на мировой enterprise', 'Слабое покрытие СНГ', 'Нет вертикальной логики'],
    variant: 'neutral' as const,
  },
  {
    name: 'Слепая зона',
    items: ['СНГ — не приоритет глобальных игроков', 'Вертикальные агенты не строятся', 'Локальные данные не оцифрованы системно'],
    variant: 'muted' as const,
  },
  {
    name: 'Локус',
    items: ['Локальные данные + верификация СНГ', 'Вертикальная логика (выездные услуги)', 'Telegram-дистрибуция — нулевой friction', 'Маховик данных с первого дня'],
    variant: 'teal' as const,
  },
];

const WEDGE = [
  { label: 'Регион', value: 'СНГ — 280 млн человек, недообслуживаемый рынок' },
  { label: 'Вертикаль', value: 'Выездные услуги — высокая PLV, частые запросы маршрутов' },
  { label: 'Дистрибуция', value: 'Telegram Mini App — встроен в рабочий инструмент специалиста' },
];

export default function WhyNow() {
  return (
    <section id="why" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <p className="eyebrow mb-5">Почему сейчас</p>
        <h2
          className="font-display font-bold mb-5"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text)' }}
        >
          Окно открыто — и оно нашего размера
        </h2>
        <p className="text-base mb-16 max-w-xl" style={{ color: 'var(--text-dim)' }}>
          Глобальные игроки строят грундинг на своих данных и под мировой enterprise.
          Региональная ниша СНГ + вертикаль + Telegram — это клин, который они не возьмут.
        </p>

        {/* Competitor vs Locus table */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {COMPETITORS.map((c) => (
            <div
              key={c.name}
              className="card p-6 flex flex-col gap-4"
              style={{
                background: 'var(--surface)',
                border: c.variant === 'teal' ? '1px solid var(--teal-line)' : '1px solid var(--line)',
              }}
            >
              <div
                className="font-display font-semibold text-base"
                style={{
                  color:
                    c.variant === 'teal'
                      ? 'var(--teal)'
                      : c.variant === 'muted'
                      ? 'var(--text-mute)'
                      : 'var(--text-dim)',
                }}
              >
                {c.name}
              </div>
              <ul className="flex flex-col gap-2">
                {c.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span
                      className="mt-1.5 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background:
                          c.variant === 'teal'
                            ? 'var(--teal)'
                            : c.variant === 'muted'
                            ? 'var(--text-mute)'
                            : 'var(--text-mute)',
                      }}
                    />
                    <span
                      style={{
                        color: c.variant === 'teal' ? 'var(--text)' : 'var(--text-dim)',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wedge detail */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
        >
          <div className="font-mono text-xs mb-6" style={{ color: 'var(--text-mute)' }}>
            // клин = регион × вертикаль × дистрибуция
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {WEDGE.map((w) => (
              <div key={w.label}>
                <div
                  className="font-mono text-xs uppercase tracking-wider mb-2"
                  style={{ color: 'var(--teal)' }}
                >
                  {w.label}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                  {w.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

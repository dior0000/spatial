// Detailed mock responses for each demo chip.
// Each mock intentionally fills every schema field, including reconciliation
// discrepancies and a clearly caught "naive" error, to demonstrate Locus value.

import type { SpatialDemoResponse } from './types';

// Chip labels shown in the UI — order matches CHIPS array in Demo.tsx
export const CHIPS = [
  'Оптимальный маршрут по 5 адресам в Минске с учётом пробок',
  'Салоны красоты в радиусе 1 км от ст. м. Немига, которые сейчас открыты',
  'Сколько ехать от центра до Уручья в час пик',
  'В каком ТЦ находится этот адрес и что рядом: пр. Дзержинского, 9',
] as const;

export type ChipIndex = 0 | 1 | 2 | 3;

// ---------------------------------------------------------------------------
// Mock 0 — Route optimisation
// ---------------------------------------------------------------------------
const mock0: SpatialDemoResponse = {
  naive:
    'Оптимальный маршрут: ул. Ленина → пл. Победы → ул. Притыцкого, 83 → пр. Независимости, 77 → ул. Сурганова, 3. ' +
    'Общее расстояние около 14 км, время — примерно 25 минут. [⚠ Порядок выбран произвольно, пробки не учтены; ' +
    'ул. Ленина в данном контексте может означать разные здания — адрес не разрезолвлен]',
  plan: [
    'Геокодировать 5 адресов через локальный граф + 2ГИС',
    'Получить матрицу времён поездки с учётом текущих пробок',
    'Решить задачу коммивояжёра (TSP) детерминированным алгоритмом',
    'Верифицировать результат: координаты в границах Минска, время правдоподобно',
    'Сформировать ответ с inline-источниками',
  ],
  grounding: [
    {
      query: 'ул. Ленина, Минск',
      resolvedName: 'ул. Ленина, 28, Минск',
      lat: 53.9024,
      lng: 27.5618,
      gersId: 'geo:minsk:street:lenina',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.97 },
        { name: 'OSM', provider: 'osm', confidence: 0.94 },
      ],
    },
    {
      query: 'пл. Победы, Минск',
      resolvedName: 'пл. Победы, 1, Минск',
      lat: 53.9124,
      lng: 27.5676,
      gersId: 'geo:minsk:place:pobedy',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.99 },
        { name: 'Яндекс', provider: 'yandex', confidence: 0.98 },
      ],
    },
    {
      query: 'ул. Притыцкого, 83',
      resolvedName: 'ул. Притыцкого, 83, Минск',
      lat: 53.9015,
      lng: 27.4842,
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.95 },
        { name: 'OSM', provider: 'osm', confidence: 0.91 },
      ],
    },
    {
      query: 'пр. Независимости, 77',
      resolvedName: 'пр. Независимости, 77, Минск',
      lat: 53.9178,
      lng: 27.6201,
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.97 },
        { name: 'Яндекс', provider: 'yandex', confidence: 0.96 },
      ],
    },
    {
      query: 'ул. Сурганова, 3',
      resolvedName: 'ул. Сурганова, 3, Минск',
      lat: 53.9063,
      lng: 27.5532,
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.98 },
        { name: 'OSM', provider: 'osm', confidence: 0.95 },
      ],
    },
  ],
  reconciliation: [
    {
      field: 'Время до ул. Притыцкого 83 (в час пик)',
      candidates: [
        { provider: '2gis', value: '22 мин' },
        { provider: 'yandex', value: '19 мин' },
        { provider: 'mapbox', value: '24 мин' },
      ],
      chosen: '22 мин',
      reason: '2ГИС имеет наибольшее покрытие локальных дорог Минска; медианная оценка совпадает',
    },
    {
      field: 'Расстояние маршрута (итог TSP)',
      candidates: [
        { provider: '2gis', value: '18.4 км' },
        { provider: 'yandex', value: '18.1 км' },
        { provider: 'osm', value: '18.7 км' },
      ],
      chosen: '18.4 км',
      reason: 'Маршрут посчитан по координатам 2ГИС — наиболее точный для внутригородской навигации',
    },
  ],
  computation: [
    {
      kind: 'route',
      result: {
        order: [
          'ул. Сурганова, 3',
          'ул. Ленина, 28',
          'пл. Победы, 1',
          'пр. Независимости, 77',
          'ул. Притыцкого, 83',
        ],
        totalDistanceKm: 18.4,
        totalMinutes: 38,
      },
      computedBy: 'tool',
      note: 'TSP nearest-neighbour + 2-opt, матрица поездок из API 2ГИС с пробками',
    },
    {
      kind: 'eta',
      result: { departureNow: '09:15', arrivalLast: '09:53' },
      computedBy: 'tool',
    },
  ],
  verification: {
    checks: [
      { rule: 'Все координаты в границах Минска', passed: true },
      { rule: 'Время поездки правдоподобно для расстояния', passed: true },
      { rule: 'Каждый адрес имеет ≥1 подтверждённый источник', passed: true },
      { rule: 'Нет выдуманных топонимов', passed: true },
      { rule: 'TSP-порядок не хуже жадного на 5%', passed: true },
    ],
    passed: true,
  },
  confidence: 0.94,
  answer:
    'Оптимальный порядок объезда с учётом пробок:\n' +
    '1. ул. Сурганова, 3 → 2. ул. Ленина, 28 → 3. пл. Победы, 1 → ' +
    '4. пр. Независимости, 77 → 5. ул. Притыцкого, 83\n' +
    'Расстояние: 18.4 км · Время: ~38 мин · Выезд 09:15 → прибытие 09:53\n' +
    'Источники: 2ГИС (маршрут + пробки), OSM (геометрия)',
  sources: [
    { name: '2ГИС Маршруты', provider: '2gis', confidence: 0.97 },
    { name: 'OSM Беларусь', provider: 'osm', confidence: 0.93 },
    { name: 'Яндекс Пробки', provider: 'yandex', confidence: 0.91 },
  ],
  flywheel: {
    factsAdded: 14,
    note: 'Добавлено 14 связей адрес↔координата в локальный граф Минска',
  },
};

// ---------------------------------------------------------------------------
// Mock 1 — Beauty salons near Nemiga metro, open now
// ---------------------------------------------------------------------------
const mock1: SpatialDemoResponse = {
  naive:
    'Рядом с метро Немига есть несколько салонов красоты: «Бьюти Хаус», «Лаванда», «Шарм», «Элегант». ' +
    'Большинство работают с 9:00 до 20:00. [⚠ Названия сгенерированы без проверки — салонов с такими именами ' +
    'в этом месте может не существовать; время работы взято из общих предположений, не из реальных данных]',
  plan: [
    'Геокодировать "ст. м. Немига" → получить координаты входа',
    'Запрос к локальному POI-графу: категория "салон красоты", радиус 1000 м',
    'Обогатить данными о часах работы из 2ГИС',
    'Фильтрация: оставить только открытые сейчас (текущее время сервера)',
    'Верифицировать наличие каждого заведения в ≥2 источниках',
  ],
  grounding: [
    {
      query: 'ст. м. Немига, Минск',
      resolvedName: 'Станция метро «Немига»',
      lat: 53.9039,
      lng: 27.5453,
      gersId: 'geo:minsk:metro:nemiga',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.99 },
        { name: 'OSM', provider: 'osm', confidence: 0.99 },
      ],
    },
    {
      query: 'салон красоты в радиусе 1 км',
      resolvedName: 'Салон «Облако» — ул. Немига, 5',
      lat: 53.9044,
      lng: 27.5471,
      gersId: 'geo:minsk:poi:oblako_beauty',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.96 },
        { name: 'Яндекс', provider: 'yandex', confidence: 0.88 },
      ],
    },
    {
      query: 'салон красоты в радиусе 1 км',
      resolvedName: 'BarberPro — пр. Победителей, 11',
      lat: 53.9067,
      lng: 27.5512,
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.93 },
        { name: 'OSM', provider: 'osm', confidence: 0.81 },
      ],
    },
    {
      query: 'салон красоты в радиусе 1 км',
      resolvedName: 'Салон «Венера» — ул. Революционная, 3',
      lat: 53.9021,
      lng: 27.5489,
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.91 },
      ],
    },
  ],
  reconciliation: [
    {
      field: 'Часы работы — Салон «Облако»',
      candidates: [
        { provider: '2gis', value: '10:00–20:00' },
        { provider: 'yandex', value: '09:00–21:00' },
      ],
      chosen: '10:00–20:00',
      reason: '2ГИС обновлён 3 дня назад, Яндекс — 2 месяца назад; приоритет свежести',
    },
    {
      field: 'Часы работы — BarberPro',
      candidates: [
        { provider: '2gis', value: '09:00–19:00' },
        { provider: 'osm', value: 'не указано' },
      ],
      chosen: '09:00–19:00',
      reason: 'OSM не содержит данных о режиме, принят единственный авторитетный источник',
    },
  ],
  computation: [
    {
      kind: 'isochrone',
      result: { centerLat: 53.9039, centerLng: 27.5453, radiusM: 1000, poisFound: 3 },
      computedBy: 'tool',
      note: 'Haversine-фильтр по радиусу 1000 м от координат входа в метро',
    },
    {
      kind: 'distance',
      result: [
        { name: 'Облако', distanceM: 210 },
        { name: 'BarberPro', distanceM: 680 },
        { name: 'Венера', distanceM: 410 },
      ],
      computedBy: 'tool',
    },
  ],
  verification: {
    checks: [
      { rule: 'Все POI в пределах 1 км от метро', passed: true },
      { rule: 'Часы работы подтверждены ≥1 источником', passed: true },
      { rule: 'Текущее время попадает в окно работы', passed: true, detail: 'Запрос 14:32, все открыты' },
      { rule: 'Нет выдуманных заведений', passed: true },
    ],
    passed: true,
  },
  confidence: 0.91,
  answer:
    'Салоны красоты в радиусе 1 км от м. Немига, открытые сейчас (14:32):\n' +
    '• Салон «Облако» — ул. Немига, 5 · 210 м · работает до 20:00 (2ГИС)\n' +
    '• Салон «Венера» — ул. Революционная, 3 · 410 м · работает до 20:00 (2ГИС)\n' +
    '• BarberPro — пр. Победителей, 11 · 680 м · работает до 19:00 (2ГИС)\n' +
    'Координаты метро: 53.9039, 27.5453',
  sources: [
    { name: '2ГИС POI', provider: '2gis', confidence: 0.96 },
    { name: 'Яндекс Карты', provider: 'yandex', confidence: 0.88 },
    { name: 'OSM Беларусь', provider: 'osm', confidence: 0.83 },
  ],
  flywheel: {
    factsAdded: 9,
    note: 'Добавлено 9 POI-фактов (часы, категории, координаты) в локальный граф',
  },
};

// ---------------------------------------------------------------------------
// Mock 2 — ETA from centre to Uruchye in rush hour
// ---------------------------------------------------------------------------
const mock2: SpatialDemoResponse = {
  naive:
    'От центра Минска до района Уручье обычно ехать около 15–20 минут. В час пик может быть дольше. ' +
    '[⚠ Расстояние не посчитано; «центр» не определён точно; пробки не учтены по реальным данным — ' +
    'оценка является предположением модели, основанным на общих знаниях о городе]',
  plan: [
    'Разрезолвить "центр Минска" → якорная точка (пл. Независимости)',
    'Разрезолвить "Уручье" → геометрический центроид района',
    'Запрос матрицы времён поездки в час пик (18:00–19:00)',
    'Сравнить с не-пиковым временем для контекста',
    'Верифицировать правдоподобность оценки',
  ],
  grounding: [
    {
      query: 'центр Минска',
      resolvedName: 'Площадь Независимости, Минск',
      lat: 53.8975,
      lng: 27.5490,
      gersId: 'geo:minsk:place:nezavisimosti',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.98 },
        { name: 'OSM', provider: 'osm', confidence: 0.97 },
      ],
    },
    {
      query: 'Уручье, Минск',
      resolvedName: 'Микрорайон Уручье, Минск (центроид)',
      lat: 53.9478,
      lng: 27.6712,
      gersId: 'geo:minsk:district:uruchye',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.96 },
        { name: 'OSM', provider: 'osm', confidence: 0.95 },
        { name: 'Яндекс', provider: 'yandex', confidence: 0.94 },
      ],
    },
  ],
  reconciliation: [
    {
      field: 'ETA в час пик (18:00)',
      candidates: [
        { provider: '2gis', value: '42 мин' },
        { provider: 'yandex', value: '38 мин' },
        { provider: 'mapbox', value: '45 мин' },
      ],
      chosen: '42 мин',
      reason: '2ГИС показывает исторически наиболее точный час-пиковый прогноз для Минска; медиана трёх источников',
    },
    {
      field: 'ETA вне часа пик',
      candidates: [
        { provider: '2gis', value: '22 мин' },
        { provider: 'yandex', value: '20 мин' },
        { provider: 'mapbox', value: '23 мин' },
      ],
      chosen: '22 мин',
      reason: 'Консистентная оценка, выбран 2ГИС как основной провайдер',
    },
  ],
  computation: [
    {
      kind: 'distance',
      result: { straightLineKm: 14.1, roadKm: 17.8 },
      computedBy: 'tool',
      note: 'Прямое расстояние (Haversine) + дорожная дистанция по OSM-графу',
    },
    {
      kind: 'eta',
      result: { rushHourMinutes: 42, offPeakMinutes: 22, peakMultiplier: 1.9 },
      computedBy: 'tool',
    },
  ],
  verification: {
    checks: [
      { rule: 'Обе точки в границах Минска', passed: true },
      { rule: 'Дорожное расстояние > прямолинейного', passed: true },
      { rule: 'Пиковый коэффициент 1.9× — в разумном диапазоне для Минска', passed: true },
      { rule: 'ETA подтверждён ≥2 источниками', passed: true },
    ],
    passed: true,
  },
  confidence: 0.93,
  answer:
    'От пл. Независимости до Уручья:\n' +
    '• В час пик (18:00–19:00): ~42 мин · 17.8 км по дороге\n' +
    '• Вне пика: ~22 мин\n' +
    'Маршрут: пр. Независимости → МКАД-2 → ул. Уборевича\n' +
    'Источники: 2ГИС (пробки), Яндекс (контроль), OSM (геометрия)',
  sources: [
    { name: '2ГИС Трафик', provider: '2gis', confidence: 0.95 },
    { name: 'Яндекс Пробки', provider: 'yandex', confidence: 0.91 },
    { name: 'OSM Беларусь', provider: 'osm', confidence: 0.94 },
    { name: 'Mapbox Directions', provider: 'mapbox', confidence: 0.89 },
  ],
  flywheel: {
    factsAdded: 6,
    note: 'Обновлён профиль скорости для маршрута центр↔Уручье в пиковые часы',
  },
};

// ---------------------------------------------------------------------------
// Mock 3 — Which mall contains this address + what's nearby
// ---------------------------------------------------------------------------
const mock3: SpatialDemoResponse = {
  naive:
    'Проспект Дзержинского, 9 в Минске — это офисный или жилой адрес. Рядом могут находиться ТЦ «Столица» ' +
    'или «Галерея». [⚠ Адрес не проверен: пр. Дзержинского, 9 НЕ входит в периметр ТЦ «Столица» — ' +
    'он находится в центре на пл. Независимости. Модель перепутала адреса; «Галерея» расположена в другом районе]',
  plan: [
    'Геокодировать "пр. Дзержинского, 9, Минск"',
    'Проверить принадлежность координаты полигону любого ТЦ',
    'Если адрес НЕ внутри ТЦ — сообщить и найти ближайший ТЦ',
    'Запрос POI в радиусе 500 м: кафе, аптеки, банки, транспорт',
    'Верифицировать наличие инфраструктуры',
  ],
  grounding: [
    {
      query: 'пр. Дзержинского, 9, Минск',
      resolvedName: 'пр. Дзержинского, 9 — ТЦ «Паркинсон» (Minsk)',
      lat: 53.8879,
      lng: 27.4701,
      gersId: 'geo:minsk:poi:parkinson_mall',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.97 },
        { name: 'OSM', provider: 'osm', confidence: 0.94 },
      ],
    },
  ],
  reconciliation: [
    {
      field: 'Название ТЦ по адресу',
      candidates: [
        { provider: '2gis', value: 'ТЦ «Паркинсон»' },
        { provider: 'yandex', value: 'БЦ «Дзержинского 9»' },
        { provider: 'osm', value: 'Торговый центр (без названия)' },
      ],
      chosen: 'ТЦ «Паркинсон»',
      reason: '2ГИС содержит актуальное название с датой обновления <30 дней; Яндекс устаревший (БЦ переименован)',
    },
    {
      field: 'Тип здания',
      candidates: [
        { provider: '2gis', value: 'торгово-развлекательный центр' },
        { provider: 'yandex', value: 'бизнес-центр' },
        { provider: 'osm', value: 'retail' },
      ],
      chosen: 'торгово-развлекательный центр',
      reason: '2ГИС и OSM согласны на retail-функции; данные Яндекса устарели',
    },
  ],
  computation: [
    {
      kind: 'isochrone',
      result: {
        centerLat: 53.8879,
        centerLng: 27.4701,
        radiusM: 500,
        nearbyPois: [
          { category: 'Кафе / Рестораны', count: 7 },
          { category: 'Аптеки', count: 2 },
          { category: 'Банкоматы', count: 4 },
          { category: 'Остановки', count: 3 },
        ],
      },
      computedBy: 'tool',
      note: 'POI-запрос из локального графа, радиус 500 м',
    },
  ],
  verification: {
    checks: [
      { rule: 'Адрес существует в 2ГИС и OSM', passed: true },
      { rule: 'Полигон ТЦ содержит координату адреса', passed: true },
      { rule: 'POI рядом подтверждены ≥1 источником', passed: true },
      {
        rule: 'Расхождение источников по типу здания зафиксировано',
        passed: true,
        detail: 'Яндекс помечен устаревшим',
      },
    ],
    passed: true,
  },
  confidence: 0.95,
  answer:
    'Адрес пр. Дзержинского, 9 — это ТЦ «Паркинсон» (2ГИС, OSM · 53.8879, 27.4701).\n' +
    'Что рядом (радиус 500 м):\n' +
    '• 7 кафе и ресторанов\n' +
    '• 2 аптеки\n' +
    '• 4 банкомата\n' +
    '• 3 остановки общественного транспорта\n' +
    'Примечание: Яндекс ошибочно называет здание «БЦ» — данные устарели, принят 2ГИС.',
  sources: [
    { name: '2ГИС Минск', provider: '2gis', confidence: 0.97 },
    { name: 'OSM Беларусь', provider: 'osm', confidence: 0.94 },
    { name: 'Яндекс Карты (устарело)', provider: 'yandex', confidence: 0.61 },
  ],
  flywheel: {
    factsAdded: 11,
    note: 'Добавлено 11 POI-фактов для района пр. Дзержинского; устаревшая запись Яндекса помечена',
  },
};

export const MOCKS: Record<ChipIndex, SpatialDemoResponse> = {
  0: mock0,
  1: mock1,
  2: mock2,
  3: mock3,
};

// Return mock for a free-form query by matching keywords
export function getMockForQuery(query: string): SpatialDemoResponse {
  const q = query.toLowerCase();
  if (q.includes('маршрут') || q.includes('адрес') || q.includes('объезд')) return MOCKS[0];
  if (q.includes('салон') || q.includes('красот') || q.includes('немига')) return MOCKS[1];
  if (q.includes('уручь') || q.includes('час пик') || q.includes('ехать')) return MOCKS[2];
  return MOCKS[3];
}

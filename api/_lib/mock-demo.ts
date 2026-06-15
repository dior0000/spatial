import type { SpatialDemoResponse } from './types';

export function getMockForQuery(query: string): SpatialDemoResponse {
  const q = query.toLowerCase();
  if (q.includes('маршрут') || q.includes('объезд') || q.includes('адресам')) return mock0;
  if (q.includes('салон') || q.includes('красот') || q.includes('немига')) return mock1;
  if (q.includes('уручь') || q.includes('час пик') || q.includes('ехать')) return mock2;
  return mock3;
}

// ---------------------------------------------------------------------------
// Mock 0 — Route optimisation across 5 real Minsk addresses
// ---------------------------------------------------------------------------
const mock0: SpatialDemoResponse = {
  naive:
    'Оптимальный маршрут: пр. Независимости, 18 → пл. Победы → ул. Притыцкого, 83 → ' +
    'ул. Сурганова, 3 → пр. Машерова, 9. Общее расстояние около 12 км, время — примерно 20 минут. ' +
    '[⚠ Порядок выбран произвольно без расчёта матрицы расстояний; пробки не учтены; ' +
    'пр. Машерова переименован в пр. Победителей в 2005 г. — адрес устарел]',
  plan: [
    'Геокодировать 5 адресов через локальный граф + 2ГИС/OSM',
    'Получить матрицу времён поездки с учётом текущих пробок (Яндекс / 2ГИС)',
    'Решить задачу коммивояжёра (TSP) детерминированным алгоритмом nearest-neighbour + 2-opt',
    'Верифицировать: все координаты в границах Минска, время правдоподобно, нет устаревших топонимов',
    'Сформировать ответ с inline-источниками',
  ],
  grounding: [
    {
      query: 'пр. Независимости, 18, Минск',
      resolvedName: 'пр. Независимости, 18 (у ЦУМа)',
      lat: 53.9042,
      lng: 27.5612,
      gersId: 'geo:minsk:addr:nezavisimosti_18',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.98 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.96 },
      ],
    },
    {
      query: 'пл. Победы, Минск',
      resolvedName: 'Площадь Победы (обелиск)',
      lat: 53.9125,
      lng: 27.5676,
      gersId: 'geo:minsk:place:pobedy_sq',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.99 },
        { name: 'Яндекс Карты', provider: 'yandex', confidence: 0.99 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.99 },
      ],
    },
    {
      query: 'ул. Притыцкого, 83, Минск',
      resolvedName: 'ул. Притыцкого, 83 (р-н Малиновка)',
      lat: 53.9018,
      lng: 27.4843,
      gersId: 'geo:minsk:addr:pritytskogo_83',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.95 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.92 },
      ],
    },
    {
      query: 'ул. Сурганова, 3, Минск',
      resolvedName: 'ул. Сурганова, 3 (р-н Академии наук)',
      lat: 53.9063,
      lng: 27.5533,
      gersId: 'geo:minsk:addr:surganova_3',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.97 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.95 },
      ],
    },
    {
      query: 'пр. Победителей, 9, Минск',
      resolvedName: 'пр. Победителей, 9 (Дворец Республики — сторона)',
      lat: 53.9035,
      lng: 27.5491,
      gersId: 'geo:minsk:addr:pobeditelei_9',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.97 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.94 },
      ],
    },
  ],
  reconciliation: [
    {
      field: 'Время до ул. Притыцкого, 83 от центра (утренний час пик)',
      candidates: [
        { provider: '2gis', value: '24 мин' },
        { provider: 'yandex', value: '21 мин' },
        { provider: 'mapbox', value: '27 мин' },
      ],
      chosen: '24 мин',
      reason: '2ГИС имеет наиболее точные исторические пробки по Минску; медианная оценка между тремя источниками',
    },
    {
      field: 'Суммарное расстояние оптимального маршрута',
      candidates: [
        { provider: '2gis', value: '19.2 км' },
        { provider: 'yandex', value: '18.8 км' },
        { provider: 'osm', value: '19.5 км' },
      ],
      chosen: '19.2 км',
      reason: '2ГИС использует актуальную дорожную сеть Минска включая новые съезды у р. Свислочь',
    },
  ],
  computation: [
    {
      kind: 'route',
      result: {
        order: [
          'пр. Победителей, 9',
          'пр. Независимости, 18',
          'пл. Победы',
          'ул. Сурганова, 3',
          'ул. Притыцкого, 83',
        ],
        totalDistanceKm: 19.2,
        totalMinutes: 41,
        segments: [
          { from: 'пр. Победителей, 9', to: 'пр. Независимости, 18', km: 1.1, min: 5 },
          { from: 'пр. Независимости, 18', to: 'пл. Победы', km: 1.7, min: 7 },
          { from: 'пл. Победы', to: 'ул. Сурганова, 3', km: 2.1, min: 8 },
          { from: 'ул. Сурганова, 3', to: 'ул. Притыцкого, 83', km: 14.3, min: 21 },
        ],
      },
      computedBy: 'tool',
      note: 'TSP nearest-neighbour + 2-opt; матрица поездок из 2ГИС API с пробками на 09:00 пн',
    },
    {
      kind: 'eta',
      result: { departureNow: '09:00', arrivalLast: '09:41' },
      computedBy: 'tool',
    },
  ],
  verification: {
    checks: [
      { rule: 'Все 5 координат в границах г. Минска (bbox 53.82–53.97, 27.41–27.70)', passed: true },
      { rule: 'Дорожное расстояние > прямолинейного для каждого сегмента', passed: true },
      { rule: 'Время поездки соответствует средней скорости 28 км/ч в час пик', passed: true },
      { rule: 'Каждый адрес подтверждён ≥2 источниками', passed: true },
      { rule: 'Устаревший топоним «пр. Машерова» не использован', passed: true },
      { rule: 'TSP-порядок проверен: не хуже жадного на 5%', passed: true },
    ],
    passed: true,
  },
  confidence: 0.94,
  answer:
    'Оптимальный порядок объезда (с учётом пробок на 09:00):\n' +
    '1. пр. Победителей, 9 → 2. пр. Независимости, 18 → 3. пл. Победы → ' +
    '4. ул. Сурганова, 3 → 5. ул. Притыцкого, 83\n' +
    'Итого: 19.2 км · ~41 мин · Выезд 09:00 → прибытие 09:41\n' +
    'Источники: 2ГИС (пробки + геокодинг), OSM Belarus (геометрия дорог)',
  sources: [
    { name: '2ГИС Минск', provider: '2gis', confidence: 0.97 },
    { name: 'OSM Belarus', provider: 'osm', confidence: 0.94 },
    { name: 'Яндекс Пробки', provider: 'yandex', confidence: 0.91 },
  ],
  flywheel: {
    factsAdded: 17,
    note: 'Добавлено 17 связей адрес↔координата + 4 сегмента пробок в граф Минска',
  },
};

// ---------------------------------------------------------------------------
// Mock 1 — Beauty salons near Немига metro (real Minsk geography)
// ---------------------------------------------------------------------------
const mock1: SpatialDemoResponse = {
  naive:
    'Рядом с метро Немига есть несколько салонов красоты: «Бьюти Хаус», «Лаванда», «Шарм», «Элегант». ' +
    'Большинство работают с 9:00 до 20:00. [⚠ Названия сгенерированы без проверки — ' +
    'салонов с такими именами в этом месте может не существовать; ' +
    'время работы взято из общих предположений, не из реальных данных]',
  plan: [
    'Геокодировать "ст. м. Немига" → точные координаты вестибюля (53.9041, 27.5452)',
    'Запрос к локальному POI-графу: категория "салон красоты / барбершоп", радиус 1000 м',
    'Обогатить часами работы из 2ГИС (свежесть данных ≤30 дней)',
    'Фильтрация: оставить только открытые сейчас (серверное UTC+3)',
    'Верифицировать координаты каждого POI: должны быть в радиусе 1 км от метро',
  ],
  grounding: [
    {
      query: 'ст. м. Немига, Минск',
      resolvedName: 'Станция метро «Немига», вестибюль (ул. Немига, 3)',
      lat: 53.9041,
      lng: 27.5452,
      gersId: 'geo:minsk:metro:nyamiga',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.99 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.99 },
        { name: 'Яндекс Карты', provider: 'yandex', confidence: 0.99 },
      ],
    },
    {
      query: 'салон красоты, ул. Немига, Минск',
      resolvedName: 'Салон красоты «Имидж» — ул. Немига, 10',
      lat: 53.9048,
      lng: 27.5463,
      gersId: 'geo:minsk:poi:imidzh_nemiga',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.94 },
        { name: 'Яндекс Карты', provider: 'yandex', confidence: 0.87 },
      ],
    },
    {
      query: 'барбершоп, пр. Победителей, Минск',
      resolvedName: 'Mr. Barber — пр. Победителей, 5 (ТЦ «Европа»)',
      lat: 53.9033,
      lng: 27.5489,
      gersId: 'geo:minsk:poi:mrbarber_europa',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.93 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.79 },
      ],
    },
    {
      query: 'салон красоты, ул. Комсомольская, Минск',
      resolvedName: 'Студия красоты Aura — ул. Комсомольская, 11',
      lat: 53.9021,
      lng: 27.5501,
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.91 },
      ],
    },
  ],
  reconciliation: [
    {
      field: 'Часы работы — Салон «Имидж» (ул. Немига, 10)',
      candidates: [
        { provider: '2gis', value: '10:00–21:00 (обновлено 5 дней назад)' },
        { provider: 'yandex', value: '09:00–20:00 (обновлено 3 мес. назад)' },
      ],
      chosen: '10:00–21:00',
      reason: '2ГИС обновлён 5 дней назад vs 3 месяца у Яндекса; приоритет по свежести',
    },
    {
      field: 'Адрес Mr. Barber',
      candidates: [
        { provider: '2gis', value: 'пр. Победителей, 5 (ТЦ «Европа»)' },
        { provider: 'osm', value: 'пр. Победителей, 7' },
      ],
      chosen: 'пр. Победителей, 5 (ТЦ «Европа»)',
      reason: '2ГИС подтверждён фото входа; OSM не имеет уточнения номера корпуса ТЦ',
    },
  ],
  computation: [
    {
      kind: 'isochrone',
      result: {
        centerLat: 53.9041,
        centerLng: 27.5452,
        radiusM: 1000,
        poisFound: 3,
        filterOpenNow: true,
      },
      computedBy: 'tool',
      note: 'Haversine-фильтр по радиусу 1000 м от координат вестибюля метро «Немига»',
    },
    {
      kind: 'distance',
      result: [
        { name: 'Салон «Имидж»', distanceM: 145, walkMinutes: 2 },
        { name: 'Mr. Barber (ТЦ «Европа»)', distanceM: 390, walkMinutes: 5 },
        { name: 'Студия Aura', distanceM: 480, walkMinutes: 6 },
      ],
      computedBy: 'tool',
    },
  ],
  verification: {
    checks: [
      { rule: 'Все POI в пределах 1 км от вестибюля м. Немига', passed: true },
      { rule: 'Часы работы подтверждены 2ГИС с давностью ≤30 дней', passed: true },
      { rule: 'Текущее время 14:32 попадает в окно работы всех трёх', passed: true, detail: '10:00–21:00 / 09:00–21:00 / 10:00–20:00' },
      { rule: 'Нет сгенерированных (несуществующих) названий', passed: true },
      { rule: 'Пешеходное расстояние соответствует Haversine ±10%', passed: true },
    ],
    passed: true,
  },
  confidence: 0.91,
  answer:
    'Салоны красоты в пешей доступности от м. Немига, открытые сейчас (14:32):\n' +
    '• Салон «Имидж» — ул. Немига, 10 · 145 м (2 мин) · до 21:00 · 2ГИС ✓\n' +
    '• Mr. Barber (ТЦ «Европа») — пр. Победителей, 5 · 390 м (5 мин) · до 21:00 · 2ГИС ✓\n' +
    '• Студия Aura — ул. Комсомольская, 11 · 480 м (6 мин) · до 20:00 · 2ГИС ✓\n' +
    'Координата метро: 53.9041, 27.5452 (вестибюль ул. Немига)',
  sources: [
    { name: '2ГИС Минск POI', provider: '2gis', confidence: 0.94 },
    { name: 'Яндекс Карты', provider: 'yandex', confidence: 0.87 },
    { name: 'OSM Belarus', provider: 'osm', confidence: 0.82 },
  ],
  flywheel: {
    factsAdded: 11,
    note: 'Добавлено 11 POI-фактов (часы, категории, координаты) в граф района Немига',
  },
};

// ---------------------------------------------------------------------------
// Mock 2 — ETA from Minsk centre to Uručča (Uručye) in rush hour
// ---------------------------------------------------------------------------
const mock2: SpatialDemoResponse = {
  naive:
    'От центра Минска до района Уручье обычно ехать около 15–20 минут. В час пик может быть дольше. ' +
    '[⚠ «Центр» не определён конкретной точкой; расстояние не посчитано; ' +
    'оценка 15–20 мин занижена — реальное время в час пик составляет 35–50 мин; ' +
    'пробки не учтены по реальным данным]',
  plan: [
    'Разрезолвить "центр Минска" → пл. Независимости (53.8974, 27.5490) как общепринятый центроид',
    'Разрезолвить "Уручье" → геометрический центроид микрорайона по OSM-полигону',
    'Запрос матрицы времён для двух сценариев: 09:00 пн (час пик) и 13:00 сб (вне пика)',
    'Рассчитать Haversine + road factor для проверки правдоподобности',
    'Верифицировать: оба пункта в Минске, коэффициент пик/не-пик в норме',
  ],
  grounding: [
    {
      query: 'центр Минска',
      resolvedName: 'Площадь Независимости, Минск',
      lat: 53.8974,
      lng: 27.549,
      gersId: 'geo:minsk:place:ploshchad_nezavisimosti',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.98 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.98 },
        { name: 'Яндекс Карты', provider: 'yandex', confidence: 0.97 },
      ],
    },
    {
      query: 'Уручье, Минск',
      resolvedName: 'Микрорайон Уручча (Уручье), Минск — центроид полигона',
      lat: 53.9483,
      lng: 27.6698,
      gersId: 'geo:minsk:district:uruchcha',
      sources: [
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.97 },
        { name: '2ГИС', provider: '2gis', confidence: 0.95 },
        { name: 'Яндекс Карты', provider: 'yandex', confidence: 0.93 },
      ],
    },
  ],
  reconciliation: [
    {
      field: 'ETA в утренний час пик (09:00 пн)',
      candidates: [
        { provider: '2gis', value: '44 мин' },
        { provider: 'yandex', value: '39 мин' },
        { provider: 'mapbox', value: '47 мин' },
      ],
      chosen: '44 мин',
      reason: '2ГИС имеет исторические данные пробок по пр. Независимости и МКАД; медиана трёх оценок ≈ 43 мин',
    },
    {
      field: 'ETA вне часа пик (13:00 сб)',
      candidates: [
        { provider: '2gis', value: '23 мин' },
        { provider: 'yandex', value: '21 мин' },
        { provider: 'mapbox', value: '24 мин' },
      ],
      chosen: '23 мин',
      reason: 'Консенсус источников; 2ГИС выбран как основной провайдер для Минска',
    },
  ],
  computation: [
    {
      kind: 'distance',
      result: {
        haversineKm: 13.8,
        roadKm: 18.1,
        roadFactor: 1.31,
        primaryRoute: 'пл. Независимости → пр. Независимости → пр. Рокоссовского → ул. Уборевича',
      },
      computedBy: 'tool',
      note: 'Haversine 13.8 км; дорожный граф OSM даёт 18.1 км (коэффициент 1.31 — норма для Минска)',
    },
    {
      kind: 'eta',
      result: {
        rushHourMinutes: 44,
        offPeakMinutes: 23,
        peakMultiplier: 1.91,
        avgSpeedRushKmh: 24.7,
        avgSpeedOffPeakKmh: 47.2,
      },
      computedBy: 'tool',
    },
  ],
  verification: {
    checks: [
      { rule: 'Обе точки в границах г. Минска (bbox 53.82–53.97, 27.41–27.70)', passed: true },
      { rule: 'Дорожное расстояние > Haversine (18.1 > 13.8 км)', passed: true },
      { rule: 'Дорожный коэффициент 1.31 в норме для плотной застройки (ожидается 1.2–1.5)', passed: true },
      { rule: 'Пиковый множитель 1.91× в норме для Минска (типично 1.7–2.2)', passed: true },
      { rule: 'ETA подтверждён ≥2 независимыми источниками', passed: true },
    ],
    passed: true,
  },
  confidence: 0.93,
  answer:
    'Маршрут: пл. Независимости → пр. Независимости → пр. Рокоссовского → ул. Уборевича → Уручча\n' +
    '• Расстояние по дороге: 18.1 км (по прямой 13.8 км)\n' +
    '• В час пик (09:00 пн): ~44 мин · средняя скорость 24.7 км/ч\n' +
    '• Вне пика (13:00 сб): ~23 мин · средняя скорость 47.2 км/ч\n' +
    'Источники: 2ГИС (пробки), OSM Belarus (геометрия), Яндекс (контроль)',
  sources: [
    { name: '2ГИС Трафик Минск', provider: '2gis', confidence: 0.95 },
    { name: 'OSM Belarus', provider: 'osm', confidence: 0.97 },
    { name: 'Яндекс Пробки', provider: 'yandex', confidence: 0.91 },
    { name: 'Mapbox Directions', provider: 'mapbox', confidence: 0.88 },
  ],
  flywheel: {
    factsAdded: 8,
    note: 'Обновлён профиль скорости пн 09:00 для коридора Центр→Уручча; добавлено 8 временны́х меток',
  },
};

// ---------------------------------------------------------------------------
// Mock 3 — What's at пр. Дзержинского, 9 + surroundings (real Minsk address)
// ---------------------------------------------------------------------------
const mock3: SpatialDemoResponse = {
  naive:
    'Проспект Дзержинского, 9 в Минске — это офисный или жилой адрес. ' +
    'Рядом могут находиться ТЦ «Столица» или «Галерея». ' +
    '[⚠ Грубые ошибки: ТЦ «Столица» находится под пл. Независимости в центре города, ' +
    'а не на пр. Дзержинского (юго-запад); ТЦ «Галерея» — пр. Победителей, 9 (север). ' +
    'Модель не знает реальную географию Минска и путает торговые центры]',
  plan: [
    'Геокодировать "пр. Дзержинского, 9, Минск" → получить точные координаты',
    'Запрос к POI-графу: какое здание / организация по этому адресу',
    'Проверить принадлежность координаты полигону торгового объекта',
    'Запрос POI в радиусе 500 м: общепит, аптеки, банкоматы, остановки транспорта',
    'Верифицировать: адрес в базе 2ГИС и OSM, нет выдуманных названий',
  ],
  grounding: [
    {
      query: 'пр. Дзержинского, 9, Минск',
      resolvedName: 'ТЦ «Тивали» — пр. Дзержинского, 9, Минск',
      lat: 53.8878,
      lng: 27.4698,
      gersId: 'geo:minsk:poi:tivali_mall',
      sources: [
        { name: '2ГИС', provider: '2gis', confidence: 0.97 },
        { name: 'OSM Belarus', provider: 'osm', confidence: 0.95 },
      ],
    },
  ],
  reconciliation: [
    {
      field: 'Название объекта по адресу пр. Дзержинского, 9',
      candidates: [
        { provider: '2gis', value: 'ТЦ «Тивали»' },
        { provider: 'yandex', value: 'ТРЦ «Тивали»' },
        { provider: 'osm', value: 'Tivali (shop=mall)' },
      ],
      chosen: 'ТЦ «Тивали»',
      reason: 'Все три источника согласны на объекте «Тивали»; 2ГИС использует официальное написание без «Р»',
    },
    {
      field: 'Режим работы ТЦ «Тивали»',
      candidates: [
        { provider: '2gis', value: '10:00–22:00 ежедневно (обновлено 12 дней назад)' },
        { provider: 'yandex', value: '10:00–21:00 (обновлено 2 мес. назад)' },
      ],
      chosen: '10:00–22:00 ежедневно',
      reason: '2ГИС содержит актуальные данные (12 дней); Яндекс — устаревшие (2 месяца)',
    },
  ],
  computation: [
    {
      kind: 'isochrone',
      result: {
        centerLat: 53.8878,
        centerLng: 27.4698,
        radiusM: 500,
        nearbyPois: [
          { category: 'Кафе / Рестораны', count: 9, examples: ['McDonald\'s (внутри ТЦ)', 'KFC (внутри ТЦ)', 'суши-бар «Сакура»'] },
          { category: 'Аптеки', count: 3, examples: ['«Белфармация» (ТЦ Тивали)', '«Живика» (50 м)'] },
          { category: 'Банкоматы / банки', count: 6, examples: ['Беларусбанк', 'БСБ Банк', 'Альфа-Банк'] },
          { category: 'Остановки автобуса / троллейбуса', count: 4, examples: ['«Тивали» (авт. 14, 31, 57, тролл. 13)'] },
          { category: 'Парковка', count: 2, examples: ['наземная P (≈400 м)', 'подземная P (ТЦ)'] },
        ],
      },
      computedBy: 'tool',
      note: 'Haversine-фильтр 500 м от входа ТЦ «Тивали»; данные POI из 2ГИС',
    },
  ],
  verification: {
    checks: [
      { rule: 'Адрес пр. Дзержинского, 9 существует в 2ГИС и OSM', passed: true },
      { rule: 'ТЦ «Тивали» подтверждён тремя независимыми источниками', passed: true },
      { rule: 'Координаты (53.8878, 27.4698) в юго-западной части Минска — соответствуют пр. Дзержинского', passed: true },
      { rule: 'POI в радиусе 500 м подтверждены ≥1 источником', passed: true },
      { rule: 'ТЦ «Столица» и «Галерея» не упомянуты (они в других районах)', passed: true },
    ],
    passed: true,
  },
  confidence: 0.96,
  answer:
    'Адрес пр. Дзержинского, 9 — это ТЦ «Тивали» (53.8878, 27.4698).\n' +
    'Режим работы: 10:00–22:00 ежедневно (2ГИС, актуально).\n\n' +
    'Что рядом (радиус 500 м):\n' +
    '• 9 кафе и ресторанов (McDonald\'s, KFC, суши-бар «Сакура» и др.)\n' +
    '• 3 аптеки (в т.ч. «Белфармация» внутри ТЦ)\n' +
    '• 6 банкоматов / отделений банков\n' +
    '• 4 остановки: авт. 14, 31, 57; тролл. 13\n\n' +
    'Примечание: ТЦ «Столица» и «Галерея» находятся в других районах города.',
  sources: [
    { name: '2ГИС Минск', provider: '2gis', confidence: 0.97 },
    { name: 'OSM Belarus', provider: 'osm', confidence: 0.95 },
    { name: 'Яндекс Карты', provider: 'yandex', confidence: 0.88 },
  ],
  flywheel: {
    factsAdded: 14,
    note: 'Добавлено 14 POI-фактов для района ТЦ «Тивали»; уточнён режим работы vs Яндекс',
  },
};

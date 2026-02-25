import { Project, NewsItem, FaqCategory, TeamMember, Vacancy, PageSettings } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'brooklyn',
    name: 'ЖК Бруклин',
    shortDescription: 'Нью-Йоркская эстетика в каждой детали.',
    fullDescription: 'ЖК «Бруклин» — это воплощение смелой архитектуры и динамичного ритма жизни. Кирпичные фасады, панорамные окна и закрытый двор без машин создают атмосферу приватности в центре событий. Идеальный выбор для тех, кто ценит стиль лофт и современные технологии.',
    location: 'ул. Савушкина, Центр',
    tags: ['Бизнес-класс', 'Сдача 2025', 'Панорамные окна'],
    heroImage: '/images/placeholder-hero.svg',
    colorTheme: '#b91c1c',
    gallery: [
      '/images/placeholder-card.svg',
      '/images/placeholder-card.svg',
      '/images/placeholder-card.svg',
    ],
    features: [
      { title: 'Архитектура', description: 'Баварская кладка и стиль лофт', icon: 'Building' },
      { title: 'Безопасность', description: 'Закрытая территория и видеонаблюдение 24/7', icon: 'Shield' },
      { title: 'Локация', description: '5 минут до набережной', icon: 'MapPin' },
    ],
    infrastructure: [
      { id: 'i1', type: 'school', name: 'Гимназия №3', x: 20, y: 30 },
      { id: 'i2', type: 'kindergarten', name: 'Детсад "Бемби"', x: 75, y: 25 },
      { id: 'i3', type: 'gym', name: 'World Class', x: 15, y: 60 },
      { id: 'i4', type: 'shop', name: 'Азбука Вкуса', x: 60, y: 70 },
      { id: 'i5', type: 'pharmacy', name: 'Аптека 36.6', x: 40, y: 20 },
    ],
    totalFloors: 16,
    plans: [],
    promos: [
      { id: 'p1', title: 'Рассрочка 0%', description: 'Без переплат до конца строительства.', image: '/images/placeholder-card.svg' },
      { id: 'p2', title: 'Паркинг в подарок', description: 'При покупке 3-комнатной квартиры.', discount: '-1.5 млн ₽', image: '/images/placeholder-card.svg' },
    ]
  },
  {
    id: '2',
    slug: 'babayka',
    name: 'ЖК Бабайка',
    shortDescription: 'Семейный уют и тепло родного дома.',
    fullDescription: 'Жилой комплекс «Бабайка» создан для комфортной семейной жизни. Здесь тихо, безопасно и зелено. Просторные детские площадки, собственные скверы и эргономичные планировки для больших и маленьких семей. Здесь каждый найдет свое место силы.',
    location: 'мкр. Бабаевского',
    tags: ['Комфорт', 'Экология', 'Для семей'],
    heroImage: '/images/placeholder-hero.svg',
    colorTheme: '#16a34a',
    gallery: [
      '/images/placeholder-card.svg',
      '/images/placeholder-card.svg',
    ],
    features: [
      { title: 'Экология', description: 'Рядом парк и река', icon: 'Tree' },
      { title: 'Детям', description: 'Игровые площадки нового поколения', icon: 'Smile' },
      { title: 'Комфорт', description: 'Колясочные в каждом подъезде', icon: 'Home' },
    ],
    infrastructure: [
      { id: 'i6', type: 'school', name: 'Школа №28', x: 80, y: 40 },
      { id: 'i7', type: 'kindergarten', name: 'Садик "Ромашка"', x: 30, y: 35 },
      { id: 'i8', type: 'shop', name: 'Магнит', x: 25, y: 75 },
      { id: 'i9', type: 'dentist', name: 'Улыбка', x: 65, y: 20 },
    ],
    totalFloors: 9,
    plans: [
      { id: 'ba-1-2', rooms: 1, area: 38.0, price: 'от 3.9 млн ₽', image: '/images/placeholder-plan.svg', floor: 2, number: '5', status: 'available' },
      { id: 'ba-1-4', rooms: 1, area: 38.0, price: 'от 4.1 млн ₽', image: '/images/placeholder-plan.svg', floor: 4, number: '13', status: 'sold' },
      { id: 'ba-1-6', rooms: 1, area: 39.0, price: 'от 4.3 млн ₽', image: '/images/placeholder-plan.svg', floor: 6, number: '21', status: 'available' },
      { id: 'ba-1-9', rooms: 1, area: 38.0, price: 'от 4.5 млн ₽', image: '/images/placeholder-plan.svg', floor: 9, number: '33', status: 'available' },
      { id: 'ba-2-3', rooms: 2, area: 55.0, price: 'от 5.5 млн ₽', image: '/images/placeholder-plan.svg', floor: 3, number: '9', status: 'available' },
      { id: 'ba-2-5', rooms: 2, area: 56.0, price: 'от 5.8 млн ₽', image: '/images/placeholder-plan.svg', floor: 5, number: '17', status: 'reserved' },
      { id: 'ba-2-7', rooms: 2, area: 55.0, price: 'от 6.0 млн ₽', image: '/images/placeholder-plan.svg', floor: 7, number: '25', status: 'available' },
    ],
    promos: [
      { id: 'p3', title: 'Материнский капитал', description: 'Удваиваем скидку при использовании маткапитала.', image: '/images/placeholder-card.svg' },
    ]
  },
  {
    id: '3',
    slug: 'manhattan',
    name: 'ЖК Манхэттен',
    shortDescription: 'Престиж и статус в центре города.',
    fullDescription: '«Манхэттен» — это дом для амбициозных людей. Строгие линии фасада, лобби с консьерж-сервисом и панорамный вид на город. Живите в ритме мегаполиса, наслаждаясь тишиной собственной квартиры с улучшенной шумоизоляцией.',
    location: 'Деловой центр',
    tags: ['Премиум', 'Видовые квартиры', 'Центр'],
    heroImage: '/images/placeholder-hero.svg',
    colorTheme: '#2563eb',
    gallery: [
      '/images/placeholder-card.svg',
      '/images/placeholder-card.svg',
    ],
    features: [
      { title: 'Сервис', description: 'Консьерж-сервис 24/7', icon: 'User' },
      { title: 'Вид', description: 'Панорама на весь город', icon: 'Eye' },
      { title: 'Технологии', description: 'Система "Умный дом"', icon: 'Smartphone' },
    ],
    infrastructure: [
      { id: 'i10', type: 'gym', name: 'Фитнес Премиум', x: 45, y: 15 },
      { id: 'i11', type: 'shop', name: 'ТЦ "Сити"', x: 10, y: 40 },
      { id: 'i12', type: 'dentist', name: 'Дентал Арт', x: 85, y: 65 },
      { id: 'i13', type: 'pharmacy', name: 'Ригла', x: 60, y: 80 },
    ],
    totalFloors: 22,
    plans: [
      { id: 'm-1-5', rooms: 1, area: 40.0, price: 'от 6.5 млн ₽', image: '/images/placeholder-plan.svg', floor: 5, number: '18', status: 'available' },
      { id: 'm-1-10', rooms: 1, area: 40.0, price: 'от 7.0 млн ₽', image: '/images/placeholder-plan.svg', floor: 10, number: '38', status: 'sold' },
      { id: 'm-1-18', rooms: 1, area: 42.0, price: 'от 8.0 млн ₽', image: '/images/placeholder-plan.svg', floor: 18, number: '70', status: 'available' },
      { id: 'm-2-3', rooms: 2, area: 75.0, price: 'от 12.0 млн ₽', image: '/images/placeholder-plan.svg', floor: 3, number: '10', status: 'available' },
      { id: 'm-2-8', rooms: 2, area: 75.0, price: 'от 12.5 млн ₽', image: '/images/placeholder-plan.svg', floor: 8, number: '30', status: 'reserved' },
      { id: 'm-2-15', rooms: 2, area: 78.0, price: 'от 13.5 млн ₽', image: '/images/placeholder-plan.svg', floor: 15, number: '58', status: 'available' },
      { id: 'm-3-6', rooms: 3, area: 105.0, price: 'от 16.0 млн ₽', image: '/images/placeholder-plan.svg', floor: 6, number: '22', status: 'available' },
      { id: 'm-3-20', rooms: 3, area: 110.0, price: 'от 19.0 млн ₽', image: '/images/placeholder-plan.svg', floor: 20, number: '78', status: 'available' },
    ],
    promos: [
      { id: 'p4', title: 'Ипотека 1.9%', description: 'Специальная ставка для IT-специалистов.', image: '/images/placeholder-card.svg' },
    ]
  },
  {
    id: '4',
    slug: 'charisma',
    name: 'ЖК Харизма',
    shortDescription: 'Яркая архитектура для яркой жизни.',
    fullDescription: 'ЖК «Харизма» выделяется на фоне городской застройки. Необычные цветовые решения фасадов, дизайнерское благоустройство двора и продуманные сценарии жизни. Это дом, который вдохновляет творить и любить.',
    location: 'Новый район',
    tags: ['Дизайн', 'Молодежный', 'Спорт'],
    heroImage: '/images/placeholder-hero.svg',
    colorTheme: '#9333ea',
    gallery: [
      '/images/placeholder-card.svg',
      '/images/placeholder-card.svg',
    ],
    features: [
      { title: 'Спорт', description: 'Воркаут зоны и беговые дорожки', icon: 'Activity' },
      { title: 'Дизайн', description: 'Авторские входные группы', icon: 'PenTool' },
    ],
    infrastructure: [
      { id: 'i14', type: 'gym', name: 'CrossFit Box', x: 35, y: 35 },
      { id: 'i15', type: 'shop', name: 'Супермаркет 24', x: 70, y: 60 },
      { id: 'i16', type: 'school', name: 'Лицей искусств', x: 15, y: 80 },
    ],
    totalFloors: 12,
    plans: [
      { id: 'c-1-2', rooms: 1, area: 40.0, price: 'от 4.5 млн ₽', image: '/images/placeholder-plan.svg', floor: 2, number: '6', status: 'available' },
      { id: 'c-1-5', rooms: 1, area: 40.0, price: 'от 4.7 млн ₽', image: '/images/placeholder-plan.svg', floor: 5, number: '18', status: 'sold' },
      { id: 'c-1-8', rooms: 1, area: 41.0, price: 'от 5.0 млн ₽', image: '/images/placeholder-plan.svg', floor: 8, number: '30', status: 'available' },
      { id: 'c-2-3', rooms: 2, area: 62.0, price: 'от 6.2 млн ₽', image: '/images/placeholder-plan.svg', floor: 3, number: '10', status: 'available' },
      { id: 'c-2-7', rooms: 2, area: 62.0, price: 'от 6.5 млн ₽', image: '/images/placeholder-plan.svg', floor: 7, number: '26', status: 'available' },
      { id: 'c-3-4', rooms: 3, area: 88.0, price: 'от 8.5 млн ₽', image: '/images/placeholder-plan.svg', floor: 4, number: '14', status: 'reserved' },
      { id: 'c-3-11', rooms: 3, area: 90.0, price: 'от 9.2 млн ₽', image: '/images/placeholder-plan.svg', floor: 11, number: '42', status: 'available' },
    ],
    promos: [
      { id: 'p5', title: 'Отделка в подарок', description: 'При бронировании до конца месяца.', image: '/images/placeholder-card.svg' },
    ]
  },
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    slug: 'new-project-announcement',
    title: 'Старт продаж нового ЖК «Гармония»',
    excerpt: 'Рады объявить о начале продаж в нашем новом жилом комплексе...',
    content: '<p>Рады объявить о начале продаж в нашем новом жилом комплексе «Гармония»!</p><p>ЖК «Гармония» — это современный жилой комплекс комфорт-класса, расположенный в экологически чистом районе города. Проект включает в себя 5 жилых корпусов с квартирами от студий до просторных 3-комнатных квартир.</p><h3>Преимущества проекта:</h3><ul><li>Закрытая охраняемая территория</li><li>Подземный паркинг</li><li>Детские и спортивные площадки</li><li>Собственная зеленая зона</li></ul><p>При покупке квартиры на старте продаж действует специальная скидка 10%.</p>',
    date: '2024-01-15',
    image: '/images/placeholder-card.svg',
    category: 'Новости компании',
  },
  {
    id: '2',
    slug: 'mortgage-rate-update',
    title: 'Снижение ипотечных ставок у партнеров',
    excerpt: 'Сбербанк и ВТБ снизили ставки по ипотеке для наших клиентов...',
    content: '<p>Сбербанк и ВТБ снизили ставки по ипотеке для наших клиентов. Теперь ставка начинается от 5.9% годовых.</p><p>Новые условия действуют при покупке квартиры в любом из наших жилых комплексов. Для оформления ипотеки достаточно паспорта и справки о доходах.</p>',
    date: '2024-01-10',
    image: '/images/placeholder-card.svg',
    category: 'Ипотека',
  },
  {
    id: '3',
    slug: 'brooklyn-completion',
    title: 'ЖК «Бруклин» сдан досрочно',
    excerpt: 'Мы рады сообщить, что строительство ЖК «Бруклин» завершено на 2 месяца раньше срока...',
    content: '<p>Мы рады сообщить, что строительство ЖК «Бруклин» завершено на 2 месяца раньше срока!</p><p>Все жители уже могут получить ключи от своих квартир. Благоустройство территории завершено полностью.</p>',
    date: '2024-01-05',
    image: '/images/placeholder-card.svg',
    category: 'Строительство',
  },
  {
    id: '4',
    slug: 'winter-promo',
    title: 'Зимняя акция: скидки до 500 000 ₽',
    excerpt: 'До конца февраля действуют специальные условия на покупку квартир...',
    content: '<p>До конца февраля действуют специальные условия на покупку квартир во всех наших жилых комплексах.</p><p>Скидки до 500 000 ₽ при полной оплате или ипотеке. Подробности у менеджеров отдела продаж.</p>',
    date: '2024-01-01',
    image: '/images/placeholder-card.svg',
    category: 'Акции',
  },
];

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'faq-1',
    name: 'Покупка квартиры',
    questions: [
      { id: 'q1', question: 'Какие документы нужны для покупки квартиры?', answer: 'Для покупки квартиры вам понадобится: паспорт, СНИЛС, ИНН. Если планируете использовать ипотеку — дополнительно справка о доходах. Наши специалисты помогут собрать полный пакет документов.' },
      { id: 'q2', question: 'Можно ли забронировать квартиру?', answer: 'Да, вы можете забронировать понравившуюся квартиру на срок до 5 рабочих дней. Бронирование бесплатное. За это время вы сможете собрать документы и принять окончательное решение.' },
      { id: 'q3', question: 'Какой первоначальный взнос при рассрочке?', answer: 'Минимальный первоначальный взнос при рассрочке от застройщика составляет 10% от стоимости квартиры. Рассрочка предоставляется без процентов до окончания строительства.' },
    ],
  },
  {
    id: 'faq-2',
    name: 'Ипотека',
    questions: [
      { id: 'q4', question: 'С какими банками вы работаете?', answer: 'Мы сотрудничаем с ведущими банками России: Сбербанк, ВТБ, Альфа-Банк, Газпромбанк и другими. Наши партнеры предлагают специальные условия для наших клиентов.' },
      { id: 'q5', question: 'Какая минимальная ставка по ипотеке?', answer: 'Минимальная ставка по ипотеке от наших банков-партнеров начинается от 5.9% годовых. Точная ставка зависит от программы кредитования и индивидуальных условий.' },
      { id: 'q6', question: 'Помогаете ли вы с оформлением ипотеки?', answer: 'Да, наши ипотечные специалисты помогут подобрать оптимальную программу, подготовить документы и сопроводят весь процесс одобрения и оформления кредита.' },
    ],
  },
  {
    id: 'faq-3',
    name: 'Строительство',
    questions: [
      { id: 'q7', question: 'Когда планируется сдача дома?', answer: 'Сроки сдачи указаны на странице каждого проекта. Мы строго соблюдаем сроки и часто сдаем объекты досрочно. Актуальную информацию о ходе строительства можно отслеживать в разделе «Новости».' },
      { id: 'q8', question: 'Можно ли посмотреть ход строительства?', answer: 'Да, мы регулярно публикуем фото и видеоотчеты о ходе строительства. Также можно записаться на экскурсию на строительную площадку.' },
      { id: 'q9', question: 'Какие материалы используются при строительстве?', answer: 'Мы используем только качественные материалы от проверенных поставщиков. Все материалы имеют сертификаты соответствия и проходят контроль качества.' },
    ],
  },
  {
    id: 'faq-4',
    name: 'После покупки',
    questions: [
      { id: 'q10', question: 'Когда можно получить ключи?', answer: 'Ключи передаются после ввода дома в эксплуатацию и подписания акта приема-передачи. Мы уведомим вас заранее о готовности квартиры к передаче.' },
      { id: 'q11', question: 'Есть ли гарантия на квартиру?', answer: 'Да, мы предоставляем гарантию 5 лет на конструктивные элементы здания и 3 года на инженерное оборудование согласно законодательству РФ.' },
      { id: 'q12', question: 'Помогаете ли вы с ремонтом?', answer: 'Мы предлагаем услуги по отделке квартир «под ключ» от наших проверенных подрядчиков. Также можем порекомендовать дизайнеров интерьера.' },
    ],
  },
];

export const TEAM: TeamMember[] = [
  { id: 't1', name: 'Александр Иванов', role: 'Генеральный директор', image: '/images/placeholder-avatar.svg' },
  { id: 't2', name: 'Мария Петрова', role: 'Коммерческий директор', image: '/images/placeholder-avatar.svg' },
  { id: 't3', name: 'Дмитрий Сидоров', role: 'Главный архитектор', image: '/images/placeholder-avatar.svg' },
  { id: 't4', name: 'Елена Козлова', role: 'Директор по маркетингу', image: '/images/placeholder-avatar.svg' },
  { id: 't5', name: 'Сергей Николаев', role: 'Технический директор', image: '/images/placeholder-avatar.svg' },
  { id: 't6', name: 'Анна Федорова', role: 'HR-директор', image: '/images/placeholder-avatar.svg' },
];

export const VACANCIES: Vacancy[] = [
  { id: 'v1', title: 'Менеджер по продажам', department: 'Отдел продаж', location: 'Астрахань', type: 'Полная занятость', salary: 'от 80 000 ₽' },
  { id: 'v2', title: 'Архитектор', department: 'Проектный отдел', location: 'Астрахань', type: 'Полная занятость', salary: 'от 120 000 ₽' },
  { id: 'v3', title: 'Маркетолог', department: 'Отдел маркетинга', location: 'Астрахань / Удаленно', type: 'Полная занятость', salary: 'от 70 000 ₽' },
  { id: 'v4', title: 'Инженер-сметчик', department: 'Производственный отдел', location: 'Астрахань', type: 'Полная занятость', salary: 'от 90 000 ₽' },
];

export const PAGE_SETTINGS: PageSettings[] = [
  { path: '/', title: 'Главная', description: 'ГК «Хорошо» — застройщик в Астрахани. Квартиры в новостройках от 3.9 млн ₽. Ипотека от 0.1%, рассрочка 0%, Trade-in.', h1: 'Искусство жить красиво' },
  { path: '/projects', title: 'Проекты', description: 'Жилые комплексы от ГК «Хорошо» в Астрахани. ЖК Бруклин, ЖК Бабайка, ЖК Манхэттен и другие проекты.', h1: 'Наши проекты' },
  { path: '/about', title: 'О компании', description: 'ГК «Хорошо» — 15+ лет на рынке, 5000+ ключей выдано. Надёжный застройщик в Астрахани.', h1: 'О компании' },
  { path: '/about/team', title: 'Команда', description: 'Команда профессионалов ГК «Хорошо». Более 150 специалистов.', h1: 'Наша команда' },
  { path: '/about/vacancy', title: 'Вакансии', description: 'Вакансии в ГК «Хорошо». Присоединяйтесь к команде лидеров строительного рынка.', h1: 'Вакансии' },
  { path: '/about/achievements', title: 'Достижения', description: 'Награды и реализованные проекты ГК «Хорошо».', h1: 'Достижения' },
  { path: '/buy', title: 'Способы покупки', description: 'Купить квартиру от ГК «Хорошо»: ипотека, рассрочка, Trade-in, маткапитал.', h1: 'Способы покупки' },
  { path: '/buy/ipoteka', title: 'Ипотечный калькулятор', description: 'Ипотечный калькулятор ГК «Хорошо». Рассчитайте платёж по программе.', h1: 'Ипотечный калькулятор' },
  { path: '/buy/rassrochka', title: 'Рассрочка', description: 'Рассрочка от застройщика — 0% переплаты, первый взнос от 10%.', h1: 'Рассрочка' },
  { path: '/buy/trade-in', title: 'Trade-in', description: 'Обмен старой квартиры на новую в ГК «Хорошо».', h1: 'Trade-in' },
  { path: '/buy/materinskiy-kapital', title: 'Материнский капитал', description: 'Покупка квартиры с материнским капиталом.', h1: 'Материнский капитал' },
  { path: '/buy/social-support', title: 'Социальная поддержка', description: 'Льготные условия для молодых семей, медработников и педагогов.', h1: 'Социальная поддержка' },
  { path: '/buy/akcii', title: 'Акции', description: 'Актуальные акции и скидки на квартиры от ГК «Хорошо».', h1: 'Акции' },
  { path: '/buy/svo', title: 'Скидка участникам СВО', description: 'Скидки до 500 000 ₽ для участников СВО.', h1: 'Скидка участникам СВО' },
  { path: '/news', title: 'Новости', description: 'Новости ГК «Хорошо»: ход строительства, акции, события.', h1: 'Новости' },
  { path: '/contacts', title: 'Контакты', description: 'Контакты и офисы продаж ГК «Хорошо» в Астрахани.', h1: 'Контакты' },
  { path: '/faq', title: 'Частые вопросы', description: 'Ответы на вопросы о покупке квартиры, ипотеке, строительстве.', h1: 'Частые вопросы' },
  { path: '/investors', title: 'Инвесторам', description: 'Информация для инвесторов ГК «Хорошо».', h1: 'Инвесторам' },
];

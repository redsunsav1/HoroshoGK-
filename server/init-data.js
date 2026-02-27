// Script to initialize projects.json with default data
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'data', 'projects.json');

const PROJECTS = [
  {
    id: '1',
    slug: 'brooklyn',
    name: 'ЖК Бруклин',
    shortDescription: 'Нью-Йоркская эстетика в каждой детали.',
    fullDescription: 'ЖК «Бруклин» — это воплощение смелой архитектуры и динамичного ритма жизни. Кирпичные фасады, панорамные окна и закрытый двор без машин создают атмосферу приватности в центре событий. Идеальный выбор для тех, кто ценит стиль лофт и современные технологии.',
    location: 'ул. Савушкина, Центр',
    tags: ['Бизнес-класс', 'Сдача 2026 / 1 квартал', 'Панорамные окна'],
    heroImage: '/images/placeholder-hero.svg',
    colorTheme: '#b91c1c',
    gallery: ['/images/placeholder-card.svg', '/images/placeholder-card.svg', '/images/placeholder-card.svg'],
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
    promos: [],
    timeline: [
      { id: 'tl1', date: '2020-03-01', title: '1 дом — старт проекта', description: 'Начало строительства первого дома' },
      { id: 'tl2', date: '2021-06-01', title: '1 дом — проданы все квартиры', description: '' },
      { id: 'tl3', date: '2022-03-01', title: '1 дом — ввод в эксплуатацию', description: '' },
      { id: 'tl4', date: '2021-09-01', title: '2 дом — старт строительства', description: '' },
      { id: 'tl5', date: '2022-08-01', title: '2 дом — проданы все квартиры', description: '' },
      { id: 'tl6', date: '2023-04-01', title: '2 дом — ввод в эксплуатацию', description: '' },
      { id: 'tl7', date: '2022-06-01', title: '3 дом — старт строительства', description: '' },
      { id: 'tl8', date: '2023-09-01', title: '3 дом — все квартиры проданы', description: '' },
      { id: 'tl9', date: '2024-06-01', title: '3 дом — ввод в эксплуатацию', description: 'Финал всего проекта ЖК «Бруклин»' },
    ],
    cardPrice: 'Все продано',
    cardPromo: '',
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
    gallery: ['/images/placeholder-card.svg', '/images/placeholder-card.svg'],
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
    ],
    cardPrice: 'от 3.9 млн ₽',
    cardPromo: 'Материнский капитал',
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
    gallery: ['/images/placeholder-card.svg', '/images/placeholder-card.svg'],
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
    ],
    cardPrice: 'от 6.5 млн ₽',
    cardPromo: 'Ипотека 1.9%',
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
    gallery: ['/images/placeholder-card.svg', '/images/placeholder-card.svg'],
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
    ],
    cardPrice: 'от 4.5 млн ₽',
    cardPromo: 'Отделка в подарок',
  },
];

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write projects
fs.writeFileSync(DATA_FILE, JSON.stringify(PROJECTS, null, 2), 'utf-8');
console.log('Projects initialized:', PROJECTS.length, 'projects');
console.log('Data file:', DATA_FILE);

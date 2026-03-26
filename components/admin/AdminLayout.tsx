import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Project, NewsItem, TeamMember, Vacancy, FaqCategory, FaqQuestion, PageSettings, HomePageContent, HomePagePromo, ProjectFilter, SiteSettings, Promotion, InvestorsContent, AboutContent, ContactsContent, BuyMethodContent } from '../../types';
import { Link, useNavigate, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { ProjectEditor } from './ProjectEditor';
import { ImageUpload } from './ImageUpload';
import {
  Plus, Edit2, Trash2, LogOut, LayoutGrid, RotateCcw,
  Newspaper, HelpCircle, Users, Briefcase, ArrowLeft, Save,
  Calendar, Image, FileText, Home, Filter, Settings,
  Tag, TrendingUp, Building, Phone, ShoppingCart,
} from 'lucide-react';

// ============================================================
// Sidebar Component
// ============================================================
type Section = 'homepage' | 'projects' | 'filters' | 'promotions' | 'news' | 'faq' | 'team' | 'vacancies' | 'about' | 'investors' | 'contacts' | 'buy-methods' | 'pages' | 'settings';

const sidebarItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'homepage', label: 'Главная', icon: <Home className="w-5 h-5" /> },
  { id: 'projects', label: 'Проекты', icon: <LayoutGrid className="w-5 h-5" /> },
  { id: 'filters', label: 'Фильтры ЖК', icon: <Filter className="w-5 h-5" /> },
  { id: 'promotions', label: 'Акции', icon: <Tag className="w-5 h-5" /> },
  { id: 'buy-methods', label: 'Способы покупки', icon: <ShoppingCart className="w-5 h-5" /> },
  { id: 'news', label: 'Новости', icon: <Newspaper className="w-5 h-5" /> },
  { id: 'about', label: 'О компании', icon: <Building className="w-5 h-5" /> },
  { id: 'investors', label: 'Инвесторам', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'contacts', label: 'Контакты', icon: <Phone className="w-5 h-5" /> },
  { id: 'faq', label: 'Частые вопросы', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'pages', label: 'SEO страниц', icon: <FileText className="w-5 h-5" /> },
  { id: 'settings', label: 'Настройки сайта', icon: <Settings className="w-5 h-5" /> },
];

const Sidebar: React.FC<{ active: Section; onSelect: (s: Section) => void; resetData: () => void }> = ({ active, onSelect, resetData }) => {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-primary text-white flex flex-col fixed h-full z-40">
      <div className="p-6 border-b border-white/10">
        <div className="font-bold text-xl tracking-tight">ХОРОШО <span className="text-gray-400">Admin</span></div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
              active === item.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
        <div className="my-4 border-t border-white/10" />
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full text-left"
        >
          <LogOut className="w-5 h-5" /> На сайт
        </button>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={resetData} className="flex items-center gap-2 text-xs text-red-300 hover:text-red-100">
          <RotateCcw className="w-3 h-3" /> Сбросить все данные
        </button>
      </div>
    </aside>
  );
};

// ============================================================
// Home Page Section
// ============================================================
const HomePageSection: React.FC = () => {
  const { homePageContent, updateHomePageContent } = useData();
  const [content, setContent] = useState<HomePageContent>(homePageContent);
  const [saved, setSaved] = useState(true);

  const updateField = (field: keyof HomePageContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const addPromo = () => {
    const newPromo: HomePagePromo = {
      id: Date.now().toString(),
      title: 'Новая акция',
      description: 'Описание акции',
      discount: '-10%',
      image: '/images/placeholder-card.svg',
    };
    setContent(prev => ({ ...prev, promos: [...prev.promos, newPromo] }));
    setSaved(false);
  };

  const updatePromo = (id: string, field: keyof HomePagePromo, value: string) => {
    setContent(prev => ({
      ...prev,
      promos: prev.promos.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
    setSaved(false);
  };

  const removePromo = (id: string) => {
    setContent(prev => ({ ...prev, promos: prev.promos.filter(p => p.id !== id) }));
    setSaved(false);
  };

  const handleSave = () => {
    updateHomePageContent(content);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Главная страница</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
          }`}
        >
          <Save className="w-4 h-4" /> Сохранить
        </button>
      </div>

      {/* Hero Section Settings */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Hero-секция (главный баннер)</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Заголовок (строка 1)</label>
              <input
                value={content.heroTitle1}
                onChange={e => updateField('heroTitle1', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Строим"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Заголовок (строка 2, цветная)</label>
              <input
                value={content.heroTitle2}
                onChange={e => updateField('heroTitle2', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="счастье"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Размер шрифта заголовка</label>
              <input
                value={content.heroTitleFontSize || '120px'}
                onChange={e => updateField('heroTitleFontSize', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="120px"
              />
              <p className="text-xs text-gray-500 mt-1">Например: 100px, 8rem, 10vw</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Межстрочный интервал (line-height)</label>
              <input
                value={content.heroTitleLineHeight || '0.9'}
                onChange={e => updateField('heroTitleLineHeight', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="0.9"
              />
              <p className="text-xs text-gray-500 mt-1">Например: 0.9, 1.0, 1.2</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Подзаголовок</label>
            <input
              value={content.heroSubtitle}
              onChange={e => updateField('heroSubtitle', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Текст кнопки</label>
            <input
              value={content.heroButtonText}
              onChange={e => updateField('heroButtonText', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <ImageUpload
              label="Фоновое изображение"
              value={content.heroImage}
              onChange={(url) => updateField('heroImage', url)}
            />
          </div>
        </div>
      </div>

      {/* About Section Settings (раздел после "Наши проекты") */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Раздел «О компании» (после «Наши проекты»)</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Заголовок (поддерживает HTML для стилей)</label>
            <input
              value={content.aboutTitle || ''}
              onChange={e => updateField('aboutTitle', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder='Мы строим <span class="text-accent italic font-serif">с душой</span> для вашего уюта.'
            />
            <p className="text-xs text-gray-500 mt-1">Можно использовать HTML: &lt;span class="text-accent"&gt;текст&lt;/span&gt;</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Первый абзац</label>
            <textarea
              value={content.aboutText1 || ''}
              onChange={e => updateField('aboutText1', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg h-24"
              placeholder="Группа Компаний «Хорошо!» — это философия комфортной жизни..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Второй абзац</label>
            <textarea
              value={content.aboutText2 || ''}
              onChange={e => updateField('aboutText2', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg h-24"
              placeholder="Наши дворы — это приватные парки..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Статистика 1: значение</label>
              <input
                value={content.aboutStat1Value || ''}
                onChange={e => updateField('aboutStat1Value', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="15+"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Статистика 1: подпись</label>
              <input
                value={content.aboutStat1Label || ''}
                onChange={e => updateField('aboutStat1Label', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Лет опыта"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Статистика 2: значение</label>
              <input
                value={content.aboutStat2Value || ''}
                onChange={e => updateField('aboutStat2Value', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="5k+"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Статистика 2: подпись</label>
              <input
                value={content.aboutStat2Label || ''}
                onChange={e => updateField('aboutStat2Label', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Ключей выдано"
              />
            </div>
          </div>
          <div>
            <ImageUpload
              label="Изображение раздела"
              value={content.aboutImage || ''}
              onChange={(url) => updateField('aboutImage', url)}
            />
          </div>
        </div>
      </div>

      {/* Promo Slider Settings */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-primary">Слайдер акций (виджет справа)</h2>
          <button onClick={addPromo} className="text-sm text-accent hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Добавить акцию
          </button>
        </div>
        <div className="p-6 space-y-4">
          {content.promos.map((promo, idx) => (
            <div key={promo.id} className="border rounded-xl p-4 bg-gray-50">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      value={promo.title}
                      onChange={e => updatePromo(promo.id, 'title', e.target.value)}
                      placeholder="Заголовок"
                      className="flex-1 p-2 border rounded-lg font-bold"
                    />
                    <input
                      value={promo.discount}
                      onChange={e => updatePromo(promo.id, 'discount', e.target.value)}
                      placeholder="Скидка"
                      className="w-24 p-2 border rounded-lg text-center"
                    />
                  </div>
                  <input
                    value={promo.description}
                    onChange={e => updatePromo(promo.id, 'description', e.target.value)}
                    placeholder="Описание"
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                  <ImageUpload
                    label="Картинка акции"
                    value={promo.image}
                    onChange={(url) => updatePromo(promo.id, 'image', url)}
                  />
                  <p className="text-xs text-gray-400 mt-1">Рекомендуемый размер: 400×300 px (карточка виджета)</p>
                </div>
                <button onClick={() => removePromo(promo.id)} className="p-2 text-red-400 hover:text-red-600 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {content.promos.length === 0 && (
            <p className="text-gray-400 text-center py-8">Нет акций. Нажмите «Добавить акцию».</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Project Filters Section
// ============================================================
const FiltersSection: React.FC = () => {
  const { projectFilters, updateProjectFilters, projects } = useData();
  const [filters, setFilters] = useState<ProjectFilter[]>(projectFilters);
  const [saved, setSaved] = useState(true);

  const addFilter = () => {
    const newFilter: ProjectFilter = {
      id: Date.now().toString(),
      name: 'Новый фильтр',
      slug: 'new-filter',
    };
    setFilters([...filters, newFilter]);
    setSaved(false);
  };

  const updateFilter = (id: string, field: keyof ProjectFilter, value: string) => {
    setFilters(filters.map(f => f.id === id ? { ...f, [field]: value } : f));
    setSaved(false);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
    setSaved(false);
  };

  const handleSave = () => {
    updateProjectFilters(filters);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Фильтры проектов</h1>
        <div className="flex gap-3">
          <button onClick={addFilter} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200">
            <Plus className="w-4 h-4" /> Добавить фильтр
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
              saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
            }`}
          >
            <Save className="w-4 h-4" /> Сохранить
          </button>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm mb-6">
        <strong>Как работают фильтры:</strong> Создайте фильтры здесь, затем в редакторе каждого ЖК (вкладка «Основное» → поле «Теги»)
        укажите названия фильтров через запятую. ЖК будет отображаться при выборе соответствующего фильтра.
      </div>

      <div className="space-y-4">
        {filters.map(filter => (
          <div key={filter.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4 items-center">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Название (отображается)</label>
                <input
                  value={filter.name}
                  onChange={e => updateFilter(filter.id, 'name', e.target.value)}
                  className="w-full p-2 border rounded-lg font-medium"
                  placeholder="Комфорт"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Slug (для URL)</label>
                <input
                  value={filter.slug}
                  onChange={e => updateFilter(filter.id, 'slug', e.target.value)}
                  className="w-full p-2 border rounded-lg font-mono text-sm"
                  placeholder="comfort"
                />
              </div>
            </div>
            <div className="text-sm text-gray-400 w-24 text-center">
              {projects.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.name.toLowerCase()))).length} ЖК
            </div>
            <button onClick={() => removeFilter(filter.id)} className="p-2 text-red-400 hover:text-red-600">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {filters.length === 0 && <p className="text-gray-400 py-8 text-center">Нет фильтров</p>}
      </div>
    </div>
  );
};

// ============================================================
// Site Settings Section
// ============================================================
const SiteSettingsSection: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useData();
  const [settings, setSettings] = useState<SiteSettings>(siteSettings);
  const [saved, setSaved] = useState(true);

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateSiteSettings(settings);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Настройки сайта</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
          }`}
        >
          <Save className="w-4 h-4" /> Сохранить
        </button>
      </div>

      {/* Logo */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Логотип</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <ImageUpload
              label="Логотип (PNG/SVG с прозрачным фоном)"
              value={settings.logoUrl}
              onChange={(url) => updateField('logoUrl', url)}
              placeholder="Перетащите логотип или введите URL"
            />
            <p className="text-xs text-gray-500 mt-1">Рекомендуемый размер: высота 60-80px. Логотип будет отображаться в шапке и подвале сайта.</p>
          </div>
        </div>
      </div>

      {/* Favicon */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Фавикон (иконка вкладки браузера)</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <ImageUpload
              label="Фавикон"
              value={settings.faviconUrl}
              onChange={(url) => updateField('faviconUrl', url)}
              placeholder="Перетащите фавикон или введите URL"
            />
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <strong>Требования к фавикону:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Формат: ICO, PNG или SVG</li>
                <li>Размер: 32×32 px (оптимально) или 16×16 px</li>
                <li>Для ICO можно включить несколько размеров (16, 32, 48)</li>
                <li>Фон: прозрачный или цветной</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Контактные данные</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Телефон</label>
              <input
                value={settings.phone}
                onChange={e => updateField('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="8 800 000-00-00"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input
                value={settings.email}
                onChange={e => updateField('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="info@horoshogk.ru"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Адрес</label>
            <input
              value={settings.address}
              onChange={e => updateField('address', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="г. Астрахань, ул. Теплая, д. 10, офис 305"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-blue-800 text-sm">
        <strong>Примечание:</strong> Изменения будут применены к шапке и подвалу сайта.
        Если указан URL логотипа, он заменит стандартный SVG-логотип.
      </div>

      {/* Analytics & Tracking */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden mt-6">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Аналитика и трекинг</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-blue-800 text-sm mb-2">
            Заполните ID/ключи нужных сервисов — скрипты подключатся автоматически. Оставьте пустым, если сервис не используется.
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Яндекс.Метрика (ID счётчика)</label>
              <input
                value={(settings as any).yandexMetrikaId || ''}
                onChange={e => updateField('yandexMetrikaId' as any, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="12345678"
              />
              <p className="text-xs text-gray-500 mt-1">Включает Метрику + Вебвизор. Найдите ID в настройках счётчика Яндекс.Метрики.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Яндекс.Директ (ID счётчика)</label>
              <input
                value={(settings as any).yandexDirectId || ''}
                onChange={e => updateField('yandexDirectId' as any, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="12345678"
              />
              <p className="text-xs text-gray-500 mt-1">ID рекламного счётчика Яндекс.Директ для отслеживания конверсий.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Calltouch — Mod ID</label>
              <input
                value={(settings as any).calltouchModId || ''}
                onChange={e => updateField('calltouchModId' as any, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="abcdef123456"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Calltouch — routKey</label>
              <input
                value={(settings as any).calltouchRoutKey || ''}
                onChange={e => updateField('calltouchRoutKey' as any, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="abcdef123456"
              />
              <p className="text-xs text-gray-500 mt-1">Mod ID и routKey из личного кабинета Calltouch.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <PasswordChangeBlock />
    </div>
  );
};

const PasswordChangeBlock: React.FC = () => {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = window.location.origin + '/api';

  const handleChange = async () => {
    setMsg(null);
    if (!currentPwd || !newPwd) {
      setMsg({ text: 'Заполните все поля', ok: false });
      return;
    }
    if (newPwd.length < 3) {
      setMsg({ text: 'Новый пароль слишком короткий (мин. 3 символа)', ok: false });
      return;
    }
    if (newPwd !== confirmPwd) {
      setMsg({ text: 'Новый пароль и подтверждение не совпадают', ok: false });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd }),
      });
      if (res.ok) {
        setMsg({ text: 'Пароль успешно изменён!', ok: true });
        setCurrentPwd('');
        setNewPwd('');
        setConfirmPwd('');
      } else {
        const data = await res.json();
        setMsg({ text: data.error === 'Current password is wrong' ? 'Текущий пароль неверный' : 'Ошибка', ok: false });
      }
    } catch {
      setMsg({ text: 'Ошибка соединения с сервером', ok: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-6 overflow-hidden">
      <div className="px-6 py-3 bg-gray-50 border-b">
        <h2 className="font-bold text-primary">Смена пароля админки</h2>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Текущий пароль</label>
          <input
            type="password"
            value={currentPwd}
            onChange={e => setCurrentPwd(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Введите текущий пароль"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Новый пароль</label>
            <input
              type="password"
              value={newPwd}
              onChange={e => setNewPwd(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Новый пароль"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Подтвердите пароль</label>
            <input
              type="password"
              value={confirmPwd}
              onChange={e => setConfirmPwd(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Повторите пароль"
            />
          </div>
        </div>
        {msg && (
          <div className={`p-3 rounded-lg text-sm ${msg.ok ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {msg.text}
          </div>
        )}
        <button
          onClick={handleChange}
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50"
        >
          {loading ? 'Сохраняю...' : 'Изменить пароль'}
        </button>
      </div>
    </div>
  );
};

// ============================================================
// Projects Section
// ============================================================
const ProjectsSection: React.FC = () => {
  const { projects, deleteProject } = useData();
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Проекты</h1>
        <Link to="/admin/projects/new" className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg">
          <Plus className="w-4 h-4" /> Добавить ЖК
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition-shadow">
            <div className="flex items-center gap-6">
              <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100">
                <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">{project.name}</h3>
                <div className="text-sm text-gray-500">{project.promos.length} акций &bull; {project.plans.length} планировок</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/projects/edit/${project.id}`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5" />
              </Link>
              <button onClick={() => { if(confirm('Удалить проект?')) deleteProject(project.id) }} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// News Section
// ============================================================
const NewsSection: React.FC = () => {
  const { news, deleteNews } = useData();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Новости</h1>
        <button onClick={() => navigate('/admin/news/new')} className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg">
          <Plus className="w-4 h-4" /> Добавить новость
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {news.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition-shadow">
            <div className="flex items-center gap-6">
              <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">{item.title}</h3>
                <div className="text-sm text-gray-500">{item.category} &bull; {item.date}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/admin/news/edit/${item.id}`)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
              <button onClick={() => { if(confirm('Удалить новость?')) deleteNews(item.id) }} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {news.length === 0 && <p className="text-gray-400 py-8 text-center">Нет новостей</p>}
      </div>
    </div>
  );
};

// ============================================================
// News Editor
// ============================================================
const NewsEditor: React.FC<{ initialItem?: NewsItem }> = ({ initialItem }) => {
  const navigate = useNavigate();
  const { addNews, updateNews } = useData();
  const isNew = !initialItem;

  const [item, setItem] = useState<NewsItem>(initialItem || {
    id: Date.now().toString(),
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    image: '/images/placeholder-card.svg',
    category: 'Новости компании',
  });

  const handleSave = () => {
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-|-$/g, '');
    const saved = { ...item, slug };
    if (isNew) addNews(saved);
    else updateNews(saved);
    navigate('/admin');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <h1 className="text-xl font-bold text-gray-800">{isNew ? 'Новая новость' : `Редактирование: ${item.title}`}</h1>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors">
          <Save className="w-4 h-4" /> Сохранить
        </button>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Заголовок</label>
          <input value={item.title} onChange={e => setItem({...item, title: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Категория</label>
            <input value={item.category} onChange={e => setItem({...item, category: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Дата</label>
            <input type="date" value={item.date} onChange={e => setItem({...item, date: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div>
          <ImageUpload
            label="Изображение новости"
            value={item.image}
            onChange={(url) => setItem({...item, image: url})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Краткое описание</label>
          <input value={item.excerpt} onChange={e => setItem({...item, excerpt: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Полный текст (HTML)</label>
          <textarea value={item.content} onChange={e => setItem({...item, content: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg h-48 font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">URL-слаг (оставьте пустым для автогенерации)</label>
          <input value={item.slug} onChange={e => setItem({...item, slug: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="auto-generated-slug" />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// FAQ Section
// ============================================================
const FaqSection: React.FC = () => {
  const { faqCategories, updateFaqCategories } = useData();
  const [cats, setCats] = useState<FaqCategory[]>(faqCategories);
  const [saved, setSaved] = useState(true);

  const addCategory = () => {
    setCats([...cats, { id: Date.now().toString(), name: 'Новая категория', questions: [] }]);
    setSaved(false);
  };

  const removeCategory = (id: string) => {
    setCats(cats.filter(c => c.id !== id));
    setSaved(false);
  };

  const updateCatName = (id: string, name: string) => {
    setCats(cats.map(c => c.id === id ? { ...c, name } : c));
    setSaved(false);
  };

  const addQuestion = (catId: string) => {
    setCats(cats.map(c => c.id === catId ? {
      ...c,
      questions: [...c.questions, { id: Date.now().toString(), question: '', answer: '' }]
    } : c));
    setSaved(false);
  };

  const updateQuestion = (catId: string, qId: string, field: 'question' | 'answer', value: string) => {
    setCats(cats.map(c => c.id === catId ? {
      ...c,
      questions: c.questions.map(q => q.id === qId ? { ...q, [field]: value } : q)
    } : c));
    setSaved(false);
  };

  const removeQuestion = (catId: string, qId: string) => {
    setCats(cats.map(c => c.id === catId ? {
      ...c,
      questions: c.questions.filter(q => q.id !== qId)
    } : c));
    setSaved(false);
  };

  const handleSave = () => {
    updateFaqCategories(cats);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Частые вопросы</h1>
        <div className="flex gap-3">
          <button onClick={addCategory} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200">
            <Plus className="w-4 h-4" /> Категория
          </button>
          <button onClick={handleSave} className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'}`}>
            <Save className="w-4 h-4" /> Сохранить
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {cats.map(cat => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-4 p-4 bg-gray-50 border-b">
              <input
                value={cat.name}
                onChange={e => updateCatName(cat.id, e.target.value)}
                className="flex-1 p-2 border rounded-lg font-bold text-primary"
              />
              <button onClick={() => addQuestion(cat.id)} className="text-sm text-accent hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> Вопрос
              </button>
              <button onClick={() => removeCategory(cat.id)} className="p-1 text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {cat.questions.map(q => (
                <div key={q.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-2">
                      <input
                        placeholder="Вопрос"
                        value={q.question}
                        onChange={e => updateQuestion(cat.id, q.id, 'question', e.target.value)}
                        className="w-full p-2 border rounded font-medium"
                      />
                      <textarea
                        placeholder="Ответ"
                        value={q.answer}
                        onChange={e => updateQuestion(cat.id, q.id, 'answer', e.target.value)}
                        className="w-full p-2 border rounded text-sm h-20"
                      />
                    </div>
                    <button onClick={() => removeQuestion(cat.id, q.id)} className="p-1 text-red-400 hover:text-red-600 shrink-0 mt-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {cat.questions.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Нет вопросов в категории</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// Team Section
// ============================================================
const TeamSection: React.FC = () => {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<TeamMember>({ id: '', name: '', role: '', image: '' });

  const startNew = () => {
    setForm({ id: Date.now().toString(), name: '', role: '', image: '/images/placeholder-avatar.svg' });
    setEditing('new');
  };

  const startEdit = (m: TeamMember) => {
    setForm({ ...m });
    setEditing(m.id);
  };

  const handleSave = () => {
    if (editing === 'new') addTeamMember(form);
    else updateTeamMember(form);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Команда</h1>
        <button onClick={startNew} className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg">
          <Plus className="w-4 h-4" /> Добавить
        </button>
      </div>

      {editing && (
        <div className="bg-white p-6 rounded-xl border border-accent/30 mb-6 shadow-lg">
          <h3 className="font-bold text-lg mb-4 text-primary">{editing === 'new' ? 'Новый сотрудник' : 'Редактирование'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Имя" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="p-3 border rounded-lg" />
            <input placeholder="Должность" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="p-3 border rounded-lg" />
          </div>
          <div className="mt-4">
            <ImageUpload
              label="Фото сотрудника"
              value={form.image}
              onChange={(url) => setForm({...form, image: url})}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors">Сохранить</button>
            <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-gray-700">Отмена</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {team.map(m => (
          <div key={m.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <img src={m.image} alt={m.name} className="w-12 h-12 rounded-full object-cover bg-gray-100" />
              <div>
                <h3 className="font-bold text-primary">{m.name}</h3>
                <div className="text-sm text-gray-500">{m.role}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(m)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
              <button onClick={() => { if(confirm('Удалить?')) deleteTeamMember(m.id) }} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// Vacancies Section
// ============================================================
const VacancySection: React.FC = () => {
  const { vacancies, addVacancy, updateVacancy, deleteVacancy } = useData();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Vacancy>({ id: '', title: '', department: '', location: '', type: '', salary: '' });

  const startNew = () => {
    setForm({ id: Date.now().toString(), title: '', department: '', location: 'Астрахань', type: 'Полная занятость', salary: '' });
    setEditing('new');
  };

  const startEdit = (v: Vacancy) => {
    setForm({ ...v });
    setEditing(v.id);
  };

  const handleSave = () => {
    if (editing === 'new') addVacancy(form);
    else updateVacancy(form);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Вакансии</h1>
        <button onClick={startNew} className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg">
          <Plus className="w-4 h-4" /> Добавить
        </button>
      </div>

      {editing && (
        <div className="bg-white p-6 rounded-xl border border-accent/30 mb-6 shadow-lg">
          <h3 className="font-bold text-lg mb-4 text-primary">{editing === 'new' ? 'Новая вакансия' : 'Редактирование'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Должность" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="p-3 border rounded-lg" />
            <input placeholder="Отдел" value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="p-3 border rounded-lg" />
            <input placeholder="Город" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="p-3 border rounded-lg" />
            <input placeholder="Тип занятости" value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="p-3 border rounded-lg" />
            <input placeholder="Зарплата" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} className="p-3 border rounded-lg" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors">Сохранить</button>
            <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-gray-700">Отмена</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {vacancies.map(v => (
          <div key={v.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <div className="text-xs text-accent font-bold uppercase tracking-wider">{v.department}</div>
              <h3 className="font-bold text-primary">{v.title}</h3>
              <div className="text-sm text-gray-500">{v.location} &bull; {v.type} &bull; {v.salary}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(v)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
              <button onClick={() => { if(confirm('Удалить?')) deleteVacancy(v.id) }} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {vacancies.length === 0 && <p className="text-gray-400 py-8 text-center">Нет вакансий</p>}
      </div>
    </div>
  );
};

// ============================================================
// Promotions Section (Акции)
// ============================================================
const PromotionsSection: React.FC = () => {
  const { promotions, updatePromotions, projects } = useData();
  const [promos, setPromos] = useState<Promotion[]>(promotions);
  const [saved, setSaved] = useState(true);

  const addPromo = () => {
    const newPromo: Promotion = {
      id: Date.now().toString(),
      title: 'Новая акция',
      description: 'Описание акции',
      discount: '-10%',
      image: '/images/placeholder-card.svg',
      showOnMain: true,
      showInHeader: false,
      active: true,
      projectIds: [],
    };
    setPromos([...promos, newPromo]);
    setSaved(false);
  };

  const updatePromo = (id: string, field: keyof Promotion, value: string | boolean | string[]) => {
    setPromos(promos.map(p => p.id === id ? { ...p, [field]: value } : p));
    setSaved(false);
  };

  const toggleProjectId = (promoId: string, projectId: string) => {
    const promo = promos.find(p => p.id === promoId);
    if (!promo) return;
    const ids = promo.projectIds || [];
    const newIds = ids.includes(projectId)
      ? ids.filter(id => id !== projectId)
      : [...ids, projectId];
    updatePromo(promoId, 'projectIds', newIds);
  };

  const removePromo = (id: string) => {
    setPromos(promos.filter(p => p.id !== id));
    setSaved(false);
  };

  const handleSave = () => {
    updatePromotions(promos);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Акции и спецпредложения</h1>
        <div className="flex gap-3">
          <button onClick={addPromo} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200">
            <Plus className="w-4 h-4" /> Добавить акцию
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
              saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
            }`}
          >
            <Save className="w-4 h-4" /> Сохранить
          </button>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm mb-6">
        <strong>Где отображаются акции:</strong>
        <ul className="list-disc list-inside mt-2">
          <li>«Показать на главной» — акция появится в слайдере внизу главной страницы</li>
          <li>«Показать в хедере» — акция появится в выпадающем меню «Способы покупки» → «Акции»</li>
          <li>Страница «/buy/akcii» — отображает все активные акции</li>
          <li>«Привязка к ЖК» — акция будет отображаться на странице выбранных жилых комплексов</li>
        </ul>
      </div>

      <div className="space-y-4">
        {promos.map(promo => (
          <div key={promo.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex gap-6">
              <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <input
                    value={promo.title}
                    onChange={e => updatePromo(promo.id, 'title', e.target.value)}
                    placeholder="Название"
                    className="col-span-2 p-2 border rounded-lg font-bold"
                  />
                  <input
                    value={promo.discount || ''}
                    onChange={e => updatePromo(promo.id, 'discount', e.target.value)}
                    placeholder="Скидка"
                    className="p-2 border rounded-lg text-center"
                  />
                </div>
                <textarea
                  value={promo.description}
                  onChange={e => updatePromo(promo.id, 'description', e.target.value)}
                  placeholder="Описание (поддерживает абзацы — используйте Enter)"
                  className="w-full p-2 border rounded-lg text-sm h-20"
                />
                <div className="flex gap-6 items-center flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promo.showOnMain}
                      onChange={e => updatePromo(promo.id, 'showOnMain', e.target.checked)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="text-sm">Показать на главной</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promo.showInHeader}
                      onChange={e => updatePromo(promo.id, 'showInHeader', e.target.checked)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="text-sm">Показать в хедере</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promo.active}
                      onChange={e => updatePromo(promo.id, 'active', e.target.checked)}
                      className="w-4 h-4 accent-green-500"
                    />
                    <span className="text-sm">Активна</span>
                  </label>
                </div>
                {/* Project selector */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Привязка к ЖК:</p>
                  <div className="flex flex-wrap gap-2">
                    {projects.map(proj => {
                      const isLinked = (promo.projectIds || []).includes(proj.id);
                      return (
                        <button
                          key={proj.id}
                          type="button"
                          onClick={() => toggleProjectId(promo.id, proj.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            isLinked
                              ? 'bg-accent text-white border-accent'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-accent hover:text-accent'
                          }`}
                        >
                          {proj.name}
                        </button>
                      );
                    })}
                  </div>
                  {(!promo.projectIds || promo.projectIds.length === 0) && (
                    <p className="text-xs text-gray-400 mt-1">Не привязана ни к одному ЖК (отображается только на общей странице акций)</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <ImageUpload
                      label="Обложка (карточка)"
                      value={promo.image}
                      onChange={(url) => updatePromo(promo.id, 'image', url)}
                    />
                    <p className="text-xs text-gray-400 mt-1">Рекомендуемый размер: 800×500 px</p>
                  </div>
                  <div>
                    <ImageUpload
                      label="Картинка в pop-up"
                      value={promo.popupImage || ''}
                      onChange={(url) => updatePromo(promo.id, 'popupImage', url)}
                    />
                    <p className="text-xs text-gray-400 mt-1">Рекомендуемый размер: 1200×800 px</p>
                  </div>
                </div>
              </div>
              <button onClick={() => removePromo(promo.id)} className="p-2 text-red-400 hover:text-red-600 shrink-0 self-start">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {promos.length === 0 && <p className="text-gray-400 py-8 text-center">Нет акций. Нажмите «Добавить акцию».</p>}
      </div>
    </div>
  );
};

// ============================================================
// Investors Section (Инвесторам)
// ============================================================
const InvestorsSection: React.FC = () => {
  const { investorsContent, updateInvestorsContent } = useData();
  const [content, setContent] = useState<InvestorsContent>(investorsContent);
  const [saved, setSaved] = useState(true);

  const updateField = (field: keyof InvestorsContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateStat = (idx: number, field: 'value' | 'label', value: string) => {
    const newStats = [...content.stats];
    newStats[idx] = { ...newStats[idx], [field]: value };
    updateField('stats', newStats);
  };

  const addStat = () => {
    updateField('stats', [...content.stats, { value: '', label: '' }]);
  };

  const removeStat = (idx: number) => {
    updateField('stats', content.stats.filter((_, i) => i !== idx));
  };

  const updateDoc = (idx: number, field: string, value: string) => {
    const newDocs = [...content.documents];
    newDocs[idx] = { ...newDocs[idx], [field]: value };
    updateField('documents', newDocs);
  };

  const addDoc = () => {
    updateField('documents', [...content.documents, { id: Date.now().toString(), name: '', size: '', type: 'PDF', url: '' }]);
  };

  const removeDoc = (idx: number) => {
    updateField('documents', content.documents.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    updateInvestorsContent(content);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Страница «Инвесторам»</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
          }`}
        >
          <Save className="w-4 h-4" /> Сохранить
        </button>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Заголовок страницы</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            value={content.heroTitle}
            onChange={e => updateField('heroTitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold"
            placeholder="Инвесторам"
          />
          <textarea
            value={content.heroSubtitle}
            onChange={e => updateField('heroSubtitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-20"
            placeholder="Подзаголовок"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-primary">Статистика</h2>
          <button onClick={addStat} className="text-sm text-accent hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Добавить
          </button>
        </div>
        <div className="p-6 space-y-3">
          {content.stats.map((stat, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <input
                value={stat.value}
                onChange={e => updateStat(idx, 'value', e.target.value)}
                className="w-24 p-2 border rounded-lg font-bold text-center"
                placeholder="15+"
              />
              <input
                value={stat.label}
                onChange={e => updateStat(idx, 'label', e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Лет на рынке"
              />
              <button onClick={() => removeStat(idx)} className="p-1 text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Описание компании</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            value={content.aboutTitle}
            onChange={e => updateField('aboutTitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold"
            placeholder="Заголовок"
          />
          <textarea
            value={content.aboutText1}
            onChange={e => updateField('aboutText1', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-24"
            placeholder="Первый абзац"
          />
          <textarea
            value={content.aboutText2}
            onChange={e => updateField('aboutText2', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-24"
            placeholder="Второй абзац"
          />
          <ImageUpload
            label="Изображение"
            value={content.aboutImage}
            onChange={(url) => updateField('aboutImage', url)}
          />
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-primary">Документы (PDF)</h2>
          <button onClick={addDoc} className="text-sm text-accent hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Добавить
          </button>
        </div>
        <div className="p-6 space-y-3">
          {content.documents.map((doc, idx) => (
            <div key={doc.id} className="flex gap-3 items-center border rounded-lg p-3 bg-gray-50">
              <input
                value={doc.name}
                onChange={e => updateDoc(idx, 'name', e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Название документа"
              />
              <input
                value={doc.size}
                onChange={e => updateDoc(idx, 'size', e.target.value)}
                className="w-24 p-2 border rounded-lg text-center"
                placeholder="2.4 MB"
              />
              <input
                value={doc.url}
                onChange={e => updateDoc(idx, 'url', e.target.value)}
                className="w-48 p-2 border rounded-lg text-sm"
                placeholder="URL файла"
              />
              <button onClick={() => removeDoc(idx)} className="p-1 text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Призыв к действию</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            value={content.ctaTitle}
            onChange={e => updateField('ctaTitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold"
            placeholder="Заголовок"
          />
          <input
            value={content.ctaText}
            onChange={e => updateField('ctaText', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Текст"
          />
          <input
            value={content.ctaEmail}
            onChange={e => updateField('ctaEmail', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Email для связи"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// About Section (О компании)
// ============================================================
const AboutSection: React.FC = () => {
  const { aboutContent, updateAboutContent } = useData();
  const [content, setContent] = useState<AboutContent>(aboutContent);
  const [saved, setSaved] = useState(true);

  const updateField = (field: keyof AboutContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateStat = (idx: number, field: string, value: string) => {
    const newStats = [...content.stats];
    newStats[idx] = { ...newStats[idx], [field]: value };
    updateField('stats', newStats);
  };

  const updateValue = (idx: number, field: string, value: string) => {
    const newValues = [...content.values];
    newValues[idx] = { ...newValues[idx], [field]: value };
    updateField('values', newValues);
  };

  const addValue = () => {
    updateField('values', [...content.values, { title: '', description: '' }]);
  };

  const removeValue = (idx: number) => {
    updateField('values', content.values.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    updateAboutContent(content);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Страница «О компании»</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
          }`}
        >
          <Save className="w-4 h-4" /> Сохранить
        </button>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Заголовок страницы</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            value={content.heroTitle}
            onChange={e => updateField('heroTitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold"
            placeholder="О компании"
          />
          <textarea
            value={content.heroSubtitle}
            onChange={e => updateField('heroSubtitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-20"
            placeholder="Подзаголовок"
          />
          <ImageUpload
            label="Изображение hero"
            value={content.heroImage}
            onChange={(url) => updateField('heroImage', url)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Статистика (4 блока)</h2>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          {content.stats.map((stat, idx) => (
            <div key={idx} className="border rounded-lg p-3 bg-gray-50">
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={stat.value}
                  onChange={e => updateStat(idx, 'value', e.target.value)}
                  className="p-2 border rounded-lg font-bold text-center"
                  placeholder="15+"
                />
                <input
                  value={stat.icon}
                  onChange={e => updateStat(idx, 'icon', e.target.value)}
                  className="p-2 border rounded-lg text-sm"
                  placeholder="Building"
                />
              </div>
              <input
                value={stat.label}
                onChange={e => updateStat(idx, 'label', e.target.value)}
                className="w-full p-2 border rounded-lg mt-2"
                placeholder="Подпись"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Миссия компании</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            value={content.missionTitle}
            onChange={e => updateField('missionTitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold"
            placeholder="Наша миссия"
          />
          <textarea
            value={content.missionText1}
            onChange={e => updateField('missionText1', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-20"
            placeholder="Первый абзац"
          />
          <textarea
            value={content.missionText2}
            onChange={e => updateField('missionText2', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-20"
            placeholder="Второй абзац"
          />
          <textarea
            value={content.missionText3}
            onChange={e => updateField('missionText3', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-20"
            placeholder="Третий абзац"
          />
          <ImageUpload
            label="Изображение миссии"
            value={content.missionImage}
            onChange={(url) => updateField('missionImage', url)}
          />
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-primary">Ценности компании</h2>
          <button onClick={addValue} className="text-sm text-accent hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Добавить
          </button>
        </div>
        <div className="p-6 space-y-4">
          {content.values.map((val, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex gap-3 items-start">
                <div className="flex-1 space-y-2">
                  <input
                    value={val.title}
                    onChange={e => updateValue(idx, 'title', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold"
                    placeholder="Название"
                  />
                  <textarea
                    value={val.description}
                    onChange={e => updateValue(idx, 'description', e.target.value)}
                    className="w-full p-2 border rounded-lg h-20"
                    placeholder="Описание"
                  />
                </div>
                <button onClick={() => removeValue(idx)} className="p-1 text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Призыв к действию</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            value={content.ctaTitle}
            onChange={e => updateField('ctaTitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold"
            placeholder="Заголовок"
          />
          <input
            value={content.ctaText}
            onChange={e => updateField('ctaText', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Текст"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Contacts Section (Контакты)
// ============================================================
const ContactsSection: React.FC = () => {
  const { contactsContent, updateContactsContent } = useData();
  const [content, setContent] = useState<ContactsContent>(contactsContent);
  const [saved, setSaved] = useState(true);

  const updateField = (field: keyof ContactsContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateOffice = (idx: number, field: string, value: string) => {
    const newOffices = [...content.offices];
    newOffices[idx] = { ...newOffices[idx], [field]: value };
    updateField('offices', newOffices);
  };

  const addOffice = () => {
    updateField('offices', [...content.offices, { id: Date.now().toString(), name: '', address: '', phone: '', email: '', hours: '' }]);
  };

  const removeOffice = (idx: number) => {
    updateField('offices', content.offices.filter((_, i) => i !== idx));
  };

  const updateMessenger = (key: string, value: string) => {
    updateField('messengers', { ...content.messengers, [key]: value });
  };

  const handleSave = () => {
    updateContactsContent(content);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Страница «Контакты»</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
          }`}
        >
          <Save className="w-4 h-4" /> Сохранить
        </button>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Заголовок страницы</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            value={content.heroTitle}
            onChange={e => updateField('heroTitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-bold"
            placeholder="Контакты"
          />
          <textarea
            value={content.heroSubtitle}
            onChange={e => updateField('heroSubtitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-20"
            placeholder="Подзаголовок"
          />
        </div>
      </div>

      {/* Offices */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-primary">Офисы</h2>
          <button onClick={addOffice} className="text-sm text-accent hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Добавить офис
          </button>
        </div>
        <div className="p-6 space-y-4">
          {content.offices.map((office, idx) => (
            <div key={office.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex gap-3 items-start">
                <div className="flex-1 space-y-3">
                  <input
                    value={office.name}
                    onChange={e => updateOffice(idx, 'name', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold"
                    placeholder="Название офиса"
                  />
                  <input
                    value={office.address}
                    onChange={e => updateOffice(idx, 'address', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Адрес"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={office.phone}
                      onChange={e => updateOffice(idx, 'phone', e.target.value)}
                      className="p-2 border rounded-lg"
                      placeholder="Телефон"
                    />
                    <input
                      value={office.email}
                      onChange={e => updateOffice(idx, 'email', e.target.value)}
                      className="p-2 border rounded-lg"
                      placeholder="Email"
                    />
                  </div>
                  <input
                    value={office.hours}
                    onChange={e => updateOffice(idx, 'hours', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Часы работы"
                  />
                </div>
                <button onClick={() => removeOffice(idx)} className="p-1 text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotline */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Горячая линия</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              value={content.hotlinePhone}
              onChange={e => updateField('hotlinePhone', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg font-bold"
              placeholder="8 800 000-00-00"
            />
            <input
              value={content.hotlineText}
              onChange={e => updateField('hotlineText', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
              placeholder="Бесплатный звонок по России"
            />
          </div>
        </div>
      </div>

      {/* Yandex Map */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Яндекс Карта</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Координаты (lat,lng)</label>
              <input
                value={content.yandexMapCoords || ''}
                onChange={e => updateField('yandexMapCoords', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="46.347869,48.030596"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Масштаб (zoom)</label>
              <input
                type="number"
                value={content.yandexMapZoom || 15}
                onChange={e => updateField('yandexMapZoom', parseInt(e.target.value) || 15)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                min={1}
                max={21}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">Координаты можно получить на Яндекс Картах, кликнув правой кнопкой на нужную точку.</p>
        </div>
      </div>

      {/* Messengers */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Мессенджеры</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Telegram</label>
            <input
              value={content.messengers?.telegram || ''}
              onChange={e => updateMessenger('telegram', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://t.me/username"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">ВКонтакте</label>
            <input
              value={content.messengers?.vk || ''}
              onChange={e => updateMessenger('vk', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://vk.com/group"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp</label>
            <input
              value={content.messengers?.whatsapp || ''}
              onChange={e => updateMessenger('whatsapp', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://wa.me/78000000000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Buy Methods Section (Способы покупки)
// ============================================================
const BuyMethodsSection: React.FC = () => {
  const { buyMethods, updateBuyMethods } = useData();
  const [methods, setMethods] = useState<BuyMethodContent[]>(buyMethods);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saved, setSaved] = useState(true);

  const updateMethod = (id: string, field: keyof BuyMethodContent, value: any) => {
    setMethods(methods.map(m => m.id === id ? { ...m, [field]: value } : m));
    setSaved(false);
  };

  const updateFeature = (methodId: string, idx: number, field: string, value: string) => {
    setMethods(methods.map(m => {
      if (m.id === methodId) {
        const newFeatures = [...m.features];
        newFeatures[idx] = { ...newFeatures[idx], [field]: value };
        return { ...m, features: newFeatures };
      }
      return m;
    }));
    setSaved(false);
  };

  const addFeature = (methodId: string) => {
    setMethods(methods.map(m => {
      if (m.id === methodId) {
        return { ...m, features: [...m.features, { title: '', description: '' }] };
      }
      return m;
    }));
    setSaved(false);
  };

  const removeFeature = (methodId: string, idx: number) => {
    setMethods(methods.map(m => {
      if (m.id === methodId) {
        return { ...m, features: m.features.filter((_, i) => i !== idx) };
      }
      return m;
    }));
    setSaved(false);
  };

  const updateHowItWorks = (methodId: string, idx: number, field: string, value: string | number) => {
    setMethods(methods.map(m => {
      if (m.id === methodId) {
        const newSteps = [...m.howItWorks];
        newSteps[idx] = { ...newSteps[idx], [field]: value };
        return { ...m, howItWorks: newSteps };
      }
      return m;
    }));
    setSaved(false);
  };

  const addHowItWorks = (methodId: string) => {
    setMethods(methods.map(m => {
      if (m.id === methodId) {
        const nextStep = m.howItWorks.length + 1;
        return { ...m, howItWorks: [...m.howItWorks, { step: nextStep, title: '', description: '' }] };
      }
      return m;
    }));
    setSaved(false);
  };

  const removeHowItWorks = (methodId: string, idx: number) => {
    setMethods(methods.map(m => {
      if (m.id === methodId) {
        return { ...m, howItWorks: m.howItWorks.filter((_, i) => i !== idx) };
      }
      return m;
    }));
    setSaved(false);
  };

  const handleSave = () => {
    updateBuyMethods(methods);
    setSaved(true);
  };

  const editingMethod = methods.find(m => m.id === editingId);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Способы покупки</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
          }`}
        >
          <Save className="w-4 h-4" /> Сохранить
        </button>
      </div>

      {editingId && editingMethod ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="font-bold text-primary">Редактирование: {editingMethod.title}</h2>
            <button onClick={() => setEditingId(null)} className="text-sm text-gray-500 hover:text-gray-700">
              ← Назад к списку
            </button>
          </div>
          <div className="p-6 space-y-6">
            {/* Basic info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Название</label>
                <input
                  value={editingMethod.title}
                  onChange={e => updateMethod(editingId, 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Краткое описание</label>
                <input
                  value={editingMethod.description}
                  onChange={e => updateMethod(editingId, 'description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Заголовок Hero</label>
                <input
                  value={editingMethod.heroTitle}
                  onChange={e => updateMethod(editingId, 'heroTitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Подзаголовок Hero</label>
                <input
                  value={editingMethod.heroSubtitle}
                  onChange={e => updateMethod(editingId, 'heroSubtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Mortgage Programs (only for ipoteka) — placed prominently */}
            {(editingMethod.slug === 'ipoteka' || editingMethod.title.toLowerCase().includes('ипотечн')) && (
            <div className="border-t pt-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <p className="text-blue-800 text-sm"><strong>Ипотечные программы</strong> — эти программы отображаются на странице ипотечного калькулятора. Если список пуст, используются значения по умолчанию.</p>
              </div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-700">Ипотечные программы</h3>
                <button
                  onClick={() => {
                    const progs = editingMethod.mortgagePrograms || [];
                    const newProg = { id: Date.now().toString(), name: 'Новая программа', description: '', rate: 6, minDownPayment: 20.1, maxTerm: 30, maxAmount: 10000000 };
                    updateMethod(editingId, 'mortgagePrograms', [...progs, newProg]);
                  }}
                  className="bg-accent text-white px-3 py-1.5 rounded-lg text-sm hover:bg-opacity-90 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Добавить программу
                </button>
              </div>
              <div className="space-y-3">
                {(editingMethod.mortgagePrograms || []).map((prog: any, idx: number) => (
                  <div key={prog.id || idx} className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={prog.name}
                        onChange={e => {
                          const progs = [...(editingMethod.mortgagePrograms || [])];
                          progs[idx] = { ...progs[idx], name: e.target.value };
                          updateMethod(editingId, 'mortgagePrograms', progs);
                        }}
                        className="p-2 border rounded-lg font-medium"
                        placeholder="Название"
                      />
                      <input
                        value={prog.description}
                        onChange={e => {
                          const progs = [...(editingMethod.mortgagePrograms || [])];
                          progs[idx] = { ...progs[idx], description: e.target.value };
                          updateMethod(editingId, 'mortgagePrograms', progs);
                        }}
                        className="p-2 border rounded-lg"
                        placeholder="Описание"
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Ставка %</label>
                        <input
                          type="number" step="0.1"
                          value={prog.rate}
                          onChange={e => {
                            const progs = [...(editingMethod.mortgagePrograms || [])];
                            progs[idx] = { ...progs[idx], rate: parseFloat(e.target.value) || 0 };
                            updateMethod(editingId, 'mortgagePrograms', progs);
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Взнос от %</label>
                        <input
                          type="number" step="0.1"
                          value={prog.minDownPayment}
                          onChange={e => {
                            const progs = [...(editingMethod.mortgagePrograms || [])];
                            progs[idx] = { ...progs[idx], minDownPayment: parseFloat(e.target.value) || 0 };
                            updateMethod(editingId, 'mortgagePrograms', progs);
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Срок лет</label>
                        <input
                          type="number"
                          value={prog.maxTerm}
                          onChange={e => {
                            const progs = [...(editingMethod.mortgagePrograms || [])];
                            progs[idx] = { ...progs[idx], maxTerm: parseInt(e.target.value) || 0 };
                            updateMethod(editingId, 'mortgagePrograms', progs);
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Макс. сумма</label>
                        <input
                          type="number" step="100000"
                          value={prog.maxAmount}
                          onChange={e => {
                            const progs = [...(editingMethod.mortgagePrograms || [])];
                            progs[idx] = { ...progs[idx], maxAmount: parseInt(e.target.value) || 0 };
                            updateMethod(editingId, 'mortgagePrograms', progs);
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Бейдж</label>
                        <input
                          value={prog.badge || ''}
                          onChange={e => {
                            const progs = [...(editingMethod.mortgagePrograms || [])];
                            progs[idx] = { ...progs[idx], badge: e.target.value };
                            updateMethod(editingId, 'mortgagePrograms', progs);
                          }}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Популярная"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const progs = [...(editingMethod.mortgagePrograms || [])];
                        progs.splice(idx, 1);
                        updateMethod(editingId, 'mortgagePrograms', progs);
                      }}
                      className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Удалить программу
                    </button>
                  </div>
                ))}
                {(!editingMethod.mortgagePrograms || editingMethod.mortgagePrograms.length === 0) && (
                  <p className="text-gray-400 text-sm py-4 text-center bg-gray-50 rounded-lg">
                    Нет программ. Нажмите «Добавить программу». Пока список пуст, используются значения по умолчанию.
                  </p>
                )}
              </div>
            </div>
            )}

            {/* Features */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-700">Преимущества</h3>
                <button onClick={() => addFeature(editingId)} className="text-sm text-accent hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Добавить
                </button>
              </div>
              <div className="space-y-3">
                {editingMethod.features.map((f, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        value={f.title}
                        onChange={e => updateFeature(editingId, idx, 'title', e.target.value)}
                        className="p-2 border rounded-lg font-medium"
                        placeholder="Заголовок"
                      />
                      <input
                        value={f.description}
                        onChange={e => updateFeature(editingId, idx, 'description', e.target.value)}
                        className="p-2 border rounded-lg"
                        placeholder="Описание"
                      />
                    </div>
                    <button onClick={() => removeFeature(editingId, idx)} className="p-1 text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works / Documents — hidden for social-support */}
            {editingMethod.slug !== 'social-support' && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-700">
                  {editingMethod.slug === 'materinskiy-kapital' ? 'Необходимые документы' : 'Как это работает'}
                </h3>
                <button onClick={() => addHowItWorks(editingId)} className="text-sm text-accent hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> {editingMethod.slug === 'materinskiy-kapital' ? 'Добавить документ' : 'Добавить шаг'}
                </button>
              </div>
              <div className="space-y-3">
                {editingMethod.howItWorks.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg">
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        value={step.title}
                        onChange={e => updateHowItWorks(editingId, idx, 'title', e.target.value)}
                        className="w-full p-2 border rounded-lg font-medium"
                        placeholder={editingMethod.slug === 'materinskiy-kapital' ? 'Название документа' : 'Заголовок шага'}
                      />
                      {editingMethod.slug !== 'materinskiy-kapital' && (
                      <input
                        value={step.description}
                        onChange={e => updateHowItWorks(editingId, idx, 'description', e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm"
                        placeholder="Описание шага"
                      />
                      )}
                    </div>
                    <button onClick={() => removeHowItWorks(editingId, idx)} className="p-1 text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* CTA */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-gray-700 mb-3">Призыв к действию</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={editingMethod.ctaTitle}
                  onChange={e => updateMethod(editingId, 'ctaTitle', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg"
                  placeholder="Заголовок кнопки"
                />
                <input
                  value={editingMethod.ctaText}
                  onChange={e => updateMethod(editingId, 'ctaText', e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg"
                  placeholder="Текст под кнопкой"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {methods.map(method => (
            <div key={method.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-white`}>
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary">{method.title}</h3>
                  <div className="text-sm text-gray-500">{method.features.length} преимуществ • {method.howItWorks.length} шагов</div>
                </div>
              </div>
              <button onClick={() => setEditingId(method.id)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================
// Page Settings Section
// ============================================================
const PageSettingsSection: React.FC = () => {
  const { pageSettings, updatePageSettings, projects } = useData();

  // Merge existing settings with auto-generated project pages
  const allPaths = React.useMemo(() => {
    const existing = new Set(pageSettings.map(p => p.path));
    const projectPages: PageSettings[] = projects
      .filter(p => !existing.has(`/projects/${p.slug}`))
      .map(p => ({
        path: `/projects/${p.slug}`,
        title: p.name,
        description: p.shortDescription,
        h1: p.name,
      }));
    return [...pageSettings, ...projectPages];
  }, [pageSettings, projects]);

  const [settings, setSettings] = useState<PageSettings[]>(allPaths);
  const [saved, setSaved] = useState(true);
  const [newPath, setNewPath] = useState('');

  // Sync when allPaths changes
  React.useEffect(() => {
    setSettings(prev => {
      const existingPaths = new Set(prev.map(p => p.path));
      const toAdd = allPaths.filter(p => !existingPaths.has(p.path));
      return toAdd.length > 0 ? [...prev, ...toAdd] : prev;
    });
  }, [allPaths]);

  const updateField = (path: string, field: keyof PageSettings, value: string) => {
    setSettings(prev => prev.map(s => s.path === path ? { ...s, [field]: value } : s));
    setSaved(false);
  };

  const addPage = () => {
    const path = newPath.trim();
    if (!path || settings.some(s => s.path === path)) return;
    setSettings(prev => [...prev, { path, title: '', description: '', h1: '' }]);
    setNewPath('');
    setSaved(false);
  };

  const removePage = (path: string) => {
    setSettings(prev => prev.filter(s => s.path !== path));
    setSaved(false);
  };

  const handleSave = () => {
    updatePageSettings(settings);
    setSaved(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SEO настройки страниц</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
            saved ? 'bg-gray-300 text-gray-500' : 'bg-accent text-white hover:bg-opacity-90'
          }`}
        >
          <Save className="w-4 h-4" /> Сохранить
        </button>
      </div>

      {/* Add new page */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-1">Добавить страницу (путь)</label>
          <input
            value={newPath}
            onChange={e => setNewPath(e.target.value)}
            placeholder="/privacy-policy"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm font-mono"
          />
        </div>
        <button
          onClick={addPage}
          className="px-4 py-3 bg-accent text-white rounded-lg text-sm font-bold hover:bg-primary transition-colors"
        >
          + Добавить
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-4">Всего страниц: {settings.length}</div>

      <div className="space-y-4">
        {settings.map(page => (
          <div key={page.path} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b flex items-center justify-between">
              <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">{page.path}</span>
              <button
                onClick={() => removePage(page.path)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Удалить
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Title (заголовок вкладки)</label>
                  <input
                    value={page.title}
                    onChange={e => updateField(page.path, 'title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">H1 (заголовок на странице)</label>
                  <input
                    value={page.h1}
                    onChange={e => updateField(page.path, 'h1', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description (описание для поисковиков)</label>
                <textarea
                  value={page.description}
                  onChange={e => updateField(page.path, 'description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm h-16"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// Admin Dashboard (section switcher)
// ============================================================
const AdminDashboard: React.FC = () => {
  const { resetData } = useData();
  const [section, setSection] = useState<Section>('homepage');

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar active={section} onSelect={setSection} resetData={resetData} />
      <main className="ml-64 flex-1 p-8">
        {section === 'homepage' && <HomePageSection />}
        {section === 'projects' && <ProjectsSection />}
        {section === 'filters' && <FiltersSection />}
        {section === 'promotions' && <PromotionsSection />}
        {section === 'buy-methods' && <BuyMethodsSection />}
        {section === 'news' && <NewsSection />}
        {section === 'about' && <AboutSection />}
        {section === 'investors' && <InvestorsSection />}
        {section === 'contacts' && <ContactsSection />}
        {section === 'faq' && <FaqSection />}
        {section === 'team' && <TeamSection />}
        {section === 'vacancies' && <VacancySection />}
        {section === 'pages' && <PageSettingsSection />}
        {section === 'settings' && <SiteSettingsSection />}
      </main>
    </div>
  );
};

// ============================================================
// News Editor Wrapper
// ============================================================
const NewsEditorWrapper: React.FC = () => {
  const { news } = useData();
  const { id } = useParams<{ id: string }>();
  const item = news.find(n => n.id === id);
  if (!item) return <div className="p-8">Новость не найдена. <Link to="/admin" className="text-blue-500 underline">Назад</Link></div>;
  return <NewsEditor initialItem={item} />;
};

// ============================================================
// Project Editor Wrapper
// ============================================================
const ProjectEditorWrapper: React.FC = () => {
  const { projects } = useData();
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  if (!project) return <div className="p-8">Проект не найден. <Link to="/admin" className="text-blue-500 underline">Назад</Link></div>;
  return <ProjectEditor initialProject={project} />;
};

// ============================================================
// Main AdminLayout with Auth + Routing
// ============================================================
export const AdminLayout: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const API_URL = window.location.origin + '/api';

  const handleLogin = async () => {
    if (!password) return;
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuth(true);
      } else {
        setLoginError('Неверный пароль');
      }
    } catch {
      setLoginError('Ошибка соединения с сервером');
    } finally {
      setLoginLoading(false);
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-primary">Вход в систему</h2>
          <input
            type="password"
            placeholder="Введите пароль"
            className="w-full p-3 border rounded-xl mb-2 text-center"
            value={password}
            onChange={e => { setPassword(e.target.value); setLoginError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
          <button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-50"
          >
            {loginLoading ? 'Вход...' : 'Войти'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/projects/new" element={<ProjectEditor />} />
      <Route path="/projects/edit/:id" element={<ProjectEditorWrapper />} />
      <Route path="/news/new" element={<NewsEditor />} />
      <Route path="/news/edit/:id" element={<NewsEditorWrapper />} />
    </Routes>
  );
};

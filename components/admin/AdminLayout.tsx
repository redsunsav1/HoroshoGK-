import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Project, NewsItem, TeamMember, Vacancy, FaqCategory, FaqQuestion, PageSettings, HomePageContent, HomePagePromo, ProjectFilter, SiteSettings } from '../../types';
import { Link, useNavigate, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { ProjectEditor } from './ProjectEditor';
import {
  Plus, Edit2, Trash2, LogOut, LayoutGrid, RotateCcw,
  Newspaper, HelpCircle, Users, Briefcase, ArrowLeft, Save,
  Calendar, Image, FileText, Home, Filter, Settings,
} from 'lucide-react';

// ============================================================
// Sidebar Component
// ============================================================
type Section = 'homepage' | 'projects' | 'filters' | 'news' | 'faq' | 'team' | 'vacancies' | 'pages' | 'settings';

const sidebarItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'homepage', label: 'Главная', icon: <Home className="w-5 h-5" /> },
  { id: 'projects', label: 'Проекты', icon: <LayoutGrid className="w-5 h-5" /> },
  { id: 'filters', label: 'Фильтры ЖК', icon: <Filter className="w-5 h-5" /> },
  { id: 'news', label: 'Новости', icon: <Newspaper className="w-5 h-5" /> },
  { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-5 h-5" /> },
  { id: 'team', label: 'Команда', icon: <Users className="w-5 h-5" /> },
  { id: 'vacancies', label: 'Вакансии', icon: <Briefcase className="w-5 h-5" /> },
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
      <nav className="flex-1 p-4 space-y-1">
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
            <label className="block text-sm font-bold text-gray-700 mb-1">Фоновое изображение (URL)</label>
            <div className="flex gap-4">
              <input
                value={content.heroImage}
                onChange={e => updateField('heroImage', e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg"
              />
              <img src={content.heroImage} className="w-20 h-14 object-cover rounded bg-gray-100" />
            </div>
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
                <div className="w-24 h-20 rounded-lg overflow-hidden bg-white border shrink-0">
                  <img src={promo.image} className="w-full h-full object-cover" />
                </div>
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
                  <input
                    value={promo.image}
                    onChange={e => updatePromo(promo.id, 'image', e.target.value)}
                    placeholder="URL изображения"
                    className="w-full p-2 border rounded-lg text-sm text-gray-500"
                  />
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

      {/* Logo & Company Name */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <h2 className="font-bold text-primary">Логотип и название компании</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">URL логотипа (оставьте пустым для стандартного SVG)</label>
            <div className="flex gap-4">
              <input
                value={settings.logoUrl}
                onChange={e => updateField('logoUrl', e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                placeholder="https://example.com/logo.png"
              />
              {settings.logoUrl && (
                <img src={settings.logoUrl} className="h-14 w-auto object-contain rounded bg-gray-100 border" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Если URL указан, в шапке и подвале будет отображаться изображение вместо стандартного логотипа.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Название компании</label>
              <input
                value={settings.companyName}
                onChange={e => updateField('companyName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="ХОРОШО"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Подпись</label>
              <input
                value={settings.companySubtitle}
                onChange={e => updateField('companySubtitle', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="ГРУППА КОМПАНИЙ"
              />
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
          <label className="block text-sm font-bold text-gray-700 mb-2">Изображение (URL)</label>
          <div className="flex gap-4">
            <input value={item.image} onChange={e => setItem({...item, image: e.target.value})} className="flex-1 p-3 border border-gray-300 rounded-lg" />
            <img src={item.image} className="w-16 h-12 object-cover rounded bg-gray-100" />
          </div>
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
        <h1 className="text-3xl font-bold text-gray-800">FAQ</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Имя" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="p-3 border rounded-lg" />
            <input placeholder="Должность" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="p-3 border rounded-lg" />
            <input placeholder="URL фото" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="p-3 border rounded-lg" />
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
// Page Settings Section
// ============================================================
const PageSettingsSection: React.FC = () => {
  const { pageSettings, updatePageSettings } = useData();
  const [settings, setSettings] = useState<PageSettings[]>(pageSettings);
  const [saved, setSaved] = useState(true);

  const updateField = (path: string, field: keyof PageSettings, value: string) => {
    setSettings(prev => prev.map(s => s.path === path ? { ...s, [field]: value } : s));
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
      <div className="space-y-4">
        {settings.map(page => (
          <div key={page.path} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b flex items-center gap-3">
              <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">{page.path}</span>
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
        {section === 'news' && <NewsSection />}
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

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-primary">Вход в систему</h2>
          <input
            type="password"
            placeholder="Пароль (admin)"
            className="w-full p-3 border rounded-xl mb-4 text-center"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (password === 'admin' ? setIsAuth(true) : alert('Неверный пароль'))}
          />
          <button
            onClick={() => password === 'admin' ? setIsAuth(true) : alert('Неверный пароль')}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold"
          >
            Войти
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

import React, { useState } from 'react';
import { Project, ApartmentPlan, PromoOffer, ProjectFeature, ApartmentStatus, ProjectTimelineItem } from '../../types';
import { InfrastructureEditor } from './InfrastructureEditor';
import { ArrowLeft, Save, Plus, Trash2, Image, Layout, Tag, Building, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

interface ProjectEditorProps {
  initialProject?: Project;
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({ initialProject }) => {
  const navigate = useNavigate();
  const { addProject, updateProject } = useData();
  const isNew = !initialProject;

  const [project, setProject] = useState<Project>(initialProject || {
    id: Date.now().toString(),
    slug: 'new-project',
    name: 'Новый ЖК',
    shortDescription: '',
    fullDescription: '',
    location: '',
    tags: [],
    heroImage: '/images/placeholder-hero.svg',
    colorTheme: '#000000',
    gallery: [],
    features: [],
    plans: [],
    promos: [],
    infrastructure: [],
    totalFloors: 19,
    timeline: []
  });

  const [activeTab, setActiveTab] = useState<'general' | 'plans' | 'promos' | 'infra' | 'timeline'>('general');

  const handleSave = () => {
    if (isNew) {
      addProject(project);
    } else {
      updateProject(project);
    }
    navigate('/admin');
  };

  const handlePlanAdd = () => {
    const newPlan: ApartmentPlan = {
      id: Date.now().toString(),
      rooms: 1,
      area: 40,
      price: 'от 5.0 млн ₽',
      image: '/images/placeholder-plan.svg',
      floor: 1,
      number: '',
      status: 'available'
    };
    setProject({ ...project, plans: [...project.plans, newPlan] });
  };

  const handlePromoAdd = () => {
    const newPromo: PromoOffer = {
      id: Date.now().toString(),
      title: 'Новая акция',
      description: 'Описание акции',
      image: '/images/placeholder-card.svg'
    };
    setProject({ ...project, promos: [...project.promos, newPromo] });
  };

  const handleTimelineAdd = () => {
    const newItem: ProjectTimelineItem = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: 'Новое событие',
      description: ''
    };
    setProject({ ...project, timeline: [...(project.timeline || []), newItem] });
  };

  const updatePlan = (idx: number, field: keyof ApartmentPlan, value: any) => {
    const newPlans = [...project.plans];
    (newPlans[idx] as any)[field] = value;
    setProject({ ...project, plans: newPlans });
  };

  const updateTimeline = (idx: number, field: keyof ProjectTimelineItem, value: string) => {
    const newTimeline = [...(project.timeline || [])];
    (newTimeline[idx] as any)[field] = value;
    setProject({ ...project, timeline: newTimeline });
  };

  const statusOptions: { value: ApartmentStatus; label: string; color: string }[] = [
    { value: 'available', label: 'Свободна', color: 'bg-green-100 text-green-700' },
    { value: 'reserved', label: 'Бронь', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'sold', label: 'Продана', color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{isNew ? 'Создание проекта' : `Редактирование: ${project.name}`}</h1>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors">
          <Save className="w-4 h-4" />
          Сохранить
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'general', label: 'Основное' },
            { id: 'plans', label: 'Квартиры' },
            { id: 'promos', label: 'Акции' },
            { id: 'infra', label: 'Инфраструктура' },
            { id: 'timeline', label: 'Таймлайн' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Название ЖК</label>
                <input
                  value={project.name}
                  onChange={e => setProject({...project, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Локация</label>
                <input
                  value={project.location}
                  onChange={e => setProject({...project, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">URL-slug</label>
                <input
                  value={project.slug}
                  onChange={e => setProject({...project, slug: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="my-project"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-1" />
                  Количество этажей
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={project.totalFloors || 19}
                  onChange={e => setProject({...project, totalFloors: parseInt(e.target.value) || 19})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Ссылка на главное изображение (Hero Image)</label>
               <div className="flex gap-4">
                  <input
                    value={project.heroImage}
                    onChange={e => setProject({...project, heroImage: e.target.value})}
                    className="flex-1 p-3 border border-gray-300 rounded-lg"
                  />
                  <img src={project.heroImage} className="w-16 h-12 object-cover rounded bg-gray-100" />
               </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Краткое описание (на карточке)</label>
              <input
                value={project.shortDescription}
                onChange={e => setProject({...project, shortDescription: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Полное описание</label>
              <textarea
                value={project.fullDescription}
                onChange={e => setProject({...project, fullDescription: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Теги (через запятую)</label>
              <input
                value={project.tags.join(', ')}
                onChange={e => setProject({...project, tags: e.target.value.split(',').map(t => t.trim())})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm">
              <strong>Управление квартирами:</strong> Добавьте планировки и укажите для каждой этаж, номер квартиры и статус (свободна/бронь/продана).
              Этажи: от 1 до {project.totalFloors || 19}. Измените количество этажей во вкладке «Основное».
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Всего квартир: <strong>{project.plans.length}</strong>
              </div>
              <button onClick={handlePlanAdd} className="flex items-center gap-2 text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-primary">
                <Plus className="w-4 h-4" /> Добавить квартиру
              </button>
            </div>

            {project.plans.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет квартир. Нажмите «Добавить квартиру» чтобы начать.</p>
              </div>
            )}

            {project.plans.map((plan, idx) => (
              <div key={plan.id} className="border rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="flex items-center gap-4 p-4 bg-gray-50 border-b">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shrink-0 border overflow-hidden">
                     <img src={plan.image} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-primary">
                      {plan.rooms}-комн. квартира, {plan.area} м²
                    </div>
                    <div className="text-sm text-gray-500">
                      Этаж {plan.floor || '?'}{plan.number ? `, кв. №${plan.number}` : ''}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    statusOptions.find(s => s.value === (plan.status || 'available'))?.color
                  }`}>
                    {statusOptions.find(s => s.value === (plan.status || 'available'))?.label}
                  </div>
                  <button
                    onClick={() => setProject({...project, plans: project.plans.filter(p => p.id !== plan.id)})}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Комнат</label>
                    <select
                      value={plan.rooms}
                      onChange={e => updatePlan(idx, 'rooms', parseInt(e.target.value))}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value={1}>1-комн.</option>
                      <option value={2}>2-комн.</option>
                      <option value={3}>3-комн.</option>
                      <option value={4}>4-комн.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Площадь (м²)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={plan.area}
                      onChange={e => updatePlan(idx, 'area', parseFloat(e.target.value))}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Этаж (1-{project.totalFloors || 19})</label>
                    <input
                      type="number"
                      min="1"
                      max={project.totalFloors || 19}
                      value={plan.floor || 1}
                      onChange={e => updatePlan(idx, 'floor', parseInt(e.target.value))}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">№ квартиры</label>
                    <input
                      value={plan.number || ''}
                      onChange={e => updatePlan(idx, 'number', e.target.value)}
                      placeholder="напр. 42"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Цена</label>
                    <input
                      value={plan.price}
                      onChange={e => updatePlan(idx, 'price', e.target.value)}
                      placeholder="от 5.0 млн ₽"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Статус</label>
                    <select
                      value={plan.status || 'available'}
                      onChange={e => updatePlan(idx, 'status', e.target.value as ApartmentStatus)}
                      className={`w-full p-2 border rounded-lg ${
                        statusOptions.find(s => s.value === (plan.status || 'available'))?.color
                      }`}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">URL планировки</label>
                    <input
                      value={plan.image}
                      onChange={e => updatePlan(idx, 'image', e.target.value)}
                      className="w-full p-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Promos Tab */}
        {activeTab === 'promos' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-yellow-800 text-sm mb-4">
              Эти акции будут отображаться внутри страницы ЖК, а также могут попасть на "Главную" страницу сайта в блок спецпредложений.
            </div>
            <div className="flex justify-end">
              <button onClick={handlePromoAdd} className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                <Plus className="w-4 h-4" /> Добавить акцию
              </button>
            </div>
            {project.promos.map((promo, idx) => (
              <div key={promo.id} className="border p-4 rounded-xl flex gap-4 items-start bg-gray-50">
                <div className="w-32 h-20 bg-white rounded-lg shrink-0 border overflow-hidden">
                   <img src={promo.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                   <input
                     placeholder="Заголовок акции"
                     value={promo.title}
                     onChange={e => {
                       const newPromos = [...project.promos];
                       newPromos[idx].title = e.target.value;
                       setProject({...project, promos: newPromos});
                     }}
                     className="w-full p-2 border rounded font-bold"
                   />
                   <input
                     placeholder="Описание"
                     value={promo.description}
                     onChange={e => {
                       const newPromos = [...project.promos];
                       newPromos[idx].description = e.target.value;
                       setProject({...project, promos: newPromos});
                     }}
                     className="w-full p-2 border rounded text-sm"
                   />
                   <div className="flex gap-2">
                     <input
                       placeholder="Скидка (напр. -10%)"
                       value={promo.discount || ''}
                       onChange={e => {
                         const newPromos = [...project.promos];
                         newPromos[idx].discount = e.target.value;
                         setProject({...project, promos: newPromos});
                       }}
                       className="w-1/2 p-2 border rounded text-sm"
                     />
                     <input
                       placeholder="URL картинки"
                       value={promo.image}
                       onChange={e => {
                         const newPromos = [...project.promos];
                         newPromos[idx].image = e.target.value;
                         setProject({...project, promos: newPromos});
                       }}
                       className="w-1/2 p-2 border rounded text-sm"
                     />
                   </div>
                </div>
                <button
                  onClick={() => setProject({...project, promos: project.promos.filter(p => p.id !== promo.id)})}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Infrastructure Tab */}
        {activeTab === 'infra' && (
          <InfrastructureEditor
            items={project.infrastructure || []}
            onChange={(newInfra) => setProject({...project, infrastructure: newInfra})}
          />
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-purple-800 text-sm">
              <strong>Таймлайн проекта:</strong> Добавьте ключевые события строительства — старт продаж, начало стройки, ввод в эксплуатацию и т.д.
              Эти события будут показаны на странице проекта в виде временной шкалы.
            </div>
            <div className="flex justify-end">
              <button onClick={handleTimelineAdd} className="flex items-center gap-2 text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-primary">
                <Plus className="w-4 h-4" /> Добавить событие
              </button>
            </div>

            {(!project.timeline || project.timeline.length === 0) && (
              <div className="text-center py-12 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет событий. Нажмите «Добавить событие» чтобы начать.</p>
              </div>
            )}

            {project.timeline?.map((item, idx) => (
              <div key={item.id} className="border rounded-xl p-4 bg-white shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Дата</label>
                    <input
                      type="date"
                      value={item.date}
                      onChange={e => updateTimeline(idx, 'date', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Заголовок</label>
                    <input
                      value={item.title}
                      onChange={e => updateTimeline(idx, 'title', e.target.value)}
                      placeholder="Старт продаж"
                      className="w-full p-2 border rounded-lg font-medium"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Описание (опционально)</label>
                    <input
                      value={item.description}
                      onChange={e => updateTimeline(idx, 'description', e.target.value)}
                      placeholder="Описание события..."
                      className="w-full p-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setProject({...project, timeline: project.timeline?.filter(t => t.id !== item.id)})}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Project, ApartmentPlan, PromoOffer, ProjectFeature, ProjectTimelineItem, ConstructionUpdate, GalleryImage, GalleryCategory } from '../../types';
import { ImageUpload } from './ImageUpload';
import { ArrowLeft, Save, Plus, Trash2, Image, Layout, Tag, Building, Calendar, Star, Images, Video, Map } from 'lucide-react';
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
    timeline: [],
    constructionUpdates: [],
    galleryImages: [],
    galleryCategories: [],
    streamUrl: '',
    yandexMapUrl: ''
  });

  const [activeTab, setActiveTab] = useState<'general' | 'plans' | 'promos' | 'infra' | 'timeline' | 'features' | 'gallery' | 'construction'>('general');

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
      floor: '',
      number: ''
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

  const handleFeatureAdd = () => {
    const newFeature: ProjectFeature = {
      id: Date.now().toString(),
      title: 'Новое преимущество',
      description: 'Описание преимущества',
      icon: 'Shield'
    };
    setProject({ ...project, features: [...project.features, newFeature] });
  };

  const handleGalleryAdd = (url: string) => {
    setProject({ ...project, gallery: [...project.gallery, url] });
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
            { id: 'features', label: 'УТП' },
            { id: 'gallery', label: 'Галерея' },
            { id: 'plans', label: 'Квартиры' },
            { id: 'promos', label: 'Акции' },
            { id: 'construction', label: 'Ход стройки' },
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
               <ImageUpload
                 label="Главное изображение (Hero Image)"
                 value={project.heroImage}
                 onChange={(url) => setProject({...project, heroImage: url})}
               />
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

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Отображение на карточке (список проектов)</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Цена (на карточке)</label>
                  <input
                    value={project.cardPrice || ''}
                    onChange={e => setProject({...project, cardPrice: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="от 3.9 млн ₽"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Акция (на карточке)</label>
                  <input
                    value={project.cardPromo || ''}
                    onChange={e => setProject({...project, cardPromo: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Материнский капитал"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Трансляция строительства</h3>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Video className="w-4 h-4 inline mr-1" />
                  Ссылка на трансляцию (видео)
                </label>
                <input
                  value={project.streamUrl || ''}
                  onChange={e => setProject({...project, streamUrl: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm">
              <strong>Управление квартирами:</strong> Добавьте планировки и укажите для каждой этаж (можно диапазон: «2-5, 7») и планировку (напр. «1Б», «2Г»).
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
                      Этаж: {plan.floor || '?'}{plan.number ? `, планировка: ${plan.number}` : ''}
                    </div>
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
                    <label className="block text-xs font-medium text-gray-500 mb-1">Этаж</label>
                    <input
                      value={plan.floor || ''}
                      onChange={e => updatePlan(idx, 'floor', e.target.value)}
                      placeholder="напр. 2-5, 7"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Планировка</label>
                    <input
                      value={plan.number || ''}
                      onChange={e => updatePlan(idx, 'number', e.target.value)}
                      placeholder="напр. 1Б, 2Г"
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
                  <div className="col-span-2">
                    <ImageUpload
                      label="Планировка"
                      value={plan.image}
                      onChange={(url) => updatePlan(idx, 'image', url)}
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
                   <textarea
                     placeholder="Описание (поддерживает абзацы — используйте Enter)"
                     value={promo.description}
                     onChange={e => {
                       const newPromos = [...project.promos];
                       newPromos[idx].description = e.target.value;
                       setProject({...project, promos: newPromos});
                     }}
                     className="w-full p-2 border rounded text-sm h-24"
                   />
                   <div className="flex gap-2 items-end">
                     <div className="w-1/3">
                       <label className="block text-xs font-medium text-gray-500 mb-1">Скидка</label>
                       <input
                         placeholder="напр. -10%"
                         value={promo.discount || ''}
                         onChange={e => {
                           const newPromos = [...project.promos];
                           newPromos[idx].discount = e.target.value;
                           setProject({...project, promos: newPromos});
                         }}
                         className="w-full p-2 border rounded text-sm"
                       />
                     </div>
                     <div className="flex-1">
                       <ImageUpload
                         label="Обложка (заставка)"
                         value={promo.image}
                         onChange={(url) => {
                           const newPromos = [...project.promos];
                           newPromos[idx].image = url;
                           setProject({...project, promos: newPromos});
                         }}
                       />
                     </div>
                     <div className="flex-1">
                       <ImageUpload
                         label="Картинка в pop-up"
                         value={promo.popupImage || ''}
                         onChange={(url) => {
                           const newPromos = [...project.promos];
                           newPromos[idx].popupImage = url;
                           setProject({...project, promos: newPromos});
                         }}
                       />
                     </div>
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

        {/* Infrastructure Tab — Yandex Maps */}
        {activeTab === 'infra' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm">
              <strong>Инфраструктура через Яндекс Карты:</strong> Вставьте ссылку на карту из Яндекс Карт.
              Для этого откройте <a href="https://yandex.ru/maps" target="_blank" rel="noopener noreferrer" className="underline">Яндекс Карты</a>, найдите нужное место,
              нажмите «Поделиться» → «Встроить карту» и скопируйте URL из параметра src iframe.
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Map className="w-4 h-4 inline mr-1" />
                URL Яндекс Карты (iframe src)
              </label>
              <input
                value={project.yandexMapUrl || ''}
                onChange={e => setProject({...project, yandexMapUrl: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder="https://yandex.ru/map-widget/v1/?..."
              />
            </div>
            {project.yandexMapUrl && (
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src={project.yandexMapUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}

        {/* Features (УТП) Tab */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-800 text-sm">
              <strong>Уникальные торговые преимущества (УТП):</strong> Добавьте ключевые преимущества проекта — архитектура, безопасность, локация, инфраструктура и т.д.
              Эти преимущества отображаются на странице проекта.
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Всего УТП: <strong>{project.features.length}</strong>
              </div>
              <button onClick={handleFeatureAdd} className="flex items-center gap-2 text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-primary">
                <Plus className="w-4 h-4" /> Добавить УТП
              </button>
            </div>

            {project.features.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет преимуществ. Нажмите «Добавить УТП» чтобы начать.</p>
              </div>
            )}

            {project.features.map((feature, idx) => (
              <div key={feature.id || idx} className="border rounded-xl p-4 bg-white shadow-sm">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Заголовок</label>
                    <input
                      value={feature.title}
                      onChange={e => {
                        const newFeatures = [...project.features];
                        newFeatures[idx] = { ...newFeatures[idx], title: e.target.value };
                        setProject({ ...project, features: newFeatures });
                      }}
                      placeholder="Архитектура"
                      className="w-full p-2 border rounded-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Описание</label>
                    <textarea
                      value={feature.description}
                      onChange={e => {
                        const newFeatures = [...project.features];
                        newFeatures[idx] = { ...newFeatures[idx], description: e.target.value };
                        setProject({ ...project, features: newFeatures });
                      }}
                      placeholder="Описание преимущества..."
                      className="w-full p-2 border rounded-lg text-sm h-20"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setProject({ ...project, features: project.features.filter((_, i) => i !== idx) })}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-indigo-800 text-sm">
              <strong>Галерея проекта:</strong> Создайте категории (МОП, Дом, Велоколясочная, Кладовые и т.д.) и привяжите фото к каждой.
              Фильтры будут отображаться на странице проекта рядом с заголовком «Галерея».
            </div>

            {/* Gallery Categories */}
            <div className="border rounded-xl p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-gray-700">Категории галереи</label>
                <button
                  onClick={() => {
                    const newCat: GalleryCategory = { id: Date.now().toString(), name: 'Новая категория' };
                    setProject({ ...project, galleryCategories: [...(project.galleryCategories || []), newCat] });
                  }}
                  className="flex items-center gap-1 text-xs bg-accent text-white px-3 py-1.5 rounded-lg hover:bg-primary"
                >
                  <Plus className="w-3 h-3" /> Добавить категорию
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(project.galleryCategories || []).map((cat, idx) => (
                  <div key={cat.id} className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
                    <input
                      value={cat.name}
                      onChange={e => {
                        const cats = [...(project.galleryCategories || [])];
                        cats[idx] = { ...cats[idx], name: e.target.value };
                        setProject({ ...project, galleryCategories: cats });
                      }}
                      className="p-1 text-sm border-0 bg-transparent w-32 focus:outline-none"
                    />
                    <button
                      onClick={() => setProject({
                        ...project,
                        galleryCategories: (project.galleryCategories || []).filter(c => c.id !== cat.id),
                        galleryImages: (project.galleryImages || []).map(img => img.category === cat.id ? { ...img, category: 'all' } : img)
                      })}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {(!project.galleryCategories || project.galleryCategories.length === 0) && (
                  <span className="text-xs text-gray-400">Нет категорий. Все фото будут без фильтра.</span>
                )}
              </div>
            </div>

            {/* Add photo */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <ImageUpload
                  label="Добавить фото в галерею"
                  value=""
                  onChange={(url) => {
                    const newImg: GalleryImage = { id: Date.now().toString(), url, category: 'all' };
                    setProject({ ...project, galleryImages: [...(project.galleryImages || []), newImg] });
                  }}
                />
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Всего фото: <strong>{(project.galleryImages || []).length || project.gallery.length}</strong>
            </div>

            {(project.galleryImages || []).length === 0 && project.gallery.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Images className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет фотографий. Загрузите изображение выше.</p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(project.galleryImages || []).map((img, idx) => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden border bg-gray-50">
                  <div className="aspect-video">
                    <img src={img.url} alt={`Фото ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 bg-white border-t">
                    <select
                      value={img.category}
                      onChange={e => {
                        const imgs = [...(project.galleryImages || [])];
                        imgs[idx] = { ...imgs[idx], category: e.target.value };
                        setProject({ ...project, galleryImages: imgs });
                      }}
                      className="w-full text-xs p-1 border rounded"
                    >
                      <option value="all">Без категории</option>
                      {(project.galleryCategories || []).map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <button
                      onClick={() => setProject({ ...project, galleryImages: (project.galleryImages || []).filter(i => i.id !== img.id) })}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 pointer-events-auto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Construction Updates Tab */}
        {activeTab === 'construction' && (
          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-orange-800 text-sm">
              <strong>Ход строительства:</strong> Добавляйте обновления с фотографиями и описанием. Каждое обновление отображается на странице проекта с датой.
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const newUpdate: ConstructionUpdate = {
                    id: Date.now().toString(),
                    date: new Date().toISOString().split('T')[0],
                    title: 'Обновление строительства',
                    description: '',
                    photos: []
                  };
                  setProject({ ...project, constructionUpdates: [...(project.constructionUpdates || []), newUpdate] });
                }}
                className="flex items-center gap-2 text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-primary"
              >
                <Plus className="w-4 h-4" /> Добавить обновление
              </button>
            </div>

            {(!project.constructionUpdates || project.constructionUpdates.length === 0) && (
              <div className="text-center py-12 text-gray-400">
                <Building className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет обновлений. Нажмите «Добавить обновление» чтобы начать.</p>
              </div>
            )}

            {project.constructionUpdates?.map((update, idx) => (
              <div key={update.id} className="border rounded-xl p-4 bg-white shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Дата</label>
                    <input
                      type="date"
                      value={update.date}
                      onChange={e => {
                        const updated = [...(project.constructionUpdates || [])];
                        updated[idx] = { ...updated[idx], date: e.target.value };
                        setProject({ ...project, constructionUpdates: updated });
                      }}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Заголовок</label>
                    <input
                      value={update.title}
                      onChange={e => {
                        const updated = [...(project.constructionUpdates || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setProject({ ...project, constructionUpdates: updated });
                      }}
                      className="w-full p-2 border rounded-lg font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Описание</label>
                  <textarea
                    value={update.description}
                    onChange={e => {
                      const updated = [...(project.constructionUpdates || [])];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      setProject({ ...project, constructionUpdates: updated });
                    }}
                    placeholder="Описание хода работ..."
                    className="w-full p-2 border rounded-lg text-sm h-20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Фотографии</label>
                  <ImageUpload
                    label="Добавить фото"
                    value=""
                    onChange={(url) => {
                      const updated = [...(project.constructionUpdates || [])];
                      updated[idx] = { ...updated[idx], photos: [...updated[idx].photos, url] };
                      setProject({ ...project, constructionUpdates: updated });
                    }}
                  />
                  {update.photos.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-3">
                      {update.photos.map((photo, pIdx) => (
                        <div key={pIdx} className="relative group rounded-lg overflow-hidden border aspect-video">
                          <img src={photo} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => {
                                const updated = [...(project.constructionUpdates || [])];
                                updated[idx] = { ...updated[idx], photos: updated[idx].photos.filter((_, i) => i !== pIdx) };
                                setProject({ ...project, constructionUpdates: updated });
                              }}
                              className="p-1.5 bg-red-500 text-white rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setProject({
                      ...project,
                      constructionUpdates: project.constructionUpdates?.filter(u => u.id !== update.id)
                    })}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Удалить обновление
                  </button>
                </div>
              </div>
            ))}
          </div>
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

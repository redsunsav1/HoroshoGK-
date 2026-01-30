import React, { useState } from 'react';
import { Project, ApartmentPlan, PromoOffer, ProjectFeature } from '../../types';
import { InfrastructureEditor } from './InfrastructureEditor';
import { ArrowLeft, Save, Plus, Trash2, Image, Layout, Tag } from 'lucide-react';
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
    infrastructure: []
  });

  const [activeTab, setActiveTab] = useState<'general' | 'plans' | 'promos' | 'infra'>('general');

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
      price: '5.0 млн ₽',
      image: '/images/placeholder-plan.svg'
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
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'general', label: 'Основное' },
            { id: 'plans', label: 'Квартиры' },
            { id: 'promos', label: 'Акции (Офферы)' },
            { id: 'infra', label: 'Инфраструктура' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
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
            <div className="flex justify-end">
              <button onClick={handlePlanAdd} className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                <Plus className="w-4 h-4" /> Добавить планировку
              </button>
            </div>
            {project.plans.map((plan, idx) => (
              <div key={plan.id} className="border p-4 rounded-xl flex gap-4 items-center bg-gray-50">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shrink-0 border overflow-hidden">
                   <img src={plan.image} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-4 flex-1">
                   <input 
                     type="number" 
                     placeholder="Комнат"
                     value={plan.rooms}
                     onChange={e => {
                       const newPlans = [...project.plans];
                       newPlans[idx].rooms = parseInt(e.target.value);
                       setProject({...project, plans: newPlans});
                     }}
                     className="p-2 border rounded"
                   />
                   <input 
                     type="number" 
                     placeholder="Площадь"
                     value={plan.area}
                     onChange={e => {
                       const newPlans = [...project.plans];
                       newPlans[idx].area = parseFloat(e.target.value);
                       setProject({...project, plans: newPlans});
                     }}
                     className="p-2 border rounded"
                   />
                   <input 
                     placeholder="Цена"
                     value={plan.price}
                     onChange={e => {
                       const newPlans = [...project.plans];
                       newPlans[idx].price = e.target.value;
                       setProject({...project, plans: newPlans});
                     }}
                     className="p-2 border rounded"
                   />
                   <input 
                     placeholder="URL картинки"
                     value={plan.image}
                     onChange={e => {
                       const newPlans = [...project.plans];
                       newPlans[idx].image = e.target.value;
                       setProject({...project, plans: newPlans});
                     }}
                     className="p-2 border rounded"
                   />
                </div>
                <button 
                  onClick={() => setProject({...project, plans: project.plans.filter(p => p.id !== plan.id)})}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
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

      </div>
    </div>
  );
};
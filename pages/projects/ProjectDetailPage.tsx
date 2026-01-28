import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { InfrastructureMap } from '../../components/InfrastructureMap';
import { MapPin, CheckCircle, ArrowRight, ArrowLeft, Phone } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useData();
  const project = projects.find(p => p.slug === slug);

  const [activePlanTab, setActivePlanTab] = useState<number | 'all'>('all');

  if (!project) {
    return (
      <section className="py-24 px-4 md:px-8 text-center">
        <h1 className="text-3xl font-medium text-primary mb-4">Проект не найден</h1>
        <p className="text-secondary mb-8">Возможно, он был удален или перемещен.</p>
        <Link to="/projects" className="text-accent hover:underline">
          Вернуться к проектам
        </Link>
      </section>
    );
  }

  const filteredPlans = activePlanTab === 'all'
    ? project.plans
    : project.plans.filter(p => p.rooms === activePlanTab);

  const availableRoomTypes = Array.from(new Set(project.plans.map(p => p.rooms))).sort();

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-4 px-4 md:px-8 bg-beige border-b border-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-secondary hover:text-primary">Главная</Link>
            <span className="text-secondary">/</span>
            <Link to="/projects" className="text-secondary hover:text-primary">Проекты</Link>
            <span className="text-secondary">/</span>
            <span className="text-primary font-medium">{project.name}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 md:p-16 w-full max-w-5xl">
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-4 py-1.5 bg-white/80 border border-white rounded-full text-sm text-primary font-medium shadow-sm backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={400}>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-medium mb-4 leading-tight tracking-tight text-primary">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={600}>
            <p className="text-xl md:text-2xl text-primary/80 font-light max-w-2xl">
              {project.shortDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-start">
          <Reveal direction="right">
            <h2 className="text-3xl md:text-5xl font-medium mb-8 text-primary">О проекте</h2>
            <p className="text-lg text-secondary leading-relaxed mb-8 font-light">
              {project.fullDescription}
            </p>
            <div className="flex items-center text-primary font-medium p-4 bg-beige rounded-xl w-fit">
              <MapPin className="w-5 h-5 mr-3 text-accent" />
              {project.location}
            </div>
          </Reveal>
          <div className="grid gap-6">
            {project.features.map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100} direction="left">
                <div className="flex items-start p-6 bg-beige/50 border border-sand rounded-2xl hover:bg-beige transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm mr-6 text-accent">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
                    <p className="text-secondary font-light">{feature.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Map Section */}
      <section className="py-20 px-4 md:px-8 bg-beige/30">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium mb-8 text-primary">Инфраструктура</h2>
            <p className="text-secondary mb-8 font-light max-w-2xl">
              Всё необходимое для комфортной жизни — в шаговой доступности.
            </p>
            <InfrastructureMap project={project} />
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-20">
        <div className="px-4 md:px-8 mb-8">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium text-primary max-w-[1600px] mx-auto">Галерея</h2>
          </Reveal>
        </div>
        <div className="overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-4 px-4 md:px-8 w-max">
            {project.gallery.map((img, idx) => (
              <Reveal key={idx} delay={idx * 100} direction="right" className="w-[80vw] md:w-[600px] h-[400px] flex-shrink-0">
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments / Floor Plans */}
      <section className="py-20 px-4 md:px-8 bg-beige/10">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-sand pb-8">
              <h2 className="text-3xl md:text-5xl font-medium text-primary">Выбрать квартиру</h2>
              <div className="flex gap-2 mt-6 md:mt-0 flex-wrap">
                <button
                  onClick={() => setActivePlanTab('all')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activePlanTab === 'all' ? 'bg-primary text-white' : 'bg-beige text-secondary hover:bg-sand'
                  }`}
                >
                  Все
                </button>
                {availableRoomTypes.map(rooms => (
                  <button
                    key={rooms}
                    onClick={() => setActivePlanTab(rooms)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activePlanTab === rooms ? 'bg-primary text-white' : 'bg-beige text-secondary hover:bg-sand'
                    }`}
                  >
                    {rooms === 0 ? 'Студии' : `${rooms}-комн`}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <Reveal key={plan.id} className="group cursor-pointer">
                <div className="bg-white border border-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-8 bg-beige/30 flex items-center justify-center h-64 relative">
                    <img src={plan.image} alt="Plan" className="max-h-full max-w-full mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm text-primary">
                      {plan.rooms === 0 ? 'Студия' : `${plan.rooms} комн.`}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-secondary text-sm mb-1 font-light">Площадь</div>
                        <div className="text-2xl font-bold text-primary">{plan.area} м²</div>
                      </div>
                      <div className="text-right">
                        <div className="text-secondary text-sm mb-1 font-light">Стоимость</div>
                        <div className="text-xl font-bold text-accent">{plan.price}</div>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-3 border border-primary/20 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-colors text-primary">
                      Подробнее
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promos */}
      {project.promos.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-beige">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center text-primary">Специальные предложения</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {project.promos.map((promo, idx) => (
                <Reveal key={promo.id} delay={idx * 150} direction={idx % 2 === 0 ? 'right' : 'left'}>
                  <div className="relative h-80 rounded-3xl overflow-hidden group shadow-lg">
                    <img src={promo.image} alt={promo.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      {promo.discount && (
                        <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block shadow-sm">
                          {promo.discount}
                        </span>
                      )}
                      <h3 className="text-3xl font-bold text-white mb-2">{promo.title}</h3>
                      <p className="text-white/80 font-light">{promo.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-primary">
              Заинтересовал {project.name}?
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto font-light text-lg">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут для проведения персональной презентации.
            </p>
            <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="w-full px-6 py-4 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors text-primary placeholder:text-secondary/50"
              />
              <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-accent hover:shadow-lg transition-all duration-300">
                Получить консультацию
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Back to projects */}
      <section className="py-8 px-4 md:px-8 bg-beige border-t border-sand">
        <div className="max-w-[1600px] mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Все проекты
          </Link>
        </div>
      </section>
    </>
  );
};

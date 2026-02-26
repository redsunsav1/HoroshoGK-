import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowUpRight, Filter, MapPin } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects } = useData();
  const [filter, setFilter] = useState<string>('all');

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.tags.includes(filter));

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              Наши проекты
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Выберите жилой комплекс, который подходит именно вам.
              Каждый проект — это уникальная концепция комфортной жизни.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 md:px-8 bg-white border-b border-sand sticky top-20 z-30">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar">
            <Filter className="w-5 h-5 text-secondary shrink-0" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-beige text-secondary hover:bg-sand'
              }`}
            >
              Все проекты
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === tag
                    ? 'bg-primary text-white'
                    : 'bg-beige text-secondary hover:bg-sand'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 100}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-sand hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-[250px] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider px-3 py-1 bg-white/90 text-primary rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-medium text-white mb-1">{project.name}</h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-secondary mb-4 line-clamp-2">{project.shortDescription}</p>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-secondary uppercase tracking-wider">от</div>
                        <div className="text-lg font-bold text-primary">
                          {project.cardPrice || project.plans[0]?.price || 'По запросу'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-secondary uppercase tracking-wider">Планировки</div>
                        <div className="text-lg font-bold text-accent">
                          {project.plans.length > 0 ? `${project.plans.length} вариантов` : 'Нет'}
                        </div>
                      </div>
                    </div>

                    {(project.cardPromo || project.promos.length > 0) && (
                      <div className="mt-4 pt-4 border-t border-sand">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-accent uppercase tracking-wider">Акция:</span>
                          <span className="text-sm text-primary">{project.cardPromo || project.promos[0]?.title}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-secondary text-lg">Проекты не найдены</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 text-accent hover:underline"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

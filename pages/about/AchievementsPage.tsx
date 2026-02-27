import React from 'react';
import { Reveal } from '../../components/ui/Reveal';
import { Award, Building, Calendar } from 'lucide-react';

const achievements = [
  { year: '2024', title: 'Лучший застройщик региона', desc: 'По версии премии «Строительный Олимп»' },
  { year: '2023', title: 'ЖК Бруклин — проект года', desc: 'Региональная архитектурная премия' },
  { year: '2022', title: '5000-й ключ вручен', desc: 'Юбилейная семья получила ключи от квартиры' },
  { year: '2021', title: 'Лидер клиентского сервиса', desc: 'NPS 87% — лучший показатель в регионе' },
  { year: '2020', title: 'Экологический сертификат', desc: 'Внедрение зеленых технологий строительства' },
];

const completedProjects = [
  { name: 'ЖК Солнечный', year: 2018, units: 450, image: '/images/placeholder-card.svg' },
  { name: 'ЖК Парковый', year: 2019, units: 320, image: '/images/placeholder-card.svg' },
  { name: 'ЖК Речной', year: 2020, units: 580, image: '/images/placeholder-card.svg' },
  { name: 'ЖК Центральный', year: 2021, units: 420, image: '/images/placeholder-card.svg' },
  { name: 'ЖК Уютный', year: 2022, units: 680, image: '/images/placeholder-card.svg' },
  { name: 'ЖК Семейный', year: 2023, units: 520, image: '/images/placeholder-card.svg' },
];

export const AchievementsPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              Награды и достижения
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Наша работа отмечена многочисленными наградами и признанием профессионального сообщества.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Awards Timeline */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-12 flex items-center">
              <Award className="w-8 h-8 mr-3 text-accent" /> Награды
            </h2>
          </Reveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-sand transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {achievements.map((item, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className={`relative flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                      <div className={`bg-beige rounded-2xl p-6 ml-8 md:ml-0 ${idx % 2 === 0 ? '' : 'md:mr-0'}`}>
                        <div className="text-accent font-bold text-lg mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                        <p className="text-secondary">{item.desc}</p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 bg-accent rounded-full transform md:-translate-x-1/2 border-4 border-white shadow" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-12 flex items-center">
              <Building className="w-8 h-8 mr-3 text-accent" /> Реализованные проекты
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-white rounded-2xl overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-primary">
                      {project.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{project.name}</h3>
                    <p className="text-secondary">{project.units} квартир сдано</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

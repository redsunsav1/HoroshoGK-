import React from 'react';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';

export const TeamPage: React.FC = () => {
  const { team } = useData();
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              Наша команда
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Профессионалы, объединенные общей целью — создавать лучшие дома для жизни.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                  <p className="text-secondary">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
              Хотите присоединиться?
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">
              Мы всегда рады новым талантам в нашей команде.
            </p>
            <a
              href="/about/vacancy"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-accent transition-colors"
            >
              Смотреть вакансии
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
};

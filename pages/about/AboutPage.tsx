import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { Award, Users, Building, Target, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Building, Award, Target, Users
};

export const AboutPage: React.FC = () => {
  const { aboutContent } = useData();

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-6">
              {aboutContent.heroTitle}
            </h1>
            <p className="text-xl text-secondary font-light mb-8">
              {aboutContent.heroSubtitle}
            </p>
            <div className="flex gap-4">
              <Link
                to="/projects"
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors"
              >
                Наши проекты
              </Link>
              <Link
                to="/about/vacancy"
                className="border border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Вакансии
              </Link>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl transform rotate-6" />
              <img
                src={aboutContent.heroImage || '/images/placeholder-card.svg'}
                alt="Офис компании"
                className="relative rounded-2xl shadow-xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutContent.stats.map((stat, idx) => {
              const Icon = iconMap[stat.icon] || Building;
              return (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="text-center p-6 bg-beige rounded-2xl">
                    <Icon className="w-8 h-8 text-accent mx-auto mb-4" />
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-secondary text-sm">{stat.label}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium text-primary mb-8">
                {aboutContent.missionTitle}
              </h2>
              <div className="space-y-6 text-primary/70 text-lg leading-relaxed font-light">
                <p>{aboutContent.missionText1}</p>
                <p>{aboutContent.missionText2}</p>
                <p>{aboutContent.missionText3}</p>
              </div>
            </Reveal>
            <Reveal direction="left" delay={200}>
              <img
                src={aboutContent.missionImage || '/images/placeholder-card.svg'}
                alt="Миссия"
                className="rounded-2xl shadow-xl"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium text-primary mb-12 text-center">
              Наши ценности
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {aboutContent.values.map((value, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-8 bg-beige rounded-2xl h-full">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-accent">{idx + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{value.title}</h3>
                  <p className="text-secondary font-light">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-primary text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">{aboutContent.ctaTitle}</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {aboutContent.ctaText}
            </p>
            <Link
              to="/about/vacancy"
              className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors"
            >
              Смотреть вакансии <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

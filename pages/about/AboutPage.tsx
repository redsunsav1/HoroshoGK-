import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { Award, Users, Building, Target, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-6">
              О компании
            </h1>
            <p className="text-xl text-secondary font-light mb-8">
              Группа Компаний «Хорошо!» — это философия комфортной жизни.
              Мы строим не просто дома, а создаем пространства для счастья.
            </p>
            <div className="flex gap-4">
              <Link
                to="/about/team"
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors"
              >
                Наша команда
              </Link>
              <Link
                to="/about/achievements"
                className="border border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Достижения
              </Link>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl transform rotate-6" />
              <img
                src="https://picsum.photos/seed/office/800/600"
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
            {[
              { value: '15+', label: 'Лет на рынке', icon: Building },
              { value: '5 000+', label: 'Ключей выдано', icon: Award },
              { value: '12', label: 'Реализованных проектов', icon: Target },
              { value: '150+', label: 'Сотрудников', icon: Users },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="text-center p-6 bg-beige rounded-2xl">
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-secondary text-sm">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium text-primary mb-8">
                Наша <span className="text-accent italic font-serif">миссия</span>
              </h2>
              <div className="space-y-6 text-primary/70 text-lg leading-relaxed font-light">
                <p>
                  Мы верим, что каждый человек заслуживает жить в красивом и комфортном доме.
                  Наша задача — сделать это доступным.
                </p>
                <p>
                  Мы используем натуральные материалы, спокойные цветовые решения
                  и создаем атмосферу, в которой отдыхаешь душой.
                </p>
                <p>
                  Наши дворы — это приватные парки, а подъезды — лобби пятизвездочных отелей.
                </p>
              </div>
            </Reveal>
            <Reveal direction="left" delay={200}>
              <img
                src="https://picsum.photos/seed/mission/800/600"
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
            {[
              {
                title: 'Качество',
                desc: 'Мы не экономим на материалах и технологиях. Каждый дом строится так, будто мы строим его для себя.',
              },
              {
                title: 'Честность',
                desc: 'Прозрачные условия, точные сроки, никаких скрытых платежей. Мы дорожим доверием клиентов.',
              },
              {
                title: 'Забота',
                desc: 'Мы сопровождаем клиента на каждом этапе — от выбора квартиры до получения ключей и после.',
              },
            ].map((value, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-8 bg-beige rounded-2xl h-full">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-accent">{idx + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{value.title}</h3>
                  <p className="text-secondary font-light">{value.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Хотите стать частью команды?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Мы всегда в поиске талантливых специалистов, разделяющих наши ценности.
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

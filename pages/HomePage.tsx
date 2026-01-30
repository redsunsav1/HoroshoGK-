import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Reveal } from '../components/ui/Reveal';
import { ArrowUpRight, ArrowRight, ArrowDown, Percent, MessageSquare } from 'lucide-react';

const PROMO_INTERVAL = 6000;

const specialOffers = [
  {
    title: 'Ипотека 0.1%',
    description: 'На первый год для семей с детьми',
    discount: '-5%',
    image: '/images/placeholder-card.svg',
  },
  {
    title: 'Рассрочка 0%',
    description: 'Без переплат до конца строительства',
    discount: '-10%',
    image: '/images/placeholder-card.svg',
  },
  {
    title: 'Паркинг в подарок',
    description: 'При покупке 3-комнатной квартиры',
    discount: 'Подарок',
    image: '/images/placeholder-card.svg',
  },
  {
    title: 'Отделка в подарок',
    description: 'При бронировании до конца месяца',
    discount: '-300 т.₽',
    image: '/images/placeholder-card.svg',
  },
];

const PromoWidget: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / PROMO_INTERVAL) * 100, 100);
      setProgress(pct);
    }, 50);

    const slideTimer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % specialOffers.length);
    }, PROMO_INTERVAL);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [current]);

  const offer = specialOffers[current];

  return (
    <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-sand/50">
      {/* Image area */}
      <div className="relative h-[260px] overflow-hidden bg-beige">
        {/* % badge */}
        <div className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center shadow-sm">
          <Percent className="w-5 h-5 text-accent" />
        </div>

        {/* Discount badge */}
        <div className="absolute top-4 right-4 z-10 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {offer.discount}
        </div>

        {/* Promo image */}
        <img
          key={current}
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{offer.title}</h3>
        <p className="text-secondary">{offer.description}</p>

        {/* Progress bar */}
        <div className="mt-6 h-1 bg-sand rounded-full overflow-hidden">
          <div
            className="h-full bg-accent/70 rounded-full"
            style={{ width: `${progress}%`, transition: 'none' }}
          />
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {specialOffers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === current ? 'bg-accent w-6' : 'bg-sand w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const { projects } = useData();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/placeholder-hero.svg"
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/60" />
        </div>

        {/* Content grid */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            {/* Left side - Text */}
            <div className="max-w-2xl">
              <Reveal delay={100}>
                <div className="inline-block border border-primary/20 rounded-full px-6 py-2 mb-8">
                  <span className="text-sm uppercase tracking-widest text-primary/70 font-medium">
                    Застройщик Группа Компаний Хорошо
                  </span>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <h1 className="mb-6">
                  <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight leading-[0.9] text-primary">
                    Строим
                  </span>
                  <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight leading-[0.9] text-accent">
                    счастье
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={400}>
                <p className="text-lg md:text-xl text-secondary font-light max-w-md mb-10 leading-relaxed">
                  Эстетика, комфорт и безопасность в&nbsp;каждом квадратном метре.
                </p>
              </Reveal>

              <Reveal delay={600}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-3 bg-primary text-white pl-8 pr-6 py-4 rounded-full font-medium text-lg hover:bg-accent hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Выбрать квартиру
                  <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowDown className="w-5 h-5" />
                  </span>
                </Link>
              </Reveal>
            </div>

            {/* Right side - Promo Widget */}
            <div className="hidden lg:block">
              <Reveal direction="left" delay={400}>
                <PromoWidget />
              </Reveal>
            </div>
          </div>
        </div>

        {/* Chat button */}
        <button className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-accent transition-colors">
          <MessageSquare className="w-6 h-6" />
        </button>
      </section>

      {/* Mobile Promo Widget */}
      <section className="lg:hidden py-8 px-4 bg-beige/50 flex justify-center">
        <PromoWidget />
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 md:px-8 bg-white relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-primary">Наши проекты</h2>
              <Link to="/projects" className="hidden md:flex items-center text-accent hover:underline">
                Все проекты <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 100}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group cursor-pointer relative block overflow-hidden rounded-xl h-[300px]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 ease-out"
                    style={{ backgroundImage: `url(${project.heroImage})` }}
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-medium mb-1 tracking-wide">{project.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {project.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/20 backdrop-blur-md rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Link
            to="/projects"
            className="md:hidden mt-6 flex items-center justify-center text-accent hover:underline"
          >
            Все проекты <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-beige px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-8 text-primary">
              Мы строим <span className="text-accent italic font-serif">с душой</span> для вашего уюта.
            </h2>
            <div className="space-y-6 text-primary/70 text-lg leading-relaxed font-light">
              <p>
                Группа Компаний «Хорошо!» — это философия комфортной жизни.
                Мы используем натуральные материалы, спокойные цветовые решения
                и создаем атмосферу, в которой отдыхаешь душой.
              </p>
              <p>
                Наши дворы — это приватные парки, а подъезды — лобби пятизвездочных отелей.
              </p>
            </div>

            <div className="flex gap-12 mt-12">
              <div className="border-l-2 border-accent/30 pl-6">
                <div className="text-4xl font-medium text-accent mb-1">15+</div>
                <div className="text-sm text-secondary uppercase tracking-wider">Лет опыта</div>
              </div>
              <div className="border-l-2 border-accent/30 pl-6">
                <div className="text-4xl font-medium text-accent mb-1">5k+</div>
                <div className="text-sm text-secondary uppercase tracking-wider">Ключей выдано</div>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center mt-8 text-accent font-medium hover:underline"
            >
              Подробнее о компании <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Reveal>
          <Reveal direction="left" delay={200}>
            <div className="relative p-4">
              <div className="absolute inset-0 bg-sand rounded-full blur-3xl opacity-60 transform rotate-12" />
              <img
                src="/images/placeholder-card.svg"
                className="relative rounded-2xl shadow-xl grayscale-[20%]"
                alt="About us"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Buy Section */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-primary mb-4">Способы покупки</h2>
            <p className="text-secondary mb-12 max-w-2xl">
              Мы предлагаем различные варианты приобретения недвижимости,
              чтобы каждый мог найти подходящее решение.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Ипотека', desc: 'Выгодные ставки от партнеров', href: '/buy/ipoteka' },
              { title: 'Рассрочка', desc: 'Без переплат до конца строительства', href: '/buy/rassrochka' },
              { title: 'Trade-in', desc: 'Обменяйте старую квартиру', href: '/buy/trade-in' },
              { title: 'Маткапитал', desc: 'Используйте государственную поддержку', href: '/buy/materinskiy-kapital' },
            ].map((item, idx) => (
              <Reveal key={item.href} delay={idx * 100}>
                <Link
                  to={item.href}
                  className="block p-6 bg-beige rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-secondary text-sm">{item.desc}</p>
                  <ArrowRight className="w-5 h-5 mt-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <Link
              to="/buy"
              className="inline-flex items-center mt-8 text-accent font-medium hover:underline"
            >
              Все способы покупки <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-primary text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium mb-6">Готовы выбрать свой дом?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут
              для проведения персональной консультации.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors"
              >
                Смотреть проекты
              </Link>
              <Link
                to="/contacts"
                className="border border-white/30 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

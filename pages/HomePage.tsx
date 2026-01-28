import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Reveal } from '../components/ui/Reveal';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { projects } = useData();

  const heroPromos = useMemo(() => {
    const allPromos = projects.flatMap(p => p.promos.map(promo => ({ ...promo, project: p })));
    return allPromos.slice(0, 3);
  }, [projects]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#fdfbf9]">
          <img
            src="https://picsum.photos/seed/light-arch/1920/1080"
            className="w-full h-full object-cover opacity-20 grayscale-[20%]"
            alt="Background"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />

        <div className="relative z-10 px-4 md:px-8 max-w-[1600px] mx-auto w-full flex flex-col justify-center pb-32">
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 text-primary leading-[1.1]">
              Искусство<br/>
              <span className="italic font-serif text-accent">жить красиво</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-lg md:text-xl text-secondary font-light max-w-xl mb-8">
              Создаем пространства, вдохновленные эстетикой, комфортом и теплом.
              Дома, в которые хочется возвращаться.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <Link
              to="/projects"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Выбрать проект
            </Link>
          </Reveal>
        </div>

        {/* Hero Offers */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-t border-sand">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {heroPromos.map((promo, idx) => (
                <Link
                  key={idx}
                  to={`/projects/${promo.project.slug}`}
                  className="flex items-center gap-4 group cursor-pointer animate-slide-up p-2 rounded-lg hover:bg-white/50 transition-colors"
                  style={{ animationDelay: `${600 + idx * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <img src={promo.image} alt="offer" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Спецпредложение</div>
                    <div className="font-bold text-primary leading-tight group-hover:text-accent transition-colors">{promo.title}</div>
                    <div className="text-xs text-secondary mt-1">{promo.description.slice(0, 40)}...</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
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
                src="https://picsum.photos/seed/interior/800/800"
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

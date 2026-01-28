import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowLeft, Tag, ArrowRight } from 'lucide-react';

export const AkciiPage: React.FC = () => {
  const { projects } = useData();
  const allPromos = projects.flatMap(p => p.promos.map(promo => ({ ...promo, project: p })));

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-4 px-4 md:px-8 bg-beige border-b border-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-secondary hover:text-primary">Главная</Link>
            <span className="text-secondary">/</span>
            <Link to="/buy" className="text-secondary hover:text-primary">Способы покупки</Link>
            <span className="text-secondary">/</span>
            <span className="text-primary font-medium">Акции</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Tag className="w-12 h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                Акции и спецпредложения
              </h1>
            </div>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Выгодные предложения на квартиры в наших жилых комплексах.
              Успейте воспользоваться!
            </p>
          </Reveal>
        </div>
      </section>

      {/* Promos Grid */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          {allPromos.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {allPromos.map((promo, idx) => (
                <Reveal key={promo.id} delay={idx * 100}>
                  <div className="relative h-80 rounded-3xl overflow-hidden group">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      {promo.discount && (
                        <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                          {promo.discount}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-2">{promo.title}</h3>
                      <p className="text-white/80 mb-4">{promo.description}</p>
                      <Link
                        to={`/projects/${promo.project.slug}`}
                        className="inline-flex items-center text-white font-medium hover:text-accent transition-colors"
                      >
                        {promo.project.name} <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-secondary text-lg">В данный момент акций нет</p>
              <Link to="/projects" className="mt-4 inline-flex items-center text-accent hover:underline">
                Посмотреть все проекты <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-medium text-primary mb-4">
                Не пропустите выгодные предложения
              </h2>
              <p className="text-secondary mb-8 max-w-xl mx-auto">
                Подпишитесь на рассылку и узнавайте о новых акциях первыми
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-6 py-4 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent"
                />
                <button className="bg-primary text-white px-6 py-4 rounded-xl font-medium hover:bg-accent transition-colors whitespace-nowrap">
                  Подписаться
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Back */}
      <section className="py-8 px-4 md:px-8 bg-white border-t border-sand">
        <div className="max-w-[1600px] mx-auto">
          <Link to="/buy" className="inline-flex items-center text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Все способы покупки
          </Link>
        </div>
      </section>
    </>
  );
};

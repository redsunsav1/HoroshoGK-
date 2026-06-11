import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { Calendar, ArrowRight } from 'lucide-react';

const FALLBACK_NEWS_IMAGE = '/images/placeholder-card.svg';

export const NewsPage: React.FC = () => {
  const { news } = useData();
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              Новости
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Следите за новостями компании, акциями и ходом строительства наших проектов.
            </p>
          </Reveal>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 100}>
                <Link
                  to={`/news/${item.slug}`}
                  className="group block relative aspect-[16/9] min-h-[320px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={item.image || FALLBACK_NEWS_IMAGE}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={e => {
                      e.currentTarget.src = FALLBACK_NEWS_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent" />
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-medium text-primary">
                    {item.category}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="flex items-center text-white/75 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(item.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/80 mb-5 line-clamp-2">{item.excerpt}</p>
                    <span className="inline-flex items-center text-white font-medium">
                      Читать далее <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <button className="bg-beige text-primary px-8 py-4 rounded-xl font-medium hover:bg-sand transition-colors">
            Загрузить еще
          </button>
        </div>
      </section>
    </>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { Calendar, ArrowRight } from 'lucide-react';

const news = [
  {
    id: '1',
    slug: 'new-project-announcement',
    title: 'Старт продаж нового ЖК «Гармония»',
    excerpt: 'Рады объявить о начале продаж в нашем новом жилом комплексе...',
    date: '2024-01-15',
    image: 'https://picsum.photos/seed/news1/800/500',
    category: 'Новости компании',
  },
  {
    id: '2',
    slug: 'mortgage-rate-update',
    title: 'Снижение ипотечных ставок у партнеров',
    excerpt: 'Сбербанк и ВТБ снизили ставки по ипотеке для наших клиентов...',
    date: '2024-01-10',
    image: 'https://picsum.photos/seed/news2/800/500',
    category: 'Ипотека',
  },
  {
    id: '3',
    slug: 'brooklyn-completion',
    title: 'ЖК «Бруклин» сдан досрочно',
    excerpt: 'Мы рады сообщить, что строительство ЖК «Бруклин» завершено на 2 месяца раньше срока...',
    date: '2024-01-05',
    image: 'https://picsum.photos/seed/news3/800/500',
    category: 'Строительство',
  },
  {
    id: '4',
    slug: 'winter-promo',
    title: 'Зимняя акция: скидки до 500 000 ₽',
    excerpt: 'До конца февраля действуют специальные условия на покупку квартир...',
    date: '2024-01-01',
    image: 'https://picsum.photos/seed/news4/800/500',
    category: 'Акции',
  },
];

export const NewsPage: React.FC = () => {
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
                  className="group block bg-beige rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-primary">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-secondary text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(item.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-secondary mb-4">{item.excerpt}</p>
                    <span className="inline-flex items-center text-accent font-medium">
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

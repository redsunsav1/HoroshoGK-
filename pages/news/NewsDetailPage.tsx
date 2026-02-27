import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { news } = useData();
  const article = news.find(n => n.slug === slug);

  if (!article) {
    return (
      <section className="py-24 px-4 md:px-8 text-center">
        <h1 className="text-3xl font-medium text-primary mb-4">Новость не найдена</h1>
        <Link to="/news" className="text-accent hover:underline">
          Вернуться к новостям
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-4 px-4 md:px-8 bg-beige border-b border-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-secondary hover:text-primary">Главная</Link>
            <span className="text-secondary">/</span>
            <Link to="/news" className="text-secondary hover:text-primary">Новости</Link>
            <span className="text-secondary">/</span>
            <span className="text-primary font-medium line-clamp-1">{article.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Article */}
      <section className="py-12 px-4 md:px-8 bg-white -mt-24 relative z-10">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  <span className="flex items-center text-secondary text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(article.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <button className="p-2 hover:bg-beige rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-secondary" />
                </button>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                {article.title}
              </h1>

              <div
                className="prose prose-lg max-w-none text-secondary"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Back */}
      <section className="py-8 px-4 md:px-8 bg-beige">
        <div className="max-w-[800px] mx-auto">
          <Link to="/news" className="inline-flex items-center text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Все новости
          </Link>
        </div>
      </section>
    </>
  );
};

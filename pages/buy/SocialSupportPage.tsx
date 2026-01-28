import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowLeft, Heart, Users, Home } from 'lucide-react';

const categories = [
  { title: 'Молодые семьи', desc: 'Семьи, где оба супруга младше 35 лет', discount: 'до 300 000 ₽' },
  { title: 'Многодетные семьи', desc: 'Семьи с тремя и более детьми', discount: 'до 450 000 ₽' },
  { title: 'Медицинские работники', desc: 'Врачи и медперсонал', discount: 'до 200 000 ₽' },
  { title: 'Педагоги', desc: 'Учителя и воспитатели', discount: 'до 200 000 ₽' },
  { title: 'Военнослужащие', desc: 'Действующие военнослужащие', discount: 'Специальные условия' },
];

export const SocialSupportPage: React.FC = () => {
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
            <span className="text-primary font-medium">Социальная поддержка</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Heart className="w-12 h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                Социальная поддержка
              </h1>
            </div>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Специальные условия и скидки для льготных категорий граждан.
              Мы ценим ваш вклад в общество.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Льготные категории</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-beige p-6 rounded-2xl h-full">
                  <h3 className="text-xl font-bold text-primary mb-2">{cat.title}</h3>
                  <p className="text-secondary mb-4">{cat.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-sand">
                    <span className="text-sm text-secondary">Скидка</span>
                    <span className="font-bold text-accent">{cat.discount}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-white text-center">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Узнайте о своих льготах</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Оставьте заявку, и мы расскажем о всех доступных программах поддержки
              </p>
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors">
                Получить консультацию
              </button>
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

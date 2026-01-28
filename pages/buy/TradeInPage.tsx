import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowLeft, RefreshCw, Home, Clock, Shield } from 'lucide-react';

export const TradeInPage: React.FC = () => {
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
            <span className="text-primary font-medium">Trade-in</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              Trade-in
            </h1>
            <p className="text-xl text-secondary font-light mb-8">
              Обменяйте свою старую квартиру на новую. Мы выкупим вашу недвижимость
              по рыночной стоимости и зачтем её в счет покупки.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors">
                Оценить квартиру
              </button>
            </div>
          </Reveal>
          <Reveal direction="left">
            <img
              src="https://picsum.photos/seed/tradein/600/400"
              alt="Trade-in"
              className="rounded-2xl shadow-xl"
            />
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Преимущества Trade-in</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: RefreshCw, title: 'Быстрый обмен', desc: 'Сделка за 1-2 недели' },
              { icon: Home, title: 'Честная оценка', desc: 'Рыночная стоимость вашей квартиры' },
              { icon: Clock, title: 'Без ожидания', desc: 'Не нужно искать покупателя' },
              { icon: Shield, title: 'Гарантия сделки', desc: 'Юридическое сопровождение' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-6 bg-beige rounded-2xl text-center">
                  <item.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-secondary text-sm">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Как работает Trade-in</h2>
          </Reveal>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Оставьте заявку', desc: 'Заполните форму или позвоните нам' },
              { step: 2, title: 'Оценка квартиры', desc: 'Наш специалист оценит вашу недвижимость' },
              { step: 3, title: 'Выбор новой квартиры', desc: 'Подберите квартиру в наших проектах' },
              { step: 4, title: 'Оформление сделки', desc: 'Подписание документов и передача ключей' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="flex items-center gap-6 bg-white p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                    <p className="text-secondary">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
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

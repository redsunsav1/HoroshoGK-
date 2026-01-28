import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowLeft, CheckCircle, Calendar, Percent } from 'lucide-react';

export const RassrochkaPage: React.FC = () => {
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
            <span className="text-primary font-medium">Рассрочка</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              Рассрочка от застройщика
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Покупайте квартиру без переплат. Рассрочка до окончания строительства
              с первоначальным взносом от 10%.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Percent, title: '0% переплаты', desc: 'Никаких процентов до конца строительства' },
              { icon: Calendar, title: 'До 24 месяцев', desc: 'Комфортный срок погашения' },
              { icon: CheckCircle, title: 'От 10% взнос', desc: 'Минимальный первоначальный взнос' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="text-center p-8 bg-beige rounded-2xl">
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-secondary">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Как это работает</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Выберите квартиру', desc: 'Подберите подходящий вариант' },
              { step: '02', title: 'Внесите взнос', desc: 'От 10% стоимости квартиры' },
              { step: '03', title: 'Платите частями', desc: 'Равными платежами до сдачи дома' },
              { step: '04', title: 'Получите ключи', desc: 'Оформите собственность' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold text-accent/20 mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-secondary text-sm">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-4">Оформить рассрочку</h2>
            <p className="text-secondary mb-8">Оставьте заявку, и мы подберем оптимальные условия</p>
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-accent transition-colors">
              Оставить заявку
            </button>
          </Reveal>
        </div>
      </section>

      {/* Back */}
      <section className="py-8 px-4 md:px-8 bg-beige border-t border-sand">
        <div className="max-w-[1600px] mx-auto">
          <Link to="/buy" className="inline-flex items-center text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Все способы покупки
          </Link>
        </div>
      </section>
    </>
  );
};

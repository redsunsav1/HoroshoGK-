import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';

export const SvoPage: React.FC = () => {
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
            <span className="text-primary font-medium">Скидка участникам СВО</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-12 h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                Скидка участникам СВО
              </h1>
            </div>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Специальные условия для военнослужащих и членов их семей.
              Мы благодарим вас за службу Родине.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Что мы предлагаем</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="bg-beige p-8 rounded-2xl">
                <h3 className="text-3xl font-bold text-accent mb-4">до 500 000 ₽</h3>
                <p className="text-xl text-primary font-medium mb-4">Скидка на покупку квартиры</p>
                <p className="text-secondary">
                  Размер скидки зависит от площади и стоимости выбранной квартиры
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-4">
                {[
                  'Фиксация цены на весь период строительства',
                  'Бесплатное бронирование квартиры',
                  'Индивидуальный график платежей',
                  'Юридическое сопровождение сделки',
                  'Помощь в оформлении военной ипотеки',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-beige rounded-xl">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who can apply */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Кто может получить скидку</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Участники СВО', desc: 'Военнослужащие, участвующие в специальной военной операции' },
              { title: 'Члены семей', desc: 'Супруги и дети военнослужащих' },
              { title: 'Ветераны боевых действий', desc: 'При наличии подтверждающих документов' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-white p-6 rounded-2xl h-full">
                  <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-secondary">{item.desc}</p>
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
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-4">Получить консультацию</h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">
              Оставьте заявку, и наш специалист свяжется с вами для уточнения условий
            </p>
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

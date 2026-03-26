import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { CreditCard, Percent, RefreshCw, Baby, Heart, Tag, Shield, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  CreditCard, Percent, RefreshCw, Baby, Heart, Tag, Shield
};

export const BuyPage: React.FC = () => {
  const { buyMethods } = useData();

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              Способы покупки
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Мы предлагаем различные варианты приобретения недвижимости,
              чтобы каждый мог найти подходящее решение.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Options Grid */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyMethods.map((method, idx) => {
              const Icon = iconMap[method.icon] || CreditCard;
              const isStatic = method.slug === 'svo';
              const cardClass = "flex flex-col p-8 bg-beige rounded-2xl transition-all duration-300 group h-full" +
                (isStatic ? '' : ' hover:shadow-xl hover:-translate-y-1 cursor-pointer');

              const cardContent = (
                <>
                  <div className={`w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center mb-6 text-white ${isStatic ? '' : 'group-hover:scale-110'} transition-transform shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className={`text-2xl font-bold text-primary mb-3 ${isStatic ? '' : 'group-hover:text-accent'} transition-colors`}>
                    {method.title}
                  </h3>
                  <p className="text-secondary mb-4 flex-1">{method.description}</p>
                  {!isStatic && (
                    <span className="inline-flex items-center text-accent font-medium mt-auto">
                      Подробнее <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </>
              );

              return (
                <Reveal key={method.slug} delay={idx * 100} className="h-full">
                  {isStatic ? (
                    <div className={cardClass}>{cardContent}</div>
                  ) : (
                    <Link to={`/buy/${method.slug}`} className={cardClass}>{cardContent}</Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 px-4 md:px-8 bg-primary text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Рассчитайте ипотеку</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Узнайте ежемесячный платеж и подберите оптимальные условия кредитования.
            </p>
            <Link
              to="/buy/ipoteka"
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors"
            >
              Открыть калькулятор
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Consultation */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-primary mb-4">
                Нужна консультация?
              </h2>
              <p className="text-secondary max-w-lg">
                Наши специалисты помогут подобрать оптимальный способ покупки
                и ответят на все ваши вопросы.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+78000000000"
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors text-center"
              >
                8 800 000-00-00
              </a>
              <Link
                to="/contacts"
                className="border border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors text-center"
              >
                Написать нам
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

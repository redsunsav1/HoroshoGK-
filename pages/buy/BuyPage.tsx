import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { CreditCard, Percent, RefreshCw, Baby, Heart, Tag, Shield, ArrowRight } from 'lucide-react';

const buyOptions = [
  {
    icon: CreditCard,
    title: 'Ипотечный калькулятор',
    desc: 'Рассчитайте платёж и выберите ипотечную программу. Семейная, льготная, IT-ипотека.',
    href: '/buy/ipoteka',
    color: 'bg-blue-500',
  },
  {
    icon: Percent,
    title: 'Рассрочка',
    desc: 'Без переплат до конца строительства. Первоначальный взнос от 10%.',
    href: '/buy/rassrochka',
    color: 'bg-green-500',
  },
  {
    icon: RefreshCw,
    title: 'Trade-in',
    desc: 'Обменяйте старую квартиру на новую. Зачтем полную стоимость.',
    href: '/buy/trade-in',
    color: 'bg-purple-500',
  },
  {
    icon: Baby,
    title: 'Материнский капитал',
    desc: 'Используйте государственную поддержку для покупки квартиры.',
    href: '/buy/materinskiy-kapital',
    color: 'bg-pink-500',
  },
  {
    icon: Heart,
    title: 'Социальная поддержка',
    desc: 'Специальные условия для льготных категорий граждан.',
    href: '/buy/social-support',
    color: 'bg-red-500',
  },
  {
    icon: Tag,
    title: 'Акции',
    desc: 'Актуальные скидки и специальные предложения на квартиры.',
    href: '/buy/akcii',
    color: 'bg-orange-500',
  },
  {
    icon: Shield,
    title: 'Скидка участникам СВО',
    desc: 'Особые условия для военнослужащих и их семей.',
    href: '/buy/svo',
    color: 'bg-teal-500',
  },
];

export const BuyPage: React.FC = () => {
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
            {buyOptions.map((option, idx) => (
              <Reveal key={option.href} delay={idx * 100}>
                <Link
                  to={option.href}
                  className="block p-8 bg-beige rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full"
                >
                  <div className={`w-14 h-14 ${option.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                    <option.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-secondary mb-4">{option.desc}</p>
                  <span className="inline-flex items-center text-accent font-medium">
                    Подробнее <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
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

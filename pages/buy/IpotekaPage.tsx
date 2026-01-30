import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { Calculator, Building, Percent, Calendar, ArrowLeft } from 'lucide-react';

const banks = [
  { name: 'Сбербанк', rate: 5.9, logo: '/images/placeholder-card.svg' },
  { name: 'ВТБ', rate: 6.1, logo: '/images/placeholder-card.svg' },
  { name: 'Альфа-Банк', rate: 6.5, logo: '/images/placeholder-card.svg' },
  { name: 'Газпромбанк', rate: 6.2, logo: '/images/placeholder-card.svg' },
];

export const IpotekaPage: React.FC = () => {
  const [price, setPrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(5.9);

  const monthlyPayment = useMemo(() => {
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    if (monthlyRate === 0) return principal / months;

    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return Math.round(payment);
  }, [price, downPayment, years, rate]);

  const totalPayment = monthlyPayment * years * 12;
  const overpayment = totalPayment - (price - downPayment);

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
            <span className="text-primary font-medium">Ипотека</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              Ипотека
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Выгодные условия от банков-партнеров. Ставки от 5.9% годовых.
              Одобрение за 1 день.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-accent" />
              <h2 className="text-2xl md:text-3xl font-medium text-primary">Ипотечный калькулятор</h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <Reveal>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Стоимость квартиры: {price.toLocaleString()} ₽
                  </label>
                  <input
                    type="range"
                    min={2000000}
                    max={30000000}
                    step={100000}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>2 млн</span>
                    <span>30 млн</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Первоначальный взнос: {downPayment.toLocaleString()} ₽ ({Math.round(downPayment / price * 100)}%)
                  </label>
                  <input
                    type="range"
                    min={price * 0.1}
                    max={price * 0.9}
                    step={50000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Срок кредита: {years} лет
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>1 год</span>
                    <span>30 лет</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Процентная ставка: {rate}%
                  </label>
                  <input
                    type="range"
                    min={4}
                    max={20}
                    step={0.1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>4%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Results */}
            <Reveal delay={200}>
              <div className="bg-beige rounded-3xl p-8">
                <div className="text-center mb-8">
                  <div className="text-sm text-secondary mb-2">Ежемесячный платеж</div>
                  <div className="text-5xl font-bold text-accent">{monthlyPayment.toLocaleString()} ₽</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-white rounded-xl">
                    <span className="text-secondary">Сумма кредита</span>
                    <span className="font-bold text-primary">{(price - downPayment).toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between p-4 bg-white rounded-xl">
                    <span className="text-secondary">Переплата</span>
                    <span className="font-bold text-primary">{overpayment.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between p-4 bg-white rounded-xl">
                    <span className="text-secondary">Общая сумма</span>
                    <span className="font-bold text-primary">{totalPayment.toLocaleString()} ₽</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-medium hover:bg-accent transition-colors">
                  Оставить заявку
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Partner Banks */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Банки-партнеры</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {banks.map((bank, idx) => (
              <Reveal key={bank.name} delay={idx * 100}>
                <div className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
                  <img src={bank.logo} alt={bank.name} className="h-10 mx-auto mb-4 grayscale hover:grayscale-0 transition-all" />
                  <div className="font-bold text-primary">{bank.name}</div>
                  <div className="text-accent font-bold text-lg">от {bank.rate}%</div>
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

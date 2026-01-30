import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { Calculator, ArrowLeft, Check } from 'lucide-react';

interface MortgageProgram {
  id: string;
  name: string;
  description: string;
  rate: number;
  maxRate: number;
  minDownPayment: number;
  maxTerm: number;
  maxAmount: number;
  badge?: string;
}

const programs: MortgageProgram[] = [
  {
    id: 'family',
    name: 'Семейная ипотека',
    description: 'Для семей с детьми, рождёнными с 2018 по 2023 год',
    rate: 6,
    maxRate: 6,
    minDownPayment: 20,
    maxTerm: 30,
    maxAmount: 12000000,
    badge: 'Популярная',
  },
  {
    id: 'subsidized',
    name: 'Льготная ипотека',
    description: 'Государственная программа с субсидированной ставкой',
    rate: 8,
    maxRate: 8,
    minDownPayment: 20,
    maxTerm: 30,
    maxAmount: 6000000,
  },
  {
    id: 'it',
    name: 'IT-ипотека',
    description: 'Для сотрудников аккредитованных IT-компаний',
    rate: 5,
    maxRate: 5,
    minDownPayment: 15,
    maxTerm: 30,
    maxAmount: 9000000,
    badge: 'Выгодная',
  },
  {
    id: 'military',
    name: 'Военная ипотека',
    description: 'Для участников накопительно-ипотечной системы',
    rate: 5.5,
    maxRate: 5.5,
    minDownPayment: 15,
    maxTerm: 25,
    maxAmount: 4100000,
  },
  {
    id: 'standard',
    name: 'Стандартная ипотека',
    description: 'Базовая программа для всех категорий заёмщиков',
    rate: 10.5,
    maxRate: 18,
    minDownPayment: 10,
    maxTerm: 30,
    maxAmount: 30000000,
  },
  {
    id: 'combo',
    name: 'Комбо-ипотека',
    description: 'Сниженная ставка на первые годы + стандартная далее',
    rate: 3.9,
    maxRate: 12,
    minDownPayment: 20,
    maxTerm: 30,
    maxAmount: 15000000,
    badge: 'Новая',
  },
];

export const IpotekaPage: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<MortgageProgram>(programs[0]);
  const [price, setPrice] = useState(5000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [years, setYears] = useState(20);

  const downPayment = Math.round(price * downPaymentPercent / 100);
  const rate = selectedProgram.rate;

  const handleProgramSelect = (program: MortgageProgram) => {
    setSelectedProgram(program);
    if (downPaymentPercent < program.minDownPayment) {
      setDownPaymentPercent(program.minDownPayment);
    }
    if (years > program.maxTerm) {
      setYears(program.maxTerm);
    }
    if (price - downPayment > program.maxAmount) {
      const newPrice = Math.min(price, Math.round(program.maxAmount / (1 - downPaymentPercent / 100)));
      setPrice(newPrice);
    }
  };

  const monthlyPayment = useMemo(() => {
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    if (monthlyRate === 0) return Math.round(principal / months);

    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return Math.round(payment);
  }, [price, downPayment, years, rate]);

  const totalPayment = monthlyPayment * years * 12;
  const loanAmount = price - downPayment;
  const overpayment = totalPayment - loanAmount;

  const formatNumber = (n: number) => n.toLocaleString('ru-RU');

  const pluralYears = (n: number) => {
    if (n % 10 === 1 && n % 100 !== 11) return 'год';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'года';
    return 'лет';
  };

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
            <span className="text-primary font-medium">Ипотечный калькулятор</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              Ипотечный калькулятор
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Выберите ипотечную программу и рассчитайте ежемесячный платёж. Параметры калькулятора
              автоматически подстроятся под выбранную программу.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programs filter */}
      <section className="py-10 px-4 md:px-8 bg-white border-b border-sand">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-xl md:text-2xl font-medium text-primary mb-6">Ипотечные программы</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program, idx) => {
              const isActive = selectedProgram.id === program.id;
              return (
                <Reveal key={program.id} delay={idx * 80}>
                  <button
                    onClick={() => handleProgramSelect(program)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 relative ${
                      isActive
                        ? 'border-accent bg-accent/5 shadow-md'
                        : 'border-sand bg-white hover:border-accent/40 hover:shadow-sm'
                    }`}
                  >
                    {program.badge && (
                      <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                        isActive ? 'bg-accent text-white' : 'bg-sand text-secondary'
                      }`}>
                        {program.badge}
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'border-accent bg-accent' : 'border-gray-300'
                      }`}>
                        {isActive && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="font-semibold text-primary mb-1">{program.name}</div>
                        <div className="text-sm text-secondary mb-3">{program.description}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                          <span className="text-accent font-bold">от {program.rate}%</span>
                          <span className="text-secondary">взнос от {program.minDownPayment}%</span>
                          <span className="text-secondary">до {program.maxTerm} {pluralYears(program.maxTerm)}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-7 h-7 text-accent" />
              <h2 className="text-2xl md:text-3xl font-medium text-primary">Расчёт по программе</h2>
            </div>
            <p className="text-secondary mb-8">
              <span className="font-medium text-accent">{selectedProgram.name}</span> — ставка от {selectedProgram.rate}%
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <Reveal>
              <div className="space-y-8 bg-white rounded-3xl p-8">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Стоимость квартиры
                  </label>
                  <div className="text-2xl font-bold text-primary mb-3">{formatNumber(price)} ₽</div>
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
                    Первоначальный взнос
                  </label>
                  <div className="text-2xl font-bold text-primary mb-1">{formatNumber(downPayment)} ₽</div>
                  <div className="text-sm text-secondary mb-3">{downPaymentPercent}% от стоимости</div>
                  <input
                    type="range"
                    min={selectedProgram.minDownPayment}
                    max={90}
                    step={1}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>{selectedProgram.minDownPayment}%</span>
                    <span>90%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Срок кредита
                  </label>
                  <div className="text-2xl font-bold text-primary mb-3">{years} {pluralYears(years)}</div>
                  <input
                    type="range"
                    min={1}
                    max={selectedProgram.maxTerm}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>1 год</span>
                    <span>{selectedProgram.maxTerm} {pluralYears(selectedProgram.maxTerm)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl border border-accent/20">
                  <div className="text-sm text-secondary">Ставка по программе</div>
                  <div className="text-2xl font-bold text-accent ml-auto">{rate}%</div>
                </div>
              </div>
            </Reveal>

            {/* Results */}
            <Reveal delay={200}>
              <div className="bg-primary rounded-3xl p-8 text-white h-fit lg:sticky lg:top-24">
                <div className="text-center mb-10">
                  <div className="text-sm text-white/50 mb-2 uppercase tracking-wider">Ежемесячный платёж</div>
                  <div className="text-5xl md:text-6xl font-bold text-accent">{formatNumber(monthlyPayment)} ₽</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/60">Программа</span>
                    <span className="font-semibold text-accent">{selectedProgram.name}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/60">Сумма кредита</span>
                    <span className="font-bold">{formatNumber(loanAmount)} ₽</span>
                  </div>
                  <div className="flex justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/60">Переплата за весь срок</span>
                    <span className="font-bold">{formatNumber(overpayment)} ₽</span>
                  </div>
                  <div className="flex justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/60">Общая сумма выплат</span>
                    <span className="font-bold">{formatNumber(totalPayment)} ₽</span>
                  </div>
                </div>

                <button className="w-full bg-accent text-white py-4 rounded-xl font-medium hover:bg-accent/90 transition-colors text-lg">
                  Оставить заявку
                </button>
                <p className="text-center text-white/30 text-xs mt-3">
                  Расчёт является предварительным и не является публичной офертой
                </p>
              </div>
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

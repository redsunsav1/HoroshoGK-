import React from 'react';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { MapPin, Clock, Banknote, ArrowRight } from 'lucide-react';

export const VacancyPage: React.FC = () => {
  const { vacancies } = useData();
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              Вакансии
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Присоединяйтесь к команде профессионалов. Мы ценим талант и создаем
              условия для роста каждого сотрудника.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Почему мы?</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Официальное трудоустройство',
              'Конкурентная зарплата',
              'Обучение за счет компании',
              'Дружный коллектив',
            ].map((benefit, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-6 bg-beige rounded-xl">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-accent font-bold">{idx + 1}</span>
                  </div>
                  <p className="font-medium text-primary">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies List */}
      <section className="py-16 px-4 md:px-8 bg-beige/50">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Открытые позиции</h2>
          </Reveal>

          <div className="space-y-4">
            {vacancies.map((vacancy, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-white rounded-2xl p-6 border border-sand hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-accent font-bold uppercase tracking-wider mb-1">
                        {vacancy.department}
                      </div>
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {vacancy.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-secondary">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" /> {vacancy.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" /> {vacancy.type}
                        </span>
                        <span className="flex items-center">
                          <Banknote className="w-4 h-4 mr-1" /> {vacancy.salary}
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center text-accent font-medium hover:underline shrink-0">
                      Откликнуться <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-4">
              Не нашли подходящую вакансию?
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">
              Отправьте нам резюме, и мы свяжемся с вами, когда появится подходящая позиция.
            </p>
            <a
              href="mailto:hr@horoshogk.ru"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-accent transition-colors"
            >
              hr@horoshogk.ru
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ContactModal } from '../../components/ui/ContactModal';
import { useData } from '../../context/DataContext';
import { ArrowLeft, CheckCircle, Calendar, Percent, Wallet } from 'lucide-react';

const featureIcons: Record<string, React.FC<{ className?: string }>> = { Percent, Calendar, CheckCircle };

const projectInstallments = [
  {
    project: 'ЖК «Манхэттен»',
    downPayment: 'от 5%',
    downPaymentNote: 'от 263 500 ₽',
    monthly: '50 000 ₽',
    deadline: '30.07.2027',
  },
  {
    project: 'ЖК «Харизма»',
    downPayment: 'от 5%',
    downPaymentNote: 'от 229 350 ₽',
    monthly: '50 000 ₽',
    deadline: '30.12.2028',
  },
];

export const RassrochkaPage: React.FC = () => {
  const { buyMethods } = useData();
  const method = buyMethods.find(m => m.slug === 'rassrochka');
  const [showContactModal, setShowContactModal] = useState(false);

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
            <span className="text-primary font-medium">{method?.title || 'Рассрочка'}</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              {method?.heroTitle || 'Рассрочка от застройщика'}
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              {method?.heroSubtitle || ''}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      {method && method.features.length > 0 && (
        <section className="py-12 px-4 md:px-8 bg-white">
          <div className="max-w-[1600px] mx-auto">
            <div className={`grid md:grid-cols-${Math.min(method.features.length, 3)} gap-8`}>
              {method.features.map((f, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="text-center p-8 bg-beige rounded-2xl">
                    <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">{f.title}</h3>
                    <p className="text-secondary">{f.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      {method && method.howItWorks.length > 0 && (
        <section className="py-12 px-4 md:px-8 bg-beige">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Как это работает</h2>
            </Reveal>
            <div className={`grid md:grid-cols-${Math.min(method.howItWorks.length, 4)} gap-6`}>
              {method.howItWorks.map((step, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="bg-white p-6 rounded-2xl">
                    <div className="text-4xl font-bold text-accent/20 mb-4">{String(step.step).padStart(2, '0')}</div>
                    <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-secondary text-sm">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Installments in current projects */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Рассрочка в действующих проектах</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {projectInstallments.map((item, idx) => (
              <Reveal key={item.project} delay={idx * 100}>
                <div className="h-full flex flex-col bg-beige rounded-2xl p-6 border border-sand">
                  <h3 className="text-2xl font-medium text-primary mb-2">{item.project}</h3>
                  <p className="text-secondary mb-6">
                    Рассрочка предоставляется застройщиком при покупке квартиры в {item.project}.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between gap-4 bg-white rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Percent className="w-5 h-5 text-accent shrink-0" />
                        <div>
                          <div className="text-sm text-secondary">Первоначальный взнос</div>
                          <div className="text-xs text-secondary">стоимости квартиры</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary whitespace-nowrap">{item.downPayment}</div>
                        <div className="text-xs text-secondary whitespace-nowrap">{item.downPaymentNote}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 bg-white rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-accent shrink-0" />
                        <div className="text-sm text-secondary">Ежемесячный платёж</div>
                      </div>
                      <div className="text-xl font-bold text-primary whitespace-nowrap">{item.monthly}</div>
                    </div>
                    <div className="flex items-center justify-between gap-4 bg-white rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-accent shrink-0" />
                        <div className="text-sm text-secondary">Срок рассрочки</div>
                      </div>
                      <div className="text-xl font-bold text-primary whitespace-nowrap">до {item.deadline}</div>
                    </div>
                  </div>

                  <p className="flex-1 text-secondary text-sm mb-6">
                    Оставшаяся стоимость квартиры подлежит оплате не позднее {item.deadline} за счёт собственных средств покупателя либо средств ипотечного кредита при условии его одобрения банком.
                  </p>

                  <p className="pt-4 border-t border-sand text-xs text-secondary leading-relaxed">
                    Условия действуют в отношении определённых квартир. Предложение ограничено. Покупка осуществляется по договору участия в долевом строительстве (ДДУ). Проектная декларация размещена на сайте наш.дом.рф. Не является публичной офертой.
                  </p>
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
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-4">{method?.ctaTitle || 'Оформить рассрочку'}</h2>
            <p className="text-secondary mb-8">{method?.ctaText || ''}</p>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-accent transition-colors"
            >
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

      {showContactModal && (
        <ContactModal
          onClose={() => setShowContactModal(false)}
          title="Заявка на рассрочку"
          context="Рассрочка от застройщика"
        />
      )}
    </>
  );
};

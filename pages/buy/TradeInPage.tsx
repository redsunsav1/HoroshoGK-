import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ContactModal } from '../../components/ui/ContactModal';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Home, Clock, Shield, CheckCircle } from 'lucide-react';

export const TradeInPage: React.FC = () => {
  const { buyMethods } = useData();
  const method = buyMethods.find(m => m.slug === 'trade-in');
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
            <span className="text-primary font-medium">{method?.title || 'Trade-in'}</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              {method?.heroTitle || 'Trade-in'}
            </h1>
            <p className="text-xl text-secondary font-light mb-8">
              {method?.heroSubtitle || ''}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors"
              >
                Оценить квартиру
              </button>
            </div>
          </Reveal>
          <Reveal direction="left">
            <img
              src="/images/placeholder-card.svg"
              alt="Trade-in"
              className="rounded-2xl shadow-xl"
            />
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      {method && method.features.length > 0 && (
        <section className="py-12 px-4 md:px-8 bg-white">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Преимущества Trade-in</h2>
            </Reveal>
            <div className={`grid md:grid-cols-${Math.min(method.features.length, 4)} gap-6`}>
              {method.features.map((f, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="p-6 bg-beige rounded-2xl text-center">
                    <CheckCircle className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
                    <p className="text-secondary text-sm">{f.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Steps */}
      {method && method.howItWorks.length > 0 && (
        <section className="py-12 px-4 md:px-8 bg-beige">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Как работает Trade-in</h2>
            </Reveal>
            <div className="space-y-4">
              {method.howItWorks.map((step, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="flex items-center gap-6 bg-white p-6 rounded-2xl">
                    <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                      <p className="text-secondary">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back */}
      <section className="py-8 px-4 md:px-8 bg-white border-t border-sand">
        <div className="max-w-[1600px] mx-auto">
          <Link to="/buy" className="inline-flex items-center text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Все способы покупки
          </Link>
        </div>
      </section>

      {showContactModal && (
        <ContactModal
          onClose={() => setShowContactModal(false)}
          title="Заявка на Trade-in"
          context="Trade-in: оценка квартиры"
        />
      )}
    </>
  );
};

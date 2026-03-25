import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ContactModal } from '../../components/ui/ContactModal';
import { useData } from '../../context/DataContext';
import { ArrowLeft, CheckCircle, Calendar, Percent } from 'lucide-react';

const featureIcons: Record<string, React.FC<{ className?: string }>> = { Percent, Calendar, CheckCircle };

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

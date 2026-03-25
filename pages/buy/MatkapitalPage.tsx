import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ContactModal } from '../../components/ui/ContactModal';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Baby, FileText, CheckCircle } from 'lucide-react';

export const MatkapitalPage: React.FC = () => {
  const { buyMethods } = useData();
  const method = buyMethods.find(m => m.slug === 'materinskiy-kapital');
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
            <span className="text-primary font-medium">{method?.title || 'Материнский капитал'}</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Baby className="w-12 h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                {method?.heroTitle || 'Материнский капитал'}
              </h1>
            </div>
            <p className="text-xl text-secondary font-light max-w-2xl">
              {method?.heroSubtitle || ''}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Features (info blocks) */}
      {method && method.features.length > 0 && (
        <section className="py-12 px-4 md:px-8 bg-white">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Reveal>
                <div className="bg-beige p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-primary mb-4">Размер маткапитала в 2026</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                      <span className="text-secondary">На первого ребенка</span>
                      <span className="font-bold text-primary text-xl">728 922 ₽</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                      <span className="text-secondary">На второго ребенка</span>
                      <span className="font-bold text-primary text-xl">963 244 ₽</span>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <h3 className="text-2xl font-bold text-primary mb-4">Преимущества</h3>
                <div className="space-y-4">
                  {method.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="text-primary font-medium">{f.title}</span>
                        {f.description && <p className="text-secondary text-sm">{f.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* How it works / Documents */}
      {method && method.howItWorks.length > 0 && (
        <section className="py-12 px-4 md:px-8 bg-beige">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-8 h-8 text-accent" />
                <h2 className="text-2xl md:text-3xl font-medium text-primary">Необходимые документы</h2>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {method.howItWorks.map((step, idx) => (
                <Reveal key={idx} delay={idx * 50}>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="text-primary">{step.title}</span>
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
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-4">{method?.ctaTitle || 'Получить консультацию'}</h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">{method?.ctaText || ''}</p>
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
          title="Консультация по маткапиталу"
          context="Материнский капитал: консультация"
        />
      )}
    </>
  );
};

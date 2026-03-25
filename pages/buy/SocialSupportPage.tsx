import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { ContactModal } from '../../components/ui/ContactModal';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Heart } from 'lucide-react';

export const SocialSupportPage: React.FC = () => {
  const { buyMethods } = useData();
  const method = buyMethods.find(m => m.slug === 'social-support');
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
            <span className="text-primary font-medium">{method?.title || 'Специальные условия'}</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Heart className="w-12 h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                {method?.heroTitle || 'Специальные условия'}
              </h1>
            </div>
            <p className="text-xl text-secondary font-light max-w-2xl">
              {method?.heroSubtitle || 'Специальные условия для льготных категорий граждан.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories (features) */}
      {method && method.features.length > 0 && (
        <section className="py-12 px-4 md:px-8 bg-white">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Льготные категории</h2>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {method.features.map((cat, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="bg-beige p-6 rounded-2xl h-full">
                    <h3 className="text-xl font-bold text-primary mb-2">{cat.title}</h3>
                    <p className="text-secondary">{cat.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-white text-center">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-medium mb-4">{method?.ctaTitle || 'Узнайте о своих льготах'}</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">{method?.ctaText || ''}</p>
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors"
              >
                Получить консультацию
              </button>
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

      {showContactModal && (
        <ContactModal
          onClose={() => setShowContactModal(false)}
          title="Консультация по льготам"
          context="Социальная поддержка: консультация"
        />
      )}
    </>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { ContactModal } from '../../components/ui/ContactModal';
import { ArrowLeft, Tag, X, Phone } from 'lucide-react';

export const AkciiPage: React.FC = () => {
  const { projects, promotions } = useData();
  const [selectedPromo, setSelectedPromo] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [callbackContext, setCallbackContext] = useState('');

  // Combine global promotions with project-specific promos
  const globalPromos = promotions.filter(p => p.active).map(promo => ({
    ...promo,
    project: null as any,
  }));

  const projectPromos = projects.flatMap(p => p.promos.map(promo => ({ ...promo, project: p })));

  const allPromos = [...globalPromos, ...projectPromos];

  const openCallback = (title: string) => {
    setCallbackContext(`Акция: ${title}`);
    setShowContactModal(true);
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
            <span className="text-primary font-medium">Акции</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Tag className="w-12 h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                Акции и спецпредложения
              </h1>
            </div>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Выгодные предложения на квартиры в наших жилых комплексах.
              Успейте воспользоваться!
            </p>
          </Reveal>
        </div>
      </section>

      {/* Promos Grid */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          {allPromos.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {allPromos.map((promo, idx) => (
                <Reveal key={promo.id} delay={idx * 100}>
                  <div
                    className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedPromo(promo)}
                  >
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      {promo.discount && (
                        <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                          {promo.discount}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-2">{promo.title}</h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-secondary text-lg">В данный момент акций нет</p>
            </div>
          )}
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

      {/* Promo Popup */}
      {selectedPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedPromo(null)}>
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPromo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {(selectedPromo.popupImage || selectedPromo.image) && (
              <img
                src={selectedPromo.popupImage || selectedPromo.image}
                alt={selectedPromo.title}
                className="w-full rounded-t-3xl"
              />
            )}
            <div className="p-8">
              {selectedPromo.discount && (
                <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  {selectedPromo.discount}
                </span>
              )}
              <h2 className="text-2xl font-bold text-primary mb-4">{selectedPromo.title}</h2>
              <div className="text-secondary mb-6 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedPromo.description }} />
              {selectedPromo.project && (
                <Link
                  to={`/projects/${selectedPromo.project.slug}`}
                  className="text-accent font-medium hover:underline mb-6 block"
                >
                  {selectedPromo.project.name} →
                </Link>
              )}
              {!selectedPromo.project && selectedPromo.projectIds?.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedPromo.projectIds.map((pid: string) => {
                    const proj = projects.find((p: any) => p.id === pid);
                    return proj ? (
                      <Link key={pid} to={`/projects/${proj.slug}`} className="text-accent font-medium hover:underline">
                        {proj.name} →
                      </Link>
                    ) : null;
                  })}
                </div>
              )}
              <button
                onClick={() => openCallback(selectedPromo.title)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-medium hover:bg-accent transition-colors"
              >
                <Phone className="w-5 h-5" /> Запросить обратный звонок
              </button>
            </div>
          </div>
        </div>
      )}

      {showContactModal && (
        <ContactModal
          onClose={() => setShowContactModal(false)}
          title="Обратный звонок"
          context={callbackContext}
        />
      )}
    </>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { TrendingUp, FileText, Download, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const InvestorsPage: React.FC = () => {
  const { investorsContent } = useData();

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-12 h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                {investorsContent.heroTitle}
              </h1>
            </div>
            <p className="text-xl text-secondary font-light max-w-2xl">
              {investorsContent.heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {investorsContent.stats.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="text-center p-6 bg-beige rounded-2xl">
                  <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-secondary">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-medium text-primary mb-6">
                {investorsContent.aboutTitle}
              </h2>
              <div className="space-y-4 text-secondary">
                <p>{investorsContent.aboutText1}</p>
                <p>{investorsContent.aboutText2}</p>
              </div>
              <div className="flex gap-4 mt-8">
                <Link
                  to="/about"
                  className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors"
                >
                  О компании
                </Link>
                <Link
                  to="/contacts"
                  className="border border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Связаться
                </Link>
              </div>
            </Reveal>
            <Reveal direction="left">
              <img
                src={investorsContent.aboutImage || '/images/placeholder-card.svg'}
                alt="Инвесторам"
                className="rounded-2xl shadow-xl"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Documents */}
      {investorsContent.documents.length > 0 && (
        <section className="py-12 px-4 md:px-8 bg-white">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-8 h-8 text-accent" />
                <h2 className="text-2xl md:text-3xl font-medium text-primary">Документы</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4">
              {investorsContent.documents.map((doc, idx) => (
                <Reveal key={doc.id} delay={idx * 100}>
                  <a
                    href={doc.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 bg-beige rounded-xl hover:bg-sand transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-primary group-hover:text-accent transition-colors">
                          {doc.name}
                        </div>
                        <div className="text-sm text-secondary">{doc.type} · {doc.size}</div>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 px-4 md:px-8 bg-primary text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium mb-4">{investorsContent.ctaTitle}</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {investorsContent.ctaText}
            </p>
            <a
              href={`mailto:${investorsContent.ctaEmail}`}
              className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors"
            >
              {investorsContent.ctaEmail} <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
};

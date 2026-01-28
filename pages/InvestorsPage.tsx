import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { TrendingUp, Building, Users, FileText, Download, ArrowRight } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Лет на рынке' },
  { value: '12', label: 'Реализованных проектов' },
  { value: '5 000+', label: 'Сданных квартир' },
  { value: '98%', label: 'Сделок вовремя' },
];

const documents = [
  { name: 'Годовой отчет 2023', size: '2.4 MB', type: 'PDF' },
  { name: 'Финансовая отчетность Q4 2023', size: '1.8 MB', type: 'PDF' },
  { name: 'Презентация для инвесторов', size: '5.2 MB', type: 'PDF' },
  { name: 'Устав компании', size: '0.8 MB', type: 'PDF' },
];

export const InvestorsPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-12 h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary">
                Инвесторам
              </h1>
            </div>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Информация для инвесторов и партнеров. Финансовые показатели,
              отчетность и перспективы развития компании.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
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
                Стабильный рост и развитие
              </h2>
              <div className="space-y-4 text-secondary">
                <p>
                  ГК «Хорошо!» демонстрирует устойчивый рост на протяжении последних 15 лет.
                  Компания занимает лидирующие позиции на региональном рынке жилой недвижимости.
                </p>
                <p>
                  Наша стратегия направлена на качественное строительство и долгосрочные
                  отношения с клиентами и партнерами.
                </p>
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
                src="https://picsum.photos/seed/investors/600/400"
                alt="Инвесторам"
                className="rounded-2xl shadow-xl"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-accent" />
              <h2 className="text-2xl md:text-3xl font-medium text-primary">Документы</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <a
                  href="#"
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

      {/* CTA */}
      <section className="py-12 px-4 md:px-8 bg-primary text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium mb-4">Хотите стать партнером?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Свяжитесь с нашим отделом по работе с инвесторами
            </p>
            <a
              href="mailto:investors@horoshogk.ru"
              className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors"
            >
              investors@horoshogk.ru <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
};

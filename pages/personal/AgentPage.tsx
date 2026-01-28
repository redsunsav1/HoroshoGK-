import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { Briefcase, ArrowLeft } from 'lucide-react';

export const AgentPage: React.FC = () => {
  return (
    <>
      <section className="py-16 px-4 md:px-8 bg-beige min-h-[60vh] flex items-center">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <Briefcase className="w-16 h-16 text-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              Агентский кабинет
            </h1>
            <p className="text-xl text-secondary font-light mb-8">
              Раздел для риелторов и агентов по недвижимости.
              Управляйте сделками, получайте комиссию и отслеживайте статистику.
            </p>
            <p className="text-secondary mb-8">
              Для доступа к агентскому кабинету необходимо пройти авторизацию.
            </p>
            <Link
              to="/personal"
              className="inline-flex items-center text-accent font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Вернуться к авторизации
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { User, ArrowLeft } from 'lucide-react';

export const ClientPage: React.FC = () => {
  return (
    <>
      <section className="py-16 px-4 md:px-8 bg-beige min-h-[60vh] flex items-center">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <User className="w-16 h-16 text-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              Кабинет клиента
            </h1>
            <p className="text-xl text-secondary font-light mb-8">
              Личный кабинет покупателя недвижимости.
              Отслеживайте статус сделки, ход строительства и документы.
            </p>
            <p className="text-secondary mb-8">
              Для доступа к кабинету клиента необходимо пройти авторизацию.
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

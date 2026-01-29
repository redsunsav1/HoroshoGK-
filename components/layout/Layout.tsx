import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SEO } from '../SEO';

const seoData: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Главная',
    description: 'ГК «Хорошо» — застройщик в Астрахани. Квартиры в новостройках от 3.9 млн ₽. Ипотека от 0.1%, рассрочка 0%, Trade-in.',
  },
  '/projects': {
    title: 'Проекты',
    description: 'Жилые комплексы от ГК «Хорошо» в Астрахани. ЖК Бруклин, ЖК Бабайка, ЖК Манхэттен и другие проекты.',
  },
  '/about': {
    title: 'О компании',
    description: 'ГК «Хорошо» — 15+ лет на рынке, 5000+ ключей выдано. Надёжный застройщик в Астрахани.',
  },
  '/about/team': {
    title: 'Команда',
    description: 'Команда профессионалов ГК «Хорошо». Более 150 специалистов в области строительства и девелопмента.',
  },
  '/about/vacancy': {
    title: 'Вакансии',
    description: 'Вакансии в ГК «Хорошо». Присоединяйтесь к команде лидеров строительного рынка Астрахани.',
  },
  '/about/achievements': {
    title: 'Достижения',
    description: 'Награды и реализованные проекты ГК «Хорошо». 12 завершённых проектов, множество наград.',
  },
  '/buy': {
    title: 'Способы покупки',
    description: 'Купить квартиру от ГК «Хорошо»: ипотека от 0.1%, рассрочка 0%, Trade-in, маткапитал, акции.',
  },
  '/buy/ipoteka': {
    title: 'Ипотека',
    description: 'Ипотека на квартиры ГК «Хорошо» от 5.9%. Калькулятор ипотеки, банки-партнёры, одобрение за 1 день.',
  },
  '/buy/rassrochka': {
    title: 'Рассрочка',
    description: 'Рассрочка от застройщика ГК «Хорошо» — 0% переплаты, первый взнос от 10%, до 24 месяцев.',
  },
  '/buy/trade-in': {
    title: 'Trade-in',
    description: 'Обмен старой квартиры на новую в ГК «Хорошо». Честная оценка, сделка за 1-2 недели.',
  },
  '/buy/materinskiy-kapital': {
    title: 'Материнский капитал',
    description: 'Покупка квартиры с материнским капиталом в ГК «Хорошо». Помощь в оформлении документов.',
  },
  '/buy/social-support': {
    title: 'Социальная поддержка',
    description: 'Льготные условия покупки квартиры для молодых семей, многодетных, медработников и педагогов.',
  },
  '/buy/akcii': {
    title: 'Акции',
    description: 'Актуальные акции и скидки на квартиры от ГК «Хорошо». Спецпредложения на новостройки.',
  },
  '/buy/svo': {
    title: 'Скидка участникам СВО',
    description: 'Скидки до 500 000 ₽ на квартиры для участников СВО и членов их семей.',
  },
  '/news': {
    title: 'Новости',
    description: 'Новости ГК «Хорошо»: ход строительства, акции, события компании.',
  },
  '/contacts': {
    title: 'Контакты',
    description: 'Контакты и офисы продаж ГК «Хорошо» в Астрахани. Телефон, адрес, email.',
  },
  '/faq': {
    title: 'Частые вопросы',
    description: 'Ответы на популярные вопросы о покупке квартиры, ипотеке, строительстве в ГК «Хорошо».',
  },
  '/investors': {
    title: 'Инвесторам',
    description: 'Информация для инвесторов ГК «Хорошо». Финансовые показатели, отчётность, партнёрство.',
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const seo = seoData[location.pathname] || {
    title: 'ГК Хорошо',
    description: 'Группа Компаний «Хорошо» — застройщик в Астрахани.',
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-primary">
      <SEO title={seo.title} description={seo.description} />
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

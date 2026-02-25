import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SEO } from '../SEO';
import { useData } from '../../context/DataContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { getPageSettings } = useData();
  const settings = getPageSettings(location.pathname);

  const seo = {
    title: settings?.title || 'ГК Хорошо',
    description: settings?.description || 'Группа Компаний «Хорошо» — застройщик в Астрахани.',
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

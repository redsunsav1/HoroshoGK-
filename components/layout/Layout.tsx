import React, { useEffect } from 'react';
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
  const { getPageSettings, siteSettings } = useData();
  const settings = getPageSettings(location.pathname);

  const seo = {
    title: settings?.title || 'ГК Хорошо',
    description: settings?.description || 'Группа Компаний «Хорошо» — застройщик в Астрахани.',
  };

  // Динамическое обновление фавикона
  useEffect(() => {
    if (siteSettings.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = siteSettings.faviconUrl;
    }
  }, [siteSettings.faviconUrl]);

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

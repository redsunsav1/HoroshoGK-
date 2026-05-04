import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SEO } from '../SEO';
import { KeyHandoverButton } from '../ui/KeyHandoverButton';
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

  // Если фавикон в настройках изменился — пересоздаём <link>'и с cache-busting'ом,
  // чтобы браузер запросил его заново. Серверный endpoint /api/favicon отдаёт актуальный файл.
  useEffect(() => {
    if (!siteSettings.faviconUrl) return;
    const oldLinks = document.querySelectorAll("link[rel*='icon']");
    oldLinks.forEach(l => l.parentNode?.removeChild(l));

    // Cache-busting: используем хеш URL фавикона как версию
    const versionTag = encodeURIComponent(siteSettings.faviconUrl).slice(-12);
    const href = `/api/favicon?v=${versionTag}`;

    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = href;
    document.head.appendChild(link);

    const shortcut = document.createElement('link');
    shortcut.rel = 'shortcut icon';
    shortcut.href = href;
    document.head.appendChild(shortcut);
  }, [siteSettings.faviconUrl]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-primary">
      <SEO title={seo.title} description={seo.description} />
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <KeyHandoverButton />
    </div>
  );
};

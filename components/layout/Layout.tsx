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

  // Динамическое обновление фавикона
  useEffect(() => {
    if (!siteSettings.faviconUrl) return;
    // Удаляем все старые link[rel*='icon'] и создаём свежие, чтобы браузер не использовал кешированный фавикон
    const oldLinks = document.querySelectorAll("link[rel*='icon']");
    oldLinks.forEach(l => l.parentNode?.removeChild(l));

    // Определяем mime-type по расширению файла
    const url = siteSettings.faviconUrl;
    const ext = url.split('.').pop()?.toLowerCase() || '';
    const mimeMap: Record<string, string> = {
      svg: 'image/svg+xml',
      png: 'image/png',
      ico: 'image/x-icon',
      webp: 'image/webp',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
    };
    const mime = mimeMap[ext] || 'image/png';

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = mime;
    link.href = url;
    document.head.appendChild(link);

    const shortcut = document.createElement('link');
    shortcut.rel = 'shortcut icon';
    shortcut.type = mime;
    shortcut.href = url;
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

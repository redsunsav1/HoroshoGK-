import React, { useRef, useState } from 'react';
import { Key } from 'lucide-react';

// Floating button "Записаться на выдачу ключей" — открывает виджет iflat.io
const IFLAT_WIDGET_ID = '66b4649e69e71';
const IFLAT_LOADER_SRC = 'https://widget.iflat.io/static/js/widget_loader.js';

declare global {
  interface Window {
    iflatWidget?: {
      init: (cfg: { id: string; isEmbed: boolean }) => void;
    };
  }
}

export const KeyHandoverButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const initializedRef = useRef(false);
  const loadingRef = useRef(false);

  const ensureLoaded = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Already loaded
      if (window.iflatWidget) return resolve();
      // Currently loading — wait
      if (loadingRef.current) {
        const interval = setInterval(() => {
          if (window.iflatWidget) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
        setTimeout(() => { clearInterval(interval); reject(new Error('iflat timeout')); }, 8000);
        return;
      }
      // Inject script
      loadingRef.current = true;
      const existing = document.querySelector(`script[src="${IFLAT_LOADER_SRC}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('iflat load error')));
        return;
      }
      const script = document.createElement('script');
      script.src = IFLAT_LOADER_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('iflat load error'));
      document.head.appendChild(script);
    });
  };

  const handleClick = async () => {
    try {
      await ensureLoaded();
      if (window.iflatWidget && !initializedRef.current) {
        window.iflatWidget.init({ id: IFLAT_WIDGET_ID, isEmbed: false });
        initializedRef.current = true;
      } else if (window.iflatWidget) {
        // Re-init to re-open if widget was closed
        window.iflatWidget.init({ id: IFLAT_WIDGET_ID, isEmbed: false });
      }
    } catch (err) {
      console.error('Не удалось загрузить виджет iflat:', err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Caption above button */}
      <div
        className={`bg-white text-primary text-xs font-bold uppercase tracking-wide rounded-xl px-3 py-2 shadow-lg leading-tight text-center transition-all duration-300 ${
          hovered ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-0'
        }`}
        style={{ minWidth: 160 }}
      >
        Записаться на<br />выдачу ключей
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Записаться на выдачу ключей"
        className="w-14 h-14 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-500 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Key className="w-6 h-6" />
      </button>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { Key } from 'lucide-react';

// Floating button "Записаться на выдачу ключей" — открывает виджет iflat.io
// Стратегия:
// 1. Скрипт подгружается при маунте, виджет инициализируется
// 2. iflat создаёт свой плавающий круг — мы его прячем CSS'ом и сохраняем ссылку
// 3. По клику нашей кнопки программно кликаем по скрытому кругу → открывается их попап
const IFLAT_WIDGET_ID = '66b4649e69e71';
const IFLAT_LOADER_SRC = 'https://widget.iflat.io/static/js/widget_loader.js';

declare global {
  interface Window {
    iflatWidget?: {
      init: (cfg: { id: string; isEmbed: boolean }) => void;
    };
  }
}

const HIDE_STYLE_ID = 'iflat-hide-style';

// Глобальное правило: прячем их floating-круг (но он остаётся в DOM и кликабелен через .click())
const ensureHideStyle = () => {
  if (document.getElementById(HIDE_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = HIDE_STYLE_ID;
  // Скрываем все элементы виджета iflat кроме popup'a (iframe и его обёртки).
  // Селектор подбираем по нескольким признакам, чтобы попасть в их floating button.
  style.textContent = `
    /* iflat: скрыть только их fixed-плашки, кроме iframe-обёрток */
    [id^="iflat-widget"]:not([id*="iframe"]):not([id*="popup"]):not([id*="modal"]) {
      visibility: hidden !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);
};

export const KeyHandoverButton: React.FC = () => {
  const hiddenWidgetRef = useRef<HTMLElement | null>(null);
  const initializedRef = useRef(false);

  // Подгрузка + инициализация виджета на маунте
  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;

    const isLikelyFloatingButton = (el: Element): boolean => {
      if (!(el instanceof HTMLElement)) return false;
      // Игнорируем нашу собственную кнопку
      if (el.closest('[data-key-handover-button]')) return false;
      // Игнорируем iframe-оболочки виджета (это сам popup — пусть открывается)
      if (el.querySelector('iframe')) return false;
      const style = window.getComputedStyle(el);
      if (style.position !== 'fixed') return false;
      // Размер — у floating-кнопки обычно 50–120px. У popup-обёртки обычно крупнее.
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      if (rect.width > 200 || rect.height > 200) return false;
      return true;
    };

    const processNode = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      // Проверяем сам узел и его потомков
      const candidates: HTMLElement[] = [];
      if (isLikelyFloatingButton(node)) candidates.push(node);
      node.querySelectorAll?.('div').forEach(el => {
        if (isLikelyFloatingButton(el)) candidates.push(el as HTMLElement);
      });
      candidates.forEach(el => {
        if (hiddenWidgetRef.current) return;
        // Не трогаем нашу кнопку
        if (el.closest('[data-key-handover-button]')) return;
        // Не трогаем iframe-popup
        if (el.tagName === 'IFRAME' || el.querySelector('iframe')) return;
        hiddenWidgetRef.current = el;
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    };

    const start = async () => {
      try {
        ensureHideStyle();
        // Подключаем скрипт
        if (!document.querySelector(`script[src="${IFLAT_LOADER_SRC}"]`)) {
          const script = document.createElement('script');
          script.src = IFLAT_LOADER_SRC;
          script.async = true;
          document.head.appendChild(script);
        }
        // Ждём пока window.iflatWidget появится
        const start = Date.now();
        while (!window.iflatWidget && Date.now() - start < 10000) {
          await new Promise(r => setTimeout(r, 100));
          if (cancelled) return;
        }
        if (!window.iflatWidget) return;
        if (!initializedRef.current) {
          window.iflatWidget.init({ id: IFLAT_WIDGET_ID, isEmbed: false });
          initializedRef.current = true;
        }
        // Запускаем наблюдатель за DOM, чтобы поймать их floating-кнопку
        observer = new MutationObserver(mutations => {
          mutations.forEach(m => m.addedNodes.forEach(processNode));
        });
        observer.observe(document.body, { childList: true, subtree: true });
        // Также сразу проверяем уже существующие узлы
        document.body.querySelectorAll('div').forEach(el => processNode(el));
      } catch (err) {
        console.error('iflat init error:', err);
      }
    };

    start();

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  const handleClick = () => {
    // Кликаем по скрытому floating-кругу iflat — это откроет их popup
    if (hiddenWidgetRef.current) {
      // Временно убираем pointer-events:none чтобы клик дошёл, но visibility оставляем hidden
      const el = hiddenWidgetRef.current;
      el.click();
      return;
    }
    // Fallback: если не нашли их кнопку — пытаемся ре-инициализировать виджет
    if (window.iflatWidget) {
      window.iflatWidget.init({ id: IFLAT_WIDGET_ID, isEmbed: false });
    }
  };

  return (
    <div
      data-key-handover-button
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
    >
      {/* Caption above button */}
      <div
        className="bg-white text-primary text-xs font-bold uppercase tracking-wide rounded-xl px-3 py-2 shadow-lg leading-tight text-center"
        style={{ minWidth: 160 }}
      >
        Записаться на<br />выдачу ключей
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        aria-label="Записаться на выдачу ключей"
        className="w-14 h-14 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-500 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Key className="w-6 h-6" />
      </button>
    </div>
  );
};

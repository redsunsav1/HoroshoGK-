import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-sand">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo-white.svg" alt="ГК Хорошо" className="h-10 w-auto" />
            </Link>
            <p className="text-white/60 font-light mb-6 max-w-sm">
              Создаем пространства, вдохновленные эстетикой, комфортом и теплом.
              Дома, в которые хочется возвращаться.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/40 uppercase tracking-wider mb-4 text-xs font-bold">Компания</h4>
            <nav className="space-y-3">
              <Link to="/about" className="block text-white/80 hover:text-accent transition-colors">О компании</Link>
              <Link to="/about/team" className="block text-white/80 hover:text-accent transition-colors">Команда</Link>
              <Link to="/about/vacancy" className="block text-white/80 hover:text-accent transition-colors">Вакансии</Link>
              <Link to="/news" className="block text-white/80 hover:text-accent transition-colors">Новости</Link>
              <Link to="/investors" className="block text-white/80 hover:text-accent transition-colors">Инвесторам</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-white/40 uppercase tracking-wider mb-4 text-xs font-bold">Покупателям</h4>
            <nav className="space-y-3">
              <Link to="/projects" className="block text-white/80 hover:text-accent transition-colors">Проекты</Link>
              <Link to="/buy" className="block text-white/80 hover:text-accent transition-colors">Способы покупки</Link>
              <Link to="/buy/ipoteka" className="block text-white/80 hover:text-accent transition-colors">Ипотека</Link>
              <Link to="/faq" className="block text-white/80 hover:text-accent transition-colors">FAQ</Link>
              <Link to="/contacts" className="block text-white/80 hover:text-accent transition-colors">Контакты</Link>
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white/40 uppercase tracking-wider mb-4 text-xs font-bold">Контакты</h4>
            <div className="space-y-4">
              <a href="tel:+78000000000" className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                8 800 000-00-00
              </a>
              <a href="mailto:info@horoshogk.ru" className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                info@horoshogk.ru
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>г. Астрахань, ул. Теплая, д. 10, офис 305</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-white/40 text-sm">
          <p>&copy; 2024 ГК «Хорошо!». Все права защищены.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Проектные декларации</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

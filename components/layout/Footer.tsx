import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

const VkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.362 1.26 2.174 1.817.613.42 1.08.328 1.08.328l2.172-.03s1.136-.07.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.264-1.183-1.06.462-3.246.998-1.33 1.398-2.142 1.273-2.49-.119-.332-.856-.244-.856-.244l-2.454.015s-.182-.025-.317.056c-.133.08-.218.264-.218.264s-.392 1.044-.915 1.932c-1.104 1.872-1.545 1.972-1.725 1.856-.42-.272-.315-1.09-.315-1.67 0-1.813.275-2.57-.536-2.766-.269-.065-.467-.108-1.155-.115-.882-.009-1.628.003-2.05.21-.28.137-.497.443-.365.46.163.022.533.1.729.365.253.343.244 1.113.244 1.113s.145 2.133-.34 2.397c-.332.182-.788-.189-1.767-1.888-.502-.87-.88-1.832-.88-1.832s-.073-.18-.203-.276c-.158-.117-.378-.154-.378-.154l-2.332.015s-.35.01-.479.163c-.114.135-.01.414-.01.414s1.839 4.304 3.924 6.471c1.912 1.988 4.085 1.857 4.085 1.857h.985z"/></svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
);

const MaxIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 14.4L12 13.6l-3.2 2.8.8-3.8L6 9.6l3.9-.2L12 6l2.1 3.4 3.9.2-3.6 3z"/></svg>
);

export const Footer: React.FC = () => {
  const { siteSettings } = useData();

  return (
    <footer className="bg-primary text-sand">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center mb-6">
              {siteSettings.logoUrl ? (
                <img src={siteSettings.logoUrl} alt={siteSettings.companyName || 'Логотип'} className="h-14 w-auto object-contain brightness-0 invert" />
              ) : (
                <svg className="h-12 w-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M56 2L74 2L22 78H8V96H78V78H38L56 2ZM36 46L56 26V66L36 46Z" fill="#ffffff"/>
                  <polygon points="68,6 88,33 68,58 54,33" fill="#b5935a"/>
                </svg>
              )}
            </Link>
            <p className="text-white/60 font-light mb-6 max-w-sm">
              Создаем пространства, вдохновленные эстетикой, комфортом и теплом.
              Дома, в которые хочется возвращаться.
            </p>
            <div className="flex gap-4">
              <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-primary transition-colors" title="ВКонтакте">
                <VkIcon className="w-5 h-5" />
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-primary transition-colors" title="Телеграм">
                <TelegramIcon className="w-5 h-5" />
              </a>
              <a href="https://max.ru/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-primary transition-colors" title="MAX">
                <MaxIcon className="w-5 h-5" />
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
              <Link to="/buy/ipoteka" className="block text-white/80 hover:text-accent transition-colors">Ипотечный калькулятор</Link>
              <Link to="/faq" className="block text-white/80 hover:text-accent transition-colors">FAQ</Link>
              <Link to="/contacts" className="block text-white/80 hover:text-accent transition-colors">Контакты</Link>
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white/40 uppercase tracking-wider mb-4 text-xs font-bold">Контакты</h4>
            <div className="space-y-4">
              <a href={`tel:${siteSettings.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                {siteSettings.phone}
              </a>
              <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                {siteSettings.email}
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>{siteSettings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} ГК «{siteSettings.companyName}». Все права защищены.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Проектные декларации</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

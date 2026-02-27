import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    label: 'О компании',
    href: '/about',
    children: [
      { label: 'О нас', href: '/about' },
      { label: 'Команда', href: '/about/team' },
      { label: 'Вакансии', href: '/about/vacancy' },
      { label: 'Достижения', href: '/about/achievements' },
    ],
  },
  {
    label: 'Проекты',
    href: '/projects',
  },
  {
    label: 'Способы покупки',
    href: '/buy',
    children: [
      { label: 'Все способы', href: '/buy' },
      { label: 'Ипотечный калькулятор', href: '/buy/ipoteka' },
      { label: 'Рассрочка', href: '/buy/rassrochka' },
      { label: 'Trade-in', href: '/buy/trade-in' },
      { label: 'Маткапитал', href: '/buy/materinskiy-kapital' },
      { label: 'Соц. поддержка', href: '/buy/social-support' },
      { label: 'Акции', href: '/buy/akcii' },
    ],
  },
  {
    label: 'Новости',
    href: '/news',
  },
  {
    label: 'Контакты',
    href: '/contacts',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { siteSettings } = useData();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-sand">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            {siteSettings.logoUrl ? (
              <img src={siteSettings.logoUrl} alt={siteSettings.companyName || 'Логотип'} className="h-14 w-auto object-contain" />
            ) : (
              <svg className="h-12 w-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M56 2L74 2L22 78H8V96H78V78H38L56 2ZM36 46L56 26V66L36 46Z" fill="#1a1a1a"/>
                <polygon points="68,6 88,33 68,58 54,33" fill="#b5935a"/>
              </svg>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive(item.href)
                      ? 'text-accent bg-accent/5'
                      : 'text-primary hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.href && (
                  <div className="absolute top-full left-0 pt-2 min-w-[200px]">
                  <div className="bg-white rounded-xl shadow-xl border border-sand py-2 animate-fade-in-up">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          location.pathname === child.href
                            ? 'text-accent bg-accent/5'
                            : 'text-primary hover:text-accent hover:bg-accent/5'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteSettings.phone.replace(/[^\d+]/g, '')}`}
              className="hidden md:flex items-center font-bold text-primary hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-accent" />
              {siteSettings.phone}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-primary"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-sand animate-fade-in-up">
          <nav className="max-w-[1600px] mx-auto px-4 py-4">
            {navigation.map((item) => (
              <div key={item.href} className="border-b border-sand last:border-0">
                <Link
                  to={item.href}
                  onClick={() => !item.children && setMobileMenuOpen(false)}
                  className={`block py-3 font-medium ${
                    isActive(item.href) ? 'text-accent' : 'text-primary'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 text-sm ${
                          location.pathname === child.href ? 'text-accent' : 'text-secondary'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

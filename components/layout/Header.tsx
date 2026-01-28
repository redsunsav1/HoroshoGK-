import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

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
      { label: 'Ипотека', href: '/buy/ipoteka' },
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

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-sand">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-tr-xl rounded-bl-xl" />
            <span className="font-bold text-xl tracking-tight uppercase text-primary">
              Хорошо!<span className="text-secondary font-light ml-1">ГК</span>
            </span>
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
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-sand py-2 min-w-[200px] animate-fade-in-up">
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
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+78000000000"
              className="hidden md:flex items-center font-bold text-primary hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-accent" />
              8 800 000-00-00
            </a>
            <Link
              to="/personal"
              className="hidden sm:block text-xs font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors"
            >
              Личный кабинет
            </Link>
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
            <Link
              to="/personal"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 font-medium text-primary"
            >
              Личный кабинет
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

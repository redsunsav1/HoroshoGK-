import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/ui/Reveal';
import { User, Briefcase, Lock, Mail, Phone } from 'lucide-react';

export const PersonalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
              Личный кабинет
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Управляйте своими сделками, отслеживайте ход строительства и получайте
              персональные предложения.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Login/Register */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[500px] mx-auto">
          <Reveal>
            {/* Tabs */}
            <div className="flex mb-8 bg-beige rounded-xl p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'login' ? 'bg-white text-primary shadow' : 'text-secondary'
                }`}
              >
                Вход
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'register' ? 'bg-white text-primary shadow' : 'text-secondary'
                }`}
              >
                Регистрация
              </button>
            </div>

            {activeTab === 'login' ? (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email или телефон</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Пароль</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input
                      type="password"
                      className="w-full pl-12 pr-4 py-4 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-sm text-secondary">
                    <input type="checkbox" />
                    Запомнить меня
                  </label>
                  <a href="#" className="text-sm text-accent hover:underline">Забыли пароль?</a>
                </div>
                <button className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-accent transition-colors">
                  Войти
                </button>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Имя</label>
                  <input
                    type="text"
                    className="w-full px-4 py-4 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Телефон</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input
                      type="tel"
                      className="w-full pl-12 pr-4 py-4 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-4 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Пароль</label>
                  <input
                    type="password"
                    className="w-full px-4 py-4 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                    placeholder="Минимум 8 символов"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-sm text-secondary">
                    Я согласен на обработку персональных данных и принимаю{' '}
                    <a href="#" className="text-accent hover:underline">условия использования</a>
                  </span>
                </div>
                <button className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-accent transition-colors">
                  Зарегистрироваться
                </button>
              </form>
            )}
          </Reveal>

          {/* Role Links */}
          <Reveal delay={200}>
            <div className="mt-12 pt-8 border-t border-sand">
              <p className="text-center text-secondary mb-6">Выберите тип кабинета:</p>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/personal/client"
                  className="flex flex-col items-center p-6 bg-beige rounded-xl hover:bg-sand transition-colors"
                >
                  <User className="w-8 h-8 text-accent mb-2" />
                  <span className="font-medium text-primary">Клиент</span>
                </Link>
                <Link
                  to="/personal/agent"
                  className="flex flex-col items-center p-6 bg-beige rounded-xl hover:bg-sand transition-colors"
                >
                  <Briefcase className="w-8 h-8 text-accent mb-2" />
                  <span className="font-medium text-primary">Агент</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

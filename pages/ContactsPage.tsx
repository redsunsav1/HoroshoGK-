import React from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const offices = [
  {
    name: 'Главный офис',
    address: 'г. Астрахань, ул. Теплая, д. 10, офис 305',
    phone: '8 800 000-00-00',
    email: 'info@horoshogk.ru',
    hours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-17:00',
  },
  {
    name: 'Офис продаж ЖК «Бруклин»',
    address: 'г. Астрахань, ул. Бруклинская, д. 1',
    phone: '8 800 000-00-01',
    email: 'brooklyn@horoshogk.ru',
    hours: 'Ежедневно: 10:00-20:00',
  },
];

export const ContactsPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              Контакты
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Offices */}
            <div>
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Наши офисы</h2>
              </Reveal>
              <div className="space-y-6">
                {offices.map((office, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div className="bg-beige rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-primary mb-4">{office.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-secondary">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-accent shrink-0" />
                          <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-primary hover:text-accent transition-colors">
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-accent shrink-0" />
                          <a href={`mailto:${office.email}`} className="text-primary hover:text-accent transition-colors">
                            {office.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-accent shrink-0" />
                          <span className="text-secondary">{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Quick Contacts */}
              <Reveal delay={300}>
                <div className="mt-8 p-6 bg-primary rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Горячая линия</h3>
                  <a href="tel:88000000000" className="text-3xl font-bold hover:text-accent transition-colors">
                    8 800 000-00-00
                  </a>
                  <p className="text-white/70 mt-2">Бесплатный звонок по России</p>
                </div>
              </Reveal>
            </div>

            {/* Contact Form */}
            <div>
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Написать нам</h2>
              </Reveal>
              <Reveal delay={100}>
                <form className="bg-beige rounded-2xl p-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Имя *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Телефон *</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                        placeholder="+7 (___) ___-__-__"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Сообщение</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Ваш вопрос или комментарий..."
                      />
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="privacy" className="mt-1" required />
                      <label htmlFor="privacy" className="text-sm text-secondary">
                        Я согласен на обработку персональных данных и принимаю{' '}
                        <a href="#" className="text-accent hover:underline">политику конфиденциальности</a>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" /> Отправить сообщение
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Мы на карте</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-sand rounded-2xl h-[400px] flex items-center justify-center">
              <p className="text-secondary">Здесь будет карта с офисами</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

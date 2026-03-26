import React, { useState } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ContactsPage: React.FC = () => {
  const { contactsContent } = useData();
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formAgreed, setFormAgreed] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState('');

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              {contactsContent.heroTitle}
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl">
              {contactsContent.heroSubtitle}
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
                {contactsContent.offices.map((office, idx) => (
                  <Reveal key={office.id} delay={idx * 100}>
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
                  <a href={`tel:${contactsContent.hotlinePhone.replace(/\s/g, '')}`} className="text-3xl font-bold hover:text-accent transition-colors">
                    {contactsContent.hotlinePhone}
                  </a>
                  <p className="text-white/70 mt-2">{contactsContent.hotlineText}</p>
                </div>
              </Reveal>

              {/* Messengers */}
              {(contactsContent.messengers?.telegram || contactsContent.messengers?.vk || contactsContent.messengers?.whatsapp) && (
                <Reveal delay={400}>
                  <div className="mt-6 p-6 bg-beige rounded-2xl">
                    <h3 className="text-lg font-bold text-primary mb-4">Мессенджеры</h3>
                    <div className="flex gap-4">
                      {contactsContent.messengers?.telegram && (
                        <a
                          href={contactsContent.messengers.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#0088cc] text-white px-4 py-2 rounded-xl hover:opacity-80 transition-opacity"
                        >
                          <MessageCircle className="w-5 h-5" /> Telegram
                        </a>
                      )}
                      {contactsContent.messengers?.vk && (
                        <a
                          href={contactsContent.messengers.vk}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#0077ff] text-white px-4 py-2 rounded-xl hover:opacity-80 transition-opacity"
                        >
                          <MessageCircle className="w-5 h-5" /> ВКонтакте
                        </a>
                      )}
                      {contactsContent.messengers?.whatsapp && (
                        <a
                          href={contactsContent.messengers.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#25d366] text-white px-4 py-2 rounded-xl hover:opacity-80 transition-opacity"
                        >
                          <MessageCircle className="w-5 h-5" /> WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Contact Form */}
            <div>
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">Написать нам</h2>
              </Reveal>
              <Reveal delay={100}>
                {formSent ? (
                  <div className="bg-beige rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold text-primary mb-2">Сообщение отправлено!</h4>
                    <p className="text-secondary text-sm mb-6">Мы свяжемся с вами в ближайшее время.</p>
                    <button
                      onClick={() => { setFormSent(false); setFormName(''); setFormPhone(''); setFormMessage(''); setFormAgreed(false); }}
                      className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-colors"
                    >
                      Отправить ещё
                    </button>
                  </div>
                ) : (
                <form className="bg-beige rounded-2xl p-8" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!formName.trim() || !formPhone.trim()) { setFormError('Заполните обязательные поля'); return; }
                  if (!formAgreed) { setFormError('Необходимо согласие на обработку персональных данных'); return; }
                  setFormError('');
                  setFormSending(true);
                  try {
                    const res = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name: formName.trim(), phone: formPhone.trim(), message: formMessage.trim(), context: 'Контакты: Написать нам' }),
                    });
                    if (res.ok) { setFormSent(true); } else { setFormError('Ошибка отправки. Попробуйте позже.'); }
                  } catch { setFormError('Ошибка сети. Попробуйте позже.'); }
                  finally { setFormSending(false); }
                }}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Имя *</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Телефон *</label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={e => setFormPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
                        placeholder="+7 (___) ___-__-__"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Ваш вопрос</label>
                      <textarea
                        rows={4}
                        value={formMessage}
                        onChange={e => setFormMessage(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Напишите ваш вопрос..."
                      />
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="privacy" className="mt-1" checked={formAgreed} onChange={e => setFormAgreed(e.target.checked)} required />
                      <label htmlFor="privacy" className="text-sm text-secondary">
                        Я согласен на обработку персональных данных и принимаю{' '}
                        <a href="#" className="text-accent hover:underline">политику конфиденциальности</a>
                      </label>
                    </div>
                    {formError && <p className="text-red-500 text-sm">{formError}</p>}
                    <button
                      type="submit"
                      disabled={formSending}
                      className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" /> {formSending ? 'Отправка...' : 'Отправить сообщение'}
                    </button>
                  </div>
                </form>
                )}
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
            {contactsContent.yandexMapCoords ? (
              <div className="bg-white rounded-2xl overflow-hidden h-[400px]">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${contactsContent.yandexMapCoords.split(',').reverse().join(',')}&z=${contactsContent.yandexMapZoom || 15}&pt=${contactsContent.yandexMapCoords.split(',').reverse().join(',')},pm2rdm`}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  title="Карта офиса"
                />
              </div>
            ) : (
              <div className="bg-sand rounded-2xl h-[400px] flex items-center justify-center">
                <p className="text-secondary">Карта не настроена. Укажите координаты в админке.</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

    </>
  );
};

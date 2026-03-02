import React, { useState } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, X } from 'lucide-react';
import { useData } from '../context/DataContext';

// Contact Form Modal (same as on main page)
const ContactModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Заполните обязательные поля');
      return;
    }
    if (!agreed) {
      setError('Необходимо согласие на обработку персональных данных');
      return;
    }
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), message: message.trim() }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } catch {
      setError('Ошибка сети. Попробуйте позже.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center" onClick={e => e.stopPropagation()}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-lg font-bold text-primary mb-2">Заявка отправлена!</h4>
          <p className="text-secondary text-sm mb-6">Мы свяжемся с вами в ближайшее время.</p>
          <button onClick={onClose} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-colors">
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-primary">Оставить заявку</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Ваше имя *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Иван Иванов"
              className="w-full px-4 py-3 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Телефон *</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="w-full px-4 py-3 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Сообщение</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Ваш вопрос..."
              rows={3}
              className="w-full px-4 py-3 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent resize-none"
            />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">
              Я согласен(а) на обработку персональных данных
            </span>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-accent transition-colors disabled:opacity-50"
          >
            {sending ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const ContactsPage: React.FC = () => {
  const { contactsContent } = useData();
  const [showModal, setShowModal] = useState(false);

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
                <form className="bg-beige rounded-2xl p-8" onSubmit={(e) => { e.preventDefault(); setShowModal(true); }}>
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

      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </>
  );
};

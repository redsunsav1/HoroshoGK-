import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

const faqCategories = [
  {
    name: 'Покупка квартиры',
    questions: [
      {
        q: 'Какие документы нужны для покупки квартиры?',
        a: 'Для покупки квартиры вам понадобится: паспорт, СНИЛС, ИНН. Если планируете использовать ипотеку — дополнительно справка о доходах. Наши специалисты помогут собрать полный пакет документов.',
      },
      {
        q: 'Можно ли забронировать квартиру?',
        a: 'Да, вы можете забронировать понравившуюся квартиру на срок до 5 рабочих дней. Бронирование бесплатное. За это время вы сможете собрать документы и принять окончательное решение.',
      },
      {
        q: 'Какой первоначальный взнос при рассрочке?',
        a: 'Минимальный первоначальный взнос при рассрочке от застройщика составляет 10% от стоимости квартиры. Рассрочка предоставляется без процентов до окончания строительства.',
      },
    ],
  },
  {
    name: 'Ипотека',
    questions: [
      {
        q: 'С какими банками вы работаете?',
        a: 'Мы сотрудничаем с ведущими банками России: Сбербанк, ВТБ, Альфа-Банк, Газпромбанк и другими. Наши партнеры предлагают специальные условия для наших клиентов.',
      },
      {
        q: 'Какая минимальная ставка по ипотеке?',
        a: 'Минимальная ставка по ипотеке от наших банков-партнеров начинается от 5.9% годовых. Точная ставка зависит от программы кредитования и индивидуальных условий.',
      },
      {
        q: 'Помогаете ли вы с оформлением ипотеки?',
        a: 'Да, наши ипотечные специалисты помогут подобрать оптимальную программу, подготовить документы и сопроводят весь процесс одобрения и оформления кредита.',
      },
    ],
  },
  {
    name: 'Строительство',
    questions: [
      {
        q: 'Когда планируется сдача дома?',
        a: 'Сроки сдачи указаны на странице каждого проекта. Мы строго соблюдаем сроки и часто сдаем объекты досрочно. Актуальную информацию о ходе строительства можно отслеживать в разделе «Новости».',
      },
      {
        q: 'Можно ли посмотреть ход строительства?',
        a: 'Да, мы регулярно публикуем фото и видеоотчеты о ходе строительства. Также можно записаться на экскурсию на строительную площадку.',
      },
      {
        q: 'Какие материалы используются при строительстве?',
        a: 'Мы используем только качественные материалы от проверенных поставщиков. Все материалы имеют сертификаты соответствия и проходят контроль качества.',
      },
    ],
  },
  {
    name: 'После покупки',
    questions: [
      {
        q: 'Когда можно получить ключи?',
        a: 'Ключи передаются после ввода дома в эксплуатацию и подписания акта приема-передачи. Мы уведомим вас заранее о готовности квартиры к передаче.',
      },
      {
        q: 'Есть ли гарантия на квартиру?',
        a: 'Да, мы предоставляем гарантию 5 лет на конструктивные элементы здания и 3 года на инженерное оборудование согласно законодательству РФ.',
      },
      {
        q: 'Помогаете ли вы с ремонтом?',
        a: 'Мы предлагаем услуги по отделке квартир «под ключ» от наших проверенных подрядчиков. Также можем порекомендовать дизайнеров интерьера.',
      },
    ],
  },
];

export const FaqPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.questions.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
              Частые вопросы
            </h1>
            <p className="text-xl text-secondary font-light max-w-2xl mb-8">
              Ответы на самые популярные вопросы о покупке недвижимости.
            </p>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                type="text"
                placeholder="Поиск по вопросам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          {filteredCategories.length > 0 ? (
            <div className="space-y-12">
              {filteredCategories.map((category, catIdx) => (
                <Reveal key={category.name} delay={catIdx * 100}>
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                      <HelpCircle className="w-6 h-6 text-accent" />
                      {category.name}
                    </h2>
                    <div className="space-y-3">
                      {category.questions.map((item, idx) => {
                        const id = `${catIdx}-${idx}`;
                        const isOpen = openItems.has(id);

                        return (
                          <div
                            key={id}
                            className="bg-beige rounded-xl overflow-hidden"
                          >
                            <button
                              onClick={() => toggleItem(id)}
                              className="w-full flex items-center justify-between p-6 text-left"
                            >
                              <span className="font-medium text-primary pr-4">{item.q}</span>
                              <ChevronDown
                                className={`w-5 h-5 text-accent shrink-0 transition-transform ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-6">
                                <p className="text-secondary">{item.a}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">По вашему запросу ничего не найдено</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-accent hover:underline"
              >
                Сбросить поиск
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 md:px-8 bg-beige">
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Не нашли ответ на свой вопрос?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Свяжитесь с нами, и наши специалисты ответят на все ваши вопросы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:88000000000"
                  className="bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors"
                >
                  8 800 000-00-00
                </a>
                <Link
                  to="/contacts"
                  className="border border-white/30 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors"
                >
                  Написать нам
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { InfrastructureMap } from '../../components/InfrastructureMap';
import { MapPin, CheckCircle, ArrowLeft, Phone, X, Shield } from 'lucide-react';
import { ApartmentPlan } from '../../types';

// ============================================================
// Booking Modal
// ============================================================
const BookingModal: React.FC<{
  apartment: ApartmentPlan;
  projectName: string;
  onClose: () => void;
}> = ({ apartment, projectName, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Заполните все поля');
      return;
    }
    if (!agreed) {
      setError('Необходимо согласие на обработку персональных данных');
      return;
    }
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          projectName,
          apartmentId: apartment.id,
          rooms: apartment.rooms,
          area: apartment.area,
          floor: apartment.floor,
          number: apartment.number,
          price: apartment.price,
        }),
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

  if (showPolicy) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPolicy(false)}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-primary">Политика обработки персональных данных</h3>
            <button onClick={() => setShowPolicy(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-secondary space-y-4 leading-relaxed">
            <p><strong>1. Общие положения</strong></p>
            <p>Настоящая Политика обработки персональных данных (далее — Политика) разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных пользователей сайта ГК «Хорошо» (далее — Оператор).</p>
            <p><strong>2. Цели обработки персональных данных</strong></p>
            <p>Оператор обрабатывает персональные данные в целях:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Обработки входящих заявок и запросов от пользователей</li>
              <li>Предоставления информации о жилых комплексах, ценах и условиях приобретения</li>
              <li>Связи с пользователем по телефону и/или электронной почте</li>
              <li>Бронирования объектов недвижимости</li>
            </ul>
            <p><strong>3. Перечень обрабатываемых данных</strong></p>
            <p>Оператор обрабатывает следующие персональные данные: имя, номер телефона.</p>
            <p><strong>4. Правовые основания обработки</strong></p>
            <p>Обработка персональных данных осуществляется на основании согласия субъекта персональных данных (п. 1 ч. 1 ст. 6 ФЗ-152).</p>
            <p><strong>5. Порядок и условия обработки</strong></p>
            <p>Обработка данных осуществляется с соблюдением принципов и правил, предусмотренных ФЗ-152. Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством РФ.</p>
            <p><strong>6. Срок хранения</strong></p>
            <p>Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, но не более 3 лет с момента получения.</p>
            <p><strong>7. Права субъекта</strong></p>
            <p>Субъект персональных данных вправе требовать уточнения, блокирования или уничтожения своих данных, обратившись к Оператору по контактным данным, указанным на сайте.</p>
          </div>
          <button
            onClick={() => setShowPolicy(false)}
            className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-accent transition-colors"
          >
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
          <h3 className="text-xl font-bold text-primary">Забронировать квартиру</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-primary mb-2">Заявка отправлена!</h4>
            <p className="text-secondary text-sm mb-6">Мы свяжемся с вами в ближайшее время для подтверждения бронирования.</p>
            <button onClick={onClose} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-colors">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <div className="bg-beige rounded-xl p-4 mb-6">
              <div className="text-sm text-secondary mb-1">{projectName}</div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary">{apartment.rooms}-комн., {apartment.area} м²</span>
                <span className="font-bold text-accent">{apartment.price}</span>
              </div>
              <div className="text-sm text-secondary mt-1">
                Этаж {apartment.floor}{apartment.number ? `, кв. №${apartment.number}` : ''}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors text-primary placeholder:text-secondary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Номер телефона</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors text-primary placeholder:text-secondary/50"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-accent"
                />
                <span className="text-sm text-secondary leading-snug">
                  Я согласен(а) на{' '}
                  <button
                    type="button"
                    onClick={() => setShowPolicy(true)}
                    className="text-accent hover:underline"
                  >
                    обработку персональных данных
                  </button>
                  {' '}в соответствии с ФЗ-152
                </span>
              </label>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-accent hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {sending ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
// Floor Selector Component
// ============================================================
const FloorSelector: React.FC<{
  totalFloors: number;
  plans: ApartmentPlan[];
  selectedFloor: number | null;
  onSelectFloor: (floor: number) => void;
  roomFilter: number | null;
}> = ({ totalFloors, plans, selectedFloor, onSelectFloor, roomFilter }) => {
  const floors = Array.from({ length: totalFloors }, (_, i) => totalFloors - i);

  const getFloorStatus = (floor: number) => {
    const floorPlans = plans.filter(p => p.floor === floor && (roomFilter === null || p.rooms === roomFilter));
    if (floorPlans.length === 0) return 'empty';
    const hasAvailable = floorPlans.some(p => p.status === 'available');
    const allSold = floorPlans.every(p => p.status === 'sold');
    if (allSold) return 'sold';
    if (hasAvailable) return 'available';
    return 'reserved';
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-secondary mb-2 font-medium">Выберите этаж:</div>
      <div className="flex flex-wrap gap-2">
        {floors.map(floor => {
          const status = getFloorStatus(floor);
          const isSelected = selectedFloor === floor;
          let bg = 'bg-gray-100 text-gray-400';
          if (status === 'available') bg = 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer';
          if (status === 'reserved') bg = 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 cursor-pointer';
          if (status === 'sold') bg = 'bg-red-100 text-red-400';
          if (isSelected) bg = 'bg-primary text-white ring-2 ring-accent';

          return (
            <button
              key={floor}
              onClick={() => status !== 'empty' && onSelectFloor(floor)}
              disabled={status === 'empty'}
              className={`w-12 h-10 rounded-lg text-sm font-bold transition-all ${bg}`}
              title={`Этаж ${floor}${status === 'available' ? ' — есть квартиры' : status === 'sold' ? ' — продано' : status === 'reserved' ? ' — бронь' : ' — нет квартир'}`}
            >
              {floor}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3 text-xs text-secondary">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 inline-block" /> Свободно</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200 inline-block" /> Бронь</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200 inline-block" /> Продано</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-100 inline-block" /> Нет квартир</span>
      </div>
    </div>
  );
};

// ============================================================
// Apartment Card
// ============================================================
const ApartmentCard: React.FC<{
  plan: ApartmentPlan;
  projectName: string;
  onBook: (plan: ApartmentPlan) => void;
}> = ({ plan, projectName, onBook }) => {
  const statusLabels: Record<string, string> = {
    available: 'Свободна',
    reserved: 'Забронирована',
    sold: 'Продана',
  };
  const statusColors: Record<string, string> = {
    available: 'bg-green-100 text-green-700',
    reserved: 'bg-yellow-100 text-yellow-700',
    sold: 'bg-red-100 text-red-500',
  };

  const status = plan.status || 'available';

  return (
    <div className="bg-white border border-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-8 bg-beige/30 flex items-center justify-center h-56 relative">
        <img src={plan.image} alt="Plan" className="max-h-full max-w-full mix-blend-multiply opacity-80" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm text-primary">
          {plan.rooms}-комн.
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-secondary text-sm mb-1 font-light">Площадь</div>
            <div className="text-xl font-bold text-primary">{plan.area} м²</div>
          </div>
          <div className="text-right">
            <div className="text-secondary text-sm mb-1 font-light">Стоимость</div>
            <div className="text-lg font-bold text-accent">{plan.price}</div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-secondary mb-4">
          <span>Этаж: <strong className="text-primary">{plan.floor}</strong></span>
          {plan.number && <span>Кв. №<strong className="text-primary">{plan.number}</strong></span>}
        </div>
        {status === 'available' ? (
          <button
            onClick={() => onBook(plan)}
            className="w-full py-3 bg-accent text-white rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-primary hover:shadow-lg transition-all duration-300"
          >
            Забронировать
          </button>
        ) : (
          <div className={`w-full py-3 text-center rounded-lg text-sm font-bold uppercase tracking-wide ${
            status === 'reserved' ? 'bg-yellow-50 text-yellow-600 border border-yellow-200' : 'bg-gray-50 text-gray-400 border border-gray-200'
          }`}>
            {statusLabels[status]}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// Main Page
// ============================================================
export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useData();
  const project = projects.find(p => p.slug === slug);

  const [roomFilter, setRoomFilter] = useState<number | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [bookingApartment, setBookingApartment] = useState<ApartmentPlan | null>(null);

  if (!project) {
    return (
      <section className="py-24 px-4 md:px-8 text-center">
        <h1 className="text-3xl font-medium text-primary mb-4">Проект не найден</h1>
        <p className="text-secondary mb-8">Возможно, он был удален или перемещен.</p>
        <Link to="/projects" className="text-accent hover:underline">
          Вернуться к проектам
        </Link>
      </section>
    );
  }

  const availableRoomTypes = Array.from(new Set(project.plans.map(p => p.rooms))).sort().filter(r => r >= 1 && r <= 3);

  const filteredPlans = project.plans.filter(p => {
    if (roomFilter !== null && p.rooms !== roomFilter) return false;
    if (selectedFloor !== null && p.floor !== selectedFloor) return false;
    return true;
  });

  const handleFloorSelect = (floor: number) => {
    setSelectedFloor(prev => prev === floor ? null : floor);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-4 px-4 md:px-8 bg-beige border-b border-sand">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-secondary hover:text-primary">Главная</Link>
            <span className="text-secondary">/</span>
            <Link to="/projects" className="text-secondary hover:text-primary">Проекты</Link>
            <span className="text-secondary">/</span>
            <span className="text-primary font-medium">{project.name}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 md:p-16 w-full max-w-5xl">
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-4 py-1.5 bg-white/80 border border-white rounded-full text-sm text-primary font-medium shadow-sm backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={400}>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-medium mb-4 leading-tight tracking-tight text-primary">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={600}>
            <p className="text-xl md:text-2xl text-primary/80 font-light max-w-2xl">
              {project.shortDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-start">
          <Reveal direction="right">
            <h2 className="text-3xl md:text-5xl font-medium mb-8 text-primary">О проекте</h2>
            <p className="text-lg text-secondary leading-relaxed mb-8 font-light">
              {project.fullDescription}
            </p>
            <div className="flex items-center text-primary font-medium p-4 bg-beige rounded-xl w-fit">
              <MapPin className="w-5 h-5 mr-3 text-accent" />
              {project.location}
            </div>
          </Reveal>
          <div className="grid gap-6">
            {project.features.map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100} direction="left">
                <div className="flex items-start p-6 bg-beige/50 border border-sand rounded-2xl hover:bg-beige transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm mr-6 text-accent">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
                    <p className="text-secondary font-light">{feature.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Map Section */}
      <section className="py-20 px-4 md:px-8 bg-beige/30">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium mb-8 text-primary">Инфраструктура</h2>
            <p className="text-secondary mb-8 font-light max-w-2xl">
              Всё необходимое для комфортной жизни — в шаговой доступности.
            </p>
            <InfrastructureMap project={project} />
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-20">
        <div className="px-4 md:px-8 mb-8">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium text-primary max-w-[1600px] mx-auto">Галерея</h2>
          </Reveal>
        </div>
        <div className="overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-4 px-4 md:px-8 w-max">
            {project.gallery.map((img, idx) => (
              <Reveal key={idx} delay={idx * 100} direction="right" className="w-[80vw] md:w-[600px] h-[400px] flex-shrink-0">
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments / Floor Plans */}
      <section className="py-20 px-4 md:px-8 bg-beige/10">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-sand pb-8">
              <h2 className="text-3xl md:text-5xl font-medium text-primary">Выбрать квартиру</h2>
              <div className="flex gap-2 mt-6 md:mt-0 flex-wrap">
                <button
                  onClick={() => { setRoomFilter(null); setSelectedFloor(null); }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    roomFilter === null ? 'bg-primary text-white' : 'bg-beige text-secondary hover:bg-sand'
                  }`}
                >
                  Все
                </button>
                {availableRoomTypes.map(rooms => (
                  <button
                    key={rooms}
                    onClick={() => { setRoomFilter(rooms === roomFilter ? null : rooms); setSelectedFloor(null); }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      roomFilter === rooms ? 'bg-primary text-white' : 'bg-beige text-secondary hover:bg-sand'
                    }`}
                  >
                    {rooms}-комнатная
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Floor Selector */}
          {project.totalFloors && (
            <Reveal>
              <div className="mb-10 bg-white p-6 rounded-2xl border border-sand">
                <FloorSelector
                  totalFloors={project.totalFloors}
                  plans={project.plans}
                  selectedFloor={selectedFloor}
                  onSelectFloor={handleFloorSelect}
                  roomFilter={roomFilter}
                />
              </div>
            </Reveal>
          )}

          {/* Apartment Cards */}
          {filteredPlans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlans.map((plan) => (
                <Reveal key={plan.id}>
                  <ApartmentCard
                    plan={plan}
                    projectName={project.name}
                    onBook={setBookingApartment}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-secondary">
              <p className="text-lg">Квартир по выбранным параметрам не найдено.</p>
              <button
                onClick={() => { setRoomFilter(null); setSelectedFloor(null); }}
                className="mt-4 text-accent hover:underline"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Promos */}
      {project.promos.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-beige">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center text-primary">Специальные предложения</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {project.promos.map((promo, idx) => (
                <Reveal key={promo.id} delay={idx * 150} direction={idx % 2 === 0 ? 'right' : 'left'}>
                  <div className="relative h-80 rounded-3xl overflow-hidden group shadow-lg">
                    <img src={promo.image} alt={promo.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      {promo.discount && (
                        <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block shadow-sm">
                          {promo.discount}
                        </span>
                      )}
                      <h3 className="text-3xl font-bold text-white mb-2">{promo.title}</h3>
                      <p className="text-white/80 font-light">{promo.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-primary">
              Заинтересовал {project.name}?
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto font-light text-lg">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут для проведения персональной презентации.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-5 h-5 text-accent" />
              <a href="tel:+78512000000" className="text-xl font-bold text-primary hover:text-accent transition-colors">
                +7 (8512) 00-00-00
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Back to projects */}
      <section className="py-8 px-4 md:px-8 bg-beige border-t border-sand">
        <div className="max-w-[1600px] mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Все проекты
          </Link>
        </div>
      </section>

      {/* Booking Modal */}
      {bookingApartment && (
        <BookingModal
          apartment={bookingApartment}
          projectName={project.name}
          onClose={() => setBookingApartment(null)}
        />
      )}
    </>
  );
};

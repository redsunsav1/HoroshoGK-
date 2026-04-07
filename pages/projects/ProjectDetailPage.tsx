import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Reveal } from '../../components/ui/Reveal';
import { ContactModal } from '../../components/ui/ContactModal';
import { MapPin, CheckCircle, ArrowLeft, Phone, X, Shield, ZoomIn, Video, ChevronLeft, ChevronRight, ChevronDown, Camera } from 'lucide-react';
import { ApartmentPlan, PromoOffer } from '../../types';

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
              {(apartment.floor || apartment.number) && (
                <div className="text-sm text-secondary mt-1">
                  {apartment.floor ? `Этаж: ${apartment.floor}` : ''}{apartment.number ? `, планировка: ${apartment.number}` : ''}
                </div>
              )}
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
// Plan Image Popup
// ============================================================
const PlanImagePopup: React.FC<{
  image: string;
  title: string;
  onClose: () => void;
}> = ({ image, title, onClose }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 text-white hover:text-accent transition-colors p-2"
      >
        <X className="w-8 h-8" />
      </button>
      <img
        src={image}
        alt={title}
        className="max-w-full max-h-[85vh] object-contain bg-white rounded-2xl p-4"
      />
    </div>
  </div>
);

// ============================================================
// Promo Popup
// ============================================================
const PromoPopup: React.FC<{
  promo: PromoOffer;
  onClose: () => void;
  onCallback: () => void;
}> = ({ promo, onClose, onCallback }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="relative">
        <img
          src={promo.popupImage || promo.image}
          alt={promo.title}
          className="w-full rounded-t-2xl"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
        {promo.discount && (
          <span className="absolute top-4 left-4 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
            {promo.discount}
          </span>
        )}
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-primary mb-4">{promo.title}</h3>
        <div className="text-secondary font-light leading-relaxed mb-6 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: promo.description }} />
        <button
          onClick={onCallback}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-medium hover:bg-accent transition-colors"
        >
          <Phone className="w-5 h-5" /> Запросить обратный звонок
        </button>
      </div>
    </div>
  </div>
);

// ============================================================
// Apartment Card
// ============================================================
const ApartmentCard: React.FC<{
  plan: ApartmentPlan;
  projectName: string;
  onBook: (plan: ApartmentPlan) => void;
  onViewPlan: (plan: ApartmentPlan) => void;
}> = ({ plan, projectName, onBook, onViewPlan }) => {
  return (
    <div className="bg-white border border-sand rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div
        className="p-8 bg-beige/30 flex items-center justify-center h-56 relative cursor-pointer group"
        onClick={() => onViewPlan(plan)}
      >
        <img src={plan.image} alt="Plan" className="max-h-full max-w-full mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
            <ZoomIn className="w-6 h-6 text-primary" />
          </div>
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
          {plan.floor && <span>Этаж: <strong className="text-primary">{plan.floor}</strong></span>}
          {plan.number && <span>Планировка: <strong className="text-primary">{plan.number}</strong></span>}
        </div>
        <button
          onClick={() => onBook(plan)}
          className="w-full py-3 bg-accent text-white rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-primary hover:shadow-lg transition-all duration-300"
        >
          Забронировать
        </button>
      </div>
    </div>
  );
};

// ============================================================
// Floor parsing helper: "2-5, 7" → [2,3,4,5,7]
// ============================================================
const parseFloors = (floorStr: string): number[] => {
  const floors: number[] = [];
  if (!floorStr) return floors;
  const parts = floorStr.split(',').map(s => s.trim());
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) floors.push(i);
      }
    } else {
      const n = Number(part);
      if (!isNaN(n)) floors.push(n);
    }
  }
  return floors;
};

// ============================================================
// Floor Selector
// ============================================================
const FloorSelector: React.FC<{
  floors: number[];
  selectedFloor: number | null;
  onSelect: (floor: number | null) => void;
}> = ({ floors, selectedFloor, onSelect }) => {
  if (floors.length === 0) return null;
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-primary mb-4">Выберите этаж</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-12 h-12 rounded-xl text-sm font-medium transition-all ${
            selectedFloor === null ? 'bg-primary text-white shadow-md' : 'bg-beige text-secondary hover:bg-sand'
          }`}
        >
          Все
        </button>
        {floors.map(floor => (
          <button
            key={floor}
            onClick={() => onSelect(floor === selectedFloor ? null : floor)}
            className={`w-12 h-12 rounded-xl text-sm font-medium transition-all ${
              selectedFloor === floor ? 'bg-primary text-white shadow-md' : 'bg-beige text-secondary hover:bg-sand'
            }`}
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// Main Page
// ============================================================
export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects, promotions } = useData();
  const project = projects.find(p => p.slug === slug);

  const [roomFilter, setRoomFilter] = useState<number | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [bookingApartment, setBookingApartment] = useState<ApartmentPlan | null>(null);
  const [viewPlanImage, setViewPlanImage] = useState<ApartmentPlan | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<PromoOffer | null>(null);
  const [showPromoCallback, setShowPromoCallback] = useState(false);
  const [promoCallbackContext, setPromoCallbackContext] = useState('');
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [galleryLightbox, setGalleryLightbox] = useState<{ images: { url: string }[]; index: number } | null>(null);
  const [openConstructionYear, setOpenConstructionYear] = useState<string | null>(
    project?.constructionProgress?.[project.constructionProgress.length - 1]?.id || null
  );
  const [openConstructionMonth, setOpenConstructionMonth] = useState<string | null>(null);
  const [showStream, setShowStream] = useState(false);
  const galleryScrollRef = useRef<HTMLDivElement>(null);

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

  const availableRoomTypes = Array.from(new Set(project.plans.map(p => p.rooms))).sort((a: number, b: number) => a - b);

  // Collect all unique floors from all plans
  const allFloors = Array.from(
    new Set(project.plans.flatMap(p => parseFloors(p.floor || '')))
  ).sort((a: number, b: number) => a - b);

  const filteredPlans = project.plans.filter(p => {
    if (roomFilter !== null && p.rooms !== roomFilter) return false;
    if (selectedFloor !== null) {
      const planFloors = parseFloors(p.floor || '');
      if (!planFloors.includes(selectedFloor)) return false;
    }
    return true;
  });

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

      {/* Construction Progress (Ход строительства) — Year/Month Accordion Timeline */}
      {project.constructionProgress && project.constructionProgress.length > 0 && (() => {
        const monthNamesShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        const monthNamesFull = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const sortedYears = [...project.constructionProgress].sort((a, b) => b.year - a.year);
        return (
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
                <div>
                  <h2 className="text-3xl md:text-5xl font-medium text-primary">Ход строительства</h2>
                  <p className="text-secondary mt-2 font-light max-w-2xl">
                    Следите за прогрессом строительства в реальном времени.
                  </p>
                </div>
                {project.streamUrl && (
                  <button
                    onClick={() => setShowStream(true)}
                    className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-lg animate-pulse hover:animate-none">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                    </span>
                    Трансляция со стройки
                  </button>
                )}
              </div>
            </Reveal>

            {/* Year/Month Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-0.5 bg-sand" />

              <div className="space-y-4">
                {sortedYears.map((yearData, yIdx) => {
                  const isYearOpen = openConstructionYear === yearData.id;
                  const sortedMonths = [...yearData.months].sort((a, b) => a.month - b.month);
                  const totalPhotos = sortedMonths.reduce((sum, m) => sum + m.photos.length, 0);

                  return (
                    <Reveal key={yearData.id} delay={yIdx * 80}>
                      <div className="relative pl-12 md:pl-14">
                        {/* Year dot */}
                        <div className={`absolute left-[10px] md:left-[14px] top-5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          isYearOpen ? 'bg-accent border-accent scale-125' : 'bg-white border-sand'
                        }`} />

                        {/* Year header */}
                        <button
                          onClick={() => {
                            setOpenConstructionYear(isYearOpen ? null : yearData.id);
                            setOpenConstructionMonth(null);
                          }}
                          className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                            isYearOpen
                              ? 'bg-beige border-accent/30 shadow-md'
                              : 'bg-beige/50 border-sand hover:bg-beige hover:border-accent/20 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-xl md:text-2xl font-bold transition-colors ${
                              isYearOpen ? 'text-accent' : 'text-primary'
                            }`}>
                              {yearData.year}
                            </span>
                            <span className="text-sm text-secondary">
                              {sortedMonths.map(m => monthNamesShort[m.month]).join(', ')}
                            </span>
                            <span className="text-xs text-secondary/60 hidden sm:inline">
                              {totalPhotos} фото
                            </span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${isYearOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Year content — months */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isYearOpen ? 'max-h-[5000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="space-y-2 pl-2">
                            {sortedMonths.map((monthData) => {
                              const isMonthOpen = openConstructionMonth === monthData.id;
                              return (
                                <div key={monthData.id}>
                                  {/* Month header */}
                                  <button
                                    onClick={() => setOpenConstructionMonth(isMonthOpen ? null : monthData.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                                      isMonthOpen
                                        ? 'bg-white border-accent/30 shadow-sm'
                                        : 'bg-beige/30 border-transparent hover:bg-beige/60 hover:border-sand'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
                                        isMonthOpen ? 'bg-accent text-white' : 'bg-sand/80 text-secondary'
                                      }`}>
                                        {monthNamesFull[monthData.month]}
                                      </span>
                                      <span className="text-xs text-secondary">
                                        {monthData.photos.length} фото
                                      </span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-secondary shrink-0 transition-transform duration-300 ${isMonthOpen ? 'rotate-180' : ''}`} />
                                  </button>

                                  {/* Month photos carousel */}
                                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${
                                    isMonthOpen ? 'max-h-[1000px] opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'
                                  }`}>
                                    {monthData.photos.length > 0 && (
                                      <div className="relative bg-white rounded-xl border border-sand p-3">
                                        <div className="overflow-x-auto hide-scrollbar scroll-smooth" id={`cp-carousel-${monthData.id}`}>
                                          <div className="flex gap-3 w-max">
                                            {monthData.photos.map((photo, pIdx) => (
                                              <img
                                                key={pIdx}
                                                src={photo}
                                                alt={`${monthNamesFull[monthData.month]} ${yearData.year} — фото ${pIdx + 1}`}
                                                loading="lazy"
                                                className="h-48 md:h-64 w-auto max-w-[75vw] object-cover rounded-lg cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                                                onClick={() => setGalleryLightbox({
                                                  images: monthData.photos.map(p => ({ url: p })),
                                                  index: pIdx,
                                                })}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                        {monthData.photos.length > 2 && (
                                          <div className="flex justify-center gap-2 mt-3">
                                            <button
                                              onClick={() => document.getElementById(`cp-carousel-${monthData.id}`)?.scrollBy({ left: -300, behavior: 'smooth' })}
                                              className="p-2 bg-beige rounded-full hover:bg-sand transition-colors"
                                            >
                                              <ChevronLeft className="w-4 h-4 text-primary" />
                                            </button>
                                            <button
                                              onClick={() => document.getElementById(`cp-carousel-${monthData.id}`)?.scrollBy({ left: 300, behavior: 'smooth' })}
                                              className="p-2 bg-beige rounded-full hover:bg-sand transition-colors"
                                            >
                                              <ChevronRight className="w-4 h-4 text-primary" />
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        );
      })()}

      {/* Timeline Section — only for projects with timeline */}
      {project.timeline && project.timeline.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium mb-4 text-primary">История проекта</h2>
              <p className="text-secondary mb-12 font-light max-w-2xl">
                Ключевые этапы реализации проекта от старта продаж до ввода в эксплуатацию.
              </p>
            </Reveal>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-sand md:-translate-x-0.5" />

              {project.timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                const dateObj = new Date(item.date);
                const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
                const formattedDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

                return (
                  <Reveal key={item.id} delay={idx * 100} direction={isLeft ? 'right' : 'left'}>
                    <div className={`relative flex items-start mb-8 md:mb-12 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}>
                      {/* Content */}
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                        <div className={`bg-beige rounded-2xl p-6 shadow-sm border border-sand inline-block ${
                          isLeft ? 'md:ml-auto' : ''
                        }`}>
                          <div className="text-accent font-bold text-sm mb-2">{formattedDate}</div>
                          <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-secondary text-sm font-light">{item.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Dot */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white shadow-md -translate-x-1/2 mt-2" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Infrastructure Section */}
      <section className="py-20 px-4 md:px-8 bg-beige/30">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-medium mb-8 text-primary">Инфраструктура</h2>
            <p className="text-secondary mb-8 font-light max-w-2xl">
              Всё необходимое для комфортной жизни — в шаговой доступности.
            </p>
            {project.yandexMapUrl ? (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-sand">
                <iframe
                  src={project.yandexMapUrl}
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  className="w-full"
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center text-secondary border border-sand">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p>Карта инфраструктуры не настроена</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      {(() => {
        const categories = project.galleryCategories || [];
        const galleryImgs = project.galleryImages || project.gallery.map((url, i) => ({ id: String(i), url, category: 'all' }));
        const filteredGallery = galleryFilter === 'all'
          ? galleryImgs
          : galleryImgs.filter(img => img.category === galleryFilter);
        const scrollGallery = (dir: number) => {
          if (galleryScrollRef.current) {
            galleryScrollRef.current.scrollBy({ left: dir * 600, behavior: 'smooth' });
          }
        };
        return (
          <section className="bg-white py-20">
            <div className="px-4 md:px-8 mb-8">
              <div className="max-w-[1600px] mx-auto">
                <Reveal>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-3xl md:text-5xl font-medium text-primary">Галерея</h2>
                    {categories.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => setGalleryFilter('all')}
                          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                            galleryFilter === 'all' ? 'bg-primary text-white' : 'bg-beige text-secondary hover:bg-sand'
                          }`}
                        >
                          Все
                        </button>
                        {categories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setGalleryFilter(cat.id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                              galleryFilter === cat.id ? 'bg-primary text-white' : 'bg-beige text-secondary hover:bg-sand'
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => scrollGallery(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-colors hidden md:block"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              <button
                onClick={() => scrollGallery(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-colors hidden md:block"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
              <div ref={galleryScrollRef} className="overflow-x-auto pb-8 hide-scrollbar scroll-smooth">
                <div className="flex gap-4 px-4 md:px-8 w-max">
                  {filteredGallery.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className="w-[80vw] md:w-[600px] h-[400px] flex-shrink-0 cursor-pointer group"
                      onClick={() => setGalleryLightbox({ images: filteredGallery, index: idx })}
                    >
                      <img
                        src={typeof img === 'string' ? img : img.url}
                        alt={`Gallery ${idx}`}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                      />
                    </div>
                  ))}
                  {filteredGallery.length === 0 && (
                    <div className="w-full text-center py-16 text-secondary">
                      <Camera className="w-12 h-12 mx-auto mb-4 opacity-40" />
                      <p>Нет фотографий в этой категории</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Apartments / Floor Plans — only show if project has plans */}
      {project.plans.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-beige/10">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-sand pb-8">
                <h2 className="text-3xl md:text-5xl font-medium text-primary">Выбрать квартиру</h2>
                <div className="flex gap-2 mt-6 md:mt-0 flex-wrap">
                  <button
                    onClick={() => setRoomFilter(null)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      roomFilter === null ? 'bg-primary text-white' : 'bg-beige text-secondary hover:bg-sand'
                    }`}
                  >
                    Все
                  </button>
                  {availableRoomTypes.map(rooms => (
                    <button
                      key={rooms}
                      onClick={() => setRoomFilter(rooms === roomFilter ? null : rooms)}
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
            {allFloors.length > 0 && (
              <Reveal>
                <FloorSelector
                  floors={allFloors}
                  selectedFloor={selectedFloor}
                  onSelect={setSelectedFloor}
                />
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
                      onViewPlan={setViewPlanImage}
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
      )}

      {/* Promos */}
      {(() => {
        const globalPromos: PromoOffer[] = promotions
          .filter(p => p.active && p.projectIds?.includes(project.id))
          .map(p => ({ id: p.id, title: p.title, description: p.description, discount: p.discount, image: p.image, popupImage: p.popupImage }));
        const allPromos = [...project.promos, ...globalPromos];
        return allPromos.length > 0 ? (
        <section className="py-20 px-4 md:px-8 bg-beige">
          <div className="max-w-[1600px] mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-medium mb-12 text-center text-primary">Специальные предложения</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {allPromos.map((promo, idx) => (
                <Reveal key={promo.id} delay={idx * 150} direction={idx % 2 === 0 ? 'right' : 'left'}>
                  <div
                    className="relative aspect-[16/9] rounded-3xl overflow-hidden group shadow-lg cursor-pointer"
                    onClick={() => setSelectedPromo(promo)}
                  >
                    <img src={promo.image || promo.popupImage} alt={promo.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      {promo.discount && (
                        <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block shadow-sm">
                          {promo.discount}
                        </span>
                      )}
                      <h3 className="text-3xl font-bold text-white">{promo.title}</h3>
                      <span className="text-white/60 text-sm mt-2 inline-block">Нажмите, чтобы узнать подробнее</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        ) : null;
      })()}

      {/* CTA Footer — only show if project has apartments for sale */}
      {project.plans.length > 0 && (
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
      )}

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

      {/* Plan Image Popup */}
      {viewPlanImage && (
        <PlanImagePopup
          image={viewPlanImage.image}
          title={`${viewPlanImage.rooms}-комн., ${viewPlanImage.area} м²`}
          onClose={() => setViewPlanImage(null)}
        />
      )}

      {/* Promo Popup */}
      {selectedPromo && (
        <PromoPopup
          promo={selectedPromo}
          onClose={() => setSelectedPromo(null)}
          onCallback={() => {
            setPromoCallbackContext(`Акция: ${selectedPromo.title} — ${project.name}`);
            setSelectedPromo(null);
            setShowPromoCallback(true);
          }}
        />
      )}

      {showPromoCallback && (
        <ContactModal
          onClose={() => setShowPromoCallback(false)}
          title="Обратный звонок"
          context={promoCallbackContext}
        />
      )}

      {/* Stream Popup */}
      {showStream && project.streamUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowStream(false)}>
          <div className="relative w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowStream(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              Закрыть ✕
            </button>
            <iframe
              src={project.streamUrl}
              className="w-full h-full rounded-2xl"
              frameBorder="0"
              allowFullScreen
              title="Трансляция со стройки"
            />
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingApartment && (
        <BookingModal
          apartment={bookingApartment}
          projectName={project.name}
          onClose={() => setBookingApartment(null)}
        />
      )}

      {/* Gallery Lightbox */}
      {galleryLightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setGalleryLightbox(null)}
        >
          <button
            onClick={() => setGalleryLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {galleryLightbox.index + 1} / {galleryLightbox.images.length}
          </div>
          {galleryLightbox.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryLightbox(prev => prev ? {
                    ...prev,
                    index: (prev.index - 1 + prev.images.length) % prev.images.length
                  } : null);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryLightbox(prev => prev ? {
                    ...prev,
                    index: (prev.index + 1) % prev.images.length
                  } : null);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}
          <img
            src={galleryLightbox.images[galleryLightbox.index]?.url}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

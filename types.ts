export type InfrastructureType = 'school' | 'kindergarten' | 'shop' | 'pharmacy' | 'gym' | 'dentist';

export interface InfrastructureItem {
  id: string;
  type: InfrastructureType;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface ApartmentPlan {
  id: string;
  rooms: number;
  area: number;
  price: string;
  image: string;
  floor?: string;
  number?: string;
}

export interface ProjectFeature {
  id?: string;
  title: string;
  description: string;
  icon: string;
}

export interface PromoOffer {
  id: string;
  title: string;
  description: string;
  discount?: string;
  image: string;
  popupImage?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  tags: string[];
  heroImage: string;
  gallery: string[];
  galleryImages?: GalleryImage[];
  galleryCategories?: GalleryCategory[];
  features: ProjectFeature[];
  plans: ApartmentPlan[];
  promos: PromoOffer[];
  infrastructure: InfrastructureItem[];
  colorTheme: string;
  totalFloors?: number;
  timeline?: ProjectTimelineItem[];
  constructionUpdates?: ConstructionUpdate[];
  streamUrl?: string;
  yandexMapUrl?: string;
  // Card display fields
  cardPrice?: string;      // e.g. "от 3.9 млн ₽"
  cardPromo?: string;      // e.g. "Материнский капитал"
}

export interface ProjectTimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface ConstructionUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  photos: string[];
}

// News
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
}

// FAQ
export interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  name: string;
  questions: FaqQuestion[];
}

// Team
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

// Vacancy
export interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
}

// Page SEO settings (editable in admin)
export interface PageSettings {
  path: string;
  title: string;
  description: string;
  h1: string;
}

// Home page content (editable in admin)
export interface HomePagePromo {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
}

export interface HomePageContent {
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroImage: string;
  heroButtonText: string;
  promos: HomePagePromo[];
  // Hero styling options
  heroTitleFontSize?: string;   // e.g. "120px" or "8rem"
  heroTitleLineHeight?: string; // e.g. "0.9" or "1.1"
  // About section (after "Наши проекты")
  aboutTitle?: string;
  aboutText1?: string;
  aboutText2?: string;
  aboutImage?: string;
  aboutStat1Value?: string;
  aboutStat1Label?: string;
  aboutStat2Value?: string;
  aboutStat2Label?: string;
}

// Site settings (logo, contacts, etc.)
export interface SiteSettings {
  logoUrl: string;           // URL изображения логотипа
  faviconUrl: string;        // URL фавикона (ICO, PNG 32x32 или 16x16)
  companyName: string;       // Название компании (используется в копирайте)
  companySubtitle: string;   // Подпись под названием (не отображается если есть логотип)
  phone: string;             // Телефон
  email: string;             // Email
  address: string;           // Адрес
  // Analytics
  yandexMetrikaId?: string;     // ID счётчика Яндекс.Метрики (также включает Вебвизор)
  yandexDirectId?: string;      // ID кампании Яндекс.Директ
  calltouchModId?: string;      // Mod ID для Calltouch
  calltouchRoutKey?: string;    // routKey для Calltouch
}

// Project filters (editable in admin)
export interface ProjectFilter {
  id: string;
  name: string;
  slug: string;
}

// Global promotions (displayed in header menu and main page)
export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount?: string;
  image: string;
  showOnMain: boolean;
  showInHeader: boolean;
  active: boolean;
}

// Investors page content
export interface InvestorsContent {
  heroTitle: string;
  heroSubtitle: string;
  stats: { value: string; label: string }[];
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutImage: string;
  documents: { id: string; name: string; size: string; type: string; url: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaEmail: string;
}

// About page content
export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  stats: { value: string; label: string; icon: string }[];
  missionTitle: string;
  missionText1: string;
  missionText2: string;
  missionText3: string;
  missionImage: string;
  values: { title: string; description: string }[];
  ctaTitle: string;
  ctaText: string;
}

// Contacts page content
export interface ContactsContent {
  heroTitle: string;
  heroSubtitle: string;
  offices: {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
  }[];
  hotlinePhone: string;
  hotlineText: string;
  yandexMapCoords?: string; // "lat,lng" format
  yandexMapZoom?: number;
  messengers: {
    telegram?: string;
    vk?: string;
    whatsapp?: string;
  };
}

// Buy methods content
export interface BuyMethodContent {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  heroTitle: string;
  heroSubtitle: string;
  features: { title: string; description: string }[];
  howItWorks: { step: number; title: string; description: string }[];
  ctaTitle: string;
  ctaText: string;
}

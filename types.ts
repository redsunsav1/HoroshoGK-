export type InfrastructureType = 'school' | 'kindergarten' | 'shop' | 'pharmacy' | 'gym' | 'dentist';

export interface InfrastructureItem {
  id: string;
  type: InfrastructureType;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export type ApartmentStatus = 'available' | 'reserved' | 'sold';

export interface ApartmentPlan {
  id: string;
  rooms: number;
  area: number;
  price: string;
  image: string;
  floor?: number;
  number?: string;
  status?: ApartmentStatus;
}

export interface ProjectFeature {
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
  features: ProjectFeature[];
  plans: ApartmentPlan[];
  promos: PromoOffer[];
  infrastructure: InfrastructureItem[];
  colorTheme: string;
  totalFloors?: number;
  timeline?: ProjectTimelineItem[];
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
}

// Project filters (editable in admin)
export interface ProjectFilter {
  id: string;
  name: string;
  slug: string;
}

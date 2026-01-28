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
  rooms: number; // 0 for studio
  area: number;
  price: string;
  image: string;
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
  colorTheme: string; // Hex for accent
}
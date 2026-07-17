import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
  Project, NewsItem, FaqCategory, TeamMember, Vacancy,
  PageSettings, HomePageContent, SiteSettings, ProjectFilter,
  Promotion, InvestorsContent, AboutContent, ContactsContent, BuyMethodContent
} from '../types';
import {
  PROJECTS as INITIAL_PROJECTS,
  NEWS as INITIAL_NEWS,
  FAQ_CATEGORIES as INITIAL_FAQ,
  TEAM as INITIAL_TEAM,
  VACANCIES as INITIAL_VACANCIES,
  PAGE_SETTINGS as INITIAL_PAGE_SETTINGS,
  HOME_PAGE_CONTENT as INITIAL_HOME_CONTENT,
  SITE_SETTINGS as INITIAL_SITE_SETTINGS,
  PROJECT_FILTERS as INITIAL_PROJECT_FILTERS,
  PROMOTIONS as INITIAL_PROMOTIONS,
  INVESTORS_CONTENT as INITIAL_INVESTORS_CONTENT,
  ABOUT_CONTENT as INITIAL_ABOUT_CONTENT,
  CONTACTS_CONTENT as INITIAL_CONTACTS_CONTENT,
  BUY_METHODS as INITIAL_BUY_METHODS
} from '../constants';
import { hasManualNewsOrder, removeManualNewsOrder, sortNewsItems } from '../utils/news';

// API URL - will be same origin in production
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

const EMPTY_HOME_CONTENT: HomePageContent = {
  heroTitle1: '',
  heroTitle2: '',
  heroSubtitle: '',
  heroImage: '',
  heroButtonText: '',
  promos: [],
};

const EMPTY_SITE_SETTINGS: SiteSettings = {
  logoUrl: '',
  faviconUrl: '',
  companyName: '',
  companySubtitle: '',
  phone: '',
  email: '',
  address: '',
};

const EMPTY_INVESTORS_CONTENT: InvestorsContent = {
  heroTitle: '',
  heroSubtitle: '',
  stats: [],
  aboutTitle: '',
  aboutText1: '',
  aboutText2: '',
  aboutImage: '',
  documents: [],
  ctaTitle: '',
  ctaText: '',
  ctaEmail: '',
};

const EMPTY_ABOUT_CONTENT: AboutContent = {
  heroTitle: '',
  heroSubtitle: '',
  heroImage: '',
  stats: [],
  missionTitle: '',
  missionText1: '',
  missionText2: '',
  missionText3: '',
  missionImage: '',
  values: [],
  ctaTitle: '',
  ctaText: '',
};

const EMPTY_CONTACTS_CONTENT: ContactsContent = {
  heroTitle: '',
  heroSubtitle: '',
  offices: [],
  hotlinePhone: '',
  hotlineText: '',
  messengers: {},
};

interface PublicBootstrap {
  projects: Project[];
  news: NewsItem[];
  faq: FaqCategory[];
  team: TeamMember[];
  vacancies: Vacancy[];
  pageSettings: PageSettings[];
  homeContent: HomePageContent;
  siteSettings: SiteSettings;
  projectFilters: ProjectFilter[];
  promotions: Promotion[];
  investorsContent: InvestorsContent;
  aboutContent: AboutContent;
  contactsContent: ContactsContent;
  buyMethods: BuyMethodContent[];
  generatedAt?: string;
}

const BOOTSTRAP_CACHE_KEY = 'horoshogk-public-bootstrap-v1';

const isUsableBootstrap = (data: unknown): data is PublicBootstrap => {
  if (!data || typeof data !== 'object') return false;
  const value = data as Partial<PublicBootstrap>;
  return Boolean(value.homeContent && value.siteSettings);
};

const readBootstrapCache = (): PublicBootstrap | null => {
  try {
    const raw = window.localStorage.getItem(BOOTSTRAP_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isUsableBootstrap(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const writeBootstrapCache = (data: PublicBootstrap) => {
  try {
    window.localStorage.setItem(BOOTSTRAP_CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Public data cache is unavailable:', error);
  }
};

const wait = (delayMs: number) => new Promise(resolve => window.setTimeout(resolve, delayMs));

const PublicDataStatusScreen: React.FC<{
  loading: boolean;
  onRetry: () => void;
}> = ({ loading, onRetry }) => (
  <main className="min-h-screen bg-white px-6 text-primary flex items-center justify-center">
    <section className="w-full max-w-md text-center" aria-live="polite">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
        {loading ? (
          <span
            className="h-8 w-8 animate-spin rounded-full border-2 border-accent/25 border-t-accent"
            aria-hidden="true"
          />
        ) : (
          <span className="text-2xl font-semibold text-accent" aria-hidden="true">!</span>
        )}
      </div>
      <h1 className="text-2xl font-semibold">
        {loading ? 'Загружаем сайт' : 'Не удалось загрузить сайт'}
      </h1>
      <p className="mt-3 text-sm leading-6 text-primary/65">
        {loading
          ? 'Это может занять несколько секунд при нестабильном соединении.'
          : 'Проверьте соединение и попробуйте ещё раз. Если сеть кратковременно недоступна, сайт восстановится после повторной попытки.'}
      </p>
      {!loading && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-7 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Попробовать снова
        </button>
      )}
    </section>
  </main>
);

interface DataContextType {
  // Projects
  projects: Project[];
  loading: boolean;
  error: string | null;
  updateProject: (project: Project) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // News
  news: NewsItem[];
  addNews: (item: NewsItem) => Promise<void>;
  updateNews: (item: NewsItem) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  updateNewsOrder: (items: NewsItem[]) => Promise<void>;
  resetNewsOrder: () => Promise<void>;

  // FAQ
  faqCategories: FaqCategory[];
  updateFaqCategories: (categories: FaqCategory[]) => Promise<void>;

  // Team
  team: TeamMember[];
  addTeamMember: (member: TeamMember) => Promise<void>;
  updateTeamMember: (member: TeamMember) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  // Vacancies
  vacancies: Vacancy[];
  addVacancy: (vacancy: Vacancy) => Promise<void>;
  updateVacancy: (vacancy: Vacancy) => Promise<void>;
  deleteVacancy: (id: string) => Promise<void>;

  // Page Settings
  pageSettings: PageSettings[];
  updatePageSettings: (settings: PageSettings[]) => Promise<void>;
  getPageSettings: (path: string) => PageSettings | undefined;

  // Home Content
  homePageContent: HomePageContent;
  updateHomePageContent: (content: HomePageContent) => Promise<void>;

  // Site Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: SiteSettings) => Promise<void>;

  // Project Filters
  projectFilters: ProjectFilter[];
  updateProjectFilters: (filters: ProjectFilter[]) => Promise<void>;

  // Promotions
  promotions: Promotion[];
  updatePromotions: (promotions: Promotion[]) => Promise<void>;

  // Investors Content
  investorsContent: InvestorsContent;
  updateInvestorsContent: (content: InvestorsContent) => Promise<void>;

  // About Content
  aboutContent: AboutContent;
  updateAboutContent: (content: AboutContent) => Promise<void>;

  // Contacts Content
  contactsContent: ContactsContent;
  updateContactsContent: (content: ContactsContent) => Promise<void>;

  // Buy Methods
  buyMethods: BuyMethodContent[];
  updateBuyMethods: (methods: BuyMethodContent[]) => Promise<void>;

  // Utils
  resetData: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const fetchJson = async (url: string, timeoutMs = 8000, attempts = 3) => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}: ${url}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await wait(400 * attempt);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(`Request failed: ${url}`);
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [cachedBootstrap] = useState<PublicBootstrap | null>(() => readBootstrapCache());
  const [projects, setProjects] = useState<Project[]>(cachedBootstrap?.projects ?? []);
  const [news, setNews] = useState<NewsItem[]>(sortNewsItems(cachedBootstrap?.news ?? []));
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>(cachedBootstrap?.faq ?? []);
  const [team, setTeam] = useState<TeamMember[]>(cachedBootstrap?.team ?? []);
  const [vacancies, setVacancies] = useState<Vacancy[]>(cachedBootstrap?.vacancies ?? []);
  const [pageSettings, setPageSettings] = useState<PageSettings[]>(cachedBootstrap?.pageSettings ?? []);
  const [homePageContent, setHomePageContent] = useState<HomePageContent>(cachedBootstrap?.homeContent ?? EMPTY_HOME_CONTENT);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(cachedBootstrap?.siteSettings ?? EMPTY_SITE_SETTINGS);
  const [projectFilters, setProjectFilters] = useState<ProjectFilter[]>(cachedBootstrap?.projectFilters ?? []);
  const [promotions, setPromotions] = useState<Promotion[]>(cachedBootstrap?.promotions ?? []);
  const [investorsContent, setInvestorsContent] = useState<InvestorsContent>(cachedBootstrap?.investorsContent ?? EMPTY_INVESTORS_CONTENT);
  const [aboutContent, setAboutContent] = useState<AboutContent>(cachedBootstrap?.aboutContent ?? EMPTY_ABOUT_CONTENT);
  const [contactsContent, setContactsContent] = useState<ContactsContent>(cachedBootstrap?.contactsContent ?? EMPTY_CONTACTS_CONTENT);
  const [buyMethods, setBuyMethods] = useState<BuyMethodContent[]>(cachedBootstrap?.buyMethods ?? []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publicDataReady, setPublicDataReady] = useState(Boolean(cachedBootstrap));

  // Fetch all data from API
  const fetchAllData = useCallback(async () => {
    const migrateGallery = (projects: Project[]): Project[] =>
      projects.map(p => {
        if (p.gallery?.length > 0 && (!p.galleryImages || p.galleryImages.length === 0)) {
          return {
            ...p,
            galleryImages: p.gallery.map((url: string, i: number) => ({
              id: `migrated-${i}-${Date.now()}`,
              url,
              category: 'all',
            })),
          };
        }
        return p;
      });

    const applyData = (url: string, data: any, setter: (data: any) => void) => {
      if (data == null) return;
      if (url.endsWith('/projects') && Array.isArray(data)) {
        setter(migrateGallery(data));
        return;
      }
      setter(url.endsWith('/news') && Array.isArray(data) ? sortNewsItems(data) : data);
    };

    const applyBootstrap = (data: PublicBootstrap) => {
      const normalized: PublicBootstrap = {
        projects: migrateGallery(Array.isArray(data.projects) ? data.projects : []),
        news: sortNewsItems(Array.isArray(data.news) ? data.news : []),
        faq: Array.isArray(data.faq) ? data.faq : [],
        team: Array.isArray(data.team) ? data.team : [],
        vacancies: Array.isArray(data.vacancies) ? data.vacancies : [],
        pageSettings: Array.isArray(data.pageSettings) ? data.pageSettings : [],
        homeContent: data.homeContent,
        siteSettings: data.siteSettings,
        projectFilters: Array.isArray(data.projectFilters) ? data.projectFilters : [],
        promotions: Array.isArray(data.promotions) ? data.promotions : [],
        investorsContent: data.investorsContent ?? EMPTY_INVESTORS_CONTENT,
        aboutContent: data.aboutContent ?? EMPTY_ABOUT_CONTENT,
        contactsContent: data.contactsContent ?? EMPTY_CONTACTS_CONTENT,
        buyMethods: Array.isArray(data.buyMethods) ? data.buyMethods : [],
        generatedAt: data.generatedAt,
      };

      setProjects(normalized.projects);
      setNews(normalized.news);
      setFaqCategories(normalized.faq);
      setTeam(normalized.team);
      setVacancies(normalized.vacancies);
      setPageSettings(normalized.pageSettings);
      setHomePageContent(normalized.homeContent);
      setSiteSettings(normalized.siteSettings);
      setProjectFilters(normalized.projectFilters);
      setPromotions(normalized.promotions);
      setInvestorsContent(normalized.investorsContent);
      setAboutContent(normalized.aboutContent);
      setContactsContent(normalized.contactsContent);
      setBuyMethods(normalized.buyMethods);
      writeBootstrapCache(normalized);
    };

    try {
      setLoading(true);
      setError(null);

      try {
        const bootstrap = await fetchJson(`${API_URL}/bootstrap`, 6000, 2);
        if (!isUsableBootstrap(bootstrap)) {
          throw new Error('Public bootstrap returned incomplete data');
        }

        applyBootstrap(bootstrap);
        setPublicDataReady(true);
        return;
      } catch (bootstrapError) {
        // Compatibility path for a staggered deployment where the new endpoint
        // is not available yet. It also gives individual requests a chance to
        // succeed if an intermediary interrupted the combined response.
        console.warn('Public bootstrap unavailable, using legacy endpoints:', bootstrapError);
      }

      const endpoints = [
        { key: 'projects', url: `${API_URL}/projects`, setter: setProjects },
        { key: 'news', url: `${API_URL}/news`, setter: setNews },
        { key: 'faq', url: `${API_URL}/faq`, setter: setFaqCategories },
        { key: 'team', url: `${API_URL}/team`, setter: setTeam },
        { key: 'vacancies', url: `${API_URL}/vacancies`, setter: setVacancies },
        { key: 'pageSettings', url: `${API_URL}/page-settings`, setter: setPageSettings },
        { key: 'homeContent', url: `${API_URL}/home-content`, setter: setHomePageContent, required: true },
        { key: 'siteSettings', url: `${API_URL}/site-settings`, setter: setSiteSettings, required: true },
        { key: 'projectFilters', url: `${API_URL}/project-filters`, setter: setProjectFilters },
        { key: 'promotions', url: `${API_URL}/promotions`, setter: setPromotions },
        { key: 'investorsContent', url: `${API_URL}/investors-content`, setter: setInvestorsContent },
        { key: 'aboutContent', url: `${API_URL}/about-content`, setter: setAboutContent },
        { key: 'contactsContent', url: `${API_URL}/contacts-content`, setter: setContactsContent },
        { key: 'buyMethods', url: `${API_URL}/buy-methods`, setter: setBuyMethods },
      ];

      const results = await Promise.allSettled(endpoints.map(async ({ key, url, setter, required }) => {
        const data = await fetchJson(url, required ? 6000 : 5000, required ? 2 : 1);
        if (data == null) {
          if (required) throw new Error(`Required endpoint returned no data: ${url}`);
          return { key, url, loaded: false, data: null };
        }
        applyData(url, data, setter);
        return { key, url, loaded: true, data };
      }));

      const requiredEndpoints = endpoints.filter(endpoint => endpoint.required).map(endpoint => endpoint.url);
      const loadedRequiredEndpoints = new Set(
        results
          .filter((result): result is PromiseFulfilledResult<{ key: string; url: string; loaded: boolean; data: any }> => result.status === 'fulfilled')
          .filter(result => result.value.loaded)
          .map(result => result.value.url)
      );
      const hasRequiredData = requiredEndpoints.every(url => loadedRequiredEndpoints.has(url));

      if (!hasRequiredData) {
        console.error('Required public data unavailable:', results);
        setError('Required public data unavailable');
        setPublicDataReady(current => current);
        return;
      }

      const fulfilledResults = results.filter(
        (result): result is PromiseFulfilledResult<{ key: string; url: string; loaded: boolean; data: any }> =>
          result.status === 'fulfilled' && result.value.loaded,
      );

      if (fulfilledResults.length === endpoints.length) {
        const legacyData = Object.fromEntries(
          fulfilledResults.map(result => [result.value.key, result.value.data]),
        ) as unknown as PublicBootstrap;
        applyBootstrap(legacyData);
      }

      setPublicDataReady(true);
    } catch (err) {
      console.error('API Error:', err);
      setError('Required public data unavailable');
      setPublicDataReady(current => current);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // --- Projects ---
  const updateProject = async (updatedProject: Project) => {
    const response = await fetch(`${API_URL}/projects/${updatedProject.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    });
    if (!response.ok) throw new Error('Failed to update project');
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const addProject = async (newProject: Project) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    });
    if (!response.ok) throw new Error('Failed to add project');
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = async (id: string) => {
    const response = await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete project');
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // --- News ---
  const addNews = async (item: NewsItem) => {
    const savedItem = hasManualNewsOrder(news) ? { ...item, sortOrder: -1 } : item;
    const response = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(savedItem),
    });
    if (!response.ok) throw new Error('Failed to add news');
    setNews(prev => sortNewsItems([...prev, savedItem]));
  };

  const updateNews = async (item: NewsItem) => {
    const updated = news.map(n => n.id === item.id ? item : n);
    const response = await fetch(`${API_URL}/news`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error('Failed to update news');
    setNews(sortNewsItems(updated));
  };

  const deleteNews = async (id: string) => {
    const response = await fetch(`${API_URL}/news/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete news');
    setNews(prev => sortNewsItems(prev.filter(n => n.id !== id)));
  };

  const updateNewsOrder = async (items: NewsItem[]) => {
    const ordered = items.map((item, index) => ({ ...item, sortOrder: index }));
    const response = await fetch(`${API_URL}/news`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ordered),
    });
    if (!response.ok) throw new Error('Failed to update news order');
    setNews(sortNewsItems(ordered));
  };

  const resetNewsOrder = async () => {
    const orderedByDate = removeManualNewsOrder(news);
    const response = await fetch(`${API_URL}/news`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderedByDate),
    });
    if (!response.ok) throw new Error('Failed to reset news order');
    setNews(orderedByDate);
  };

  // --- FAQ ---
  const updateFaqCategories = async (categories: FaqCategory[]) => {
    const response = await fetch(`${API_URL}/faq`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories),
    });
    if (!response.ok) throw new Error('Failed to update FAQ');
    setFaqCategories(categories);
  };

  // --- Team ---
  const addTeamMember = async (member: TeamMember) => {
    const updated = [...team, member];
    const response = await fetch(`${API_URL}/team`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error('Failed to add team member');
    setTeam(updated);
  };

  const updateTeamMember = async (member: TeamMember) => {
    const updated = team.map(t => t.id === member.id ? member : t);
    const response = await fetch(`${API_URL}/team`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error('Failed to update team member');
    setTeam(updated);
  };

  const deleteTeamMember = async (id: string) => {
    const updated = team.filter(t => t.id !== id);
    const response = await fetch(`${API_URL}/team`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error('Failed to delete team member');
    setTeam(updated);
  };

  // --- Vacancies ---
  const addVacancy = async (vacancy: Vacancy) => {
    const updated = [...vacancies, vacancy];
    const response = await fetch(`${API_URL}/vacancies`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error('Failed to add vacancy');
    setVacancies(updated);
  };

  const updateVacancy = async (vacancy: Vacancy) => {
    const updated = vacancies.map(v => v.id === vacancy.id ? vacancy : v);
    const response = await fetch(`${API_URL}/vacancies`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error('Failed to update vacancy');
    setVacancies(updated);
  };

  const deleteVacancy = async (id: string) => {
    const updated = vacancies.filter(v => v.id !== id);
    const response = await fetch(`${API_URL}/vacancies`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error('Failed to delete vacancy');
    setVacancies(updated);
  };

  // --- Page Settings ---
  const updatePageSettings = async (settings: PageSettings[]) => {
    const response = await fetch(`${API_URL}/page-settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error('Failed to update page settings');
    setPageSettings(settings);
  };

  const getPageSettings = (path: string) => {
    return pageSettings.find(s => s.path === path);
  };

  // --- Home Content ---
  const updateHomePageContent = async (content: HomePageContent) => {
    const response = await fetch(`${API_URL}/home-content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    if (!response.ok) throw new Error('Failed to update home content');
    setHomePageContent(content);
  };

  // --- Site Settings ---
  const updateSiteSettings = async (settings: SiteSettings) => {
    const response = await fetch(`${API_URL}/site-settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error('Failed to update site settings');
    setSiteSettings(settings);
  };

  // --- Project Filters ---
  const updateProjectFilters = async (filters: ProjectFilter[]) => {
    const response = await fetch(`${API_URL}/project-filters`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    });
    if (!response.ok) throw new Error('Failed to update project filters');
    setProjectFilters(filters);
  };

  // --- Promotions ---
  const updatePromotions = async (promos: Promotion[]) => {
    const response = await fetch(`${API_URL}/promotions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promos),
    });
    if (!response.ok) throw new Error('Failed to update promotions');
    setPromotions(promos);
  };

  // --- Investors Content ---
  const updateInvestorsContent = async (content: InvestorsContent) => {
    const response = await fetch(`${API_URL}/investors-content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    if (!response.ok) throw new Error('Failed to update investors content');
    setInvestorsContent(content);
  };

  // --- About Content ---
  const updateAboutContent = async (content: AboutContent) => {
    const response = await fetch(`${API_URL}/about-content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    if (!response.ok) throw new Error('Failed to update about content');
    setAboutContent(content);
  };

  // --- Contacts Content ---
  const updateContactsContent = async (content: ContactsContent) => {
    const response = await fetch(`${API_URL}/contacts-content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    if (!response.ok) throw new Error('Failed to update contacts content');
    setContactsContent(content);
  };

  // --- Buy Methods ---
  const updateBuyMethods = async (methods: BuyMethodContent[]) => {
    const response = await fetch(`${API_URL}/buy-methods`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(methods),
    });
    if (!response.ok) throw new Error('Failed to update buy methods');
    setBuyMethods(methods);
  };

  // --- Utils ---
  const resetData = async () => {
    if (confirm('Вы уверены? Все ваши изменения будут удалены и вернутся исходные данные.')) {
      // Reset all data to initial values
      await Promise.all([
        fetch(`${API_URL}/reset`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projects: INITIAL_PROJECTS }) }),
        fetch(`${API_URL}/news`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_NEWS) }),
        fetch(`${API_URL}/faq`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_FAQ) }),
        fetch(`${API_URL}/team`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_TEAM) }),
        fetch(`${API_URL}/vacancies`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_VACANCIES) }),
        fetch(`${API_URL}/page-settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_PAGE_SETTINGS) }),
        fetch(`${API_URL}/home-content`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_HOME_CONTENT) }),
        fetch(`${API_URL}/site-settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_SITE_SETTINGS) }),
        fetch(`${API_URL}/project-filters`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_PROJECT_FILTERS) }),
        fetch(`${API_URL}/promotions`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_PROMOTIONS) }),
        fetch(`${API_URL}/investors-content`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_INVESTORS_CONTENT) }),
        fetch(`${API_URL}/about-content`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_ABOUT_CONTENT) }),
        fetch(`${API_URL}/contacts-content`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_CONTACTS_CONTENT) }),
        fetch(`${API_URL}/buy-methods`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(INITIAL_BUY_METHODS) }),
      ]);

      // Reset local state
      setProjects(INITIAL_PROJECTS);
      setNews(sortNewsItems(INITIAL_NEWS));
      setFaqCategories(INITIAL_FAQ);
      setTeam(INITIAL_TEAM);
      setVacancies(INITIAL_VACANCIES);
      setPageSettings(INITIAL_PAGE_SETTINGS);
      setHomePageContent(INITIAL_HOME_CONTENT);
      setSiteSettings(INITIAL_SITE_SETTINGS);
      setProjectFilters(INITIAL_PROJECT_FILTERS);
      setPromotions(INITIAL_PROMOTIONS);
      setInvestorsContent(INITIAL_INVESTORS_CONTENT);
      setAboutContent(INITIAL_ABOUT_CONTENT);
      setContactsContent(INITIAL_CONTACTS_CONTENT);
      setBuyMethods(INITIAL_BUY_METHODS);
    }
  };

  const refreshData = async () => {
    await fetchAllData();
  };

  if (!publicDataReady) {
    return <PublicDataStatusScreen loading={loading} onRetry={fetchAllData} />;
  }

  return (
    <DataContext.Provider value={{
      // Projects
      projects,
      loading,
      error,
      updateProject,
      addProject,
      deleteProject,

      // News
      news,
      addNews,
      updateNews,
      deleteNews,
      updateNewsOrder,
      resetNewsOrder,

      // FAQ
      faqCategories,
      updateFaqCategories,

      // Team
      team,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,

      // Vacancies
      vacancies,
      addVacancy,
      updateVacancy,
      deleteVacancy,

      // Page Settings
      pageSettings,
      updatePageSettings,
      getPageSettings,

      // Home Content
      homePageContent,
      updateHomePageContent,

      // Site Settings
      siteSettings,
      updateSiteSettings,

      // Project Filters
      projectFilters,
      updateProjectFilters,

      // Promotions
      promotions,
      updatePromotions,

      // Investors Content
      investorsContent,
      updateInvestorsContent,

      // About Content
      aboutContent,
      updateAboutContent,

      // Contacts Content
      contactsContent,
      updateContactsContent,

      // Buy Methods
      buyMethods,
      updateBuyMethods,

      // Utils
      resetData,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

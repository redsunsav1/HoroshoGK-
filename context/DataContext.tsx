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

const fetchJson = async (url: string, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [pageSettings, setPageSettings] = useState<PageSettings[]>([]);
  const [homePageContent, setHomePageContent] = useState<HomePageContent>(EMPTY_HOME_CONTENT);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(EMPTY_SITE_SETTINGS);
  const [projectFilters, setProjectFilters] = useState<ProjectFilter[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [investorsContent, setInvestorsContent] = useState<InvestorsContent>(EMPTY_INVESTORS_CONTENT);
  const [aboutContent, setAboutContent] = useState<AboutContent>(EMPTY_ABOUT_CONTENT);
  const [contactsContent, setContactsContent] = useState<ContactsContent>(EMPTY_CONTACTS_CONTENT);
  const [buyMethods, setBuyMethods] = useState<BuyMethodContent[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publicDataReady, setPublicDataReady] = useState(false);

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
      setter(url.endsWith('/projects') && Array.isArray(data) ? migrateGallery(data) : data);
    };

    try {
      setLoading(true);
      setError(null);
      setPublicDataReady(false);

      const endpoints = [
        { url: `${API_URL}/projects`, setter: setProjects },
        { url: `${API_URL}/news`, setter: setNews },
        { url: `${API_URL}/faq`, setter: setFaqCategories },
        { url: `${API_URL}/team`, setter: setTeam },
        { url: `${API_URL}/vacancies`, setter: setVacancies },
        { url: `${API_URL}/page-settings`, setter: setPageSettings },
        { url: `${API_URL}/home-content`, setter: setHomePageContent, required: true },
        { url: `${API_URL}/site-settings`, setter: setSiteSettings, required: true },
        { url: `${API_URL}/project-filters`, setter: setProjectFilters },
        { url: `${API_URL}/promotions`, setter: setPromotions },
        { url: `${API_URL}/investors-content`, setter: setInvestorsContent },
        { url: `${API_URL}/about-content`, setter: setAboutContent },
        { url: `${API_URL}/contacts-content`, setter: setContactsContent },
        { url: `${API_URL}/buy-methods`, setter: setBuyMethods },
      ];

      const results = await Promise.allSettled(endpoints.map(async ({ url, setter, required }) => {
        const data = await fetchJson(url, required ? 5000 : 6000);
        if (data == null) {
          if (required) throw new Error(`Required endpoint returned no data: ${url}`);
          return { url, loaded: false };
        }
        applyData(url, data, setter);
        return { url, loaded: true };
      }));

      const requiredEndpoints = endpoints.filter(endpoint => endpoint.required).map(endpoint => endpoint.url);
      const loadedRequiredEndpoints = new Set(
        results
          .filter((result): result is PromiseFulfilledResult<{ url: string; loaded: boolean }> => result.status === 'fulfilled')
          .filter(result => result.value.loaded)
          .map(result => result.value.url)
      );
      const hasRequiredData = requiredEndpoints.every(url => loadedRequiredEndpoints.has(url));

      if (!hasRequiredData) {
        console.error('Required public data unavailable:', results);
        setError('Required public data unavailable');
      }
      setPublicDataReady(hasRequiredData);
    } catch (err) {
      console.error('API Error:', err);
      setError('Required public data unavailable');
      setPublicDataReady(false);
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
    const response = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to add news');
    setNews(prev => [...prev, item]);
  };

  const updateNews = async (item: NewsItem) => {
    const updated = news.map(n => n.id === item.id ? item : n);
    const response = await fetch(`${API_URL}/news`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!response.ok) throw new Error('Failed to update news');
    setNews(updated);
  };

  const deleteNews = async (id: string) => {
    const response = await fetch(`${API_URL}/news/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete news');
    setNews(prev => prev.filter(n => n.id !== id));
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
      setNews(INITIAL_NEWS);
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

  if (loading || !publicDataReady) return null;

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

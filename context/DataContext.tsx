import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
  Project, NewsItem, FaqCategory, TeamMember, Vacancy,
  PageSettings, HomePageContent, SiteSettings, ProjectFilter
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
  PROJECT_FILTERS as INITIAL_PROJECT_FILTERS
} from '../constants';

// API URL - will be same origin in production
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

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

  // Utils
  resetData: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>(INITIAL_FAQ);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [vacancies, setVacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const [pageSettings, setPageSettings] = useState<PageSettings[]>(INITIAL_PAGE_SETTINGS);
  const [homePageContent, setHomePageContent] = useState<HomePageContent>(INITIAL_HOME_CONTENT);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [projectFilters, setProjectFilters] = useState<ProjectFilter[]>(INITIAL_PROJECT_FILTERS);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data from API
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoints = [
        { url: `${API_URL}/projects`, setter: setProjects, initial: INITIAL_PROJECTS },
        { url: `${API_URL}/news`, setter: setNews, initial: INITIAL_NEWS },
        { url: `${API_URL}/faq`, setter: setFaqCategories, initial: INITIAL_FAQ },
        { url: `${API_URL}/team`, setter: setTeam, initial: INITIAL_TEAM },
        { url: `${API_URL}/vacancies`, setter: setVacancies, initial: INITIAL_VACANCIES },
        { url: `${API_URL}/page-settings`, setter: setPageSettings, initial: INITIAL_PAGE_SETTINGS },
        { url: `${API_URL}/home-content`, setter: setHomePageContent, initial: INITIAL_HOME_CONTENT },
        { url: `${API_URL}/site-settings`, setter: setSiteSettings, initial: INITIAL_SITE_SETTINGS },
        { url: `${API_URL}/project-filters`, setter: setProjectFilters, initial: INITIAL_PROJECT_FILTERS },
      ];

      await Promise.all(endpoints.map(async ({ url, setter, initial }) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            // Only use API data if it's not empty/null
            if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
              setter(data);
            }
          }
        } catch (err) {
          console.warn(`Failed to fetch ${url}, using defaults`);
        }
      }));

    } catch (err) {
      console.error('API Error:', err);
      setError('API not available, using local data');
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
    }
  };

  const refreshData = async () => {
    await fetchAllData();
  };

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

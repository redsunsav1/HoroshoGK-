import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Project, NewsItem, FaqCategory, TeamMember, Vacancy } from '../types';
import {
  PROJECTS as INITIAL_PROJECTS,
  NEWS as INITIAL_NEWS,
  FAQ_CATEGORIES as INITIAL_FAQ,
  TEAM as INITIAL_TEAM,
  VACANCIES as INITIAL_VACANCIES,
} from '../constants';

interface AllData {
  projects: Project[];
  news: NewsItem[];
  faqCategories: FaqCategory[];
  team: TeamMember[];
  vacancies: Vacancy[];
}

interface DataContextType {
  // Projects
  projects: Project[];
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  // News
  news: NewsItem[];
  updateNews: (item: NewsItem) => void;
  addNews: (item: NewsItem) => void;
  deleteNews: (id: string) => void;
  // FAQ
  faqCategories: FaqCategory[];
  updateFaqCategories: (categories: FaqCategory[]) => void;
  // Team
  team: TeamMember[];
  updateTeamMember: (member: TeamMember) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  // Vacancies
  vacancies: Vacancy[];
  updateVacancy: (vacancy: Vacancy) => void;
  addVacancy: (vacancy: Vacancy) => void;
  deleteVacancy: (id: string) => void;
  // Reset
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_BASE = '/api';

async function fetchServerData(): Promise<AllData | null> {
  try {
    const res = await fetch(`${API_BASE}/data`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // API not available — offline mode
  }
  return null;
}

async function saveServerData(data: AllData): Promise<void> {
  try {
    await fetch(`${API_BASE}/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    // API not available — changes only in localStorage
  }
}

function loadFromStorage<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage('horosho_projects', INITIAL_PROJECTS));
  const [news, setNews] = useState<NewsItem[]>(() => loadFromStorage('horosho_news', INITIAL_NEWS));
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>(() => loadFromStorage('horosho_faq', INITIAL_FAQ));
  const [team, setTeam] = useState<TeamMember[]>(() => loadFromStorage('horosho_team', INITIAL_TEAM));
  const [vacancies, setVacancies] = useState<Vacancy[]>(() => loadFromStorage('horosho_vacancies', INITIAL_VACANCIES));
  const [loaded, setLoaded] = useState(false);

  // Load from server on mount
  useEffect(() => {
    fetchServerData().then((data) => {
      if (data) {
        if (data.projects?.length) setProjects(data.projects);
        if (data.news?.length) setNews(data.news);
        if (data.faqCategories?.length) setFaqCategories(data.faqCategories);
        if (data.team?.length) setTeam(data.team);
        if (data.vacancies?.length) setVacancies(data.vacancies);
      }
      setLoaded(true);
    });
  }, []);

  // Debounced save to server + localStorage
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  const saveAll = useCallback((p: Project[], n: NewsItem[], f: FaqCategory[], t: TeamMember[], v: Vacancy[]) => {
    // Always save to localStorage immediately
    localStorage.setItem('horosho_projects', JSON.stringify(p));
    localStorage.setItem('horosho_news', JSON.stringify(n));
    localStorage.setItem('horosho_faq', JSON.stringify(f));
    localStorage.setItem('horosho_team', JSON.stringify(t));
    localStorage.setItem('horosho_vacancies', JSON.stringify(v));

    // Debounce server save (500ms)
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveServerData({ projects: p, news: n, faqCategories: f, team: t, vacancies: v });
    }, 500);
  }, []);

  // Save on every change (after initial load)
  useEffect(() => {
    if (loaded) {
      saveAll(projects, news, faqCategories, team, vacancies);
    }
  }, [projects, news, faqCategories, team, vacancies, loaded, saveAll]);

  // Projects CRUD
  const updateProject = (p: Project) => setProjects(prev => prev.map(x => x.id === p.id ? p : x));
  const addProject = (p: Project) => setProjects(prev => [...prev, p]);
  const deleteProject = (id: string) => setProjects(prev => prev.filter(x => x.id !== id));

  // News CRUD
  const updateNews = (item: NewsItem) => setNews(prev => prev.map(x => x.id === item.id ? item : x));
  const addNews = (item: NewsItem) => setNews(prev => [item, ...prev]);
  const deleteNews = (id: string) => setNews(prev => prev.filter(x => x.id !== id));

  // FAQ
  const updateFaqCategories = (categories: FaqCategory[]) => setFaqCategories(categories);

  // Team CRUD
  const updateTeamMember = (m: TeamMember) => setTeam(prev => prev.map(x => x.id === m.id ? m : x));
  const addTeamMember = (m: TeamMember) => setTeam(prev => [...prev, m]);
  const deleteTeamMember = (id: string) => setTeam(prev => prev.filter(x => x.id !== id));

  // Vacancies CRUD
  const updateVacancy = (v: Vacancy) => setVacancies(prev => prev.map(x => x.id === v.id ? v : x));
  const addVacancy = (v: Vacancy) => setVacancies(prev => [...prev, v]);
  const deleteVacancy = (id: string) => setVacancies(prev => prev.filter(x => x.id !== id));

  // Reset all
  const resetData = () => {
    if (confirm('Вы уверены? Все ваши изменения будут удалены и вернутся исходные данные.')) {
      setProjects(INITIAL_PROJECTS);
      setNews(INITIAL_NEWS);
      setFaqCategories(INITIAL_FAQ);
      setTeam(INITIAL_TEAM);
      setVacancies(INITIAL_VACANCIES);
    }
  };

  return (
    <DataContext.Provider value={{
      projects, updateProject, addProject, deleteProject,
      news, updateNews, addNews, deleteNews,
      faqCategories, updateFaqCategories,
      team, updateTeamMember, addTeamMember, deleteTeamMember,
      vacancies, updateVacancy, addVacancy, deleteVacancy,
      resetData,
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

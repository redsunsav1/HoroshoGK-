import React, { createContext, useState, useEffect, useContext } from 'react';
import { Project, NewsItem, FaqCategory, TeamMember, Vacancy } from '../types';
import {
  PROJECTS as INITIAL_PROJECTS,
  NEWS as INITIAL_NEWS,
  FAQ_CATEGORIES as INITIAL_FAQ,
  TEAM as INITIAL_TEAM,
  VACANCIES as INITIAL_VACANCIES,
} from '../constants';

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

  // Save to localStorage on change
  useEffect(() => { localStorage.setItem('horosho_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('horosho_news', JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem('horosho_faq', JSON.stringify(faqCategories)); }, [faqCategories]);
  useEffect(() => { localStorage.setItem('horosho_team', JSON.stringify(team)); }, [team]);
  useEffect(() => { localStorage.setItem('horosho_vacancies', JSON.stringify(vacancies)); }, [vacancies]);

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
      localStorage.removeItem('horosho_projects');
      localStorage.removeItem('horosho_news');
      localStorage.removeItem('horosho_faq');
      localStorage.removeItem('horosho_team');
      localStorage.removeItem('horosho_vacancies');
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

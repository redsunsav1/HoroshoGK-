import React, { createContext, useState, useEffect, useContext } from 'react';
import { Project } from '../types';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';

interface DataContextType {
  projects: Project[];
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    // Try to load from local storage first
    const saved = localStorage.getItem('horosho_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  // Save to local storage whenever projects change
  useEffect(() => {
    localStorage.setItem('horosho_projects', JSON.stringify(projects));
  }, [projects]);

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const addProject = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const resetData = () => {
    if (confirm('Вы уверены? Все ваши изменения будут удалены и вернутся исходные данные.')) {
      setProjects(INITIAL_PROJECTS);
      localStorage.removeItem('horosho_projects');
    }
  };

  return (
    <DataContext.Provider value={{ projects, updateProject, addProject, deleteProject, resetData }}>
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
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { Project } from '../types';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';

// API URL - will be same origin in production
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

interface DataContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  updateProject: (project: Project) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  resetData: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/projects`);

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();

      // If no data on server, initialize with default projects
      if (data.length === 0) {
        await initializeData();
      } else {
        setProjects(data);
      }
    } catch (err) {
      console.error('API Error, falling back to local data:', err);
      // Fallback to constants if API is not available
      setProjects(INITIAL_PROJECTS);
      setError('API not available, using local data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize server with default data
  const initializeData = async () => {
    try {
      const response = await fetch(`${API_URL}/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: INITIAL_PROJECTS }),
      });

      if (response.ok) {
        setProjects(INITIAL_PROJECTS);
      }
    } catch (err) {
      console.error('Failed to initialize data:', err);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const updateProject = async (updatedProject: Project) => {
    try {
      const response = await fetch(`${API_URL}/projects/${updatedProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    } catch (err) {
      console.error('Update failed:', err);
      throw err;
    }
  };

  const addProject = async (newProject: Project) => {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }

      setProjects(prev => [...prev, newProject]);
    } catch (err) {
      console.error('Add failed:', err);
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      throw err;
    }
  };

  const resetData = async () => {
    if (confirm('Вы уверены? Все ваши изменения будут удалены и вернутся исходные данные.')) {
      try {
        await initializeData();
      } catch (err) {
        console.error('Reset failed:', err);
      }
    }
  };

  const refreshData = async () => {
    await fetchProjects();
  };

  return (
    <DataContext.Provider value={{
      projects,
      loading,
      error,
      updateProject,
      addProject,
      deleteProject,
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

import { Project } from '../types';

const ADMIN_PREVIEW_KEY = 'horosho-admin-preview';

export const enableAdminProjectPreview = () => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(ADMIN_PREVIEW_KEY, '1');
};

export const canPreviewHiddenProjects = () => {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(ADMIN_PREVIEW_KEY) === '1';
};

export const isProjectHidden = (project: Project) => project.isHidden === true;

export const isProjectVisible = (project: Project) => {
  return !isProjectHidden(project) || canPreviewHiddenProjects();
};

export const sortProjects = (projects: Project[]) => {
  return projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const orderA = typeof a.project.sortOrder === 'number' ? a.project.sortOrder : a.index;
      const orderB = typeof b.project.sortOrder === 'number' ? b.project.sortOrder : b.index;
    if (orderA !== orderB) return orderA - orderB;
      return a.index - b.index;
    })
    .map(({ project }) => project);
};

export const getVisibleProjects = (projects: Project[]) => {
  return sortProjects(projects.filter(isProjectVisible));
};

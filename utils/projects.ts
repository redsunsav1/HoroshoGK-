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

export const getVisibleProjects = (projects: Project[]) => {
  return projects.filter(isProjectVisible);
};

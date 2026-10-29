import projectsData from '../../content/projects.json';
import { Project } from '@/types/project';

export function getAllProjects(): Project[] {
    return projectsData as Project[];
}

export function getProjectById(id: string): Project | undefined {
    return (projectsData as Project[]).find((p) => p.id === id);
}

export function getAllTags(): string[] {
    const tagSet = new Set<string>();
    getAllProjects().forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
}

export function getFeaturedProject(): Project {
    const projects = getAllProjects();
    return projects.find((p) => p.featured) ?? projects[0];
}

export function getLevelTotal(): string {
    return String(getAllProjects().length).padStart(2, '0');
}

export function getLevelNumber(id: string): string {
    const index = getAllProjects().findIndex((p) => p.id === id);
    return String(index + 1).padStart(2, '0');
}

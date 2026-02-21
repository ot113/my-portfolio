import projectsData from '../../content/projects.json';
import { Project } from '@/types/project';

export function getAllProjects(): Project[] {
    return projectsData as Project[];
}

export function getProjectById(id: string): Project | undefined {
    return (projectsData as Project[]).find((p) => p.id === id);
}

export function getAllTags(): string[] {
    const projects = getAllProjects();
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
}

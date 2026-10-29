import Link from 'next/link';
import { useState } from 'react';
import { Project } from '@/types/project';
import MediaPreview from './MediaPreview';

interface ProjectCardProps {
    project: Project;
    highlighted?: boolean;
}

export default function ProjectCard({ project, highlighted = false }: ProjectCardProps) {
    const [hovered, setHovered] = useState(false);
    const on = hovered || highlighted;

    return (
        <Link
            href={`/projects/${project.id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
            <MediaPreview title={project.title} thumbnail={project.thumbnail} video={project.video} active={on} aspect="16 / 10" />
            <div className="label" style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12 }}>
                <span>{on ? '▶ ' : ''}{project.type}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{project.year}</span>
            </div>
            <h2 className="h-display hl-item" style={{ margin: 0, fontSize: 36, lineHeight: 1.02, color: on ? 'var(--accent)' : 'var(--text)' }}>
                {project.title}
            </h2>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)' }}>{project.description}</p>
        </Link>
    );
}

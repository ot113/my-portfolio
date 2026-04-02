import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Project } from '@/types/project';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <Link
            href={`/projects/${project.id}`}
            className="group block border transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border)'
            }}
        >
            <div
                className="w-full h-48 sm:h-56 relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
                {project.thumbnail && !imgError ? (
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs opacity-20 uppercase font-bold tracking-widest">
                        {project.title}
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                    {project.title}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed line-clamp-2">
                    {project.description}
                </p>
            </div>
        </Link>
    );
}

import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/SEO';
import MediaPreview from '@/components/MediaPreview';
import Reveal from '@/components/Reveal';
import { getAllProjects, getLevelNumber, getLevelTotal } from '@/lib/projects';
import { Project } from '@/types/project';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface ProjectDetailProps {
    project: Project;
    mdxSource: MDXRemoteSerializeResult;
    nextProject: Project | null;
}

/* Name store links after the store, so OUTAGE reads "itch.io" and "Steam" instead of two generic labels */
function linkLabel(url: string, fallback: string) {
    if (url.includes('store.steampowered.com')) return 'View on Steam';
    if (url.includes('itch.io')) return 'Play on itch.io';
    if (url.includes('docs.google.com')) return 'Read the document';
    return fallback;
}

export default function ProjectDetail({ project, mdxSource, nextProject }: ProjectDetailProps) {
    const levelNum = getLevelNumber(project.id);

    const hasLinks = project.links.github || project.links.demo || project.links.external;
    // A playable itch.io build gets a button next to the title, not just a line in the links list
    const playUrl = [project.links.demo, project.links.external].find((url) => url?.includes('itch.io'));

    return (
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title={project.title} description={project.description} />

            <Link href="/projects" className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 48 }}>
                <span>←</span> Work
            </Link>

            <Reveal style={{ marginBottom: 48 }}>
                <span className="label" style={{ color: 'var(--text-secondary)' }}>
                    Project {levelNum} of {getLevelTotal()}
                </span>
                <h1 className="h-display" style={{ margin: '12px 0 24px', fontSize: 'clamp(48px, 8vw, 120px)' }}>
                    {project.title}
                </h1>
                <dl className="label" style={{ display: 'flex', gap: '12px 32px', flexWrap: 'wrap', margin: 0 }}>
                    {[['Role', project.role], ['Type', project.type], ['Year', project.year], ['Platform', project.platform]].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <dt style={{ color: 'var(--text-secondary)' }}>{k}</dt>
                            <dd style={{ margin: 0 }}>{v}</dd>
                        </div>
                    ))}
                </dl>
                {playUrl && (
                    <a
                        href={playUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="play-btn"
                    >
                        <span aria-hidden="true">▶</span> Play on itch.io
                    </a>
                )}
            </Reveal>

            <Reveal delay={0.1}>
                <MediaPreview title={project.title} thumbnail={project.thumbnail} video={project.video} active aspect="16 / 9" sizes="(max-width: 1360px) 100vw, 1360px" priority />
            </Reveal>

            <Reveal delay={0.1} className="prose" style={{ marginTop: 48, marginBottom: 64, maxWidth: 720 }}>
                <MDXRemote {...mdxSource} />
            </Reveal>

            {project.technologies.length > 0 && (
                <Reveal style={{ marginBottom: 48 }}>
                    <span className="label" style={{ color: 'var(--text-secondary)' }}>/ Technologies</span>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                        {project.technologies.map((tech) => (
                            <span key={tech} className="label" style={{ border: '1px solid var(--border)', padding: '6px 10px', fontSize: 12 }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </Reveal>
            )}

            {hasLinks && (
                <Reveal style={{ marginBottom: 64 }}>
                    <span className="label" style={{ color: 'var(--text-secondary)' }}>/ Links</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                        {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                GitHub Repository
                            </a>
                        )}
                        {project.links.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                {linkLabel(project.links.demo, 'Live Demo')}
                            </a>
                        )}
                        {project.links.external && (
                            <a href={project.links.external} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                {linkLabel(project.links.external, 'External Link')}
                            </a>
                        )}
                    </div>
                </Reveal>
            )}

            {project.images.length > 0 && (
                <div className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24, marginBottom: 64 }}>
                    {project.images.map((img, i) => (
                        <Reveal key={img} delay={Math.min(i * 0.08, 0.3)} style={{ position: 'relative', aspectRatio: '16 / 9', border: '1px solid var(--border)', overflow: 'hidden' }}>
                            <Image
                                src={img}
                                alt={`${project.title} screenshot ${i + 1}`}
                                fill
                                sizes="(max-width: 760px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </Reveal>
                    ))}
                </div>
            )}

            {nextProject && (
                <Reveal>
                    <Link
                        href={`/projects/${nextProject.id}`}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, borderTop: '1px solid var(--border)', paddingTop: 24 }}
                    >
                        <span className="label" style={{ color: 'var(--text-secondary)' }}>Next project →</span>
                        <span className="h-display" style={{ fontSize: 32 }}>{nextProject.title}</span>
                    </Link>
                </Reveal>
            )}
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const projects = getAllProjects();
    const paths = projects.map((p) => ({ params: { id: p.id } }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const projects = getAllProjects();
    const index = projects.findIndex((p) => p.id === params?.id);
    const project = projects[index];

    if (!project) {
        return { notFound: true };
    }

    const mdxSource = await serialize(project.overview);
    const nextProject = projects[(index + 1) % projects.length] ?? null;

    return {
        props: {
            project,
            mdxSource,
            nextProject,
        },
    };
};

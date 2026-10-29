import { useState, useMemo, useEffect, useRef } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEO from '@/components/SEO';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import FilterBar, { chipStyle } from '@/components/FilterBar';
import { getAllProjects, getAllTags } from '@/lib/projects';
import { Project } from '@/types/project';

type ViewMode = 'grid' | 'list';

interface WorkProps {
    projects: Project[];
    tags: string[];
}

export default function Work({ projects, tags }: WorkProps) {
    const router = useRouter();
    const [hydrated, setHydrated] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [view, setView] = useState<ViewMode>('grid');
    const [activeId, setActiveId] = useState<string | null>(null);
    const itemRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        // One-time hydration from the browser URL (SSG build can't know query params at build time).
        const params = new URLSearchParams(window.location.search);
        const fromUrl = (params.get('tags') ?? '').split(',').filter((t) => tags.includes(t));
        const v = params.get('view');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedTags(fromUrl);
        setView(v === 'list' ? 'list' : 'grid');
        setHydrated(true);
    }, [tags]);

    const updateQuery = (next: { tags?: string[]; view?: ViewMode }) => {
        const query: Record<string, string> = { ...(router.query as Record<string, string>) };
        if (next.tags !== undefined) {
            if (next.tags.length === 0) delete query.tags; else query.tags = next.tags.join(',');
        }
        if (next.view !== undefined) {
            if (next.view === 'grid') delete query.view; else query.view = next.view;
        }
        router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
    };

    const setTagsAndSync = (next: string[]) => { setSelectedTags(next); updateQuery({ tags: next }); };
    const toggleTag = (tag: string) =>
        setTagsAndSync(selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]);
    const setViewAndSync = (v: ViewMode) => { setView(v); updateQuery({ view: v }); };

    // AND filtering: a project must have every selected tag
    const items = useMemo(
        () => (selectedTags.length === 0 ? projects : projects.filter((p) => selectedTags.every((t) => p.tags.includes(t)))),
        [projects, selectedTags]
    );

    useEffect(() => {
        if (!hydrated) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (!visible) return;
                setActiveId(visible.target.getAttribute('data-project-id'));
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] }
        );
        Object.values(itemRefs.current).forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [hydrated, items]);

    return (
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title="Work" />

            <Reveal className="stack-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 32 }}>
                <h1 className="h-display" style={{ margin: 0, fontSize: 'clamp(72px, 13vw, 190px)', lineHeight: 1.02 }}>
                    Work
                </h1>
                <p style={{ margin: 0, maxWidth: 360, color: 'var(--text-secondary)' }}>
                    Shipped games, jam entries and design docs. Each page breaks down the problem, the levels and what I would change.
                </p>
            </Reveal>

            <div
                className="stack-sm label"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'nowrap', padding: '14px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
            >
                <FilterBar tags={tags} selectedTags={selectedTags} onToggleTag={toggleTag} onClear={() => setTagsAndSync([])} />
                <div role="group" aria-label="View" style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button type="button" onClick={() => setViewAndSync('grid')} aria-pressed={view === 'grid'} style={chipStyle(view === 'grid')}>
                        Grid
                    </button>
                    <button type="button" onClick={() => setViewAndSync('list')} aria-pressed={view === 'list'} style={chipStyle(view === 'list')}>
                        List
                    </button>
                </div>
            </div>

            {view === 'grid' ? (
                <div className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '40px 24px', marginTop: 32 }}>
                    {items.map((p, i) => (
                        <div key={p.id} ref={(el) => { itemRefs.current[p.id] = el; }} data-project-id={p.id}>
                            <Reveal delay={Math.min(i * 0.06, 0.3)}>
                                <ProjectCard project={p} highlighted={activeId === p.id} />
                            </Reveal>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ marginTop: 16 }}>
                    <div
                        className="row-sm label"
                        style={{ display: 'grid', gridTemplateColumns: '90px minmax(0, 3fr) minmax(0, 2fr) minmax(0, 2fr) 90px', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 12 }}
                    >
                        <span>No.</span><span>Title</span><span className="hide-sm">Role</span><span className="hide-sm">Type</span><span className="hide-sm">Year</span>
                    </div>
                    {items.map((p, i) => {
                        const on = activeId === p.id;
                        const muted = on ? 'inherit' : 'var(--text-secondary)';
                        const num = String(i + 1).padStart(2, '0');
                        return (
                            <div key={p.id} ref={(el) => { itemRefs.current[p.id] = el; }} data-project-id={p.id}>
                                <Reveal delay={Math.min(i * 0.04, 0.3)} y={16}>
                                    <Link
                                        href={`/projects/${p.id}`}
                                        className="row-sm hl-item"
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '90px minmax(0, 3fr) minmax(0, 2fr) minmax(0, 2fr) 90px',
                                            gap: 16,
                                            padding: '24px 12px',
                                            margin: '0 -12px',
                                            borderBottom: '1px solid var(--text-secondary)',
                                            alignItems: 'baseline',
                                            backgroundColor: on ? 'var(--text)' : 'transparent',
                                            color: on ? 'var(--bg)' : 'var(--text)',
                                        }}
                                    >
                                        <span className="label" style={{ fontSize: 13, color: muted }}>{on ? `▶ ${num}` : num}</span>
                                        <span className="h-display" style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', lineHeight: 1.05 }}>{p.title}</span>
                                        <span className="hide-sm" style={{ fontSize: 15 }}>{p.role}</span>
                                        <span className="hide-sm" style={{ fontSize: 15, color: muted }}>{p.type}</span>
                                        <span className="hide-sm label" style={{ fontSize: 13 }}>{p.year}</span>
                                    </Link>
                                </Reveal>
                            </div>
                        );
                    })}
                </div>
            )}

            {items.length === 0 && (
                <div style={{ padding: '64px 0', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 20px', color: 'var(--text-secondary)' }}>No projects match all of the selected tags.</p>
                    <div className="label" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
                        <span style={{ alignSelf: 'center', marginRight: 8, color: 'var(--text-secondary)' }}>Try:</span>
                        {tags.map((tag) => (
                            <button key={tag} type="button" onClick={() => setTagsAndSync([tag])} style={chipStyle(false)}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return { props: { projects: getAllProjects(), tags: getAllTags() } };
};

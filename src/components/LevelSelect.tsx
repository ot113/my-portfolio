import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import MediaPreview from './MediaPreview';
import Reveal from './Reveal';

interface LevelSelectProps {
    projects: Project[];
}

export default function LevelSelect({ projects }: LevelSelectProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Scroll-driven highlight: the row crossing the middle of the viewport becomes active
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveIndex(Number((e.target as HTMLElement).dataset.index));
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );
        rowRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [projects.length]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = Math.min(index + 1, projects.length - 1);
            setActiveIndex(next);
            rowRefs.current[next]?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = Math.max(index - 1, 0);
            setActiveIndex(prev);
            rowRefs.current[prev]?.focus();
        }
    };

    const active = projects[activeIndex];
    const total = String(projects.length).padStart(2, '0');

    return (
        <section aria-labelledby="ls" style={{ backgroundColor: 'var(--bg-inverse)', color: 'var(--text-inverse)' }}>
            <div style={{ maxWidth: 1360, margin: '0 auto', padding: '32px 24px 72px' }}>
                <Reveal
                    className="stack-sm"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 24 }}
                >
                    <h2 id="ls" className="h-display" style={{ margin: 0, fontSize: 'clamp(40px, 6vw, 80px)' }}>
                        Projects
                    </h2>
                    <span className="hide-sm label" style={{ color: 'var(--text-inverse-secondary)' }}>
                        {total} projects
                    </span>
                </Reveal>

                <Reveal delay={0.1} className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 32, alignItems: 'start' }}>
                    <div style={{ gridColumn: 'span 7' }}>
                        <div
                            className="row-sm label"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '64px minmax(0, 1fr) minmax(0, 0.8fr) 64px',
                                gap: 16,
                                padding: '10px 0',
                                borderBottom: '1px solid var(--text-inverse)',
                                color: 'var(--text-inverse-secondary)',
                                fontSize: 12,
                            }}
                        >
                            <span>No.</span><span>Title</span><span className="hide-sm">Type</span><span className="hide-sm">Year</span>
                        </div>

                        {projects.map((p, i) => {
                            const on = i === activeIndex;
                            const num = String(i + 1).padStart(2, '0');
                            return (
                                <Link
                                    key={p.id}
                                    href={`/projects/${p.id}`}
                                    ref={(el) => { rowRefs.current[i] = el; }}
                                    data-index={i}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onFocus={() => setActiveIndex(i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className="row-sm hl-item"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '64px minmax(0, 1fr) minmax(0, 0.8fr) 64px',
                                        gap: 16,
                                        padding: '24px 12px',
                                        margin: '0 -12px',
                                        borderBottom: '1px solid #3A3936',
                                        alignItems: 'baseline',
                                        outlineOffset: -2,
                                        backgroundColor: on ? 'var(--text-inverse)' : 'transparent',
                                        color: on ? 'var(--bg-inverse)' : 'var(--text-inverse)',
                                    }}
                                >
                                    <span className="label" style={{ fontSize: 13 }}>{on ? `▶ ${num}` : num}</span>
                                    <span className="h-display" style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', lineHeight: 1.05 }}>{p.title}</span>
                                    <span className="hide-sm" style={{ fontSize: 15 }}>{p.type}</span>
                                    <span className="hide-sm label" style={{ fontSize: 13 }}>{p.year}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hide-sm" style={{ gridColumn: '8 / span 5', display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 38, position: 'sticky', top: 24 }}>
                        <MediaPreview title={active.title} thumbnail={active.thumbnail} video={active.video} active aspect="4 / 3" />
                        <span className="label" style={{ color: 'var(--text-inverse-secondary)' }}>
                            {active.role}
                        </span>
                        <span className="h-display" style={{ fontSize: 40 }}>{active.title}</span>
                        <p style={{ margin: 0, color: '#C9C7BF' }}>{active.description}</p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

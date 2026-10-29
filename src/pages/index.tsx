import Link from 'next/link';
import { GetStaticProps } from 'next';
import SEO from '@/components/SEO';
import HeroReel, { ReelClip } from '@/components/HeroReel';
import LevelSelect from '@/components/LevelSelect';
import Reveal from '@/components/Reveal';
import { getAllProjects } from '@/lib/projects';
import { getAllPostsWithPvz } from '@/lib/posts';
import { Project } from '@/types/project';
import { PostMeta } from '@/types/post';

const HERO_VIDEO = '/videos/portfolio-reel.mp4';
const HERO_POSTER = '/videos/portfolio-reel-poster.jpg';

// Cut points of portfolio-reel.mp4 (seconds, mid-fade), so "Now playing" names the game on screen
const REEL_CUTS = [
    { at: 0, id: 'outage' },
    { at: 4.25, id: 'where-is-azrael' },
    { at: 8.25, id: 'punnet' },
    { at: 12.25, id: 'analoglu-architecture' },
];

interface HomeProps {
    projects: Project[];
    reel: ReelClip[];
    note: PostMeta;
}

function ProfileCol({ label, items }: { label: string; items: string[] }) {
    return (
        <div style={{ borderTop: '1px solid var(--text)', paddingTop: 12 }}>
            <span className="label" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>/ {label}</span>
            <ul style={{ listStyle: 'none', margin: '10px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {items.map((item) => <li key={item}>{item}</li>)}
            </ul>
        </div>
    );
}

export default function Home({ projects, reel, note }: HomeProps) {
    const noteDate = new Date(note.date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('.').join(' / ');

    return (
        <div>
            <SEO />

            <HeroReel reel={reel} video={HERO_VIDEO} poster={HERO_POSTER} />

            <LevelSelect projects={projects} />

            <section id="about" aria-labelledby="ab">
                <div className="grid-sm" style={{ maxWidth: 1360, margin: '0 auto', padding: '32px 24px 72px', display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 24 }}>
                    <Reveal style={{ gridColumn: 'span 5' }}>
                        <span className="label">/ About</span>
                        <h2 id="ab" className="h-display" style={{ margin: '12px 0 0', fontSize: 'clamp(40px, 6vw, 80px)' }}>
                            Make it<br />readable.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1} style={{ gridColumn: '7 / span 6', display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <p style={{ margin: 0, fontSize: 20, lineHeight: 1.45 }}>
                            I design levels that teach without telling. One idea at a time, a space that lets the player figure it out alone, and a difficulty you can feel climbing.
                        </p>
                        <div className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24, fontSize: 15 }}>
                            <ProfileCol label="Focus" items={['Level design', 'Narrative design', 'Mechanic design', 'Worldbuilding']} />
                            <ProfileCol label="Tools" items={['Unity', 'Unreal Engine', 'Blender']} />
                        </div>
                    </Reveal>
                </div>
            </section>

            <section id="blog" aria-labelledby="bl" style={{ borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: 1360, margin: '0 auto', padding: '32px 24px 72px' }}>
                    <Reveal className="stack-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
                        <h2 id="bl" className="h-display" style={{ margin: 0, fontSize: 'clamp(40px, 6vw, 80px)' }}>Blog</h2>
                        <Link href="/blog" className="label" style={{ borderBottom: '1px solid var(--text)' }}>All posts →</Link>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <Link
                            href={`/blog/${note.slug}`}
                            className="stack-sm"
                            style={{ display: 'flex', justifyContent: 'space-between', gap: 24, padding: '24px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', alignItems: 'baseline' }}
                        >
                            <span className="label" style={{ whiteSpace: 'nowrap' }}>/ Latest <span style={{ color: 'var(--text-secondary)' }}>{noteDate}</span></span>
                            <span style={{ flex: 1, fontSize: 'clamp(22px, 2.6vw, 34px)', fontWeight: 500, lineHeight: 1.15 }}>{note.title}</span>
                            <span className="label" style={{ whiteSpace: 'nowrap' }}>{note.readingTime} min →</span>
                        </Link>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    // Home projects run newest first; sort is stable, so same-year projects keep their listed order.
    // The CardTower GDD stays on the Work page only.
    const projects = getAllProjects()
        .filter((p) => p.id !== 'cardtower-gdd')
        .sort((a, b) => b.year - a.year);
    const all = getAllProjects();
    const reel: ReelClip[] = REEL_CUTS.flatMap(({ at, id }) => {
        const p = all.find((x) => x.id === id);
        return p ? [{ at, id: p.id, title: p.title, type: p.type }] : [];
    });
    const [note] = getAllPostsWithPvz();

    return {
        props: { projects, reel, note },
    };
};

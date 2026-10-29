import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';
import Reveal from '@/components/Reveal';

const SKILLS = [
    {
        category: "Game Design",
        items: ["Level Design", "Narrative Design", "Mechanic Design", "Worldbuilding", "Storytelling"]
    },
    {
        category: "Tools & Engines",
        items: ["Unity", "Unreal Engine", "C#", "Blender", "Figma", "Git"]
    },
    {
        category: "Other",
        items: ["Cinematography", "Lighting", "Historical Research"]
    }
];

const LANGUAGES = [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "C1" }
];

export default function Skills() {
    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title="Skills" />
            <Reveal>
                <span className="label">/ About</span>
                <h1 className="h-display" style={{ margin: '12px 0 32px', fontSize: 'clamp(48px, 8vw, 96px)' }}>
                    Skills &amp; languages
                </h1>
            </Reveal>

            <AboutSubNav />

            <div className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 40, marginBottom: 56 }}>
                {SKILLS.map((set, i) => (
                    <Reveal key={set.category} delay={Math.min(i * 0.08, 0.3)}>
                        <h2 className="label" style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>/ {set.category}</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {set.items.map((item) => (
                                <span
                                    key={item}
                                    style={{ padding: '6px 12px', fontSize: 14, border: '1px solid var(--border)' }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal>
                <h2 className="h-display" style={{ fontSize: 32, marginBottom: 24 }}>Languages</h2>
                <div className="grid-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
                    {LANGUAGES.map((lang) => (
                        <div key={lang.name} style={{ padding: 20, border: '1px solid var(--border)' }}>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{lang.name}</h3>
                            <p className="label" style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>{lang.level}</p>
                        </div>
                    ))}
                </div>
            </Reveal>
        </div>
    );
}

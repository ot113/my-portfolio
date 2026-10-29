import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';
import Reveal from '@/components/Reveal';

const EXPERIENCE = [
    {
        role: "Co-Founder",
        company: "Team Indie Bindie",
        period: "Jan 2025 / Present",
        description: "Leading an indie game team, overseeing creative direction and project development."
    },
    {
        role: "Game and Level Design Intern",
        company: "Hyperlab",
        period: "Oct 2025 / Jan 2026",
        description: "Contributed to the ideation process for various projects. Designed hybrid-casual puzzle game levels."
    },
    {
        role: "Game Designer Intern",
        company: "UDO Games",
        period: "Jul 2025 / Aug 2025",
        description: "Prototyping mobile game mechanics. Researched market trends to inform design decisions. Authored the CardTower GDD."
    },
    {
        role: "Board Member of Animation",
        company: "METU GATES",
        period: "Aug 2024 / Jun 2025",
        description: "Organized events to promote understanding of the animation process. Conducted interviews with industry professionals."
    },
    {
        role: "Game Design Intern",
        company: "Easy Clap Games",
        period: "Jul 2024 / Sep 2024",
        description: "Created and updated game design documents. Assisted in crafting the game world and systemic interactions."
    }
];

export default function Experience() {
    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title="Experience" />
            <Reveal>
                <span className="label">/ About</span>
                <h1 className="h-display" style={{ margin: '12px 0 32px', fontSize: 'clamp(48px, 8vw, 96px)' }}>
                    Experience
                </h1>
            </Reveal>
            <AboutSubNav />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {EXPERIENCE.map((exp, i) => (
                    <Reveal key={exp.company + exp.period} delay={Math.min(i * 0.06, 0.3)} style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                        <span className="label" style={{ color: 'var(--text-secondary)' }}>{exp.period}</span>
                        <h2 className="h-display" style={{ margin: '8px 0 4px', fontSize: 28 }}>{exp.role}</h2>
                        <div className="label" style={{ color: 'var(--accent)', marginBottom: 12 }}>{exp.company}</div>
                        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, maxWidth: 640, color: 'var(--text-secondary)' }}>
                            {exp.description}
                        </p>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}

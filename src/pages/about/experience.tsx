import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';

const EXPERIENCE = [
    {
        role: "Co-Founder",
        company: "Team Indie Bindie",
        period: "Jan 2025 — Present",
        description: "Leading an indie game team, overseeing creative direction and project development."
    },
    {
        role: "Game and Level Design Intern",
        company: "Hyperlab",
        period: "Oct 2025 — Jan 2026",
        description: "Contributed to the ideation process for various projects. Designed hybrid-casual puzzle game levels."
    },
    {
        role: "Game Designer Intern",
        company: "UDO Games",
        period: "Jul 2025 — Aug 2025",
        description: "Prototyping mobile game mechanics. Researched market trends to inform design decisions. Authored the CardTower GDD."
    },
    {
        role: "Board Member of Animation",
        company: "METU GATES",
        period: "Aug 2024 — Jun 2025",
        description: "Organized events to promote understanding of the animation process. Conducted interviews with industry professionals."
    },
    {
        role: "Game Design Intern",
        company: "Easy Clap Games",
        period: "Jul 2024 — Sep 2024",
        description: "Created and updated game design documents. Assisted in crafting the game world and systemic interactions."
    }
];

export default function Experience() {
    return (
        <div className="p-8 lg:p-20 max-w-5xl">
            <SEO title="Experience" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Experience</h1>
            <AboutSubNav />
            <div className="space-y-12">
                {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="relative pl-8 border-l-2 border-white/10">
                        <div
                            className="absolute w-4 h-4 rounded-full -left-[9px] top-1"
                            style={{ backgroundColor: 'var(--accent)' }}
                        />
                        <div className="mb-1 text-sm font-bold opacity-60 uppercase tracking-widest">{exp.period}</div>
                        <h2 className="text-2xl font-bold mb-1">{exp.role}</h2>
                        <div className="text-lg mb-4" style={{ color: 'var(--accent)' }}>{exp.company}</div>
                        <p className="text-lg opacity-80 leading-relaxed max-w-3xl">{exp.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

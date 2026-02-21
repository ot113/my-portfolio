import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';

const EXPERIENCE = [
    {
        role: "Game and Level Designer Internship",
        company: "Hyperlab",
        period: "Recent",
        description: "Contributed to the ideation process for various projects. Designed hybrid-casual puzzle game levels."
    },
    {
        role: "Game Design Internship",
        company: "UDO Games",
        period: "2024",
        description: "Prototyping mobile game mechanics. Researched market trends to inform design decisions. Authored the CardTower GDD."
    },
    {
        role: "Game Design Internship",
        company: "EasyClap Games",
        period: "2023",
        description: "Created and updated game design documents. Assisted in crafting the game world and systemic interactions."
    },
    {
        role: "Narrative Designer",
        company: "ATOM at METU TEKNOKENT",
        period: "2023",
        description: "Focused on character creation and narrative structure for projects in the pre-incubation center."
    },
    {
        role: "Indie Director and Screenwriter",
        company: "Self-Employed",
        period: "2022",
        description: "Directed independent creative projects with a focus on cinematography and lighting design."
    },
    {
        role: "Board Member of Animation",
        company: "METU GATES",
        period: "2021 — 2023",
        description: "Organized events to promote understanding of the animation process. Conducted interviews with industry professionals."
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

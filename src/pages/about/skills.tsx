import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';

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
        <div className="p-8 lg:p-20 max-w-5xl">
            <SEO title="Skills" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Skills & Languages</h1>

            <AboutSubNav />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {SKILLS.map((set, i) => (
                    <div key={i}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
                            {set.category}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {set.items.map(item => (
                                <span
                                    key={item}
                                    className="px-3 py-1.5 text-sm font-medium border"
                                    style={{
                                        backgroundColor: 'var(--bg-secondary)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text)'
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-3xl font-bold mb-8 tracking-tight">Languages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LANGUAGES.map((lang, i) => (
                    <div
                        key={i}
                        className="p-6 border"
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            borderColor: 'var(--border)'
                        }}
                    >
                        <h3 className="text-lg font-bold mb-1">{lang.name}</h3>
                        <p className="text-sm opacity-60">{lang.level}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

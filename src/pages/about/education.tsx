import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';

const EDUCATION = [
    {
        degree: "History",
        institution: "Middle East Technical University (METU)",
        year: "2020 — 2026",
        description: "Located in Ankara / Türkiye. Developing strong research, narrative synthesis, and critical thinking skills within a historical framework."
    }
];

export default function Education() {
    return (
        <div className="p-8 lg:p-20 max-w-5xl">
            <SEO title="Education" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Education</h1>

            <AboutSubNav />

            <div className="space-y-12">
                {EDUCATION.map((edu, i) => (
                    <div key={i} className="max-w-3xl">
                        <h2 className="text-2xl font-bold mb-1">{edu.degree}</h2>
                        <div className="text-lg mb-2" style={{ color: 'var(--accent)' }}>{edu.institution}, {edu.year}</div>
                        <p className="text-lg opacity-80 leading-relaxed">{edu.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

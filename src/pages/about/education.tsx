import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';
import Reveal from '@/components/Reveal';

const EDUCATION = [
    {
        degree: "History",
        institution: "Middle East Technical University (METU)",
        year: "2020 / 2026",
        description: "Located in Ankara / Türkiye. Developing strong research, narrative synthesis, and critical thinking skills within a historical framework."
    }
];

export default function Education() {
    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title="Education" />
            <Reveal>
                <span className="label">/ About</span>
                <h1 className="h-display" style={{ margin: '12px 0 32px', fontSize: 'clamp(48px, 8vw, 96px)' }}>
                    Education
                </h1>
            </Reveal>

            <AboutSubNav />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {EDUCATION.map((edu, i) => (
                    <Reveal key={edu.degree} delay={Math.min(i * 0.06, 0.3)} style={{ borderTop: '1px solid var(--border)', paddingTop: 20, maxWidth: 640 }}>
                        <h2 className="h-display" style={{ margin: 0, fontSize: 28 }}>{edu.degree}</h2>
                        <div className="label" style={{ color: 'var(--accent)', margin: '8px 0 12px' }}>
                            {edu.institution}, {edu.year}
                        </div>
                        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                            {edu.description}
                        </p>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}

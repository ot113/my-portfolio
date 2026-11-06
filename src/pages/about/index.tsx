import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';
import Reveal from '@/components/Reveal';

export default function About() {
    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title="About" />
            <Reveal>
                <span className="label">/ About</span>
                <h1 className="h-display" style={{ margin: '12px 0 32px', fontSize: 'clamp(48px, 8vw, 96px)' }}>
                    Background
                </h1>
            </Reveal>

            <AboutSubNav />

            <Reveal delay={0.1}>
                <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, maxWidth: 720 }}>
                    I&apos;m a Jr. Level Designer at Panteon, designing and tuning levels for mobile
                    puzzle games. I also co-founded Team Indie Bindie, where we are making OUTAGE.
                </p>
                <p style={{ margin: '20px 0 0', fontSize: 20, lineHeight: 1.5, maxWidth: 720 }}>
                    I enjoy shaping levels from early ideas into clear, structured play through
                    iteration and prototyping, and I like working where design, narrative and
                    technical implementation meet.
                </p>
                <div className="label" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
                    <a
                        href="/cv/OguzcanTaskin_CV.pdf"
                        download="OguzcanTaskin_CV.pdf"
                        style={{ background: 'var(--text)', color: 'var(--bg)', padding: '13px 18px' }}
                    >
                        Resume ↓
                    </a>
                    <a
                        href="https://linkedin.com/in/oguzcan-taskin"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ border: '1px solid var(--border)', padding: '12px 18px' }}
                    >
                        LinkedIn →
                    </a>
                </div>
            </Reveal>
        </div>
    );
}

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
                    Game Designer with a strong interest in building mechanic-driven systems and
                    thoughtful player experiences. I enjoy shaping gameplay from early ideas
                    into clear, structured loops through iteration and prototyping. I value
                    collaboration and enjoy working at the intersection of design, narrative,
                    and technical implementation to create cohesive and engaging experiences.
                </p>
            </Reveal>
        </div>
    );
}

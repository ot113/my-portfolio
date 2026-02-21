import SEO from '@/components/SEO';
import AboutSubNav from '@/components/AboutSubNav';

export default function About() {
    return (
        <div className="p-8 lg:p-20 max-w-5xl">
            <SEO title="About" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">About Me</h1>

            <AboutSubNav />

            <div className="prose dark:prose-invert max-w-none prose-lg">
                <p>
                    Game Designer with a strong interest in building mechanic-driven systems and
                    thoughtful player experiences. I enjoy shaping gameplay from early ideas
                    into clear, structured loops through iteration and prototyping. I value
                    collaboration and enjoy working at the intersection of design, narrative,
                    and technical implementation to create cohesive and engaging experiences.
                </p>
            </div>
        </div>
    );
}

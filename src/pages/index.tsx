import Link from 'next/link';
import SEO from '@/components/SEO';

const QUICK_LINKS = [
  { href: '/about', title: 'About', description: 'Learn more about my background' },
  { href: '/projects', title: 'Projects', description: 'Explore my game design work' },
  { href: '/blog', title: 'Blog', description: 'Read my thoughts and insights' },
  { href: '/contact', title: 'Contact', description: 'Get in touch with me' },
];

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <SEO />

      {/* Left Panel: Profile Info (40%) */}
      <div
        className="w-full lg:w-[40%] flex flex-col justify-center px-10 py-20 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/10"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="max-w-md mx-auto lg:mx-0">
          <div className="relative w-32 h-32 rounded-full mb-8 overflow-hidden border-2 border-white/10 shadow-xl">
            <img
              src="/profile.jpg"
              alt="Oğuzcan Taşkın"
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
            Oğuzcan Taşkın
          </h1>
          <p className="text-xl font-medium mb-6" style={{ color: 'var(--accent)' }}>
            Game Designer, Historian
          </p>
          <p className="text-lg opacity-80 leading-relaxed mb-8">
            Game Designer with a strong interest in building mechanic-driven systems and thoughtful player experiences. I enjoy shaping gameplay from early ideas into clear, structured loops through iteration and prototyping.
          </p>
        </div>
      </div>

      {/* Right Panel: Quick Links (60%) */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center p-8 lg:p-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group block p-10 border transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border)'
              }}
            >
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                {link.title}
              </h2>
              <p className="opacity-70 text-sm">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

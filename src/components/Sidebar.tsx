import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

export default function Sidebar() {
    const router = useRouter();

    const isActive = (href: string) => {
        if (href === '/') return router.pathname === '/';
        return router.pathname.startsWith(href);
    };

    return (
        <aside
            className="fixed right-0 top-0 h-full w-[200px] flex-col hidden lg:flex z-40"
            style={{ backgroundColor: 'var(--sidebar-bg)' }}
        >
            <div className="flex flex-col h-full px-5 py-8">
                {/* Name */}
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--sidebar-text)', opacity: 0.5 }}>
                        Navigation
                    </p>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 flex-1">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center text-sm py-2.5 pl-3 rounded-r transition-all duration-200 border-l-[3px]"
                            style={{
                                color: isActive(href) ? '#fff' : 'var(--sidebar-text)',
                                borderLeftColor: isActive(href) ? 'var(--sidebar-active-border)' : 'transparent',
                                backgroundColor: isActive(href) ? 'var(--sidebar-active-bg)' : 'transparent',
                                fontWeight: isActive(href) ? 600 : 400,
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* CV Download */}
                <a
                    href="/cv/oguzcan-taskin-cv.pdf"
                    download="Oguzcan-Taskin-CV.pdf"
                    className="mt-6 block text-center text-sm font-semibold py-2.5 px-4 rounded transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                >
                    Download CV
                </a>
            </div>
        </aside>
    );
}

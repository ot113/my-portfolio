import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
    { href: '/projects', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const router = useRouter();

    const isActive = (href: string) =>
        href === '/' ? router.pathname === '/' : router.pathname.startsWith(href);

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
            <div
                className="stack-sm"
                style={{
                    maxWidth: 1360,
                    margin: '0 auto',
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    flexWrap: 'wrap',
                }}
            >
                <Link href="/" className="h-display" style={{ fontSize: 28, lineHeight: 1.02 }}>
                    OT/
                </Link>

                <nav
                    aria-label="Main"
                    className="label"
                    style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 'auto' }}
                >
                    {NAV_LINKS.map((link) => (
                        <span key={link.href} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Link
                                href={link.href}
                                aria-current={isActive(link.href) ? 'page' : undefined}
                                style={{
                                    textDecoration: isActive(link.href) ? 'underline' : 'none',
                                    textUnderlineOffset: 4,
                                }}
                            >
                                {link.label}
                            </Link>
                            <span aria-hidden="true">/</span>
                        </span>
                    ))}
                    <a
                        href="/cv/OguzcanTaskin_CV.pdf"
                        download="OguzcanTaskin_CV.pdf"
                        style={{ background: 'var(--text)', color: 'var(--bg)', padding: '6px 10px' }}
                    >
                        CV ↓
                    </a>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}

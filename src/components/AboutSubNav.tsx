import Link from 'next/link';
import { useRouter } from 'next/router';

const LINKS = [
    { href: '/about', label: 'Main' },
    { href: '/about/experience', label: 'Experience' },
    { href: '/about/education', label: 'Education' },
    { href: '/about/skills', label: 'Skills' },
];

export default function AboutSubNav() {
    const router = useRouter();

    return (
        <nav className="flex flex-wrap gap-6 mb-12 border-b border-white/10 pb-4">
            {LINKS.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold transition-colors duration-200"
                    style={{
                        color: router.pathname === link.href ? 'var(--accent)' : 'var(--text-muted)'
                    }}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}

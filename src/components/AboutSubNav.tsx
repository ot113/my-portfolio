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
        <nav
            className="label"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 48, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}
        >
            {LINKS.map((link) => {
                const active = router.pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        style={{
                            color: active ? 'var(--accent)' : 'var(--text-secondary)',
                            textDecoration: active ? 'underline' : 'none',
                            textUnderlineOffset: 4,
                        }}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}

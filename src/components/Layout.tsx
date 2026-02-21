import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isDark, toggle } = useTheme();
    const router = useRouter();

    const isActive = (href: string) => {
        if (href === '/') return router.pathname === '/';
        return router.pathname.startsWith(href);
    };

    return (
        <>
            {/* Desktop: right sidebar */}
            <Sidebar />

            {/* Theme toggle — desktop only (hides on mobile, shown in mobile menu area) */}
            <div className="hidden lg:block">
                <ThemeToggle isDark={isDark} onToggle={toggle} />
            </div>

            {/* Mobile header */}
            <header
                className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4"
                style={{
                    backgroundColor: 'var(--sidebar-bg)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <Link href="/" className="text-white font-semibold text-base tracking-tight">
                    Oğuzcan Taşkın
                </Link>

                <div className="flex items-center gap-3">
                    {/* Mobile theme toggle */}
                    <button
                        onClick={toggle}
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-sm transition-all hover:opacity-80"
                        style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        className="flex flex-col gap-[5px] p-1"
                    >
                        <span className="block w-6 h-0.5 bg-white rounded" />
                        <span className="block w-6 h-0.5 bg-white rounded" />
                        <span className="block w-6 h-0.5 bg-white rounded" />
                    </button>
                </div>
            </header>

            {/* Mobile menu overlay */}
            <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            {/* Main content */}
            <main
                className="min-h-screen lg:mr-[200px] pt-[64px] lg:pt-0"
                style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
            >
                {children}
            </main>
        </>
    );
}

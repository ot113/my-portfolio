import { useEffect, useState } from 'react';

interface ThemeToggleProps {
    isDark: boolean;
    onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
    const [mounted, setMounted] = useState(false);

    // Only render after mount to avoid SSR mismatch
    useEffect(() => { setMounted(true); }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    return (
        <button
            onClick={onToggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="fixed top-5 z-50 w-10 h-10 flex items-center justify-center rounded-full text-lg transition-all duration-200 hover:scale-110 focus-visible:outline-none"
            style={{
                right: 'calc(200px + 16px)',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
        >
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}

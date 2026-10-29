import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const next = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${next} mode`}
            title={`Switch to ${next} mode`}
            className="theme-toggle"
            // theme is unknown during SSR; show it once it is read
            style={{ visibility: theme ? 'visible' : 'hidden' }}
        >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" fill={theme === 'dark' ? 'none' : 'currentColor'} />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
            </svg>
        </button>
    );
}

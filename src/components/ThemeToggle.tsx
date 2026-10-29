import { useTheme } from '../hooks/useTheme';

// Small fixed square in the bottom-right corner, out of the way of the nav
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
            <span aria-hidden="true">{next === 'dark' ? '◐' : '◑'}</span>
        </button>
    );
}

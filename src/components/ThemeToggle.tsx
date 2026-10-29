import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const next = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${next} mode`}
            className="label"
            // theme is unknown during SSR; keep the slot so the nav does not shift
            style={{ visibility: theme ? 'visible' : 'hidden', background: 'none', border: '1px solid var(--border)', color: 'var(--text)', padding: '5px 10px', minWidth: 64 }}
        >
            {next === 'dark' ? '◐ Dark' : '◑ Light'}
        </button>
    );
}

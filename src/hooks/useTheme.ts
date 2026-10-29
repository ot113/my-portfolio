import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const CHANGE_EVENT = 'themechange';

// The inline script in _document sets data-theme before paint when a choice was saved;
// otherwise the OS preference decides through the CSS media query.
function currentTheme(): Theme {
    const set = document.documentElement.dataset.theme;
    if (set === 'light' || set === 'dark') return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function subscribe(onChange: () => void) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
        mq.removeEventListener('change', onChange);
        window.removeEventListener(CHANGE_EVENT, onChange);
    };
}

export function useTheme() {
    // null on the server, where the theme is unknown
    const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);

    const toggle = () => {
        const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage blocked: choice lasts this visit */ }
        window.dispatchEvent(new Event(CHANGE_EVENT));
    };

    return { theme, toggle };
}

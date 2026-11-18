import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Long enough for the fade-out in globals.css ([data-leaving]) to finish before the page swaps
const FADE_OUT_MS = 240;

/* Fades the current page out before an internal link navigates, so the swap and the scroll reset to the
   top happen while nothing is visible. The new page then fades in through .page-transition. Back/forward
   and links that Next does not route (files, other sites, new tabs) are left alone. */
export function usePageFade() {
    const router = useRouter();

    useEffect(() => {
        const root = document.documentElement;
        let timer: number | undefined;

        const clear = () => {
            window.clearTimeout(timer);
            delete root.dataset.leaving;
        };

        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const link = (e.target as Element | null)?.closest('a');
            if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

            const url = new URL(link.href, window.location.href);
            if (url.origin !== window.location.origin || /\.\w+$/.test(url.pathname)) return;
            // Same page, or only the #hash changes: let it scroll normally
            if (url.pathname === window.location.pathname && url.search === window.location.search) return;

            // Next's Link skips its own navigation when the click was already handled
            e.preventDefault();
            window.clearTimeout(timer);
            root.dataset.leaving = '';
            timer = window.setTimeout(() => {
                router.push(url.pathname + url.search + url.hash).catch(clear);
            }, FADE_OUT_MS);
        };

        document.addEventListener('click', onClick, true);
        router.events.on('routeChangeComplete', clear);
        router.events.on('routeChangeError', clear);
        return () => {
            document.removeEventListener('click', onClick, true);
            router.events.off('routeChangeComplete', clear);
            router.events.off('routeChangeError', clear);
            clear();
        };
    }, [router]);
}

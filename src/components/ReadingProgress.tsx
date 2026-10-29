import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/* Thin accent bar on the viewport's top edge that fills as the page is read.
   Portaled to <body> because the page transition wrapper is transformed, which would pin a fixed child to it. */
export default function ReadingProgress() {
    const [mounted, setMounted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    if (!mounted) return null;
    return createPortal(
        <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 4, zIndex: 40, pointerEvents: 'none' }}>
            <div style={{ height: '100%', background: 'var(--accent)', transformOrigin: 'left', transform: `scaleX(${progress})` }} />
        </div>,
        document.body
    );
}

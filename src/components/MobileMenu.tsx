import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const router = useRouter();

    // Close on route change
    useEffect(() => {
        router.events?.on('routeChangeStart', onClose);
        return () => router.events?.off('routeChangeStart', onClose);
    }, [router.events, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="mobile-menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ backgroundColor: 'rgba(15, 17, 23, 0.98)' }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="absolute top-5 right-5 text-white text-4xl leading-none hover:opacity-70 transition-opacity focus-visible:outline-none"
                    >
                        ×
                    </button>

                    {/* Nav links */}
                    <nav className="flex flex-col items-center gap-2 w-full px-8">
                        {NAV_LINKS.map(({ href, label }, i) => (
                            <motion.div
                                key={href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * i, duration: 0.3 }}
                                className="w-full max-w-xs"
                            >
                                <Link
                                    href={href}
                                    onClick={onClose}
                                    className="block text-center text-2xl font-semibold text-white py-4 border-b border-white/10 hover:text-blue-400 transition-colors"
                                >
                                    {label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* CV Download */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="mt-8"
                    >
                        <a
                            href="/cv/oguzcan-taskin-cv.pdf"
                            download="Oguzcan-Taskin-CV.pdf"
                            className="inline-block text-white text-lg font-semibold py-3 px-10 rounded transition-opacity hover:opacity-90"
                            style={{ backgroundColor: 'var(--accent)' }}
                        >
                            Download CV
                        </a>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

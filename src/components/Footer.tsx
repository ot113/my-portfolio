import { ReactNode } from 'react';
import Link from 'next/link';

function FooterCol({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div style={{ borderTop: '1px solid currentColor', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="label" style={{ fontSize: 12 }}>/ {label}</span>
            {children}
        </div>
    );
}

export function FullFooter() {
    return (
        <footer id="contact" style={{ backgroundColor: 'var(--accent)', color: 'var(--text)' }}>
            <div style={{ maxWidth: 1360, margin: '0 auto', padding: '48px 24px 28px' }}>
                <Link
                    href="/contact"
                    className="h-display"
                    style={{ display: 'block', fontSize: 'clamp(72px, 15vw, 220px)', lineHeight: 1.02 }}
                >
                    Let&apos;s talk
                </Link>

                <div
                    className="grid-sm"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24, marginTop: 48, fontSize: 15 }}
                >
                    <FooterCol label="Contact">
                        <a href="mailto:taskino988@gmail.com">taskino988@gmail.com</a>
                    </FooterCol>
                    <FooterCol label="Based in">
                        <span>Ankara, Türkiye</span>
                    </FooterCol>
                    <FooterCol label="Elsewhere">
                        <a href="https://ototot.itch.io" target="_blank" rel="noopener noreferrer">itch.io</a>
                        <a href="https://linkedin.com/in/oguzcan-taskin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://github.com/ot113" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </FooterCol>
                    <FooterCol label="Menu">
                        <Link href="/projects">Work</Link>
                        <Link href="/about">About</Link>
                        <Link href="/blog">Blog</Link>
                    </FooterCol>
                </div>

                <div
                    className="stack-sm label"
                    style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 48 }}
                >
                    <span>© 2026 Oğuzcan Taşkın</span>
                    <a href="#top">Back to top ↑</a>
                </div>
            </div>
        </footer>
    );
}

export function MinimalFooter() {
    return (
        <footer style={{ borderTop: '1px solid var(--border)' }}>
            <div
                className="stack-sm label"
                style={{ maxWidth: 1360, margin: '0 auto', padding: 24, display: 'flex', justifyContent: 'space-between', gap: 16 }}
            >
                <span>© 2026 Oğuzcan Taşkın</span>
                <Link href="/">Home →</Link>
            </div>
        </footer>
    );
}

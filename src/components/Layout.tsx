import { useRouter } from 'next/router';
import Header from './Header';
import { FullFooter, MinimalFooter } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const isHome = router.pathname === '/';

    return (
        <div id="top" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
            <Header />
            <main>{children}</main>
            {isHome ? <FullFooter /> : <MinimalFooter />}
        </div>
    );
}

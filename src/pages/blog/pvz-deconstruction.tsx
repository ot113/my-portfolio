import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEO from '@/components/SEO';
import ReadingProgress from '@/components/ReadingProgress';
import PvzArticle from '@/components/pvz/PvzArticle';
import { getAllPostsWithPvz } from '@/lib/posts';

interface PvZDeconstructionProps {
    date: string;
    readingTime: number;
    excerpt: string;
}

/* Rebuilt from the old standalone bundle (public/pvz-deconstruction.html) as a regular page in the site layout */
export default function PvZDeconstruction({ date, readingTime, excerpt }: PvZDeconstructionProps) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div style={{ paddingTop: 48, paddingBottom: 96 }}>
            <SEO title="How PvZ teaches without telling" description={excerpt} url="/blog/pvz-deconstruction" />
            <ReadingProgress />

            <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 24px 40px' }}>
                <Link href="/blog" className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span>←</span> Blog
                </Link>
            </div>

            <PvzArticle date={formattedDate} readingTime={readingTime} />

            <div style={{ maxWidth: 1360, margin: '0 auto', padding: '56px 24px 0', textAlign: 'center' }}>
                <Link href="/blog" className="label" style={{ display: 'inline-block', padding: '12px 24px', border: '1px solid var(--text)' }}>
                    View all posts
                </Link>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps<PvZDeconstructionProps> = async () => {
    const meta = getAllPostsWithPvz().find((p) => p.slug === 'pvz-deconstruction');
    return {
        props: {
            date: meta?.date ?? '2025-05-16',
            readingTime: meta?.readingTime ?? 10,
            excerpt: meta?.excerpt ?? '',
        },
    };
};

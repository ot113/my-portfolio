import { GetStaticProps } from 'next';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import Reveal from '@/components/Reveal';
import { getAllPostsWithPvz } from '@/lib/posts';
import { PostMeta } from '@/types/post';

interface BlogIndexProps {
    posts: PostMeta[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title="Blog" description="Thoughts on game design, history, and development." />

            <Reveal>
                <span className="label">/ Writing</span>
                <h1 className="h-display" style={{ margin: '12px 0 48px', fontSize: 'clamp(48px, 8vw, 96px)' }}>
                    Blog
                </h1>
            </Reveal>

            {posts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderBottom: '1px solid var(--border)' }}>
                    {posts.map((post, i) => (
                        <Reveal key={post.slug} delay={Math.min(i * 0.06, 0.3)}>
                            <BlogCard post={post} />
                        </Reveal>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '96px 0', textAlign: 'center', border: '1px dashed var(--border)' }}>
                    <p className="label">Posts coming soon</p>
                </div>
            )}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            posts: getAllPostsWithPvz(),
        },
    };
};

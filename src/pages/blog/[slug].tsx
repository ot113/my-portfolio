import { GetStaticProps, GetStaticPaths } from 'next';
import SEO from '@/components/SEO';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { PostMeta } from '@/types/post';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface BlogPostProps {
    post: {
        meta: PostMeta;
        content: string;
    };
    mdxSource: MDXRemoteSerializeResult;
}

export default function BlogPost({ post, mdxSource }: BlogPostProps) {
    const formattedDate = new Date(post.meta.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 96px' }}>
            <SEO title={post.meta.title} description={post.meta.excerpt} image={post.meta.thumbnail} />

            <Link href="/blog" className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 48 }}>
                <span>←</span> Blog
            </Link>

            <article>
                <Reveal as="header" style={{ marginBottom: 48 }}>
                    <div className="label" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', color: 'var(--text-secondary)', marginBottom: 16 }}>
                        <span>{formattedDate}</span>
                        <span>{post.meta.readingTime} min read</span>
                        <span style={{ color: 'var(--text)' }}>Oğuzcan Taşkın</span>
                    </div>

                    <h1 className="h-display" style={{ margin: '0 0 24px', fontSize: 'clamp(40px, 7vw, 72px)' }}>
                        {post.meta.title}
                    </h1>
                </Reveal>

                <Reveal delay={0.1} className="prose">
                    <MDXRemote {...mdxSource} />
                </Reveal>
            </article>

            <footer style={{ paddingTop: 48, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <p className="label" style={{ marginBottom: 24, color: 'var(--text-secondary)' }}>Thanks for reading!</p>
                <Link
                    href="/blog"
                    className="label"
                    style={{ display: 'inline-block', padding: '12px 24px', border: '1px solid var(--text)' }}
                >
                    View all posts
                </Link>
            </footer>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts();
    const paths = posts.map((p) => ({
        params: { slug: p.slug },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const post = getPostBySlug(params?.slug as string);

    if (!post) {
        return { notFound: true };
    }

    const mdxSource = await serialize(post.content);

    return {
        props: {
            post,
            mdxSource,
        },
    };
};

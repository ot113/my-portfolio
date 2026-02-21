import { GetStaticProps, GetStaticPaths } from 'next';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { PostMeta } from '@/types/post';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface BlogPostProps {
    post: {
        meta: PostMeta;
        content: string;
    };
    mdxSource: any;
}

export default function BlogPost({ post, mdxSource }: BlogPostProps) {
    const formattedDate = new Date(post.meta.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="p-8 lg:p-20 max-w-4xl mx-auto">
            <SEO
                title={post.meta.title}
                description={post.meta.excerpt}
                image={post.meta.thumbnail}
            />

            <Link
                href="/blog"
                className="inline-flex items-center gap-2 mb-12 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
                <span>←</span> Back to Blog
            </Link>

            <article className="mb-20">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                            {formattedDate}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                            {post.meta.readingTime} min read
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
                            By Oğuzcan Taşkın
                        </span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
                        {post.meta.title}
                    </h1>

                    {post.meta.thumbnail && (
                        <div
                            className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden"
                            style={{ backgroundColor: 'var(--bg-secondary)' }}
                        >
                            <div className="text-xs opacity-20 uppercase font-bold tracking-widest">Featured Image Placeholder</div>
                        </div>
                    )}
                </header>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <MDXRemote {...mdxSource} />
                </div>
            </article>

            <footer className="pt-12 border-t border-white/10 text-center">
                <p className="text-sm opacity-40 mb-8 uppercase font-bold tracking-widest">Thanks for reading!</p>
                <Link
                    href="/blog"
                    className="inline-block px-8 py-3 bg-white/5 border border-white/10 font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
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

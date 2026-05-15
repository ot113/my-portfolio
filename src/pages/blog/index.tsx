import { GetStaticProps } from 'next';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/posts';
import { PostMeta } from '@/types/post';

interface BlogIndexProps {
    posts: PostMeta[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
    return (
        <div className="p-8 lg:p-20 max-w-5xl mx-auto">
            <SEO title="Blog" description="Thoughts on game design, history, and development." />

            <div className="mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Blog</h1>
                <p className="text-lg opacity-70">Musings on design, systems, and history.</p>
            </div>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-lg">
                    <p className="text-xl opacity-40 font-bold uppercase tracking-widest">Posts coming soon</p>
                    <p className="mt-2 text-sm opacity-30 italic">No published articles yet. Check back soon!</p>
                </div>
            )}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts();

    const pvzPost: PostMeta = {
        slug: "pvz-deconstruction",
        title: "How PvZ teaches without telling",
        date: "2025-05-16",
        excerpt: "A teardown of PopCap's 2009 lawn defense, organized around four design pillars.",
        thumbnail: "",
        readingTime: 10,
        published: true,
    };

    return {
        props: {
            posts: [pvzPost, ...posts],
        },
    };
};

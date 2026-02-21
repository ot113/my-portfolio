import Link from 'next/link';
import { PostMeta } from '@/types/post';

interface BlogCardProps {
    post: PostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block border transition-all duration-300 hover:scale-[1.01]"
            style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border)'
            }}
        >
            <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                        {formattedDate}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                        {post.readingTime} min read
                    </span>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors tracking-tight">
                    {post.title}
                </h3>

                <p className="opacity-60 leading-relaxed line-clamp-2">
                    {post.excerpt}
                </p>
            </div>
        </Link>
    );
}

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
            style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '24px 0', borderTop: '1px solid var(--border)' }}
        >
            <div className="label" style={{ display: 'flex', alignItems: 'center', gap: 20, color: 'var(--text-secondary)' }}>
                <span>{formattedDate}</span><span>{post.readingTime} min read</span>
            </div>
            <h3 className="h-display" style={{ margin: 0, fontSize: 32 }}>{post.title}</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{post.excerpt}</p>
        </Link>
    );
}

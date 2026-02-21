import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { PostMeta } from '@/types/post';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));

    const posts: PostMeta[] = files.map((filename) => {
        const slug = filename.replace(/\.mdx$/, '');
        const filePath = path.join(POSTS_DIR, filename);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);
        const stats = readingTime(content);

        return {
            slug,
            title: data.title ?? '',
            date: data.date ?? '',
            excerpt: data.excerpt ?? '',
            thumbnail: data.thumbnail ?? '',
            readingTime: Math.ceil(stats.minutes),
            published: data.published ?? false,
        } as PostMeta;
    });

    return posts
        .filter((p) => p.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    const meta: PostMeta = {
        slug,
        title: data.title ?? '',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        thumbnail: data.thumbnail ?? '',
        readingTime: Math.ceil(stats.minutes),
        published: data.published ?? false,
    };

    return { meta, content };
}

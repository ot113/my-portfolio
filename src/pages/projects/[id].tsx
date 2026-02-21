import { GetStaticProps, GetStaticPaths } from 'next';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { getProjectById, getAllProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface ProjectDetailProps {
    project: Project;
    mdxSource: any;
}

export default function ProjectDetail({ project, mdxSource }: ProjectDetailProps) {
    return (
        <div className="p-8 lg:p-20 max-w-5xl mx-auto">
            <SEO title={project.title} description={project.description} />

            <Link
                href="/projects"
                className="inline-flex items-center gap-2 mb-12 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
                <span>←</span> Back to Projects
            </Link>

            <div className="mb-16">
                <div className="flex flex-wrap gap-4 mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-full">
                        {project.year}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white/5 opacity-60 border border-white/10 rounded-full">
                        {project.role}
                    </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tighter leading-tight">
                    {project.title}
                </h1>
                <p className="text-xl lg:text-2xl opacity-80 leading-relaxed max-w-3xl">
                    {project.description}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20 border-t border-white/10 pt-12">
                <div className="lg:col-span-3">
                    <div className="prose dark:prose-invert prose-lg max-w-none">
                        <MDXRemote {...mdxSource} />
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-10">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-40">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                                <span key={tech} className="text-sm px-3 py-1 bg-white/5 border border-white/10">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-40">Links</h4>
                        <div className="flex flex-col gap-3">
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-blue-400">
                                    GitHub Repository
                                </a>
                            )}
                            {project.links.demo && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-blue-400">
                                    Live Demo
                                </a>
                            )}
                            {project.links.external && (
                                <a href={project.links.external} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-blue-400">
                                    External Link
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {project.images.map((img, i) => (
                    <div
                        key={i}
                        className="aspect-video bg-white/5 flex items-center justify-center border border-white/10 text-xs opacity-20 uppercase font-bold tracking-widest"
                    >
                        Screenshot {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const projects = getAllProjects();
    const paths = projects.map((p) => ({
        params: { id: p.id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const project = getProjectById(params?.id as string);

    if (!project) {
        return { notFound: true };
    }

    const mdxSource = await serialize(project.overview);

    return {
        props: {
            project,
            mdxSource,
        },
    };
};

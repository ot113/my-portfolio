import { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import { getAllProjects, getAllTags } from '@/lib/projects';
import { Project } from '@/types/project';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
    const allProjects = getAllProjects();
    const allTags = getAllTags();

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleSuggestTag = (tag: string) => {
        setSelectedTags([tag]);
    };

    // AND filtering logic: project must have ALL selected tags
    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return allProjects;
        return allProjects.filter((p) =>
            selectedTags.every((tag) => p.tags.includes(tag))
        );
    }, [selectedTags, allProjects]);

    return (
        <div className="p-8 lg:p-20 max-w-7xl mx-auto">
            <SEO title="Projects" />

            <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Projects</h1>
                <p className="text-lg opacity-70">Case studies and game design documentation.</p>
            </div>

            <FilterBar
                tags={allTags}
                selectedTags={selectedTags}
                onToggleTag={toggleTag}
                onClear={() => setSelectedTags([])}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center"
                >
                    <p className="text-xl mb-6 opacity-60">No projects found with the selected tags.</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <span className="text-sm border-r border-white/10 pr-4 mt-1 opacity-40 uppercase font-bold tracking-widest">Suggestions:</span>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleSuggestTag(tag)}
                                className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-blue-400 underline underline-offset-4"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

import { Project } from '@/types/project';

interface FilterBarProps {
    tags: string[];
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
    onClear: () => void;
}

export default function FilterBar({ tags, selectedTags, onToggleTag, onClear }: FilterBarProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-10 items-center">
            <button
                onClick={onClear}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all ${selectedTags.length === 0
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
            >
                All Projects
            </button>

            {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                    <button
                        key={tag}
                        onClick={() => onToggleTag(tag)}
                        className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all ${isSelected
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-white/10 opacity-60 hover:opacity-100'
                            }`}
                    >
                        {tag}
                    </button>
                );
            })}
        </div>
    );
}

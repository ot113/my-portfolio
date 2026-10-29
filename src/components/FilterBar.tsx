interface FilterBarProps {
    tags: string[];
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
    onClear: () => void;
}

export function chipStyle(selected: boolean): React.CSSProperties {
    return {
        border: '1px solid var(--text)',
        background: selected ? 'var(--text)' : 'transparent',
        color: selected ? 'var(--bg)' : 'var(--text)',
        padding: '8px 12px',
        minHeight: 40,
    };
}

export default function FilterBar({ tags, selectedTags, onToggleTag, onClear }: FilterBarProps) {
    return (
        <div role="group" aria-label="Filter by category" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: '1 1 auto', minWidth: 0 }}>
            <button type="button" onClick={onClear} aria-pressed={selectedTags.length === 0} style={chipStyle(selectedTags.length === 0)}>
                All projects
            </button>
            {tags.map((tag) => {
                const selected = selectedTags.includes(tag);
                return (
                    <button key={tag} type="button" onClick={() => onToggleTag(tag)} aria-pressed={selected} style={chipStyle(selected)}>
                        {tag}
                    </button>
                );
            })}
        </div>
    );
}

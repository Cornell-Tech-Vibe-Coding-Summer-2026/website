import React from 'react'

export function NotepadContent() {
    const items = [
        'Syllabus', 'Website', 'Activities & group projects', 'Reading list',
        'Guest speakers', 'GitHub Classroom', 'Slide decks', 'Tool credits',
    ]
    return (
        <div className="w-[400px] h-[500px] bg-transparent text-zinc-800 p-10 flex flex-col font-serif select-none">
            <div className="flex justify-between items-start mb-8 opacity-40">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Project Notes</span>
                <span className="text-[10px] font-mono">02/06/2026</span>
            </div>

            <div className="flex-1 space-y-4">
                <h2 className="text-3xl italic font-serif leading-none tracking-tight">Class Prep</h2>
                <div className="space-y-2.5 pt-2">
                    {items.map((t) => (
                        <div key={t} className="flex items-start gap-3">
                            <span className="text-[#00ff41] font-bold text-base leading-none">●</span>
                            <p className="text-xs font-mono uppercase tracking-wide line-through opacity-50">{t}</p>
                        </div>
                    ))}
                    <div className="flex items-start gap-3">
                        <span className="text-zinc-800 font-bold text-base leading-none">○</span>
                        <p className="text-xs font-mono uppercase tracking-wide">Run class</p>
                    </div>
                </div>
            </div>

            <footer className="mt-8 pt-6 border-t border-black/5">
                <p className="text-[9px] font-mono uppercase tracking-wider text-black/30">
                    * reminder: check the VAP framework document in the papers stack.
                </p>
            </footer>
        </div>
    )
}

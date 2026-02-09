import React from 'react'

export function NotepadContent() {
    return (
        <div className="w-[400px] h-[500px] bg-[#fdfdfd] text-[#1a1a1a] p-10 flex flex-col font-serif shadow-2xl border border-[#e0e0e0] select-none">
            <div className="flex justify-between items-start mb-8 opacity-40">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Project Notes</span>
                <span className="text-[10px] font-mono">02/06/2026</span>
            </div>

            <div className="flex-1 space-y-6">
                <h2 className="text-3xl italic font-serif leading-none tracking-tight">The Moral Twist</h2>
                <p className="text-sm leading-relaxed border-b border-black/5 pb-6">
                    "The designer's role is not to control every byte, but to set the character of the system. AI is the brush; ethics is the canvas."
                </p>

                <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                        <span className="text-[#00ff41] font-bold text-lg leading-none">○</span>
                        <p className="text-xs font-mono uppercase tracking-wide">Validate Plagiarism vs Inspiration</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-[#00ff41] font-bold text-lg leading-none">○</span>
                        <p className="text-xs font-mono uppercase tracking-wide">Audit Vibe-Trace Accuracy</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-[#00ff41] font-bold text-lg leading-none">●</span>
                        <p className="text-xs font-mono uppercase tracking-wide">Implement Interactive Desk</p>
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

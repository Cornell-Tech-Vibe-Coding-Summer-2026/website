import React, { useState, useEffect } from 'react'
import { FileText, Terminal, X, Minus, Square } from 'lucide-react'

export function MonitorContent() {
    const [isSyllabusOpen, setIsSyllabusOpen] = useState(false)
    const [terminalText, setTerminalText] = useState('')
    const fullText = `
  INITIALIZING VIBE-CODING-ETHICS...
  
  [SYSTEM]: LOAD MODULE 0x7F21
  [SYSTEM]: CHARACTER ANALYZER ONLINE
  [SYSTEM]: CONNECTING TO CORNELL TECH REPO...
  
  > WELCOME TO SUMMER 2026
  > DESIGNING WITH CHARACTER
  
  _`

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setTerminalText(fullText.substring(0, i))
            i++
            if (i > fullText.length) clearInterval(interval)
        }, 30)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-[1024px] h-[640px] bg-[#1a1c2c] overflow-hidden relative font-mono select-none border-4 border-[#0e101a] rounded-sm">
            {/* Desktop Background / Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Desktop Icons */}
            <div className="absolute top-8 left-8 flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform" onClick={() => setIsSyllabusOpen(true)}>
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center border-2 border-blue-400 group-hover:bg-blue-400/40 transition-colors shadow-lg">
                    <FileText className="text-blue-200" size={32} />
                </div>
                <span className="text-white text-[12px] font-bold tracking-wide drop-shadow-md">syllabus.rtf</span>
            </div>

            {/* Terminal Window */}
            <div className="absolute top-24 left-32 w-[600px] h-[350px] bg-black/90 border-2 border-[#333] rounded-md shadow-2xl flex flex-col z-10 backdrop-blur-md">
                <div className="bg-[#222] px-4 py-2 border-b border-[#333] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-[#00ff41]" />
                        <span className="text-white text-[11px] font-bold uppercase tracking-widest">Main Terminal - v1.0.4</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                        <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                    </div>
                </div>
                <div className="p-6 text-[#00ff41] text-sm whitespace-pre-wrap leading-relaxed overflow-y-auto scrollbar-hide">
                    {terminalText}
                </div>
            </div>

            {/* Syllabus viewer window */}
            {isSyllabusOpen && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#f5f5f5] border-2 border-[#ccc] rounded-md shadow-2xl flex flex-col z-20 overflow-hidden animate-in zoom-in duration-200">
                    <div className="bg-[#e0e0e0] px-4 py-2 border-b border-[#ccc] flex justify-between items-center text-[#333]">
                        <div className="flex items-center gap-2">
                            <FileText size={16} />
                            <span className="text-[12px] font-bold">syllabus.rtf - Text Viewer</span>
                        </div>
                        <button
                            onClick={() => setIsSyllabusOpen(false)}
                            className="hover:bg-red-500 hover:text-white transition-colors p-1"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <div className="p-12 text-[#1a1a1a] font-serif text-lg leading-relaxed overflow-y-auto flex-1">
                        <h1 className="text-4xl font-bold mb-8 border-b-2 border-black/10 pb-4 italic">Vibe Coding Ethics</h1>
                        <p className="mb-6">Cornell Tech, Summer 2026</p>
                        <p className="mb-8 font-bold">Instructor: Hauke Sandhaus</p>

                        <h2 className="text-2xl font-bold mt-10 mb-4 uppercase tracking-tighter">Week 01: The Character of the Machine</h2>
                        <ul className="list-disc pl-6 space-y-3 mb-10 text-base">
                            <li>Historical context of the "Designer-Developer" split.</li>
                            <li>Prompt-based creation and the "Loss of Craft" myth.</li>
                            <li>Ethics of AI-human synergy in prototyping.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-10 mb-4 uppercase tracking-tighter">Project 01: The Moral Ledger</h2>
                        <p className="text-base text-black/70 mb-10">
                            Students will build interactive data visualizations that reveal the "hidden cost" of everyday choices.
                        </p>

                        <div className="bg-amber-100 p-6 border-l-4 border-amber-500 text-sm font-sans italic">
                            "We don't just write code anymore. We curate intentions."
                        </div>
                    </div>
                </div>
            )}

            {/* Taskbar */}
            <div className="absolute bottom-0 w-full h-12 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center px-6 justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white font-black italic">V</div>
                    <div className="w-[1px] h-6 bg-white/10" />
                    <div className={`w-10 h-10 flex items-center justify-center transition-colors ${isSyllabusOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                        <FileText className="text-white/60" size={20} />
                    </div>
                </div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    Friday 14:42 | Cornell Tech OS
                </div>
            </div>
        </div>
    )
}

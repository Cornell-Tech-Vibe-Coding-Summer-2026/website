import React, { useState, useEffect } from 'react'
import { FileText, Terminal, X, Minus, Square, Box, ExternalLink } from 'lucide-react'

const WINDOWS = {
    TERMINAL: 'terminal',
    SYLLABUS: 'syllabus',
    NOTES: 'notes'
}

function Window({ title, icon: Icon, children, onClose, isOpen, x, y, width, height }) {
    if (!isOpen) return null

    return (
        <div
            className="absolute bg-[#1a1c2c] border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            style={{ left: x, top: y, width, height, boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)' }}
        >
            {/* Title Bar */}
            <div className="bg-[#0e101a] px-3 py-2 flex justify-between items-center border-b border-white/5 handle cursor-move select-none">
                <div className="flex items-center gap-2 text-white/60">
                    <Icon size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{title}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={onClose} className="hover:text-red-400 text-white/20 transition-colors"><X size={14} /></button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-[#131520] text-sm relative">
                {children}
            </div>
        </div>
    )
}

export function MonitorContent() {
    const [openWindows, setOpenWindows] = useState({
        [WINDOWS.TERMINAL]: true,
        [WINDOWS.SYLLABUS]: false,
        [WINDOWS.NOTES]: false
    })

    const toggleWindow = (id) => {
        setOpenWindows(prev => ({ ...prev, [id]: !prev[id] }))
    }

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
        <div className="w-[1024px] h-[640px] bg-[#050505] overflow-hidden relative font-mono select-none border-4 border-[#1a1a1a] rounded-sm">
            {/* Desktop Wallpaper */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-pink-900/10 pointer-events-none" />

            {/* Desktop Icons */}
            <div className="absolute top-8 left-8 flex flex-col gap-6">
                <div
                    className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
                    onClick={() => toggleWindow(WINDOWS.SYLLABUS)}
                >
                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg backdrop-blur-sm">
                        <FileText className="text-blue-400 group-hover:text-blue-300 transition-colors" size={28} />
                    </div>
                    <span className="text-white/80 text-[10px] font-bold tracking-wide bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-md">syllabus.rtf</span>
                </div>

                <div
                    className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
                    onClick={() => toggleWindow(WINDOWS.TERMINAL)}
                >
                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg backdrop-blur-sm">
                        <Terminal className="text-green-400 group-hover:text-green-300 transition-colors" size={28} />
                    </div>
                    <span className="text-white/80 text-[10px] font-bold tracking-wide bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-md">terminal.exe</span>
                </div>
            </div>

            {/* Terminal Window */}
            <Window
                title="TERMINAL"
                icon={Terminal}
                isOpen={openWindows[WINDOWS.TERMINAL]}
                onClose={() => toggleWindow(WINDOWS.TERMINAL)}
                x={300} y={100} width={500} height={320}
            >
                <div className="p-4 text-[#00ff41] text-xs leading-relaxed font-mono">
                    {terminalText}
                </div>
            </Window>

            {/* Syllabus Window */}
            <Window
                title="SYLLABUS READER"
                icon={FileText}
                isOpen={openWindows[WINDOWS.SYLLABUS]}
                onClose={() => toggleWindow(WINDOWS.SYLLABUS)}
                x={140} y={60} width={700} height={500}
            >
                <div className="bg-[#f5f5f5] text-[#1a1a1a] min-h-full p-8 font-serif">
                    <h1 className="text-3xl font-bold mb-6 border-b-2 border-black/10 pb-4 italic">Vibe Coding Ethics</h1>
                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-xs uppercase tracking-widest text-[#666]">Instructor</p>
                            <p>Hauke Sandhaus</p>
                        </div>
                        <div>
                            <p className="font-bold text-xs uppercase tracking-widest text-[#666]">Semester</p>
                            <p>Summer 2026</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mt-8 mb-4 uppercase tracking-tighter">Week 01: The Character of the Machine</h2>
                    <ul className="list-disc pl-5 space-y-2 mb-8 text-sm">
                        <li>Historical context of the "Designer-Developer" split.</li>
                        <li>Prompt-based creation and the "Loss of Craft" myth.</li>
                        <li>Ethics of AI-human synergy in prototyping.</li>
                    </ul>

                    <div className="bg-[#e8f0fe] p-4 rounded border-l-4 border-blue-500 text-sm italic text-blue-900">
                        "We don't just write code anymore. We curate intentions."
                    </div>
                </div>
            </Window>

            {/* Taskbar */}
            <div className="absolute bottom-0 w-full h-10 bg-[#0e101a]/90 backdrop-blur-md border-t border-white/5 flex items-center px-4 justify-between z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded transition-colors group">
                        <div className="w-4 h-4 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-sm group-hover:rotate-45 transition-transform" />
                    </div>
                    <div className="w-[1px] h-4 bg-white/10 mx-2" />

                    {/* Running Apps */}
                    <button
                        onClick={() => toggleWindow(WINDOWS.TERMINAL)}
                        className={`w-8 h-8 flex items-center justify-center rounded transition-all ${openWindows[WINDOWS.TERMINAL] ? 'bg-white/10 border-b-2 border-green-500' : 'hover:bg-white/5 opacity-50'}`}
                    >
                        <Terminal size={16} className="text-green-400" />
                    </button>
                    <button
                        onClick={() => toggleWindow(WINDOWS.SYLLABUS)}
                        className={`w-8 h-8 flex items-center justify-center rounded transition-all ${openWindows[WINDOWS.SYLLABUS] ? 'bg-white/10 border-b-2 border-blue-500' : 'hover:bg-white/5 opacity-50'}`}
                    >
                        <FileText size={16} className="text-blue-400" />
                    </button>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-bold tracking-wider text-white/30 uppercase">
                    <span>Wifi: Connected</span>
                    <span>100% Battery</span>
                    <span className="text-white/50">14:42</span>
                </div>
            </div>
        </div>
    )
}

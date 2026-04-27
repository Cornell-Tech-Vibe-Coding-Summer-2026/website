import { useState } from 'react'
import { FileText, Terminal, X, Globe } from 'lucide-react'
import { motion, useDragControls } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import syllabusMarkdown from '../content/syllabus.md?raw'

const WINDOWS = {
    TERMINAL: 'terminal',
    SYLLABUS: 'syllabus',
    EXAMPLES: 'examples'
}

// TODO: change to '/examples' once deployment restructure ships
const EXAMPLES_URL = 'https://vibe-coding-ethics.tech.cornell.edu/'

function Window({ title, icon: Icon, children, onClose, isOpen, x, y, width, height, zIndex, onFocus }) {
    const dragControls = useDragControls()
    if (!isOpen) return null

    return (
        <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            onPointerDown={onFocus}
            className="absolute bg-[#1a1c2c] border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            style={{ left: x, top: y, width, height, boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)', zIndex }}
        >
            {/* Title Bar (drag handle) */}
            <div
                onPointerDown={(e) => dragControls.start(e)}
                className="bg-[#0e101a] px-3 py-2 flex justify-between items-center border-b border-white/5 select-none cursor-grab active:cursor-grabbing"
            >
                <div className="flex items-center gap-2 text-white/60">
                    <Icon size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{title}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onClose() }}
                        className="hover:text-red-400 hover:bg-red-500/10 text-white/40 transition-colors p-1 rounded"
                        aria-label="Close window"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-[#131520] text-sm relative">
                {children}
            </div>
        </motion.div>
    )
}

const ASCII_BANNER = `   ╭────────────────────────────────────────────────────╮
   │                                                    │
   │     GOOD CODE / GOOD VIBES                         │
   │     Building Ethical Apps with AI                  │
   │                                                    │
   │     Cornell Tech · Summer 2026                     │
   │                                                    │
   ╰────────────────────────────────────────────────────╯`

function WelcomeTerminal() {
    return (
        <div className="p-6 pt-5 font-mono text-xs leading-relaxed bg-[#0a0e0a] min-h-full">
            <pre className="text-[#00ff41] text-[10px] mb-3 leading-tight whitespace-pre">{ASCII_BANNER}</pre>

            <div className="text-[#00ff41]/70 text-[11px] mb-6 space-y-0.5">
                <div>&gt; initializing course...</div>
                <div>&gt; module: vibe-coding-ethics loaded</div>
                <div>&gt; instructors online: hauke · jonathan · wendy</div>
                <div>&gt; ready.</div>
            </div>

            <div className="space-y-5 mb-6 max-w-[640px]">
                <div>
                    <div className="text-[#ffd166] text-[11px] font-bold mb-1 tracking-wider">? WHAT IS VIBE CODING</div>
                    <div className="text-white/75 pl-3">
                        Building software with AI as your co-author.<br />
                        Push a button, generate an app.<br />
                        But — just because you can, should you?
                    </div>
                </div>
                <div>
                    <div className="text-[#ffd166] text-[11px] font-bold mb-1 tracking-wider">
                        ? WHAT DOES IT MEAN TO VIBE CODE <span className="italic">ETHICALLY</span>
                    </div>
                    <div className="text-white/75 pl-3">
                        Stop. Look up from the prompt.<br />
                        Who is this for? Who could it harm?<br />
                        Whose values does it embed?
                    </div>
                </div>
                <div>
                    <div className="text-[#ffd166] text-[11px] font-bold mb-1 tracking-wider">? WHAT ARE VALUES</div>
                    <div className="text-white/75 pl-3">
                        Privacy. Dignity. Equity. Truth. Care.<br />
                        The things we don't compromise — even when the tool says we can.
                    </div>
                </div>
                <div>
                    <div className="text-[#ffd166] text-[11px] font-bold mb-1 tracking-wider">? WHAT DO WE STRIVE FOR</div>
                    <div className="text-white/75 pl-3">
                        Software that's fast to build and slow to harm.<br />
                        Engineers who ship, and who know when not to.<br />
                        A summer of making, breaking, and questioning.
                    </div>
                </div>
            </div>

            <div className="border-t border-[#00ff41]/20 pt-4 text-[10px] max-w-[640px] space-y-3">
                <div>
                    <div className="text-[#00ff41]/70 mb-1 tracking-widest">CORNELL TECH · SUMMER 2026</div>
                    <div className="text-white/55">
                        Hauke Sandhaus · Jonathan Segal · Wendy Ju
                    </div>
                </div>
                <div>
                    <div className="text-[#00ff41]/70 mb-1 tracking-widest">FOR PARTNERS &amp; SPONSORS</div>
                    <div className="text-white/55">
                        Tool credits · guest speakers · real-world project briefs welcome.<br />
                        <a
                            href="mailto:hgs52@cornell.edu"
                            className="text-[#00ff41] hover:underline"
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            hgs52@cornell.edu
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-[#00ff41] text-[11px]">
                &gt; <span className="inline-block w-1.5 h-3 bg-[#00ff41] align-middle animate-pulse" />
            </div>
        </div>
    )
}

export function MonitorContent({ onBack }) {
    const [openWindows, setOpenWindows] = useState({
        [WINDOWS.TERMINAL]: true,
        [WINDOWS.SYLLABUS]: false,
        [WINDOWS.EXAMPLES]: false
    })
    const [focused, setFocused] = useState(WINDOWS.TERMINAL)

    const toggleWindow = (id) => {
        setOpenWindows(prev => {
            const next = { ...prev, [id]: !prev[id] }
            if (next[id]) setFocused(id)
            return next
        })
    }

    const zFor = (id) => (focused === id ? 30 : 10)

    return (
        <div className="w-[1024px] h-[640px] bg-[#050505] overflow-hidden relative font-mono select-none border-4 border-[#1a1a1a] rounded-sm cursor-auto pointer-events-auto">
            {/* Desktop Wallpaper */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-pink-900/10 pointer-events-none" />

            {/* Desktop Icons */}
            <div className="absolute top-6 left-6 flex flex-col gap-5 z-[5]">
                <div
                    className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
                    onClick={() => toggleWindow(WINDOWS.SYLLABUS)}
                >
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg backdrop-blur-sm">
                        <FileText className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} />
                    </div>
                    <span className="text-white/80 text-[10px] font-bold tracking-wide bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-md">syllabus.md</span>
                </div>

                <div
                    className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
                    onClick={() => toggleWindow(WINDOWS.EXAMPLES)}
                >
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg backdrop-blur-sm">
                        <Globe className="text-purple-400 group-hover:text-purple-300 transition-colors" size={24} />
                    </div>
                    <span className="text-white/80 text-[10px] font-bold tracking-wide bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-md">examples.url</span>
                </div>

                <div
                    className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
                    onClick={() => toggleWindow(WINDOWS.TERMINAL)}
                >
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg backdrop-blur-sm">
                        <Terminal className="text-green-400 group-hover:text-green-300 transition-colors" size={24} />
                    </div>
                    <span className="text-white/80 text-[10px] font-bold tracking-wide bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-md">welcome.sh</span>
                </div>
            </div>

            {/* Welcome Terminal — opens centered, near full size */}
            <Window
                title="WELCOME — vibe-coding-ethics"
                icon={Terminal}
                isOpen={openWindows[WINDOWS.TERMINAL]}
                onClose={() => toggleWindow(WINDOWS.TERMINAL)}
                onFocus={() => setFocused(WINDOWS.TERMINAL)}
                zIndex={zFor(WINDOWS.TERMINAL)}
                x={130} y={20} width={870} height={560}
            >
                <WelcomeTerminal />
            </Window>

            {/* Syllabus Window */}
            <Window
                title="SYLLABUS READER"
                icon={FileText}
                isOpen={openWindows[WINDOWS.SYLLABUS]}
                onClose={() => toggleWindow(WINDOWS.SYLLABUS)}
                onFocus={() => setFocused(WINDOWS.SYLLABUS)}
                zIndex={zFor(WINDOWS.SYLLABUS)}
                x={150} y={40} width={620} height={520}
            >
                <div className="bg-[#f5f5f5] text-[#1a1a1a] min-h-full p-8 font-serif">
                    <div className="prose prose-sm max-w-none syllabus-md">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({ src, alt, ...rest }) => {
                                    const rewritten = typeof src === 'string' && src.startsWith('assets/')
                                        ? `${import.meta.env.BASE_URL}syllabus-${src}`
                                        : src
                                    return <img src={rewritten} alt={alt} {...rest} />
                                },
                            }}
                        >
                            {syllabusMarkdown}
                        </ReactMarkdown>
                    </div>
                </div>
            </Window>

            {/* Examples Window (iframe) */}
            <Window
                title="EXAMPLES — vibe-coding-ethics.tech.cornell.edu"
                icon={Globe}
                isOpen={openWindows[WINDOWS.EXAMPLES]}
                onClose={() => toggleWindow(WINDOWS.EXAMPLES)}
                onFocus={() => setFocused(WINDOWS.EXAMPLES)}
                zIndex={zFor(WINDOWS.EXAMPLES)}
                x={200} y={60} width={760} height={520}
            >
                <iframe
                    src={EXAMPLES_URL}
                    title="Examples"
                    className="w-full h-full bg-white border-0"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
            </Window>

            {/* Taskbar */}
            <div className="absolute bottom-0 w-full h-10 bg-[#0e101a]/90 backdrop-blur-md border-t border-white/5 flex items-center px-4 justify-between z-50">
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 flex items-center justify-center hover:bg-red-500/20 rounded transition-colors group cursor-pointer"
                        title="Log Off (Back)"
                        onClick={onBack}
                    >
                        <div className="w-4 h-4 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-sm group-hover:from-red-500 group-hover:to-pink-500 transition-all" />
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
                    <button
                        onClick={() => toggleWindow(WINDOWS.EXAMPLES)}
                        className={`w-8 h-8 flex items-center justify-center rounded transition-all ${openWindows[WINDOWS.EXAMPLES] ? 'bg-white/10 border-b-2 border-purple-500' : 'hover:bg-white/5 opacity-50'}`}
                    >
                        <Globe size={16} className="text-purple-400" />
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

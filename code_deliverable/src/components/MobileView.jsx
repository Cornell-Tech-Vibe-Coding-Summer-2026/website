import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SuggestedReadingsView, ReadingView } from './ReadingViews'
import syllabusMarkdown from '../content/syllabus.md?raw'
import { VIBE_FEED } from '../content/vibe-feed'
import { VibeReel } from './VibeReel'

// TODO: change to '/examples' once deployment restructure ships
const EXAMPLES_URL = 'https://vibe-coding-ethics.tech.cornell.edu/'

// Content shown inside the phone card modal: real TikTok / Instagram embeds
function PhoneModal() {
    const scrollRef = useRef(null)
    return (
        <div
            ref={scrollRef}
            className="flex flex-col w-full h-full bg-black text-white overflow-y-auto snap-y snap-mandatory"
        >
            {VIBE_FEED.map((entry) => (
                <div
                    key={`${entry.platform}-${entry.id}`}
                    className="w-full"
                    style={{ height: '100%', flex: '0 0 100%' }}
                >
                    <VibeReel entry={entry} scrollRoot={scrollRef} />
                </div>
            ))}
            {VIBE_FEED.length === 0 && (
                <div className="flex-shrink-0 w-full h-full flex items-center justify-center text-white/40 text-xs font-mono p-6 text-center" style={{ height: '100%' }}>
                    No vibe-feed entries configured yet.
                </div>
            )}
        </div>
    )
}

function TerminalModal() {
    return (
        <div className="p-5 font-mono text-xs leading-relaxed bg-[#0a0e0a] min-h-full">
            <div className="text-[#00ff41] text-[11px] mb-4 leading-tight">
                <div className="font-bold tracking-wider">TECHIE 1121 · ETHICAL VIBE CODING</div>
                <div className="text-[#00ff41]/70">Good Code, Good Vibes — Building Ethical Apps with AI</div>
                <div className="text-[#00ff41]/50 text-[10px] mt-1">Cornell Tech · Summer 2026 (2026SU)</div>
            </div>

            <div className="text-[#00ff41]/70 text-[10px] mb-5 space-y-0.5">
                <div>&gt; initializing course...</div>
                <div>&gt; instructors online: hauke · jonathan · wendy</div>
                <div>&gt; ready.</div>
            </div>

            <div className="space-y-4 mb-5">
                <div>
                    <div className="text-[#ffd166] text-[10px] font-bold mb-1 tracking-wider">? WHAT IS VIBE CODING</div>
                    <div className="text-white/75 text-[11px]">
                        Building software with AI as your co-author. Push a button, generate an app. But — just because you can, should you?
                    </div>
                </div>
                <div>
                    <div className="text-[#ffd166] text-[10px] font-bold mb-1 tracking-wider">? VIBE CODING <span className="italic">ETHICALLY</span>?</div>
                    <div className="text-white/75 text-[11px]">
                        Stop. Look up from the prompt. Who is this for? Who could it harm? Whose values does it embed?
                    </div>
                </div>
                <div>
                    <div className="text-[#ffd166] text-[10px] font-bold mb-1 tracking-wider">? WHAT ARE VALUES</div>
                    <div className="text-white/75 text-[11px]">
                        Privacy. Dignity. Equity. Truth. Care. The things we don't compromise — even when the tool says we can.
                    </div>
                </div>
                <div>
                    <div className="text-[#ffd166] text-[10px] font-bold mb-1 tracking-wider">? WHAT DO WE STRIVE FOR</div>
                    <div className="text-white/75 text-[11px]">
                        Software that's fast to build and slow to harm. Engineers who ship, and who know when not to. A summer of making, breaking, and questioning.
                    </div>
                </div>
            </div>

            <div className="border-t border-[#00ff41]/20 pt-3 text-[10px] space-y-2.5">
                <div>
                    <div className="text-[#00ff41]/70 mb-1 tracking-widest">CORNELL TECH · SUMMER 2026</div>
                    <div className="text-white/55">Hauke Sandhaus · Jonathan Segal · Wendy Ju</div>
                </div>
                <div>
                    <div className="text-[#00ff41]/70 mb-1 tracking-widest">FOR PARTNERS &amp; SPONSORS</div>
                    <div className="text-white/55">
                        Tool credits · guest speakers · real-world projects welcome.<br />
                        <a href="mailto:hgs52@cornell.edu" className="text-[#00ff41] hover:underline">hgs52@cornell.edu</a>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-[#00ff41] text-[11px]">
                &gt; <span className="inline-block w-1.5 h-3 bg-[#00ff41] align-middle animate-pulse" />
            </div>
        </div>
    )
}


function SyllabusModal() {
    return (
        <div className="bg-[#f5f5f5] text-[#1a1a1a] min-h-full p-6 font-serif">
            <div className="syllabus-md max-w-none">
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
    )
}

function ExamplesModal() {
    return (
        <iframe
            src={EXAMPLES_URL}
            title="Examples"
            className="w-full h-full bg-white border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
    )
}

function DesktopModal({ onClose }) {
    const [tab, setTab] = useState('syllabus')
    return (
        <div className="flex flex-col h-full bg-[#050505] font-mono">
            {/* Fake desktop wallpaper */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-pink-900/10 pointer-events-none" />

            {/* Tab bar */}
            <div className="relative z-10 flex gap-1 p-2 bg-[#0e101a] border-b border-white/5">
                {[['syllabus', '📄 Syllabus'], ['examples', '🌐 Examples'], ['terminal', '> Terminal']].map(([id, label]) => (
                    <button
                        key={id}
                        onClick={() => setTab(id)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all ${tab === id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto bg-[#131520]">
                {tab === 'terminal' && <TerminalModal />}
                {tab === 'syllabus' && <SyllabusModal />}
                {tab === 'examples' && <ExamplesModal />}
            </div>
        </div>
    )
}

function NotepadModal() {
    const items = [
        { text: 'Syllabus', done: true },
        { text: 'Website', done: true },
        { text: 'Slide decks', done: false },
        { text: 'Reading list', done: false },
        { text: 'Guest speakers', done: false },
        { text: 'GitHub Classroom', done: false },
        { text: 'Tool credits', done: false },
    ]
    return (
        <div className="p-6 font-mono bg-[#fffef5] min-h-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Class Prep:</h2>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className={`flex items-center gap-3 text-sm ${item.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        <span className="text-base">{item.done ? '✔️' : '☐'}</span>
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}

// Desk item card definitions
const DESK_ITEMS = [
    { id: 'desktop', label: 'Desktop', sublabel: 'Syllabus & Examples', icon: '🖥️', wide: true },
    { id: 'phone',   label: 'Phone',   sublabel: 'Social Feed',     icon: '📱', wide: false },
    { id: 'notepad', label: 'Notepad', sublabel: 'To-Do List',      icon: '📝', wide: false },
    { id: 'book',    label: 'Values at Play', sublabel: 'Reading',  icon: '📖', wide: false },
    { id: 'papers',  label: 'Readings', sublabel: 'Suggested Papers', icon: '📄', wide: false },
]

function DeskCard({ item, onClick }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative bg-white/[0.04] border border-white/10 rounded-2xl p-5 flex flex-col gap-2 text-left active:bg-white/10 transition-colors ${item.wide ? 'col-span-2' : 'col-span-1'}`}
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
        >
            <span className="text-3xl">{item.icon}</span>
            <div>
                <p className="text-white text-sm font-bold tracking-tight">{item.label}</p>
                <p className="text-white/40 text-xs font-mono uppercase tracking-wider mt-0.5">{item.sublabel}</p>
            </div>
            <div className="absolute top-3 right-3 text-white/20 text-xs font-mono">→</div>
        </motion.button>
    )
}

function FullscreenModal({ title, onClose, children }) {
    if (typeof document === 'undefined') return null
    return createPortal(
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-0 z-[300] flex flex-col bg-[#050505]"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0e101a] shrink-0">
                <span className="text-white text-sm font-bold uppercase tracking-wider font-mono">{title}</span>
                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all text-lg"
                >
                    ✕
                </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
                {children}
            </div>
        </motion.div>,
        document.body
    )
}

export function MobileView() {
    const [open, setOpen] = useState(null) // id of open item

    const close = () => setOpen(null)

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-y-auto">
            {/* Subtle desk surface texture */}
            <div className="fixed inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-white/[0.02] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 px-6 pt-10 pb-5">
                <img
                    src={`${import.meta.env.BASE_URL}cornell-tech-logo-optimized.png`}
                    alt="Cornell Tech"
                    className="h-6 mb-3 opacity-90"
                />
                <h1 className="text-white text-3xl font-black tracking-tighter uppercase leading-none mb-1.5">
                    Ethical Vibe Coding
                </h1>
                <p className="text-white/85 text-[13px] font-mono tracking-widest uppercase mb-3">
                    Designing with Conscience
                </p>
                <p className="text-white/45 text-[10px] font-mono tracking-widest uppercase mb-0.5">
                    TECHIE 1121 · Cornell Tech · Summer 2026
                </p>
                <p className="text-white/35 text-[10px] font-mono tracking-wider">
                    Hauke Sandhaus · Jonathan Segal · Wendy Ju
                </p>
            </div>

            {/* Welcome / pitch content inline so the landing has substance */}
            <div className="relative z-10 px-6 pb-6 space-y-5">
                <div className="border-l-2 border-[#00ff41]/50 pl-4 py-1">
                    <p className="text-white/80 text-[14px] leading-relaxed">
                        Build software with AI as your co-author. Push a button, generate an app.
                    </p>
                    <p className="text-[#00ff41] text-[14px] font-medium mt-1">
                        But — just because you can, should you?
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-[#ffd166] text-[10px] font-mono font-bold tracking-widest mb-1">? WHAT IS VIBE CODING</p>
                        <p className="text-white/70 text-[13px] leading-relaxed">
                            Building software with AI as your co-author. The line between &ldquo;designer&rdquo; and &ldquo;developer&rdquo; gets blurry — fast.
                        </p>
                    </div>
                    <div>
                        <p className="text-[#ffd166] text-[10px] font-mono font-bold tracking-widest mb-1">? VIBE CODING <span className="italic">ETHICALLY</span>?</p>
                        <p className="text-white/70 text-[13px] leading-relaxed">
                            Stop. Look up from the prompt. Who is this for? Who could it harm? Whose values does it embed?
                        </p>
                    </div>
                    <div>
                        <p className="text-[#ffd166] text-[10px] font-mono font-bold tracking-widest mb-1">? WHAT ARE VALUES</p>
                        <p className="text-white/70 text-[13px] leading-relaxed">
                            Privacy. Dignity. Equity. Truth. Care. The things we don&rsquo;t compromise — even when the tool says we can.
                        </p>
                    </div>
                    <div>
                        <p className="text-[#ffd166] text-[10px] font-mono font-bold tracking-widest mb-1">? WHAT DO WE STRIVE FOR</p>
                        <p className="text-white/70 text-[13px] leading-relaxed">
                            Software that&rsquo;s fast to build and slow to harm. Engineers who ship, and who know when not to.
                        </p>
                    </div>
                </div>

            </div>

            {/* Desk label */}
            <div className="relative z-10 px-6 mb-3 mt-2">
                <span className="text-white/25 text-[10px] font-mono uppercase tracking-[0.2em]">— desk —</span>
                <p className="text-white/30 text-[11px] mt-1.5">Tap any item to dive deeper.</p>
            </div>

            {/* Cards grid */}
            <div className="relative z-10 px-4 pb-10">
                <div className="grid grid-cols-2 gap-3">
                    {DESK_ITEMS.map(item => (
                        <DeskCard key={item.id} item={item} onClick={() => setOpen(item.id)} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 px-6 pb-12 text-center">
                <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">
                    Cornell Tech · Summer 2026
                </p>
                <a
                    href="mailto:hgs52@cornell.edu"
                    className="text-white/50 text-[11px] font-mono mt-1 inline-block hover:text-white/80 transition-colors"
                >
                    hgs52@cornell.edu
                </a>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {open === 'desktop' && (
                    <FullscreenModal title="Desktop" onClose={close}>
                        <DesktopModal onClose={close} />
                    </FullscreenModal>
                )}
                {open === 'phone' && (
                    <FullscreenModal title="Phone" onClose={close}>
                        <PhoneModal onClose={close} />
                    </FullscreenModal>
                )}
                {open === 'notepad' && (
                    <FullscreenModal title="Notepad" onClose={close}>
                        <NotepadModal />
                    </FullscreenModal>
                )}
                {open === 'book' && (
                    <ReadingView onClose={close} />
                )}
                {open === 'papers' && (
                    <SuggestedReadingsView onClose={close} />
                )}
            </AnimatePresence>
        </div>
    )
}

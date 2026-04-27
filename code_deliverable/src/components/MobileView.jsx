import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SuggestedReadingsView, ReadingView } from './ReadingViews'
import syllabusMarkdown from '../content/syllabus.md?raw'

// TODO: change to '/examples' once deployment restructure ships
const EXAMPLES_URL = 'https://vibe-coding-ethics.tech.cornell.edu/'

// Content shown inside the phone card modal (scaled to fit mobile)
function PhoneModal({ onClose }) {
    const reels = [
        { id: 1, title: 'How to vibe code in 30s', author: '@hauke.haus', color: 'bg-indigo-900', emoji: '🚀' },
        { id: 2, title: 'Why code needs values', author: '@ethic.vision', color: 'bg-rose-900', emoji: '⚖️' },
        { id: 3, title: 'Summer 2026: Join the class!', author: '@cornell.tech', color: 'bg-emerald-900', emoji: '🎓' },
    ]
    return (
        <div className="flex flex-col w-full h-full bg-black text-white overflow-y-auto snap-y snap-mandatory">
            {reels.map((reel) => (
                <div key={reel.id} className="flex-shrink-0 w-full snap-start relative flex items-center justify-center" style={{ height: '100%' }}>
                    <div className={`absolute inset-0 ${reel.color} opacity-40`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
                    <div className="text-8xl z-0">{reel.emoji}</div>
                    <div className="absolute bottom-12 left-6 right-16 z-20">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[10px] font-bold">
                                {reel.author.substring(1, 4).toUpperCase()}
                            </div>
                            <p className="font-black text-sm">{reel.author}</p>
                        </div>
                        <p className="text-lg font-medium leading-tight mb-4">{reel.title}</p>
                        <div className="flex gap-4 opacity-60 text-[10px] font-mono uppercase tracking-widest">
                            <span>#vibecoding</span>
                            <span>#ethics</span>
                        </div>
                    </div>
                    <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-30">
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">❤️</div>
                            <span className="text-[10px] font-bold">2.4k</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">💬</div>
                            <span className="text-[10px] font-bold">128</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function TerminalModal() {
    const lines = [
        '  INITIALIZING VIBE-CODING-ETHICS...',
        '',
        '  [SYSTEM]: LOAD MODULE 0x7F21',
        '  [SYSTEM]: CHARACTER ANALYZER ONLINE',
        '  [SYSTEM]: CONNECTING TO CORNELL TECH...',
        '',
        '  > WELCOME TO SUMMER 2026',
        '  > DESIGNING WITH CHARACTER',
        '',
        '  _',
    ]
    return (
        <div className="p-6 font-mono text-[#00ff41] text-sm leading-relaxed space-y-0.5">
            {lines.map((line, i) => (
                <div key={i}>{line || '\u00A0'}</div>
            ))}
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
        { text: '3D setup', done: true },
        { text: '2D interactions', done: true },
        { text: 'Edit content', done: false },
        { text: 'Fix 3D interaction bugs', done: false },
        { text: 'Host online', done: false },
    ]
    return (
        <div className="p-6 font-mono bg-[#fffef5] min-h-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">ToDo:</h2>
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
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="absolute inset-0 z-[300] flex flex-col bg-[#050505]"
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
        </motion.div>
    )
}

export function MobileView() {
    const [open, setOpen] = useState(null) // id of open item

    const close = () => setOpen(null)

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-hidden">
            {/* Subtle desk surface texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/[0.02] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 px-6 pt-10 pb-6">
                <img
                    src={`${import.meta.env.BASE_URL}cornell-tech-logo-optimized.png`}
                    alt="Cornell Tech"
                    className="h-6 mb-3 opacity-90"
                />
                <h1 className="text-white text-3xl font-black tracking-tighter uppercase leading-none mb-1">
                    Vibe Coding Ethics
                </h1>
                <p className="text-white/40 text-[11px] font-mono tracking-widest uppercase">
                    Designing with Conscience · Cornell Tech 2026
                </p>
            </div>

            {/* Desk label */}
            <div className="relative z-10 px-6 mb-3">
                <span className="text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">— desk —</span>
            </div>

            {/* Cards grid */}
            <div className="relative z-10 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 160px)' }}>
                <div className="grid grid-cols-2 gap-3 pb-8">
                    {DESK_ITEMS.map(item => (
                        <DeskCard key={item.id} item={item} onClick={() => setOpen(item.id)} />
                    ))}
                </div>
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

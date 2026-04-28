import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

const READINGS = [
    {
        title: 'Why Johnny Can\'t Prompt',
        authors: 'Zamfirescu-Pereira, Wong, Hartmann, Yang — CHI 2023',
        venue: 'ACM CHI',
        kind: 'paper',
        url: 'https://dl.acm.org/doi/10.1145/3544548.3581388',
        abstract: 'Non-AI-experts struggle to design effective prompts for LLMs. The authors find that users approach prompting opportunistically rather than systematically, and rarely revise prompts based on observed model behavior. A foundational read on the limits of vibe coding.',
    },
    {
        title: 'Bias in Computer Systems',
        authors: 'Friedman & Nissenbaum — 1996',
        venue: 'ACM Transactions on Information Systems',
        kind: 'paper',
        url: 'https://nissenbaum.tech.cornell.edu/papers/biasincomputers.pdf',
        abstract: 'Identifies three categories of bias in computer systems: preexisting (rooted in social institutions), technical (from constraints), and emergent (in context of use). The vocabulary the field still uses today.',
    },
    {
        title: 'Values at Play in Digital Games',
        authors: 'Flanagan & Nissenbaum — 2014',
        venue: 'MIT Press',
        kind: 'book',
        url: 'https://drive.google.com/file/d/14fTIg05HNcARYP5JrEJ87KC29D2QAgqM/view?usp=drive_link',
        abstract: 'The framework that anchors the second week of the class. Values are embedded in technology — the question is whether designers do it intentionally. Provides discovery, translation, and verification heuristics for value-sensitive design.',
    },
    {
        title: 'Obfuscation: A User\'s Guide for Privacy and Protest',
        authors: 'Brunton & Nissenbaum — 2015',
        venue: 'MIT Press',
        kind: 'book',
        url: 'https://direct.mit.edu/books/book/3112/ObfuscationA-User-s-Guide-for-Privacy-and-Protest',
        abstract: 'When you can\'t hide, drown the signal in noise. A toolkit of obfuscation strategies — from TrackMeNot to ad-nauseating bots — and a moral defense of using AI against AI.',
    },
    {
        title: 'Workers Weaponizing AI Against Each Other',
        authors: 'OfficeChai — 2024',
        venue: 'Article',
        kind: 'article',
        url: 'https://officechai.com/ai/chinas-workers-are-weaponizing-ai-against-each-other-through-colleague-skill-files-and-fighting-back/',
        abstract: 'Field report from China: workers use AI to track each other, then use AI again to push back. A glimpse at what "AI for protection from work automation" looks like in practice — material for week 2 (AI vs. AI).',
    },
    {
        title: 'Public Interest Technology Ethics Workshop',
        authors: 'Cornell PiTech',
        venue: 'Workshop site',
        kind: 'site',
        url: 'https://pitechethics.github.io/',
        abstract: 'The VAP Ethics Thinking Canvas used in week 2 was developed here. Browse the canvas, the case studies, and the workshop materials before applying VAP to your own project.',
    },
]

const KIND_TAG = {
    paper: { label: 'Paper', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    book: { label: 'Book', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    article: { label: 'Article', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    site: { label: 'Site', color: 'bg-purple-50 text-purple-800 border-purple-200' },
}

function ReadingCard({ reading }) {
    const tag = KIND_TAG[reading.kind] ?? KIND_TAG.paper
    return (
        <a
            href={reading.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[360px] h-[520px] bg-white shadow-md hover:shadow-2xl hover:border-gray-400 transition-all duration-200 border border-gray-200 p-7 flex flex-col snap-center group rounded"
        >
            <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${tag.color}`}>
                    {tag.label}
                </span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    {reading.venue}
                </span>
            </div>
            <h3 className="text-xl font-bold mb-2 font-serif text-[#1a1a1a] leading-tight">
                {reading.title}
            </h3>
            <p className="text-sm text-gray-500 italic mb-5">{reading.authors}</p>
            <p className="flex-1 text-[13px] text-gray-700 leading-relaxed font-serif overflow-y-auto pr-1">
                {reading.abstract}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest truncate max-w-[200px]">
                    {(() => { try { return new URL(reading.url).hostname.replace(/^www\./, '') } catch { return '' } })()}
                </span>
                <span className="text-blue-700 text-sm font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    Open ↗
                </span>
            </div>
        </a>
    )
}

export function SuggestedReadingsView({ onClose, origin }) {
    const initial = origin
        ? { x: origin.x - window.innerWidth / 2, y: origin.y - window.innerHeight / 2, scale: 0, opacity: 0 }
        : { scale: 0.8, opacity: 0 }

    if (typeof document === 'undefined') return null
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={initial}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={initial}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-[#f0efeb] text-gray-900 w-full max-w-6xl h-[90vh] p-8 rounded-lg shadow-2xl overflow-hidden relative flex flex-col origin-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-2xl opacity-50 hover:opacity-100 z-10">
                    ✕
                </button>

                <div className="mb-6 pr-12">
                    <h2 className="text-3xl font-bold text-[#222] font-serif">Suggested Readings</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Selected sources that anchor the class. Click any card to open the source in a new tab.
                    </p>
                </div>

                <div className="flex-1 overflow-x-auto overflow-y-hidden flex items-stretch gap-6 px-1 py-4 snap-x snap-mandatory">
                    {READINGS.map((r) => (
                        <ReadingCard key={r.url} reading={r} />
                    ))}
                </div>

                <div className="text-center mt-3 text-gray-400 text-xs font-mono uppercase tracking-widest">
                    ← scroll horizontally →
                </div>
            </motion.div>
        </motion.div>,
        document.body
    )
}

export function ReadingView({ onClose, origin }) {
    // Default origin if not provided
    const initial = origin ? { x: origin.x - window.innerWidth / 2, y: origin.y - window.innerHeight / 2, scale: 0, opacity: 0 } : { scale: 0.8, opacity: 0 }

    if (typeof document === 'undefined') return null
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={initial}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={initial}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#f4e4bc] text-gray-900 w-full max-w-4xl h-[90vh] p-12 rounded shadow-2xl overflow-y-auto relative font-serif origin-center"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-8 right-8 text-2xl opacity-50 hover:opacity-100">✕</button>

                <h1 className="text-5xl font-bold mb-4 font-serif text-[#2a2a2a]">Values at Play in Digital Games</h1>
                <h2 className="text-2xl italic mb-12 text-[#5a5a5a]">Mary Flanagan and Helen Nissenbaum</h2>

                <div className="grid grid-cols-2 gap-12 text-lg leading-relaxed">
                    <div>
                        <p className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3">
                            Values are not just added to technology; they are embedded within it. This core insight drives the "Values at Play" (VAP) framework, offering a systematic approach to identifying, negotiating, and implementing ethical values in game design.
                        </p>
                        <p className="mb-6">
                            Designers must move beyond "neutrality" and recognize that every design choice—from mechanics to narrative to character representation—expresses a value system. The VAP framework empowers creators to make these choices intentional.
                        </p>
                        <h3 className="text-xl font-bold mt-8 mb-4 border-b border-gray-400 pb-2">Core VAP Heuristics</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Discovery:</strong> Translating values into design elements.</li>
                            <li><strong>Translation:</strong> Implement values via mechanics.</li>
                            <li><strong>Verification:</strong> resolving conflicts.</li>
                        </ul>
                    </div>
                    <div className="space-y-8">
                        <div className="p-6 bg-[#2a2a2a] text-white rounded">
                            <h4 className="font-bold uppercase tracking-widest text-sm mb-2 text-yellow-500">Public Interest Tech</h4>
                            <p className="text-sm opacity-80 mb-4">
                                Explore how technology can serve the public good. Vibe Coding integrates these principles directly into the technical workflow.
                            </p>
                            <a href="https://pitechethics.github.io/" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 border border-white/30 hover:bg-white hover:text-black transition-colors text-sm uppercase tracking-wider">
                                Visit PiTech Ethics
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    )
}

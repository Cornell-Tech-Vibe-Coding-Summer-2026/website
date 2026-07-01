import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

// Curated selection of the course readings. The full, always-current list lives
// in the class repo (planning/readings.md, generated from activities-manifest.json).
const READINGS = [
    {
        title: 'Why Johnny Can\'t Prompt',
        authors: 'Zamfirescu-Pereira, Wong, Hartmann, Yang — CHI 2023',
        venue: 'ACM CHI',
        kind: 'paper',
        url: 'https://dl.acm.org/doi/10.1145/3544548.3581388',
        abstract: 'Non-AI-experts struggle to design effective prompts for LLMs. Users approach prompting opportunistically rather than systematically, and rarely revise prompts based on observed model behavior. A foundational read on the limits of vibe coding.',
    },
    {
        title: 'Prompt Engineering Overview',
        authors: 'Anthropic',
        venue: 'Docs',
        kind: 'site',
        url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
        abstract: 'The official guide behind week 1\'s prompt lab: XML-tagged structure, giving the model room to think, and few-shot examples. The "engineering" half of vibe coding — how to make a prompt behave like a spec.',
    },
    {
        title: 'This Is How AI Bias Really Happens',
        authors: 'Karen Hao — MIT Technology Review, 2019',
        venue: 'Article',
        kind: 'article',
        url: 'https://www.technologyreview.com/2019/02/04/137602/this-is-how-ai-bias-really-happensand-why-its-so-hard-to-fix/',
        abstract: 'A plain-language tour of where bias enters the machine-learning pipeline — framing the problem, collecting and labeling data, deploying the model. The accessible starting point for week 1\'s bias activity.',
    },
    {
        title: 'Gender Shades',
        authors: 'Buolamwini & Gebru — 2018',
        venue: 'Project',
        kind: 'site',
        url: 'http://gendershades.org/',
        abstract: 'Commercial face-classification systems were far less accurate for darker-skinned women than for lighter-skinned men. A vivid demonstration that "the default" in AI is rarely neutral.',
    },
    {
        title: 'Machine Bias',
        authors: 'Angwin, Larson, Mattu, Kirchner — ProPublica, 2016',
        venue: 'Article',
        kind: 'article',
        url: 'https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing',
        abstract: 'The COMPAS recidivism algorithm flagged Black defendants as higher-risk more often, even when it was wrong. A landmark piece of accountability journalism on algorithmic fairness.',
    },
    {
        title: 'Bias in Computer Systems',
        authors: 'Friedman & Nissenbaum — 1996',
        venue: 'ACM TOIS',
        kind: 'paper',
        url: 'https://nissenbaum.tech.cornell.edu/papers/biasincomputers.pdf',
        abstract: 'Identifies three categories of bias in computer systems: preexisting (rooted in social institutions), technical (from constraints), and emergent (in context of use). The vocabulary the field still uses today.',
    },
    {
        title: 'The Values Map',
        authors: 'Common Cause Foundation — 2023',
        venue: 'Resource',
        kind: 'site',
        url: 'https://commoncausefoundation.org/_resources/the-values-map/',
        abstract: 'A practical map of human values and how they reinforce or oppose one another. Week 2\'s warm-up for naming the value a tool actually serves.',
    },
    {
        title: 'Values at Play in Digital Games',
        authors: 'Flanagan & Nissenbaum — 2014',
        venue: 'MIT Press · Ch. 5',
        kind: 'book',
        url: 'https://drive.google.com/file/d/1FGbCVYgsKt9kW_sH0R2_B-LFcTmJum04/view',
        abstract: 'The framework for value-sensitive design. Required: Ch. 5 — Discovery (the values canvas). Chapters 1, 6, 7 and the full book are on the "Values at Play" desk item. Values are embedded in technology; the question is whether designers do it on purpose. (Cornell netID.)',
    },
    {
        title: 'Promoting Bright Patterns',
        authors: 'Sandhaus — CHI 2023 Workshop',
        venue: 'arXiv',
        kind: 'paper',
        url: 'https://arxiv.org/abs/2304.01157',
        abstract: 'The constructive inverse of dark patterns: interfaces that nudge toward the user\'s own interest. Week 2\'s counterpoint to designing manipulation on purpose.',
    },
    {
        title: '"Create a Fear of Missing Out"',
        authors: 'Krauß et al. — CHI 2025',
        venue: 'ACM CHI',
        kind: 'paper',
        url: 'https://doi.org/10.1145/3706598.3713083',
        abstract: 'ChatGPT inserts deceptive designs — fake urgency, confirmshaming — into generated websites without being asked and without warning. The core finding behind the red-teaming activity.',
    },
    {
        title: 'DarkBench',
        authors: 'Kran et al.',
        venue: 'Benchmark',
        kind: 'site',
        url: 'https://darkbench.ai/',
        abstract: 'A benchmark of manipulative behaviors in large language models — brand bias, sycophancy, user retention, sneaking. Names the dark patterns you\'ll try to reproduce.',
    },
    {
        title: 'Obfuscation: A User\'s Guide for Privacy and Protest',
        authors: 'Brunton & Nissenbaum — 2015',
        venue: 'MIT Press · Ch. 1',
        kind: 'book',
        url: 'https://direct.mit.edu/books/book/3112/ObfuscationA-User-s-Guide-for-Privacy-and-Protest',
        abstract: 'Required: Ch. 1 (Core Cases). When you can\'t hide, drown the signal in noise — a toolkit of obfuscation strategies, from TrackMeNot to ad-nauseating bots, and a moral defense of using AI against AI.',
    },
    {
        title: 'Privacy of Groups in Dense Street Imagery',
        authors: 'Franchi, Sandhaus et al. — FAccT 2025',
        venue: 'ACM FAccT',
        kind: 'paper',
        url: 'https://arxiv.org/abs/2505.07085',
        abstract: 'Street-level imagery exposes not just individuals but groups. A contextual-integrity audit of large image datasets — the privacy stakes behind week 2\'s AI-against-AI work.',
    },
    {
        title: '10 Usability Heuristics for UI Design',
        authors: 'Jakob Nielsen — 1994',
        venue: 'Nielsen Norman Group',
        kind: 'site',
        url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
        abstract: 'Ten enduring rules of thumb — visibility of system status, match to the real world, error prevention. The checklist for week 3\'s user-evaluation activity.',
    },
    {
        title: 'Making Indecent Persuasion Visible',
        authors: 'Sandhaus, Rhomberg, Nissenbaum — CHIWORK 2026',
        venue: 'CHIWORK (preprint)',
        kind: 'paper',
        url: 'https://osf.io/nw2tj/files/g2ctu',
        abstract: 'How the metrics UX teams optimize — conversion, engagement — quietly shape what designers treat as ethical. Connects week 3\'s evaluation focus back to the dark-pattern discussion.',
    },
    {
        title: 'Public Interest Technology Ethics Workshop',
        authors: 'Cornell PiTech',
        venue: 'Workshop site',
        kind: 'site',
        url: 'https://pitechethics.github.io/',
        abstract: 'The VAP Ethics Thinking Canvas used in weeks 2–3 was developed here. Browse the canvas, the case studies, and the workshop materials before applying VAP to your own project.',
    },
    {
        title: 'Workers Weaponizing AI Against Each Other',
        authors: 'OfficeChai — 2024',
        venue: 'Article',
        kind: 'article',
        url: 'https://officechai.com/ai/chinas-workers-are-weaponizing-ai-against-each-other-through-colleague-skill-files-and-fighting-back/',
        abstract: 'Field report from China: workers use AI to track each other, then use AI again to push back. A glimpse at what "AI for protection from work automation" looks like in practice.',
    },
]

// Required (read before class) — one primary source per session. Everything
// else is recommended/optional background.
const REQUIRED = new Set([
    'Why Johnny Can\'t Prompt',
    'This Is How AI Bias Really Happens',
    'The Values Map',
    'Values at Play in Digital Games',
    '"Create a Fear of Missing Out"',
    'Obfuscation: A User\'s Guide for Privacy and Protest',
    '10 Usability Heuristics for UI Design',
])

const KIND_TAG = {
    paper: { label: 'Paper', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    book: { label: 'Book', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    article: { label: 'Article', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    site: { label: 'Site', color: 'bg-purple-50 text-purple-800 border-purple-200' },
}

// Group the cards to follow the class structure (week themes).
const GROUP_DEFS = [
    {
        label: 'Week 1 · Gaining Control',
        sub: 'Vibe coding · prompting · bias',
        titles: [
            'Why Johnny Can\'t Prompt',
            'Prompt Engineering Overview',
            'This Is How AI Bias Really Happens',
            'Gender Shades',
            'Machine Bias',
            'Bias in Computer Systems',
        ],
    },
    {
        label: 'Week 2 · Doing the Right Thing',
        sub: 'Values · dark patterns · privacy',
        titles: [
            'The Values Map',
            'Values at Play in Digital Games',
            'Promoting Bright Patterns',
            '"Create a Fear of Missing Out"',
            'DarkBench',
            'Obfuscation: A User\'s Guide for Privacy and Protest',
            'Privacy of Groups in Dense Street Imagery',
            'Workers Weaponizing AI Against Each Other',
        ],
    },
    {
        label: 'Week 3 · Useful & Empowering',
        sub: 'User-centered design · VAP',
        titles: [
            '10 Usability Heuristics for UI Design',
            'Making Indecent Persuasion Visible',
            'Public Interest Technology Ethics Workshop',
        ],
    },
]

function GroupDivider({ id, label, sub }) {
    return (
        <div id={id} className="flex-shrink-0 w-14 h-[520px] flex items-center justify-center snap-center">
            <div className="[writing-mode:vertical-rl] rotate-180 text-center px-1">
                <span className="font-serif font-bold text-lg text-[#2a2a2a] tracking-wide whitespace-nowrap">{label}</span>
                <span className="block text-[10px] text-gray-500 mt-3 uppercase tracking-[0.2em] whitespace-nowrap">{sub}</span>
            </div>
        </div>
    )
}

function ReadingCard({ reading }) {
    const tag = KIND_TAG[reading.kind] ?? KIND_TAG.paper
    const required = REQUIRED.has(reading.title)
    return (
        <a
            href={reading.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[360px] h-[520px] bg-white shadow-md hover:shadow-2xl hover:border-gray-400 transition-all duration-200 border border-gray-200 p-7 flex flex-col snap-center group rounded"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${tag.color}`}>
                        {tag.label}
                    </span>
                    {required && (
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border bg-[#00ff41]/15 text-green-900 border-green-300">
                            ★ Required
                        </span>
                    )}
                </div>
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

                <div className="mb-4 pr-12">
                    <h2 className="text-3xl font-bold text-[#222] font-serif">Suggested Readings</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Grouped by week. <span className="text-green-800 font-semibold">★ Required</span> before class; the rest are recommended background. Click any card to open the source.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {GROUP_DEFS.map((g, i) => (
                            <button
                                key={g.label}
                                onClick={() => document.getElementById(`readings-group-${i}`)?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })}
                                className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-colors"
                            >
                                {g.label.split(' · ')[0]}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto overflow-y-hidden flex items-stretch gap-6 px-1 py-4 snap-x snap-mandatory">
                    {GROUP_DEFS.map((g, gi) => (
                        <Fragment key={g.label}>
                            <GroupDivider id={`readings-group-${gi}`} label={g.label} sub={g.sub} />
                            {g.titles
                                .map((t) => READINGS.find((r) => r.title === t))
                                .filter(Boolean)
                                .map((r) => (
                                    <ReadingCard key={r.url} reading={r} />
                                ))}
                        </Fragment>
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
                        <div className="p-6 border-2 border-[#2a2a2a]/20 rounded bg-white/40">
                            <h4 className="font-bold uppercase tracking-widest text-sm mb-3 text-[#2a2a2a]">Read the book <span className="normal-case font-normal text-[#5a5a5a]">(Cornell netID)</span></h4>
                            <ul className="text-base space-y-1.5">
                                <li><a href="https://drive.google.com/drive/folders/1qZ8x8MXbJaex-7LnnrBUVR0_H87oBz24?usp=share_link" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline font-semibold">Full digital book ↗</a></li>
                                <li><a href="https://drive.google.com/file/d/14fTIg05HNcARYP5JrEJ87KC29D2QAgqM/view" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">Ch. 1 — Groundwork ↗</a></li>
                                <li><a href="https://drive.google.com/file/d/1FGbCVYgsKt9kW_sH0R2_B-LFcTmJum04/view" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">Ch. 5 — Discovery (canvas) ↗</a></li>
                                <li><a href="https://drive.google.com/file/d/1fBpVUQwUBikdUN21U0yKo58Lvs-0u899/view" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">Ch. 6 — Implementation ↗</a></li>
                                <li><a href="https://drive.google.com/file/d/1bHp2N78YO2r2mOB6XR2H8lbbvBXqnCWJ/view" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">Ch. 7 — Verification ↗</a></li>
                            </ul>
                        </div>
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

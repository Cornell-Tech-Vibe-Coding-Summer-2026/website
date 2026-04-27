import { motion } from 'framer-motion'
import { useEffect } from 'react'

const TEAM = [
    {
        name: 'Hauke Sandhaus, M.Sc.',
        role: 'PhD candidate, Cornell Tech — HCI & Tech Ethics',
        url: 'https://hauke.haus/',
    },
    {
        name: 'Jonathan Segal, M.Sc.',
        role: 'PhD candidate, Cornell Tech — Information Science',
        url: 'https://jonathansegal.io/',
    },
    {
        name: 'Wendy Ju, Ph.D.',
        role: 'Associate Professor, Cornell Tech — Information Science',
        url: 'https://wendyju.com/',
    },
]

const FACTS = [
    ['Format', 'Three-week intensive · Mon–Thu · In-person'],
    ['Dates', 'July 13 – July 30, 2026'],
    ['Location', 'Cornell Tech, Roosevelt Island, NYC'],
    ['Audience', 'Pre-college / high-school cohort'],
    ['Supervision', '3 instructors · daily code review · structured ethical reflection'],
    ['Frame', 'Ethics-first curriculum anchored in the Values at Play framework'],
    ['Tools', 'AI tool use is supervised on instructor-administered accounts'],
]

const ASKS = [
    {
        title: 'Age-waiver for supervised classroom use',
        body:
            "Several leading vibe-coding tools (Claude Code, Antigravity) restrict use to 18+. We're requesting age-waivers for the cohort, with student accounts administered by instructors and use limited to in-class lab time.",
        targets: 'Anthropic (Claude Code), Google (Antigravity)',
    },
    {
        title: 'API / compute credits',
        body:
            "Students are likely to hit free-tier rate limits during the intensive. A credit grant or sponsored seats for the cohort would let us focus on craft instead of quotas.",
        targets: 'Anthropic, Google, GitHub Copilot, Vercel v0, Cursor, Lovable, Bolt, Replit',
    },
    {
        title: 'Guest engineers / safety researchers',
        body:
            "A 30-minute conversation with one of your builders or policy folks is often the highlight of the week. Engineering, safety, or trust & safety perspectives all welcome.",
        targets: 'Any partner with someone who likes talking to students',
    },
]

export function PartnersOverlay({ onClose }) {
    // ESC closes
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 10 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="relative w-full max-w-[1080px] max-h-[92vh] overflow-y-auto bg-[#0a0e0a] text-white rounded-2xl shadow-2xl border border-[#00ff41]/20"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all text-lg"
                >
                    ✕
                </button>

                <div className="p-8 sm:p-10 md:p-14 font-mono">
                    {/* Header */}
                    <div className="mb-10 max-w-3xl">
                        <div className="text-[#00ff41]/70 text-[11px] tracking-[0.3em] uppercase mb-3">
                            Cornell Tech · Summer 2026
                        </div>
                        <h1 className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] mb-4">
                            Good Code,<br />
                            Good Vibes.
                        </h1>
                        <p className="text-white/70 text-base md:text-lg font-sans leading-relaxed">
                            A three-week intensive teaching pre-college students to build real apps with
                            AI — and to ask, every step of the way, whether they should. We're looking
                            for a small number of partners to help us run it well.
                        </p>
                    </div>

                    {/* Two-column: facts + asks */}
                    <div className="grid md:grid-cols-2 gap-10 mb-12">
                        {/* Course at a glance */}
                        <div>
                            <div className="text-[#ffd166] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
                                Course at a glance
                            </div>
                            <dl className="space-y-3 text-[13px] font-sans">
                                {FACTS.map(([k, v]) => (
                                    <div key={k} className="grid grid-cols-[110px_1fr] gap-3">
                                        <dt className="text-white/40 uppercase tracking-widest text-[10px] pt-0.5 font-mono">{k}</dt>
                                        <dd className="text-white/85 leading-snug">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* What we're asking for */}
                        <div>
                            <div className="text-[#ffd166] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
                                What we're asking for
                            </div>
                            <div className="space-y-4">
                                {ASKS.map((ask, i) => (
                                    <div key={i} className="border border-white/10 rounded-lg p-4 bg-white/[0.03] hover:border-[#00ff41]/30 transition-colors">
                                        <div className="flex items-baseline gap-3 mb-1.5">
                                            <span className="text-[#00ff41] text-[11px] font-mono tracking-widest">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="text-white font-sans font-semibold text-[15px] leading-snug">
                                                {ask.title}
                                            </h3>
                                        </div>
                                        <p className="text-white/65 text-[13px] font-sans leading-relaxed pl-7 mb-2">
                                            {ask.body}
                                        </p>
                                        <p className="text-white/40 text-[10px] font-mono tracking-wider pl-7">
                                            <span className="text-white/30">→ </span>{ask.targets}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Why partner */}
                    <div className="mb-12 max-w-3xl">
                        <div className="text-[#ffd166] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
                            Why partner with us
                        </div>
                        <ul className="space-y-2 text-[14px] font-sans text-white/80 leading-relaxed">
                            <li>
                                <span className="text-[#00ff41] mr-2">▸</span>
                                Reach a generation of builders <em>before</em> their tool habits set in.
                            </li>
                            <li>
                                <span className="text-[#00ff41] mr-2">▸</span>
                                Brand alignment with responsible AI: the curriculum is built around
                                surfacing values, not hiding them.
                            </li>
                            <li>
                                <span className="text-[#00ff41] mr-2">▸</span>
                                Faculty oversight and structured ethical reflection — your tool gets
                                used in a setting designed for thoughtful use, not unsupervised
                                experimentation.
                            </li>
                            <li>
                                <span className="text-[#00ff41] mr-2">▸</span>
                                Public showcase of what students build, and a write-up of what we
                                learned about teaching ethical AI development.
                            </li>
                        </ul>
                    </div>

                    {/* Team */}
                    <div className="mb-12">
                        <div className="text-[#ffd166] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
                            The team
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {TEAM.map((p) => (
                                <a
                                    key={p.name}
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block border border-white/10 rounded-lg p-4 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#00ff41]/30 transition-colors group"
                                >
                                    <div className="text-white font-sans font-semibold text-sm leading-snug mb-1 group-hover:text-[#00ff41] transition-colors">
                                        {p.name}
                                    </div>
                                    <div className="text-white/55 text-[12px] font-sans leading-snug mb-3">
                                        {p.role}
                                    </div>
                                    <div className="text-white/30 group-hover:text-[#00ff41]/70 text-[10px] font-mono tracking-wider transition-colors">
                                        {(() => { try { return new URL(p.url).hostname.replace(/^www\./, '') } catch { return '' } })()} ↗
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div>
                            <div className="text-[#ffd166] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
                                Get in touch
                            </div>
                            <a
                                href="mailto:hgs52@cornell.edu?subject=Good%20Code%2C%20Good%20Vibes%20%E2%80%94%20Partnership"
                                className="inline-flex items-center gap-2 text-[#00ff41] hover:text-white text-2xl font-sans font-bold transition-colors"
                            >
                                hgs52@cornell.edu →
                            </a>
                            <p className="text-white/40 text-[11px] font-mono mt-2 tracking-wider">
                                Hauke Sandhaus · course lead
                            </p>
                        </div>
                        <div className="text-white/30 text-[10px] font-mono tracking-widest text-right space-y-1">
                            <div>github.com/Cornell-Tech-Vibe-Coding-Summer-2026</div>
                            <div>vibe-coding-ethics.tech.cornell.edu</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

const H = "text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mt-9 mb-3 pb-1 border-b border-gray-200"
const P = "font-serif text-[15px] leading-7 text-gray-700"

/** The colophon content itself — reused in the lite Notepad and the 3D overlay. */
export function ColophonContent() {
    return (
        <div className="bg-[#fffef5] text-[#1a1a1a]">
            <div className="max-w-xl mx-auto px-8 py-12">
                <div className="text-center mb-8">
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-2">Ethical Vibe Coding</div>
                    <h1 className="font-serif text-4xl font-bold tracking-tight">Colophon</h1>
                    <p className="font-serif italic text-gray-500 mt-1">&amp; AI-Use Disclosure</p>
                    <div className="w-16 h-px bg-gray-300 mx-auto mt-6" />
                </div>

                <p className={P}>
                    This class asks students to keep a <em>Vibe-Trace</em> of how they build with AI.
                    It would be hypocritical not to hold the course to the same standard — so here is
                    an honest account of how these materials and this site were made, and the values
                    behind the choices.
                </p>

                <h2 className={H}>How it was built</h2>
                <p className={`${P} mb-3`}>
                    The course and this site were themselves <em>vibe-coded</em> over roughly six months
                    (January–July 2026), mostly by Hauke Sandhaus with Jonathan Segal. Reconstructed from
                    the git history of both repositories:
                </p>
                <dl className="font-serif text-[14.5px] leading-7 text-gray-700 space-y-1.5">
                    <div><dt className="inline font-bold">Claude</dt> (Claude Code) — Opus 4.7, Opus 4.8, Sonnet 4.6; most of the recent writing and site engineering (~50 co-authored commits).</div>
                    <div><dt className="inline font-bold">GitHub Copilot</dt> — earlier code assistance.</div>
                    <div><dt className="inline font-bold">Antigravity / Gemini Code Assist</dt> — the course's &ldquo;lab favorite,&rdquo; used during development.</div>
                    <div><dt className="inline font-bold">Warp</dt> — an agentic terminal, used occasionally.</div>
                </dl>
                <p className={`${P} mt-4`}>
                    Commit trailers attribute Claude precisely; the earlier Copilot and Antigravity
                    sessions were only partially recorded — an honest reconstruction, and a lesson in how
                    fast provenance is lost when you don&rsquo;t log it. Which is exactly why we require a
                    Vibe-Trace.
                </p>

                <h2 className={H}>3D scene &amp; media</h2>
                <dl className="font-serif text-[14.5px] leading-7 text-gray-700 space-y-1.5">
                    <div><dt className="inline font-bold">Meshy AI</dt> — the Funko-Pop-style character figures.</div>
                    <div><dt className="inline font-bold">Blender</dt> — scene assembly (with Claude Code + MCP).</div>
                    <div><dt className="inline font-bold">React Three Fiber + drei</dt> (pmndrs) — the in-browser 3D; environment HDRI from pmndrs/drei-assets.</div>
                    <div><dt className="inline font-bold">Google Fonts</dt> — Inter, JetBrains Mono, Outfit.</div>
                </dl>

                <h2 className={H}>Why we disclose — our values</h2>
                <dl className="font-serif text-[14.5px] leading-7 text-gray-700 space-y-2">
                    <div><dt className="inline font-bold">Transparency.</dt> The same Vibe-Trace we ask of you; both repos&rsquo; history is public.</div>
                    <div><dt className="inline font-bold">Honing human capability, not replacing it.</dt> AI collaborated; every choice was human-reviewed and approved.</div>
                    <div><dt className="inline font-bold">Non-manipulation.</dt> No dark patterns, no fabricated data or citations.</div>
                    <div><dt className="inline font-bold">A trustworthy web.</dt> Accessible, honest content; real sources; no AI slop passed off as fact.</div>
                </dl>

                <h2 className={H}>Accountability</h2>
                <p className={P}>
                    Hauke Sandhaus, with Jonathan Segal and Wendy Ju, are responsible for everything here —
                    including any errors or hallucinations that slipped through. Spot one?{' '}
                    <a href="mailto:hgs52@cornell.edu" className="text-blue-700 hover:underline">hgs52@cornell.edu</a>.
                </p>

                <div className="w-16 h-px bg-gray-300 mx-auto mt-10 mb-4" />
                <p className="text-center text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400">
                    Set in Inter &amp; JetBrains Mono · Vibe-coded, honestly
                </p>
            </div>
        </div>
    )
}

/** Fullscreen overlay wrapper for the 3D scene. */
export function ColophonModal({ onClose }) {
    if (typeof document === 'undefined') return null
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                className="relative bg-[#fffef5] w-full max-w-2xl h-[88vh] overflow-y-auto rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="sticky top-4 float-right mr-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-gray-500 hover:bg-black/10 hover:text-black transition-colors text-lg"
                    aria-label="Close"
                >
                    ✕
                </button>
                <ColophonContent />
            </motion.div>
        </motion.div>,
        document.body
    )
}

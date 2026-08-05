import { useState, useEffect } from 'react'
import { SUBMISSION_SETS, hasEntries } from '../content/submissions'

// Some deliverables are a testing VIDEO, not a live site (see week3-7_27).
// Those entries carry `video` (a YouTube watch/share URL) instead of `url`;
// we embed the player and the open link points at YouTube.
const ytId = (u = '') => (u.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/) || [])[1]
const ytEmbed = (u) => { const id = ytId(u); return id ? `https://www.youtube.com/embed/${id}` : u }

// Student submissions browser: used inside the 3D monitor's SUBMISSIONS window
// and the lite-mode Submissions modal. Same three-band shape as SlidesBrowser —
// a chip row picks the activity/project, a second row picks the student or team,
// and the live site embeds below.
//
// Activities list one entry per student; group projects add team members and a
// one-line blurb of what the team built, since a title alone doesn't say much.
export function SubmissionsBrowser() {
    const firstLive = SUBMISSION_SETS.find(hasEntries) || SUBMISSION_SETS[0]
    // Deep link straight to a tab: #submissions/<set id> (e.g. #submissions/final), or #final.
    const hashSet = (() => {
        const h = (window.location.hash || '').replace('#', '').toLowerCase()
        const id = h.startsWith('submissions/') ? h.slice('submissions/'.length) : h === 'final' ? 'final' : null
        return id && SUBMISSION_SETS.some((s) => s.id === id) ? id : null
    })()
    const [setId, setSetId] = useState(hashSet || firstLive.id)
    const set = SUBMISSION_SETS.find((s) => s.id === setId) || SUBMISSION_SETS[0]
    const [entryId, setEntryId] = useState(set.entries[0]?.id)
    // Several activities have an index page linking to per-attempt files, so you
    // can navigate *into* a submission. We can't read a cross-origin iframe's
    // history, so "back" = remount the iframe at the entry URL (bump the key).
    const [nonce, setNonce] = useState(0)
    // The report (and a team's pitch deck) open in this same iframe — they're
    // just other pages, not new tabs.
    const [view, setView] = useState('site') // 'site' | 'report' | 'deck'
    const backToStart = () => { setView('site'); setNonce((n) => n + 1) }

    // Keep the selected entry valid when the set changes, and reset to the site view.
    useEffect(() => {
        if (!set.entries.some((e) => e.id === entryId)) setEntryId(set.entries[0]?.id)
        setView('site')
    }, [setId]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { setView('site') }, [entryId])

    const entry = set.entries.find((e) => e.id === entryId) || set.entries[0]
    const isProject = set.kind === 'project'
    const label = (e) => (isProject ? e.team : e.student)
    // A video entry has no live site — its "site" view is the embedded player.
    const hasVideo = !!entry?.video
    const siteSrc = hasVideo ? ytEmbed(entry.video) : entry?.url
    const frameUrl = view === 'report' && entry?.report ? entry.report
        : view === 'planning' && entry?.planningReport ? entry.planningReport
        : view === 'deck' && entry?.deck ? entry.deck
        : view === 'finalDeck' && entry?.finalDeck ? entry.finalDeck : siteSrc
    // Opening in a new tab should go to the real YouTube page, not the embed.
    const openHref = view === 'report' && entry?.report ? entry.report
        : view === 'planning' && entry?.planningReport ? entry.planningReport
        : view === 'deck' && entry?.deck ? entry.deck
        : view === 'finalDeck' && entry?.finalDeck ? entry.finalDeck
        : (hasVideo ? entry.video : entry?.url)

    return (
        <div className="flex flex-col h-full bg-[#0a0c12] font-mono">
            {/* Activity / project picker */}
            <div className="shrink-0 flex gap-1.5 items-center overflow-x-auto px-2 py-2 bg-[#0e101a] border-b border-white/10">
                {SUBMISSION_SETS.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setSetId(s.id)}
                        className={`shrink-0 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                            s.id === setId
                                ? 'bg-[#00ff41]/15 text-[#00ff41] border-[#00ff41]/40'
                                : hasEntries(s)
                                    ? 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                                    : 'bg-transparent text-white/25 border-white/5 hover:text-white/40'
                        }`}
                        title={hasEntries(s) ? `${s.title} — ${s.entries.length} submitted` : `${s.title} — nothing submitted yet`}
                    >
                        {s.chip}
                    </button>
                ))}
            </div>

            {/* Student / team picker */}
            {hasEntries(set) && (
                <div className="shrink-0 flex gap-1.5 items-center overflow-x-auto px-2 py-1.5 bg-[#0a0c12] border-b border-white/10">
                    {set.entries.map((e) => (
                        <button
                            key={e.id}
                            // Clicking the already-selected name returns to its start page.
                            onClick={() => (e.id === entryId ? backToStart() : setEntryId(e.id))}
                            className={`shrink-0 px-2 py-1 rounded text-[10px] font-semibold whitespace-nowrap border transition-colors ${
                                e.id === entryId
                                    ? 'bg-white/15 text-white border-white/30'
                                    : 'bg-transparent text-white/50 border-transparent hover:text-white/80 hover:bg-white/5'
                            }`}
                            title={(e.featured ? '★ Instructor pick — ' : '') + (e.title || e.blurb || label(e))}
                        >
                            {e.featured && <span className="text-[#00ff41]">★ </span>}{label(e)}
                        </button>
                    ))}
                </div>
            )}

            {/* Entry header */}
            {entry && (
                <div className="shrink-0 flex items-start justify-between gap-3 px-3 py-2 bg-[#0a0c12] border-b border-white/5">
                    <div className="min-w-0">
                        <p className="text-white text-xs font-bold truncate">
                            {isProject ? entry.team : entry.title || label(entry)}
                        </p>
                        <p className="text-white/35 text-[10px] truncate">
                            {isProject ? entry.members : `${entry.student} · ${set.title}`}
                        </p>
                        {entry.blurb && (
                            <p className="text-white/55 text-[11px] mt-1 leading-snug">{entry.blurb}</p>
                        )}
                    </div>
                    <div className="shrink-0 flex gap-1.5">
                        <button
                            onClick={backToStart}
                            onPointerDown={(e) => e.stopPropagation()}
                            title={view === 'report' ? (hasVideo ? 'Back to the testing video' : 'Back to the live site') : "Back to this submission's start page"}
                            className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/70 border border-white/15 hover:bg-white/10 transition-colors"
                        >
                            ↺ {view === 'report' ? 'Site' : 'Back'}
                        </button>
                        {/* Deliverables in checkpoint order: Verify → Plan → Build → Present */}
                        {entry.deck && (
                            <button
                                onClick={() => setView((v) => (v === 'deck' ? 'site' : 'deck'))}
                                onPointerDown={(e) => e.stopPropagation()}
                                title="Verify (Tue) — value-verification research deck"
                                className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                                    view === 'deck'
                                        ? 'bg-[#00ff41]/15 text-[#00ff41] border-[#00ff41]/40'
                                        : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10'
                                }`}
                            >
                                Research
                            </button>
                        )}
                        {entry.planningReport && (
                            <button
                                onClick={() => setView((v) => (v === 'planning' ? 'site' : 'planning'))}
                                onPointerDown={(e) => e.stopPropagation()}
                                title="Plan (Wed) — planning report: persona, storyboard, scope"
                                className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                                    view === 'planning'
                                        ? 'bg-[#00ff41]/15 text-[#00ff41] border-[#00ff41]/40'
                                        : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10'
                                }`}
                            >
                                Planning
                            </button>
                        )}
                        {entry.report && (
                            <button
                                onClick={() => setView((v) => (v === 'report' ? 'site' : 'report'))}
                                onPointerDown={(e) => e.stopPropagation()}
                                title="Build (Thu) — project report: what they built + testing"
                                className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                                    view === 'report'
                                        ? 'bg-[#00ff41]/15 text-[#00ff41] border-[#00ff41]/40'
                                        : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10'
                                }`}
                            >
                                Report
                            </button>
                        )}
                        {entry.finalDeck && (
                            <button
                                onClick={() => setView((v) => (v === 'finalDeck' ? 'site' : 'finalDeck'))}
                                onPointerDown={(e) => e.stopPropagation()}
                                title="Present (Thu) — final showcase deck"
                                className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                                    view === 'finalDeck'
                                        ? 'bg-[#00ff41]/15 text-[#00ff41] border-[#00ff41]/40'
                                        : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10'
                                }`}
                            >
                                Final deck
                            </button>
                        )}
                        <a
                            href={openHref}
                            target="_blank"
                            rel="noreferrer"
                            onPointerDown={(e) => e.stopPropagation()}
                            title={hasVideo && view === 'site' ? 'Open the testing video on YouTube' : 'Open the current view in a new tab'}
                            className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/25 hover:bg-[#00ff41]/20 transition-colors"
                        >
                            {hasVideo && view === 'site' ? '🎬 Testing video ↗' : 'Open ↗'}
                        </a>
                    </div>
                </div>
            )}

            {/* Viewer */}
            <div className="flex-1 relative bg-black">
                {entry ? (
                    <iframe
                        key={`${frameUrl}|${nonce}`}
                        src={frameUrl}
                        title={label(entry)}
                        className="absolute inset-0 w-full h-full bg-white border-0"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
                        allow="fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-8">
                        <span className="text-2xl">🗂️</span>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider">{set.title}</p>
                        <p className="text-white/35 text-[11px]">Submissions appear here once the class has built them.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

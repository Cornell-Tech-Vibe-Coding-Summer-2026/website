import { useState } from 'react'
import { SLIDE_DECKS, deckEmbedUrl, deckOpenUrl } from '../content/slides'

// Shared lecture-deck browser: used inside the 3D monitor's SLIDES window and
// the lite-mode Slides modal. A horizontal chip row picks the day; the deck
// embeds below via Google Slides' /preview viewer.
export function SlidesBrowser() {
    const firstLive = SLIDE_DECKS.find((d) => d.gsId) || SLIDE_DECKS[0]
    const [activeId, setActiveId] = useState(firstLive.id)
    const deck = SLIDE_DECKS.find((d) => d.id === activeId)

    return (
        <div className="flex flex-col h-full bg-[#0a0c12] font-mono">
            {/* Day picker */}
            <div className="shrink-0 flex gap-1.5 items-center overflow-x-auto px-2 py-2 bg-[#0e101a] border-b border-white/10">
                {SLIDE_DECKS.map((d) => (
                    <button
                        key={d.id}
                        onClick={() => setActiveId(d.id)}
                        className={`shrink-0 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                            d.id === activeId
                                ? 'bg-[#00ff41]/15 text-[#00ff41] border-[#00ff41]/40'
                                : d.gsId
                                    ? 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                                    : 'bg-transparent text-white/25 border-white/5 hover:text-white/40'
                        }`}
                        title={d.gsId ? d.title : `${d.title} — posted after class`}
                    >
                        {d.chip}
                    </button>
                ))}
            </div>

            {/* Deck header */}
            <div className="shrink-0 flex items-center justify-between gap-3 px-3 py-2 bg-[#0a0c12] border-b border-white/5">
                <div className="min-w-0">
                    <p className="text-white text-xs font-bold truncate">{deck.title}</p>
                    <p className="text-white/35 text-[10px] uppercase tracking-wider">{deck.day}</p>
                </div>
                {deck.gsId && (
                    <a
                        href={deckOpenUrl(deck.gsId)}
                        target="_blank"
                        rel="noreferrer"
                        onPointerDown={(e) => e.stopPropagation()}
                        className="shrink-0 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/25 hover:bg-[#00ff41]/20 transition-colors"
                    >
                        Open ↗
                    </a>
                )}
            </div>

            {/* Viewer */}
            <div className="flex-1 relative bg-black">
                {deck.gsId ? (
                    <iframe
                        src={deckEmbedUrl(deck.gsId)}
                        title={deck.title}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="fullscreen"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-8">
                        <span className="text-2xl">📽️</span>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider">{deck.title}</p>
                        <p className="text-white/35 text-[11px]">Slides are posted here after class.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

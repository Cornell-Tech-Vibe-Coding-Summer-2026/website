import { useEffect, useRef, useState } from 'react'
import { VIBE_FEED } from '../content/vibe-feed'
import { VibeReel } from './VibeReel'
import { NO_EMBEDS, IS_WEBKIT } from './screenFlags'

// ?no-embeds renders static link-out cards instead of the TikTok/Instagram
// player iframes — kept as an isolation switch for debugging embed-related
// rendering issues (the big Safari artifact turned out to be the monitor's
// CSS3D layer, not the embeds, so WebKit gets real embeds too).
const STATIC_FEED = NO_EMBEDS

function StaticReelCard({ entry }) {
    const label = entry.platform === 'tiktok' ? 'TikTok' : 'Instagram'
    return (
        <a
            href={entry.url}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 w-full h-full snap-start relative bg-[#101010] overflow-hidden flex flex-col items-center justify-center gap-4 no-underline"
        >
            <div className="text-white/80 text-sm font-mono uppercase tracking-widest">
                {label}
            </div>
            <div className="text-white/40 text-[10px] font-mono text-center px-8 break-all">
                @{entry.url?.split('@')[1]?.split('/')[0] || entry.id}
            </div>
            <div className="px-4 py-2 rounded-full border border-white/25 text-white/70 text-[10px] font-mono uppercase tracking-widest">
                tap to watch on {label} ↗
            </div>
        </a>
    )
}

export function PhoneContent() {
    const scrollRef = useRef(null)
    // Defer iframe loads so the camera zoom-in animation isn't fighting with
    // network / iframe parsing on the same frame. Safari is much more
    // sensitive here — too many simultaneous cross-origin iframes inside a
    // drei <Html> can lock the main thread, so we wait a bit longer there.
    const [ready, setReady] = useState(STATIC_FEED)
    useEffect(() => {
        if (STATIC_FEED) return
        const t = setTimeout(() => setReady(true), IS_WEBKIT ? 1300 : 800)
        return () => clearTimeout(t)
    }, [])

    return (
        <div
            ref={scrollRef}
            className="w-[320px] h-[640px] bg-black text-white flex flex-col overflow-y-auto snap-y snap-mandatory select-none custom-scrollbar-none border-8 border-[#0b0b0b]"
        >
            {ready && VIBE_FEED.map((entry) => (
                STATIC_FEED ? (
                    <StaticReelCard key={`${entry.platform}-${entry.id}`} entry={entry} />
                ) : (
                    <VibeReel
                        key={`${entry.platform}-${entry.id}`}
                        entry={entry}
                        scrollRoot={scrollRef}
                    />
                )
            ))}
            {!ready && (
                <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <div className="text-white/40 text-[10px] font-mono uppercase tracking-widest animate-pulse">
                        loading feed…
                    </div>
                </div>
            )}
            {VIBE_FEED.length === 0 && ready && (
                <div className="flex-shrink-0 w-full h-full flex items-center justify-center text-white/40 text-xs font-mono p-6 text-center">
                    No vibe-feed entries configured yet.
                </div>
            )}
        </div>
    )
}

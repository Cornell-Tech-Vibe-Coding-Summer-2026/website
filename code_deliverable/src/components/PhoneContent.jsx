import { useEffect, useRef, useState } from 'react'
import { VIBE_FEED } from '../content/vibe-feed'
import { VibeReel } from './VibeReel'

export function PhoneContent() {
    const scrollRef = useRef(null)
    // Defer iframe loads so the camera zoom-in animation isn't fighting with
    // network / iframe parsing on the same frame. A short timeout is enough.
    const [ready, setReady] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setReady(true), 750)
        return () => clearTimeout(t)
    }, [])

    return (
        <div
            ref={scrollRef}
            className="w-[320px] h-[640px] bg-black text-white flex flex-col overflow-y-auto snap-y snap-mandatory select-none custom-scrollbar-none border-8 border-[#0b0b0b]"
        >
            {ready && VIBE_FEED.map((entry) => (
                <VibeReel
                    key={`${entry.platform}-${entry.id}`}
                    entry={entry}
                    scrollRoot={scrollRef}
                />
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

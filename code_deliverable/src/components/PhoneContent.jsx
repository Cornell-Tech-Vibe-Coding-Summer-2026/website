import { useRef } from 'react'
import { VIBE_FEED } from '../content/vibe-feed'
import { VibeReel } from './VibeReel'

export function PhoneContent() {
    const scrollRef = useRef(null)
    return (
        <div
            ref={scrollRef}
            className="w-[320px] h-[640px] bg-black text-white flex flex-col overflow-y-auto snap-y snap-mandatory select-none custom-scrollbar-none border-8 border-[#0b0b0b]"
        >
            {VIBE_FEED.map((entry) => (
                <VibeReel
                    key={`${entry.platform}-${entry.id}`}
                    entry={entry}
                    scrollRoot={scrollRef}
                />
            ))}
            {VIBE_FEED.length === 0 && (
                <div className="flex-shrink-0 w-full h-full flex items-center justify-center text-white/40 text-xs font-mono p-6 text-center">
                    No vibe-feed entries configured yet.
                </div>
            )}
        </div>
    )
}

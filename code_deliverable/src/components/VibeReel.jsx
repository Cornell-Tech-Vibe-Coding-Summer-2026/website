import { useEffect, useRef, useState } from 'react'

// Sends play/pause commands to the TikTok player/v1 iframe via postMessage.
// Spec: messages must include `x-tiktok-player: true` and a `type` field.
function postTikTokCommand(iframe, type) {
    if (!iframe?.contentWindow) return
    const msg = { type, 'x-tiktok-player': true }
    iframe.contentWindow.postMessage(msg, 'https://www.tiktok.com')
    // Some TikTok player builds expect a stringified payload; send both.
    iframe.contentWindow.postMessage(JSON.stringify(msg), 'https://www.tiktok.com')
}

// One reel: TikTok or Instagram embed that auto-plays when scrolled to and
// pauses when scrolled past. The iframe is mounted only when within the
// preload window so that 24+ embeds don't all hammer the network.
export function VibeReel({ entry, scrollRoot }) {
    const ref = useRef(null)
    const iframeRef = useRef(null)
    const [mounted, setMounted] = useState(false)
    const [active, setActive] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const root = scrollRoot?.current ?? null

        // Mount/unmount: only the visible reel — preloading the next one
        // mid-scroll is what was choking Safari. The active reel will
        // hot-load when it actually becomes visible.
        const mountObs = new IntersectionObserver(
            (entries) => entries.forEach((e) => setMounted(e.isIntersecting)),
            { root, rootMargin: '0px', threshold: 0.01 }
        )
        // Active = the reel that's almost fully on-screen; only one at a
        // time so we never have two TikTok players audibly running.
        const activeObs = new IntersectionObserver(
            (entries) => entries.forEach((e) => setActive(e.isIntersecting && e.intersectionRatio > 0.8)),
            { root, threshold: [0, 0.8, 1] }
        )

        mountObs.observe(el)
        activeObs.observe(el)
        return () => {
            mountObs.disconnect()
            activeObs.disconnect()
        }
    }, [scrollRoot])

    // For TikTok we keep the iframe mounted and toggle play/pause via postMessage.
    // For Instagram we don't have a play API, so we re-mount the iframe to force
    // a stop when it leaves the viewport.
    useEffect(() => {
        if (entry.platform !== 'tiktok') return
        if (!iframeRef.current) return
        postTikTokCommand(iframeRef.current, active ? 'unMute' : 'mute')
        postTikTokCommand(iframeRef.current, active ? 'play' : 'pause')
    }, [active, entry.platform])

    const shouldRender = mounted && (entry.platform === 'tiktok' ? true : active)

    return (
        <div
            ref={ref}
            className="flex-shrink-0 w-full h-full snap-start relative bg-black overflow-hidden"
        >
            {shouldRender && (
                <iframe
                    ref={iframeRef}
                    src={entry.embed}
                    title={`${entry.platform}-${entry.id}`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    // sandbox without `allow-popups` / `allow-top-navigation` blocks
                    // taps inside the embed from opening Instagram/TikTok in a new tab.
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    className="absolute inset-0 w-full h-full border-0"
                />
            )}
            {!shouldRender && (
                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-[10px] font-mono uppercase tracking-widest">
                    loading…
                </div>
            )}
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-white/70 pointer-events-none">
                {entry.platform === 'tiktok' ? 'TikTok' : 'Instagram'}
            </div>
        </div>
    )
}

// Flags for the in-scene screen overlays (monitor + phone), including URL
// switches for A/B debugging Safari, which has no usable remote devtools.
//
//   ?flat-screens     force the no-blending overlay path in any browser
//   ?blend-screens    force occlude="blending" even on WebKit
//   ?debug-screens    tint each screen layer a distinct color:
//                       red     = phone Html feed container
//                       orange  = monitor Html container
//                       green   = phone screen-on fade overlay
//                       blue    = cheap standby plane (phone at distance)
//                       magenta = the phone GLB's own screen/body meshes
//   ?no-embeds        phone feed renders static cards instead of TikTok/IG iframes
//   ?no-phone-html    phone screen stays a black plane; its Html never mounts
//   ?no-monitor-html  monitor Html never mounts
import { useEffect, useState } from 'react'

const params = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams()

// True on every WebKit browser, including all iOS browsers (they are all
// WebKit); navigator.vendor is "Apple Computer, Inc." there.
export const IS_WEBKIT = typeof navigator !== 'undefined' && /apple/i.test(navigator.vendor)

export const DEBUG_SCREENS = params.has('debug-screens')
export const NO_EMBEDS = params.has('no-embeds')
export const NO_PHONE_HTML = params.has('no-phone-html')
export const NO_MONITOR_HTML = params.has('no-monitor-html')

// WebKit cannot composite drei's occlude="blending" mode (the Html sits
// behind a transparent canvas and WebKit mis-stacks 3D-transformed layers,
// leaving the screens black), so it gets plain overlays above the canvas.
export const FLAT_SCREENS = params.has('blend-screens')
    ? false
    : (IS_WEBKIT || params.has('flat-screens'))

// WebKit's CSS3D transform math also breaks at page zoom != 100% (screen
// overlays detach far from their bezels), and Safari REMEMBERS zoom per
// site, so a stray ⌘+/⌘- sticks forever. outerWidth is in screen points
// while innerWidth is in layout CSS px, so their ratio exposes the page
// zoom. When zoomed on WebKit we hide the screen overlays (clean dark
// screens instead of displaced ones) and App shows a ⌘0 hint.
// ?fake-zoom forces the zoomed state for testing in any browser.
export function useWebkitZoomBroken() {
    const [broken, setBroken] = useState(params.has('fake-zoom'))
    useEffect(() => {
        if (!IS_WEBKIT || params.has('fake-zoom')) return
        const check = () => {
            const ratio = window.outerWidth / window.innerWidth
            setBroken(window.outerWidth > 0 && Math.abs(ratio - 1) > 0.03)
        }
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])
    return broken
}

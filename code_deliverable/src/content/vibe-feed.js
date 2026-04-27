// Curated feed of vibe-coding videos shown in the in-scene phone.
// Each entry is { platform, url, id }. To add more, paste the post/reel URL into
// rawTikTokUrls or rawInstagramUrls below; the IDs are extracted automatically.
//
// Sources:
// - TikTok collection:  https://www.tiktok.com/@haukesa/collection/Vibe-coding-7606043261760850720
// - Instagram saved:    https://www.instagram.com/hauke.haus/saved/vibe-coding/18120235744580400/

const rawTikTokUrls = [
    'https://www.tiktok.com/@iamkylebalmer/video/7630805308557790486',
    'https://www.tiktok.com/@pattssun/video/7626805579431890206',
    'https://www.tiktok.com/@creativelyange/video/7625388237091015967',
    'https://www.tiktok.com/@taki.gpt/video/7620200962002521345',
    'https://www.tiktok.com/@brnrt_research/video/7616382129345285406',
    'https://www.tiktok.com/@github.awesome/video/7614328111697579278',
    'https://www.tiktok.com/@ai.with.andrew/video/7613206921507556626',
    'https://www.tiktok.com/@gregisenberg/video/7613028682369731871',
    'https://www.tiktok.com/@janustiu/video/7601157173229522184',
    'https://www.tiktok.com/@hardfork/video/7596024961056181518',
    'https://www.tiktok.com/@journeyto10kmrr/video/7607229397589937422',
    'https://www.tiktok.com/@ayxanium/video/7608653097820310806',
    'https://www.tiktok.com/@alberta.nyc/video/7592410928184872205',
    'https://www.tiktok.com/@casey.aicreates/video/7607556356429581599',
    'https://www.tiktok.com/@noevarner.ai/video/7597158086536596791',
    'https://www.tiktok.com/@pumpstack/video/7605435564258544909',
    'https://www.tiktok.com/@unhinged.henry/video/7605329997762399509',
]

// Instagram saved collection (extracted via logged-in Chrome)
const rawInstagramUrls = [
    'https://www.instagram.com/p/DXLDfh-jYwY/',
    'https://www.instagram.com/p/DWq-UMtDWwT/',
    'https://www.instagram.com/p/DXJCyB_ACfB/',
    'https://www.instagram.com/p/DW9oUhWjp1R/',
    'https://www.instagram.com/p/DWg_KwKj3O6/',
    'https://www.instagram.com/p/DWmnRVcmQxu/',
    'https://www.instagram.com/p/DWNiCXSEWLu/',
    'https://www.instagram.com/p/DV_7pn0kizm/',
    'https://www.instagram.com/p/DV39-tbCVFD/',
    'https://www.instagram.com/p/DVoNeo8DXur/',
    'https://www.instagram.com/p/DVgq3Z7jqZc/',
    'https://www.instagram.com/p/DVoNC4Pj25d/',
    'https://www.instagram.com/p/DVmafagjC1g/',
    'https://www.instagram.com/p/DVYbjZhkfsA/',
    'https://www.instagram.com/p/DU_llvaAW7G/',
    'https://www.instagram.com/p/DVMmy_ZDELJ/',
    'https://www.instagram.com/p/DVPoCT3Cf02/',
    'https://www.instagram.com/p/DUx8KSAiBPN/',
    'https://www.instagram.com/p/DUN9PYoCHTR/',
    'https://www.instagram.com/p/DU_KQbokYII/',
    'https://www.instagram.com/p/DTIvtcHCHFk/',
    'https://www.instagram.com/p/DUiHA1xDFq3/',
    'https://www.instagram.com/p/DUdcZMdAUwR/',
    'https://www.instagram.com/p/DUlYmpKCTnJ/',
]

// TikTok's "player/v1" endpoint is the bare video player — no comments, no
// "for you" rail, no caption, just the video. Supports postMessage play/pause.
function tiktokEntry(url) {
    const m = url.match(/\/video\/(\d+)/)
    if (!m) return null
    const params = new URLSearchParams({
        music_info: '0',
        description: '0',
        native_context_menu: '0',
        closed_caption: '0',
        loop: '1',
        rel: '0',
    })
    return {
        platform: 'tiktok',
        id: m[1],
        url,
        embed: `https://www.tiktok.com/player/v1/${m[1]}?${params.toString()}`,
    }
}

function instagramEntry(url) {
    const m = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#]+)/)
    if (!m) return null
    return {
        platform: 'instagram',
        id: m[2],
        url,
        // Plain /embed/ omits caption; /embed/captioned/ would include it.
        embed: `https://www.instagram.com/${m[1]}/${m[2]}/embed/`,
    }
}

export const VIBE_FEED = [
    ...rawInstagramUrls.map(instagramEntry),
    ...rawTikTokUrls.map(tiktokEntry),
].filter(Boolean)

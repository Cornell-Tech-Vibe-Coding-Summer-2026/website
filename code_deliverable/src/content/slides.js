// Per-day lecture decks. The live decks are Google Slides (single source of
// truth — instructors edit there; this repo only keeps the python-pptx build
// scripts that generated the originals, in ../../slides/build/).
//
// `gsId` is the Google Slides presentation id (a pasted sharing URL also works).
// Decks without an id yet show a "posted after class" placeholder — paste the
// id or URL in as each deck goes live.
// NOTE: a deck only embeds if its Drive sharing is "Anyone with the link — Viewer".

export const SLIDE_DECKS = [
    { id: 'intro', week: 0, chip: 'Intro', day: 'Course intro', title: 'Good Code, Good Vibes — Course Intro', gsId: '1VXtqzi7QO9PKTYdUh-uWI_Ve98rFvOnF' },
    { id: 'w1mon', week: 1, chip: 'W1 Mon', day: 'Mon · Jul 13', title: 'What is Vibe Coding?', gsId: '1ovlW0uOY9lG4N4bo8PKNDypr1TWusjhj' },
    { id: 'w1tue', week: 1, chip: 'W1 Tue', day: 'Tue · Jul 14', title: 'Prompt Engineering', gsId: '11QFBjn5Qu2jgw6uLcIJZTObD5t10kIUU' },
    { id: 'w1wed', week: 1, chip: 'W1 Wed', day: 'Wed · Jul 15', title: 'Bias in Vibe Coding', gsId: '1F23L1LKi5UY97Pklnn_1H36qSSIBHcUm' },
    { id: 'w1thu', week: 1, chip: 'W1 Thu', day: 'Thu · Jul 16', title: 'Project Day — Project 1', gsId: '1mQlRy2Ue1D2YDtnpUYaZ9ZdmAhDf7Dep' },
    { id: 'w2mon', week: 2, chip: 'W2 Mon', day: 'Mon · Jul 20', title: 'Values in Vibe Coding', gsId: '1UsDXaNL9w2TFWGAj0hw9Gzyl4jDrN_A0' },
    { id: 'w2tue', week: 2, chip: 'W2 Tue', day: 'Tue · Jul 21', title: 'AI Safety: Red-Teaming', gsId: '1472xwruqTo9llSoL-sxSwG4PM6gYQrgj' },
    { id: 'w2tueguest', week: 2, chip: 'W2 Tue ✦', day: 'Tue · Jul 21 · guest', title: 'Guest Speaker — AI Safety: Red-Teaming', gsId: '1oNtQGMaUXK15dKLMyMrszYOyvDuOvIqK' },
    { id: 'w2wed', week: 2, chip: 'W2 Wed', day: 'Wed · Jul 22', title: 'AI Against AI', gsId: '172fIcOWEa22iafr6q8wX1t41FSDdQHIp' },
    { id: 'w2thu', week: 2, chip: 'W2 Thu', day: 'Thu · Jul 23', title: 'Project Day — Project 2', gsId: '1QmJdK_wHKG1nT7GPWvHe_VwFlnYLm48d' },
    { id: 'w3mon', week: 3, chip: 'W3 Mon', day: 'Mon · Jul 27', title: 'Usability Testing: Human & Agent', gsId: '1jCEFqIFyF2Hnp4GehraIgziQWAHbKehI' },
    { id: 'w3tue', week: 3, chip: 'W3 Tue', day: 'Tue · Jul 28', title: 'Value Verification: Does the Design Actually Change Anything?', gsId: null },
    { id: 'w3wed', week: 3, chip: 'W3 Wed', day: 'Wed · Jul 29', title: 'Planning Day: What\'s the Problem?', gsId: null },
    { id: 'w3thu', week: 3, chip: 'W3 Thu', day: 'Thu · Jul 30', title: 'Demo Night: What\'s the Solution?', gsId: null },
]

// `gsId` may be a bare presentation id OR a pasted docs.google.com sharing URL —
// the id is extracted either way.
const idOf = (gsId) => {
    const m = String(gsId).match(/\/d\/([\w-]+)/)
    return m ? m[1] : gsId
}

// /preview renders an embeddable viewer for both native Slides decks and
// .pptx files opened in Slides (the ?rtpof kind), unlike /embed.
export const deckEmbedUrl = (gsId) => `https://docs.google.com/presentation/d/${idOf(gsId)}/preview`
export const deckOpenUrl = (gsId) => `https://docs.google.com/presentation/d/${idOf(gsId)}/preview`

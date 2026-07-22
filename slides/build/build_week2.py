#!/usr/bin/env python3
"""Week 2 Monday (7/20) — 'Values in Vibe Coding (Light)'. Light values intro that
seeds Project 2; keeps the footprint-calculator activity. Full VAP framework stays at
Week 3 (7/28). Content adapted from the VAP speed-run deck + the syllabus/repo 7_20."""

from deck_common import *
prs = init_deck()

FOOT = "Good Code, Good Vibes · TECHIE 1121 · Cornell Tech · Summer 2026"

# --- Day divider ---
divider("WEEK 2 · MONDAY", "Values in Vibe Coding",
        "Ethics — Doing the right thing   ·   Guest: Ria Gualano (accessible technology)")

# --- Warm-up: technology embeds values ---
s = quote("WARM-UP",
      "What politics settles in its institutions, technology settles in arrangements of "
      "wires and semiconductors — and, we may add, lines of code.",
      "Langdon Winner (with a nod to Lessig)",
      "Every app you vibe-code takes a side. Which values are you building in — on purpose, or by default?",
      FOOT)
notes(s, "Winner's 'technological somnambulism' (sleepwalking): we build fast and discover values after the fact. Adapted from the VAP deck. Good opener for the embedded-values discussion.")

# --- What is a value? ---
s = content("FOUNDATION", "What is a value?",
    [[("Values are properties of things — and states of affairs — that we care about and "
       "strive to attain.", {"size": 24, "color": WHITE, "bold": True})],
     [("", {})],
     [("Privacy. Fairness. Safety. Access. Dignity. Autonomy. Sustainability. Honesty. "
       "They’re the things we don’t want to compromise — even when the tool says we can.", {"size": 20, "color": MUTED})]],
    FOOT)
notes(s, "Definition from the VAP deck (Flanagan & Nissenbaum).")

columns("FOUNDATION", "Two families of values",
    [("Ethical", "How we treat each other",
      "kindness · honesty · safety · autonomy · privacy · dignity · well-being · responsibility"),
     ("Political", "Arrangements of power",
      "justice · equality · accountability · democracy · access · liberty · transparency · privacy")],
    FOOT)

# --- Conscientious design ---
s = content("CONSCIENTIOUS DESIGN", "It’s our job to build on purpose",
    [[("Conscientious designers consider values when they design and build systems.",
       {"size": 22, "color": WHITE})],
     [("", {})],
     [("It’s our responsibility both to ", {}),
      ("reflect", {"color": GREEN, "bold": True}),
      (" on the values already expressed in technology, and to ", {}),
      ("design", {"color": GREEN, "bold": True}),
      (" according to the values we cherish.", {})],
     [("", {})],
     [("— Flanagan & Nissenbaum, Values at Play", {"size": 15, "color": MUTED})]],
    FOOT)
notes(s, "Flanagan & Nissenbaum framing from the VAP deck. Values at Play is the provided course textbook.")

# --- Bridge: your tools embed values too ---
s = content("BRING IT HOME", "Your vibe-coding tools embed values too",
    [[("Every tool pushes some values: speed, scale, engagement, efficiency, frugality, "
       "autonomy, sustainability…", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Which values does the tool you use push on ", {}), ("you", {"color": GREEN, "bold": True}),
      ("? What does it make easy — and what does it quietly make hard?", {})]],
    FOOT)
notes(s, "This is the 7/20 'lightweight discussion' beat from the syllabus — what values get embedded in the tools we use.")

s = content("CALLBACK", "Values hide in the defaults",
    [[("Remember Week 1: “make it professional” defaulted to blue, corporate, US-style. "
       "That default was a ", {"size": 22, "color": WHITE}),
      ("values choice", {"size": 22, "color": GREEN, "bold": True}),
      (".", {"size": 22, "color": WHITE})],
     [("", {})],
     [("When you don’t specify, the tool decides whose values win. Naming a value is how you "
       "take that decision back.", {"size": 20, "color": MUTED})]],
    FOOT)

# --- Light VAP peek (full framework is Week 3) ---
columns("A PEEK AHEAD", "One framework, three moves — Values at Play",
    [("01 · Discovery", "What values?",
      "Find the values at play and define them in concrete terms."),
     ("02 · Implementation", "Build them in",
      "Turn values into features; resolve clashes (dissolve / compromise / trade-off)."),
     ("03 · Verification", "Did it work?",
      "Check whether the built thing actually delivers the value. We go deep in Week 3.")],
    FOOT)
notes(prs.slides[-1], "Light teaser only — plants VAP so Project 2 has vocabulary and Week 3 (7/28) can go deep with the Discovery reading. Do NOT run the full canvas workshop here.")

# --- Activity ---
s = bullets("ACTIVITY", "AI as Moral Assistant — build a tool that argues for a value",
    ["Build a small tool that helps someone act more morally — calculator, nudge, checker, check-in.",
     "The tool must ARGUE for something — name the value explicitly in the UI.",
     "Keep it small: one page, built and hosted in one session.",
     "Don't let it fabricate the facts people decide on — check the AI's sources, or say you're estimating.",
     "Deliverable: hosted one-pager + reflection. Example precedents: footprint/offset calculator, protein-suffering index."],
    FOOT)
notes(s, "Generalized from the footprint framing — any moral-assistant tool qualifies (footprint calculator is one precedent, Hauke's protein-suffering calculator another). Hallucinated numbers/citations are the real failure mode here. Reading: 'The Values Map' (Common Cause).")

s = columns("PROJECT TIME", "Vibe coding ambassadors",
    [("One per team", "Your AI power user",
      "Each team has an ambassador account with a stronger agentic tool. They drive the heavy builds — the rest of you still prompt on Gemini."),
     ("Rotate the driver", "Not a bottleneck",
      "The ambassador runs the session, but everyone takes the keyboard. Every member's prompts must show up in history.md."),
     ("Ask early", "Don't burn the day",
      "Blocked on access, quota, or setup? Flag it at the start of project time — not at 11:55.")], FOOT)
notes(s, "Practical slide for project work time: how the per-team ambassador accounts work alongside Gemini Code Assist for everyone. Adjust the middle column if the role split changed.")

# --- Toward Project 2 ---
s = content("WHAT’S NEXT", "Start noticing your value",
    [[("Thursday you’ll build ", {"size": 22, "color": WHITE}),
      ("for a human value", {"size": 22, "color": GREEN, "bold": True}),
      (" (Project 2).", {"size": 22, "color": WHITE})],
     [("", {})],
     [("This week, watch for the one you actually care about — privacy, accessibility, "
       "sustainability, fairness, dignity, autonomy — and how a small app could serve it.", {"size": 20, "color": MUTED})],
     [("", {})],
     [("Reading: The Values Map (Common Cause) · Textbook: Values at Play (provided).", {"size": 14, "color": DIM})]],
    FOOT)

# ================= TUESDAY — AI Safety: Red-Teaming (7/21) =================
save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week2-Mon-Values-In-Vibe-Coding.pptx"); prs = init_deck()
divider("WEEK 2 · TUESDAY", "AI Safety: Red-Teaming", "Ethics — Doing the right thing")

s = content("SET-UP", "Red-teaming: attack your own build",
    [[("Red-teaming = adversarially probing a system to find where it breaks or does harm — "
       "before someone else does.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Today you’ll push a vibe-coding tool to produce ", {}),
      ("dark patterns", {"color": GREEN, "bold": True}),
      (" and manipulative UI, and watch where its guardrails kick in.", {})]], FOOT)
notes(s, "From syllabus 7/21 + repo. Use the project you started, or a small safe demo — no real user data.")

columns("KNOW THE MOVES", "Dark patterns to try to elicit",
    [("Forced continuity", "Hard to cancel",
      "A free trial silently rolls into charges; cancellation is buried."),
     ("Confirmshaming", "Guilt the user",
      "“No thanks, I don’t want to save money.” Shame as a decline button."),
     ("Roach motel", "Easy in, hard out",
      "One click to sign up; a maze to delete your account.")], FOOT)
notes(prs.slides[-1], "Also name: bait-and-switch, sneaking to cart, disguised ads, nagging. Ref: deceptive.design (Harry Brignull).")

bullets("ACTIVITY · PART 1", "Push the tool to misbehave",
    ["Start from a benign brief (a checkout page, a sign-up flow).",
     "Progressively prompt for manipulative versions — forced continuity, confirmshaming, roach motels.",
     "Log every response: refusal, partial refusal, or success.",
     "Screenshot what it actually built."], FOOT)

s = content("ACTIVITY · PART 2½", "When it refuses, work around it",
    [[("Guardrails aren’t airtight. Try to route around a refusal — reframe the ask, split it into "
       "steps, change the framing.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Document ", {}), ("where safety kicks in and where it doesn’t", {"color": GREEN, "bold": True}),
      (" — that gap is the real lesson.", {})]], FOOT)
notes(s, "Repo 'Part 2½'. The point is mapping the guardrail boundary, not causing harm.")

big_question("DISCUSS",
    ["Which harms does the model treat as “safety” — and which as mere “design preference”?",
     "Where does that line fail?"], FOOT)

s = content("THE FLIP SIDE", "Bright patterns",
    [[("The opposite move: design that respects autonomy — clear choices, honest defaults, easy exits.",
       {"size": 22, "color": WHITE})],
     [("", {})],
     [("See brightpatterns.org. Tension to hold: can persuasion ever be ethical — or is the nudge "
       "itself the problem?", {"size": 20, "color": MUTED})]], FOOT)
notes(s, "Reading: Krauß et al. 2025 (CHI) — dark patterns. Bright patterns = the constructive counter.")

# ================= WEDNESDAY — AI Against AI (7/22) =================
save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week2-Tue-AI-Safety-Red-Teaming.pptx"); prs = init_deck()
divider("WEEK 2 · WEDNESDAY", "AI Against AI", "Ethics — Doing the right thing")

s = big_question("TODAY",
    ["How is AI unethical —",
     "and can we fight back with it?"], FOOT)
notes(s, "3-hour class. The whole deck is a split: RED = the problem (how AI harms), GREEN = the defense (AI against AI). Say that up front so the colors read as good/bad.")

# --- Warm-up brainstorm (generate now, build later) ---
s = big_question("WARM-UP · 5 MIN",
    ["Name one AI harm you’ve felt or seen —",
     "and one way you’d fight back. Keep it."], FOOT)
notes(s, "Everyone jots 1–2 on paper / a sticky. No wrong answers — activate what they already know before the lecture enriches it. Tell them: hold onto your fightback idea — you can BUILD it as your Part B project this afternoon. We come back to these before the activity.")

# ======== ACT 1 · THE PROBLEM (red) ========
section("⚠  ACT 1 · THE PROBLEM", "How AI is unethical", color=RED,
        sub="A map of the values AI puts under threat — then the receipts.")

# --- The centerpiece: values under threat, all visible at once (RED) ---
value_grid("THE MAP · VALUES UNDER THREAT", "What AI puts at risk", [
    ("⚖️", "Fairness & Justice", "Bias encoded and amplified — unequal calls in hiring, lending, policing, and healthcare."),
    ("🔒", "Privacy & Surveillance", "Personal data scraped and memorized; biometric tracking and mass surveillance."),
    ("📰", "Truth & Democracy", "Fluent falsehoods and cheap propaganda erode shared facts and fair elections."),
    ("🧠", "Autonomy & Dignity", "Manipulative, addictive design and social scoring strip human agency."),
    ("⚠️", "Safety", "Malicious use, deepfakes, voice-clone fraud, and companion-bot harm."),
    ("🌍", "Labor & Environment", "Jobs displaced onto low-paid ‘ghost work’; energy and freshwater burned."),
    ("🎭", "Accountability & Authenticity", "Opaque decisions with no redress; synthetic media and style theft."),
], cols=4, foot=FOOT, accent_color=RED)
notes(prs.slides[-1], "Convergent across the field: Weidinger et al. 2022 (FAccT), Shelby et al. 2023 (AIES), MIT AI Risk Repository, NIST AI RMF, EU AI Act all carve up roughly these categories. This is the general OVERVIEW; we go deep on the ones we can defend. Sources slide at the end.")

# --- How the harm gets in (mechanism) ---
columns("HOW IT HAPPENS", "The harm enters at every stage",
    [("1 · Data", "What it learns from",
      "Scraped without consent; carries society’s bias, private info, and copyrighted work into the model."),
     ("2 · Training", "What gets baked in",
      "The model memorizes and amplifies patterns — including the ones we’d never choose on purpose."),
     ("3 · Deployment", "Where it lands",
      "Confident output at massive scale, in hiring, courts, feeds, and chats — with no one accountable.")], FOOT, accent_color=RED)
notes(prs.slides[-1], "Grounding slide: harms aren't one bug — they enter at data, training, AND deployment. This also previews WHERE defenses can intervene (poison the data, audit the model, detect the output).")

# --- These are not hypothetical: real, cited incidents as a press wall (RED) ---
headline_cards("NOT HYPOTHETICAL · THE RECEIPTS", "It’s already happening",
    [("PBS / AP · Jan 2024",
      "X blocks Taylor Swift searches as explicit AI deepfakes circulate — one post seen ~47M times.",
      "Dignity"),
     ("NPR · 2024",
      "An AI-cloned ‘Biden’ robocall told N.H. voters to stay home — the FCC issued a $6M fine.",
      "Democracy"),
     ("CNN Business · May 2024",
      "A deepfake ‘CFO’ on a video call cost engineering firm Arup $25M in transfers.",
      "Security")], FOOT, accent_color=RED)
notes(prs.slides[-1], "Cited claims (source + date on each card), all verified. Sources: PBS/AP + NBC/CBS (Swift); NPR (NH robocall, FCC $6M); CNN Business (Arup, May 2024).")

headline_cards("NOT HYPOTHETICAL · THE RECEIPTS", "The automated harms",
    [("CBS / CNBC · 2026",
      "Google and Character.AI settle a suit over a 14-year-old’s suicide after months with a companion bot.",
      "Safety"),
     ("Al Jazeera · 2021",
      "A Dutch benefits algorithm branded ~26,000 families fraudsters — the government resigned.",
      "Fairness"),
     ("TechCrunch · 2025",
      "Anthropic settles with authors for ~$1.5B over training on pirated books — a record.",
      "Ownership")], FOOT, accent_color=RED)
notes(prs.slides[-1], "Sources: CBS/CNBC (Character.AI settlement, 2026); Al Jazeera (Dutch toeslagenaffaire, 2021); TechCrunch/Authors Guild (Bartz v. Anthropic ~$1.5B, 2025).")

# --- Photo slide: privacy & surveillance ---
photo_split("NOT HYPOTHETICAL · PRIVACY", "Your face is in the training set",
    [[("Clearview AI scraped ", {"size": 20, "color": WHITE}),
      ("3 billion+ faces", {"size": 20, "color": RED, "bold": True}),
      (" from the web to sell facial ID to police — without anyone’s consent.", {"size": 20, "color": WHITE})],
     [("", {})],
     [("At least ", {"size": 20, "color": WHITE}),
      ("four Black men", {"size": 20, "color": RED, "bold": True}),
      (" have been wrongly arrested on false facial-recognition matches.", {"size": 20, "color": WHITE})]],
    "facerec.jpg", "Photo: Pete Woodhead / Wikimedia Commons · CC BY 2.0",
    FOOT, accent_color=RED)
notes(prs.slides[-1], "Sources: NYT (Kashmir Hill, Clearview 2020); ACLU (Williams, Woodruff, Parks, Reid wrongful arrests). Image is a facial-recognition demo, CC BY 2.0 — illustrative, not the actual cases.")

# --- Photo slide: the hidden costs (labor + environment) ---
photo_split("NOT HYPOTHETICAL · THE HIDDEN COSTS", "Someone pays for the magic",
    [[("Training GPT-3 evaporated an estimated ", {"size": 20, "color": WHITE}),
      ("~700,000 L of freshwater", {"size": 20, "color": RED, "bold": True}),
      ("; datacenter emissions are spiking (Google +48% vs 2019).", {"size": 20, "color": WHITE})],
     [("", {})],
     [("And the humans: Kenyan workers paid ", {"size": 20, "color": WHITE}),
      ("~$2/hour", {"size": 20, "color": RED, "bold": True}),
      (" labeled graphic toxic content to build ChatGPT’s safety filter.", {"size": 20, "color": WHITE})]],
    "datacenter.jpg", "Photo: BalticServers.com / Wikimedia Commons · CC BY-SA 3.0",
    FOOT, accent_color=RED)
notes(prs.slides[-1], "Sources: Li et al. arXiv:2304.03271 + UC Riverside (water — per-session framing, not 'a bottle per prompt'); NPR (emissions); TIME (Sama/Kenya, Jan 2023, <$2/hr).")

# --- Discussion beat (long-class pacing) ---
s = big_question("TALK · 3 MIN",
    ["Which of these hits closest to home?",
     "Which value would YOU most want to protect?"], FOOT)
notes(s, "Turn-to-your-neighbor. Surfaces the value each student cares about — which becomes the lens for their defense/Part B. Take 2–3 out loud, map each to the red grid.")

# ======== THE TURN ========
s = quote("THE TURN",
    "You have a right to protect your personal narrative as AI companies vacuum up the internet.",
    "after Brunton & Nissenbaum, Obfuscation",
    "For every harm on that map — is there a defense?", FOOT)
notes(s, "Pivot from red to green. Not every harm has a clean technical fix — but some do, and that's where we go deep.")

# ======== ACT 2 · THE DEFENSE (green) ========
section("✓  ACT 2 · THE DEFENSE", "AI against AI", color=GREEN,
        sub="Turn the same tools back around — to protect instead of extract.")

# --- The mirror: defenses, same 7 values (GREEN) ---
value_grid("THE COUNTER-MAP · DEFENSES", "Turning AI against AI", [
    ("⚖️", "Fairness", "Bias audits & adversarial fairness testing — red-team the model before it ships."),
    ("🔒", "Privacy", "Obfuscation, scraper-poisoning, Glaze/Nightshade cloaking — poison the training set."),
    ("📰", "Truth", "Provenance & watermarking (C2PA), deepfake & AI-text detectors."),
    ("🧠", "Autonomy", "Bright patterns & dark-pattern detectors that hand control back to the user."),
    ("⚠️", "Safety", "Scam & voice-clone detectors; guardrail red-teaming; hash-matching."),
    ("🌍", "Labor", "Withhold your tacit skill from capture; carbon/water dashboards for models."),
    ("🎭", "Authenticity", "Content credentials, model cards, audit logs — make provenance legible."),
], cols=4, foot=FOOT, accent_color=GREEN)
notes(prs.slides[-1], "The good/bad mirror: same 7 values, now the DEFENSE column. We go deep on three: obfuscation (privacy), the China labor case (labor), and the DSI paper (privacy of groups).")

# --- Deep dive 1: obfuscation / poison the scraper (Part A) ---
content("DEEP DIVE · PRIVACY", "Poison the scraper (this is Part A)",
    [[("Inject plausible but ", {"size": 22, "color": WHITE}),
      ("fabricated", {"color": GREEN, "bold": True}),
      (" facts into your own site — invisible to humans, visible to AI scrapers. Obfuscation as self-defense.",
       {"size": 22, "color": WHITE})],
     [("", {})],
     [("clip: rect(0,0,0,0)", {"size": 18, "color": GREEN, "font": F_MONO}),
      (" keeps the text in the render tree but trims it to 0px — the scraper ingests your decoy; the human sees nothing.",
       {"size": 18, "color": MUTED})]], FOOT)
notes(prs.slides[-1], "e.g. 'Co-founded a kombucha startup in 2019.' Verify with curl. Full walkthrough in the repo example (activity1_obfuscation-example).")

# --- HAUKE'S SLIDE: prompt injection as obfuscation (placeholder frame) ---
s = media("DEEP DIVE · PRIVACY", "Prompt injection as obfuscation",
    "🎤 Hauke’s slide",
    "Drop in the prompt-injection-as-obfuscation material here (hidden instructions that redirect a scraping agent).", FOOT)
notes(s, "PLACEHOLDER for Hauke's own slide on prompt injection as an obfuscation defense — replace this frame with your content after importing to Google Slides.")

# --- Deep dive 2: the China labor case ---
content("DEEP DIVE · LABOR", "Hide your knowledge from the machine",
    [[("In China, workers build ", {"size": 21, "color": WHITE}),
      ("colleague.skill", {"size": 21, "color": GREEN, "font": F_MONO}),
      (" files — AI replicas of a coworker’s know-how — to make each other redundant.",
       {"size": 21, "color": WHITE})],
     [("", {})],
     [("The counter-move: ", {"size": 21, "color": WHITE}),
      ("anti-distillation.skill", {"size": 21, "color": GREEN, "font": F_MONO}),
      (" — strip your tacit knowledge before it’s captured. “Nobody wants to be turned into a skill file and lose their job.”",
       {"size": 21, "color": WHITE})]], FOOT)
notes(prs.slides[-1], "Source: OfficeChai, 'China's workers are weaponizing AI…'. A vivid AI-against-AI case for LABOR autonomy: refusing to feed the model that would replace you. 60% of Chinese employees already use AI weekly.")

# --- Deep dive 3: Hauke's DSI paper ---
content("DEEP DIVE · PRIVACY OF GROUPS", "When blurring isn’t enough (Franchi, Sandhaus et al.)",
    [[("Dense Street Imagery: ~3 trillion photos of public streets (dashcams, Waymo, Lyft). Faces and plates are blurred.",
       {"size": 20, "color": WHITE})],
     [("", {})],
     [("The finding: ", {"size": 20, "color": GREEN, "bold": True}),
      ("AI can still infer sensitive GROUP membership from ‘anonymized’ people. The paper red-teams the blur — then maps who’s exposed and how to protect them.",
       {"size": 20, "color": WHITE})]], FOOT)
notes(prs.slides[-1], "Hauke's FAccT 2025 paper (paired reading). Uses inference (AI) to expose that individual anonymization fails at the GROUP level — a contextual-integrity argument. Refine framing to taste.")

# --- Deep dive 4: cloak & poison (protect creative work) ---
content("DEEP DIVE · CREATIVE OWNERSHIP", "Cloak it, or poison it",
    [[("Glaze", {"size": 21, "color": GREEN, "bold": True}),
      (" adds perturbations invisible to you but confusing to a model — it can’t copy your style.",
       {"size": 21, "color": WHITE})],
     [("", {})],
     [("Nightshade", {"size": 21, "color": GREEN, "bold": True}),
      (" goes further — poisoned images corrupt any model that trains on them. ",
       {"size": 21, "color": WHITE}),
      ("PhotoGuard", {"size": 21, "color": GREEN, "bold": True}),
      (" immunizes photos so AI can’t edit them into deepfakes.",
       {"size": 21, "color": WHITE})]], FOOT)
notes(prs.slides[-1], "Glaze/Nightshade from the SAND Lab (UChicago); PhotoGuard from MIT. Defense for creative ownership + anti-deepfake. All student-buildable as conceptual demos. Ties back to the NYT/Getty/Anthropic harms.")

# --- Deep dive 5: prove what's real (provenance & detection) ---
content("DEEP DIVE · TRUTH", "Prove what’s real",
    [[("Instead of spotting fakes after the fact, sign the ", {"size": 21, "color": WHITE}),
      ("real", {"size": 21, "color": GREEN, "bold": True}),
      (" thing at creation.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("C2PA / Content Credentials", {"size": 20, "color": GREEN, "bold": True}),
      (" attach tamper-evident provenance to media. Pair with AI-text and deepfake detectors — imperfect, but a signal.",
       {"size": 20, "color": WHITE})]], FOOT)
notes(prs.slides[-1], "C2PA content credentials (Adobe/BBC/etc.). The framing shift: 'proof of human' beats 'detect the machine' as detectors get worse. Detectors are probabilistic — teach students to state confidence, not certainty.")

# --- The honest catch: it's an arms race ---
s = big_question("THE CATCH",
    ["Every defense provokes a counter-move.",
     "The same inference that protects can also expose."], FOOT)
notes(s, "Intellectual honesty: cloaks get broken, detectors get evaded, poisoning gets filtered. And the DSI paper is the flip — inference used defensively (to prove anonymization fails) is the SAME tool an attacker uses. Defense is a posture, not a finish line.")

# --- Brainstorm revisited: now pick one to BUILD ---
s = big_question("BACK TO YOUR WARM-UP",
    ["Pick a harm from the red map —",
     "your defense becomes your Part B. Build it."], FOOT)
notes(s, "Return to the fightback idea they jotted at the start. Now they DECIDE: is that the thing they build for Part B? Seed with the counter-map + deep dives if stuck. A few shout one out; map each to a value. This is the hand-off into the activity.")

# ======== DO IT · the activity ========
s = bullets("DO IT · PART A", "First: poison your own scraper",
    ["Open your Week 1 site (week1/7_13).",
     "Add 2–3 plausible fake facts, hidden with CSS clip + aria-hidden — NOT display:none.",
     "Verify with curl that the decoy is in the raw payload but invisible on the page.",
     "~30 minutes — then move to your own build."], FOOT)
notes(prs.slides[-1], "Part A edits week1/7_13. Guided; the example project has the exact snippet. Keep it short so most of the session goes to Part B.")

s = bullets("DO IT · PART B", "Then: build your AI-against-AI project",
    ["Build the defense you picked — hosted, in week2/7_22/code_deliverable.",
     "Starting points: style cloaking · privacy noise (TrackMeNot) · block-the-bots · AI-vs-AI detector · worker-autonomy tool.",
     "Scope it to one page you can finish and demo — a working slice beats a grand plan.",
     "The live link is your submission; the report documents BOTH parts."], FOOT)
notes(prs.slides[-1], "Part B is the main event of the afternoon. Rotate who drives the AI. Template: vibe-report-template.md. Remind them: name who your tool could harm as well as protect.")

s = big_question("THE ETHICS",
    ["Defense vs. deception — where’s the line?",
     "Who could your technique harm, as well as protect?"], FOOT)
notes(s, "Reading: Obfuscation, Ch. 1 (Brunton & Nissenbaum). Every defense points a weapon somewhere — name where. The DSI paper is the cautionary flip: the same inference that defends can also expose.")

# --- Sources ---
bullets("SOURCES", "Where the map comes from",
    ["Weidinger et al. 2022 — Taxonomy of Risks posed by Language Models (FAccT).",
     "Shelby et al. 2023 — Sociotechnical Harms of Algorithmic Systems (AIES).",
     "MIT AI Risk Repository (2024) · NIST AI Risk Management Framework (2023) · EU AI Act (2024).",
     "Incidents: NYT, CNN, NBC, NPR, TIME, CBS, Al Jazeera, Authors Guild; Li et al. 2023 (water).",
     "Defenses: Brunton & Nissenbaum, Obfuscation · Franchi, Sandhaus et al. 2025 (DSI, FAccT)."], FOOT)
notes(prs.slides[-1], "All incidents verified against these reputable sources. Caveats to state if asked: AI 'water per prompt' is per-session not per-prompt; 'X% of the web is AI' figures are single-vendor estimates — cite NewsGuard's tracked site counts instead.")

# ================= THURSDAY — Project 2 (7/23) =================
save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week2-Wed-AI-Against-AI.pptx"); prs = init_deck()
divider("WEEK 2 · THURSDAY", "Project Day — Project 2")

s = bullets("PROJECT 2", "Build for a human value",
    ["Teams of 3–4 — everyone codes, rotate who drives the AI.",
     "Pick a value you care about (from Monday): privacy, accessibility, sustainability, fairness, dignity…",
     "Ship a small hosted app that purposefully supports that value.",
     "Deliverable: hosted link + a vibe report. Due Monday of Week 3, before class."], FOOT)
notes(s, "From syllabus/repo. Work happens in your team's Group Project 2 Classroom repo.")

columns("MAKE IT SHARP", "Name three things before you build",
    [("The value", "What you serve", "State it plainly — and why it matters for this user."),
     ("The user", "Who it’s for", "A real person and situation — not “everyone.”"),
     ("The tell", "How you’d know", "What would you see if the value is actually being served?")], FOOT)
notes(prs.slides[-1], "Discovery-lite bridge from Monday's VAP teaser — value / user / success, without the full canvas.")

n = save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week2-Thu-Project-Day.pptx")
print("Week 2 saved as 4 per-day decks (Thu:", n, "slides)")

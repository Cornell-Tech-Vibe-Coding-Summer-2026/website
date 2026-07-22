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

s = big_question("WARM-UP",
    ["Two questions, all class:",
     "How is AI unethical — and can we fight back with it?"], FOOT)
notes(s, "The whole deck is a split: RED = the problem (how AI harms), GREEN = the defense (AI against AI). Say that up front so the colors read as good/bad.")

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

# --- These are not hypothetical: real, verified incidents (RED) ---
columns("NOT HYPOTHETICAL · 1", "It’s already happening",
    [("Dignity", "Deepfakes",
      "Explicit AI images of Taylor Swift hit ~47M views on X (Jan 2024); 30+ girls targeted at one NJ high school."),
     ("Democracy", "Election fakes",
      "An AI-cloned “Biden” robocall told NH voters to stay home — $6M FCC fine (2024)."),
     ("Security", "Fraud",
      "A deepfake “CFO” on a video call cost engineering firm Arup $25M in transfers (2024).")], FOOT, accent_color=RED)
notes(prs.slides[-1], "Sources: NBC/CBS (Swift, Jan 2024); CNN/Axios (Westfield NJ, Nov 2023); NPR (NH robocall, FCC $6M); CNN Business (Arup, May 2024). All verified.")

columns("NOT HYPOTHETICAL · 2", "The quieter harms",
    [("Safety", "Companion bots",
      "Character.AI settled after 14-year-old Sewell Setzer’s suicide (2024; landmark settlement 2026)."),
     ("Fairness", "Biased decisions",
      "A Dutch benefits algorithm falsely branded ~26,000 families fraudsters — the government fell (2021)."),
     ("Privacy", "Surveillance",
      "Clearview scraped 3B+ faces; at least four Black men were wrongly arrested on false matches.")], FOOT, accent_color=RED)
notes(prs.slides[-1], "Sources: CBS/CNBC (Character.AI, 2026); Al Jazeera (Dutch toeslagenaffaire, 2021); NYT/ACLU (Clearview; Williams, Woodruff, Parks, Reid). All verified.")

columns("NOT HYPOTHETICAL · 3", "The hidden costs",
    [("Labor", "Ghost work",
      "Kenyan workers paid ~$2/hr labeled graphic toxic content to build ChatGPT’s filter (2023)."),
     ("Environment", "Thirsty AI",
      "~700,000 L of freshwater to train GPT-3; datacenter emissions spiking (Google +48% vs 2019)."),
     ("Ownership", "Style & text theft",
      "Anthropic settled with authors for ~$1.5B over training on pirated books (2025).")], FOOT, accent_color=RED)
notes(prs.slides[-1], "Sources: TIME (Sama/Kenya, Jan 2023); Li et al. arXiv:2304.03271 + UC Riverside (water — use per-session framing, not 'a bottle per prompt'); NPR (emissions); Authors Guild/Norton Rose (Bartz v. Anthropic ~$1.5B). All verified.")

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

# --- Brainstorm: pull students in ---
s = big_question("YOUR TURN · 5 MIN",
    ["What else could ‘AI against AI’ be?",
     "Pick a harm from the red map — invent its defense."], FOOT)
notes(s, "Quick brainstorm before building. Prompts to seed it: detectors, cloaks, noise, provenance, refusal/withholding, audits, watermarks. Have a few teams shout one out and map it to a value. This warms up Part B.")

# ======== DO IT · the activity ========
s = bullets("DO IT · BOTH PARTS", "Today you build two things",
    ["Part A — poison your Week 1 site (obfuscation): fake facts via CSS clip + aria-hidden, verified with curl.",
     "Part B — a hosted AI-against-AI mini project of your own (the link is your submission).",
     "Options for B: style cloaking · privacy noise · block-the-bots · an AI-vs-AI detector · worker-autonomy tool.",
     "The report documents BOTH parts."], FOOT, )
notes(prs.slides[-1], "Part A edits week1/7_13; Part B lives in week2/7_22/code_deliverable. Template: vibe-report-template.md.")

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

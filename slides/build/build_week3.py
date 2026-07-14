#!/usr/bin/env python3
"""Week 3 — one deck. Mon 7/27 usability, Tue 7/28 VAP values (RICHER: Discovery +
3-question check + Implementation conflict-resolution, worked example), Wed 7/29 working
day, Thu 7/30 final presentations. VAP content adapted from the speed-run deck + syllabus."""

from deck_common import *
from pptx.util import Inches, Pt, Emu
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
prs = init_deck()

FOOT = "Good Code, Good Vibes · TECHIE 1121 · Cornell Tech · Summer 2026"

def numbered_two_col(kick, title, items, foot=None):
    """items: list of (label, gloss). Split into two columns."""
    s = slide(); kicker(s, kick); accent(s)
    text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.0),
         [[(title, {"size": 32, "bold": True, "color": WHITE})]])
    half = (len(items) + 1) // 2
    cols = [items[:half], items[half:]]
    xs = [Inches(0.72), Inches(6.9)]
    for ci, col in enumerate(cols):
        paras = []
        for gi, (label, gloss) in enumerate(col):
            n = ci * half + gi + 1
            paras.append([("%02d  " % n, {"color": GREEN, "bold": True, "font": F_MONO, "size": 15}),
                          (label + "  ", {"color": WHITE, "bold": True, "size": 16}),
                          (gloss, {"color": MUTED, "size": 14})])
        text(s, xs[ci], Inches(2.7), Inches(5.9), Inches(4.0), paras, spacing=1.35)
    if foot: footer(s, foot)
    return s

# ===========================================================================
# MONDAY 7/27 — User Testing I: Usability
# ===========================================================================
divider("WEEK 3 · MONDAY", "User Testing I: Does It Work?",
        "Outcomes — Designing systems that are useful and empowering")

content("THE TURN", "You built it. Does it work — for someone who isn’t you?",
    [[("This week your final project meets real users. Two questions, two days:", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Today — ", {}), ("does it work?", {"color": GREEN, "bold": True}),
      ("  (usability).   Tomorrow — ", {}),
      ("does it do the right thing?", {"color": GREEN, "bold": True}), ("  (values).", {})]], FOOT)

content("WHY TEST", "You are not your user",
    [[("You know where every button is and what every label means — so you’re the worst "
       "person to judge whether it’s usable.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Watching one real person try your app tells you more than any amount of guessing.", {"size": 20, "color": MUTED})]], FOOT)

numbered_two_col("READING · NIELSEN", "Nielsen’s 10 usability heuristics",
    [("Visibility of system status", "always show what’s happening"),
     ("Match the real world", "speak the user’s language"),
     ("User control & freedom", "easy undo / exits"),
     ("Consistency & standards", "follow conventions"),
     ("Error prevention", "stop mistakes before they happen"),
     ("Recognition over recall", "show options, don’t make them remember"),
     ("Flexibility & efficiency", "shortcuts for experts"),
     ("Aesthetic & minimalist", "no needless clutter"),
     ("Recover from errors", "plain-language fixes"),
     ("Help & documentation", "findable when needed")], FOOT)
notes(prs.slides[-1], "Reading: Nielsen — 10 Usability Heuristics (NN/g). Use these as the lens for the peer test.")

bullets("HOW TO RUN IT", "A quick usability test in 4 moves",
    ["Give a real task (“sign up and post one thing”) — don’t give a tour.",
     "Watch, don’t help. Silence is data.",
     "Ask them to think aloud — narrate what they expect.",
     "Note every hesitation, wrong turn, and dead end."], FOOT)

s = bullets("ACTIVITY · ROUND 1", "Peer-test for usability",
    ["Each team tests other teams’ projects — and gets tested.",
     "Testers: run the 4 moves above; log issues against Nielsen’s heuristics.",
     "Teams: watch your users struggle — resist the urge to explain.",
     "Rank fixes by how badly they block the task, then iterate."], FOOT)
notes(s, "Repo 7_27 peer-testing. Bring your findings to Tuesday's values test.")

# ===========================================================================
# TUESDAY 7/28 — User Testing II: Values (VAP) — RICHER
# ===========================================================================
save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week3-Mon-User-Testing-I.pptx"); prs = init_deck()
divider("WEEK 3 · TUESDAY", "User Testing II: Does It Do the Right Thing?",
        "Values at Play — the ethics of what you built")

content("THE SECOND TEST", "Usable ≠ right",
    [[("A dark pattern can be beautifully usable. “Does it work?” and “does it do the right "
       "thing?” are different questions.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Today we test the second one — with a framework: ", {}),
      ("Values at Play", {"color": GREEN, "bold": True}),
      (" (Flanagan & Nissenbaum).", {})]], FOOT)

columns("THE FRAMEWORK", "Values at Play — three moves",
    [("01 · Discovery", "What values?", "Find the values at play; define them in concrete terms."),
     ("02 · Implementation", "Build them in", "Turn values into features; resolve the clashes."),
     ("03 · Verification", "Did it work?", "Check whether the built thing delivers the value.")], FOOT)
notes(prs.slides[-1], "Recap from Week 2 Monday's teaser — now we go deeper on Discovery and Implementation.")

# --- Discovery ---
columns("DISCOVERY · SOURCES", "Where do values come from? Look at the sources",
    [("Functional", "What it’s for", "The system’s explicit purpose, mission, and promise."),
     ("Actors", "Who’s involved", "Users, creators, funders — and affected parties who never touch it."),
     ("Constraints", "The material", "What the tech makes easy or hard — screen, sensors, data."),
     ("Context", "The world around it", "Norms, culture, law, and standards it inherits.")], FOOT)
notes(prs.slides[-1], "VAP Discovery heuristic (Ch. 5). Trace each source to the values it carries in.")

content("DISCOVERY · DEFINE", "Make abstract values concrete",
    [[("A value you can’t define, you can’t test. Turn it into operational terms:", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Privacy", {"color": GREEN, "bold": True}), (" → control · secrecy · contextual integrity.    ", {}),
      ("Fairness", {"color": GREEN, "bold": True}), (" → equal access.", {})],
     [("Accessibility", {"color": GREEN, "bold": True}), (" → perceivable · operable for every body.    ", {}),
      ("Autonomy", {"color": GREEN, "bold": True}), (" → act for your own reasons.", {})]], FOOT)

# --- Examples (both threads) ---
content("EXAMPLE · YOUR BUILD", "Discovery on a vibe-coded app",
    [[("An accessible event sign-up form.", {"size": 22, "color": WHITE, "bold": True})],
     [("", {})],
     [("Sources → values: the ", {}), ("purpose", {"color": GREEN, "bold": True}),
      (" (let anyone RSVP) → access; the ", {}), ("actors", {"color": GREEN, "bold": True}),
      (" (screen-reader users) → dignity; the ", {}), ("context", {"color": GREEN, "bold": True}),
      (" (you collect names) → privacy.", {})]], FOOT)

content("EXAMPLE · REAL WORLD", "Discovery on a real system (YAI)",
    [[("A computer-vision tool that watches for seizures for people with disabilities.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Values in tension: ", {}), ("safety", {"color": GREEN, "bold": True}),
      (" (catch the seizure) vs. ", {}), ("privacy & dignity", {"color": GREEN, "bold": True}),
      (" (a camera always watching a person in their home).", {})]], FOOT)
notes(prs.slides[-1], "Hauke's own PiTech case (YAI). Real example of a genuine value conflict — sets up Implementation.")

# --- Implementation ---
content("IMPLEMENTATION", "Translate values into the build",
    [[("Discovery names the values. Implementation puts them into features, architecture, and "
       "lines of code — and forces the hard part: ", {"size": 22, "color": WHITE}),
      ("what happens when two values collide?", {"size": 22, "color": GREEN, "bold": True})]], FOOT)

columns("VALUE CONFLICTS", "Three ways to resolve a clash",
    [("Dissolve", "Both, fully", "Redesign so the conflict disappears — no one loses."),
     ("Compromise", "Both, partly", "Promote each value, but in less than full measure."),
     ("Trade-off", "One over another", "Sacrifice one value for another — and name the cost.")], FOOT)
notes(prs.slides[-1], "van de Poel / VAP. The goal is to reach for Dissolve first, and to make Trade-offs explicit.")

s = content("WORKED EXAMPLE", "The same conflict, three ways",
    [[("Dissolve — YAI", {"color": GREEN, "bold": True, "size": 20}),
      (": run pose detection on optically blurred images + a rotating blocker that makes the "
       "camera’s state legible. Privacy AND function.", {"size": 18, "color": WHITE})],
     [("", {})],
     [("Compromise — CFS", {"color": GREEN, "bold": True, "size": 20}),
      (": use sensors instead of cameras, and alert the resident first. “As safety expands, "
       "dignity expands too.”", {"size": 18, "color": WHITE})],
     [("", {})],
     [("Trade-off — JustFix", {"color": GREEN, "bold": True, "size": 20}),
      (": keep the AI but change the use case — from legal advice (hallucination = harm) to "
       "emotional support (lower-risk). Cost named.", {"size": 18, "color": WHITE})]], FOOT)
notes(s, "Three real PiTech resolutions from the VAP deck — one per strategy. Vivid, and each maps to a move.")

# --- Verification + the activity ---
content("VERIFICATION", "Did the value actually land?",
    [[("Two checks, borrowed from software testing:", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Did we build the ", {}), ("right thing", {"color": GREEN, "bold": True}),
      ("? — are the discovered values really in the system?", {})],
     [("Did we build it ", {}), ("right", {"color": GREEN, "bold": True}),
      ("? — do real people, in real contexts, experience the value?", {})]], FOOT)

s = numbered_two_col("THE ACTIVITY", "The 3-question values check",
    [("What value does it claim?", "the value the team says the project serves"),
     ("Who’s it for — who’s left out?", "who it serves, and who it could exclude or harm"),
     ("How would you know?", "the observable tell that the value is being delivered")], FOOT)
notes(s, "The 'light 3-question check' the syllabus asks for. Adapt each team's project into these three, then verify with a real user.")

s = bullets("ACTIVITY · ROUND 2", "Peer-test for values",
    ["Swap projects again — run the 3-question check on a classmate’s project.",
     "Name the values tension you find; suggest a dissolve / compromise / trade-off.",
     "Teams: take the tension back into your build and iterate toward the final.",
     "Reading: Values at Play, Ch. 5 (Discovery)."], FOOT)
notes(s, "Repo 7_28 peer-testing round 2 (values). Ties Monday usability + Tuesday values into the final iteration.")

content("A HONEST CAUTION", "VAP runs in your head — so bring real people in",
    [[("The framework’s blind spot: reflection and specification both happen in the designer’s "
       "mind. But the people affected — your users — aren’t in that loop.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("So pair VAP with real testing. Be a ", {}),
      ("value mediator", {"color": GREEN, "bold": True}),
      (" — surface the values your users hold — not just a value selector.", {"size": 20})]], FOOT)
notes(prs.slides[-1], "The VAP deck's 'most critical finding'. Gives the session intellectual honesty and connects straight to the peer-testing activity.")

# ===========================================================================
# WEDNESDAY 7/29 — Working Day
# ===========================================================================
save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week3-Tue-User-Testing-II.pptx"); prs = init_deck()
divider("WEEK 3 · WEDNESDAY", "Working Day")

checklist("USE TODAY WELL", "Working day — before final presentations",
    ["Fix the top usability issues from Monday.",
     "Resolve the values tension from Tuesday (dissolve / compromise / trade-off).",
     "Get the live demo solid — rehearse the happy path.",
     "Write the deep ethical reflection (this is 25% — and AI writing isn’t allowed here).",
     "Capture screenshots / a short video in case the live link fails.",
     "Instructors are here — grab us for a check-in."], FOOT)

# ===========================================================================
# THURSDAY 7/30 — Final Presentations
# ===========================================================================
save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week3-Wed-Working-Day.pptx"); prs = init_deck()
divider("WEEK 3 · THURSDAY", "Final Presentations")

content("THE BRIEF", "Make something that benefits someone outside the class",
    [[("…and that society keeps benefiting from after class ends.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Today you show it, demo it live, and tell us what you learned — about the build and "
       "about the ethics.", {"size": 20, "color": MUTED})]], FOOT)

bullets("HOW TO PRESENT", "Five minutes, five beats",
    ["The value — who it serves, and why it matters.",
     "The build — a live demo of the happy path.",
     "What you tested — usability + values, and what changed.",
     "The hard call — a value tension and how you resolved it.",
     "What’s next — how it keeps helping after today."], FOOT)

columns("HOW IT’S GRADED", "What we’re looking for",
    [("Good Vibes · 20%", "The idea", "Novelty and the case for why you built it."),
     ("Good Code · 20%", "The build", "Functionality and technical execution."),
     ("Live demo · 15%", "With users", "Plan, test, and documentation with real users.")], FOOT)

columns("HOW IT’S GRADED", "…and the two that carry the most weight",
    [("Deep Ethical Reflection · 25%", "Your own words", "The values thinking — AI writing is impermissible here (grammar only)."),
     ("Communication · 20%", "The story", "Text, video, and photos documenting capability and process.")], FOOT)
notes(prs.slides[-1], "Rubric straight from the syllabus. Flag the 25% ethical-reflection AI-writing rule loudly.")

content("THAT’S A WRAP", "Good code, good vibes",
    [[("You learned to build fast with AI — and to build right: to name the values, test with "
       "real people, and own the calls you made.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Now go make something the world keeps benefiting from.", {"size": 20, "color": GREEN, "bold": True})]], FOOT)

n = save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week3-Thu-Final-Presentations.pptx")
print("Week 3 saved as 4 per-day decks (Thu:", n, "slides)")

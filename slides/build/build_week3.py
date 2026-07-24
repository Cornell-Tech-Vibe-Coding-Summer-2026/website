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
# MONDAY 7/27 - Usability Testing: Human & Agent (video deliverable)
# ===========================================================================
divider("WEEK 3 - MONDAY", "Usability Testing: Does It Work?",
        "Human + agent testing on your Project 2 prototype")

content("THE TURN", "You built it. Does it work - for someone who isn't you?",
    [[("Weeks 1-2 you built. This week you evaluate, then build the final. Two testing days on ", {"size": 21, "color": WHITE}),
      ("last week's Project 2 prototype:", {"size": 21, "color": WHITE, "bold": True})],
     [("", {})],
     [("Today - ", {"size": 21}), ("does it work?", {"color": GREEN, "bold": True, "size": 21}),
      ("  (usability).    Tomorrow - ", {"size": 21}),
      ("does it do the right thing?", {"color": GREEN, "bold": True, "size": 21}), ("  (values).", {"size": 21})]], FOOT)

content("WHY TEST", "You are not your user",
    [[("You know where every button is and what every label means - so you are the worst person alive to judge whether your own app is usable.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Watching ", {"size": 20, "color": MUTED}), ("one", {"size": 20, "color": GREEN, "bold": True}),
      (" real person try it tells you more than a week of guessing. You test the design, not the person - confusion is the design's fault, and it is your best data.", {"size": 20, "color": MUTED})]], FOOT)

big_question("WHAT IT IS", [
    "Give one real person one real task.",
    "Ask them to think aloud.",
    "Stay quiet and watch what they DO."], FOOT)

s = content("WATCH - A REAL USABILITY TEST", "See it done before you do it",
    [[("A moderated think-aloud test. User goal: ", {"size": 20, "color": WHITE}),
      ("order medications online", {"size": 20, "color": GREEN, "bold": True}),
      (" - refill Vitamin D and Tylenol, check which card is on file, set up auto-refill.", {"size": 20, "color": WHITE})],
     [("", {})],
     [("Watch for: where they hesitate, what they say they expect, and how the moderator stays neutral and lets them struggle.", {"size": 18, "color": MUTED})],
     [("", {})],
     [("|>  youtube.com/watch?v=EH7Fx9rpC0c", {"size": 22, "color": GREEN, "bold": True, "font": F_MONO})]], FOOT)
text(s, Inches(0.7), Inches(6.6), Inches(12), Inches(0.32),
     [[("Demo video + usability-study framing adapted from S. Azenkot, INFO 5305 UX & User Research (Cornell Tech)", {})]],
     size=9.5, color=DIM, font=F_MONO)
notes(s, "Play EH7Fx9rpC0c (a few minutes). Pause to point out the think-aloud, the neutral moderation, and one breakdown. Source: Shiri Azenkot, 'Running a Usability Study'.")

numbered_two_col("READING - NIELSEN", "Nielsen's 10 usability heuristics",
    [("Visibility of system status", "always show what's happening"),
     ("Match the real world", "speak the user's language"),
     ("User control & freedom", "easy undo / exits"),
     ("Consistency & standards", "follow conventions"),
     ("Error prevention", "stop mistakes before they happen"),
     ("Recognition over recall", "show options, don't make them remember"),
     ("Flexibility & efficiency", "shortcuts for experts"),
     ("Aesthetic & minimalist", "no needless clutter"),
     ("Recover from errors", "plain-language fixes"),
     ("Help & documentation", "findable when needed")], FOOT)
notes(prs.slides[-1], "Reading: Nielsen - 10 Usability Heuristics (NN/g). Use these as the lens for naming what broke.")

bullets("HOW TO RUN IT", "A usability test in 4 moves",
    ["Give a real task (\"sign up and log your first entry\") - not a tour.",
     "Watch, don't help. Let them struggle a bit - silence is data.",
     "Ask them to think aloud - narrate what they see, expect, and want.",
     "Note every hesitation, wrong turn, and dead end - name it against Nielsen's heuristics."], FOOT)

s = columns("MODERATION", "Prompt without leading", [
    ("ENCOURAGE", "\"What are you thinking?\"", "Keep them talking without steering. Let silence sit, then nudge gently."),
    ("EXPECTATION", "\"What did you expect to happen?\"", "Surfaces the gap between their mental model and your design."),
    ("NEVER", "\"Did you like it?\"", "Leading and unstructured. Watch what they DO - don't fish for approval.")], FOOT)
text(s, Inches(0.7), Inches(6.6), Inches(12), Inches(0.32),
     [[("Moderation guidelines adapted from S. Azenkot, INFO 5305 (Cornell Tech)", {})]],
     size=9.5, color=DIM, font=F_MONO)

s = content("WHAT TO LOOK FOR", "Capture evidence, not your interpretation",
    [[("Look for usability problems - and write down what happened, not what you think it means:", {"size": 20, "color": WHITE})],
     [("", {})],
     [("Breakdowns", {"size": 19, "color": GREEN, "bold": True}), (" - they get stuck, backtrack, or ask for help.", {"size": 19, "color": WHITE})],
     [("Errors", {"size": 19, "color": GREEN, "bold": True}), (" - wrong action, wrong turn, wrong mental model.", {"size": 19, "color": WHITE})],
     [("Workarounds", {"size": 19, "color": GREEN, "bold": True}), (" - they reach the goal, but not the way you designed.", {"size": 19, "color": WHITE})],
     [("", {})],
     [("Note the time, what they did, and a short quote. Refine from the recording afterwards.", {"size": 17, "color": MUTED})]], FOOT)
text(s, Inches(0.7), Inches(6.6), Inches(12), Inches(0.32),
     [[("Evidence framing adapted from S. Azenkot, INFO 5305 (Cornell Tech)", {})]],
     size=9.5, color=DIM, font=F_MONO)

section("PART B", "Now let an AI agent test it", color=GREEN,
        sub="An agent takes browser control of your live site and reports what breaks")

columns("PART B - AGENT TESTING", "An AI drives your live site", [
    ("WHAT", "Agent-based usability test", "Give an AI agent your live URL and the same task. It clicks through and reports where it gets stuck."),
    ("WHY", "Fast, tireless, literal", "Catches broken flows, dead links, unclear labels, impossible steps - in minutes, at any hour."),
    ("TOOLS", "Pick one you can run", "Antigravity | Chrome DevTools MCP | Playwright MCP | browser-use. Log your prompts in history.md.")], FOOT)

columns("HUMAN vs AGENT", "Two testers, different eyes", [
    ("HUMANS CATCH", "Confusion & feeling", "Hesitation, frustration, delight, misread labels, real-world mismatch, the value bending. Emotion you can't fake."),
    ("AGENTS CATCH", "Breakage & coverage", "Dead ends, broken buttons, missing states, every link - fast and repeatable. No fatigue, no mercy."),
    ("AGENTS MISS", "Being human", "They don't feel stuck, don't get embarrassed, don't bring context. Speed is not understanding.")], FOOT)

checklist("THE DELIVERABLE - ONE VIDEO", "Compress hours of testing into 5 minutes", [
    "Record >= 20 min of real testing (2 human tests + 1 agent test).",
    "Cut and speed up to <= 5 minutes - keep the moments that show a finding.",
    "Subtitles required (YouTube auto-captions are fine).",
    "End with findings slides + your spoken summary.",
    "Host unlisted on YouTube; link it in vibe-report.md. No coding today."], FOOT)

s = discuss("ACTIVITY - TODAY", "Test your team's Project 2 prototype - on your own.",
    ["Part A: 2 real testers (not teammates), think-aloud, ~10 min each, screen-recorded.",
     "Part B: 1 agent takes browser control of the live site; log your prompts.",
     "Edit it into one <=5-min subtitled video, then write up human vs agent in vibe-report.md."],
    "Individual - on the group's Project 2 - deliverable = one video + one write-up (due Mon 7/27)", FOOT)
notes(s, "Individual work on the shared Project 2 prototype. Everyone submits their own video + write-up.")

refs("SOURCES", "Watch, test, cite", [
    ("Nielsen - 10 Usability Heuristics (NN/g)", "nngroup.com/articles/ten-usability-heuristics/"),
    ("UEQ - User Experience Questionnaire", "ueq-online.org"),
    ("Usability test demo video", "youtube.com/watch?v=EH7Fx9rpC0c"),
    ("Agent browser control - browser-use", "github.com/browser-use/browser-use"),
    ("Chrome DevTools MCP", "github.com/ChromeDevTools/chrome-devtools-mcp"),
    ("Usability-study material adapted from S. Azenkot, INFO 5305 UX & User Research", "Cornell Tech")], FOOT)

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

columns("TODAY, VIBE-CODED", "The three moves become Plan → Run → Verify",
    [("Plan", "planning.md, before you prompt",
      "Name the value, define what it MEANS here, who it's for, how you'd know — and write the exact prompts you'll run. Verbatim. Before running them."),
     ("Run", "Prompts + a real test",
      "Execute your planned prompts unchanged, then let another team test whether the value survives contact with a user."),
     ("Verify", "Claim vs. reality",
      "Find the biggest gap between planning.md and what testers experienced. Close it with one commit.")], FOOT)
notes(prs.slides[-1], "The session's spine: VAP translated into the vibe-coding workflow. Writing value-centered prompts BEFORE running them is Discovery→Implementation made checkable; the log shows whether you stuck to the plan.")

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

s = numbered_two_col("ACTIVITY · PLAN", "planning.md — the values check + your prompts",
    [("What value does it claim?", "the value the team says the project serves"),
     ("What does it MEAN here?", "operationalize it — privacy as control? secrecy? contextual integrity?"),
     ("Who’s it for — who’s left out?", "who it serves, and who it could exclude or harm"),
     ("How would you know?", "the observable tell that the value is being delivered")], FOOT)
notes(s, "Phase 1, in planning.md BEFORE anyone prompts. Operationalization is the move students skip: the same value word means different things, and the definition has to go INTO the prompt or the AI supplies its own. Template in week3/7_28/planning-template.md.")

s = bullets("ACTIVITY · RUN", "Execute the plan, then test the value",
    ["Run your planned prompts unchanged — the auto-log will show whether you drifted.",
     "Swap projects with another team — they run YOUR 3-question check as real users.",
     "Testers: does the tool move you toward the value? Did it feel on your side? Who's excluded?",
     "Name the values tension you find; suggest a dissolve / compromise / trade-off."], FOOT)
notes(s, "Phase 2: implementation + the reality check. Peer value-test rotation (round 2, after Monday's usability round).")

s = bullets("ACTIVITY · VERIFY", "Close the claim-vs-reality gap",
    ["Compare what testers experienced against your planning.md — where's the biggest gap?",
     "Where did the AI's defaults bend your value while you weren't looking?",
     "Close the biggest gap with one commit. Link it in your report.",
     "Reading: Values at Play, Ch. 5 (Discovery)."], FOOT)
notes(s, "Phase 3: verification against the written plan — the plan makes the gap measurable, which is the whole reason planning.md exists.")

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

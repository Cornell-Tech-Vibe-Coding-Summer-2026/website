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
# ===========================================================================
# TUESDAY 7/28 - Value Verification: Does It Embed the Value It Claims?
# ===========================================================================
divider("WEEK 3 - TUESDAY", "Value Verification: Does It Do the Right Thing?",
        "Values at Play - verifying the value you claimed")

content("THE SECOND TEST", "Usable is not the same as right",
    [[("Yesterday: can people ", {"size": 22, "color": WHITE}), ("use", {"size": 22, "color": GREEN, "bold": True}),
      (" your Project 2? Today: does it deliver the ", {"size": 22, "color": WHITE}),
      ("value your team claimed", {"size": 22, "color": GREEN, "bold": True}),
      (" - for the person you claimed to serve?", {"size": 22, "color": WHITE})],
     [("", {})],
     [("A tool can be flawless to use and still fail its value - quietly nudging, excluding, or manipulating the very person it says it helps.", {"size": 19, "color": MUTED})]], FOOT)

photo_split("THE FRAMEWORK", "Discovery -> Implementation -> Verification",
    [[("Discovery", {"size": 19, "color": GREEN, "bold": True}), (" - what values, and what do they mean here?", {"size": 18, "color": WHITE})],
     [("Implementation", {"size": 19, "color": GREEN, "bold": True}), (" - translate values into features; resolve conflicts.", {"size": 18, "color": WHITE})],
     [("Verification", {"size": 19, "color": GREEN, "bold": True}), (" - did it work? That is today.", {"size": 18, "color": WHITE})],
     [("", {})],
     [("\"Assessing whether efforts to integrate values have succeeded.\" Cyclical - ask at every step.", {"size": 15, "color": MUTED})]],
    "vap_book.png", "Flanagan & Nissenbaum, Values at Play (MIT Press) - VAP course, Engelmann & Nissenbaum, Cornell Tech", FOOT)

content("STEP 1 - OPERATIONALIZE", "You can't verify a value you haven't defined",
    [[("A value is too abstract to test directly. Define it in operational terms first - say what is concretely true if it is present:", {"size": 20, "color": WHITE})],
     [("", {})],
     [("Privacy", {"size": 19, "color": GREEN, "bold": True}), (" = control?  secrecy?  contextual integrity?", {"size": 19, "color": WHITE})],
     [("Fairness", {"size": 19, "color": GREEN, "bold": True}), (" = equal access?  or equal outcome?", {"size": 19, "color": WHITE})],
     [("Autonomy", {"size": 19, "color": GREEN, "bold": True}), (" = real choices?  no manipulation?  the freedom to leave?", {"size": 19, "color": WHITE})],
     [("", {})],
     [("Pick your reading. If you don't, the AI's default definition wins.", {"size": 17, "color": MUTED})]], FOOT)

big_question("STEP 2 - VERIFY", [
    "Did it work?",
    "Three ways to ask:",
    "behavior - understanding - affect."], FOOT)

s = columns("THE THREE LENSES", "Verify a value three ways", [
    ("BEHAVIOR", "Do they ACT differently?", "Action, decision, practice, outcome. Does the design change what people actually do?"),
    ("UNDERSTANDING", "Do they GRASP it better?", "Cognition achieved, augmented, deepened. Does using it deepen understanding of the value or the harm?"),
    ("AFFECT", "Do they FEEL differently?", "Attitude, empathy, preference. Does it shift how people feel or judge?")], FOOT)
text(s, Inches(0.7), Inches(6.62), Inches(12), Inches(0.32),
     [[("Verification lenses adapted from Values at Play - VAP course, Engelmann & Nissenbaum (Cornell Tech)", {})]],
     size=9.5, color=DIM, font=F_MONO)

photo_split("LENS 1 - BEHAVIOR", "Does the design change what people DO?",
    [[("The sharpest test. A smart meter that shows live energy use only \"works\" for sustainability if people ", {"size": 18, "color": WHITE}),
      ("use less", {"size": 18, "color": GREEN, "bold": True}), (".", {"size": 18, "color": WHITE})],
     [("", {})],
     [("Verify how:", {"size": 17, "color": GREEN, "bold": True})],
     [("prototype - user study - before/after - A/B two versions - task completion", {"size": 16, "color": MUTED})]],
    "smart_meter.jpg", "Behavior verification (Values at Play) - smart-meter image, educational use", FOOT)

columns("LENSES 2 & 3 - VERIFY HOW", "Understanding & affect", [
    ("UNDERSTANDING", "Test comprehension", "Survey, interview, think-aloud, scenario question, knowledge-transfer task. Do they understand the value better after using it?"),
    ("AFFECT", "Test feeling", "Interview, attitude survey (pre/post), diary, empathy map, choice under pressure. Did attitudes actually move?"),
    ("EVIDENCE", "Not opinion", "Record what they DID or what you measured - not \"they said they liked it.\" A hopeful yes is not evidence.")], FOOT)

bullets("STEP 3 - USE A VALIDATED INSTRUMENT", "Don't invent the questions",
    ["UEQ - measures UX beyond usability: attractiveness, novelty, stimulation. For delight / trust / craft.",
     "HRI Scale Database (George Mason) - browse validated scales (trust, warmth, competence, safety), rated for quality.",
     "METUX / Self-Determination scales - autonomy, competence, relatedness. For wellbeing & empowerment values.",
     "Vibed Slop Detector (impeccable.style rules) - generic AI \"slop\" is evidence craft & originality didn't get in.",
     "Match the instrument to the value - run the RIGHT one, not all of them."], FOOT)

content("WHY MEASURE BEYOND USABILITY", "\"Usable but conventional\"",
    [[("A 2026 study (Romero et al.) compared AI-generated and human interface prototypes with the UEQ:", {"size": 20, "color": WHITE})],
     [("", {})],
     [("Pragmatic quality (usability): ", {"size": 19, "color": WHITE}), ("fine.", {"size": 19, "color": GREEN, "bold": True})],
     [("Hedonic quality (novelty, originality): ", {"size": 19, "color": WHITE}), ("neutral to negative.", {"size": 19, "color": RED, "bold": True})],
     [("", {})],
     [("AI makes things usable but generic. Usability alone would miss it - which is why you verify the value, not just the flow.", {"size": 17, "color": MUTED})]], FOOT)

columns("WHEN VERIFICATION FINDS A CONFLICT", "Two values collide - name the resolution", [
    ("DISSOLVE", "Redesign around it", "A design where the clash disappears and BOTH values hold. (Vacuum: on-device maps, nothing to the cloud.)"),
    ("COMPROMISE", "Each in part", "Promote each value in less than full measure. (Vacuum: cloud data, but anonymized + opt-out.)"),
    ("TRADE-OFF", "Sacrifice one", "One value is given up for another - say so honestly. (Vacuum: full collection for max automation.)")], FOOT)

content("TODAY'S GUEST - ACCESSIBILITY", "Accessibility is a value you can verify",
    [[("Accessibility runs cleanly through all three lenses:", {"size": 20, "color": WHITE})],
     [("", {})],
     [("Behavior", {"size": 19, "color": GREEN, "bold": True}), (" - can a screen-reader user actually complete the task?", {"size": 19, "color": WHITE})],
     [("Understanding", {"size": 19, "color": GREEN, "bold": True}), (" - are labels, states, and errors legible to everyone?", {"size": 19, "color": WHITE})],
     [("Affect", {"size": 19, "color": GREEN, "bold": True}), (" - does the design respect the user, or work around them?", {"size": 19, "color": WHITE})],
     [("", {})],
     [("Borrow today's guest lecture as a lens - even if your value is something else.", {"size": 17, "color": MUTED})]], FOOT)

s = discuss("ACTIVITY - TODAY", "Verify the value your Project 2 claims - on your own.",
    ["Operationalize the value your team claimed - what is concretely true if it is present?",
     "Pick a lens (behavior / understanding / affect) + one validated instrument, and run a small check.",
     "Verdict: does it deliver? For whom? Who is excluded? Then the ONE fix you would make."],
    "Individual - on the group's Project 2 - deliverable = your value-verification report (vibe-report.md)", FOOT)
notes(s, "Individual, on the shared Project 2 prototype. No coding required. Accessibility guest lecture today; Wed/Thu are the final project.")

refs("SOURCES", "Verify, cite", [
    ("Flanagan & Nissenbaum - Values at Play in Digital Games (MIT Press, 2014)", "mitpress.mit.edu"),
    ("VAP verification framework - S. Engelmann & H. Nissenbaum", "Cornell Tech - INFO 5010 (PiTech Ethics)"),
    ("UEQ - User Experience Questionnaire", "ueq-online.org"),
    ("HRI Scale Database - Finding the Perfect Scale", "hriscaledatabase.psychology.gmu.edu"),
    ("METUX / Self-Determination scales", "selfdeterminationtheory.org/metux-scales"),
    ("Vibed Slop Detector + impeccable.style slop rules", "github.com/HaukeCornell/Vibed-Slop-Detector"),
    ("Romero et al. 2026 - Usable but Conventional (UEQ-S)", "arxiv.org/abs/2605.15124"),
    ("Sandhaus, Rhomberg, Nissenbaum 2026 - Indecent Persuasion (CHIWORK)", "osf.io/nw2tj")], FOOT)

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

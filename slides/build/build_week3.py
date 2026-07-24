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


bullets("TOOLS FOR TODAY", "Record, drive, edit, caption",
    ["Record: QuickTime (Mac) / Xbox Game Bar (Win) / Loom / OBS - screen + mic together.",
     "Agent testing: Antigravity, Chrome DevTools MCP, Playwright MCP, or browser-use - an AI drives your live URL.",
     "Edit + speed up: CapCut, iMovie, or Clipchamp - cut to <=5 min, speed the slow parts.",
     "Captions: upload to YouTube (unlisted), turn on auto-captions.",
     "Real UX tools (optional): Maze or Lyssna for prototype tests, Lookback for moderated sessions."], FOOT)
media("SCREENSHOT SLOT", "Show a real test in action",
    "[ screenshot / clip still goes here ]",
    "e.g. a tester mid-task, or your AI agent driving the live site", FOOT)

save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week3-Mon-User-Testing-I.pptx"); prs = init_deck()
# ===========================================================================
# TUESDAY 7/28 - Value Verification: does the design actually change anything?
# ===========================================================================
divider("WEEK 3 - TUESDAY", "Value Verification: Does the Design Actually Change Anything?",
        "Monday closed a cycle. Today opens the next one.")

content("THE TURN", "Usable is not the same as right",
    [[("Yesterday ", {"size": 21, "color": WHITE}), ("closed", {"size": 21, "color": GREEN, "bold": True}),
      (" a cycle: usability testing found the nitty-gritty to fix. Today ", {"size": 21, "color": WHITE}),
      ("opens", {"size": 21, "color": GREEN, "bold": True}), (" the next one.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("Not \"can they use it?\" but ", {"size": 21, "color": WHITE}),
      ("does this design actually produce the value change we claimed?", {"size": 21, "color": GREEN, "bold": True})],
     [("", {})],
     [("The honest answer is often no - or not the way we assumed. That is exactly when you start considering other designs.", {"size": 18, "color": MUTED})]], FOOT)

photo_split("THE FRAMEWORK", "Discovery -> Implementation -> Verification",
    [[("Discovery", {"size": 19, "color": GREEN, "bold": True}), (" - what values, and what do they mean here?", {"size": 18, "color": WHITE})],
     [("Implementation", {"size": 19, "color": GREEN, "bold": True}), (" - translate values into features; resolve conflicts.", {"size": 18, "color": WHITE})],
     [("Verification", {"size": 19, "color": GREEN, "bold": True}), (" - did it work? That is today.", {"size": 18, "color": WHITE})],
     [("", {})],
     [("Cyclical - verification is not the end. It feeds the next Discovery.", {"size": 15, "color": MUTED})]],
    "vap_book.png", "Flanagan & Nissenbaum, Values at Play (MIT Press) - VAP course, Engelmann & Nissenbaum, Cornell Tech", FOOT)

content("OPERATIONALIZE FIRST", "You can't verify a value you haven't defined",
    [[("A value is too abstract to test directly. Define it in operational terms first - say what is concretely true if it is present.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("And here is the part that decides your whole study:", {"size": 19, "color": MUTED})],
     [("", {})],
     [("how you read the value determines how you verify it.", {"size": 24, "color": GREEN, "bold": True})]], FOOT)

columns("THE CORE MOVE", "Same value. Three readings. Three different studies.", [
    ("PRIVACY AS CONTROL", "Can they work the settings?", "Verify with a usability study - can users actually find and operate the privacy controls?"),
    ("PRIVACY AS SECURITY", "Do the protections hold?", "Verify with adversarial / safety testing of the privacy features themselves."),
    ("AS CONTEXTUAL INTEGRITY", "Do the flows fit the context?", "Trace the information flows - is each one appropriate to where it actually goes?")], FOOT)
notes(prs.slides[-1], "The key teaching beat. Same word, three readings, three completely different studies. Ask the room which reading their Project 2 designed for.")

big_question("STEP 1", [
    "Which reading did you",
    "actually design for?",
    "...and was it just the easiest one?"], FOOT)

s = columns("THE THREE LENSES", "A menu for choosing your method", [
    ("BEHAVIOR", "Do they ACT differently?", "Action, decision, practice, outcome. Observation, A/B, before/after, task completion."),
    ("UNDERSTANDING", "Do they GRASP it better?", "Cognition achieved, augmented, deepened. Survey, interview, think-aloud, scenario."),
    ("AFFECT", "Do they FEEL differently?", "Attitude, empathy, preference. Attitude survey, diary, interview, choice under pressure.")], FOOT)
text(s, Inches(0.7), Inches(6.62), Inches(12), Inches(0.32),
     [[("Not every lens fits every value - your reading decides which one matters. Lenses adapted from Values at Play (VAP course, Engelmann & Nissenbaum, Cornell Tech)", {})]],
     size=9.5, color=DIM, font=F_MONO)

photo_split("EXAMPLE - BEHAVIOR", "Does the design change what people DO?",
    [[("A smart meter that shows live energy use only \"works\" for sustainability if people ", {"size": 18, "color": WHITE}),
      ("use less", {"size": 18, "color": GREEN, "bold": True}), (".", {"size": 18, "color": WHITE})],
     [("", {})],
     [("Verify how:", {"size": 17, "color": GREEN, "bold": True})],
     [("prototype - user study - before/after - A/B two versions - task completion", {"size": 16, "color": MUTED})]],
    "smart_meter.jpg", "Behavior verification (Values at Play) - smart-meter image, educational use", FOOT)

s = bullets("STEP 2 - RESEARCH IT", "Find out what has already been tried",
    ["Someone has tried to move this value before. Find out how it went - BEFORE you invent a metric.",
     "Google Scholar (and its AI search): how have others defined and MEASURED this value?",
     "What interventions actually produced positive value change - and which ones FAILED?",
     "Figma's design-research library: how to actually run the method you picked.",
     "Bring back 2-3 real sources -> one instrument or task you can borrow, one failure mode to avoid."], FOOT)
notes(s, "This is the step that stops students inventing a metric that measures nothing. Never invent a citation - real sources only.")

bullets("STEP 3 - USE A VALIDATED INSTRUMENT", "Don't invent the questions",
    ["UEQ - UX beyond usability: attractiveness, novelty, stimulation. For delight / trust / craft.",
     "HRI Scale Database (George Mason) - validated scales (trust, warmth, competence), rated for quality.",
     "METUX / Self-Determination scales - autonomy, competence, relatedness. For wellbeing values.",
     "Vibed Slop Detector (impeccable.style rules) - generic AI \"slop\" is evidence craft didn't get in.",
     "Match the instrument to your reading - run the RIGHT one, well."], FOOT)

content("WHY MEASURE BEYOND USABILITY", "\"Usable but conventional\"",
    [[("A 2026 study (Romero et al.) compared AI-generated and human interface prototypes with the UEQ:", {"size": 20, "color": WHITE})],
     [("", {})],
     [("Pragmatic quality (usability): ", {"size": 19, "color": WHITE}), ("fine.", {"size": 19, "color": GREEN, "bold": True})],
     [("Hedonic quality (novelty, originality): ", {"size": 19, "color": WHITE}), ("neutral to negative.", {"size": 19, "color": RED, "bold": True})],
     [("", {})],
     [("AI makes things usable but generic. Usability alone would miss it - which is why you verify the value, not just the flow.", {"size": 17, "color": MUTED})]], FOOT)

columns("WHEN VALUES COLLIDE", "Name the resolution honestly", [
    ("DISSOLVE", "Redesign around it", "A design where the clash disappears and BOTH values hold. (Vacuum: on-device maps, nothing to the cloud.)"),
    ("COMPROMISE", "Each in part", "Promote each value in less than full measure. (Vacuum: cloud data, but anonymized + opt-out.)"),
    ("TRADE-OFF", "Sacrifice one", "One value is given up for another - say so out loud. (Vacuum: full collection for max automation.)")], FOOT)

content("STEP 4 - OPEN THE NEXT CYCLE", "Verification is a beginning, not a verdict",
    [[("If the design does not produce the value change, that is not a failure - it is your next design brief.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("Monday", {"size": 19, "color": GREEN, "bold": True}), (" closed the Project 2 cycle - the nitty-gritty to fix.", {"size": 19, "color": WHITE})],
     [("Today", {"size": 19, "color": GREEN, "bold": True}), (" opens the next - what OTHER design could achieve this value?", {"size": 19, "color": WHITE})],
     [("Wed + Thu", {"size": 19, "color": GREEN, "bold": True}), (" are that iteration - same value, better design.", {"size": 19, "color": WHITE})],
     [("", {})],
     [("You keep your value all the way to the end of the summer school. Change the design, not the commitment.", {"size": 17, "color": MUTED})]], FOOT)

content("TODAY'S GUEST - ACCESSIBILITY", "Accessibility is a value you can verify",
    [[("Accessibility runs cleanly through all three lenses - and shows how a value becomes concrete, testable requirements:", {"size": 19, "color": WHITE})],
     [("", {})],
     [("Behavior", {"size": 19, "color": GREEN, "bold": True}), (" - can a screen-reader user actually complete the task?", {"size": 19, "color": WHITE})],
     [("Understanding", {"size": 19, "color": GREEN, "bold": True}), (" - are labels, states, and errors legible to everyone?", {"size": 19, "color": WHITE})],
     [("Affect", {"size": 19, "color": GREEN, "bold": True}), (" - does the design respect the user, or work around them?", {"size": 19, "color": WHITE})],
     [("", {})],
     [("Borrow today's guest lecture as a lens - even if your value is something else.", {"size": 17, "color": MUTED})]], FOOT)

s = discuss("ACTIVITY - TODAY (TEAM)", "Verify the value your Project 2 claims - together.",
    ["Which reading did you actually design for? List 3+ readings, pick the one you built.",
     "Research it: what has been tried, what worked, what FAILED. Bring 2-3 real sources.",
     "Run the check your reading demands - capture what you observed, not what you hoped.",
     "Then: what OTHER design could achieve the value, and what should the next cycle discover?"],
    "Team board + everyone writes their own reflection - you carry this value into the final project", FOOT)
notes(s, "Team activity on the shared Project 2. One FigJam board per team; each student writes their own vibe-report reflection. Output feeds Wednesday's final-project planning.")

refs("SOURCES", "Verify, cite", [
    ("Flanagan & Nissenbaum - Values at Play in Digital Games (MIT Press, 2014)", "mitpress.mit.edu"),
    ("VAP verification framework - S. Engelmann & H. Nissenbaum", "Cornell Tech - INFO 5010 (PiTech Ethics)"),
    ("Google Scholar (+ AI search) - find what has been tried", "scholar.google.com"),
    ("Figma - design research methods library", "figma.com/resource-library/design-research/"),
    ("UEQ - User Experience Questionnaire", "ueq-online.org"),
    ("HRI Scale Database - Finding the Perfect Scale", "hriscaledatabase.psychology.gmu.edu"),
    ("METUX / Self-Determination scales", "selfdeterminationtheory.org/metux-scales"),
    ("Vibed Slop Detector + impeccable.style slop rules", "github.com/HaukeCornell/Vibed-Slop-Detector"),
    ("Romero et al. 2026 - Usable but Conventional (UEQ-S)", "arxiv.org/abs/2605.15124")], FOOT)


bullets("RESEARCH TOOLS", "Find what's been tried, then measure it",
    ["Google Scholar + its AI overview - how others defined and MEASURED your value.",
     "Figma's design-research library - how to actually run a concept test, interview, or survey.",
     "Instruments: UEQ (ueq-online.org), the HRI Scale Database, METUX / SDT scales.",
     "Vibed Slop Detector - run it on your live page for a craft / originality read.",
     "Keep real citations straight (Zotero or a shared doc) - never invent one."], FOOT)
media("SCREENSHOT SLOT", "Show your evidence",
    "[ screenshot goes here ]",
    "a UEQ result, a scale, a paper finding, or a slop-detector report", FOOT)

save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week3-Tue-User-Testing-II.pptx"); prs = init_deck()
# ===========================================================================
# WEDNESDAY 7/29 - Planning Day (Final Project, Day 2): What's the problem?
# ===========================================================================
divider("WEEK 3 - WEDNESDAY", "Planning Day: What's the problem?",
        "Final project - value-centered need finding + storyboard")

content("THE TURN", "Tuesday told you IF it works. Today you decide what to build.",
    [[("You verified your Project 2 and found where the design doesn't move the value. Today you plan the fix - for a real person ", {"size": 21, "color": WHITE}),
      ("outside this class.", {"size": 21, "color": GREEN, "bold": True})],
     [("", {})],
     [("Open with the Figma guest talk, then find the real need.", {"size": 19, "color": MUTED})]], FOOT)

content("KEEP YOUR VALUE", "Change the design, not the commitment",
    [[("You already have a value and Tuesday's verdict. The final is the NEXT iteration of that value - not a new theme.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("Today's job: name a specific beneficiary, and find what they actually need.", {"size": 19, "color": MUTED})]], FOOT)

columns("FIND THE NEED", "Talk to someone - don't guess", [
    ("INTERVIEW", "Ask, don't pitch", "A short conversation with a real person outside the class. Ask about their problem, not your idea."),
    ("PERSONA", "One specific human", "Name, situation, goal, frustration, context. Not 'students' - one person you design for."),
    ("THE NEED", "In their words", "Write the need the way they would say it. That sentence is what your design has to serve.")], FOOT)

content("OPERATIONALIZE - THE VALUE TREE", "From value down to the prompts you'll build",
    [[("Break your value down until it becomes something you can actually build:", {"size": 20, "color": WHITE})],
     [("", {})],
     [("value  ->  norms  ->  requirements  ->  features  ->  ", {"size": 22, "color": WHITE}),
      ("the prompts you run tomorrow", {"size": 22, "color": GREEN, "bold": True})],
     [("", {})],
     [("The bottom of the tree IS your Thursday build plan - the exact prompts, grounded in the value.", {"size": 17, "color": MUTED})]], FOOT)

bullets("STORYBOARD IT", "4-8 frames: the value in use",
    ["Frame the user, their problem, where your thing enters, and what changes.",
     "Hand-drawn (photograph it) or AI-assisted - rough is fine.",
     "It doubles as your Thursday pitch skeleton.",
     "Show the value living in the design, not just in the copy."], FOOT)

bullets("TOOLS FOR TODAY", "Storyboard + pitch",
    ["Storyboard: FigJam / Figma, Canva, Google Slides (one frame per slide), or Storyboarder (free & open-source).",
     "AI pitch video (for Thursday): Google Veo 3.1 (in Flow), Runway, Kling, or Pika.",
     "Note: OpenAI retired the Sora app in April 2026 - use Veo / Runway / Kling / Pika instead.",
     "Free tiers add watermarks + limits - fine for a class pitch.",
     "Interview + persona: just talk to a person; capture notes in FigJam or a doc."], FOOT)
notes(prs.slides[-1], "Sora web/app discontinued 2026-04-26. Recommend Veo 3.1 / Runway / Kling / Pika for pitch videos.")

media("SCREENSHOT SLOT", "Show an example",
    "[ example storyboard or persona goes here ]",
    "a strong persona, a storyboard, or an AI-pitch still", FOOT)

discuss("ACTIVITY - TODAY (TEAM)", "Plan the next iteration of your value.",
    ["Interview a real person outside the class -> build a persona + the need in their words.",
     "Operationalize: value -> norms -> requirements -> features -> the prompts you'll build.",
     "Storyboard the solution (4-8 frames) and scope the smallest real thing for Thursday."],
    "Deliverable = planning-report.md + your storyboard - this is Checkpoint 2 of the final", FOOT)

content("CARRY IT TO THURSDAY", "Your plan is your build",
    [[("Tomorrow you build straight from the prompts your value tree produced, test it, and present it in the evening.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("Guest lecture today: Figma. Bring your questions about design + prototyping.", {"size": 17, "color": MUTED})]], FOOT)

save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week3-Wed-Working-Day.pptx"); prs = init_deck()
# ===========================================================================
# THURSDAY 7/30 - Demo Night (Final Project, Day 3+4): What's the solution?
# ===========================================================================
divider("WEEK 3 - THURSDAY", "Demo Night: What's the solution?",
        "Build by day - present in the evening")

content("THE DAY", "Build in daylight. Show it tonight.",
    [[("First half: build the smallest real thing from your storyboard. Evening: present it live on the monitors.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("Everything you planned Wednesday becomes an artifact people can use.", {"size": 19, "color": MUTED})]], FOOT)

bullets("BUILD", "The smallest real thing - done well",
    ["Build from the prompts your value tree produced Wednesday.",
     "One complete action a stranger can finish - no broken buttons, no fake features.",
     "The value lives in the design, not just the copy.",
     "Test with a couple of real people; change ONE thing on the evidence, and commit it."], FOOT)

bullets("THE PITCH VIDEO", "Short - and it showcases the artifact",
    ["Make a short pitch that shows your vibe-coded thing in action.",
     "AI video: Google Veo 3.1 (Flow), Runway, Kling, or Pika. (OpenAI retired the Sora app in 2026.)",
     "Or an animated walkthrough, or a plain screen recording - the artifact is the star.",
     "Put it in presentation/ and link it in your report."], FOOT)

media("SCREENSHOT SLOT", "Show a build / pitch still",
    "[ demo screenshot or pitch still goes here ]",
    "the app in use, or a frame from the pitch video", FOOT)

bullets("HOW TO PRESENT", "Five beats on the monitor",
    ["The artifact - a live demo of the happy path.",
     "The value - what it operationalizes, and for whom outside the class.",
     "The evidence - what you tested (Mon usability, Tue value) and what changed.",
     "The pitch - your video.",
     "The afterlife - who keeps using or maintaining it."], FOOT)

columns("HOW IT'S GRADED", "Four checkpoints, one grade", [
    ("TUE - VERIFY", "Checkpoint 1", "Value verification: research deck + canvas."),
    ("WED - PLAN", "Checkpoint 2", "Value-centered planning: planning report + storyboard."),
    ("THU - BUILD", "Checkpoint 3", "Hosted app + project report + pitch.")], FOOT)

columns("HOW IT'S GRADED", "...and the evening", [
    ("THU EVE - PRESENT", "Checkpoint 4", "The live demo on the monitors."),
    ("PROJECT", "25%", "Summary of the four Canvas checkpoints, against the project rubric."),
    ("PRESENTATION", "15%", "A separate grade for the demo. Peer-check adjusts for unfair contribution.")], FOOT)
notes(prs.slides[-1], "Grade = summary of the 4 Canvas checkpoints (25% project) + a separate 15% presentation grade. Ethical + individual reflections must be human-written.")

content("LOGISTICS", "Demo night",
    [[("Present on the monitors - prototype + slides. Demo from the HOSTED link, not localhost.", {"size": 21, "color": WHITE})],
     [("", {})],
     [("Keep a screen-recording backup in presentation/ in case the Wi-Fi drops.", {"size": 18, "color": MUTED})]], FOOT)

content("THAT'S A WRAP", "Good code, good vibes",
    [[("You learned to build fast with AI - and to build right: name the value, test with real people, and own the calls you made.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Now go make something the world keeps benefiting from.", {"size": 20, "color": GREEN, "bold": True})]], FOOT)

n = save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week3-Thu-Final-Presentations.pptx")
print("Week 3 saved as 4 per-day decks (Thu:", n, "slides)")

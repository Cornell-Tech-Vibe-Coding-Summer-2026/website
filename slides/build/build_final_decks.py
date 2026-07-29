#!/usr/bin/env python3
"""Per-team FINAL PRESENTATION decks (Week 3, Thu 7/30 · 3-5 showcase).

One deck per team: a cover + 8 header slides that consolidate the whole week
(value + why, persona, the journey, storyboard, the app, evidence, pitch, afterlife).
Fixed-comfortable layout (big header + one-liner + prompt card OR screenshot slot) -
nothing runs off the slide. Same 'Good Code, Good Vibes' theme.

Upload each .pptx to Google Slides (File > Import slides) and share with the team.
"""
from deck_common import *
from pptx.util import Inches, Pt, Emu
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
import os

OUT = "/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/final-team-decks"
FOOT = "Final Project · Showcase · TECHIE 1121 · Cornell Tech · Thu Jul 30 (3-5)"
SLIDE_W, SLIDE_H = Inches(13.333), Inches(7.5)
LEFT = Inches(0.9)
CONTENT_W = Inches(11.53)

TEAMS = [
    dict(slug="security", value="security",
         roster=["Isa Offengenden", "Om Ravula", "Jason Chen"],
         app="Project 2: a safety app for minors on social media - flags suspicious accounts"),
    dict(slug="safety-autonomy", value="safety & autonomy",
         roster=["John Maida", "Ajin Yohannan", "Benjamin Rose"],
         app="Project 2: Vault Notes - a locking journal for high-school students"),
    dict(slug="sustainability-trust", value="sustainability & trust",
         roster=["Emily Tai", "Kylie Cheung", "Aria Sharma"],
         app="Project 2: Borrow Board - borrow instead of buy, for college students"),
    dict(slug="sustainability-transparency", value="sustainability & transparency",
         roster=["Evan Birnbaum", "Derin Sezgin", "Magnes Dugan", "Oliver Chung"],
         app="Project 2: Fixr Findr - fix-or-replace: repair cost + CO2 saved"),
    dict(slug="care-wellbeing", value="care & wellbeing",
         roster=["Elaine Huang", "Winnie Monroe", "Vienna Carew"],
         app="Project 2: MyPace - health + family connection for elderly adults living independently"),
    dict(slug="productivity", value="productivity",
         roster=["Liam Allen", "Justin Ou", "Sebastien Gournay"],
         app="Project 2: Justina - focus for writers & students"),
]


def cover(team):
    s = slide(); rect(s, 0, 0, Inches(0.28), SLIDE_H, fill=GREEN)
    text(s, LEFT, Inches(1.5), Inches(11.5), Inches(0.5),
         [[("FINAL PROJECT   ·   SHOWCASE", {"size": 15, "color": GREEN, "bold": True, "font": F_MONO})]])
    text(s, Inches(0.88), Inches(2.1), Inches(11.6), Inches(1.1),
         [[("The " + team["value"].strip().title() + " Team", {"size": 40, "bold": True, "color": WHITE})]])
    text(s, Inches(0.9), Inches(3.25), Inches(11.5), Inches(0.9),
         [[("[ Your project name ]", {"size": 30, "bold": True, "color": GREEN})]])
    text(s, Inches(0.92), Inches(4.35), Inches(11.4), Inches(0.5),
         [[(" · ".join(team["roster"]), {"size": 18, "color": MUTED})]])
    text(s, Inches(0.92), Inches(4.9), Inches(11.6), Inches(0.5),
         [[(team["app"], {"size": 14, "color": DIM, "font": F_MONO})]])
    footer(s, FOOT)
    notes(s, "Open strong: name your value + who it's for in one breath. Replace [ Your project name ].")
    return s


def _head(s, kick, title, purpose):
    rect(s, 0, 0, Inches(0.28), SLIDE_H, fill=GREEN)
    text(s, LEFT, Inches(0.62), CONTENT_W, Inches(0.4),
         [[(kick, {"size": 13, "color": GREEN, "bold": True, "font": F_MONO})]])
    text(s, LEFT, Inches(1.28), CONTENT_W, Inches(1.0),
         [[(title, {"size": 32, "bold": True, "color": WHITE})]])
    if purpose:
        text(s, LEFT, Inches(2.36), CONTENT_W, Inches(0.6),
             [[(purpose, {"size": 17, "color": MUTED})]], spacing=1.1)


def section_card(kick, title, purpose, prompts, note=None):
    s = slide(); _head(s, kick, title, purpose)
    py, ph = Inches(3.28), Inches(3.15)
    rect(s, LEFT, py, CONTENT_W, ph, fill=PANEL, rounded=True)
    text(s, Inches(1.25), Emu(int(py + Inches(0.3))), Inches(10.9), Inches(0.4),
         [[("PUT ON THIS SLIDE   ·   replace the [ … ]", {"size": 12, "color": GREEN, "bold": True, "font": F_MONO})]])
    paras = [[("→  ", {"color": GREEN, "bold": True, "size": 18}), (p, {"size": 18, "color": WHITE})] for p in prompts]
    text(s, Inches(1.25), Emu(int(py + Inches(0.92))), Inches(10.85), Emu(int(ph - Inches(1.15))), paras, spacing=1.42)
    footer(s, FOOT)
    if note: notes(s, note)
    return s


def shot_slide(kick, title, purpose, lines, slot_label, note=None):
    s = slide(); _head(s, kick, title, purpose)
    y = Inches(3.05)
    if lines:
        paras = [[("→  ", {"color": GREEN, "bold": True, "size": 17}), (l, {"size": 17, "color": WHITE})] for l in lines]
        text(s, LEFT, y, CONTENT_W, Inches(1.05), paras, spacing=1.3)
        y = Inches(4.2)
    bh = Emu(int(Inches(6.5) - y))
    rect(s, LEFT, y, CONTENT_W, bh, fill=PANEL, line=GREEN, line_w=1.5, rounded=True, dash=True)
    text(s, LEFT, Emu(int(y + bh / 2 - Inches(0.22))), CONTENT_W, Inches(0.5),
         [[(slot_label, {"size": 16, "color": GREEN, "bold": True, "font": F_MONO})]], align=PP_ALIGN.CENTER)
    footer(s, FOOT)
    if note: notes(s, note)
    return s


def two_shot(kick, title, purpose, label_a, label_b, note=None):
    s = slide(); _head(s, kick, title, purpose)
    y, h, gap = Inches(3.28), Inches(3.15), Inches(0.4)
    w = Emu(int((CONTENT_W - gap) / 2))
    for i, lab in enumerate([label_a, label_b]):
        x = Emu(int(LEFT + i * (w + gap)))
        rect(s, x, y, w, h, fill=PANEL, line=GREEN, line_w=1.5, rounded=True, dash=True)
        text(s, x, Emu(int(y + h / 2 - Inches(0.22))), w, Inches(0.5),
             [[(lab, {"size": 15, "color": GREEN, "bold": True, "font": F_MONO})]], align=PP_ALIGN.CENTER)
    footer(s, FOOT)
    if note: notes(s, note)
    return s


def build(team):
    init_deck()
    cover(team)

    section_card("01 · OUR VALUE — AND WHY", "The value we built for, and why it matters",
        "The value we carried — and why it matters for someone outside this class.",
        ["Our value: [ ___ ]   ·   mode: support / defend / repair",
         "Why it matters: [ the harm we prevent, or the good we enable ]",
         "Who benefits, specifically: [ not 'students' — name them ]"],
        note="Justify the value: why THIS value, for THIS person. This is the spine of the whole talk.")

    shot_slide("02 · WHO IT'S FOR", "The person we designed for",
        "The persona we built and interviewed — and what they actually need.",
        ["Persona: [ name · situation · goal · frustration ]",
         "The need, in their words: [ quote from the interview ]"],
        "[ persona screenshot ]",
        note="One specific human, not 'everyone'. Drop the persona card (and, if you like, a line from the chatbot interview).")

    section_card("03 · THE JOURNEY", "From Project 2 to this design",
        "What Tuesday's verification showed, what we considered, and what we chose.",
        ["Project 2 → what the verification showed: [ ___ ]",
         "Design alternatives we considered: [ ___ ]",
         "The design we chose — and why: [ ___ ]"],
        note="Show the arc, not a test report: research findings → alternatives → the design that best moves the value.")

    two_shot("04 · STORYBOARD", "How the idea took shape",
        "Rough sketches to find the idea → one refined storyboard to tell it.",
        "[ ROUGH — one per member ]", "[ REFINED — team storyboard ]",
        note="Rough storyboards (diverge, one per person) + the refined team storyboard (converge). Show the value living in the frames.")

    shot_slide("05 · THE SOLUTION — OUR APP", "The smallest real thing — done well",
        "What it does, the one complete action, and where the value lives in the design.",
        ["What it does + the one complete action: [ ___ ]",
         "Where the value lives in the design (not just the copy): [ ___ ]"],
        "[ app screenshots — the happy path ]",
        note="Live demo the happy path. The value should live in the DESIGN, not just the wording.")

    section_card("06 · DOES IT DELIVER THE VALUE?", "Our evidence",
        "From Monday's usability test and Tuesday's value verification.",
        ["Behavior — do they ACT differently? [ ___ ]",
         "Understanding / Affect — do they GRASP / FEEL it? [ ___ ]",
         "What the research + our testing showed: [ ___ ]"],
        note="Evidence, not hope. Report what does NOT work as carefully as what does.")

    shot_slide("07 · THE PITCH", "The video that shows the idea",
        "Play the pitch — any style that feels authentic to your team.",
        [],
        "[ pitch video — embed it here ]",
        note="Embed the pitch video (screen recording, acted, animated, or AI). Keep a backup file in presentation/.")

    section_card("08 · AFTERLIFE & TEAM", "Who keeps it alive — and who built it",
        "The life after class, the credits, and one thing we learned.",
        ["Afterlife: who keeps using / maintaining it, and how: [ ___ ]",
         "Who did what: [ each member's contribution ]",
         "One thing this project taught us: [ ___ ]"],
        note="Credible afterlife answer + individual credit + a genuine one-line takeaway.")

    path = os.path.join(OUT, f"Final-Showcase-{team['slug']}.pptx")
    n = save(path)
    return team["value"], n


built = [build(t) for t in TEAMS]
print(f"Built {len(built)} final showcase decks in {OUT}")
for value, n in built:
    print(f"  {n:2d} slides · The {value.title()} Team")

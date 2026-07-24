#!/usr/bin/env python3
"""Per-team 'Value Verification' research decks (Week 3, Tue 7/28).

One deck per Project 2 team: a cover, a how-to-use slide, and the five section
headers of the research deck. Teams paste their own slides behind each header.
Same 'Good Code, Good Vibes' theme as the lecture decks, tuned for a team talk.

Upload each .pptx to Google Slides (File > Import slides) and share with the team.
"""
from deck_common import *
from pptx.util import Inches, Pt, Emu
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
import os

OUT = "/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/team-decks"
FOOT = "Value Verification · TECHIE 1121 · Cornell Tech · Tue Jul 28"
FILL = "[ fill in ]"

# `SW`/`SH` from deck_common are None until init_deck() runs, and `import *` binds
# them by value — so use local constants for the fixed 16:9 slide size instead.
SLIDE_W, SLIDE_H = Inches(13.333), Inches(7.5)

# Rosters from the GitHub Classroom teams; values from each team's project-report.md
# (most teams hadn't declared one yet — those show a fill-in placeholder).
TEAMS = [
    dict(slug="super-duper-amazing-team", name="Super Duper Amazing Team",
         members="Isa Offengenden · Om Ravula · Jason Chen", value="security"),
    dict(slug="jamins-2nd-team", name="Jamin's 2nd Team",
         members="John Maida · Ajin Yohannan", value="safety"),
    dict(slug="chezborgar", name="Chezborgar",
         members="Emily Tai · Kylie Cheung · Aria Sharma", value=None),
    dict(slug="guantanamo-bay-wendys", name="Guantanamo Bay Wendy's",
         members="Evan Birnbaum · Derin Sezgin · Magnes Dugan · [ +1 — add your name ]", value=None),
    dict(slug="were-always-two-steps-ahead", name="We're Always Two Steps Ahead",
         members="Elaine Huang · Winnie Monroe · Vienna Carew", value=None),
    dict(slug="the-professors-favorites", name="The Professor's Favorites",
         members="Sebastien Gournay · Justin Ou", value=None),
    dict(slug="liam-justin-sebastien", name="Liam Justin Sebastien",
         members="Liam Allen · [ add your teammates ]", value=None),
]

SECTIONS = [
    ("01", "THE VALUE & THE READING", "What we claimed — and which reading we built for", [
        "Our app, in one line — and the value it claims.",
        "Which reading of the value did we actually design for? (e.g. privacy as control vs. security vs. contextual integrity)",
        "Operationalized: if it's present, users will DO ___ / UNDERSTAND ___ / FEEL ___.",
    ]),
    ("02", "PART 1 — WAYS TO VERIFY", "How can this value be verified at all?", [
        "How have others measured this value? (Google Scholar + its AI search)",
        "Which method did we choose — and why does our reading demand it?",
        "The instrument we borrowed: UEQ · an HRI/SDT scale · the slop detector · a task design.",
    ]),
    ("03", "PART 2 — WHAT WE FOUND", "Insights from our own verification", [
        "What WORKS in the current prototype — with evidence.",
        "What does NOT work — with evidence. An evidenced 'it doesn't' beats a hopeful 'it does'.",
        "Across the lenses: behavior · understanding · affect — and which lenses did NOT fit this value.",
    ]),
    ("04", "PART 3 — OUTLOOK", "What related research has already found", [
        "What have others tried in order to move this value?",
        "What worked — and what failed?",
        "2–3 REAL sources. Never invent a citation.",
    ]),
    ("05", "SO WHAT", "Our next design brief", [
        "Verification is a beginning, not a verdict.",
        "What OTHER design could actually achieve this value?",
        "What should the next cycle discover? (You carry this into Wednesday.)",
    ]),
]


def team_cover(team):
    s = slide()
    rect(s, 0, 0, Inches(0.28), SLIDE_H, fill=GREEN)
    text(s, Inches(0.9), Inches(1.75), Inches(11.5), Inches(0.5),
         [[("VALUE VERIFICATION · TEAM RESEARCH DECK", {"size": 15, "color": GREEN, "bold": True, "font": F_MONO})]])
    text(s, Inches(0.88), Inches(2.35), Inches(11.6), Inches(1.9),
         [[(team["name"], {"size": 46, "bold": True, "color": WHITE})]], spacing=1.02)
    text(s, Inches(0.92), Inches(4.15), Inches(11.4), Inches(0.5),
         [[(team["members"], {"size": 18, "color": MUTED})]])
    val = team["value"] or FILL
    vcol = GREEN if team["value"] else MUTED
    text(s, Inches(0.92), Inches(4.95), Inches(11.4), Inches(0.6),
         [[("The value we're carrying:  ", {"size": 18, "color": WHITE}),
           (val, {"size": 18, "color": vcol, "bold": True})]])
    footer(s, FOOT)
    notes(s, "Title slide. Confirm the value and the member list before presenting.")
    return s


def howto():
    s = slide()
    kicker(s, "HOW TO USE THIS DECK"); accent(s)
    text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.0),
         [[("Keep the headers. Put your slides behind them.", {"size": 32, "bold": True, "color": WHITE})]])
    items = [
        "Five section headers follow — they are the spine of your talk.",
        "Add your own slides AFTER each header. Don't delete the headers.",
        "Evidence beats assertion: screenshots, numbers, quotes from what you actually observed.",
        "Real citations only — if you can't find the paper, leave the claim out.",
        "Delete this slide before you present.",
    ]
    paras = [[("•  ", {"color": GREEN, "bold": True}), (i, {})] for i in items]
    text(s, Inches(0.72), Inches(2.6), Inches(11.9), Inches(3.8), paras, size=19, color=WHITE, spacing=1.3)
    footer(s, FOOT)
    return s


def team_section(num, kick, title, prompts):
    s = slide()
    rect(s, 0, 0, Inches(0.28), SLIDE_H, fill=GREEN)
    text(s, Inches(0.9), Inches(1.55), Inches(3), Inches(1.2),
         [[(num, {"size": 64, "bold": True, "color": GREEN, "font": F_MONO})]])
    text(s, Inches(0.92), Inches(2.72), Inches(11.4), Inches(0.5),
         [[(kick, {"size": 15, "color": GREEN, "bold": True, "font": F_MONO})]])
    text(s, Inches(0.88), Inches(3.25), Inches(11.6), Inches(1.2),
         [[(title, {"size": 38, "bold": True, "color": WHITE})]], spacing=1.03)
    paras = [[("→  ", {"color": GREEN, "bold": True}), (p, {})] for p in prompts]
    text(s, Inches(0.92), Inches(4.62), Inches(11.4), Inches(1.9), paras, size=17, color=MUTED, spacing=1.28)
    footer(s, FOOT)
    notes(s, "Section header — the team's own slides go after this one.")
    return s


def sources_slide():
    s = slide()
    kicker(s, "SOURCES"); accent(s)
    text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.0),
         [[("What we read", {"size": 32, "bold": True, "color": WHITE})]])
    paras = [[("•  ", {"color": GREEN, "bold": True}),
              ("Author, Year. Title. Where it appeared.  —  what it found", {"color": MUTED})] for _ in range(4)]
    text(s, Inches(0.72), Inches(2.6), Inches(11.9), Inches(3.4), paras, size=17, color=WHITE, spacing=1.45)
    text(s, Inches(0.72), Inches(6.25), Inches(11.9), Inches(0.4),
         [[("Real papers only — never invent a citation.", {})]], size=13, color=DIM, font=F_MONO)
    footer(s, FOOT)
    return s


built = []
for team in TEAMS:
    init_deck()
    team_cover(team)
    howto()
    for num, kick, title, prompts in SECTIONS:
        team_section(num, kick, title, prompts)
    sources_slide()
    path = os.path.join(OUT, f"Week3-Tue-{team['slug']}.pptx")
    n = save(path)
    built.append((team["name"], n))

print(f"Built {len(built)} team decks in {OUT}")
for name, n in built:
    print(f"  {n:2d} slides · {name}")

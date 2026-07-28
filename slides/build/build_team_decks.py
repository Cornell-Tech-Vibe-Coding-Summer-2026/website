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
         roster=["Isa Offengenden", "Om Ravula", "Jason Chen"], value="security",
         app="a safety app for minors on social media - flags suspicious accounts"),
    dict(slug="jamins-2nd-team", name="Jamin's 2nd Team",
         roster=["John Maida", "Ajin Yohannan"], value="safety",
         app="Vault Notes - a locking journal for high-school students"),
    dict(slug="chezborgar", name="Chezborgar",
         roster=["Emily Tai", "Kylie Cheung", "Aria Sharma"], value="sustainability & trust",
         app="Borrow Board - borrow instead of buy, for college students"),
    dict(slug="guantanamo-bay-wendys", name="Guantanamo Bay Wendy's",
         roster=["Evan Birnbaum", "Derin Sezgin", "Magnes Dugan", "[ +1 - add your name ]"], value="sustainability & transparency",
         app="Fixr Findr - fix-or-replace: repair cost + CO2 saved"),
    dict(slug="were-always-two-steps-ahead", name="We're Always Two Steps Ahead",
         roster=["Elaine Huang", "Winnie Monroe", "Vienna Carew"], value="care",
         app="MyPace - health + family connection for elderly adults living independently"),
    dict(slug="justina", name="Justina (Liam · Justin · Sebastien)",
         roster=["Liam Allen", "Justin Ou", "Sebastien Gournay"], value="productivity",
         app="Justina - focus for writers & students"),
]

# The five headers mirror the FigJam "Vibing Values" canvas blocks 1:1 (the canvas is
# the ground truth - it is where the team works it out; this deck is where they present it).
SECTIONS = [
    ("01", "THE VALUE & HOW WE DEFINE IT", "Operationalize the value  ·  FigJam: Value Definition", [
        "[ our app, in one line ]  -  and the value it claims.",
        "How do we operationalize / define the value?  (privacy as control vs. security vs. contextual integrity)",
        "If it is present, users will DO [ ___ ] / UNDERSTAND [ ___ ] / FEEL [ ___ ].",
    ]),
    ("02", "HOW WOULD WE VERIFY IT?", "A method per lens + how others measure it  ·  FigJam: Brainstorm 1-2-3 + 02", [
        "BEHAVIOR - do users ACT differently?  ->  [ method + metric ].",
        "UNDERSTANDING - do they GRASP the value?  ->  [ method + metric ].",
        "AFFECT - do they FEEL differently?  ->  [ method + metric ].",
        "How do OTHERS measure it, and which INSTRUMENT would we borrow?  (UEQ / HRI / METUX / slop)",
    ]),
    ("03", "WHAT WE FOUND", "Run the check - speculate with a partner if needed  ·  FigJam: 03", [
        "Apply your metrics with a partner - it is fine to SPECULATE today; real verification takes time.",
        "BEHAVIOR: do they ACT differently?   UNDERSTANDING: do they GRASP it?   AFFECT: do they FEEL differently?",
        "Green = it works.  Red = it does not.  Does the design move the value - for whom, and who is left out?",
    ]),
    ("04", "WHAT RELATED RESEARCH FOUND", "Each member READS one real paper  ·  FigJam: 04 Outlook  ·  the named slides follow", [
        "Each member presents their OWN paper - found via AI academic search (Claude / ChatGPT / Elicit / Semantic Scholar / Scholar Labs), then READ.",
        "Source (author, year)  -  what WORKED  -  what FAILED (avoid this).",
        "Real papers only, actually read - never invent a citation, never rely on an AI summary alone.",
    ]),
    ("05", "SO WHAT - OUR NEXT DESIGN DIRECTION", "Verification opens the next design  ·  FigJam: 05  ·  carry into Wednesday", [
        "If the design does NOT move the value, what WOULD?  Another design that could achieve it.",
        "What should the next cycle discover?",
        "2-3 directions the evidence points to - you carry these into Wednesday.",
    ]),
]


def team_cover(team):
    # For the final week, a team's NAME is the value it committed to.
    s = slide()
    rect(s, 0, 0, Inches(0.28), SLIDE_H, fill=GREEN)
    text(s, Inches(0.9), Inches(1.7), Inches(11.5), Inches(0.5),
         [[("VALUE-CENTERED USER RESEARCH DECK", {"size": 15, "color": GREEN, "bold": True, "font": F_MONO})]])
    has_val = bool(team["value"])
    display = ("The " + team["value"].strip().title() + " Team") if has_val else "[ name your team after your value ]"
    text(s, Inches(0.88), Inches(2.3), Inches(11.6), Inches(1.9),
         [[(display, {"size": 46, "bold": True, "color": WHITE if has_val else MUTED})]], spacing=1.02)
    text(s, Inches(0.92), Inches(4.15), Inches(11.4), Inches(0.5),
         [[(" · ".join(team["roster"]), {"size": 18, "color": MUTED})]])
    if team.get("app"):
        text(s, Inches(0.92), Inches(4.6), Inches(11.6), Inches(0.5),
             [[("Project 2:  ", {"size": 15, "color": GREEN, "bold": True, "font": F_MONO}),
               (team["app"], {"size": 15, "color": MUTED})]])
    text(s, Inches(0.92), Inches(5.15), Inches(11.4), Inches(0.5),
         [[("GitHub team: " + team["name"], {"size": 13, "color": DIM, "font": F_MONO})]])
    footer(s, FOOT)
    notes(s, "Team name = the value you carry into the final. Confirm the value + members before presenting.")
    return s


def howto():
    s = slide()
    kicker(s, "HOW TO USE THIS DECK"); accent(s)
    text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.0),
         [[("Keep the headers. Put your slides behind them.", {"size": 32, "bold": True, "color": WHITE})]])
    items = [
        "Five section headers follow — they MIRROR the FigJam canvas blocks. The canvas is where you work it out; this deck is where you present it.",
        "Sections 01, 02, 03, 05 are the TEAM's. Section 04 has one named slide per person — the paper you found and READ.",
        "Add your own slides AFTER each header. Don't delete the headers.",
        "No full user study today — for '03 What we found', apply your metrics with a partner (speculating is fine).",
        "Each person READS one real paper (not just an AI summary) — that's section 04 / the FigJam Outlook.",
        "Real citations only — if you can't find the paper, leave the claim out.",
        "Your reflection is NOT in this deck — it goes in your own lane on the team FigJam canvas (block 06).",
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


def member_slide(name, i):
    """One named slide per member - the real paper they found + READ (their individual contribution; FigJam 04 Outlook)."""
    s = slide()
    kicker(s, f"04.{i}  ·  YOUR PAPER (your individual contribution)"); accent(s)
    text(s, Inches(0.7), Inches(1.28), Inches(12), Inches(1.0),
         [[(name, {"size": 36, "bold": True, "color": WHITE})]])
    prompts = [
        "The paper you found + READ - [ author, year, title ]  (AI search to FIND it; then read the actual paper)",
        "The design intervention they tried to move THIS value - [ what they did ]",
        "What WORKED - [ ___ ]     |     What FAILED / to avoid - [ ___ ]",
        "Does it support or challenge our design direction? - [ ___ ]",
    ]
    paras = [[("\u2192  ", {"color": GREEN, "bold": True}), (p, {})] for p in prompts]
    text(s, Inches(0.72), Inches(2.5), Inches(11.9), Inches(3.1), paras, size=19, color=WHITE, spacing=1.34)
    rect(s, Inches(0.7), Inches(5.95), Inches(11.9), Inches(0.72), fill=PANEL, line=GREEN, line_w=1.5, rounded=True)
    text(s, Inches(1.0), Inches(5.95), Inches(11.3), Inches(0.72),
         [[("\u25b8  ", {"color": GREEN, "bold": True, "size": 16}),
           ("This slide is yours - the paper you actually read. Add more behind it if you need to - keep your name on them.", {"size": 15, "color": WHITE, "bold": True})]],
         anchor=MSO_ANCHOR.MIDDLE)
    footer(s, FOOT)
    notes(s, f"{name}'s individual contribution: the real paper they found (AI academic search) and READ - not just an AI summary. Reflection lives in their own FigJam lane (block 06).")
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
        if num == "04":
            for i, member in enumerate(team["roster"], start=1):
                member_slide(member, i)
    sources_slide()
    path = os.path.join(OUT, f"Week3-Tue-{team['slug']}.pptx")
    n = save(path)
    built.append((team["name"], n))

print(f"Built {len(built)} team decks in {OUT}")
for name, n in built:
    print(f"  {n:2d} slides · {name}")

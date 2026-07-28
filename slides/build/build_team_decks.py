#!/usr/bin/env python3
"""Per-team 'Value Verification' research decks (Week 3, Tue 7/28).

One deck per Project 2 team: a cover, a how-to slide, and FIVE section headers that
mirror the FigJam 'Vibing Values' canvas blocks 1:1 (the canvas is the ground truth —
where the team works it out; this deck is where they present it). Teams paste their
own slides behind each header. Same 'Good Code, Good Vibes' theme as the lecture decks.

Layout is fixed + comfortable: generous margins, one idea per slide, a single 'what
goes here' prompt card per header — nothing runs off the slide.

Upload each .pptx to Google Slides (File > Import slides) and share with the team.
"""
from deck_common import *
from pptx.util import Inches, Pt, Emu
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
import os

OUT = "/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/team-decks"
FOOT = "Value Verification · TECHIE 1121 · Cornell Tech · Tue Jul 28"

# `SW`/`SH` from deck_common are None until init_deck() runs, and `import *` binds them
# by value — so use local constants for the fixed 16:9 slide size instead.
SLIDE_W, SLIDE_H = Inches(13.333), Inches(7.5)
LEFT = Inches(0.9)
CONTENT_W = Inches(11.53)   # 13.333 - 0.9 - 0.9

# Rosters from the GitHub Classroom teams; values from each team's project-report.md.
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

# (number, FigJam block tag, title, one human sentence, up to 3 short prompts)
SECTIONS = [
    ("01", "VALUE DEFINITION", "The value & how we define it",
     "Name the value, and pin down what it concretely means for your app.",
     ["[ our app in one line ] — and the value it claims",
      "How we define it (privacy as control vs. security vs. contextual integrity)",
      "If it's present, users will DO / UNDERSTAND / FEEL [ … ]"]),
    ("02", "BRAINSTORM 1·2·3 + 02", "How would we verify it?",
     "One way to check each lens — and how researchers measure it.",
     ["BEHAVIOR: do users ACT differently? → [ method + metric ]",
      "UNDERSTANDING / AFFECT: do they GRASP / FEEL it? → [ method + metric ]",
      "An instrument we'd borrow: UEQ / HRI / METUX / slop"]),
    ("03", "03 WHAT WE FOUND", "What we found",
     "A quick partner check — speculating is fine; a real study takes time.",
     ["Do they ACT / GRASP / FEEL differently? [ what we saw ]",
      "Green = it works   ·   Red = it doesn't",
      "Does it move the value — for whom, and who's left out?"]),
    ("04", "04 OUTLOOK", "What related research found",
     "Each member reads one real paper — a named slide each follows this header.",
     ["Find via AI search (Claude · ChatGPT · Elicit · Semantic Scholar · Scholar Labs), then READ it",
      "Source (author, year) · what WORKED · what FAILED",
      "Real papers only — never invent a citation"]),
    ("05", "05 SO WHAT", "So what — our next design direction",
     "If the design doesn't move the value, what would? This starts Wednesday.",
     ["Another design that could achieve the value",
      "What the next cycle should discover",
      "2–3 directions the evidence points to"]),
]


def team_cover(team):
    # For the final week, a team's NAME is the value it committed to.
    s = slide()
    rect(s, 0, 0, Inches(0.28), SLIDE_H, fill=GREEN)
    text(s, LEFT, Inches(1.7), Inches(11.5), Inches(0.5),
         [[("VALUE-CENTERED USER RESEARCH DECK", {"size": 15, "color": GREEN, "bold": True, "font": F_MONO})]])
    has_val = bool(team["value"])
    display = ("The " + team["value"].strip().title() + " Team") if has_val else "[ name your team after your value ]"
    text(s, Inches(0.88), Inches(2.3), Inches(11.6), Inches(1.7),
         [[(display, {"size": 44, "bold": True, "color": WHITE if has_val else MUTED})]], spacing=1.02)
    text(s, Inches(0.92), Inches(4.15), Inches(11.4), Inches(0.5),
         [[(" · ".join(team["roster"]), {"size": 18, "color": MUTED})]])
    if team.get("app"):
        text(s, Inches(0.92), Inches(4.62), Inches(11.6), Inches(0.5),
             [[("Project 2:  ", {"size": 15, "color": GREEN, "bold": True, "font": F_MONO}),
               (team["app"], {"size": 15, "color": MUTED})]])
    text(s, Inches(0.92), Inches(5.12), Inches(11.4), Inches(0.5),
         [[("GitHub team: " + team["name"], {"size": 13, "color": DIM, "font": F_MONO})]])
    footer(s, FOOT)
    notes(s, "Team name = the value you carry into the final. Confirm the value + members before presenting.")
    return s


def howto():
    s = slide()
    kicker(s, "HOW TO USE THIS DECK"); accent(s)
    text(s, LEFT, Inches(1.3), Inches(11.5), Inches(1.0),
         [[("Keep the 5 headers. Put your slides behind them.", {"size": 30, "bold": True, "color": WHITE})]])
    items = [
        [("These 5 headers ", {}), ("mirror your FigJam board", {"color": GREEN, "bold": True}),
         (" — the canvas is where you work it out; this deck is where you present it.", {})],
        [("Add your slides ", {}), ("behind", {"color": GREEN, "bold": True}),
         (" each header — don't delete the headers.", {})],
        [("Sections 01, 02, 03, 05 are the team's. ", {}),
         ("04 = one ‘YOUR PAPER’ slide per person.", {"color": GREEN, "bold": True})],
        [("No full study today — for ‘03 What we found’, check with a partner (speculating is fine).", {})],
        [("Each person ", {}), ("READS one real paper", {"color": GREEN, "bold": True}),
         (" — not just an AI summary.", {})],
        [("Your reflection goes on the ", {}), ("FigJam board (block 06)", {"color": GREEN, "bold": True}),
         (", not in this deck.", {})],
        [("Delete this slide before you present.", {"color": MUTED})],
    ]
    paras = [[("•  ", {"color": GREEN, "bold": True})] + segs for segs in items]
    text(s, Inches(0.92), Inches(2.55), Inches(11.5), Inches(4.1), paras, size=18, color=WHITE, spacing=1.34)
    footer(s, FOOT)
    return s


def team_section(num, block_tag, title, purpose, prompts):
    s = slide()
    rect(s, 0, 0, Inches(0.28), SLIDE_H, fill=GREEN)
    # kicker: which FigJam block this maps to
    text(s, LEFT, Inches(0.62), CONTENT_W, Inches(0.4),
         [[(f"SECTION {num}   ·   FIGJAM: {block_tag}", {"size": 13, "color": GREEN, "bold": True, "font": F_MONO})]])
    # big number (left) + title (right), aligned on one band
    text(s, LEFT, Inches(1.32), Inches(1.9), Inches(1.4),
         [[(num, {"size": 66, "bold": True, "color": GREEN, "font": F_MONO})]])
    text(s, Inches(2.95), Inches(1.42), Inches(9.5), Inches(1.2),
         [[(title, {"size": 30, "bold": True, "color": WHITE})]], spacing=1.03, anchor=MSO_ANCHOR.TOP)
    # one human sentence
    text(s, Inches(2.95), Inches(2.62), Inches(9.5), Inches(0.7),
         [[(purpose, {"size": 16, "color": MUTED})]], spacing=1.1)
    # prompt card — the 'what goes here' fill-in area
    py, ph = Inches(3.62), Inches(2.85)
    rect(s, LEFT, py, CONTENT_W, ph, fill=PANEL, rounded=True)
    text(s, Inches(1.25), Emu(int(py + Inches(0.3))), Inches(10.9), Inches(0.4),
         [[("WHAT GOES ON THIS SLIDE  ·  replace the [ … ]", {"size": 12, "color": GREEN, "bold": True, "font": F_MONO})]])
    paras = [[("→  ", {"color": GREEN, "bold": True, "size": 18}), (p, {"size": 18, "color": WHITE})] for p in prompts]
    text(s, Inches(1.25), Emu(int(py + Inches(0.9))), Inches(10.85), Emu(int(ph - Inches(1.15))),
         paras, spacing=1.4)
    footer(s, FOOT)
    notes(s, f"Section header (FigJam: {block_tag}) — the team's own slides go after this one.")
    return s


def member_slide(name, i):
    """One named slide per member - the real paper they found + READ (FigJam 04 Outlook)."""
    s = slide()
    kicker(s, f"04.{i}   ·   YOUR PAPER  (your individual contribution)"); accent(s)
    text(s, LEFT, Inches(1.32), Inches(11.5), Inches(1.0),
         [[(name, {"size": 36, "bold": True, "color": WHITE})]])
    text(s, Inches(0.92), Inches(2.28), Inches(11.4), Inches(0.5),
         [[("The paper you found via AI search — and actually READ (not just the AI summary).", {"size": 16, "color": MUTED})]])
    py, ph = Inches(3.0), Inches(2.85)
    rect(s, LEFT, py, CONTENT_W, ph, fill=PANEL, rounded=True)
    prompts = [
        "The paper — [ author, year, title ]",
        "What WORKED — [ … ]     |     What FAILED / to avoid — [ … ]",
        "Supports or challenges our design direction? — [ … ]",
    ]
    paras = [[("→  ", {"color": GREEN, "bold": True, "size": 19}), (p, {"size": 19, "color": WHITE})] for p in prompts]
    text(s, Inches(1.25), Emu(int(py + Inches(0.42))), Inches(10.85), Emu(int(ph - Inches(0.7))),
         paras, spacing=1.5)
    text(s, LEFT, Inches(6.15), Inches(11.5), Inches(0.4),
         [[("▸  This slide is yours — add more behind it if you need to, keep your name on them.",
            {"size": 13, "color": DIM, "font": F_MONO})]])
    footer(s, FOOT)
    notes(s, f"{name}'s individual contribution: the real paper they found (AI academic search) and READ - not just an AI summary. Reflection lives in their own FigJam lane (block 06).")
    return s


def sources_slide():
    s = slide()
    kicker(s, "SOURCES"); accent(s)
    text(s, LEFT, Inches(1.3), Inches(11.5), Inches(1.0),
         [[("What we read", {"size": 32, "bold": True, "color": WHITE})]])
    paras = [[("•  ", {"color": GREEN, "bold": True}),
              ("Author, Year. Title. Where it appeared.  —  what it found", {"color": MUTED})] for _ in range(4)]
    text(s, Inches(0.92), Inches(2.55), Inches(11.5), Inches(3.4), paras, size=18, color=WHITE, spacing=1.5)
    text(s, Inches(0.92), Inches(6.3), Inches(11.5), Inches(0.4),
         [[("Real papers only — never invent a citation.", {})]], size=13, color=DIM, font=F_MONO)
    footer(s, FOOT)
    return s


built = []
for team in TEAMS:
    init_deck()
    team_cover(team)
    howto()
    for num, block_tag, title, purpose, prompts in SECTIONS:
        team_section(num, block_tag, title, purpose, prompts)
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

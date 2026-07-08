#!/usr/bin/env python3
"""Rebuild Week 1 of the 'Good Code, Good Vibes' course deck as a clean, editable .pptx.
Dark/neon course theme. All original text preserved; media shown as labeled placeholders;
thin slides lightly enriched (noted in speaker notes)."""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

# ---- palette ---------------------------------------------------------------
BG      = RGBColor(0x0B, 0x0E, 0x14)   # near-black background
PANEL   = RGBColor(0x15, 0x1B, 0x26)   # card panels
GREEN   = RGBColor(0x00, 0xFF, 0x41)   # neon accent (brand)
WHITE   = RGBColor(0xF5, 0xF7, 0xFA)   # body text
MUTED   = RGBColor(0x8A, 0x94, 0xA6)   # captions
DIM     = RGBColor(0x5A, 0x64, 0x74)   # faint

F_HEAD = "Arial"
F_BODY = "Arial"
F_MONO = "Courier New"

prs = Presentation()
prs.slide_width  = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]
SW, SH = prs.slide_width, prs.slide_height

# ---- helpers ---------------------------------------------------------------
def slide(bg=BG):
    s = prs.slides.add_slide(BLANK)
    s.background.fill.solid()
    s.background.fill.fore_color.rgb = bg
    return s

def _set_font(run, size, color, bold, font):
    run.font.size = Pt(size); run.font.bold = bold
    run.font.color.rgb = color; run.font.name = font

def text(s, l, t, w, h, runs, size=18, color=WHITE, bold=False, font=F_BODY,
         align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, spacing=1.0, shrink=False):
    """runs: str, or list of paragraphs where each paragraph is str or list of (txt,opts)."""
    tb = s.shapes.add_textbox(l, t, w, h); tf = tb.text_frame
    tf.word_wrap = True; tf.vertical_anchor = anchor
    if isinstance(runs, str):
        runs = [runs]
    for i, para in enumerate(runs):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align; p.line_spacing = spacing
        segs = para if isinstance(para, list) else [(para, {})]
        for seg_txt, opts in segs:
            r = p.add_run(); r.text = seg_txt
            _set_font(r, opts.get("size", size), opts.get("color", color),
                      opts.get("bold", bold), opts.get("font", font))
    return tb

def rect(s, l, t, w, h, fill=PANEL, line=None, line_w=1.0, rounded=False, dash=False):
    shp = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if rounded else MSO_SHAPE.RECTANGLE,
                             l, t, w, h)
    if fill is None:
        shp.fill.background()
    else:
        shp.fill.solid(); shp.fill.fore_color.rgb = fill
    if line is None:
        shp.line.fill.background()
    else:
        shp.line.color.rgb = line; shp.line.width = Pt(line_w)
        if dash:
            shp.line._get_or_add_ln().append(_dash())
    shp.shadow.inherit = False
    return shp

def _dash():
    d = qn('a:prstDash'); from pptx.oxml import parse_xml
    el = parse_xml('<a:prstDash xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" val="dash"/>')
    return el

def kicker(s, txt, color=GREEN):
    text(s, Inches(0.7), Inches(0.55), Inches(11), Inches(0.4),
         [[(txt, {})]], size=13, color=color, bold=True, font=F_MONO)

def footer(s, txt):
    text(s, Inches(0.7), Inches(6.95), Inches(12), Inches(0.4),
         [[(txt, {})]], size=10, color=DIM, font=F_MONO)

def accent(s, l=Inches(0.7), t=Inches(1.02), w=Inches(0.9), h=Inches(0.08)):
    rect(s, l, t, w, h, fill=GREEN)

def notes(s, txt):
    s.notes_slide.notes_text_frame.text = txt

# ---- slide templates -------------------------------------------------------
def cover(title_lines, subtitle, tag):
    s = slide()
    rect(s, 0, 0, Inches(0.28), SH, fill=GREEN)
    text(s, Inches(0.9), Inches(2.2), Inches(11.5), Inches(2.2),
         [[(title_lines[0], {"size": 54, "bold": True, "color": WHITE})],
          [(title_lines[1], {"size": 54, "bold": True, "color": GREEN})]],
         spacing=1.02)
    text(s, Inches(0.92), Inches(4.5), Inches(11), Inches(0.6),
         [[(subtitle, {"size": 20, "color": MUTED})]])
    text(s, Inches(0.92), Inches(5.15), Inches(11), Inches(0.5),
         [[(tag, {"size": 13, "color": DIM, "font": F_MONO})]])
    return s

def divider(day, title, presenter=None):
    s = slide()
    rect(s, 0, 0, Inches(0.28), SH, fill=GREEN)
    text(s, Inches(0.9), Inches(2.5), Inches(11.5), Inches(0.5),
         [[(day, {"size": 16, "color": GREEN, "bold": True, "font": F_MONO})]])
    text(s, Inches(0.88), Inches(3.05), Inches(11.5), Inches(1.6),
         [[(title, {"size": 46, "bold": True, "color": WHITE})]])
    if presenter:
        text(s, Inches(0.92), Inches(4.55), Inches(11), Inches(0.5),
             [[("Led by " + presenter, {"size": 15, "color": MUTED})]])
    return s

def content(kick, title, body_paras, foot=None, title_size=34):
    s = slide(); kicker(s, kick); accent(s)
    text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.2),
         [[(title, {"size": title_size, "bold": True, "color": WHITE})]])
    if body_paras:
        text(s, Inches(0.72), Inches(2.5), Inches(11.9), Inches(4.0),
             body_paras, size=20, color=WHITE, spacing=1.12)
    if foot: footer(s, foot)
    return s

def bullets(kick, title, items, foot=None):
    paras = [[("•  ", {"color": GREEN, "bold": True}), (it, {})] for it in items]
    return content(kick, title, paras, foot)

def big_question(kick, questions, foot=None):
    s = slide(); kicker(s, kick)
    text(s, Inches(1.2), Inches(0.6), Inches(3), Inches(2),
         [[("?", {"size": 120, "bold": True, "color": GREEN})]])
    paras = [[(q, {})] for q in questions]
    text(s, Inches(1.2), Inches(3.0), Inches(11), Inches(3.4),
         paras, size=30, color=WHITE, bold=True, spacing=1.12)
    if foot: footer(s, foot)
    return s

def media(kick, title, label, hint, foot=None):
    s = slide(); kicker(s, kick); accent(s)
    text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.0),
         [[(title, {"size": 30, "bold": True, "color": WHITE})]])
    box = rect(s, Inches(2.4), Inches(2.55), Inches(8.5), Inches(3.9),
               fill=PANEL, line=GREEN, line_w=1.5, rounded=True, dash=True)
    text(s, Inches(2.4), Inches(3.7), Inches(8.5), Inches(0.8),
         [[(label, {"size": 22, "bold": True, "color": GREEN, "font": F_MONO})]],
         align=PP_ALIGN.CENTER)
    text(s, Inches(2.4), Inches(4.5), Inches(8.5), Inches(0.8),
         [[(hint, {"size": 14, "color": MUTED})]], align=PP_ALIGN.CENTER)
    if foot: footer(s, foot)
    return s

def columns(kick, title, cols, foot=None):
    """cols: list of (label, heading, desc)."""
    s = slide(); kicker(s, kick); accent(s)
    text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.0),
         [[(title, {"size": 32, "bold": True, "color": WHITE})]])
    n = len(cols); gap = Inches(0.4); left = Inches(0.7)
    total = SW - Inches(1.4) - gap * (n - 1)
    cw = Emu(int(total / n))
    top = Inches(2.7); ch = Inches(3.7)
    for i, (label, head, desc) in enumerate(cols):
        x = Emu(int(left + i * (cw + gap)))
        rect(s, x, top, cw, ch, fill=PANEL, rounded=True)
        rect(s, x, top, cw, Inches(0.09), fill=GREEN)
        text(s, Emu(int(x + Inches(0.3))), Emu(int(top + Inches(0.35))),
             Emu(int(cw - Inches(0.6))), Inches(0.5),
             [[(label.upper(), {"size": 12, "bold": True, "color": GREEN, "font": F_MONO})]])
        text(s, Emu(int(x + Inches(0.3))), Emu(int(top + Inches(0.85))),
             Emu(int(cw - Inches(0.6))), Inches(0.9),
             [[(head, {"size": 20, "bold": True, "color": WHITE})]])
        text(s, Emu(int(x + Inches(0.3))), Emu(int(top + Inches(1.8))),
             Emu(int(cw - Inches(0.6))), Inches(1.7),
             [[(desc, {"size": 15, "color": MUTED})]], spacing=1.1)
    if foot: footer(s, foot)
    return s

def checklist(kick, title, items, foot=None):
    s = slide(); kicker(s, kick); accent(s)
    text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.0),
         [[(title, {"size": 34, "bold": True, "color": WHITE})]])
    paras = [[("✓  ", {"color": GREEN, "bold": True, "size": 20}), (it, {"size": 20})]
             for it in items]
    text(s, Inches(0.9), Inches(2.5), Inches(11.5), Inches(4.2),
         paras, size=20, color=WHITE, spacing=1.35)
    if foot: footer(s, foot)
    return s

def quote(kick, q, attrib, prompt, foot=None):
    s = slide(); kicker(s, kick)
    text(s, Inches(1.0), Inches(1.7), Inches(1.4), Inches(1.4),
         [[("“", {"size": 90, "bold": True, "color": GREEN})]])
    text(s, Inches(1.3), Inches(2.4), Inches(10.7), Inches(2.2),
         [[(q, {"size": 30, "bold": True, "color": WHITE})]], spacing=1.12)
    text(s, Inches(1.35), Inches(4.7), Inches(10.5), Inches(0.5),
         [[("— " + attrib, {"size": 16, "color": MUTED})]])
    if prompt:
        rect(s, Inches(1.3), Inches(5.4), Inches(10.7), Inches(1.0),
             fill=PANEL, line=GREEN, line_w=1.0, rounded=True)
        text(s, Inches(1.6), Inches(5.55), Inches(10.1), Inches(0.8),
             [[(prompt, {"size": 18, "color": WHITE})]], anchor=MSO_ANCHOR.MIDDLE)
    if foot: footer(s, foot)
    return s

# ===========================================================================
# WEEK 1
# ===========================================================================
FOOT = "Good Code, Good Vibes · TECHIE 1121 · Cornell Tech · Summer 2026"

# --- Cover ---
cover(["Good Code, Good Vibes:", "Building Ethical Apps with AI"],
      "An introduction to ethical vibe coding", "TECHIE 1121 · CORNELL TECH · SUMMER 2026")

# ================= MONDAY — What is Vibe Coding? (Jonathan) =================
divider("WEEK 1 · MONDAY", "What is Vibe Coding?", "Jonathan")

s = quote("ETHICS WARM-UP",
      "Act only according to that maxim whereby you can at the same time will that it should become a universal law.",
      "Immanuel Kant, Groundwork of the Metaphysics of Morals",
      "If you are in poverty, is it okay to steal food for your starving family from a large grocery store?",
      FOOT)
notes(s, "Original recurring ethics-hook slide. Consider giving each day its own dilemma (kept Kant here as your opener).")

s = content("WHAT IS VIBE CODING?", "Give in to the vibes",
    [[("“There’s a new kind of coding I call ‘vibe coding’, where you fully give in to the vibes, "
       "embrace exponentials, and forget that the code even exists.”", {"size": 22, "color": WHITE})],
     [("", {})],
     [("— Andrej Karpathy, Feb 2025", {"size": 16, "color": MUTED})],
     [("", {})],
     [("You express the ", {}), ("intent", {"color": GREEN, "bold": True}),
      (" of the product; the AI does the heavy lifting. The interface is no longer "
       "syntax — it’s a conversation about behavior.", {})]], FOOT)
notes(s, "ADDED to flesh out Monday's thin 'what is vibe coding' open. Source: Karpathy / Li et al. 'Vibe Coding in Product Teams' (the 7/13 primary reading).")

s = media("WHAT IS VIBE CODING?", "See it in motion",
      "▶  vibe coding.mp4  /  whatisvibecoding.gif",
      "Drop your intro clip / GIF here (from the old deck's Drive folder).", FOOT)
notes(s, "Media placeholder — original deck had a 'what is vibe coding' gif/video here.")

content("SETTING UP", "There are many tools you can use for vibe coding",
    [[("We’ll go over how to set up and use a few of them — three different ways to work "
       "with generative AI for programming.", {"size": 22, "color": MUTED})]], FOOT)

s = columns("SETTING UP", "Three ways to work with AI",
    [("01 · Online", "Browser-only tool", "No install. Prompt and preview in the browser. e.g. v0.app."),
     ("02 · IDE", "VS Code + GitHub Copilot", "Agent mode in your editor / Codespace. (Cursor is an 18+ alternative.)"),
     ("03 · Local", "Run a model locally", "Most control over the model; add your own tools on top.")], FOOT)
notes(s, "ADDED overview to frame the three methods your Monday slides walk through. NOTE: replaced 'Antigravity' with 'VS Code + GitHub Copilot' — Antigravity is retired (no longer an IDE); Copilot is now the recommended 13+ tool. Cursor noted as 18+.")

content("METHOD 1 · ONLINE", "First, an online-only tool: v0.app",
    [[("Let’s try ", {}), ("v0.app", {"color": GREEN, "bold": True}),
      (" — you describe an app in the browser and it generates it, no setup required.", {})]], FOOT)

media("METHOD 1 · ONLINE", "v0.app — the result",
      "🖼  v0.app result — screenshot",
      "Paste your v0.app output screenshot here.", FOOT)

big_question("DISCUSS", ["Do you think this worked well?",
                         "What assumptions were made?",
                         "→ Play the game."], FOOT)

s = content("METHOD 2 · IDE", "Next, an IDE tool",
    [[("VS Code + GitHub Copilot", {"color": GREEN, "bold": True, "size": 24})],
     [("", {})],
     [("Your editor becomes the agent: it plans and edits across your whole repo. "
       "Cursor is a similar option (18+).", {"size": 20, "color": WHITE})]], FOOT)
notes(s, "Original listed 'Antigravity / VSCode / Cursor'. Antigravity retired → now VS Code + GitHub Copilot (recommended, 13+); Cursor kept as 18+ alt.")

content("METHOD 2 · IDE", "Let’s walk through VS Code first",
    [[("Install VS Code, add the GitHub Copilot extension, open your repo, and turn on "
       "agent mode.", {"size": 22, "color": MUTED})]], FOOT)

media("METHOD 2 · IDE", "Once it’s installed it looks like this",
      "▶  vscode.mp4",
      "Drop your VS Code walkthrough clip / screenshot here.", FOOT)

big_question("DISCUSS", ["What are the benefits of the code living right next to the generative AI?",
                         "What are the negatives?"], FOOT)

content("METHOD 3 · LOCAL", "Lastly, run a model locally",
    [[("This gives you the ", {}), ("most control", {"color": GREEN, "bold": True}),
      (" over the AI models themselves — and you can add many different tools on top of the model.",
       {})]], FOOT)

media("METHOD 3 · LOCAL", "Running a model locally",
      "▶  local.mp4",
      "Drop your local-model clip / screenshot here.", FOOT)

big_question("DISCUSS", ["What could you do running the model locally that you can’t with the other two methods?",
                         "If running the program is separated from the model, what problems can that cause?"], FOOT)

big_question("DISCUSS", ["Given the three methods of interacting with generative AI for programming —",
                         "which method is best in which situation?"], FOOT)

checklist("GOALS FOR THE DAY", "Goals for the day",
    ["GitHub repo cloned locally to your computer",
     "Updates pushed to your own repo copy",
     "Set up and chosen a primary vibe coding tool",
     "Worked on Activity 1 (your website)",
     "Website is hosted",
     "Submitted your Vibe-Trace",
     "Submitted your activity reflection"], FOOT)

# ================= TUESDAY — Prompt Engineering (Hauke) =================
divider("WEEK 1 · TUESDAY", "Prompt Engineering", "Hauke")

s = content("READING", "Why Johnny Can’t Prompt",
    [[("Prompting feels like natural language, but small wording changes swing the output. "
       "“Vibe coding” leans on intuition; ", {"size": 22, "color": WHITE}),
      ("prompt engineering", {"size": 22, "color": GREEN, "bold": True}),
      (" is the disciplined version — closer to writing software requirements.", {"size": 22, "color": WHITE})],
     [("", {})],
     [("Reading: Zamfirescu-Pereira et al., “Why Johnny Can’t Prompt” (CHI ’23).", {"size": 15, "color": MUTED})]], FOOT)
notes(s, "Enriched the near-empty 'Why Johnny Can't Prompt' slide with a one-line framing + the citation (7/14 primary reading). Add the original figure via the placeholder if you had one.")

# --- Prompt tips (developed from Hauke's rough prompt-tips deck seeds) ---
s = content("PROMPT TIP · 01", "Make it personal",
    [[("Generic prompt → generic app — the model falls back on its averaged defaults "
       "(remember the Mirror Effect).", {"size": 20, "color": WHITE})],
     [("", {})],
     [("Feed it ", {}), ("your", {"color": GREEN, "bold": True}),
      (" specifics: your content, your voice, real names and photos, a reference you "
       "actually like. Concrete context is what pulls the output away from the default.", {})]], FOOT)
notes(s, "Authored from your prompt-tips deck seeds (Make It Personal / Deal with quota / Vibe-code controls / Value of artifacts / Vibe Code Look). Expand as you like.")

content("PROMPT TIP · 02", "Vibe-code the controls, not just the result",
    [[("Don’t re-prompt for every tweak — ask the AI to expose knobs:", {"size": 20, "color": WHITE})],
     [("", {})],
     [("“Add sliders / CSS variables for spacing, colors, and font size so I can fine-tune it myself.”",
       {"size": 20, "color": GREEN, "bold": True})],
     [("", {})],
     [("Now you iterate by hand — fast, and without spending another generation.", {"size": 20, "color": MUTED})]], FOOT)

content("PROMPT TIP · 03", "Nail the look",
    [[("Describe the aesthetic — don’t just name the feature.", {"size": 20, "color": WHITE})],
     [("", {})],
     [("Reference a style or a site you like (“minimal, editorial, lots of whitespace, mono type”), "
       "paste a screenshot, name your colors.", {})],
     [("", {})],
     [("Then iterate on the vibe: “more playful”, “darker”, “more Awwwards”.", {"color": MUTED})]], FOOT)

bullets("PROMPT TIP · 04", "Deal with quota",
    ["Free tiers run out — every wasted regeneration is wasted quota.",
     "Plan the prompt before you spend a generation.",
     "Make one bigger, specific ask instead of ten vague ones.",
     "Save your transcripts, and know when to switch tools."], FOOT)

content("PROMPT TIP · 05", "The value of a vibe-coded artifact",
    [[("What makes it good isn’t that AI made it — it’s ", {"size": 20, "color": WHITE}),
      ("your taste and iteration", {"size": 20, "color": GREEN, "bold": True}),
      (".", {"size": 20, "color": WHITE})],
     [("", {})],
     [("e.g. Isometric NYC — cannoneyed.com/projects/isometric-nyc — a striking artifact that "
       "reflects human judgment, not a one-click default.", {"color": MUTED})],
     [("", {})],
     [("Aim for something only you would have made.", {})]], FOOT)

s = bullets("ACTIVITY", "Compare different prompting strategies",
    ["Run the SAME task through 2+ vibe coding tools.",
     "Vary one lever at a time: specificity · persona · examples · constraints.",
     "Collect the outputs side-by-side.",
     "Note which prompt moves changed quality vs. style vs. correctness — and why."], FOOT)
notes(s, "Enriched from the repo activity 7/14 ('Prompts that Steer the Vibe'). Original slide was just a title.")

# ================= WEDNESDAY — Bias in Vibe Coding (Jonathan) =============
divider("WEEK 1 · WEDNESDAY", "Bias in Vibe Coding", "Jonathan")

columns("LEARNING OBJECTIVES", "Learning objectives",
    [("Visibility", "Visual & functional bias",
      "Identify how LLM training data manifests as visual and functional bias in generated apps."),
     ("Analytics", "Tool evaluation",
      "Evaluate different vibe coding tools (Lovable, Bolt, Vibe Code App) for consistency and stereotyping."),
     ("Auto-awesome", "Inclusive design",
      "Develop strategies for ‘de-biasing’ prompts to ensure more inclusive outputs.")], FOOT)

content("FOUNDATION", "What is bias?",
    [[("Bias is a systematic skew in outputs — patterns the model treats as the default "
       "because they dominate its training data.", {"size": 22, "color": MUTED})]], FOOT)
notes(prs.slides[-1], "Original 'What is Bias?' slide was a title only — added a one-line working definition.")

columns("DEFINITION", "What is “Vibe Bias”?",
    [("Visual stereotypes", "Palette & aesthetics",
      "e.g. ‘Professional’ defaults to blue, white, corporate aesthetics."),
     ("Functional assumptions", "Defaults baked in",
      "e.g. assuming US-style addresses or phone-number formats."),
     ("Accessibility oversights", "Who’s left out",
      "e.g. low contrast ratios or non-semantic HTML structures.")], FOOT)
notes(prs.slides[-1], "Kept your 'Vibe Bias' definition; the lead definition line: 'The tendency of LLMs to generate UI/UX patterns based on the most frequent (often Western-centric) data in their training sets.'")

content("CORE CONCEPT", "The Mirror Effect",
    [[("LLMs don’t “design” — they predict the next most likely token.", {"size": 24, "color": WHITE, "bold": True})],
     [("", {})],
     [("Prompt for a “Healthcare Dashboard” and the tool reflects the average of 10,000 "
       "existing dashboards — including all their flaws and lack of diversity.", {"size": 20, "color": MUTED})]], FOOT)

big_question("TRANSITION", ["Time for some activities."], FOOT)

s = slide(); kicker(s, "CASE STUDY"); accent(s)
text(s, Inches(0.7), Inches(1.3), Inches(12), Inches(1.0),
     [[("Case study: “Make it Professional”", {"size": 32, "bold": True, "color": WHITE})]])
rect(s, Inches(0.7), Inches(2.6), Inches(5.7), Inches(2.6), fill=PANEL, rounded=True, line=GREEN, line_w=1.2, dash=True)
text(s, Inches(0.7), Inches(3.5), Inches(5.7), Inches(0.6),
     [[("🖼  Result A", {"size": 18, "bold": True, "color": GREEN, "font": F_MONO})]], align=PP_ALIGN.CENTER)
text(s, Inches(0.7), Inches(4.1), Inches(5.7), Inches(0.6),
     [[("“A standard landing page.”", {"size": 14, "color": MUTED})]], align=PP_ALIGN.CENTER)
rect(s, Inches(6.9), Inches(2.6), Inches(5.7), Inches(2.6), fill=PANEL, rounded=True, line=GREEN, line_w=1.2, dash=True)
text(s, Inches(6.9), Inches(3.5), Inches(5.7), Inches(0.6),
     [[("🖼  Result B", {"size": 18, "bold": True, "color": GREEN, "font": F_MONO})]], align=PP_ALIGN.CENTER)
text(s, Inches(6.9), Inches(4.1), Inches(5.7), Inches(0.6),
     [[("“A professional landing page.”", {"size": 14, "color": MUTED})]], align=PP_ALIGN.CENTER)
text(s, Inches(0.7), Inches(5.5), Inches(12), Inches(0.8),
     [[("The question: why does “professional” often default to one specific layout or design?",
        {"size": 18, "color": WHITE, "bold": True})]])
footer(s, FOOT)

bullets("ACTIVITY", "The cross-tool benchmark",
    ["The mission: run the SAME prompt across three different platforms.",
     "The prompt: “Build a social networking profile page for a community organizer in a "
     "specific area you’re familiar with.”",
     "Look for: did it use relevant imagery or icons?",
     "Is the terminology correct for the location?",
     "Does the wording or layout assume anything about who uses the site?"], FOOT)

columns("AUDIT", "The Vibe Audit checklist",
    [("Representation", "Who is this for?",
      "Who is this interface designed for? Who might be left out or overlooked?"),
     ("Accessibility", "Does it meet the bar?",
      "Color contrast, readability, clear navigation — basic accessibility standards."),
     ("Assumptions", "What’s baked in?",
      "What does the design assume — payment access, name formats, language?")], FOOT)

columns("STRATEGIES", "Strategies for control",
    [("Explicit prompting", "Say what you mean",
      "From “Make a login” to “Make an accessible login using semantic HTML and high-contrast tokens.”"),
     ("Context loading", "Feed diverse refs",
      "Provide the AI with diverse design-system references before generating."),
     ("Human-in-the-loop", "Audit, don’t trust",
      "Use your own critical lens to audit the code — not just the ‘vibe.’")], FOOT)

# ================= THURSDAY — Project Day =================
divider("WEEK 1 · THURSDAY", "Project Day — Project 1")

s = bullets("PROJECT 1", "Vibe code something your team wants or needs",
    ["Teams of 3–4. Everyone codes — rotate who drives the AI.",
     "Pick a real problem your team has and ship a small hosted app for it.",
     "Use the strongest tool + prompt approach you found Mon–Wed.",
     "Deliverable: hosted link + a vibe report (tool choice, prompt log, what broke).",
     "Work happens in your team’s Group Project repo. Due Monday of Week 2, before class."], FOOT)
notes(s, "Enriched the empty 'Project Day' slide with the Project 1 brief essentials from the repo. Group projects are separate Classroom team repos (confirm details with Jonathan).")

# ---------------------------------------------------------------------------
import os
out_dir = "/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides"
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, "Week1-Good-Code-Good-Vibes.pptx")
prs.save(out)
print(f"Saved {out} · {len(prs.slides.__iter__.__self__._sldIdLst)} slides")

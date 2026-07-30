#!/usr/bin/env python3
"""Letter-size door notes for the final showcase (Thu Jul 30, rooms from 2:30).

One page per team room (QR → the team's deployed final app) plus one for the
class-website station (QR → the course site). Rebuild after editing TEAMS
(e.g. once a team names its app):

    ../../slides/build/.venv/bin/python build_door_notes.py
    # then print door-notes.pdf (US Letter, portrait)

Requires: qrcode[pil] (in the slides venv), Google Chrome for the PDF step.
"""
import base64
import io
import subprocess
from pathlib import Path

import qrcode

BASE = "https://cornell-tech-vibe-coding-summer-2026.github.io"
CLASS_SITE = f"{BASE}/website/"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT = Path(__file__).parent

# name = big headline (app name once known, else the team's value),
# value = the value chip, members = EXACT display names from the roster.
TEAMS = [
    dict(name="AI Footprint Lens", value="sustainability & transparency",
         members=["Evan Birnbaum", "Derin Sezgin", "Magnes Dugan", "Oliver Chung"],
         url=f"{BASE}/final-project-templated-sustainability-transparency/code_deliverable/"),
    dict(name="Care & Wellbeing", value="care & wellbeing",
         members=["Elaine Huang", "Winnie Monroe", "Vienna Carew"],
         url=f"{BASE}/final-project-templated-care-wellbeing/code_deliverable/"),
    dict(name="Productivity", value="productivity",
         members=["Liam Allen", "Justin Ou", "Sebastien Gournay"],
         url=f"{BASE}/final-project-templated-productivity/code_deliverable/"),
    dict(name="Security", value="security",
         members=["Isa Offengenden", "Om Ravula", "Jason Chen"],
         url=f"{BASE}/final-project-templated-security/code_deliverable/"),
    dict(name="Safety & Autonomy", value="safety & autonomy",
         members=["Jamin Rose", "John Maida", "Ajin Yohannan"],
         url=f"{BASE}/final-project-templated-safety-autonomy/code_deliverable/"),
    dict(name="Sustainability & Trust", value="sustainability & trust",
         members=["Emily Tai", "Kylie Cheung", "Aria Sharma"],
         url=f"{BASE}/final-project-templated-sustainability-trust/code_deliverable/"),
]


def qr_data_uri(url):
    img = qrcode.make(url, box_size=12, border=2)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def page(title, sub, people_label, people, url, cta, footer):
    names = "".join(f"<li>{p}</li>" for p in people)
    return f"""
    <section class="page">
      <header>
        <div class="band">
          <span>TECHIE 1121 · ETHICAL VIBE CODING</span>
          <span>CORNELL TECH · SUMMER 2026</span>
        </div>
        <div class="showcase">FINAL SHOWCASE · TODAY FROM 2:30</div>
      </header>
      <main>
        <p class="value">{sub}</p>
        <h1>{title}</h1>
        <p class="cta">{cta}</p>
        <div class="cols">
          <div>
            <p class="lbl">{people_label}</p>
            <ul class="names">{names}</ul>
          </div>
          <figure>
            <img src="{qr_data_uri(url)}" alt="QR code">
            <figcaption>{footer}</figcaption>
          </figure>
        </div>
      </main>
      <footer>
        <img class="mini" src="{qr_data_uri(CLASS_SITE)}" alt="">
        <div>
          <p class="flbl">EVERY PROJECT · EVERY SUBMISSION · SYLLABUS</p>
          <p class="furl">{CLASS_SITE}</p>
        </div>
        <p class="tag">good code,<br>good vibes</p>
      </footer>
    </section>"""


pages = [
    page(t["name"], f"a final project built for the value of {t['value']}",
         "BUILT BY", t["members"], t["url"],
         "Come in — the demo is running. Try it yourself, ask the builders anything.",
         "Scan to open this project on your phone")
    for t in TEAMS
]
pages.append(
    page("The Class Website", "three weeks of ethical vibe coding, all in one place",
         "YOUR INSTRUCTORS", ["Hauke Sandhaus", "Jonathan Segal"], CLASS_SITE,
         "Syllabus, lecture decks, and every student submission from the course — live demos inside.",
         "Scan to open the class website"))

html = f"""<!doctype html><html><head><meta charset="utf-8"><title>Door notes — final showcase</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  @page {{ size: letter; margin: 0; }}
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ font-family: Inter, sans-serif; color: #1a1a1a; }}
  .page {{ width: 8.5in; height: 11in; padding: 0.55in 0.6in; display: flex; flex-direction: column;
           page-break-after: always; background: #fff; }}
  .band {{ display: flex; justify-content: space-between; background: #0a0c12; color: #00ff41;
           font: 600 11.5pt "JetBrains Mono", monospace; padding: 10pt 14pt; border-radius: 6pt; }}
  .showcase {{ margin-top: 8pt; text-align: center; font: 600 13pt "JetBrains Mono", monospace;
               letter-spacing: 2pt; color: #0a0c12; border: 1.5pt solid #0a0c12; border-radius: 6pt;
               padding: 6pt; }}
  main {{ flex: 1; display: flex; flex-direction: column; justify-content: center; }}
  .value {{ font: 600 14pt "JetBrains Mono", monospace; color: #0f7d2e; margin-bottom: 10pt; }}
  h1 {{ font-size: 44pt; font-weight: 800; line-height: 1.05; letter-spacing: -0.5pt; }}
  .cta {{ font-size: 15.5pt; color: #333; margin: 16pt 0 26pt; max-width: 6.2in; line-height: 1.45; }}
  .cols {{ display: flex; justify-content: space-between; align-items: flex-start; gap: 0.4in; }}
  .lbl {{ font: 600 11pt "JetBrains Mono", monospace; letter-spacing: 2pt; color: #666; margin-bottom: 8pt; }}
  .names {{ list-style: none; }}
  .names li {{ font-size: 21pt; font-weight: 600; line-height: 1.55; }}
  figure {{ text-align: center; width: 2.9in; flex-shrink: 0; }}
  figure img {{ width: 2.6in; height: 2.6in; image-rendering: pixelated; }}
  figcaption {{ font: 600 10.5pt "JetBrains Mono", monospace; color: #333; margin-top: 4pt; }}
  footer {{ display: flex; align-items: center; gap: 10pt; border-top: 1.5pt solid #0a0c12; padding-top: 10pt; }}
  .mini {{ width: 0.85in; height: 0.85in; image-rendering: pixelated; }}
  .flbl {{ font: 600 9.5pt "JetBrains Mono", monospace; letter-spacing: 1pt; }}
  .furl {{ font: 9.5pt "JetBrains Mono", monospace; color: #555; }}
  .tag {{ margin-left: auto; text-align: right; font: 600 11pt "JetBrains Mono", monospace; color: #0f7d2e; }}
</style></head><body>{"".join(pages)}</body></html>"""

(OUT / "door-notes.html").write_text(html)
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                "--print-to-pdf=" + str(OUT / "door-notes.pdf"),
                str(OUT / "door-notes.html")], check=True, capture_output=True)
print("wrote", OUT / "door-notes.pdf")

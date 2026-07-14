# Course slides — build pipeline

The four lecture decks in `../` are generated from these scripts with
[`python-pptx`](https://python-pptx.readthedocs.io/). They share one theme
("Good Code, Good Vibes" — dark bg `#0B0E14`, neon accent `#00FF41`).

## Files
- `deck_common.py` — palette + all slide templates (`cover`, `divider`, `content`,
  `bullets`, `columns`, `big_question`, `media`, `checklist`, `quote`, …). Import with
  `from deck_common import *; prs = init_deck(); … ; save(path)`.
- `build_intro.py` → `../Intro-Good-Code-Good-Vibes.pptx`
- `build_week1.py` → four per-day decks: `../Week1-{Mon,Tue,Wed,Thu}-….pptx`
- `build_week2.py` → `../Week2-{Mon,Tue,Wed,Thu}-….pptx`
- `build_week3.py` → `../Week3-{Mon,Tue,Wed,Thu}-….pptx`

Decks are split **by day** (one file per class session). The live, hand-edited
copies are Google Slides (see `code_deliverable/src/content/slides.js` for the
registry that the course site embeds); these scripts regenerate the originals.

## Regenerate
```bash
# one-time setup (python-pptx isn't in the system Python)
python3 -m venv .venv
./.venv/bin/pip install python-pptx

# build (run from this build/ directory so `deck_common` is importable)
./.venv/bin/python build_intro.py
./.venv/bin/python build_week1.py
./.venv/bin/python build_week2.py
./.venv/bin/python build_week3.py
```

## Preview / QA (optional, macOS with LibreOffice)
```bash
/Applications/LibreOffice.app/Contents/MacOS/soffice --headless \
  --convert-to pdf --outdir /tmp ../Week1-Good-Code-Good-Vibes.pptx
```

## Notes
- The `.pptx` are editable — open in PowerPoint/Keynote, or import into Google Slides
  (File → Import slides). Regenerating overwrites the file, so hand-edits in PowerPoint
  will be lost on the next build; edit the scripts if a change should persist.
- **Media placeholders:** Week 1 & 2 have dashed boxes ("▶ vscode.mp4", "🖼 v0.app result")
  where the original deck's videos/images go — drop them in after import. The embedded
  media couldn't be extracted programmatically.
- Instructor slide links point to the hosted vibe-coded example pages on the class site.

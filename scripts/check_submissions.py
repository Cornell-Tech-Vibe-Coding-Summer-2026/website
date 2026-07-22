#!/usr/bin/env python3
"""Submission-location checker: for every student x activity so far, is each
deliverable in the EXPECTED place?

Per activity we expect, at the activity root (e.g. week2/7_21/):
  - code_deliverable/  with an index that deploys to a real (non-placeholder) page
  - vibe-report.md
  - log_deliverable/history.md

The checker flags three states per item: ok, misplaced (the work exists but in the
wrong path/name — the thing that bit us before), or missing. It prints a compact grid
plus a "needs attention" list naming the exact wrong paths, so a student can self-fix.

Usage: python3 scripts/check_submissions.py            # markdown to stdout
       python3 scripts/check_submissions.py --md out.md # also write a file
Requires: gh (authenticated), network.
"""
import json, re, subprocess, sys, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

ORG = "Cornell-Tech-Vibe-Coding-Summer-2026"
BASE = f"https://{ORG.lower()}.github.io"
GH = "/opt/homebrew/bin/gh"
STAFF = {"HaukeCornell", "Jonathannsegal", "wendyju", "Ayelet-M"}
NAMES = {
    "la523-tech": "Liam Allen", "eb886-ops": "Evan Birnbaum", "vienna-carew": "Vienna Carew",
    "jason-chen3968": "Jason Chen", "kc2386-rgb": "Kylie Cheung", "oliverc70": "Oliver Chung",
    "md2367-888": "Magnes Dugan", "sg2697-ux": "Sebastien Gournay", "c28eh-eng": "Elaine Huang",
    "JohnM-code": "John Maida", "winnie-monroe": "Winnie Monroe", "isaiah-coder11": "Isa Offengenden",
    "oujustinou": "Justin Ou", "or2270": "Om Ravula", "br478-spec": "Jamin Rose",
    "ds2553": "Derin Sezgin", "as4663-hash": "Aria Sharma", "et483-sys": "Emily Tai",
    "ay487-maker": "Ajin Yohannan",
}
# Activities that have happened (through today). Add days as the course proceeds.
ACTIVITIES = [
    ("week1/7_13", "W1 Mon"), ("week1/7_14", "W1 Tue"), ("week1/7_15", "W1 Wed"),
    ("week2/7_20", "W2 Mon"), ("week2/7_21", "W2 Tue"), ("week2/7_22", "W2 Wed"),
]
PLACEHOLDER = ("Your Submission", "Not Found", "404", "Team App (placeholder)")
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.S | re.I)


def repos():
    out = subprocess.run([GH, "repo", "list", ORG, "--limit", "200", "--json", "name",
                          "-q", ".[].name"], capture_output=True, text=True)
    return [r for r in out.stdout.split()
            if r.startswith("class-repo-") and r[len("class-repo-"):] not in STAFF]


def tree(repo):
    """Full recursive path list for the repo's default branch, one API call."""
    for ref in ("main", "master"):
        out = subprocess.run([GH, "api", f"repos/{ORG}/{repo}/git/trees/{ref}?recursive=1"],
                             capture_output=True, text=True)
        try:
            data = json.loads(out.stdout)
            if "tree" in data:
                return [t["path"] for t in data["tree"] if t["type"] == "blob"]
        except Exception:
            pass
    return []


def template_filled(repo, act):
    """True if the student wrote their report INTO vibe-report-template.md instead of
    copying it to vibe-report.md — i.e. the name placeholder is gone / slots are filled."""
    out = subprocess.run([GH, "api", f"repos/{ORG}/{repo}/contents/{act}/vibe-report-template.md"],
                         capture_output=True, text=True)
    try:
        import base64
        md = base64.b64decode(json.loads(out.stdout)["content"]).decode("utf8", "ignore")
    except Exception:
        return False
    name_line = next((l for l in md.splitlines() if "Student Name" in l), "")
    if name_line and "[Your Name]" not in name_line:
        return True   # they replaced the name placeholder → they filled it in
    slots = len(re.findall(r"\[Your [A-Za-z]+\]|\[e\.g\.|\[Describe|\[paste|\[list ", md))
    return slots <= 1   # nearly all placeholders replaced


def app_live(repo, act):
    url = f"{BASE}/{repo}/{act}/code_deliverable/"
    try:
        with urllib.request.urlopen(url, timeout=20) as r:
            if r.status != 200:
                return False
            html = r.read().decode("utf8", "ignore")
    except Exception:
        return False
    m = TITLE_RE.search(html)
    title = " ".join(m.group(1).split()) if m else ""
    return bool(title) and not any(p in title for p in PLACEHOLDER)


def check(repo, act, paths):
    """Return (app, report, log) each in {'ok','misplaced','missing'}.
    Excludes the template scaffolding that's seeded into every repo, so we only flag
    real, student-authored work that's in the wrong place."""
    TEMPLATE = ("vibe-report-template.md", "project-report-template.md", "user-test-template.md")
    # Only the student's own work under the activity — exclude the worked-example folders
    # and template files that are seeded identically into every repo.
    under = [p for p in paths if p.startswith(act + "/")
             and "/examples/" not in p
             and not p.endswith(TEMPLATE)]

    # report: real report file somewhere it shouldn't be
    real_reports = [p for p in under
                    if re.search(r"(report|reflect)[^/]*\.md$", p, re.I)]
    if f"{act}/vibe-report.md" in paths:
        report = "ok"
    elif real_reports:
        report = "misplaced"
    elif f"{act}/vibe-report-template.md" in paths and template_filled(repo, act):
        report = "intemplate"   # wrote the report INTO the template file, not vibe-report.md
    else:
        report = "missing"

    # log: history.md is seeded by the template, so presence = ok for a LOCATION check
    if f"{act}/log_deliverable/history.md" in paths:
        log = "ok"
    elif any(re.search(r"history[^/]*\.md$", p, re.I) for p in under):
        log = "misplaced"
    else:
        log = "missing"

    # app: is the deployed index a real (non-placeholder) page?
    cd_htmls = [p for p in under if p.startswith(f"{act}/code_deliverable/") and p.endswith(".html")]
    built_beyond_starter = [p for p in cd_htmls if p != f"{act}/code_deliverable/index.html"]
    if app_live(repo, act):
        app = "ok"
    elif built_beyond_starter:
        app = "misplaced"   # real pages exist in subfolders/extra files, but the served index is the placeholder
    else:
        app = "missing"     # only the starter index (or nothing) — not built
    return app, report, log


GLYPH = {"ok": "✅", "misplaced": "⚠️", "intemplate": "📄", "missing": "—"}


def main():
    rs = repos()
    print(f"checking {len(rs)} student repos…", file=sys.stderr)
    trees = {}
    with ThreadPoolExecutor(max_workers=10) as pool:
        for repo, t in zip(rs, pool.map(tree, rs)):
            trees[repo] = t

    rows, issues = [], []
    for repo in sorted(rs, key=lambda r: NAMES.get(r[len("class-repo-"):], r)):
        handle = repo[len("class-repo-"):]
        name = NAMES.get(handle, handle)
        cells = []
        with ThreadPoolExecutor(max_workers=6) as pool:
            results = list(pool.map(lambda a: check(repo, a[0], trees[repo]), ACTIVITIES))
        for (act, label), (app, report, log) in zip(ACTIVITIES, results):
            # a cell shows app/report/log health; ✅ = all three ok
            if app == report == log == "ok":
                cells.append("✅")
            elif app == report == log == "missing":
                cells.append("—")
            else:
                cells.append(f"{GLYPH[app]}{GLYPH[report]}{GLYPH[log]}")
            for kind, state in (("app", app), ("report", report), ("log", log)):
                if state == "misplaced":
                    issues.append(f"- **{name}** · {label}: {kind} is in the wrong place or name "
                                  f"(expected `{act}/` per the instructions).")
                elif state == "intemplate":
                    issues.append(f"- **{name}** · {label}: report was written **inside "
                                  f"`vibe-report-template.md`** — copy it to `{act}/vibe-report.md` "
                                  f"so it's graded and shows in the gallery.")
        rows.append((name, cells))

    out = ["# Submission status — expected locations",
           "",
           "Each cell = **app · report · log** for that activity. ✅ in place · "
           "⚠️ present but wrong place/name · 📄 report written inside vibe-report-template.md "
           "(needs copying to vibe-report.md) · — missing.",
           "",
           "| Student | " + " | ".join(l for _, l in ACTIVITIES) + " |",
           "| :--- | " + " | ".join(":---:" for _ in ACTIVITIES) + " |"]
    for name, cells in rows:
        out.append(f"| {name} | " + " | ".join(cells) + " |")
    out += ["", "## Needs attention (work exists but a grader can't find it)", ""]
    out += (issues or ["- Nothing misplaced — every submitted file is where it should be. 🎉"])
    text = "\n".join(out)
    print(text)
    if "--md" in sys.argv:
        open(sys.argv[sys.argv.index("--md") + 1], "w").write(text)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Regenerate the ACTIVITY half of src/content/submissions.js.

Showcase rules — an entry is only listed if BOTH are true:
  * the hosted page returns 200 and isn't the starter placeholder / a soft 404
  * (for the report link) vibe-report.md exists and looks actually written:
    enough prose, and not still full of [bracketed] template slots

The GROUP PROJECT sets are hand-written (team blurbs come from reading each
report) and are preserved verbatim — this script never touches them.

Usage:
    python3 scripts/refresh_submissions.py            # rewrite the file in place
    python3 scripts/refresh_submissions.py --dry-run  # print a summary only

Requires: gh (authenticated), network.
"""
import base64, json, re, subprocess, sys, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

ORG = "Cornell-Tech-Vibe-Coding-Summer-2026"
BASE = f"https://{ORG.lower()}.github.io"
READER = "https://vibe-coding-ethics.tech.cornell.edu/instructions.html?"
GH = "/opt/homebrew/bin/gh"
REGISTRY = __file__.replace("scripts/refresh_submissions.py",
                            "code_deliverable/src/content/submissions.js")

# Sessions in gallery order. Add the next day here when it happens.
ACTIVITIES = [
    ("week1/7_13", "W1 Mon", "Mon · Jul 13", "Personal Portfolio"),
    ("week1/7_14", "W1 Tue", "Tue · Jul 14", "Prompt Engineering"),
    ("week1/7_15", "W1 Wed", "Wed · Jul 15", "Comparing Tools"),
    ("week2/7_20", "W2 Mon", "Mon · Jul 20", "AI as Moral Assistant"),
    ("week2/7_21", "W2 Tue", "Tue · Jul 21", "Red-Teaming Dark Patterns"),
    ("week2/7_22", "W2 Wed", "Wed · Jul 22", "AI Against AI"),
    # week3/7_28 (Value Verification) is deliberately absent: that deliverable is
    # the team pitch decks, which live on the Final entries as `deck:` links.
    ("week3/7_27", "W3 Mon", "Mon · Jul 27", "Usability Testing"),
]

# Instructor/TA/faculty repos stay out of the student showcase.
STAFF = {"HaukeCornell", "Jonathannsegal", "wendyju", "Ayelet-M"}

# Display names by repo handle. Add new students here; unknown handles fall back
# to the handle itself and are reported at the end so you can fill them in.
NAMES = {
    "la523-tech": "Liam Allen", "eb886-ops": "Evan Birnbaum", "vienna-carew": "Vienna Carew",
    "jason-chen3968": "Jason Chen", "kc2386-rgb": "Kylie Cheung", "oliverc70": "Oliver Chung",
    "md2367-888": "Magnes Dugan", "sg2697-ux": "Sebastien Gournay", "c28eh-eng": "Elaine Huang",
    "JohnM-code": "John Maida", "winnie-monroe": "Winnie Monroe", "isaiah-coder11": "Isa Offengenden",
    "oujustinou": "Justin Ou", "or2270": "Om Ravula", "br478-spec": "Jamin Rose",
    "ds2553": "Derin Sezgin", "as4663-hash": "Aria Sharma", "et483-sys": "Emily Tai",
    "ay487-maker": "Ajin Yohannan",
}

PLACEHOLDER_TITLES = ("Your Submission", "Not Found", "404", "Team App (placeholder)")
# Template slots that mean the report wasn't filled in.
TEMPLATE_SLOTS = re.compile(
    r"\[Your Name\]|\[Describe|\[Write your|\[Document|\[paste|\[Your \w+|\[e\.g\.|"
    r"\[Insert|\[Tool/model name\]|\[List all|\[tool/model", re.I)
MIN_REPORT_CHARS = 800          # prose left after stripping comments/markup
MAX_TEMPLATE_SLOTS = 4          # a few stragglers are fine; a wall of them isn't
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.S | re.I)


def gh_json(path):
    out = subprocess.run([GH, "api", path], capture_output=True, text=True)
    try:
        return json.loads(out.stdout)
    except Exception:
        return None


def student_repos():
    out = subprocess.run([GH, "repo", "list", ORG, "--limit", "200", "--json", "name",
                          "-q", ".[].name"], capture_output=True, text=True)
    return [r for r in out.stdout.split()
            if r.startswith("class-repo-") and r[len("class-repo-"):] not in STAFF]


def page_title(url):
    """<title> of a live, non-placeholder page — else None."""
    try:
        with urllib.request.urlopen(url, timeout=25) as r:
            if r.status != 200:
                return None
            html = r.read().decode("utf8", "ignore")
    except Exception:
        return None
    m = TITLE_RE.search(html)
    title = " ".join(m.group(1).split()) if m else ""
    if title and not any(p in title for p in PLACEHOLDER_TITLES):
        return title
    # An overview index that links to the student's own pages counts, even with the
    # starter <title>. Fall back to a neutral label so the gallery entry appears.
    for href in re.findall(r'href=["\']([^"\']+)["\']', html, re.I):
        low = href.lower()
        if low.startswith(("http", "#", "mailto", "//")) or "instructions" in low:
            continue
        if (low.endswith(".html") and low not in ("index.html", "./index.html")) or href.rstrip().endswith("/"):
            return title if title else "Overview"
    return None


def report_ok(repo, act):
    """True when vibe-report.md exists and reads as actually written."""
    data = gh_json(f"repos/{ORG}/{repo}/contents/{act}/vibe-report.md")
    if not isinstance(data, dict) or "content" not in data:
        return False
    try:
        md = base64.b64decode(data["content"]).decode("utf8", "ignore")
    except Exception:
        return False
    body = re.sub(r"<!--.*?-->", "", md, flags=re.S)          # drop template guidance
    slots = len(TEMPLATE_SLOTS.findall(body))
    prose = re.sub(r"[#*`>|\[\]\-\s]+", " ", body).strip()
    return len(prose) >= MIN_REPORT_CHARS and slots <= MAX_TEMPLATE_SLOTS


def check(repo, act):
    handle = repo[len("class-repo-"):]
    url = f"{BASE}/{repo}/{act}/code_deliverable/"
    title = page_title(url)
    if not title:
        return None
    return {
        "handle": handle,
        "student": NAMES.get(handle, handle),
        "known_name": handle in NAMES,
        "title": title,
        "url": url,
        "repo": f"https://github.com/{ORG}/{repo}/tree/main/{act}",
        # Reports render in the course site's markdown reader (styled, images and
        # all) rather than GitHub's blob view. The reader fetches the .md straight
        # from the student's own Pages site.
        "report": (READER + urllib.parse.urlencode({
            "file": f"{BASE}/{repo}/{act}/vibe-report.md",
            "title": f"{NAMES.get(handle, handle)} — vibe report",
        }) if report_ok(repo, act) else None),
    }


def js(value):
    return json.dumps(value, ensure_ascii=False)


def build():
    repos = student_repos()
    print(f"{len(repos)} student repos", file=sys.stderr)
    blocks, unknown = [], set()
    for act, chip, day, label in ACTIVITIES:
        with ThreadPoolExecutor(max_workers=12) as pool:
            results = [r for r in pool.map(lambda rp: check(rp, act), repos) if r]
        results.sort(key=lambda e: e["student"])
        for e in results:
            if not e["known_name"]:
                unknown.add(e["handle"])
        rows = []
        for e in results:
            report = f", report: {js(e['report'])}" if e["report"] else ""
            rows.append(
                f"            {{ id: {js(e['handle'])}, student: {js(e['student'])}, "
                f"title: {js(e['title'])}, url: {js(e['url'])}, repo: {js(e['repo'])}{report} }}")
        with_report = sum(1 for e in results if e["report"])
        print(f"  {chip}: {len(results)} live, {with_report} with a complete report",
              file=sys.stderr)
        blocks.append(
            f"    {{\n        id: {js(act.replace('/', '-'))}, kind: 'activity', chip: {js(chip)}, "
            f"day: {js(day)}, title: {js(label)},\n        entries: [\n"
            + ",\n".join(rows) + ("\n" if rows else "") + "        ],\n    },")
    if unknown:
        print(f"  ⚠ no display name for: {', '.join(sorted(unknown))} — add to NAMES",
              file=sys.stderr)
    return "\n".join(blocks)


def main():
    activities_js = build()
    if "--dry-run" in sys.argv:
        return
    old = open(REGISTRY, encoding="utf8").read()
    head = old[:old.index("export const SUBMISSION_SETS = [") + len("export const SUBMISSION_SETS = [")]
    projects_start = old.index("    {\n        id: 'project1'")
    tail = old[projects_start:]
    open(REGISTRY, "w", encoding="utf8").write(f"{head}\n{activities_js}\n{tail}")
    print(f"wrote {REGISTRY}", file=sys.stderr)


if __name__ == "__main__":
    main()

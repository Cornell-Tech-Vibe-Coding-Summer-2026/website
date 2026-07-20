#!/usr/bin/env bash
# Refresh the student-submissions registry after a class session.
#
#   bash scripts/refresh-submissions.sh          # print what's live now
#
# It probes every student fork's activity pages, keeps only the ones that are
# actually built (untouched starter placeholders are skipped by title), and
# prints registry rows you can paste into
# code_deliverable/src/content/submissions.js.
#
# Group projects are NOT auto-generated — their blurbs are written by hand from
# each team's project-report.md, which is the point (a title alone says little).
#
# Requires: gh (authenticated), curl.
set -uo pipefail

ORG=Cornell-Tech-Vibe-Coding-Summer-2026
BASE=https://cornell-tech-vibe-coding-summer-2026.github.io
PLACEHOLDER='Your Submission'
ACTIVITIES=${ACTIVITIES:-"week1/7_13 week1/7_14 week1/7_15 week2/7_20 week2/7_21 week2/7_22 week3/7_27 week3/7_28"}

probe() {  # repo activity -> "repo|activity|title" when live and not a placeholder
    local repo="$1" act="$2" html title
    html=$(curl -s --max-time 20 "$BASE/$repo/$act/code_deliverable/") || return 0
    [ -z "$html" ] && return 0
    title=$(printf '%s' "$html" | tr '\n' ' ' | sed -n 's/.*<title>\(.*\)<\/title>.*/\1/p' | head -c 120)
    [ -z "$title" ] && return 0
    case "$title" in
        *"$PLACEHOLDER"*) return 0 ;;
        *404*|*"Not Found"*|*"Page not found"*) return 0 ;;   # soft-404 from Pages
    esac
    echo "$repo|$act|$title"
}
export -f probe; export BASE PLACEHOLDER

repos=$(gh repo list "$ORG" --limit 200 --json name -q '.[].name' | grep '^class-repo-')
for act in $ACTIVITIES; do
    echo "=== $act"
    for r in $repos; do echo "$r $act"; done | xargs -P 12 -n 2 bash -c 'probe "$0" "$1"'
done

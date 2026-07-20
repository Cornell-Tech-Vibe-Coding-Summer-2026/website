// Student submissions — live sites for each activity, plus group projects.
//
// ACTIVITIES: every student's fork deploys to
//   https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-<handle>/<week>/<day>/code_deliverable/
// Only submissions that are actually built are listed — untouched starter
// placeholders are filtered out. Re-generate after each class with:
//   bash scripts/refresh-submissions.sh   (writes this file; review the diff)
//
// `title` is scraped from each page's <title>. Student display names are
// hand-mapped from the roster — fix any that read wrong, they're just strings.

export const SUBMISSION_SETS = [
    {
        id: 'week1-7_13', kind: 'activity', chip: 'W1 Mon', day: 'Mon · Jul 13', title: "Personal Portfolio",
        entries: [
            { id: 'ay487-maker', student: "Ajin Yohannan", title: "About Me \u00b7 Ajin Yohannan", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-ay487-maker/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-ay487-maker/tree/main/week1/7_13' },
            { id: 'ds2553', student: "Derin Sezgin", title: "Derin Ege Sezgin | SDG Youth Connect", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-ds2553/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-ds2553/tree/main/week1/7_13' },
            { id: 'c28eh-eng', student: "Elaine Huang", title: "Elaine Huang", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-c28eh-eng/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-c28eh-eng/tree/main/week1/7_13' },
            { id: 'et483-sys', student: "Emily Tai", title: "Emily | Personal Website", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-et483-sys/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-et483-sys/tree/main/week1/7_13' },
            { id: 'eb886-ops', student: "Evan Birnbaum", title: "About Evan \u00b7 Ethical Vibe Coding", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-eb886-ops/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-eb886-ops/tree/main/week1/7_13' },
            { id: 'isaiah-coder11', student: "Isa Offengenden", title: "Isa-Offengenden's bio \u00b7 Ethical Vibe Coding", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-isaiah-coder11/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-isaiah-coder11/tree/main/week1/7_13' },
            { id: 'br478-spec', student: "Jamin Rose", title: "Benjamin Jamin Rose \u00b7 Portfolio Page", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-br478-spec/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-br478-spec/tree/main/week1/7_13' },
            { id: 'jason-chen3968', student: "Jason Chen", title: "Jason Chen | About Me", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-jason-chen3968/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-jason-chen3968/tree/main/week1/7_13' },
            { id: 'JohnM-code', student: "John Maida", title: "John Maida \u00b7 Personal Page", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-JohnM-code/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-JohnM-code/tree/main/week1/7_13' },
            { id: 'oujustinou', student: "Justin Ou", title: "Justin Ou \u2014 About Me", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-oujustinou/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-oujustinou/tree/main/week1/7_13' },
            { id: 'kc2386-rgb', student: "Kylie Cheung", title: "Kylie Cheung \u00b7 Personal Website", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-kc2386-rgb/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-kc2386-rgb/tree/main/week1/7_13' },
            { id: 'la523-tech', student: "Liam Allen", title: "Liam Allen | Portfolio", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-la523-tech/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-la523-tech/tree/main/week1/7_13' },
            { id: 'md2367-888', student: "Magnes Dugan", title: "Magnes Dugan \u00b7 Personal Website", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-md2367-888/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-md2367-888/tree/main/week1/7_13' },
            { id: 'oliverc70', student: "Oliver Chung", title: "About Oliver Chung", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-oliverc70/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-oliverc70/tree/main/week1/7_13' },
            { id: 'or2270', student: "Om Ravula", title: "Week 1 - 7/13", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-or2270/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-or2270/tree/main/week1/7_13' },
            { id: 'sg2697-ux', student: "Sebastien Gournay", title: "Sebastien Gournay \u00b7 About Me", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-sg2697-ux/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-sg2697-ux/tree/main/week1/7_13' },
            { id: 'vienna-carew', student: "Vienna Carew", title: "Vienna Carew \u00b7 Personal Website", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-vienna-carew/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-vienna-carew/tree/main/week1/7_13' },
            { id: 'winnie-monroe', student: "Winnie Monroe", title: "Winnie Monroe \u00b7 About Me", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-winnie-monroe/week1/7_13/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-winnie-monroe/tree/main/week1/7_13' }
        ],
    },
    {
        id: 'week1-7_14', kind: 'activity', chip: 'W1 Tue', day: 'Tue · Jul 14', title: "Prompt Engineering",
        entries: [
            { id: 'as4663-hash', student: "Aria Sharma", title: "Lawrenceville Club Finder \u00b7 Version Overview", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-as4663-hash/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-as4663-hash/tree/main/week1/7_14' },
            { id: 'ds2553', student: "Derin Sezgin", title: "Prompt Comparison Gallery", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-ds2553/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-ds2553/tree/main/week1/7_14' },
            { id: 'eb886-ops', student: "Evan Birnbaum", title: "Daily Pomodoro Timer", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-eb886-ops/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-eb886-ops/tree/main/week1/7_14' },
            { id: 'isaiah-coder11', student: "Isa Offengenden", title: "Magic 8 Ball", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-isaiah-coder11/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-isaiah-coder11/tree/main/week1/7_14' },
            { id: 'br478-spec', student: "Jamin Rose", title: "Recovery Log \u00b7 Ethical Vibe Coding", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-br478-spec/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-br478-spec/tree/main/week1/7_14' },
            { id: 'oujustinou', student: "Justin Ou", title: "Pomodoro + Chess", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-oujustinou/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-oujustinou/tree/main/week1/7_14' },
            { id: 'md2367-888', student: "Magnes Dugan", title: "Week 1 Day 4 \u2014 7_14 Pages", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-md2367-888/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-md2367-888/tree/main/week1/7_14' },
            { id: 'oliverc70', student: "Oliver Chung", title: "Chill Clock Toggle", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-oliverc70/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-oliverc70/tree/main/week1/7_14' },
            { id: 'or2270', student: "Om Ravula", title: "Prompt Engineering Lab", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-or2270/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-or2270/tree/main/week1/7_14' },
            { id: 'vienna-carew', student: "Vienna Carew", title: "Rainy Caf\u00e9 Prompt Gallery", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-vienna-carew/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-vienna-carew/tree/main/week1/7_14' },
            { id: 'winnie-monroe', student: "Winnie Monroe", title: "Pomodoro Timer", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-winnie-monroe/week1/7_14/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-winnie-monroe/tree/main/week1/7_14' }
        ],
    },
    {
        id: 'week1-7_15', kind: 'activity', chip: 'W1 Wed', day: 'Wed · Jul 15', title: "Comparing Tools",
        entries: [
            { id: 'as4663-hash', student: "Aria Sharma", title: "Whose Defaults? | Vibe Coding Comparison", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-as4663-hash/week1/7_15/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-as4663-hash/tree/main/week1/7_15' },
            { id: 'ds2553', student: "Derin Sezgin", title: "Week 1 Day 3 \u00b7 Galatasaray Fan Experience", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-ds2553/week1/7_15/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-ds2553/tree/main/week1/7_15' },
            { id: 'eb886-ops', student: "Evan Birnbaum", title: "AI Tool Pages", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-eb886-ops/week1/7_15/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-eb886-ops/tree/main/week1/7_15' },
            { id: 'isaiah-coder11', student: "Isa Offengenden", title: "Interactive Quiz App", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-isaiah-coder11/week1/7_15/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-isaiah-coder11/tree/main/week1/7_15' },
            { id: 'oujustinou', student: "Justin Ou", title: "To-Do List \u00b7 Three-Tool Comparison", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-oujustinou/week1/7_15/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-oujustinou/tree/main/week1/7_15' },
            { id: 'la523-tech', student: "Liam Allen", title: "AI Todo List Comparison Dashboard", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-la523-tech/week1/7_15/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-la523-tech/tree/main/week1/7_15' },
            { id: 'md2367-888', student: "Magnes Dugan", title: "Ultimate Tic Tac Toe", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-md2367-888/week1/7_15/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-md2367-888/tree/main/week1/7_15' },
            { id: 'vienna-carew', student: "Vienna Carew", title: "Flashcard Lab", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-vienna-carew/week1/7_15/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-vienna-carew/tree/main/week1/7_15' }
        ],
    },
    {
        id: 'week2-7_20', kind: 'activity', chip: 'W2 Mon', day: 'Mon · Jul 20', title: "AI as Moral Assistant",
        entries: [
            { id: 'ay487-maker', student: "Ajin Yohannan", title: "Facial Recognition: Privacy vs. Security", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-ay487-maker/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-ay487-maker/tree/main/week2/7_20' },
            { id: 'ds2553', student: "Derin Sezgin", title: "ClimateHonest | July 20 Project", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-ds2553/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-ds2553/tree/main/week2/7_20' },
            { id: 'c28eh-eng', student: "Elaine Huang", title: "Screen Time Cost Converter", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-c28eh-eng/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-c28eh-eng/tree/main/week2/7_20' },
            { id: 'et483-sys', student: "Emily Tai", title: "Second Life \u00b7 disposal decision guide", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-et483-sys/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-et483-sys/tree/main/week2/7_20' },
            { id: 'eb886-ops', student: "Evan Birnbaum", title: "Carbon Honesty + Offset", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-eb886-ops/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-eb886-ops/tree/main/week2/7_20' },
            { id: 'isaiah-coder11', student: "Isa Offengenden", title: "The Real Cost of Crime | Educational Resource", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-isaiah-coder11/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-isaiah-coder11/tree/main/week2/7_20' },
            { id: 'jason-chen3968', student: "Jason Chen", title: "Choose Health \u2014 Don't Smoke", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-jason-chen3968/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-jason-chen3968/tree/main/week2/7_20' },
            { id: 'JohnM-code', student: "John Maida", title: "Spectrum Check \u2014 read past your own side", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-JohnM-code/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-JohnM-code/tree/main/week2/7_20' },
            { id: 'oujustinou', student: "Justin Ou", title: "RealCrime \u00b7 Small Crime, Big Consequences", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-oujustinou/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-oujustinou/tree/main/week2/7_20' },
            { id: 'kc2386-rgb', student: "Kylie Cheung", title: "Carbon Footprint Guide \u00b7 Ethical Vibe Coding", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-kc2386-rgb/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-kc2386-rgb/tree/main/week2/7_20' },
            { id: 'md2367-888', student: "Magnes Dugan", title: "Wattwise | Everyday Habit Guide", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-md2367-888/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-md2367-888/tree/main/week2/7_20' },
            { id: 'oliverc70', student: "Oliver Chung", title: "Wattwise | Everyday Habit Guide", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-oliverc70/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-oliverc70/tree/main/week2/7_20' },
            { id: 'or2270', student: "Om Ravula", title: "Vegetarian Food Diary", url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/class-repo-or2270/week2/7_20/code_deliverable/', repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/class-repo-or2270/tree/main/week2/7_20' }
        ],
    },
    {
        id: 'week2-7_21', kind: 'activity', chip: 'W2 Tue', day: 'Tue · Jul 21', title: "Red-Teaming Dark Patterns",
        entries: [

        ],
    },
    {
        id: 'week2-7_22', kind: 'activity', chip: 'W2 Wed', day: 'Wed · Jul 22', title: "AI Against AI",
        entries: [

        ],
    },
    {
        id: 'week3-7_27', kind: 'activity', chip: 'W3 Mon', day: 'Mon · Jul 27', title: "User Testing I",
        entries: [

        ],
    },
    {
        id: 'week3-7_28', kind: 'activity', chip: 'W3 Tue', day: 'Tue · Jul 28', title: "User Testing II",
        entries: [

        ],
    },
    {
        id: 'project1', kind: 'project', chip: 'Proj 1', day: 'Due Mon · Jul 20', title: "Project 1 — Vibe code something your team wants",
        entries: [
            { id: 'meet-in-the-middle', team: "Meet in the Middle", members: "Evan Birnbaum · Derin Sezgin · Magnes Dugan · Oliver Chung",
              blurb: "Finds a fair meeting spot in NYC for a group — everyone enters where they're coming from, it picks the middle.",
              url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/group-project-1-templated-guantanamo-bay-mcdonalds/code_deliverable/',
              repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-guantanamo-bay-mcdonalds',
              report: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-guantanamo-bay-mcdonalds/blob/main/project-report.md' },
            { id: 'study-buddy', team: "Study Buddy", members: "Kylie Cheung · Emily Tai · Aria Sharma",
              blurb: "Turns studying into a learning adventure — a companion that keeps you moving through material.",
              url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/group-project-1-templated-kea/code_deliverable/',
              repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-kea',
              report: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-kea/blob/main/project-report.md' },
            { id: 'priorical', team: "PrioriCal", members: "Isa Offengenden · Om Ravula · Jason Chen",
              blurb: "A calendar that prioritizes for you — sorts what actually matters out of a crowded week.",
              url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/group-project-1-templated-team-2/code_deliverable/',
              repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-team-2',
              report: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-team-2/blob/main/project-report.md' },
            { id: 'payrep', team: "PayRep", members: "Ajin Yohannan · Jamin Rose · John Maida",
              blurb: "Settle up and keep score — tracks who paid last so the next round is obvious.",
              url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/group-project-1-templated-jamin-s-team/code_deliverable/',
              repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-jamin-s-team',
              report: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-jamin-s-team/blob/main/project-report.md' },
            { id: 'depop-finder', team: "Depop Finder", members: "Vienna Carew · Winnie Monroe · Elaine Huang",
              blurb: "Secondhand price check — is that resale listing actually a good deal?",
              url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/group-project-1-templated-vew/code_deliverable/',
              repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-vew',
              report: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-vew/blob/main/project-report.md' },
            { id: 'food-save', team: "Food Save", members: "Justin Ou · Liam Allen · Sebastien Gournay",
              blurb: "Global culinary abundance — cut food waste by making what you already have into a meal.",
              url: 'https://cornell-tech-vibe-coding-summer-2026.github.io/group-project-1-templated-team-1/code_deliverable/',
              repo: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-team-1',
              report: 'https://github.com/Cornell-Tech-Vibe-Coding-Summer-2026/group-project-1-templated-team-1/blob/main/project-report.md' },
        ],
    },
    { id: 'project2', kind: 'project', chip: 'Proj 2', day: 'Due Mon · Jul 27', title: "Project 2 — Build for a human value", entries: [] },
    { id: 'final', kind: 'project', chip: 'Final', day: 'Thu · Jul 30', title: "Final Project — Benefit someone outside the class", entries: [] },
]

// Sets with no entries yet render a "posted after class" placeholder.
export const hasEntries = (set) => Array.isArray(set.entries) && set.entries.length > 0

#!/usr/bin/env python3
"""Standalone Sources slides for the W2 Wed 'AI Against AI' deck.
Import into Google Slides (File > Import slides) and copy the ones you want.
All framework/incident URLs were fetch-verified; the defense-tool URLs were
checked to resolve (200) on 2026-07-22."""

from deck_common import *
prs = init_deck()

FOOT = "AI Against AI · Sources · TECHIE 1121 · Cornell Tech"

refs("SOURCES · 1 / 4", "Frameworks & taxonomy", [
    ("Weidinger et al. 2022, Taxonomy of Risks (FAccT)", "https://doi.org/10.1145/3531146.3533088"),
    ("Shelby et al. 2023, Sociotechnical Harms (AIES)", "https://doi.org/10.1145/3600211.3604673"),
    ("Solaiman et al. 2023, Social Impact of Generative AI", "https://arxiv.org/abs/2306.05949"),
    ("Bender & Gebru et al. 2021, Stochastic Parrots (FAccT)", "https://doi.org/10.1145/3442188.3445922"),
    ("MIT AI Risk Repository (2024)", "https://airisk.mit.edu/"),
    ("NIST AI Risk Management Framework (2023)", "https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf"),
    ("EU AI Act, Article 5 (prohibited practices)", "https://artificialintelligenceact.eu/article/5/"),
    ("AI Incident Database", "https://incidentdatabase.ai/"),
    ("AIAAIC harms taxonomy", "https://www.aiaaic.org/projects/ai-algorithmic-risks-harms-taxonomy"),
], FOOT, accent_color=RED)

refs("SOURCES · 2 / 4", "The cases — deepfakes, fraud, democracy, chatbots", [
    ("Taylor Swift deepfakes on X — PBS / AP", "https://www.pbs.org/newshour/nation/x-blocks-some-taylor-swift-searches-as-deepfake-explicit-images-circulate"),
    ("NJ high-school deepfakes (Westfield) — CNN", "https://www.cnn.com/2023/11/04/us/new-jersey-high-school-deepfake-porn/index.html"),
    ("Fake Biden robocall, $6M FCC fine — NPR", "https://www.npr.org/2024/05/23/nx-s1-4977582/fcc-ai-deepfake-robocall-biden-new-hampshire-political-operative"),
    ("Arup $25M deepfake-CFO fraud — CNN Business", "https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk"),
    ("Character.AI / Sewell Setzer settlement — CBS", "https://www.cbsnews.com/news/google-settle-lawsuit-florida-teens-suicide-character-ai-chatbot/"),
], FOOT, accent_color=RED)

refs("SOURCES · 3 / 4", "The cases — fairness, privacy, labor, environment, IP", [
    ("Dutch benefits algorithm (toeslagenaffaire) — Al Jazeera", "https://www.aljazeera.com/news/2021/1/15/dutch-pm-rutte-and-his-government-quit-over-child-welfare-scandal"),
    ("Anthropic ~$1.5B authors settlement — TechCrunch", "https://techcrunch.com/2026/07/20/anthropics-landmark-1-5b-copyright-settlement-is-approved/"),
    ("Clearview AI (3B+ faces scraped) — NYT", "https://www.nytimes.com/2020/01/18/technology/clearview-privacy-facial-recognition.html"),
    ("Facial-recognition wrongful arrest (R. Williams) — NYT", "https://www.nytimes.com/2020/06/24/technology/facial-recognition-arrest.html"),
    ("Kenyan data labelers (~$2/hr) — TIME", "https://time.com/6247678/openai-chatgpt-kenya-workers/"),
    ("AI water footprint (~700,000 L) — Li et al. 2023", "https://arxiv.org/abs/2304.03271"),
    ("Datacenter emissions (Google +48%) — NPR", "https://www.npr.org/2024/07/12/g-s1-9545/ai-brings-soaring-emissions-for-google-and-microsoft"),
], FOOT, accent_color=RED)

refs("SOURCES · 4 / 4", "Defenses & tools", [
    ("Obfuscation — Brunton & Nissenbaum (MIT Press)", "https://direct.mit.edu/books/book/3112/ObfuscationA-User-s-Guide-for-Privacy-and-Protest"),
    ("China ‘colleague.skill’ / anti-distillation — OfficeChai", "https://officechai.com/ai/chinas-workers-are-weaponizing-ai-against-each-other-through-colleague-skill-files-and-fighting-back/"),
    ("Privacy of Groups in Dense Street Imagery — Franchi, Sandhaus et al. (FAccT 2025)", "https://doi.org/10.1145/3715275.3732185"),
    ("Glaze (style cloaking) — SAND Lab, UChicago", "https://glaze.cs.uchicago.edu/"),
    ("Nightshade (data poisoning) — SAND Lab, UChicago", "https://nightshade.cs.uchicago.edu/"),
    ("PhotoGuard (anti-deepfake immunization) — MIT", "https://gradientscience.org/photoguard/"),
    ("C2PA / Content Credentials (provenance)", "https://c2pa.org/"),
], FOOT, accent_color=GREEN)

n = save("/Users/haukesandhaus/Documents/GitHub/Vibe-Coding-Class/website/slides/Week2-Wed-Sources.pptx")
print(f"Sources deck saved: {n} slides")

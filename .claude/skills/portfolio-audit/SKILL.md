---
name: portfolio-audit
description: "Report-only audit of softwarerebel.com and its repo: stale copy, build health, deploy status, SEO and accessibility basics. Use when asked to audit or check the portfolio."

# Portfolio audit (report-only)

Report findings. Do not edit files, push, or open PRs unless asked.
Verify every claim against the code or the live site before stating it.

## Steps
1. Clone ImranK1506/software-rebel (read-only, depth 1). Note the latest commit hash and date.
2. Stale copy: grep the repo for dated or time-bound text ("Q2", "2026", "Freelance", "Currently") and for removed components that are still referenced.
3. Consistency: compare the hero, About and meta description in index.html. Skills and years must match everywhere.
4. Build health: install, then run lint, typecheck and build. Record JS bundle size.
5. Head and SEO: check index.html for title, description, og and twitter tags, canonical, JSON-LD, and that public/sitemap.xml and robots.txt exist.
6. Accessibility: look for a <main>, one <h1>, skip link, nav items as real links, and labels under 0.75rem.
7. Deploy: compare the live site's head tags with the repo. If they differ, the deploy is stale.
   Read the live site with WebFetch; it only shows head metadata
   because the page renders client-side.
   If the GitHub API is blocked, ask the user to check the Actions tab.

## Output
A table: Check | Result | Evidence (file:line or URL).
Then the top 3 issues by impact. Mark anything not verifiable as "unverified".
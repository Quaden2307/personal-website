# Personal Website Structure

## Goal
A single-page (with smooth-scroll sections) personal website that gives recruiters everything they need in under 60 seconds, while still feeling visually distinct and memorable. Clean, modern, professional — but with one or two subtle "wow" details so it doesn't look like a template.

---

## Design Direction

- **Style:** Minimal, modern, type-driven. Lots of whitespace. One accent color against a neutral background.
- **Theme:** Dark mode as default with a light-mode toggle (or vice versa — TBD).
- **Typography:** A clean sans-serif for body (Inter / Geist / Söhne) paired with a slightly more characterful display font for headings (e.g. Instrument Serif, or a mono for a "developer" feel).
- **Layout:** Single page, sticky top nav that highlights the current section as you scroll.
- **Motion:** Subtle. Fade-ins on scroll, smooth section transitions. No carousels, no parallax overload.
- **The "wow" detail (pick one, not all):**
  - Animated gradient or noise-grain background
  - A small interactive element on the hero (typing animation, cursor follower, or 3D object)
  - Custom cursor on desktop
  - Hover-reveal project cards

---

## Top Navigation

Sticky, minimal. Shows on every section.

- Logo / monogram (left) — clicking scrolls to top
- Section links (right): `About` · `Experience` · `Projects` · `Education` · `Contact`
- A `Resume` button (downloads PDF) as the visual anchor on the right
- Theme toggle (sun/moon icon)

---

## Section 1 — Hero / Landing

**Purpose:** First impression. Recruiter knows who you are and what you do within 3 seconds.

- **Name:** `[FULL NAME]`
- **Tagline / one-liner:** `[e.g. "CS student building tools for X" or "Software engineer focused on Y"]`
- **Sub-line:** Currently `[role/program]` at `[school/company]`. Previously `[notable past role]`.
- **Primary CTA:** "View my work" → scrolls to Projects
- **Secondary CTA:** "Get in touch" → scrolls to Contact
- **Social row (small icons):** GitHub · LinkedIn · Email · X/Twitter (optional)

---

## Section 2 — About

**Purpose:** Humanize the resume. 2 short paragraphs max.

- **Paragraph 1 — the professional pitch:** Who you are, what you build, what you care about technically. `[PLACEHOLDER]`
- **Paragraph 2 — the personal note:** What you do outside of work / what makes you you. Keep it brief and authentic. `[PLACEHOLDER]`
- **Optional side card:** A photo of you (professional but not stiff) OR a "currently" widget:
  - Currently reading: `[BOOK]`
  - Currently learning: `[TOPIC]`
  - Currently based in: `[CITY]`

---

## Section 3 — Experience

**Purpose:** The resume bullets, but readable. Reverse-chronological.

**Layout:** Vertical timeline OR a clean two-column list (date on left, role on right).

For each entry:
- **Role:** `[TITLE]`
- **Company:** `[COMPANY]` (with logo, optional)
- **Dates:** `[START — END]`
- **Location:** `[CITY / REMOTE]`
- **2–4 bullet points:** Each bullet should be impact-first (number or outcome) and tech-aware.
  - `[PLACEHOLDER bullet 1]`
  - `[PLACEHOLDER bullet 2]`
  - `[PLACEHOLDER bullet 3]`
- **Tech tags:** `[Tag, Tag, Tag]`

Repeat block for each experience. Plan for 3–5 entries.

---

## Section 4 — Projects

**Purpose:** Show, don't tell. This is what recruiters actually click through.

**Layout:** 2-column grid on desktop, single column on mobile. 4–6 featured projects.

For each project card:
- **Cover image / GIF / screenshot** (hover to play if GIF)
- **Project name:** `[NAME]`
- **One-line description:** `[WHAT IT DOES, in plain English]`
- **Tech stack tags:** `[React, TypeScript, Postgres, ...]`
- **Links:** `Live demo` · `GitHub` · `Case study` (whichever apply)
- **Optional:** A star/featured badge on the 1–2 most important ones.

Below the grid: a small "See more on GitHub →" link to your profile.

---

## Section 5 — Education

**Purpose:** Quick credibility block. Keep it tight.

- **School:** `[SCHOOL NAME]`
- **Degree:** `[DEGREE, MAJOR]` (e.g. B.S. in Computer Science)
- **Dates:** `[START — EXPECTED GRADUATION]`
- **GPA:** `[X.XX / 4.00]` (only if it helps you)
- **Relevant coursework:** `[Course, Course, Course, ...]`
- **Honors / activities:** `[Dean's List, club leadership, etc.]`
- **(Optional) Previous school:** `[HIGH SCHOOL]` if it's especially notable

---

## Section 6 — Skills

**Purpose:** Keyword-scannable. Recruiters and ATS-style filters will look here.

**Layout:** Grouped pills/tags, not a bar chart. (Skill bars look dated and aren't honest.)

- **Languages:** `[Python, TypeScript, Go, ...]`
- **Frameworks & libraries:** `[React, Next.js, FastAPI, ...]`
- **Infra & tools:** `[Docker, AWS, Postgres, Git, ...]`
- **Other:** `[Figma, Linear, ...]`

---

## Section 7 — Awards & Achievements *(optional, only if you have them)*

- `[AWARD NAME]` — `[ORG, YEAR]` — `[1-line context]`
- `[HACKATHON WIN]` — `[EVENT, YEAR]`
- `[SCHOLARSHIP / RECOGNITION]`
- `[CERTIFICATIONS]`

---

## Section 8 — Writing / Blog *(optional)*

Only include if you actually write. An empty blog hurts more than no blog.

- 2–3 most recent posts: title, date, 1-line description, link.

---

## Section 9 — Contact

**Purpose:** Make it dead simple to reach you.

- **Headline:** "Let's talk" or "Reach out"
- **Sub-line:** 1 sentence — what you're open to (e.g. "Open to summer internships in SWE / ML.")
- **Primary action:** Big mailto button with your email: `[EMAIL]`
- **Links row:**
  - LinkedIn: `[URL]`
  - GitHub: `[URL]`
  - Resume PDF: `[FILE]`
  - X / Twitter: `[URL]` (optional)
  - Scheduling link (Calendly/Cal.com): `[URL]` (optional)

---

## Footer

- Small. Just: `© [YEAR] [NAME]` · `Built with [stack]` · back-to-top arrow.
- Optionally: a fun easter-egg line ("Made in [city] at 2am" / a favorite quote).

---

## Technical Stack (proposed — open to change)

- **Framework:** Next.js (App Router) or Astro
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (sparingly) or pure CSS
- **Deployment:** Vercel (free, fast, custom domain)
- **Domain:** `[yourname].com` or `[yourname].dev`
- **Analytics:** Vercel Analytics or Plausible (privacy-friendly)
- **SEO:** Proper meta tags, OG image, sitemap, favicon

---

## Content Priorities (what recruiters care about, in order)

1. **Name + one-line pitch** (hero)
2. **Experience bullets with impact** (experience)
3. **Featured projects with live links** (projects)
4. **Easy contact + resume download** (nav button + contact)
5. **Education + skills** (credibility check)
6. Everything else

If any section can't be filled meaningfully, cut it. An empty section is worse than no section.

---

## Open Questions / Decisions Needed

- [ caden sun (just my name); it would be nice to deploy it on vercel. I want to add the deployed app vercel link to my linkedin so it can be accesed by recruiters ] Domain name?
- [ Dark ] Dark mode default or light mode default?
- [ deep blue is fine, but keeping it mostly dark/black] One accent color — which? (suggest: a deep blue, electric green, or warm orange)
- [ Yes] Include a photo of yourself? (recommended yes, but not required)
- [ resume as a pdf; ] Resume hosted as PDF only, or also a `/resume` HTML page?
- [ interactive background/mouse hovers. ] Which "wow" detail to commit to?
- [ dont know yet ] Blog: yes / no / later?

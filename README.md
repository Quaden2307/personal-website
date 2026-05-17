# Caden Sun — Personal Site

Single-page personal site built with Next.js, Tailwind CSS, and deployed to Vercel.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Fill in your content

All placeholders are in `[brackets]`. Search the repo for `[` to find them. The main spots:

- **`components/Hero.tsx`** — tagline, current role, GitHub/LinkedIn URLs
- **`components/About.tsx`** — about paragraphs + "currently" widget + photo (`/public/photo.jpg`)
- **`components/Experience.tsx`** — `roles` array
- **`components/Projects.tsx`** — `projects` array
- **`components/Education.tsx`** — school, GPA, coursework
- **`components/Skills.tsx`** — `groups` array
- **`components/Contact.tsx`** — open-to message, social URLs
- **`public/resume.pdf`** — drop your resume PDF here

Search `[USERNAME]` to replace GitHub / LinkedIn handles.

## Deploy

```bash
# from the project root, after `npm i -g vercel`
vercel
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).

## Structure

See [STRUCTURE.md](STRUCTURE.md) for the section-by-section layout plan.

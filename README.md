# Caden Sun — Personal Site

https://cadensun.vercel.app/

The site is a spiral notebook on a sand desk. It fills one screen and never scrolls: the cover says "Click to open", and clicking a page turns it (so do the arrow keys, and a swipe on a phone). Wide screens show the open spread; narrow screens show one page at a time. The contents page and links like `/#projects` jump straight to a chapter.

On the left of the notebook a pencil case has spilled, and its stationery is how to get in touch: the pencil (stamped with the email address) writes an email, the eraser opens GitHub, and the sticky note opens LinkedIn. The ruler, highlighter, sharpener and paper clips are just stationery. On the right a ragdoll cat lies batting at a ball of yarn that hangs from the top of the screen. Press and hold the yarn, drag it and let go to throw it: the cat watches it, pounces after it along the foot of the screen and swipes at it, and then the thread reels it back up. From the keyboard, Enter on the yarn tosses it.

## Editing the content

Every word, link and picture lives in `lib/content.ts`. Change the text there and the pages follow; the components only lay it out.

- Every page has to fit on its sheet of paper, because nothing scrolls. Keep a summary to four or five written lines, and after editing look at the longest pages on a phone-sized window (390×844).
- Titles, headings and the cover label are written in GingerInk, whose free version has letters only (no digits or punctuation). Keep those to letters and spaces; everything else is in Patrick Hand.
- The pages and their order are listed in `faces()` in `components/Notebook.tsx`. Pages come in pairs (the front and back of one leaf), so add or remove them two at a time, and keep the printed page numbers and `contents.entries` in step.
- Pictures go in `public/images/`, logos in `public/logos/`. Give each picture its real `width`, `height` and an `alt`.
- The cat judge's verdicts were produced by the classifier on exactly those pictures. If you swap a picture, judge it again at https://cat-classifier-five.vercel.app/. Besides Caden's own cat, the three cats come from the classifier's test set.
- The back cover is the ways to get in touch (`backCover.links`) and a button that turns the book back to the front cover.
- The stationery's links and labels are `desk` in `lib/content.ts`; the drawings are in `components/Desk.tsx` and their places in `Desk.module.css` (a column on the left of the book on most screens, a strip under the page on a phone held upright).
- The yarn's label (for screen readers) is `cat` in `lib/content.ts`; the cat is drawn in `components/Cat.tsx`, and `lib/yarn.ts` throws the yarn and moves the cat. The cat shows only where the right of the book has room for it, so not on phones held upright or on narrower laptops and tablets.

## Running it

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, as Vercel runs it
```

## How it is built

- Next.js app router, React, TypeScript, CSS modules. Colour tokens are in `app/globals.css`.
- `components/Notebook.tsx` stacks the leaves, `components/Pages.tsx` holds the page templates, `components/Desk.tsx` lays out the stationery, `components/Cat.tsx` draws the cat, and `lib/notebook.ts` turns the pages and `lib/yarn.ts` plays with the yarn (plain DOM code, mounted by the components in `components/behaviour/`).
- Sizes on a page are relative to the page itself (container query units), so the writing stays on the ruled lines at every window size.
- Without JavaScript the pages are simply stacked and the site scrolls. With reduced motion the pages change without the turning animation.
- Fonts: Patrick Hand (SIL Open Font License) comes from Google Fonts through `next/font`. GingerInk (by yebhutype) and General Sans (Fontshare) are downloaded into `public/fonts/` by `scripts/fetch-fonts.mjs` before every `npm run dev` and `npm run build` (Vercel runs it too). Neither licence allows redistributing the font files through a public repository, so `public/fonts/` is gitignored.
- GingerInk's free version is licensed for personal, non-commercial use. A commercial licence is sold at https://yebhutype.gumroad.com/l/GingerInk.

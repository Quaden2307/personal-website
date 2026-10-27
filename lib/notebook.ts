/*
  The notebook's page turning, as plain DOM code (the React component only mounts it).

  The book is a stack of leaves; each leaf has a front face (a right-hand page) and a
  back face (the left-hand page once the leaf is turned). Faces are numbered in reading
  order: face 2k is the front of leaf k, face 2k+1 its back. Turning to face f means the
  first ceil(f / 2) leaves lie turned over on the left.

  Wide screens show the open spread (two pages); narrow or tall screens show one page,
  and the book slides so that page sits in the window.
*/

export const SPREAD_QUERY = "(min-width: 900px) and (min-height: 560px) and (orientation: landscape)";
const CALM_QUERY = "(prefers-reduced-motion: reduce)";
const IGNORE = "a, button, input, label, select, textarea, video, [data-no-turn]";

export function attachNotebook(root: HTMLElement): () => void {
  const book = root.querySelector<HTMLElement>("[data-book]");
  if (!book) return () => {};
  const leaves = Array.from(book.querySelectorAll<HTMLElement>("[data-leaf]"));
  const faces = Array.from(book.querySelectorAll<HTMLElement>("[data-face]")).sort(
    (a, b) => Number(a.dataset.face) - Number(b.dataset.face),
  );
  const announcer = root.querySelector<HTMLElement>("[data-announce]");
  const count = leaves.length;
  const last = faces.length - 1;
  const spread = window.matchMedia(SPREAD_QUERY);
  const calm = window.matchMedia(CALM_QUERY);
  const timers = new Map<HTMLElement, number>();

  const chapterFace = (chapter: string) => faces.findIndex((el) => el.dataset.chapter === chapter);
  const initial = () => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const found = hash ? chapterFace(hash) : -1;
    return found >= 0 ? found : 0;
  };

  let face = initial();

  /** Static stacking: the top unturned leaf on the right, the last turned leaf on the left. */
  const restingZ = (i: number, flipped: boolean) => (flipped ? i + 1 : count - i);

  const visibleFaces = () => {
    if (!spread.matches) return [face];
    const s = Math.ceil(face / 2);
    const shown: number[] = [];
    if (s >= 1) shown.push(2 * s - 1);
    if (s < count) shown.push(2 * s);
    return shown;
  };

  const render = (animate: boolean) => {
    const flippedCount = Math.ceil(face / 2);
    const changing = leaves.filter((leaf, i) => leaf.hasAttribute("data-flipped") !== i < flippedCount);
    const forward = changing.length > 0 && !changing[0].hasAttribute("data-flipped");
    const instant = !animate || calm.matches;
    book.toggleAttribute("data-instant", instant);

    leaves.forEach((leaf, i) => {
      const flipped = i < flippedCount;
      const order = changing.indexOf(leaf);
      if (order >= 0 && !instant) {
        // A turning leaf rides above the rest; in a multi-page jump the leaves fan out one after another.
        const position = forward ? order : changing.length - 1 - order;
        leaf.style.transitionDelay = `${position * 90}ms`;
        leaf.style.zIndex = String(4 * count - position);
        window.clearTimeout(timers.get(leaf));
        timers.set(
          leaf,
          window.setTimeout(() => {
            leaf.style.zIndex = String(restingZ(i, flipped));
            leaf.style.transitionDelay = "";
          }, 900 + position * 90),
        );
      } else {
        leaf.style.transitionDelay = "";
        leaf.style.zIndex = String(restingZ(i, flipped));
      }
      leaf.toggleAttribute("data-flipped", flipped);
    });

    const showing = spread.matches
      ? flippedCount === 0
        ? "right"
        : flippedCount === count
          ? "left"
          : "both"
      : face % 2 === 1
        ? "left"
        : "right";
    book.dataset.show = showing;

    const shown = new Set(visibleFaces());
    faces.forEach((el, f) => {
      el.inert = !shown.has(f);
    });

    // Keep keyboard focus on something the reader can see.
    const active = document.activeElement as HTMLElement | null;
    if (active && active !== document.body && active.closest("[inert]")) {
      const target = faces[face];
      target.querySelector<HTMLElement>("[data-turn]")?.focus({ preventScroll: true });
    }

    const label = faces[face]?.getAttribute("aria-label");
    if (announcer && label && animate) announcer.textContent = label;

    const chapter = [...faces.slice(0, face + 1)].reverse().find((el) => el.dataset.chapter)?.dataset.chapter;
    try {
      window.history.replaceState(null, "", chapter && face > 0 ? `#${chapter}` : window.location.pathname + window.location.search);
    } catch {
      /* some embedded viewers refuse history changes */
    }
  };

  const goTo = (target: number) => {
    const next = Math.max(0, Math.min(last, target));
    if (next === face) return;
    face = next;
    render(true);
  };

  // In the spread a step turns a whole leaf; on one page it moves a single page.
  const step = (direction: 1 | -1) => {
    if (spread.matches) {
      const s = Math.ceil(face / 2) + direction;
      if (s < 0 || s > count) return;
      goTo(s === count ? last : 2 * s);
    } else {
      goTo(face + direction);
    }
  };

  let swiped = false;
  const onClick = (event: MouseEvent) => {
    if (swiped) {
      swiped = false;
      return;
    }
    const target = event.target as Element | null;
    if (!target) return;
    const turn = target.closest<HTMLElement>("[data-turn]");
    if (turn) {
      event.preventDefault();
      step(turn.dataset.turn === "prev" ? -1 : 1);
      return;
    }
    const jump = target.closest<HTMLElement>("[data-goto]");
    if (jump) {
      event.preventDefault();
      const found = chapterFace(jump.dataset.goto ?? "");
      if (found >= 0) goTo(found);
      return;
    }
    if (target.closest(IGNORE)) return;
    const page = target.closest<HTMLElement>("[data-face]");
    if (!page) return;
    if (spread.matches) {
      step(Number(page.dataset.face) % 2 === 0 ? 1 : -1);
    } else {
      const box = page.getBoundingClientRect();
      step((event.clientX - box.left) / box.width < 0.25 ? -1 : 1);
    }
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
    const onControl = !!target?.closest("a, button");
    switch (event.key) {
      case "ArrowRight":
      case "PageDown":
        event.preventDefault();
        step(1);
        break;
      case "ArrowLeft":
      case "PageUp":
        event.preventDefault();
        step(-1);
        break;
      case " ":
        if (onControl) return;
        event.preventDefault();
        step(event.shiftKey ? -1 : 1);
        break;
      case "Home":
        event.preventDefault();
        goTo(0);
        break;
      case "End":
        event.preventDefault();
        goTo(last);
        break;
    }
  };

  let startX = 0;
  let startY = 0;
  const onDown = (event: PointerEvent) => {
    startX = event.clientX;
    startY = event.clientY;
  };
  const onUp = (event: PointerEvent) => {
    if (event.pointerType !== "touch") return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      swiped = true;
      step(dx < 0 ? 1 : -1);
      window.setTimeout(() => (swiped = false), 400);
    }
  };

  const onMode = () => render(false);
  const onHash = () => {
    const found = chapterFace(decodeURIComponent(window.location.hash.slice(1)));
    if (found >= 0) goTo(found);
  };

  render(false);
  // Turn on the transitions only after the first, instant layout.
  window.requestAnimationFrame(() => root.setAttribute("data-ready", ""));

  root.addEventListener("click", onClick);
  window.addEventListener("keydown", onKey);
  book.addEventListener("pointerdown", onDown);
  book.addEventListener("pointerup", onUp);
  window.addEventListener("hashchange", onHash);
  spread.addEventListener("change", onMode);

  return () => {
    timers.forEach((t) => window.clearTimeout(t));
    root.removeEventListener("click", onClick);
    window.removeEventListener("keydown", onKey);
    book.removeEventListener("pointerdown", onDown);
    book.removeEventListener("pointerup", onUp);
    window.removeEventListener("hashchange", onHash);
    spread.removeEventListener("change", onMode);
  };
}

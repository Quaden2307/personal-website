/*
  The cat's ball of yarn, as plain DOM code (components/behaviour/YarnController.tsx mounts it).

  At rest the yarn hangs on its thread and the cat bats at it; that is CSS (Cat.module.css).
  Pressing the ball picks it up: it follows the pointer, and when it is let go it flies off at
  the speed it was thrown, falls, and bounces off the edges and the foot of the screen, paying
  out thread from the top as it goes. The cat watches it and turns to it; when the ball lands
  out of reach it gets up and runs after it along the foot of the screen, lies down by it and
  swipes at it. Once the ball has lain still for a moment the thread reels it back up, the cat
  runs home, and the CSS takes over again. The simulation runs only while the yarn is in play.

  With reduced motion the ball can still be dragged, but it goes straight back when let go.
*/

const CALM_QUERY = "(prefers-reduced-motion: reduce)";

/* The physics, in px and seconds. Velocities are kept per step, as Verlet does. */
const STEP = 1 / 120;
const GRAVITY = 2200;
const AIR = 0.9995;
const REELING = 0.995;
const SPRING = 7;
const BOUNCE = 0.45;
const ROLL = 0.985;
const LINKS = 24;
const REEL = 420;
const MAX_THROW = 3200;
const RUN = 560;
const FLOP_MS = 160;

/* Points in the cat drawing (Cat.tsx), which is 190 units wide. */
const DRAWING = 190;
const SHOULDER = { x: 62, y: 78 };
const PAW_TIP = { x: 54.5, y: 12.4 };
const NECK = { x: 30, y: 74 };
const ARM = Math.hypot(PAW_TIP.x - SHOULDER.x, PAW_TIP.y - SHOULDER.y);
const ARM_ANGLE = Math.atan2(PAW_TIP.y - SHOULDER.y, PAW_TIP.x - SHOULDER.x);
const DEG = 180 / Math.PI;

type Vec = { x: number; y: number };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function attachYarn(stage: HTMLElement): () => void {
  const scene = stage.querySelector<HTMLElement>("[data-scene]");
  const hang = stage.querySelector<HTMLElement>("[data-hang]");
  const yarn = stage.querySelector<HTMLButtonElement>("[data-yarn]");
  const body = stage.querySelector<HTMLElement>("[data-cat-body]");
  const head = stage.querySelector<SVGGElement>("[data-head]");
  const eyes = stage.querySelector<SVGGElement>("[data-eyes]");
  const paw = stage.querySelector<SVGGElement>("[data-paw]");
  const play = stage.querySelector<HTMLElement>("[data-play]");
  const thread = stage.querySelector<SVGPathElement>("[data-thread]");
  const ball = stage.querySelector<HTMLElement>("[data-play-ball]");
  if (!scene || !hang || !yarn || !body || !head || !eyes || !paw || !play || !thread || !ball) return () => {};
  const calm = window.matchMedia(CALM_QUERY);

  /* The desk: the stage's scrolling box, with the foot of the screen as its floor. */
  let width = 0;
  let height = 0;
  let floor = 0;
  let anchor: Vec = { x: 0, y: 0 };
  let rest = 0;
  let length = 0;
  let radius = 16;
  const points: Vec[] = [];
  const before: Vec[] = [];
  let spin = 0;

  let live = false;
  let frame = 0;
  let last = 0;
  let pending = 0;
  let phase: "play" | "reel" | "settle" = "play";
  let started = 0;
  let still = 0;
  let settled = 0;
  let back: { from: Vec; start: number } | null = null;
  let seen: Vec = { x: 0, y: 0 };

  let held = false;
  let pointer = -1;
  let offset: Vec = { x: 0, y: 0 };
  let target: Vec = { x: 0, y: 0 };
  const trail: { t: number; x: number; y: number }[] = [];

  /* The cat: where it lies at home, how far it has gone, which way it faces, whether it runs. */
  let unit = 1;
  let home: Vec = { x: 0, y: 0 };
  let catW = 0;
  let catH = 0;
  let minX = 0;
  let maxX = 0;
  let catX = 0;
  let facing = 1;
  let running = false;
  let goal = 0;
  let flop = 0;
  let pose = "";
  let squash = 1;
  let pawTurn = 0;
  let headTurn = -8;
  let look: Vec = { x: 0, y: 0 };
  let swipeUntil = 0;
  let nextSwipe = 0;
  let swipes = 0;

  /* The phase is also written on the scene, as data-live. */
  const enter = (next: typeof phase) => {
    phase = next;
    scene.setAttribute("data-live", next);
  };

  const local = (x: number, y: number): Vec => {
    const box = stage.getBoundingClientRect();
    return { x: x - box.left + stage.scrollLeft, y: y - box.top + stage.scrollTop };
  };

  const centre = (el: Element): Vec => {
    const box = el.getBoundingClientRect();
    return local(box.left + box.width / 2, box.top + box.height / 2);
  };

  /* A point of the lying cat's drawing, on the desk, as the cat lies now. */
  const onCat = (p: Vec): Vec => ({
    x: home.x + catX + (facing === 1 ? p.x : DRAWING - p.x) * unit,
    y: home.y + p.y * unit,
  });

  const start = () => {
    const sceneBox = scene.getBoundingClientRect();
    const corner = local(sceneBox.left, sceneBox.top);
    const catBox = body.getBoundingClientRect();
    const book = stage.querySelector("[data-book]")?.parentElement?.getBoundingClientRect();
    const ballNow = centre(yarn.querySelector("svg") ?? yarn);

    width = stage.clientWidth;
    height = Math.max(stage.clientHeight, stage.scrollHeight);
    anchor = { x: corner.x + parseFloat(getComputedStyle(hang).left), y: corner.y - 12 };
    home = local(catBox.left, catBox.top);
    catW = catBox.width;
    catH = catBox.height;
    unit = catW / DRAWING;
    floor = home.y + catH;
    radius = (yarn.querySelector("svg")?.getBoundingClientRect().width ?? 32) / 2;
    minX = (book ? local(book.left, 0).x : 0) - home.x;
    maxX = width - catW - home.x;

    points.length = 0;
    before.length = 0;
    for (let i = 0; i <= LINKS; i++) {
      const p = { x: anchor.x + ((ballNow.x - anchor.x) * i) / LINKS, y: anchor.y + ((ballNow.y - anchor.y) * i) / LINKS };
      points.push(p);
      before.push({ ...p });
    }
    rest = Math.hypot(ballNow.x - anchor.x, ballNow.y - anchor.y);
    length = rest;
    catX = 0;
    facing = 1;
    running = false;
    goal = 0;
    flop = 0;
    pawTurn = 0;
    headTurn = -8;
    started = performance.now();
    still = 0;
    settled = 0;
    swipes = 0;
    back = null;

    play.style.width = `${width}px`;
    play.style.height = `${height}px`;
    play.hidden = false;
    enter("play");
    seen = { ...ballNow };
    live = true;
    last = 0;
    pending = 0;
    draw();
    frame = window.requestAnimationFrame(tick);
  };

  const finish = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
    live = false;
    held = false;
    back = null;
    play.hidden = true;
    scene.removeAttribute("data-live");
    scene.removeAttribute("data-pose");
    pose = "";
    for (const el of [body, head, eyes, paw]) el.style.transform = "";
    delete ball.dataset.held;
  };

  /* Bounce off the edges and the floor; roll to a stop along it. */
  const collide = (b: Vec, p: Vec) => {
    let vx = b.x - p.x;
    let vy = b.y - p.y;
    if (b.y > floor - radius) {
      b.y = floor - radius;
      if (vy > 0) vy = vy / STEP > 60 ? -vy * BOUNCE : 0;
      vx *= ROLL;
      spin += vx / radius;
    }
    if (b.y < radius) {
      b.y = radius;
      if (vy < 0) vy = -vy * BOUNCE;
    }
    if (b.x < radius) {
      b.x = radius;
      if (vx < 0) vx = -vx * BOUNCE;
    }
    if (b.x > width - radius) {
      b.x = width - radius;
      if (vx > 0) vx = -vx * BOUNCE;
    }
    p.x = b.x - vx;
    p.y = b.y - vy;
  };

  const step = () => {
    const b = points[LINKS];
    const p = before[LINKS];
    if (held) {
      p.x = b.x;
      p.y = b.y;
      b.x = clamp(target.x, radius, width - radius);
      b.y = clamp(target.y, radius, floor - radius);
    } else if (back) {
      p.x = b.x;
      p.y = b.y;
    } else if (phase === "settle") {
      // Reeled in: a spring with no bounce brings the ball to where it hangs.
      const vx = (b.x - p.x) / STEP;
      const vy = (b.y - p.y) / STEP;
      const ax = -SPRING * SPRING * (b.x - anchor.x) - 2 * SPRING * vx;
      const ay = -SPRING * SPRING * (b.y - anchor.y - rest) - 2 * SPRING * vy;
      p.x = b.x;
      p.y = b.y;
      b.x += (vx + ax * STEP) * STEP;
      b.y += (vy + ay * STEP) * STEP;
    } else {
      const drag = phase === "reel" ? REELING : AIR;
      const vx = (b.x - p.x) * drag;
      const vy = (b.y - p.y) * drag;
      p.x = b.x;
      p.y = b.y;
      b.x += vx;
      b.y += vy + GRAVITY * STEP * STEP;
      collide(b, p);
    }

    // The thread pays out as far as the ball goes, and only pulls while it is being reeled in.
    const out = Math.hypot(b.x - anchor.x, b.y - anchor.y);
    if (phase === "play") length = Math.max(length, out * 1.03);
    if (phase === "reel") {
      length = Math.max(rest, length - REEL * STEP);
      if (length <= rest) enter("settle");
    }

    for (let i = 1; i < LINKS; i++) {
      const q = points[i];
      const r = before[i];
      const vx = (q.x - r.x) * 0.97;
      const vy = (q.y - r.y) * 0.97;
      r.x = q.x;
      r.y = q.y;
      q.x += vx;
      q.y = Math.min(floor, q.y + vy + GRAVITY * 0.5 * STEP * STEP);
    }

    const piece = length / LINKS;
    const pull = held || back || phase !== "reel" ? 0 : 0.3;
    for (let k = 0; k < 10; k++) {
      for (let i = 0; i < LINKS; i++) {
        const a = points[i];
        const c = points[i + 1];
        const dx = c.x - a.x;
        const dy = c.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d <= piece) continue;
        const wa = i === 0 ? 0 : 0.5;
        const wc = i + 1 === LINKS ? pull : 0.5;
        if (wa + wc === 0) continue;
        const f = (d - piece) / d / (wa + wc);
        a.x += dx * f * wa;
        a.y += dy * f * wa;
        c.x -= dx * f * wc;
        c.y -= dy * f * wc;
      }
    }
    points[0].x = anchor.x;
    points[0].y = anchor.y;
  };

  /* The cat: turn to the ball, run after it along the floor, lie down by it and swipe at it. */
  const watch = (now: number, dt: number) => {
    const b = points[LINKS];
    const lively = !calm.matches;

    // Lying, it turns to face the ball; running, it faces the way it runs.
    if (!running) {
      const mid = home.x + catX + catW / 2;
      if (b.x > mid + catW * 0.3 && facing === 1) facing = -1;
      else if (b.x < mid - catW * 0.3 && facing === -1) facing = 1;
    }

    const shoulder = onCat(SHOULDER);
    const dx = b.x - shoulder.x;
    const dy = b.y - shoulder.y;
    const dist = Math.hypot(dx, dy);
    const reach = (ARM + 8) * unit + radius;

    if (lively && !held && phase === "play") {
      // Where to lie down: its shoulder a little short of the ball, on the side it comes from.
      const fromRight = b.x < home.x + catX + catW / 2;
      const spot = clamp(
        fromRight ? b.x + 36 - SHOULDER.x * unit - home.x : b.x - 36 - (DRAWING - SHOULDER.x) * unit - home.x,
        minX,
        maxX,
      );
      const low = b.y > floor - radius - 40;
      if (running) goal = spot;
      else if (low && dist > reach * 1.15 && Math.abs(spot - catX) > 24) {
        running = true;
        goal = spot;
      }
    } else if (lively && !held) {
      // The yarn is going back up: home.
      if (Math.abs(catX) > 1) {
        running = true;
        goal = 0;
      }
    } else if (running) {
      running = false;
      flop = now;
    }

    if (running) {
      const gap = goal - catX;
      if (Math.abs(gap) <= RUN * dt + 0.5) {
        catX = goal;
        running = false;
        flop = now;
      } else {
        catX += Math.sign(gap) * RUN * dt;
        facing = gap < 0 ? 1 : -1;
      }
    }
    // Lying down again, it lands with a little squash.
    squash = now - flop < FLOP_MS ? 0.9 + 0.1 * ((now - flop) / FLOP_MS) : 1;

    // Each swipe comes a little later than the last, and after four the cat loses interest.
    if (lively && !held && !running && phase !== "settle" && swipes < 4 && dist < reach && now > nextSwipe) {
      const b2 = before[LINKS];
      const nx = dx / (dist || 1);
      const ny = dy / (dist || 1);
      const vx = (nx * 700 + (Math.random() - 0.5) * 200) * STEP;
      const vy = (ny * 700 - 320) * STEP;
      b2.x = b.x - vx;
      b2.y = b.y - vy;
      swipes += 1;
      swipeUntil = now + 160;
      nextSwipe = now + 480 + swipes * 220;
      still = 0;
    }

    // The paw reaches for the ball, the head turns to it and the eyes follow it.
    const aim = Math.atan2(dy, dx * facing);
    let want = ((aim - ARM_ANGLE + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    want = dist > reach * 2.2 ? 6 : clamp(want * DEG, -70, 55);
    if (now < swipeUntil) want += 18;
    pawTurn += (want - pawTurn) * Math.min(1, dt * 14);

    const neck = onCat(NECK);
    const across = (b.x - neck.x) * facing;
    headTurn += (clamp(-8 + across / 14, -22, 10) - headTurn) * Math.min(1, dt * 8);
    look = { x: clamp(across / 30, -1.6, 1.6), y: clamp((b.y - neck.y) / 40, -1.6, 1.2) };
  };

  const draw = () => {
    const b = points[LINKS];
    ball.style.transform = `translate(${b.x - radius}px, ${b.y - radius}px) rotate(${spin}rad)`;
    let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 1; i < LINKS; i++) {
      const m = { x: (points[i].x + points[i + 1].x) / 2, y: (points[i].y + points[i + 1].y) / 2 };
      d += ` Q${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)} ${m.x.toFixed(1)} ${m.y.toFixed(1)}`;
    }
    d += ` L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    thread.setAttribute("d", d);
    body.style.transform = `translate(${catX}px) scale(${facing}, ${squash})`;
    const next = running ? "run" : "lie";
    if (next !== pose) {
      pose = next;
      scene.setAttribute("data-pose", next);
    }
    paw.style.transform = `rotate(${pawTurn}deg)`;
    head.style.transform = `rotate(${headTurn}deg)`;
    eyes.style.transform = `translate(${look.x}px, ${look.y}px)`;
  };

  const tick = (now: number) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    pending += dt;
    while (pending >= STEP) {
      step();
      pending -= STEP;
    }

    const b = points[LINKS];
    const p = before[LINKS];
    if (back) {
      // Reduced motion: straight back to where it hangs.
      const t = Math.min(1, (now - back.start) / 420);
      const f = 1 - (1 - t) ** 3;
      b.x = back.from.x + (anchor.x - back.from.x) * f;
      b.y = back.from.y + (anchor.y + rest - back.from.y) * f;
      p.x = b.x;
      p.y = b.y;
      if (t >= 1) {
        length = rest;
        finish();
        return;
      }
    } else if (!held && dt > 0) {
      // How fast the ball really moved this frame, after the thread and the floor had their say.
      const speed = Math.hypot(b.x - seen.x, b.y - seen.y) / dt;
      if (phase === "play") {
        still = speed < 25 ? still + dt : 0;
        if (still > 0.8 || now - started > 7500) enter("reel");
      } else if (phase === "settle") {
        const atHome = Math.abs(catX) < 1 && !running;
        const off = Math.hypot(b.x - anchor.x, b.y - anchor.y - rest);
        settled = speed < 20 && off < 3 && atHome ? settled + dt : 0;
        if (settled > 0.15) {
          finish();
          return;
        }
      }
    }

    seen = { x: b.x, y: b.y };
    watch(now, dt);
    draw();
    frame = window.requestAnimationFrame(tick);
  };

  /* Pressing picks the ball up; letting go throws it at the speed it was moving. */
  const onDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    event.preventDefault();
    if (!live) start();
    const at = local(event.clientX, event.clientY);
    const b = points[LINKS];
    offset = { x: b.x - at.x, y: b.y - at.y };
    target = { x: b.x, y: b.y };
    held = true;
    pointer = event.pointerId;
    enter("play");
    back = null;
    still = 0;
    swipes = 0;
    trail.length = 0;
    trail.push({ t: event.timeStamp, ...at });
    ball.dataset.held = "";
    // The ball in play takes the pointer, even when it was the resting yarn that was pressed.
    ball.setPointerCapture(event.pointerId);
  };

  const onMove = (event: PointerEvent) => {
    if (!held || event.pointerId !== pointer) return;
    const at = local(event.clientX, event.clientY);
    target = { x: at.x + offset.x, y: at.y + offset.y };
    trail.push({ t: event.timeStamp, ...at });
    while (trail.length > 2 && event.timeStamp - trail[0].t > 90) trail.shift();
  };

  const onUp = (event: PointerEvent) => {
    if (!held || event.pointerId !== pointer) return;
    held = false;
    delete ball.dataset.held;
    const b = points[LINKS];
    if (calm.matches) {
      back = { from: { ...b }, start: performance.now() };
      return;
    }
    const first = trail[0];
    const end = trail[trail.length - 1];
    const span = (end.t - first.t) / 1000;
    let vx = span > 0.008 ? (end.x - first.x) / span : 0;
    let vy = span > 0.008 ? (end.y - first.y) / span : 0;
    const speed = Math.hypot(vx, vy);
    if (speed > MAX_THROW) {
      vx *= MAX_THROW / speed;
      vy *= MAX_THROW / speed;
    }
    before[LINKS].x = b.x - vx * STEP;
    before[LINKS].y = b.y - vy * STEP;
    started = performance.now();
  };

  /* From the keyboard (a click with no pointer), the ball is tossed up and away. */
  const onClick = (event: MouseEvent) => {
    if (event.detail !== 0) return;
    if (!live) start();
    const b = points[LINKS];
    enter("play");
    still = 0;
    swipes = 0;
    started = performance.now();
    if (calm.matches) {
      back = { from: { x: b.x, y: b.y - 24 }, start: performance.now() };
      return;
    }
    before[LINKS].x = b.x - (-500 - Math.random() * 500) * STEP;
    before[LINKS].y = b.y - (-700 - Math.random() * 500) * STEP;
  };

  const onResize = () => {
    if (live) finish();
  };

  for (const el of [yarn, ball]) {
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  }
  yarn.addEventListener("click", onClick);
  window.addEventListener("resize", onResize);

  return () => {
    finish();
    for (const el of [yarn, ball]) {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    }
    yarn.removeEventListener("click", onClick);
    window.removeEventListener("resize", onResize);
  };
}

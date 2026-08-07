"use client";

import { useEffect, useRef } from "react";

// The cursor is the ship. Fine pointers only; reduced-motion and touch
// visitors keep the native cursor. The rocket's nose sits exactly on the
// pointer hotspot; clicking fires the engines — particles burst from the
// nozzle, plus a short thruster stream while the button is held.
type Flame = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
  color: string;
};

// Nozzle offset and thrust direction in screen space, for the rocket
// rotated -45° with its tip on the pointer (nozzle trails down-right).
const NOZZLE = { x: 14.8, y: 14.8 };
const DIR = { x: 0.7071, y: 0.7071 };
const COLORS = ["#ffb454", "#ff8a3d", "#ff5f36", "#eaedf6"];

export default function ShipCursor() {
  const shipRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ship = shipRef.current;
    const canvas = canvasRef.current;
    if (!fine || reduced || !ship || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.documentElement.classList.add("cursor-ship");

    let dpr = 1;
    let W = 0;
    let H = 0;
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      // canvas is a replaced element: inset-0 doesn't stretch it, so the
      // CSS size must be set explicitly or it renders at dpr× scale
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    let px = -100;
    let py = -100;
    let down = false;
    const flames: Flame[] = [];
    let raf = 0;
    let running = false;

    const spawn = (n: number) => {
      if (flames.length > 500) return;
      for (let i = 0; i < n; i++) {
        const angle = Math.atan2(DIR.y, DIR.x) + (Math.random() - 0.5) * 0.7;
        const speed = 1.5 + Math.random() * 2.5;
        const max = 220 + Math.random() * 200;
        flames.push({
          x: px + NOZZLE.x,
          y: py + NOZZLE.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: max,
          max,
          r: 1.5 + Math.random() * 2.5,
          color: COLORS[(Math.random() * COLORS.length) | 0],
        });
      }
    };

    let last = 0;
    const loop = (ts: number) => {
      const dt = last ? Math.min(ts - last, 48) : 16;
      last = ts;

      if (down) spawn(3);

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = flames.length - 1; i >= 0; i--) {
        const f = flames[i];
        f.life -= dt;
        if (f.life <= 0) {
          flames.splice(i, 1);
          continue;
        }
        f.x += f.vx * (dt / 16);
        f.y += f.vy * (dt / 16);
        f.vx *= 0.96;
        f.vy *= 0.96;
        const k = f.life / f.max;
        ctx.globalAlpha = k;
        ctx.fillStyle = f.color;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (0.4 + 0.6 * k), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (flames.length === 0 && !down) {
        running = false;
        last = 0;
        ctx.clearRect(0, 0, W, H);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    // Chromium repaints the pointer only when the computed cursor value
    // changes; after leaving and re-entering the window it can keep showing
    // a stale native arrow. Alternating between two invisible cursor values
    // on every move guarantees a real change while the window has focus.
    let alt = false;
    const alternate = () => {
      alt = !alt;
      const html = document.documentElement;
      html.classList.toggle("cursor-ship", !alt);
      html.classList.toggle("cursor-ship-alt", alt);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      ship.style.display = "block";
      ship.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      alternate();
    };
    const onDown = () => {
      down = true;
      ship.classList.add("down");
      spawn(14);
      start();
    };
    const onUp = () => {
      down = false;
      ship.classList.remove("down");
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) ship.style.display = "none";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("resize", size);

    return () => {
      document.documentElement.classList.remove("cursor-ship", "cursor-ship-alt");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[99]"
      />
      <div ref={shipRef} className="ship-cursor" aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 14 L4 20 L9 18 Z" fill="#ffb454" />
          <path d="M16 14 L20 20 L15 18 Z" fill="#ffb454" />
          <path
            d="M12 1 C15.5 4 16.5 9 15.5 14 L14.5 19 H9.5 L8.5 14 C7.5 9 8.5 4 12 1 Z"
            fill="#eaedf6"
            stroke="#212c4e"
            strokeWidth="1"
          />
          <circle cx="12" cy="9" r="2.2" fill="#7fa7ff" stroke="#212c4e" strokeWidth="0.8" />
          <path d="M9.5 19 L14.5 19 L13.5 22 H10.5 Z" fill="#212c4e" />
        </svg>
      </div>
    </>
  );
}

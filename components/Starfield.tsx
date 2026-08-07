"use client";

import { useEffect, useRef } from "react";

// The one ambient system. Stars streak with scroll velocity across three
// parallax depths, drift slowly when idle, and decelerate to a standstill
// over the last stretch of the page (Terminus).
type Star = {
  x: number;
  y: number;
  d: number; // depth: 0 far … 1 near
  r: number;
  a: number;
  tw: number;
};

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const COUNT = mobile ? 150 : 400;

    let dpr = 1;
    let W = 0;
    let H = 0;
    let stars: Star[] = [];
    let raf = 0;
    let lastY = window.scrollY;
    let vel = 0;
    let t = 0;

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

    const seed = () => {
      stars = [];
      for (let i = 0; i < COUNT; i++) {
        const d = Math.random();
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          d,
          r: 0.4 + d * 1.1,
          a: 0.22 + d * 0.5,
          tw: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (speed: number, drift: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const move = drift * (0.3 + s.d) + speed * s.d * 0.55;
        s.y -= move;
        if (s.y < -30) {
          s.y = H + 20;
          s.x = Math.random() * W;
        } else if (s.y > H + 30) {
          s.y = -20;
          s.x = Math.random() * W;
        }
        const twinkle = reduced ? 1 : 0.85 + 0.15 * Math.sin(t * 1.7 + s.tw);
        const streak = Math.abs(speed) * s.d * 0.8;
        ctx.strokeStyle = `rgba(234, 237, 246, ${s.a * twinkle})`;
        ctx.lineWidth = s.r;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + Math.max(0.6, streak));
        ctx.stroke();
      }
    };

    const frame = () => {
      const y = window.scrollY;
      vel += (y - lastY - vel) * 0.08;
      lastY = y;
      t += 0.016;

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docH > 0 ? y / docH : 0;
      // Terminus: decelerate to stillness over the last 12% of the line
      const damp = prog > 0.88 ? Math.max(0, 1 - (prog - 0.88) / 0.12) : 1;

      const speed = Math.max(-38, Math.min(38, vel)) * damp;
      draw(speed, 0.18 * damp);
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      size();
      seed();
      if (reduced) draw(0, 0);
    };

    size();
    seed();
    if (reduced) {
      draw(0, 0); // static field, once
    } else {
      raf = requestAnimationFrame(frame);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}

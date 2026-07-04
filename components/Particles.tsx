"use client";

import { useEffect, useRef } from "react";

type Flake = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  o: number;
  tw: number;
  ph: number;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
};

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = fine ? 70 : 30;
    const flakes: Flake[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.7,
      vx: -0.15 + Math.random() * 0.3,
      vy: 0.15 + Math.random() * 0.45,
      o: 0.25 + Math.random() * 0.5,
      tw: 0.5 + Math.random() * 1.5,
      ph: Math.random() * Math.PI * 2,
    }));
    const sparks: Spark[] = [];
    const trail: Spark[] = [];
    const TRAIL_COLORS = ["219, 234, 254", "147, 197, 253", "96, 165, 250"];
    const trailColor: string[] = [];

    let mx = -9999;
    let my = -9999;
    let lastX = -9999;
    let lastY = -9999;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // stardust trail: spawn a mote every ~8px of travel
      if (lastX < -999) {
        lastX = mx;
        lastY = my;
      }
      const dx = mx - lastX;
      const dy = my - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist > 8 && trail.length < 130) {
        const steps = Math.min(Math.floor(dist / 8), 4);
        for (let i = 1; i <= steps; i++) {
          trail.push({
            x: lastX + (dx * i) / steps + (Math.random() - 0.5) * 4,
            y: lastY + (dy * i) / steps + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5 - 0.15,
            life: 0,
            max: 22 + Math.random() * 16,
            r: 0.8 + Math.random() * 1.3,
          });
          trailColor.push(
            TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]
          );
        }
        lastX = mx;
        lastY = my;
      }
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    const onDown = (e: PointerEvent) => {
      for (let i = 0; i < 12; i++) {
        const a = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
        const sp = 1.5 + Math.random() * 2.5;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: 34 + Math.random() * 16,
          r: 1 + Math.random() * 1.4,
        });
      }
    };
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("pointerdown", onDown);

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (const p of flakes) {
        p.x += p.vx + Math.sin(t * 0.6 + p.ph) * 0.08;
        p.y += p.vy;

        // gently push flakes away from the cursor
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((150 - d) / 150) * 1.1;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }

        if (p.y > h + 4) {
          p.y = -4;
          p.x = Math.random() * w;
        }
        if (p.x > w + 4) p.x = -4;
        if (p.x < -4) p.x = w + 4;

        const twinkle = 0.75 + 0.25 * Math.sin(t * p.tw + p.ph);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 219, 254, ${p.o * twinkle})`;
        ctx.fill();
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const s = trail[i];
        s.life++;
        if (s.life >= s.max) {
          trail.splice(i, 1);
          trailColor.splice(i, 1);
          continue;
        }
        s.x += s.vx;
        s.y += s.vy;
        const a = 1 - s.life / s.max;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * a, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${trailColor[i]}, ${0.8 * a})`;
        ctx.fill();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        if (s.life >= s.max) {
          sparks.splice(i, 1);
          continue;
        }
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy = s.vy * 0.96 + 0.05;
        const a = 1 - s.life / s.max;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * a, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${0.85 * a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}

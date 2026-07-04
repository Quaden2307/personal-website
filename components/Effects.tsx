"use client";

import { useEffect } from "react";

export default function Effects() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      if (!bar) return;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const glow = document.getElementById("cursor-glow");
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      document
        .querySelectorAll<HTMLElement>("[data-spotlight]")
        .forEach((card) => {
          const r = card.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          card.style.setProperty("--sx", `${e.clientX - r.left}px`);
          card.style.setProperty("--sy", `${e.clientY - r.top}px`);
        });
    };

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (glow) {
        glow.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      if (!reducedMotion) {
        raf = requestAnimationFrame(tick);
      } else if (glow) {
        glow.style.display = "none";
      }
    } else if (glow) {
      glow.style.display = "none";
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" aria-hidden />
      <div id="cursor-glow" aria-hidden />
    </>
  );
}

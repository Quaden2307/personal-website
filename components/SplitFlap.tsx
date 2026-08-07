"use client";

import { useEffect, useRef } from "react";

// Split-flap settle: cycles glyphs, then locks characters left to right.
// Runs once on mount (~0.9s); reduced motion shows the text immediately.
export default function SplitFlap({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let raf = 0;
    let start: number | null = null;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      let out = "";
      let done = true;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") {
          out += " ";
          continue;
        }
        if (elapsed > 200 + i * 80) {
          out += ch;
        } else {
          done = false;
          out += glyphs[(Math.random() * glyphs.length) | 0];
        }
      }
      el.textContent = out;
      if (!done) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text]);

  return (
    <span aria-label={text}>
      <span aria-hidden ref={ref}>
        {text}
      </span>
    </span>
  );
}

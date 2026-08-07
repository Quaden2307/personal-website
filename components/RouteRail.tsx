"use client";

import { useEffect, useRef, useState } from "react";
import { STOPS } from "@/lib/route";

// The route map — replaces the old header nav. Desktop: a fixed left rail
// with the ship marker tracking scroll position and a dot per station.
// Mobile: a thin progress strip plus the current stop, tap to open the map.
export default function RouteRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? doc.scrollTop / max : 0);

      let idx = 0;
      for (let i = 0; i < STOPS.length; i++) {
        const el = document.getElementById(STOPS[i].id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          idx = i;
        }
      }
      setActive(idx);
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const code = (i: number) => String(i).padStart(2, "0");

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Route"
        className="fixed left-6 top-1/2 z-40 hidden h-[62vh] -translate-y-1/2 xl:block"
      >
        <div className="absolute bottom-0 left-[5px] top-0 w-0.5 bg-border" aria-hidden />
        <div
          className="absolute left-[5px] top-0 h-full w-0.5 origin-top bg-amber"
          style={{ transform: `scaleY(${progress})` }}
          aria-hidden
        />
        <div
          className="rail-ship absolute left-[6px]"
          style={{ top: `${progress * 100}%` }}
          aria-hidden
        />
        <ol className="relative h-full">
          {STOPS.map((s, i) => (
            <li
              key={s.id}
              className="absolute -translate-y-1/2"
              style={{ top: `${(i / (STOPS.length - 1)) * 100}%` }}
            >
              <a
                href={`#${s.id}`}
                aria-current={active === i ? "true" : undefined}
                className="group flex items-center gap-3 py-1"
              >
                <span
                  className={`block h-3 w-3 rounded-full border-2 transition-colors duration-300 ${
                    i === active
                      ? "border-amber bg-amber"
                      : i < active
                        ? "border-amber bg-background"
                        : "border-border bg-background"
                  }`}
                />
                <span
                  className={`whitespace-nowrap font-mono text-[11px] tracking-[0.14em] transition-opacity duration-300 ${
                    i === active
                      ? "text-amber opacity-100"
                      : "text-dust opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {code(i)} · {s.nav.toUpperCase()}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile strip */}
      <div className="fixed inset-x-0 top-0 z-40 xl:hidden">
        <div
          className="h-0.5 origin-left bg-amber"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
        <nav
          aria-label="Route"
          className="border-b border-border/70 bg-background/80 backdrop-blur-md"
        >
          <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
            <a
              href="#launch"
              className="font-mono text-xs font-medium tracking-[0.14em] text-foreground"
              onClick={() => setOpen(false)}
            >
              CADEN SUN
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="route-map"
              className="font-mono text-[11px] tracking-[0.16em] text-amber"
            >
              {code(active)} · {STOPS[active].nav.toUpperCase()} {open ? "▴" : "▾"}
            </button>
          </div>
          {open && (
            <ol id="route-map" className="border-t border-border/70 pb-2">
              {STOPS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === i ? "true" : undefined}
                    className={`flex items-center gap-3 px-4 py-2.5 font-mono text-xs tracking-[0.14em] sm:px-6 ${
                      i === active ? "text-amber" : "text-dust"
                    }`}
                  >
                    <span
                      className={`block h-2 w-2 rounded-full border-2 ${
                        i <= active ? "border-amber" : "border-border"
                      } ${i === active ? "bg-amber" : "bg-transparent"}`}
                    />
                    {code(i)} · {s.nav.toUpperCase()}
                  </a>
                </li>
              ))}
            </ol>
          )}
        </nav>
      </div>
    </>
  );
}

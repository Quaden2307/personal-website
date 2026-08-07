"use client";

import { useEffect } from "react";

// Arrival choreography: marks the document as JS-capable (all hidden
// states in globals.css are gated on html.js so no-JS visitors see
// everything), then reveals each station as it enters the viewport.
export default function Choreo() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const stations = document.querySelectorAll(".station");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      stations.forEach((el) => el.classList.add("arrived"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("arrived");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    stations.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}

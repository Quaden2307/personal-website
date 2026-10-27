"use client";

import { useEffect, useRef, useState } from "react";
import type { Picture } from "@/lib/content";
import styles from "./Clip.module.css";

/**
 * A short muted loop. It plays only while its page is open and only when motion
 * is welcome; the button pauses or resumes it. Without script the browser shows
 * its own controls, so the button appears only once script is running.
 */
export default function Clip({ src, type, poster, label }: { src: string; type: string; poster: Picture; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const chosePause = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    setReady(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) chosePause.current = true;

    // Pages lying under others are still in the viewport, so the notebook's inert flag on
    // hidden pages decides as well as the viewport does.
    const page = video.closest("[data-face]");
    let intersecting = false;
    const sync = () => {
      if (intersecting && !page?.hasAttribute("inert") && !chosePause.current) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    const turns = new MutationObserver(sync);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    observer.observe(video);
    if (page) turns.observe(page, { attributes: true, attributeFilter: ["inert"] });
    return () => {
      observer.disconnect();
      turns.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      chosePause.current = false;
      video.play().catch(() => undefined);
    } else {
      chosePause.current = true;
      video.pause();
    }
  };

  return (
    <div className={styles.clip}>
      <video
        ref={ref}
        width={poster.width}
        height={poster.height}
        poster={poster.src}
        muted
        loop
        playsInline
        preload="none"
        controls={!ready}
        aria-label={label}
      >
        <source src={src} type={type} />
      </video>
      {ready ? (
        <button type="button" className={styles.toggle} onClick={toggle}>
          {playing ? "Pause" : "Play"}
        </button>
      ) : null}
    </div>
  );
}

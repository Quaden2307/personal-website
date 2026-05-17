"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
};

export default function Section({ id, label, title, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-24 py-12 reveal ${visible ? "visible" : ""}`}
    >
      <div className="mb-12 flex items-baseline gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {label}
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <div className="hidden h-px flex-1 bg-border sm:block" />
      </div>
      {children}
    </section>
  );
}

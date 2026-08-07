import type { CSSProperties } from "react";

type Props = {
  id: string;
  code: string;
  title: string;
  children: React.ReactNode;
};

// Stagger helper: pass a delay for .st / .st-dock / .bay-door children.
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

export default function Station({ id, code, title, children }: Props) {
  return (
    <section id={id} className="station scroll-mt-24 py-16 sm:py-24">
      <div className="mb-10">
        <p className="eyebrow font-mono text-xs font-medium uppercase tracking-[0.16em] text-amber">
          <span className="st">{code}</span>
        </p>
        <h2 className="sign st mt-3 text-3xl text-foreground sm:text-4xl" style={delay(80)}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

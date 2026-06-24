import Section from "./Section";

type Role = {
  role: string;
  company: string;
  logo: string;
  tileClass: string;
  imgClass?: string;
  dates: string;
  description: string;
  tags: string[];
  anchorId: string;
};

const roles: Role[] = [
  {
    role: "AI Intern",
    company: "ProCogia",
    anchorId: "role-procogia",
    logo: "/logos/procogia@3x.png",
    tileClass: "h-44 w-80 bg-white p-0",
    imgClass: "scale-110",
    dates: "May 2026 — Present",
    description: "Building AI voice calling agents.",
    tags: ["Python", "LangGraph", "AWS", "RAG"],
  },
  {
    role: "ML Engineer",
    company: "Wat Street",
    anchorId: "role-watstreet",
    logo: "/logos/wat_street_logo.jpeg",
    tileClass: "h-28 w-28 bg-background p-2",
    dates: "Jan 2026 — Present",
    description: "Building ML models for stock volatility forecasting.",
    tags: ["Python", "PyTorch", "Pandas", "NumPy", "GAT", "LSTM"],
  },
  {
    role: "Software Developer",
    company: "Waterloo Aerial Robotics Group",
    anchorId: "role-warg",
    logo: "/logos/updated-warg_logo.avif",
    tileClass: "h-24 w-60 bg-white p-2",
    dates: "Oct 2025 — Apr 2026",
    description: "Built mission-planning tools for the drone ground control station.",
    tags: ["JavaScript", "React", "QGC"],
  },
];

export default function Experience() {
  return (
    <Section id="experience" label="03" title="Experience">
      <ol className="relative space-y-12 sm:space-y-16">
        {/* Center vertical timeline line (desktop only) */}
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-border sm:block" />

        {roles.map((r, i) => {
          const onLeft = i % 2 === 0;
          return (
            <li
              key={i}
              id={r.anchorId}
              className="scroll-mt-24 group relative grid grid-cols-1 sm:grid-cols-2 sm:gap-x-12"
            >
              {/* Dot on the center line */}
              <span className="absolute left-1/2 top-12 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-accent sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
              </span>

              <div className={onLeft ? "" : "sm:col-start-2"}>
                <div
                  className={`flex items-center justify-center overflow-hidden rounded-md border border-border transition-all duration-300 group-hover:scale-105 group-hover:border-accent ${r.tileClass}`}
                >
                  <img
                    src={r.logo}
                    alt={r.company}
                    className={`h-full w-full object-contain ${r.imgClass ?? ""}`}
                  />
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                      {r.role}{" "}
                      <span className="font-normal text-muted-foreground">
                        @ {r.company}
                      </span>
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {r.dates}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {r.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.tags.map((t, j) => (
                      <span
                        key={j}
                        className="rounded-md border border-border bg-muted/30 px-2.5 py-1 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

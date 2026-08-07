import Station, { delay } from "./Station";

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
    tileClass: "h-16 w-40 bg-white",
    imgClass: "scale-110",
    dates: "May 2026 — Present",
    description:
      "Building AI voice calling agents and conducting full pipeline testing.",
    tags: ["Python", "LangGraph", "AWS", "RAG"],
  },
  {
    role: "ML Engineer",
    company: "Wat Street",
    anchorId: "role-watstreet",
    logo: "/logos/wat_street_logo.jpeg",
    tileClass: "h-16 w-16 bg-background",
    dates: "Jan 2026 — Present",
    description:
      "Implementing ML models for stock volatility forecasting, focusing on data pipelines.",
    tags: ["Python", "PyTorch", "Pandas", "NumPy", "GAT", "LSTM"],
  },
  {
    role: "Software Developer",
    company: "Waterloo Aerial Robotics Group",
    anchorId: "role-warg",
    logo: "/logos/updated-warg_logo.avif",
    tileClass: "h-16 w-40 bg-white",
    dates: "Oct 2025 — Apr 2026",
    description: "Built mission-planning tools for the drone ground control station.",
    tags: ["JavaScript", "React", "QGC"],
  },
];

export default function Experience() {
  return (
    <Station id="experience" code="Stop 03 · Interchange" title="Experience">
      <div className="relative">
        {/* The line segment through the interchange */}
        <div className="absolute bottom-2 left-[5px] top-2 w-0.5 bg-border" aria-hidden />
        <div
          className="seg-fill absolute bottom-2 left-[5px] top-2 w-0.5 bg-amber"
          aria-hidden
        />

        <ol className="space-y-14 pl-9 sm:pl-12">
        {roles.map((r, i) => (
          <li
            key={r.anchorId}
            id={r.anchorId}
            className="st relative scroll-mt-28"
            style={delay(160 + i * 120)}
          >
            {/* Platform marker on the line */}
            <span
              className="absolute -left-9 top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-amber bg-background sm:-left-12"
              aria-hidden
            />

            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-amber">
              {r.dates}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div
                className={`flex flex-none items-center justify-center overflow-hidden rounded-[2px] border border-border p-1.5 ${r.tileClass}`}
              >
                <img
                  src={r.logo}
                  alt={r.company}
                  className={`h-full w-full object-contain ${r.imgClass ?? ""}`}
                />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {r.role}{" "}
                <span className="font-normal text-dust">@ {r.company}</span>
              </h3>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-dust">
              {r.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
        </ol>
      </div>
    </Station>
  );
}

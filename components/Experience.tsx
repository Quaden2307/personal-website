import Section from "./Section";

type Role = {
  role: string;
  company: string;
  logo: string;
  tileClass: string;
  imgClass?: string;
  dates: string;
  bullets: string[];
  tags: string[];
  anchorId: string;
};

const roles: Role[] = [
  {
    role: "AI Engineering Intern",
    company: "ProCogia",
    anchorId: "role-procogia",
    logo: "/logos/procogia@3x.png",
    tileClass: "h-44 w-80 bg-white p-0",
    imgClass: "scale-110",
    dates: "May 2026 — Present",
    bullets: [
      "Engineered a fully open-source voice AI agent POC from scratch in under a week — migrating off Amazon Connect to LiveKit, Moonshine STT, and a locally hosted Qwen-32B LLM on EC2 — eliminating vendor lock-in and replacing usage-based cloud costs with a fixed compute footprint.",
      "Reduced latency to under 500ms — a 3× improvement over the initial prototype — by re-architecting the agent pipeline across LangGraph and Twilio with a modular, distributed design.",
      "Improved RAG workflow retrieval accuracy by designing and deploying production-grade API integrations and cloud infrastructure on AWS (S3, EC2, DynamoDB), enabling scalable document ingestion for client workloads.",
      "Built an automated smoke test suite for a production AWS pipeline — validating Lambda health, SQS queue state, DLQ depth, and DynamoDB claim seeding in a single runner — replacing manual verification across 4 system boundaries.",
    ],
    tags: ["Python", "AWS", "LiveKit", "LangGraph", "Voice AI"],
  },
  {
    role: "ML Engineer",
    company: "Wat Street",
    anchorId: "role-watstreet",
    logo: "/logos/wat_street_logo.jpeg",
    tileClass: "h-28 w-28 bg-background p-2",
    dates: "Jan 2025 — Present",
    bullets: [
      "Reduced model training iteration time by 40% by engineering a scalable data pipeline (Python, Pandas, NumPy) that ingests live S&P 500 market data and produces structured tensor inputs across 500 equities per batch.",
      "Identified the best-performing volatility forecaster — cutting prediction error by 18% vs. the naive baseline — by benchmarking 3 ML models (HAR-RV, GARCH(1,1), LSTM) and building a reusable RMSE evaluation harness.",
      "Improved model reliability by writing unit tests for pipeline stages, conducting code reviews, and debugging model discrepancies — catching 3 data leakage bugs before evaluation.",
    ],
    tags: ["Python", "PyTorch", "Pandas", "NumPy"],
  },
  {
    role: "Software Developer",
    company: "Waterloo Aerial Robotics Group",
    anchorId: "role-warg",
    logo: "/logos/updated-warg_logo.avif",
    tileClass: "h-24 w-60 bg-white p-2",
    dates: "Oct 2025 — Apr 2026",
    bullets: [
      "Increased ground control station coverage by 15% by implementing a coordinate mapping system in JavaScript for IMACS-3.0, integrating it into the existing backend architecture and validating against live flight telemetry.",
      "Cut field debugging time by building a real-time flight monitoring dashboard in Dart/Flutter, displaying live telemetry and alerts across Android and desktop using OOP patterns for reusable, testable components.",
    ],
    tags: ["JavaScript", "Dart", "Flutter", "OOP"],
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

                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {r.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full bg-accent/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.tags.map((t, j) => (
                      <span
                        key={j}
                        className="rounded-md border border-border bg-muted/30 px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
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

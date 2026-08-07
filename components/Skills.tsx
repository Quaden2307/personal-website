import Station, { delay } from "./Station";

const clusters: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript/TypeScript", "Java", "C/C++", "SQL", "HTML/CSS"],
  },
  {
    label: "ML & Data",
    items: ["PyTorch", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "XGBoost"],
  },
  {
    label: "Frameworks",
    items: ["React", "Node.js", "Flask", "LangGraph"],
  },
  {
    label: "Platforms",
    items: [
      "AWS (S3, EC2, DynamoDB)",
      "Docker",
      "CI/CD",
      "Jupyter Notebook",
      "Linux",
      "Git",
      "Vercel",
    ],
  },
];

export default function Skills() {
  return (
    <Station id="skills" code="Stop 05 · Systems" title="Skills">
      <div className="st grid gap-px overflow-hidden rounded-[2px] border border-border bg-border sm:grid-cols-2" style={delay(160)}>
        {clusters.map((c) => (
          <div key={c.label} className="bg-hull p-5 sm:p-6">
            <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-amber">
              {c.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {c.items.map((s) => (
                <li key={s} className="chip cursor-default">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Station>
  );
}

import Section from "./Section";

const groups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: [
      "Python",
      "JavaScript/TypeScript",
      "Java",
      "C/C++",
      "SQL",
      "HTML/CSS",
    ],
  },
  {
    label: "ML & Data",
    items: ["PyTorch", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "XGBoost"],
  },
  {
    label: "Frameworks & libraries",
    items: ["React", "Node.js", "Flask", "LangGraph"],
  },
  {
    label: "Tools & Platforms",
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
    <Section id="skills" label="05" title="Skills">
      <div className="grid gap-8 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.label}>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">
              {g.label}
            </h4>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((s, i) => (
                <li
                  key={i}
                  className="cursor-default rounded-md border border-border bg-muted/30 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

import Section from "./Section";

const honours = [
  "Relevant Coursework: Data Structures & Algorithms, Designing Functional Programs, Linear Algebra, Probability & Statistics",
  "Focus on Machine Learning, Data Science & Software Engineering",
  "Intramural basketball team captain",
  "President's Scholarship of Distinction",
];

export default function Education() {
  return (
    <Section id="education" label="02" title="Education">
      <div className="group rounded-xl border border-border bg-muted/20 p-6 sm:p-8 transition-all duration-500 hover:border-accent/40 hover:bg-muted/30">
        <div className="flex items-start gap-4">
          <div className="flex h-40 w-40 flex-none items-center justify-center overflow-hidden rounded-md border border-border bg-white p-2 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/logos/University_of_Waterloo_seal.svg.png"
              alt="University of Waterloo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                University of Waterloo
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                Sep 2025 — Apr 2030
              </span>
            </div>
            <p className="mt-1 text-base text-muted-foreground">
              Bachelor of Mathematics
            </p>

            <div className="mt-5">
              <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                Honours &amp; activities
              </h4>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {honours.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full bg-accent/60" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

import Station, { delay } from "./Station";

const manifest = [
  "Coursework: Data Structures & Algorithms, Designing Functional Programs, Linear Algebra, Probability & Statistics",
  "Focus on Machine Learning, AI & Software Engineering",
  "Intramural basketball Team Captain",
];

export default function Education() {
  return (
    <Station id="education" code="Stop 02 · Origin" title="UWaterloo">
      <div className="st rounded-[2px] border border-border bg-hull p-6 sm:p-8" style={delay(160)}>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <dl className="board">
            <dt>Program</dt>
            <dd>Bachelor of Mathematics</dd>
            <dt>Term</dt>
            <dd>Sep 2025 → Apr 2030</dd>
            <dt>Standing</dt>
            <dd className="text-amber">President&apos;s Scholarship of Distinction</dd>
          </dl>

          <div className="flex h-24 w-24 flex-none items-center justify-center overflow-hidden rounded-[2px] border border-border bg-white p-1.5">
            <img
              src="/logos/University_of_Waterloo_seal.svg.png"
              alt="University of Waterloo seal"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-7 border-t border-border pt-6">
          <ul className="space-y-2 text-sm leading-relaxed text-dust">
            {manifest.map((m, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 inline-block h-1 w-1 flex-none bg-amber" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Station>
  );
}

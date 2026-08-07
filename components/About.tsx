import Station, { delay } from "./Station";

export default function About() {
  return (
    <Station id="about" code="Stop 01 · Crew" title="About">
      <div className="grid gap-10 md:grid-cols-[1fr_230px] md:items-start">
        <div className="st space-y-5 text-base leading-relaxed text-dust" style={delay(160)}>
          <p>
            I&apos;m a{" "}
            <a
              href="#education"
              className="link-underline text-foreground transition-colors duration-300 hover:text-amber"
            >
              Mathematics
            </a>{" "}
            student at the{" "}
            <a
              href="#education"
              className="link-underline text-foreground transition-colors duration-300 hover:text-amber"
            >
              University of Waterloo
            </a>{" "}
            working in the fields of Machine Learning, AI Engineering, and the
            software that holds them together. Right now I&apos;m helping deploy AI systems in
            production at{" "}
            <a
              href="#role-procogia"
              className="link-underline text-foreground transition-colors duration-300 hover:text-amber"
            >
              ProCogia
            </a>{" "}
            and helping professor{" "}
            <a
              href="https://cs.uwaterloo.ca/~jimmylin/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-foreground transition-colors duration-300 hover:text-amber"
            >
              Jimmy Lin
            </a>{" "}
            with retrieval {"("}RAG{")"} research. My models are usually deployed and are linked in this page, however you can find the full scope of my
            work on my{" "}
            <a
              href="https://github.com/Quaden2307"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-foreground transition-colors duration-300 hover:text-amber"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        {/* Crew ID card */}
        <aside className="st-dock rounded-[2px] border border-border bg-hull" style={delay(240)}>
          <div className="aspect-[3/4] w-full overflow-hidden border-b border-border">
            <img
              src="/photo.jpg"
              alt="Caden Sun"
              className="h-full w-full object-cover"
            />
          </div>
          <dl className="grid grid-cols-[5rem_1fr] gap-y-1.5 p-4 font-mono text-[11px] uppercase tracking-[0.1em]">
            <dt className="text-dust/70">Crew</dt>
            <dd className="text-foreground">Caden Sun</dd>
            <dt className="text-dust/70">Base</dt>
            <dd className="text-foreground">Waterloo, ON</dd>
            <dt className="text-dust/70">Duty</dt>
            <dd className="text-foreground">AI Intern</dd>
            <dt className="text-dust/70">Callsign</dt>
            <dd className="text-amber">QUADEN2307</dd>
          </dl>
        </aside>
      </div>
    </Station>
  );
}

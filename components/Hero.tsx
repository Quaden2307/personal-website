import SplitFlap from "./SplitFlap";

export default function Hero() {
  return (
    <section
      id="launch"
      className="relative flex min-h-svh flex-col justify-center pb-24 pt-28"
    >
      <div className="boarding">
        <dl className="board mb-10">
          <dt>Role</dt>
          <dd>
            <a href="#role-procogia" className="link-underline">
              AI Intern · ProCogia
            </a>
          </dd>
          <dt>Base</dt>
          <dd>
            <a href="#education" className="link-underline">
              Mathematics · University of Waterloo
            </a>
          </dd>
          <dt>Status</dt>
          <dd className="blink-dot text-amber">Outbound</dd>
        </dl>

        <h1 className="sign text-[13vw] leading-none text-foreground sm:text-7xl md:text-8xl">
          <SplitFlap text="CADEN SUN" />
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-dust">
          I train models.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-[0.14em] text-dust">
          <a
            href="https://github.com/Quaden2307"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-amber"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/cadensun"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-amber"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:cadensun07@gmail.com"
            className="link-underline transition-colors hover:text-amber"
          >
            Email
          </a>
          <a
            href="/caden_sun_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-amber"
          >
            Resume ↗
          </a>
        </div>
      </div>

      <p className="absolute bottom-9 left-0 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dust">
        <span className="cue-tick" aria-hidden />
        Scroll to depart
      </p>
    </section>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center pt-24 pb-16"
    >
      <div className="stagger flex flex-col">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>Open to opportunities</span>
        </div>

        <h1 className="mt-6 font-sans text-6xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.04em] text-foreground leading-[1.02]">
          Caden Sun.
        </h1>

        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-muted-foreground leading-tight">
          explore. build. ship.
          <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[3px] bg-accent animate-blink" />
        </h2>

        <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          {" "}
          <a
            href="#role-procogia"
            className="link-underline text-foreground transition-colors duration-300 hover:text-accent"
          >
            AI Engineering Intern
          </a>{" "}
          at{" "}
          <a
            href="#role-procogia"
            className="link-underline text-foreground transition-colors duration-300 hover:text-accent"
          >
            ProCogia
          </a>
          , studying{" "}
          <a
            href="#education"
            className="link-underline text-foreground transition-colors duration-300 hover:text-accent"
          >
            Mathematics
          </a>{" "}
          at the{" "}
          <a
            href="#education"
            className="link-underline text-foreground transition-colors duration-300 hover:text-accent"
          >
            University of Waterloo
          </a>
          .
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(59,130,246,0.6)]"
          >
            View my work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-14 flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://github.com/Quaden2307"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cadensun"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="mailto:cadensun07@gmail.com"
            className="link-underline transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>

    </section>
  );
}

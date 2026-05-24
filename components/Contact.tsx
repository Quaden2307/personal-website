import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" label="06" title="Contact">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-muted/30 to-background p-8 sm:p-12 text-center">
        <h3 className="font-sans text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground">
          Let&apos;s talk.
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
          Open to internships and collaborations in software, ML, and AI
          infrastructure. If you&apos;d like to chat or have an opportunity in
          mind, my inbox is open.
        </p>

        <a
          href="mailto:cadensun07@gmail.com"
          className="group mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(59,130,246,0.6)]"
        >
          cadensun07@gmail.com
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <a
            href="https://linkedin.com/in/cadensun"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-border">·</span>
          <a
            href="https://github.com/Quaden2307"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <span className="text-border">·</span>
          <a
            href="/caden_sun_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Resume (PDF)
          </a>
        </div>
      </div>
    </Section>
  );
}

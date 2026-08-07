import Station, { delay } from "./Station";

export default function Contact() {
  return (
    <Station id="contact" code="Stop 06 · Terminus" title="Contact">
      <div className="st" style={delay(160)}>
        <a
          href="mailto:cadensun07@gmail.com"
          className="inline-block rounded-[2px] bg-amber px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(255,180,84,0.6)]"
        >
          Email me
        </a>
      </div>

      <dl className="st board mt-12 max-w-md border-t border-border pt-6" style={delay(280)}>
        <dt>Email</dt>
        <dd>
          <a
            href="mailto:cadensun07@gmail.com"
            className="link-underline normal-case transition-colors hover:text-amber"
          >
            cadensun07@gmail.com
          </a>
        </dd>
        <dt>LinkedIn</dt>
        <dd>
          <a
            href="https://linkedin.com/in/cadensun"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-amber"
          >
            /in/cadensun ↗
          </a>
        </dd>
        <dt>GitHub</dt>
        <dd>
          <a
            href="https://github.com/Quaden2307"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-amber"
          >
            /Quaden2307 ↗
          </a>
        </dd>
        <dt>Resume</dt>
        <dd>
          <a
            href="/caden_sun_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-amber"
          >
            PDF ↗
          </a>
        </dd>
      </dl>
    </Station>
  );
}

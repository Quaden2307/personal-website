import Section from "./Section";

export default function About() {
  return (
    <Section id="about" label="01" title="About">
      <div className="grid gap-10 md:grid-cols-[1fr_200px] md:items-start">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            I&apos;m a{" "}
            <a
              href="#education"
              className="link-underline text-foreground transition-colors duration-300 hover:text-accent"
            >
              Mathematics
            </a>{" "}
            student at the{" "}
            <a
              href="#education"
              className="link-underline text-foreground transition-colors duration-300 hover:text-accent"
            >
              University of Waterloo
            </a>{" "}
            working in the fields of Machine Learning, Data Science, and the
            software that holds them together. Right now I&apos;m helping deploy AI systems in
            production at{" "}
            <a
              href="#role-procogia"
              className="link-underline text-foreground transition-colors duration-300 hover:text-accent"
            >
              ProCogia
            </a>{" "}
            and researching volatility models with UWaterloo&apos;s
            quantitative finance team. Also working on some pretty exciting
            projects that will be deployed soon :{")"}
          </p>
        </div>

        <aside className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-border bg-gradient-to-br from-muted to-background transition-transform duration-500 hover:scale-[1.02]">
          <img
            src="/photo.jpg"
            alt="Caden Sun"
            className="h-full w-full object-cover"
          />
        </aside>
      </div>
    </Section>
  );
}

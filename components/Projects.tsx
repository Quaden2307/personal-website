import Station, { delay } from "./Station";

type Project = {
  name: string;
  description: string;
  tags: string[];
  cover?: string;
  href?: string;
  repo?: string;
};

const projects: Project[] = [
  {
    name: "Flight Price Predictor",
    description:
      "XGBoost model predicting flight prices across 200+ routes, currently around 14% error. Fed by a SQLite pipeline that pulls ~4,000 offers a day.",
    tags: ["Python", "SQLite", "XGBoost", "Pandas", "Scikit-learn"],
    cover: "/projects/flight-price.png",
    href: "https://flight-price-predictor-eosin.vercel.app/",
    repo: "https://github.com/Quaden2307/flight-price-predictor",
  },
  {
    name: "Cat Classifier",
    description:
      "Upload a cat and a fine-tuned resnet18 decides whether it's a ragdoll. Trained on 1,722 images — 0.800 precision, 0.867 recall.",
    tags: ["Python", "PyTorch", "CNNs", "Computer Vision", "Transfer Learning"],
    cover: "/projects/cat-classifier.jpg",
    href: "https://cat-classifier-five.vercel.app/",
    repo: "https://github.com/Quaden2307/cat-classifier",
  },
  {
    name: "AI Chess Bot",
    description:
      "A PyTorch network trained on Stockfish-labeled positions, served through a Flask API with a React frontend. Playable in the browser with sub-second moves.",
    tags: ["Python", "PyTorch", "Flask", "React", "TypeScript", "Docker"],
    cover: "/projects/chess-bot.png",
    href: "https://chess-bot-deployment.vercel.app/",
    repo: "https://github.com/Quaden2307/chess-engine",
  },
  {
    name: "World Cup Score Prediction Model",
    description:
      "Linear regression built from scratch in NumPy with hand-derived gradient descent, predicting World Cup goals from team history. Main finding: scoring drops era over era, so old data overpredicts modern matches.",
    tags: ["Python", "NumPy", "Scikit-learn", "Linear Regression"],
    cover: "/projects/FINA_MacGetty.webp",
    repo: "https://github.com/Quaden2307/world-cup-score-prediction-model",
  },
];

export default function Projects() {
  return (
    <Station id="projects" code="Stop 04" title="Projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <article
            key={p.name}
            className="st group rounded-[2px] border border-border bg-hull p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-dust"
            style={delay(160 + i * 90)}
          >
            <div className="bay mb-4 aspect-video w-full border border-border bg-background">
              {p.cover ? (
                <img
                  src={p.cover}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-mono text-xs text-dust/60">
                    [screenshot]
                  </span>
                </div>
              )}
              <div className="bay-door" style={delay(260 + i * 90)} aria-hidden />
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {p.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-dust">
              {p.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-6 font-mono text-xs uppercase tracking-[0.12em]">
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-foreground transition-colors hover:text-amber"
                >
                  Live ↗
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-foreground transition-colors hover:text-amber"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="st mt-10" style={delay(400)}>
        <a
          href="https://github.com/Quaden2307"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-mono text-xs uppercase tracking-[0.14em] text-dust transition-colors hover:text-amber"
        >
          See more on GitHub →
        </a>
      </div>
    </Station>
  );
}

import Section from "./Section";

type Project = {
  name: string;
  description: string;
  tags: string[];
  cover?: string;
  href?: string;
  repo?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "Flight Price Predictor",
    description:
      "End-to-end flight price prediction system covering 200+ routes across 55+ airports — an XGBoost model trained on 18 features chosen through Jupyter Notebook EDA (route distance the strongest predictor) on a 70/15/15 split, currently at ~14% error and targeting sub-10%. Backed by an SQLite ingestion pipeline pulling ~4,000 offers/day with automated cloud backup at a 0% failure rate, plus daily SQL dedup and integrity checks across 180K+ rows.",
    tags: ["Python", "SQLite", "XGBoost", "Pandas", "NumPy", "Scikit-learn"],
    cover: "/projects/flight-price.png",
    repo: "https://github.com/Quaden2307/flight-price-predictor",
    featured: true,
  },
  {
    name: "AI Chess Bot",
    description:
      "Full-stack chess AI deployed on Vercel (containerized with Docker for an alternative Render deployment), serving a PyTorch neural network (768→256→128→1, ReLU) via Flask REST API and React/TypeScript frontend — sub-second response times, publicly accessible. Improved model generalization across 4 training iterations (30% reduction in validation loss) using Stockfish-labeled data, Adam optimizer, batch normalization, and hand-crafted signals (material balance, castling rights, center control).",
    tags: ["Python", "PyTorch", "Flask", "React", "TypeScript", "Docker"],
    cover: "/projects/chess-bot.png",
    href: "https://chess-bot-deployment.vercel.app/",
    repo: "https://github.com/Quaden2307/chess-engine",
    featured: true,
  },
  {
    name: "World Cup Score Prediction Model",
    description:
      "Predicts total goals in World Cup matches from teams' historical scoring and defensive records — linear regression built from scratch in NumPy with hand-derived gradient descent, validated against a scikit-learn implementation. Trained on FIFA World Cup data (1930–2026) with a time-based split to avoid leakage, surfacing that scoring has declined across eras and causing models trained on older tournaments to overpredict modern matches.",
    tags: ["Python", "NumPy", "Scikit-learn", "Linear Regression"],
    cover: "/projects/world-cup.jpeg",
    repo: "https://github.com/Quaden2307/world-cup-score-prediction-model",
  },
  {
    name: "Stock Screener",
    description:
      "Real-time stock analysis tool that visualizes market data and filters equities by user-defined criteria like volume, options, and volatility.",
    tags: ["Python", "Pandas", "NumPy", "React", "TypeScript"],
    cover: "/projects/stock-screener.png",
    href: "https://stock-trader-deploy.onrender.com/",
    repo: "https://github.com/Quaden2307/Stock-Trader",
  },
];

export default function Projects() {
  return (
    <Section id="projects" label="04" title="Projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <article
            key={i}
            className="card-glow group relative overflow-hidden rounded-xl border border-border bg-muted/20 p-6 transition-all duration-500 hover:bg-muted/40 hover:-translate-y-1"
          >
            {p.featured && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                Featured
              </span>
            )}

            <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg border border-border bg-gradient-to-br from-muted to-background">
              {p.cover ? (
                <img
                  src={p.cover}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-105">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    [screenshot]
                  </span>
                </div>
              )}
            </div>

            <h3 className="font-sans text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
              {p.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t, j) => (
                <span
                  key={j}
                  className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-5 text-sm">
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-foreground transition-colors hover:text-accent"
                >
                  Live ↗
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-foreground transition-colors hover:text-accent"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="https://github.com/Quaden2307"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          See more on GitHub →
        </a>
      </div>
    </Section>
  );
}

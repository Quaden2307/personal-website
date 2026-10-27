/*
  Every word, link and picture in the notebook lives in this file.
  Edit it to update the site; the components only lay it out.

  Titles are written in GingerInk, whose free version has letters only (no digits
  or punctuation), so keep every `title` to letters and spaces. Everything else is
  in Patrick Hand and can use anything.

  Each page has to fit on one notebook page without scrolling: keep the copy short.
*/

export type Picture = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type LinkItem = { label: string; href: string };

/** A paragraph is a list of runs; a run in `{ mark }` gets the pale-blue highlighter. */
export type Run = string | { mark: string };

export const site = {
  name: "Caden Sun",
  url: "https://cadensun.vercel.app",
  description:
    "A notebook of machine-learning models, built and measured by Caden Sun, a mathematics student at the University of Waterloo.",
  email: "c262sun@uwaterloo.ca",
  github: { label: "github.com/Quaden2307", href: "https://github.com/Quaden2307" },
  linkedin: { label: "linkedin.com/in/cadensun", href: "https://www.linkedin.com/in/cadensun" },
  graduation: 2029,
};

export const cover = {
  /** The label on the front, like an exercise book. */
  label: [
    { field: "Name", entry: "Caden Sun" },
    { field: "School", entry: "University of Waterloo" },
  ],
  note: `Mathematics, class of ${site.graduation}`,
  /** Written at the bottom of the cover, so visitors know the book opens. */
  open: { pointer: "Click to open", touch: "Tap to open" },
};

/** The stationery on the desk beside the notebook: the ways to get in touch. */
export const desk = {
  label: "Get in touch",
  pencil: { text: site.email, href: `mailto:${site.email}`, name: `Email Caden at ${site.email}` },
  eraser: { brand: "GitHub", model: "Quaden2307", href: site.github.href, name: "Caden’s GitHub, Quaden2307" },
  note: { word: "LinkedIn", handle: "in/cadensun", href: site.linkedin.href, name: "Caden’s LinkedIn, in/cadensun" },
};

/** The cat on the other side of the book, and the ball of yarn it plays with: drag the yarn and let go to throw it. */
export const cat = {
  /** Written beside the yarn in marker. GingerInk has letters only, so a closing "!" is drawn to match. */
  hint: "Throw me around!",
  yarn: { label: "Throw me around! The cat’s ball of yarn" },
};

/** Page numbers as printed in the notebook (the cover and contents are unnumbered). */
export const contents = {
  title: "Contents",
  entries: [
    { title: "About me", page: 1, chapter: "about" },
    { title: "Experience", page: 2, chapter: "experience" },
    { title: "Projects", page: 6, chapter: "projects" },
  ],
};

export const about: { title: string; paragraphs: Run[][]; portrait: Picture } = {
  title: "About me",
  paragraphs: [
    [
      `Hi! I’m Caden, a mathematics student at the University of Waterloo, graduating in ${site.graduation}. I’m interested in software engineering, machine learning, and AI.`,
    ],
    [
      "This summer I built an AI calling agent at ProCogia. Now I help Professor Jimmy Lin’s Castorini group with retrieval research, and in winter 2027 I join Bits In Glass as a machine learning engineer.",
    ],
  ],
  portrait: {
    src: "/images/portrait.jpg",
    width: 750,
    height: 1000,
    alt: "Caden in a cream hoodie and a black apron, pulling a face and holding out a plate of little white dough balls.",
  },
};

export type Role = {
  key: string;
  title: string;
  dates: string;
  summary: string;
  /** Left out for a role that has not started yet. */
  tools?: string;
  /** A few photographs taped in under a note, with an arrow from the note to them. */
  photos?: { note: string; pictures: Picture[] };
  /** A paper someone else wrote, taped in under a note with an arrow to it. */
  reading?: { note: string; title: string; authors: string; source: string; href: string };
  logo: Picture;
};

export const experience = {
  title: "Experience",
  roles: [
    {
      key: "bits-in-glass",
      title: "Machine learning engineer at Bits In Glass",
      dates: "Incoming, winter 2027",
      summary:
        "A global boutique technology firm that designs, builds and runs enterprise AI, with the data, processes and platforms around it.",
      logo: { src: "/logos/bits-in-glass.png", width: 703, height: 144, alt: "Bits In Glass" },
    },
    {
      key: "procogia",
      title: "AI engineering intern at ProCogia",
      dates: "May to August 2026",
      summary:
        "At ProCogia I built an AI calling agent and was responsible for designing and implementing the system behind it. It was my first time working in Vancouver, and I got to see all the cool views and mountains. My favourite part of the city was Kitsilano.",
      photos: {
        note: "Some of my favourite photos I took",
        pictures: [
          {
            src: "/images/vancouver/sunset.jpg",
            width: 640,
            height: 640,
            alt: "A pink and orange sunset over the water, freighters at anchor, mountains in silhouette and two people wading in.",
          },
          {
            src: "/images/vancouver/skyline.jpg",
            width: 640,
            height: 640,
            alt: "Downtown Vancouver's towers across the harbour from the seawall, under a grey sky and maple leaves.",
          },
          {
            src: "/images/vancouver/haze.jpg",
            width: 640,
            height: 640,
            alt: "A hazy sun over calm water, its light on the waves, and a windswept pine on the rocks.",
          },
        ],
      },
      logo: { src: "/logos/procogia.png", width: 590, height: 144, alt: "ProCogia" },
    },
    {
      key: "jimmy-lin",
      title: "Research assistant to Professor Jimmy Lin",
      dates: "June 2026 to now",
      summary:
        "Testing multi-stage retrieval on TREC benchmarks in the Castorini group, from BM25 to listwise LLM reranking. Folded 24 near-duplicate tests into 5 suites merged into Pyserini, and fixed a caching bug that forced a 2 GB download on every fresh install.",
      tools: "Python, BM25, LLM reranking, TREC",
      reading: {
        note: "My favourite paper I’ve read",
        title: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs", // taste-skill-ignore: the paper's own title
        authors: "Yu. A. Malkov and D. A. Yashunin",
        source: "arXiv:1603.09320",
        href: "https://arxiv.org/abs/1603.09320",
      },
      logo: { src: "/logos/uwaterloo.png", width: 638, height: 144, alt: "University of Waterloo" },
    },
    {
      key: "wat-street",
      title: "ML engineer at Wat Street",
      dates: "January to August 2026",
      summary:
        "Volatility forecasting with Waterloo’s quantitative finance team: a pipeline from raw S&P 500 OHLCV data to 10 engineered features, and the PyTorch module that feeds a graph attention network into an LSTM across 500 stocks.",
      tools: "Python, PyTorch, pandas, NumPy",
      logo: { src: "/logos/wat-street.png", width: 132, height: 144, alt: "Wat Street" },
    },
  ] satisfies Role[],
};

export type Cat = {
  key: string;
  label: string;
  picture: Picture;
  verdict: string;
};

export type Project = {
  key: string;
  title: string;
  category: string;
  summary: string;
  facts: [string, string][];
  links: LinkItem[];
  picture?: Picture;
  /** A short muted loop shown in place of the picture; the poster is the still. */
  clip?: { src: string; type: string; poster: Picture };
  judge?: { legend: string; cats: Cat[] };
};

export const projects = {
  title: "Projects",
  list: [
    {
      key: "flight",
      title: "Flight Price Predictor",
      category: "Gradient boosting, live",
      summary:
        "An XGBoost model that prices round-trip flights on 200+ routes across 55+ airports. It misses by 14.6% on average on held-out trips, against 17.1% for a linear baseline. The pipeline collects about 4,000 offers a day.",
      facts: [],
      links: [
        { label: "Live demo", href: "https://flight-price-predictor-eosin.vercel.app/" },
        { label: "GitHub", href: "https://github.com/Quaden2307/flight-price-predictor" },
      ],
      picture: {
        src: "/images/flight.png",
        width: 1600,
        height: 1000,
        alt: "The predictor’s preview pricing a December flight from New York to Tokyo at $1,260, and marking a $980 fare as 22% below typical.",
      },
    },
    {
      key: "cat",
      title: "Cat Classifier",
      category: "Image classification, live",
      summary:
        "A ResNet-18 fine-tuned on 1,722 photos decides whether a cat is a ragdoll, right in your browser. Answering no every time scored 77%, so a class-weighted loss ended that shortcut; a from-scratch baseline reached only 0.48 F1.",
      facts: [
        ["F1", "0.832"],
        ["Precision", "0.800"],
        ["Recall", "0.867"],
      ],
      links: [
        { label: "Live demo", href: "https://cat-classifier-five.vercel.app/" },
        { label: "GitHub", href: "https://github.com/Quaden2307/cat-classifier" },
      ],
      judge: {
        legend: "Four cats, one judge",
        // Verdicts from the classifier on exactly these pictures; the other three cats are from its test set.
        cats: [
          {
            key: "caden",
            label: "Caden’s cat",
            picture: {
              src: "/images/cats/caden.jpg",
              width: 828,
              height: 1104,
              alt: "Caden’s ragdoll cat in round sunglasses and a gold chain, sitting on a grey cushion.",
            },
            verdict: "Ragdoll, 84% sure.",
          },
          {
            key: "ragdoll",
            label: "A ragdoll",
            picture: {
              src: "/images/cats/ragdoll.jpg",
              width: 900,
              height: 1200,
              alt: "A cream ragdoll with fawn ears and mask and bright blue eyes, lying with its white front paws stretched out.",
            },
            verdict: "Ragdoll, 99.58% sure.",
          },
          {
            key: "tabby",
            label: "A tabby",
            picture: {
              src: "/images/cats/tabby.jpg",
              width: 900,
              height: 1200,
              alt: "A grey-brown striped tabby with wide yellow-green eyes, close up and looking straight at the camera.",
            },
            verdict: "Not a ragdoll, 99.97% sure.",
          },
          {
            key: "siamese",
            label: "A Siamese",
            picture: {
              src: "/images/cats/siamese.jpg",
              width: 900,
              height: 1200,
              alt: "A seal-point Siamese with a dark brown face and ears and deep blue eyes, against a bright, blurred green background.",
            },
            verdict: "Not a ragdoll, 99.6% sure.",
          },
        ],
      },
    },
    {
      key: "chess",
      title: "Chess Bot",
      category: "Alpha-beta search, live",
      summary:
        "Negamax search with alpha-beta pruning, iterative deepening and quiescence search, a Zobrist-hashed transposition table and a tapered evaluation. A Flask API on Vercel answers a React board with a live evaluation bar.",
      facts: [],
      links: [
        { label: "Live demo", href: "https://chess-bot-deployment.vercel.app/" },
        { label: "GitHub", href: "https://github.com/Quaden2307/chess-engine" },
      ],
      clip: {
        src: "/videos/chess.webm",
        type: "video/webm",
        poster: {
          src: "/images/chess-poster.jpg",
          width: 1600,
          height: 1000,
          alt: "A short muted recording: White plays knight to f3, the bot answers by taking on c3, and new candidate-move arrows appear.",
        },
      },
    },
    {
      key: "world-cup",
      title: "World Cup Goal Predictor",
      category: "Linear regression, from scratch",
      summary:
        "Linear regression in NumPy with hand-derived gradient descent, predicting the goals in a match. It barely beats guessing the average, and loses on later tournaments: it learned 2.9 goals a match, and the next eight years averaged 2.5.",
      facts: [],
      links: [{ label: "GitHub", href: "https://github.com/Quaden2307/world-cup-score-prediction-model" }],
      picture: {
        src: "/images/world-cup-goals.png",
        width: 1600,
        height: 1000,
        alt: "Dot chart of goals per match at each men’s World Cup from 1930 to 2022: the six tournaments from 1930 to 1958 averaged 4.25, peaking at 5.38 in 1954, while all sixteen since 1962 stayed below 3, averaging 2.59.",
      },
    },
  ] satisfies Project[],
};

/** The back cover: how to reach Caden, on a label like the front cover's, and a way back to the start. */
export const backCover = {
  links: [
    { field: "Email", label: site.email, href: `mailto:${site.email}` },
    { field: "LinkedIn", label: site.linkedin.label, href: site.linkedin.href },
    { field: "GitHub", label: site.github.label, href: site.github.href },
  ] satisfies (LinkItem & { field: string })[],
  restart: "Back to the start",
};

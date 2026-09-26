// Single source for project cards, case-study pages, sitemap and prerendered metadata.
// Only add facts that can be verified (repo README, live demo). See README "Adding a project".

export const SITE_URL = "https://abhishekmamdapure.com";
export const GITHUB_URL = "https://github.com/abhishekmamdapure";

export const PROJECTS = [
  {
    slug: "jev-information-extraction",
    title: "Jev Information Extraction",
    summary: "Ask questions about a PDF and see which source text answers them, with a probability and its location on the page.",
    problem:
      "Pulling specific values (a GST number, an invoice total) out of PDFs usually means reading the whole document. The answer also needs to be traceable to where it appears on the page.",
    solution:
      "A FastAPI service extracts embedded text chunks and their coordinates from each page, then asks TypeSafe's jev-latest model to rank which chunk answers each question. The UI shows the top match, a second-best alternative, and red boxes over matching chunks on the rendered page.",
    architecture: [
      "Upload PDF (or pick a sample)",
      "Extract text chunks + page coordinates (pdf-inspector), render page (PDFium)",
      "Per page: one Jev request with all questions as Choice criteria",
      "Map probabilities back to chunks; highlight those above the cutoff",
    ],
    decisions: [
      "Answers are extracted source text, not rewritten, so every result can be checked against the page.",
      "Batch runs process up to eight pages in parallel; results stay page-specific.",
      "The API key is supplied per session from the browser and never stored in frontend config.",
      "Frontend and API are served from one FastAPI service, so there is a single deployment.",
    ],
    technologies: ["Python", "FastAPI", "TypeSafe Jev", "PDFium", "Docker", "Railway"],
    notes:
      "This is question-to-chunk selection, not a benchmark: the app reports model probabilities, not accuracy metrics.",
    image: null,
    imageAlt: "",
    repositoryUrl: "https://github.com/abhishekmamdapure/jev-information-extraction",
    demoUrl: "/jev",
    featured: true,
  },
  {
    slug: "nobel-atlas",
    title: "Nobel Atlas",
    summary: "Interactive world map of Nobel laureates' birthplaces with search, filters and a cumulative timeline.",
    problem:
      "Nobel Prize data is spread across the official Nobel API and Wikidata, which makes it hard to explore laureates by place, field, or period.",
    solution:
      "An ingestion pipeline pulls every page of the official Nobel API, enriches records from Wikidata, validates them against a shared Zod schema, and upserts them into MongoDB. A React + Leaflet explorer reads them through a single read-only API route.",
    architecture: [
      "Ingestion: Nobel API + Wikidata → Zod validation → MongoDB upsert",
      "Server: /api/laureates (GET only, validated public fields)",
      "Client: React Query → Leaflet map, search, filters, timeline",
    ],
    decisions: [
      "The MongoDB driver runs only on the server and in ingestion, never in the browser.",
      "Country boundaries are bundled (Natural Earth), so the map needs no tile API key or third-party tile requests.",
      "Organisations stay in the list but never get fabricated birth pins or life status.",
      "Supports reduced motion and keyboard navigation, with loading, error and empty states.",
    ],
    technologies: ["TypeScript", "React", "Vite", "Leaflet", "React Query", "Zod", "MongoDB", "Railway"],
    notes: "“Living” means no death is recorded in the imported sources, not real-time verification.",
    image: "/projects/nobel-atlas.webp",
    imageAlt: "Nobel Atlas world map with laureate birthplaces clustered by country",
    shareImage: "/og/nobel-atlas.jpg", // 1200×630 JPG for link previews
    repositoryUrl: "https://github.com/abhishekmamdapure/nobel-atlas",
    demoUrl: "/nobel",
    featured: true,
  },
];

// Professional work: title only until details are cleared for publication.
export const WORK_HIGHLIGHTS = [
  { title: "Generative AI IVR System", org: "Citi", image: "/projects/citi-genai-ivr.webp" },
  { title: "Medical NLP Entity Extraction System", org: "Pienomial", image: "/projects/medical-nlp-entity-extraction.webp" },
  { title: "AI Chatbot for Contextual Graphs & Plots", org: "Pienomial", image: "/projects/chatbot-graphs-plots.webp" },
  { title: "Life Sciences Knowledge Graph Pipeline", org: "Pienomial", image: "/projects/life-sciences-knowledge-graph.webp" },
  { title: "Embeddings-Based Search Engine", org: "Pienomial", image: "/projects/embeddings-search-engine.webp" },
  { title: "Natural Language → SQL Conversion System", org: "Affine", image: "/projects/nl-to-sql.webp" },
];

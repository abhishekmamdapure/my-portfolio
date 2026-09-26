import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PROJECTS, WORK_HIGHLIGHTS } from "./data/projects";

// Secondary pages scroll inside #root because the home layout locks body overflow on xl.
function Shell({ children }) {
  return (
    <div className="h-full overflow-y-auto bg-bg font-body text-gray-200">
      <header className="max-w-4xl mx-auto px-4 pt-6 flex items-center justify-between text-sm">
        <a href="/" className="font-display font-bold text-white">Abhishek Mamdapure</a>
        <nav aria-label="Primary" className="flex gap-5 text-gray-400">
          <a href="/projects" className="hover:text-white">Projects</a>
          <a href="/resume.pdf" className="hover:text-white">Resume</a>
          <a href="https://github.com/abhishekmamdapure" className="hover:text-white">GitHub</a>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}

export function ProjectLinks({ project, compact = false }) {
  const cls = compact
    ? "inline-flex items-center gap-1 text-[11px] text-gray-300 hover:text-white"
    : "inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-[#161616] text-sm text-gray-200 hover:border-accent hover:text-white";
  const size = compact ? 11 : 14;
  return (
    <div className={compact ? "flex gap-3" : "flex flex-wrap gap-3"}>
      {project.demoUrl && (
        <a href={project.demoUrl} className={cls}>
          <ExternalLink size={size} className="text-accent" aria-hidden="true" /> Live demo
        </a>
      )}
      <a href={project.repositoryUrl} className={cls}>
        <Github size={size} className="text-accent" aria-hidden="true" /> Source
      </a>
    </div>
  );
}

function ProjectImage({ project, className }) {
  return project.image ? (
    <img src={project.image} alt={project.imageAlt} width="640" height="336" className={`object-cover ${className}`} />
  ) : (
    <div aria-hidden="true" className={`flex items-center justify-center bg-gradient-to-br from-accent/30 to-purple-900/40 font-display font-bold text-white text-lg ${className}`}>
      {project.title}
    </div>
  );
}

export function ProjectsPage() {
  return (
    <Shell>
      <h1 className="font-display text-3xl font-bold text-white mb-2">Projects</h1>
      <p className="text-gray-400 mb-8">Independent projects with source code and live demos.</p>
      <ul className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <li key={p.slug} className="card overflow-hidden flex flex-col">
            <ProjectImage project={p} className="w-full aspect-[40/21]" />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <h2 className="font-display text-lg font-bold text-white">
                <a href={`/projects/${p.slug}`} className="hover:text-accent">{p.title}</a>
              </h2>
              <p className="text-sm text-gray-400 flex-1">{p.summary}</p>
              <a href={`/projects/${p.slug}`} className="text-sm text-accent hover:underline">Read the case study →</a>
              <ProjectLinks project={p} compact />
            </div>
          </li>
        ))}
      </ul>

      <h2 className="font-display text-xl font-bold text-white mt-14 mb-2">Professional work</h2>
      <p className="text-gray-400 mb-6 text-sm">Systems built at previous employers; code is not public.</p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {WORK_HIGHLIGHTS.map((w) => (
          <li key={w.title} className="card overflow-hidden">
            <img src={w.image} alt="" width="640" height="360" loading="lazy" className="w-full aspect-video object-cover" />
            <p className="p-3 text-xs text-gray-300">{w.title} <span className="text-muted">· {w.org}</span></p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-white mb-3">{title}</h2>
      {children}
    </section>
  );
}

export function ProjectPage({ slug }) {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  return (
    <Shell>
      <a href="/projects" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={14} aria-hidden="true" /> All projects
      </a>
      <h1 className="font-display text-3xl font-bold text-white mb-3">{p.title}</h1>
      <p className="text-lg text-gray-300 mb-6">{p.summary}</p>
      <ProjectLinks project={p} />
      <ProjectImage project={p} className="w-full aspect-[40/21] rounded-2xl border border-border mt-8" />

      <Section title="Problem"><p className="text-gray-300 leading-relaxed">{p.problem}</p></Section>
      <Section title="Solution"><p className="text-gray-300 leading-relaxed">{p.solution}</p></Section>
      <Section title="How it works">
        <ol className="flex flex-col gap-2">
          {p.architecture.map((step, i) => (
            <li key={step} className="card px-4 py-3 text-sm text-gray-300 flex gap-3">
              <span className="text-accent font-bold">{i + 1}</span>{step}
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Key decisions">
        <ul className="list-disc pl-5 flex flex-col gap-2 text-gray-300">
          {p.decisions.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </Section>
      <Section title="Stack">
        <ul className="flex flex-wrap gap-2">
          {p.technologies.map((t) => <li key={t} className="skill-chip">{t}</li>)}
        </ul>
      </Section>
      {p.notes && <p className="mt-10 text-sm text-gray-400 border-l-2 border-accent pl-4">{p.notes}</p>}
    </Shell>
  );
}

export function NotFound() {
  return (
    <Shell>
      <h1 className="font-display text-3xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-gray-400 mb-6">That page doesn’t exist.</p>
      <a href="/projects" className="text-accent hover:underline">See all projects</a>
    </Shell>
  );
}

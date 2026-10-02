import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Deep Punj, PhD — Physics-Informed Data Scientist & AI Specialist",
      },
      {
        name: "description",
        content:
          "Portfolio of Deep Punj, PhD — physics-informed data scientist and AI specialist. Research-driven ML: PINNs, surrogate modeling, forecasting, and MLOps.",
      },
      {
        property: "og:title",
        content: "Deep Punj, PhD — Physics-Informed Data Scientist & AI Specialist",
      },
      {
        property: "og:description",
        content:
          "Embedding conservation laws and governing equations into neural systems — PINNs, surrogates, forecasting, and deployed MLOps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SKILLS: { category: string; items: { name: string; level: string }[] }[] = [
  {
    category: "Languages & Data",
    items: [
      { name: "Python", level: "Expert" },
      { name: "SQL", level: "Advanced" },
      { name: "NumPy / Pandas", level: "Expert" },
      { name: "Polars", level: "Advanced" },
    ],
  },
  {
    category: "Deep Learning",
    items: [
      { name: "PyTorch", level: "Expert" },
      { name: "JAX", level: "Advanced" },
      { name: "scikit-learn", level: "Expert" },
    ],
  },
  {
    category: "Interfaces & Apps",
    items: [
      { name: "Streamlit", level: "Expert" },
      { name: "FastAPI", level: "Advanced" },
      { name: "Plotly", level: "Advanced" },
    ],
  },
  {
    category: "MLOps & Infrastructure",
    items: [
      { name: "MLOps", level: "Advanced" },
      { name: "Docker", level: "Advanced" },
      { name: "MLflow", level: "Advanced" },
      { name: "GitHub Actions", level: "Proficient" },
    ],
  },
];

const PHASES = [
  {
    label: "Phase 01",
    title: "Physics",
    body: "Governing equations, conservation laws, first principles.",
  },
  {
    label: "Phase 02",
    title: "Modeling",
    body: "Differentiable solvers and surrogate approximation.",
  },
  {
    label: "Phase 03",
    title: "AI in production",
    body: "Deployed, monitored, physics-checked systems.",
  },
];

function SectionHeading({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-2 border-b border-border pb-5">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {index}
        {note ? ` — ${note}` : ""}
      </span>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen font-display antialiased">
      <SiteHeader />
      <main id="main">
      {/* Hero */}
      <section aria-labelledby="hero-title" className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          PhD · Physics-Informed Data Scientist & AI Specialist
        </div>
        <h1 id="hero-title" className="max-w-[14ch] text-4xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Turning physical laws into{" "}
          <span className="text-primary">predictive AI</span>.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
          I translate conservation laws and governing equations into differentiable,
          deployable models — so neural networks respect the physics they describe.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
          >
            View selected work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
          >
            Get in touch
          </a>
        </div>
        <dl className="mt-12 grid grid-cols-3 gap-4 sm:flex sm:gap-10 border-t border-border pt-6">
          {[
            { value: "12+", label: "Publications" },
            { value: "40+", label: "Models shipped" },
            { value: "7", label: "Production deployments" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-xl font-semibold sm:text-2xl">{stat.value}</dd>
              <dd className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Selected work */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8">
        <SectionHeading index="01" title="Selected work" note="03 projects" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>{project.id} · {project.tag}</span>
              </div>
              <h3 className="text-xl font-semibold leading-snug tracking-tight">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="hover:text-primary"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-border px-2 py-0.5"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  aria-label={`Case study: ${project.title}`}
                  className="inline-flex min-h-9 items-center rounded-full border border-primary/50 px-3.5 text-xs font-medium text-primary"
                >
                  Details
                </Link>
                <a
                  href={project.links.demo}
                  aria-label={`Live demo: ${project.title}`}
                  className="inline-flex min-h-9 items-center rounded-full bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-85"
                >
                  Live demo
                </a>
                <a
                  href={project.links.github}
                  aria-label={`GitHub: ${project.title}`}
                  className="inline-flex min-h-9 items-center rounded-full border border-border px-3.5 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary"
                >
                  GitHub
                </a>
                <a
                  href={project.links.article}
                  aria-label={`Article: ${project.title}`}
                  className="inline-flex min-h-9 items-center rounded-full border border-border px-3.5 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Article
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8">
        <SectionHeading index="02" title="Skill matrix" note="categorized" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((group) => (
            <div key={group.category} className="rounded-xl border border-border bg-card p-5">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                {group.category}
              </p>
              <ul className="space-y-2.5 text-sm">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span>{skill.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8">
        <SectionHeading index="03" title="From physics to AI" note="the throughline" />
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="max-w-[54ch] text-lg leading-relaxed text-foreground/90 lg:col-span-7">
            My training began with the hard sciences — deriving conservation laws, solving
            governing equations, and insisting that a model must obey the physics it claims
            to represent. That discipline became my method. I build neural systems that
            inherit physical structure rather than learn it from scratch, so predictions
            stay grounded, interpretable, and fast.
          </p>
          <div className="space-y-3 lg:col-span-5">
            {PHASES.map((phase) => (
              <div
                key={phase.label}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {phase.label}
                </div>
                <div className="mt-1 font-semibold">{phase.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{phase.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </main>
      {/* Contact footer */}
      <footer id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-10 sm:px-8">
        <div className="mt-8 flex flex-col justify-between gap-8 border-t border-border py-14 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Let's model something real
            </p>
            <a
              href="mailto:deep.punj@example.com"
              className="break-all text-2xl font-semibold tracking-tight transition-colors hover:text-primary sm:text-4xl"
            >
              deep.punj@example.com
            </a>
          </div>
          <nav aria-label="Social" className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Scholar
            </a>
          </nav>
        </div>
        <p className="border-t border-border pt-6 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          © 2026 Deep Punj — Physics-Informed Data Scientist & AI Specialist
        </p>
      </footer>
    </div>
  );
}

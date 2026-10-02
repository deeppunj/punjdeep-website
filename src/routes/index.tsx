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
    <div className="mb-10 flex flex-wrap items-end justify-between gap-3 border-b-2 border-border pb-5">
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      <span className="font-mono text-xs font-medium uppercase text-muted-foreground">
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
      <section aria-labelledby="hero-title" className="hero-surface mx-auto max-w-6xl overflow-hidden px-5 pb-24 pt-14 sm:px-8 sm:pt-24">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/80 px-4 py-2 font-mono text-xs font-medium uppercase text-foreground shadow-sm backdrop-blur-sm">
          <span className="size-2 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
          PhD · Physics-Informed Data Scientist & AI Specialist
        </div>
        <h1 id="hero-title" className="max-w-[14ch] text-5xl font-semibold leading-[1.04] text-balance sm:text-6xl lg:text-7xl">
          Website's work in progress
        </h1>
        <p className="mt-7 max-w-[52ch] text-xl leading-relaxed text-foreground/80 sm:text-2xl">
          I translate conservation laws and governing equations into differentiable,
          deployable models — so neural networks respect the physics they describe.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-base font-medium text-foreground/85" aria-label="Areas of expertise">
          {["Physics-informed ML", "Surrogate modeling", "Production AI"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />{item}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="/deep-punj-resume.pdf"
            download="Deep_Punj_Resume.pdf"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-[0_10px_32px_-14px_var(--primary)] transition-opacity hover:opacity-85"
            aria-label="Download résumé (PDF)"
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
              <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
            </svg>
            Download résumé
          </a>
          <a
            href="#work"
            className="inline-flex min-h-12 items-center rounded-full border-2 border-border bg-background/60 px-6 text-base font-semibold backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          >
            View selected work
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center rounded-full border-2 border-border bg-background/60 px-6 text-base font-semibold backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          >
            Get in touch
          </a>
        </div>
        <dl className="mt-14 grid grid-cols-1 gap-5 border-t-2 border-border pt-7 xs:grid-cols-3 sm:flex sm:gap-12">
          {[
            { value: "12+", label: "Publications" },
            { value: "40+", label: "Models shipped" },
            { value: "7", label: "Production deployments" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-2xl font-semibold text-primary sm:text-3xl">{stat.value}</dd>
              <dd className="mt-1 text-sm font-medium text-muted-foreground">
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
              className="project-card flex flex-col rounded-xl border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="relative z-10 mb-6 flex items-center justify-between font-mono text-xs font-medium uppercase text-primary">
                <span>{project.id} · {project.tag}</span>
              </div>
              <h3 className="relative z-10 text-2xl font-semibold leading-snug">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="hover:text-primary"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="relative z-10 mt-4 flex-1 text-base leading-relaxed text-foreground/75">
                {project.description}
              </p>
              <div className="relative z-10 mt-5 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <div className="relative z-10 mt-7 flex flex-wrap gap-2">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  aria-label={`Case study: ${project.title}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-primary/60 px-4 text-sm font-semibold text-primary"
                >
                  Details
                </Link>
                <a
                  href={project.links.demo}
                  aria-label={`Live demo: ${project.title}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85"
                >
                  Live demo
                </a>
                <a
                  href={project.links.github}
                  aria-label={`GitHub: ${project.title}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
                >
                  GitHub
                </a>
                <a
                  href={project.links.article}
                  aria-label={`Article: ${project.title}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
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
            <div key={group.category} className="project-card rounded-xl border border-border p-6">
              <p className="relative z-10 mb-5 font-mono text-xs font-semibold uppercase text-primary">
                {group.category}
              </p>
              <ul className="relative z-10 space-y-3 text-base">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span>{skill.name}</span>
                    <span className="font-mono text-xs font-medium uppercase text-muted-foreground">
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
          <p className="max-w-[54ch] text-xl leading-relaxed text-foreground/90 lg:col-span-7 sm:text-2xl">
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
                className="project-card rounded-xl border border-border p-6"
              >
                <div className="relative z-10 font-mono text-xs font-medium uppercase text-primary">
                  {phase.label}
                </div>
                <div className="relative z-10 mt-2 text-lg font-semibold">{phase.title}</div>
                <div className="relative z-10 mt-2 text-base leading-relaxed text-muted-foreground">{phase.body}</div>
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
            <p className="mb-3 font-mono text-sm font-medium uppercase text-primary">
              Let's model something real
            </p>
            <a
              href="mailto:deep.punj@example.com"
              className="break-all text-2xl font-semibold tracking-tight transition-colors hover:text-primary sm:text-4xl"
            >
              deep.punj@example.com
            </a>
          </div>
          <nav aria-label="Social" className="flex flex-wrap gap-6 font-mono text-sm font-medium uppercase text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Scholar
            </a>
            <a
              href="/deep-punj-resume.pdf"
              download="Deep_Punj_Resume.pdf"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
              </svg>
              Résumé (PDF)
            </a>
          </nav>
        </div>
        <p className="border-t border-border pt-6 pb-4 text-sm text-muted-foreground">
          © 2026 Deep Punj — Physics-Informed Data Scientist & AI Specialist
        </p>
      </footer>
    </div>
  );
}

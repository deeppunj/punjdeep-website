import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getProject, PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — Deep Punj" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const title = `${p.title} — Deep Punj, PhD`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <div className="min-h-screen font-display">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <h1 className="text-3xl font-semibold">Project not found</h1>
        <Link to="/" hash="work" className="mt-6 inline-block text-primary underline underline-offset-4">
          Back to all projects
        </Link>
      </main>
    </div>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length]!;

  return (
    <div className="min-h-screen font-display antialiased">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
        <Link
          to="/"
          hash="work"
          className="inline-flex items-center gap-2 py-2 font-mono text-sm font-medium uppercase text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden /> All projects
        </Link>

        <p className="mt-8 font-mono text-sm font-semibold uppercase text-primary">
          {p.id} · {p.tag}
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
          {p.title}
        </h1>
        <p className="mt-5 max-w-[60ch] text-xl leading-relaxed text-foreground/80">{p.description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          <a href={p.links.demo} className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-85">
            Live demo
          </a>
          <a href={p.links.github} className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-medium hover:border-primary/50 hover:text-primary">
            GitHub code
          </a>
          <a href={p.links.article} className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-medium hover:border-primary/50 hover:text-primary">
            Article
          </a>
        </div>

        <dl className="project-card mt-12 grid grid-cols-2 gap-6 rounded-xl border border-border p-6 sm:grid-cols-4">
          {[
            ["Year", p.year],
            ["Role", p.role],
            ["Key result", p.metrics[0]],
            ["Impact", p.metrics[1]],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="relative z-10 font-mono text-xs font-medium uppercase text-primary">{k}</dt>
              <dd className="relative z-10 mt-2 text-base font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="problem" className="mt-12">
          <h2 id="problem" className="text-2xl font-semibold tracking-tight">The problem</h2>
          <p className="mt-3 leading-relaxed text-foreground/90">{p.problem}</p>
        </section>

        <section aria-labelledby="approach" className="mt-10">
          <h2 id="approach" className="text-2xl font-semibold tracking-tight">Approach</h2>
          <ol className="mt-4 space-y-3">
            {p.approach.map((step, i) => (
              <li key={step} className="project-card flex gap-4 rounded-xl border border-border p-5 text-base">
                <span className="relative z-10 font-mono text-sm font-semibold text-primary" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative z-10 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="results" className="mt-10">
          <h2 id="results" className="text-2xl font-semibold tracking-tight">Results</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed marker:text-primary">
            {p.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="stack" className="mt-10">
          <h2 id="stack" className="text-2xl font-semibold tracking-tight">Tech stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-sm font-medium">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label="Next project" className="mt-16 border-t border-border pt-8">
          <p className="font-mono text-sm font-medium uppercase text-muted-foreground">Next project</p>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="mt-2 inline-block text-2xl font-semibold tracking-tight hover:text-primary"
          >
            {next.title} →
          </Link>
        </nav>
      </main>
    </div>
  );
}

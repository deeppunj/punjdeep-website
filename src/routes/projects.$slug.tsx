import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactSection } from '@/components/portfolio-sections';
import { ProjectFigure } from '@/components/project-figure';
import { getProject, LEGACY_PROJECT_SLUGS, PROJECTS } from '@/lib/projects';
import { pageHead } from '@/lib/site-content';
export const Route = createFileRoute('/projects/$slug')({
  staticData: { sitemap: true },
  loader: ({params}) => {
    const legacy = LEGACY_PROJECT_SLUGS[params.slug];
    if (legacy) throw redirect({ to: '/projects/$slug', params: { slug: legacy }, statusCode: 301 });
    const project = getProject(params.slug); if (!project) throw notFound(); return {project};
  },
  head: ({loaderData}) => loaderData ? pageHead(`${loaderData.project.title} — Deep Punj, PhD`, loaderData.project.description, `/projects/${loaderData.project.slug}`, loaderData.project.image) : {meta:[{title:'Study unavailable — Deep Punj, PhD'}, {name:'description',content:'Find the selected scientific and analytical studies by Deep Punj.'},{property:'og:title',content:'Study unavailable — Deep Punj, PhD'},{property:'og:description',content:'Return to the selected project studies.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex'}]},
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});
function ProjectNotFound() { return <main id="main" className="page-width py-24"><p className="section-label">404 / Study not found</p><h1 className="editorial-title mt-4 text-5xl">Let’s get back to the work.</h1><p className="mt-5 text-muted-foreground">This study does not exist or its address has changed.</p><Button asChild className="mt-8"><Link to="/" hash="projects">View selected work</Link></Button></main>; }
function ProjectPage() {
  const {project:p} = Route.useLoaderData();
  const index = PROJECTS.findIndex(x => x.slug === p.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const result = p.sections.find(s => s.title === 'Results');
  const limitations = p.sections.find(s => s.title === 'Limitations');
  return <><main id="main" className="page-width pb-16 pt-8 sm:pt-12">
    <Link to="/" hash="projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" aria-hidden/>All selected work</Link>
    <header className="pb-10 pt-10"><p className="section-label">{p.category} / Case study</p><h1 className="editorial-title mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">{p.title}</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{p.description}</p><ul className="mt-6 flex flex-wrap gap-3 font-mono text-xs text-primary">{p.stack.map(s => <li key={s}>{s}</li>)}</ul><div className="mt-7 flex gap-3"><Button asChild><a href={p.links.github} target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight aria-hidden/></a></Button>{p.links.demo && <Button asChild variant="outline"><a href={p.links.demo}>Live demo</a></Button>}{p.links.article && <Button asChild variant="outline"><a href={p.links.article}>Article</a></Button>}</div></header>
    <div className="mb-8 grid gap-6 border-y border-border py-6 md:grid-cols-2">
      {result && <div className="min-w-0"><h2 className="text-xl font-medium">Key result</h2><p className="mt-3 leading-relaxed text-muted-foreground">{result.paragraphs[0]}</p></div>}
      {limitations && <div className="min-w-0"><h2 className="text-xl font-medium">Limitations at a glance</h2><p className="mt-3 leading-relaxed text-muted-foreground">{limitations.paragraphs[0]}</p><a href={`#section-${p.sections.indexOf(limitations)}`} className="mt-3 inline-block text-primary underline underline-offset-4">Read all limitations</a></div>}
    </div>
    <ProjectFigure project={p}/>
    <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[220px_minmax(0,1fr)]"><nav aria-label="Case study sections"><div className="sticky top-28"><p className="section-label mb-5">In this study</p><ol className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground lg:block lg:space-y-3">{p.sections.map((s,i) => <li key={s.title}><a href={`#section-${i}`} className="hover:text-primary">{s.title}</a></li>)}</ol></div></nav><div className="min-w-0 max-w-3xl">{p.sections.map((s,i) => <section key={s.title} id={`section-${i}`} className="scroll-mt-28 border-t border-border pb-8 pt-6"><h2 className="text-2xl font-medium">{s.title}</h2><div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{s.paragraphs.map(t => <p key={t}>{t}</p>)}</div></section>)}</div></div>
    {next && <nav aria-label="Next study" className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8"><span className="section-label">Next study</span><Link to="/projects/$slug" params={{slug:next.slug}} className="inline-flex items-center gap-3 text-xl hover:text-primary">{next.title}<ArrowUpRight className="size-5 shrink-0" aria-hidden/></Link></nav>}
  </main><div className="border-t border-border"><ContactSection/></div></>;
}

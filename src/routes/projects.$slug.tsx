import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContactSection } from '@/components/portfolio-sections';
import { ProjectFigure } from '@/components/project-figure';
import { ProtectedEmail } from '@/components/protected-email';
import { CASE_STUDIES, getProject, LEGACY_PROJECT_SLUGS } from '@/lib/projects';
import { CV_LINK, pageHead } from '@/lib/site-content';
import { cn } from '@/lib/utils';
export const Route = createFileRoute('/projects/$slug')({
  staticData: { sitemap: true },
  beforeLoad: ({params}) => {
    const legacy = LEGACY_PROJECT_SLUGS[params.slug];
    if (legacy) throw redirect({ to: '/projects/$slug', params: { slug: legacy }, statusCode: 301 });
  },
  loader: ({params}) => {
    const project = getProject(params.slug); if (!project || project.hasCaseStudy === false) throw notFound(); return {project};
  },
  head: ({loaderData}) => loaderData ? pageHead(`${loaderData.project.title} — Deep Punj, PhD`, loaderData.project.description, `/projects/${loaderData.project.slug}`, loaderData.project.image) : {meta:[{title:'Study unavailable — Deep Punj, PhD'}, {name:'description',content:'Find the selected scientific and analytical studies by Deep Punj.'},{property:'og:title',content:'Study unavailable — Deep Punj, PhD'},{property:'og:description',content:'Return to the selected project studies.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex'}]},
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});
function ProjectNotFound() { return <main id="main" className="page-width py-24"><p className="section-label">404 / Study not found</p><h1 className="editorial-title mt-4 text-5xl">Let’s get back to the work.</h1><p className="mt-5 text-muted-foreground">This study does not exist or its address has changed.</p><Button asChild className="mt-8"><Link to="/" hash="projects">View selected work</Link></Button></main>; }
function useActiveSection(count: number) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = Array.from({ length: count }, (_, i) => document.getElementById(`section-${i}`)).filter(Boolean) as HTMLElement[];
    const update = () => { let a = 0; els.forEach((el, i) => { if (el.getBoundingClientRect().top < 160) a = i; }); setActive(a); };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [count]);
  return active;
}
function ProjectPage() {
  const {project:p} = Route.useLoaderData();
  const index = CASE_STUDIES.findIndex(x => x.slug === p.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  const active = useActiveSection(p.sections.length);
  const toc = (cls: string) => <ol className={cls}>{p.sections.map((s,i) => <li key={s.title}><a href={`#section-${i}`} aria-current={active === i ? 'location' : undefined} className={cn('block border-l-2 py-1 pl-3 transition-colors hover:text-primary', active === i ? 'border-primary text-primary' : 'border-transparent')}>{s.title}</a></li>)}</ol>;
  return <><main id="main" className="page-width pb-16 pt-8 sm:pt-12">
    <Link to="/" hash="projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" aria-hidden/>All selected work</Link>
    <header className="pb-10 pt-10"><p className="section-label">{p.category} / Case study</p>{p.label && <p className="mt-3 font-mono text-xs text-primary">{p.label}</p>}<h1 className="editorial-title mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">{p.title}</h1><p className="mt-5 max-w-[68ch] text-lg leading-relaxed text-muted-foreground">{p.description}</p><ul className="mt-6 flex flex-wrap gap-3 font-mono text-xs text-primary">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>{p.glance && <div className="mt-6 max-w-[680px] rounded-md border border-border bg-raised p-5 leading-relaxed"><p className="section-label mb-3">At a glance</p><dl className="space-y-2">{p.glance.map(g => <div key={g.label}><dt className="inline font-medium">{g.label}: </dt><dd className="inline text-muted-foreground">{g.text}</dd></div>)}</dl></div>}<div className="mt-7 flex flex-wrap gap-3">{p.links.demo && <Button asChild><a href={p.links.demo} target="_blank" rel="noopener noreferrer">{p.demoLabel ?? 'Live demo'} <ArrowUpRight aria-hidden/></a></Button>}<Button asChild variant={p.links.demo ? 'outline' : 'default'}><a href={p.links.github} target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight aria-hidden/></a></Button>{p.links.article && <Button asChild variant="outline"><a href={p.links.article}>Article</a></Button>}</div></header>
    <div className="grid min-w-0 gap-8 lg:grid-cols-[200px_minmax(0,680px)] lg:gap-12">
      <nav aria-label="Case study sections" className="min-w-0">
        <details className="group rounded-md border border-border bg-card lg:hidden"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 font-mono text-xs uppercase text-primary">In this study<ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden/></summary>{toc('space-y-1 px-4 pb-4 text-sm text-muted-foreground')}</details>
        <div className="sticky top-28 hidden lg:block"><p className="section-label mb-4">In this study</p>{toc('space-y-1 text-sm text-muted-foreground')}</div>
      </nav>
      <div className="min-w-0">
        <div className="space-y-10">{p.figures ? p.figures.map(f => <ProjectFigure key={f.image} project={p} figure={f}/>) : <ProjectFigure project={p}/>}</div>
        <div className="mt-10">{p.sections.map((s,i) => <section key={s.title} id={`section-${i}`} className="scroll-mt-28 border-t border-border pb-8 pt-6"><h2 className="text-2xl font-medium">{s.title}</h2><div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{s.paragraphs.map(t => <p key={t}>{t}</p>)}{s.items && <ul className="list-disc space-y-2 pl-5">{s.items.map(t => <li key={t}>{t}</li>)}</ul>}</div></section>)}</div>
        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-8"><Button asChild size="lg"><a {...CV_LINK}>Download CV</a></Button><ProtectedEmail /></div>
      </div>
    </div>
    {next && <nav aria-label="Next study" className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8"><span className="section-label">Next study</span><Link to="/projects/$slug" params={{slug:next.slug}} className="inline-flex items-center gap-3 text-xl hover:text-primary">{next.title}<ArrowUpRight className="size-5 shrink-0" aria-hidden/></Link></nav>}
  </main><div className="border-t border-border"><ContactSection/></div></>;
}

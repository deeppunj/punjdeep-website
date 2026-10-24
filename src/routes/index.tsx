import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AboutSection, ContactSection, ExpertiseSection } from '@/components/portfolio-sections';
import { CATEGORIES, filterProjects, type Category } from '@/lib/projects';
import { pageHead, SOCIAL } from '@/lib/site-content';

export const Route = createFileRoute('/')({
  head: () => pageHead('Deep Punj, PhD — Optical Engineering, Scientific Software & Applied ML', 'Optical engineer and researcher in Brussels connecting experimental systems, scientific software and data analysis. Explore four evidence-led project studies.', '/'),
  component: Index,
});
function Index() {
  const [category, setCategory] = useState<Category>('All');
  const projects = filterProjects(category);
  return <><main id="main">
    <section className="page-width pb-12 pt-12 sm:pb-16 sm:pt-16" aria-labelledby="intro-title">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><p className="section-label">Optical Engineering · Scientific Software · Applied Machine Learning</p><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5" aria-hidden/>Brussels, Belgium</span></div>
      <h1 id="intro-title" className="editorial-title max-w-4xl text-5xl leading-[1.08] sm:text-6xl lg:text-7xl">From optical systems<br className="hidden sm:block"/> to <span className="italic text-primary">data-driven solutions.</span></h1>
      <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end">
        <p className="max-w-[66ch] text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-8">I am an optical engineer and researcher working at the intersection of experimental systems, scientific software and data analysis. My work combines optics and biomedical research with Python, SQL and machine learning to investigate complex problems and build practical tools.</p>
        <div className="flex gap-5 text-sm lg:col-span-4 lg:justify-end"><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">GitHub<ArrowUpRight className="size-4" aria-hidden/></a><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">LinkedIn<ArrowUpRight className="size-4" aria-hidden/></a></div>
      </div>
      <div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg"><a href="#projects">View selected work <ArrowDown aria-hidden/></a></Button><Button asChild size="lg" variant="outline"><Link to="/contact">Contact me <ArrowUpRight aria-hidden/></Link></Button></div>
    </section>
    <section id="projects" className="page-width scroll-mt-8 pb-16" aria-labelledby="projects-title">
      <div className="flex flex-wrap items-end justify-between gap-5 border-t border-border pt-8"><div><p className="section-label">01 / Selected work</p><h2 id="projects-title" className="editorial-title mt-3 text-4xl sm:text-5xl">Engineering insight. Practical tools.</h2></div><span className="font-mono text-xs text-muted-foreground" aria-live="polite">{projects.length} studies</span></div>
      <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">{CATEGORIES.map(c => <Button key={c} variant={category === c ? 'default' : 'ghost'} aria-pressed={category === c} onClick={() => setCategory(c)} className="h-10">{c}</Button>)}</div>
      <div className="grid gap-8 md:grid-cols-2">{projects.map((p) => <article key={p.slug} className="flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/50">
        <Link to="/projects/$slug" params={{slug:p.slug}} aria-label={`Read case study: ${p.title}`} className="block aspect-[16/10] overflow-hidden border-b border-border p-5"><img src={p.image} alt={p.alt} className="project-image" loading="lazy" width="800" height="500"/></Link>
        <div className="flex flex-1 flex-col p-6 sm:p-7"><p className="section-label">{p.category}</p><h3 className="mt-3 text-2xl font-medium leading-tight"><Link to="/projects/$slug" params={{slug:p.slug}} className="hover:text-primary">{p.title}</Link></h3><p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">{p.description}</p><ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-xs text-muted-foreground">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5"><Button asChild variant="link" className="h-auto p-0"><Link to="/projects/$slug" params={{slug:p.slug}}>Read case study <ArrowUpRight aria-hidden/></Link></Button><Button asChild variant="ghost" className="h-auto p-0 text-muted-foreground"><a href={p.links.github} target="_blank" rel="noopener noreferrer">View code <ArrowUpRight aria-hidden/></a></Button>{p.links.demo && <Button asChild variant="link"><a href={p.links.demo}>Live demo</a></Button>}</div>
        </div>
      </article>)}</div>
    </section>
    <ExpertiseSection/><AboutSection/>
  </main><ContactSection/></>;
}

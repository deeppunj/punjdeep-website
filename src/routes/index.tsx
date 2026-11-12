import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProtectedEmail } from '@/components/protected-email';
import { AboutSection, ContactSection, ExpertiseSection } from '@/components/portfolio-sections';
import { CATEGORIES, filterProjects, type Category } from '@/lib/projects';
import { CV_LINK, HERO_AVAILABILITY, HERO_PROOF, pageHead, SOCIAL } from '@/lib/site-content';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/')({
  staticData: { sitemap: true },
  head: () => pageHead('Deep Punj, PhD — Optical Engineering, Data Science & Machine Learning', 'Physicist and optical engineer in Ghent building data projects end to end: SQL, Power BI, forecasting and machine learning. Explore six projects.', '/'),
  component: Index,
});
function Index() {
  const [category, setCategory] = useState<Category>('All');
  const projects = filterProjects(category);
  return <><main id="main">
    <section className="page-width pb-8 pt-8 sm:pb-10 sm:pt-10" aria-labelledby="intro-title">
      <div className="lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-12">
      <div className="min-w-0">
      <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between"><p className="section-label min-w-0 text-balance"><span className="whitespace-nowrap">Optical Engineering ·</span> <span className="whitespace-nowrap">Data Science ·</span> <span className="whitespace-nowrap">Python &amp; Machine Learning</span></p><span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-3.5 shrink-0" aria-hidden/>Ghent, Belgium</span></div>
      <h1 id="intro-title" className="editorial-title max-w-4xl text-5xl leading-tight sm:text-6xl lg:text-7xl">Deep Punj, PhD</h1>
      <p className="mt-7 max-w-[66ch] text-base leading-relaxed text-muted-foreground sm:text-lg">I am a physicist and optical engineer at Ghent University who turns measurements and records into results people can trust. I build data projects end to end: SQL databases, data-quality checks, Power BI reports, forecasting and machine learning. I am looking for data analyst and data scientist roles, and for optical engineering roles where the data matters.</p>
      <div className="mt-6 flex flex-wrap items-center gap-3"><Button asChild size="lg"><a {...CV_LINK}>Download CV</a></Button><ProtectedEmail /><Button asChild size="lg" variant="outline"><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight className="size-4" aria-hidden/></a></Button><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">GitHub <ArrowUpRight className="size-4" aria-hidden/></a></div>
      </div>
      <div className="mt-8 lg:mt-0">
        <div className="rounded-md border border-border bg-card p-6 sm:p-7">
          <ul className="grid grid-cols-1 sm:grid-cols-3">
            {HERO_PROOF.map((point, i) => <li key={point.value} className={cn('py-3 sm:px-5 sm:py-2 sm:first:pl-0 sm:last:pr-0', i > 0 && 'border-t border-border sm:border-t-0 sm:border-l')}><span className="editorial-title block text-3xl leading-none sm:text-4xl">{point.value}</span><span className="mt-2 block font-mono text-xs uppercase tracking-wide text-muted-foreground">{point.label}</span></li>)}
          </ul>
          <p className="mt-4 border-t border-border pt-4 font-mono text-xs leading-relaxed text-muted-foreground">{HERO_AVAILABILITY}</p>
        </div>
      </div>
      </div>
    </section>
    <section id="projects" className="page-width scroll-mt-28 pb-16" aria-labelledby="projects-title">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 border-t border-border pt-7 sm:flex sm:justify-between"><div className="min-w-0"><p className="section-label">01 / Selected work</p><h2 id="projects-title" className="editorial-title mt-3 text-4xl sm:text-5xl">Engineering insight. Practical tools.</h2></div><span className="shrink-0 font-mono text-sm text-muted-foreground" aria-live="polite">{projects.length} projects</span></div>
      <p className="mt-6 text-sm text-muted-foreground">Primary discipline</p>
      <div className="mb-8 mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter projects by primary discipline">{CATEGORIES.map(c => <Button key={c} variant={category === c ? 'default' : 'ghost'} aria-pressed={category === c} onClick={() => setCategory(c)} className="h-10">{c}</Button>)}</div>
      <div className="grid gap-8 md:grid-cols-2">{projects.map((p) => { const study = p.hasCaseStudy !== false; return <article key={p.slug} className="flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/50">
        {study
          ? <Link to="/projects/$slug" params={{slug:p.slug}} aria-label={`Read case study: ${p.title}`} className="block aspect-[16/10] overflow-hidden border-b border-border p-5"><img src={p.image} alt={p.alt} className="project-image" loading="lazy" width="800" height="500"/></Link>
          : <div className="aspect-[16/10] overflow-hidden border-b border-border p-5"><img src={p.image} alt={p.alt} className="project-image" loading="lazy" width="800" height="500"/></div>}
        <div className="flex flex-1 flex-col p-6 sm:p-7"><p className="section-label">{p.category}</p><h3 className="mt-3 text-2xl font-medium leading-tight">{study ? <Link to="/projects/$slug" params={{slug:p.slug}} className="hover:text-primary">{p.title}</Link> : p.title}</h3><p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">{p.description}</p><ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-xs text-muted-foreground">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">{study && <Button asChild variant="link" className="h-auto p-0"><Link to="/projects/$slug" params={{slug:p.slug}}>Read case study <ArrowUpRight aria-hidden/></Link></Button>}<Button asChild variant="ghost" className="h-auto p-0 text-muted-foreground"><a href={p.links.github} target="_blank" rel="noopener noreferrer">View code <ArrowUpRight aria-hidden/></a></Button>{p.links.demo && <Button asChild variant="link"><a href={p.links.demo}>Live demo</a></Button>}</div>
        </div>
      </article>; })}</div>
    </section>
    <ExpertiseSection/><AboutSection/>
  </main><ContactSection/></>;
}

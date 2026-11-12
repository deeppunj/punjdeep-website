import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProtectedEmail } from '@/components/protected-email';
import { AboutSection, ContactSection, ExpertiseSection } from '@/components/portfolio-sections';
import { CATEGORIES, filterHomeProjectCards, type Category } from '@/lib/projects';
import { HomeProjectCard } from '@/components/home-project-card';
import { CV_LINK, HERO_AVAILABILITY, HERO_PROOF, pageHead, SOCIAL } from '@/lib/site-content';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/')({
  staticData: { sitemap: true },
  head: () => pageHead('Deep Punj, PhD — Optical Engineering, Data Science & Machine Learning', 'Physicist and optical engineer in Ghent building data projects end to end: SQL, Power BI, forecasting and machine learning. Explore six projects.', '/'),
  component: Index,
});
function Index() {
  const [category, setCategory] = useState<Category>('All');
  const projects = filterHomeProjectCards(category);
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
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1">
            {HERO_PROOF.map((point, i) => <li key={point.value} className={cn('py-3 md:px-5 md:py-2 lg:px-0 lg:py-3 md:first:pl-0 md:last:pr-0', i > 0 && 'border-t border-border md:border-t-0 md:border-l lg:border-t lg:border-l-0')}><span className="editorial-title block text-3xl leading-none whitespace-nowrap lg:text-4xl">{point.value}</span><span className="mt-2 block font-mono text-xs uppercase tracking-wide text-muted-foreground">{point.label}</span></li>)}
          </ul>
          <p className="mt-4 border-t border-border pt-4 font-mono text-xs leading-relaxed text-muted-foreground">{HERO_AVAILABILITY}</p>
        </div>
      </div>
      </div>
    </section>
    <section id="projects" className="page-width scroll-mt-28 section-space" aria-labelledby="projects-title">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 sm:flex sm:justify-between"><div className="min-w-0"><p className="section-label">01 / Selected work</p><h2 id="projects-title" className="editorial-title mt-4 text-4xl sm:text-5xl">From raw data to a tested result.</h2></div><span className="shrink-0 font-mono text-sm text-muted-foreground" aria-live="polite">{projects.length} projects</span></div>
      <p className="mt-8 text-base text-muted-foreground">Primary discipline</p>
      <div className="mb-8 mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter projects by primary discipline">{CATEGORIES.map(c => <Button key={c} variant={category === c ? 'default' : 'ghost'} aria-pressed={category === c} onClick={() => setCategory(c)} className="h-10">{c}</Button>)}</div>
      <div className="home-project-grid grid gap-8">{projects.map(p => <HomeProjectCard key={p.slug} project={p} />)}</div>
    </section>
    <ExpertiseSection/><AboutSection/>
  </main><ContactSection/></>;
}

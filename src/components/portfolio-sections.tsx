import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ABOUT, ABOUT_SERIES, CV_LINK, EXPERIENCE, EXPERTISE, SOCIAL } from '@/lib/site-content';
import { getProject } from '@/lib/projects';
import { ProtectedEmail } from '@/components/protected-email';

export function ExperienceSection() {
  return <section id="experience" className="page-width scroll-mt-28 section-space" aria-labelledby="experience-title">
    <p className="section-label">02 / Experience</p>
    <h2 id="experience-title" className="editorial-title mt-4 text-4xl sm:text-5xl">From the research lab to data work.</h2>
    <ol className="mt-10">
      {EXPERIENCE.map((entry, i) => <li key={entry.dates} className="relative flex flex-col gap-2 pb-6 last:pb-0 sm:flex-row sm:gap-6">
        {i < EXPERIENCE.length - 1 && <span aria-hidden className="absolute left-[3px] top-2 bottom-0 w-px bg-primary/45 sm:left-[calc(11.5rem+3px)]" />}
        <span aria-hidden className="absolute left-0 top-[7px] size-[7px] rounded-full bg-primary sm:left-[11.5rem]" />
        <div className="min-w-0 pl-6 font-mono text-[13px] uppercase leading-relaxed tracking-wide text-muted-foreground sm:w-40 sm:shrink-0 sm:pl-0 sm:pt-0.5 sm:text-right">{entry.dates}</div>
        <div className="min-w-0 flex-1 pl-6 sm:pl-8">
          <h3 className="text-lg font-semibold">{entry.role}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{entry.org}</p>
          {entry.text && <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-muted-foreground">{entry.text}</p>}
        </div>
      </li>)}
    </ol>
    <div className="mt-8"><Button asChild size="lg"><a {...CV_LINK}>Download CV</a></Button></div>
  </section>;
}
export function ExpertiseSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <section id="expertise" className="page-width scroll-mt-28 section-space">
    <p className="section-label">03 / Connected capabilities</p>
    <Heading className="editorial-title mt-4 text-4xl sm:text-5xl">Expertise, demonstrated through work</Heading>
    <div className="mt-8 grid gap-x-12 md:grid-cols-2">{EXPERTISE.map(group => <div key={group.title} className="border-t border-border py-8">
      <h3 className="text-xl font-medium">{group.title}</h3>
      <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">{group.description}</p>
      <ul className="mt-5 space-y-2">{group.projects.map(item => { const slug = typeof item === 'string' ? item : item.slug; const p = getProject(slug); if (!p) return null; const label = typeof item === 'string' ? p.title : item.label; if (p.hasCaseStudy === false) return <li key={slug} className="text-sm text-muted-foreground">{label}</li>; return <li key={slug}><Link to="/projects/$slug" params={{slug}} className="inline-flex items-center gap-2 text-sm text-primary underline decoration-border underline-offset-4 hover:decoration-primary">{label}<ArrowUpRight className="size-3 shrink-0" aria-hidden/></Link></li>; })}</ul>
    </div>)}</div>
  </section>;
}
export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <section id="about" className="border-y border-border bg-muted/40"><div className="page-width grid gap-8 section-space md:grid-cols-3">
    <div className="min-w-0"><p className="section-label">04 / About</p><Heading className="editorial-title mt-4 text-4xl sm:text-5xl">Physics, measurement<br className="hidden md:block"/> & data.</Heading></div>
    <div className="max-w-2xl space-y-5 text-lg leading-relaxed md:col-span-2">{ABOUT.map(p => <p key={p}>{p}</p>)}<p>{ABOUT_SERIES.intro}{' '}{ABOUT_SERIES.posts.map((post, i) => <span key={post.href}><a href={post.href} target="_blank" rel="noopener noreferrer" className="text-base text-primary underline decoration-border underline-offset-4 hover:decoration-primary">{post.label}</a>{i < ABOUT_SERIES.posts.length - 1 ? ', ' : '.'}</span>)}</p><p className="pt-2 font-mono text-xs text-primary">Ghent, Belgium</p></div>
  </div></section>;
}
export function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <footer id="contact" className="page-width section-space">
    <p className="section-label">05 / Get in touch</p>
    <Heading className="editorial-title mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Let’s discuss your team’s technical challenges.</Heading>
    <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">Hiring for a data analyst, data scientist or optical engineering role? Send me an email or connect with me on LinkedIn.</p>
    <div className="mt-7 flex flex-wrap items-center gap-3"><ProtectedEmail /><Button asChild size="lg" variant="outline"><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight aria-hidden/></a></Button><Button asChild size="lg" variant="outline"><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden/></a></Button></div>
    <div className="mt-10 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:grid-cols-[auto_minmax(0,1fr)]"><span>© 2026 Deep Punj, PhD</span><span className="min-w-0 text-balance sm:text-right"><span className="whitespace-nowrap">Optical Engineering ·</span> <span className="whitespace-nowrap">Data Science ·</span> <span className="whitespace-nowrap">Python &amp; Machine Learning</span></span></div>
  </footer>;
}

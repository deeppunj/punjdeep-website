import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ABOUT, ABOUT_SERIES, CERTIFICATES, CV_LINK, EXPERIENCE, EXPERTISE, PUBLICATIONS, SOCIAL, TEACHING, WRITING } from '@/lib/site-content';
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
export function WritingSection() {
  return <section id="writing" className="page-width scroll-mt-28 section-space" aria-labelledby="writing-title">
    <p className="section-label">03 / Writing</p>
    <h2 id="writing-title" className="editorial-title mt-4 text-4xl sm:text-5xl">Light meets Data</h2>
    <p className="mt-6 max-w-[68ch] leading-relaxed text-muted-foreground">{WRITING.text}</p>
    <ul className="mt-8 grid gap-4 md:grid-cols-3">
      {ABOUT_SERIES.posts.map((post, i) => <li key={post.href} className="min-w-0">
        <a href={post.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col justify-between gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary">
          <span className="font-mono text-[13px] uppercase tracking-wide text-muted-foreground">Post {i + 1} · LinkedIn</span>
          <span className="text-lg font-semibold leading-snug">{WRITING.titles[i]}</span>
          <span className="inline-flex items-center gap-1 text-sm text-primary">Read the post <ArrowUpRight aria-hidden className="size-4"/></span>
        </a>
      </li>)}
    </ul>
    <a href={WRITING.code} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline">Code on GitHub <ArrowUpRight aria-hidden className="size-4"/></a>
  </section>;
}
export function ExpertiseSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <section id="expertise" className="page-width scroll-mt-28 section-space">
    <p className="section-label">04 / Connected capabilities</p>
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
    <div className="min-w-0"><p className="section-label">05 / About</p><Heading className="editorial-title mt-4 text-4xl sm:text-5xl">Physics, measurement<br className="hidden md:block"/> & data.</Heading></div>
    <div className="max-w-2xl space-y-5 text-lg leading-relaxed md:col-span-2">{ABOUT.map(p => <p key={p}>{p}</p>)}<p>{ABOUT_SERIES.intro}{' '}{ABOUT_SERIES.posts.map((post, i) => <span key={post.href}><a href={post.href} target="_blank" rel="noopener noreferrer" className="text-base text-primary underline decoration-border underline-offset-4 hover:decoration-primary">{post.label}</a>{i < ABOUT_SERIES.posts.length - 1 ? ', ' : '.'}</span>)}</p><p className="pt-2 font-mono text-xs text-primary">Ghent, Belgium</p></div>
  </div></section>;
}
const credentialRow = 'flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6';
const credentialLink = 'text-primary underline decoration-border underline-offset-4 hover:decoration-primary';

export function AboutCredentials() {
  return <>
    <section id="publications" className="page-width scroll-mt-28 section-space" aria-labelledby="publications-title">
      <h2 id="publications-title" className="editorial-title text-3xl sm:text-4xl">Publications</h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{PUBLICATIONS.intro}</p>
      <ul className="mt-6 max-w-2xl border-t border-border">
        {PUBLICATIONS.items.map(p => <li key={p.journal} className={credentialRow}>
          <span className="min-w-0">{p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer" className={credentialLink}>{p.journal}</a> : p.journal}</span>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">{p.role}</span>
        </li>)}
      </ul>
    </section>
    <section id="certificates" className="page-width scroll-mt-28 section-space" aria-labelledby="certificates-title">
      <h2 id="certificates-title" className="editorial-title text-3xl sm:text-4xl">Certificates and training</h2>
      <ul className="mt-6 max-w-2xl border-t border-border">
        {CERTIFICATES.map(c => <li key={c.label} className={credentialRow}>
          <span className="min-w-0">{c.href ? <a href={c.href} target="_blank" rel="noopener noreferrer" className={credentialLink}>{c.label}</a> : c.label}</span>
        </li>)}
      </ul>
    </section>
    <section id="teaching" className="page-width scroll-mt-28 section-space" aria-labelledby="teaching-title">
      <h2 id="teaching-title" className="editorial-title text-3xl sm:text-4xl">Teaching</h2>
      <ul className="mt-6 max-w-2xl border-t border-border">
        {TEACHING.map(t => <li key={t} className="border-b border-border py-3 leading-relaxed">{t}</li>)}
      </ul>
    </section>
  </>;
}
export function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <footer id="contact" className="page-width section-space">
    <p className="section-label">06 / Get in touch</p>
    <Heading className="editorial-title mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Let’s discuss your team’s technical challenges.</Heading>
    <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">Hiring for a data analyst, data scientist or optical engineering role? Send me an email or connect with me on LinkedIn.</p>
    <div className="mt-7 flex flex-wrap items-center gap-3"><ProtectedEmail /><Button asChild size="lg" variant="outline"><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight aria-hidden/></a></Button><Button asChild size="lg" variant="outline"><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden/></a></Button></div>
    <div className="mt-10 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:grid-cols-[auto_minmax(0,1fr)]"><span className="flex flex-col gap-2"><span>© 2026 Deep Punj, PhD</span><nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-2 gap-y-1"><a {...CV_LINK} className="hover:text-foreground underline-offset-4 hover:underline">CV</a><span aria-hidden>·</span><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline-offset-4 hover:underline">LinkedIn</a><span aria-hidden>·</span><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline-offset-4 hover:underline">GitHub</a><span aria-hidden>·</span><a href={SOCIAL.tableau} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline-offset-4 hover:underline">Tableau Public</a></nav></span><span className="min-w-0 text-balance sm:text-right"><span className="whitespace-nowrap">Optical Engineering ·</span> <span className="whitespace-nowrap">Data Science ·</span> <span className="whitespace-nowrap">Python &amp; Machine Learning</span></span></div>
  </footer>;
}

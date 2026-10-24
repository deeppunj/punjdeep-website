import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ABOUT, EXPERTISE, SOCIAL } from '@/lib/site-content';
import { getProject } from '@/lib/projects';
import { ProtectedEmail } from '@/components/protected-email';

export function ExpertiseSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <section id="expertise" className="page-width scroll-mt-8 py-12 sm:py-16">
    <p className="section-label">02 / Connected capabilities</p>
    <Heading className="editorial-title mt-4 text-4xl sm:text-5xl">Expertise, demonstrated through work</Heading>
    <div className="mt-10 grid gap-x-12 md:grid-cols-2">{EXPERTISE.map(group => <div key={group.title} className="border-t border-border py-8">
      <h3 className="text-xl font-medium">{group.title}</h3>
      <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">{group.description}</p>
      <ul className="mt-5 space-y-2">{group.projects.map(slug => { const p = getProject(slug); return p ? <li key={slug}><Link to="/projects/$slug" params={{slug}} className="inline-flex items-center gap-2 text-sm text-primary underline decoration-border underline-offset-4 hover:decoration-primary">{p.title}<ArrowUpRight className="size-3 shrink-0" aria-hidden/></Link></li> : null; })}</ul>
    </div>)}</div>
  </section>;
}
export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <section id="about" className="border-y border-border bg-muted/40"><div className="page-width grid gap-8 py-12 sm:py-16 md:grid-cols-3">
    <div className="min-w-0"><p className="section-label">03 / About</p><Heading className="editorial-title mt-4 text-4xl sm:text-5xl">Physics, measurement<br className="hidden md:block"/> & data.</Heading></div>
    <div className="max-w-2xl space-y-5 text-lg leading-relaxed md:col-span-2">{ABOUT.map(p => <p key={p}>{p}</p>)}<p className="pt-2 font-mono text-xs text-primary">Gent, Belgium</p></div>
  </div></section>;
}
export function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return <footer id="contact" className="page-width py-12 sm:py-16">
    <p className="section-label">04 / Get in touch</p>
    <Heading className="editorial-title mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Let’s discuss your team’s technical challenges.</Heading>
    <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Interested in optical engineering, scientific software, imaging or applied data science? Connect with me on LinkedIn.</p>
    <div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg"><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight aria-hidden/></a></Button><Button asChild size="lg" variant="outline"><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden/></a></Button></div>
    <div className="mt-10 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:grid-cols-[auto_minmax(0,1fr)]"><span>© 2026 Deep Punj, PhD</span><span className="min-w-0 sm:text-right">Optical Engineering · Scientific Software · Applied Machine Learning</span></div>
  </footer>;
}

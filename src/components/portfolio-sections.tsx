import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ABOUT, EXPERTISE, SOCIAL } from '@/lib/site-content';
import { getProject } from '@/lib/projects';

export function ExpertiseSection() {
  return <section id="expertise" className="page-width scroll-mt-8 py-16 sm:py-20">
    <p className="section-label">02 / Connected capabilities</p>
    <h2 className="editorial-title mt-4 text-4xl sm:text-5xl">Expertise, demonstrated through work</h2>
    <div className="mt-10 grid gap-x-12 md:grid-cols-2">{EXPERTISE.map(group => <div key={group.title} className="border-t border-border py-8">
      <h3 className="text-xl font-medium">{group.title}</h3>
      <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">{group.description}</p>
      <ul className="mt-5 space-y-2">{group.projects.map(slug => { const p = getProject(slug); return p ? <li key={slug}><Link to="/projects/$slug" params={{slug}} className="inline-flex items-center gap-2 text-sm text-primary underline decoration-border underline-offset-4 hover:decoration-primary">{p.title}<ArrowUpRight className="size-3 shrink-0" aria-hidden/></Link></li> : null; })}</ul>
    </div>)}</div>
  </section>;
}
export function AboutSection() {
  return <section id="about" className="border-y border-border bg-muted/40"><div className="page-width grid gap-8 py-16 sm:py-20 md:grid-cols-3">
    <div><p className="section-label">03 / About</p><h2 className="editorial-title mt-4 text-4xl sm:text-5xl">Physics, measurement<br className="hidden md:block"/> & data.</h2></div>
    <div className="max-w-2xl space-y-5 text-lg leading-relaxed md:col-span-2">{ABOUT.map(p => <p key={p}>{p}</p>)}<p className="pt-2 font-mono text-xs text-primary">Brussels, Belgium</p></div>
  </div></section>;
}
export function ContactSection() {
  return <footer id="contact" className="page-width py-16 sm:py-20">
    <p className="section-label">04 / Get in touch</p>
    <h2 className="editorial-title mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Let’s discuss your team’s technical challenges.</h2>
    <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Interested in optical engineering, scientific software, imaging or applied data science? Connect with me on LinkedIn.</p>
    <div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg"><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight aria-hidden/></a></Button><Button asChild size="lg" variant="outline"><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden/></a></Button></div>
    <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground"><span>© 2026 Deep Punj, PhD</span><span>Optical Engineering · Scientific Software · Applied Machine Learning</span></div>
  </footer>;
}

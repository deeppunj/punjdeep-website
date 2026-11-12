import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import type { HomeProjectCard as Card } from '@/lib/projects';

export function HomeProjectCard({ project: p }: { project: Card }) {
  const study = p.hasCaseStudy !== false;
  const frame = 'block aspect-[16/10] overflow-hidden border-b border-border bg-plot-surface p-3';
  const image = <img src={p.image} alt={p.alt} className="h-full w-full object-contain object-center" loading="lazy" width="800" height="500" />;
  const action = 'h-auto min-h-10 min-w-0 flex-1 justify-start whitespace-normal p-0 text-left text-xs leading-relaxed';
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card transition-[transform,border-color] duration-200 hover:border-primary motion-safe:hover:-translate-y-[3px] motion-reduce:transform-none motion-reduce:transition-none">
    {study ? <Link to="/projects/$slug" params={{ slug: p.slug }} aria-label={`Read case study: ${p.title}`} className={frame}>{image}</Link> : <div className={frame}>{image}</div>}
    <div className="flex flex-1 flex-col p-6">
      <p className="section-label">{p.category}</p>
      <p className="mt-3 font-mono text-xs leading-relaxed text-primary">{p.provenance}</p>
      <h3 className="mt-2 text-2xl font-medium leading-tight">{study ? <Link to="/projects/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.title}</Link> : p.title}</h3>
      <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">{p.description}</p>
      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">{p.stack.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {study && <Button asChild variant="link" className={action}><Link to="/projects/$slug" params={{ slug: p.slug }}>Read case study</Link></Button>}
        {p.pendingStudyPath && <Button variant="link" disabled title="Case study page not yet available" className={action}>Read case study</Button>}
        {p.links.demo && <Button asChild variant="link" className={action}><a href={p.links.demo} target="_blank" rel="noopener noreferrer">Live dashboard</a></Button>}
        <Button asChild variant="ghost" className={`${action} text-muted-foreground`}><a href={p.links.github} target="_blank" rel="noopener noreferrer">View code</a></Button>
        {p.links.article && <Button asChild variant="link" className={action}><a href={p.links.article} target="_blank" rel="noopener noreferrer">Article</a></Button>}
      </div>
    </div>
  </article>;
}
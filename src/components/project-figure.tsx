import * as Dialog from '@radix-ui/react-dialog';
import { Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/projects';

export function ProjectFigure({ project: p }: { project: Project }) {
  return <figure className="min-w-0">
    <Dialog.Root>
      <div className="border border-border bg-card p-3 sm:p-5">
        <img src={p.image} alt={p.alt} className="mx-auto h-auto max-h-[620px] max-w-full object-contain" />
      </div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <figcaption className="min-w-0 text-sm leading-relaxed text-muted-foreground">{p.caption} <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Source repository</a></figcaption>
        <Dialog.Trigger asChild><Button variant="outline" size="icon" aria-label="Enlarge figure" title="Enlarge figure" className="shrink-0"><Expand aria-hidden /></Button></Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/60" />
        <Dialog.Content className="fixed inset-3 z-50 flex min-w-0 flex-col gap-3 border border-border bg-background p-4 sm:inset-8" aria-describedby={undefined}>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <Dialog.Title className="min-w-0 text-lg font-medium">{p.title} — figure</Dialog.Title>
            <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close figure"><X aria-hidden /></Button></Dialog.Close>
          </div>
          <div className="min-h-0 min-w-0 flex-1 overflow-auto border border-border bg-card" tabIndex={0} aria-label="Full-size figure">
            <img src={p.image} alt={p.alt} className="block h-auto min-w-full max-w-none" />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{p.caption}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </figure>;
}
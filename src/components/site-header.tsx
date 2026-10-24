import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Projects", to: "/", hash: "projects" },
  { label: "Expertise", to: "/expertise" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="border-b border-border bg-background">
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">Skip to content</a>
    <div className="page-width grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
      <Link to="/" aria-label="Deep Punj — home" className="flex min-w-0 items-center gap-3 font-medium">
        <span className="grid size-9 shrink-0 place-items-center border border-primary text-sm text-primary" aria-hidden>DP</span>
        <span className="min-w-0">Deep Punj<span className="text-muted-foreground">, PhD</span></span>
      </Link>
      <nav aria-label="Main" className="hidden items-center gap-8 text-sm md:flex">{NAV.map(n => <Link key={n.label} to={n.to} {...('hash' in n ? {hash:n.hash} : {})} className="py-3 transition-colors hover:text-primary">{n.label}</Link>)}</nav>
      <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(v => !v)}><span><Menu className={open ? "hidden" : "block"}/><X className={open ? "block" : "hidden"}/></span></Button>
    </div>
    {open && <nav id="mobile-nav" aria-label="Mobile" className="page-width flex flex-col border-t border-border py-3 md:hidden">{NAV.map(n => <Link key={n.label} to={n.to} {...('hash' in n ? {hash:n.hash} : {})} onClick={() => setOpen(false)} className="py-3">{n.label}</Link>)}</nav>}
  </header>;
}

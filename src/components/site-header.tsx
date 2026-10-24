import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const NAV = [
  { label: "Projects", to: "/", hash: "projects" },
  { label: "Expertise", to: "/expertise" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const CV = {
  href: "/deep-punj-cv.pdf",
  download: "Deep_Punj_CV.pdf",
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [open]);
  return <header className="sticky top-0 z-40 border-b border-border bg-background">
    <a href="#main" onClick={() => {
      const main = document.getElementById('main');
      if (!main) return;
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }} className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">Skip to content</a>
    <div className="page-width grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
      <Link to="/" onClick={() => setOpen(false)} aria-label="Deep Punj — home" className="flex min-w-0 items-center gap-3 font-medium">
        <span className="grid size-9 shrink-0 place-items-center border border-primary text-sm text-primary" aria-hidden>DP</span>
        <span className="min-w-0">Deep Punj<span className="text-muted-foreground">, PhD</span></span>
      </Link>
      <nav aria-label="Main" className="hidden items-center gap-8 text-sm md:flex">{NAV.map(n => <Link key={n.label} to={n.to} {...('hash' in n ? {hash:n.hash} : {})} className="py-3 transition-colors hover:text-primary">{n.label}</Link>)}</nav>
      <div className="flex items-center gap-1">
        <Button asChild className="mr-1 hidden min-h-11 px-5 md:inline-flex"><a {...CV}>Download CV</a></Button>

        <Button variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}><span><Sun className={dark ? "block" : "hidden"}/><Moon className={dark ? "hidden" : "block"}/></span></Button>
        <Button ref={menuButton} variant="ghost" size="icon" className="min-h-11 min-w-11 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(v => !v)}><span><Menu className={open ? "hidden" : "block"}/><X className={open ? "block" : "hidden"}/></span></Button>
      </div>
    </div>
    <nav id="mobile-nav" aria-label="Mobile" className={`page-width max-h-[calc(100vh-5rem)] flex-col overflow-y-auto border-t border-border py-3 md:hidden ${open ? 'flex' : 'hidden'}`}>{NAV.map(n => <Link key={n.label} to={n.to} {...('hash' in n ? {hash:n.hash} : {})} onClick={() => setOpen(false)} className="py-3">{n.label}</Link>)}<Button asChild className="mt-3 min-h-11 w-full"><a {...CV} onClick={() => setOpen(false)}>Download CV</a></Button></nav>
  </header>;
}

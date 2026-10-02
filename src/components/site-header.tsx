import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Work", hash: "work" },
  { label: "Skills", hash: "skills" },
  { label: "About", hash: "about" },
];

export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!dark}
      className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
    >
      {dark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link to="/" className="font-mono text-sm font-medium tracking-tight" aria-label="Deep Punj — home">
          deep<span className="text-primary">.</span>punj
        </Link>
        <nav aria-label="Main" className="flex items-center gap-2 sm:gap-6">
          <ul className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            {NAV.map((item) => (
              <li key={item.hash}>
                <Link to="/" hash={item.hash} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/"
            hash="contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Contact
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-border sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </nav>
      </div>
      {open && (
        <ul id="mobile-nav" className="border-t border-border px-5 py-3 sm:hidden">
          {[...NAV, { label: "Contact", hash: "contact" }].map((item) => (
            <li key={item.hash}>
              <Link
                to="/"
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

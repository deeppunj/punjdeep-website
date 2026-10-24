<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep visual effects theme-safe through semantic CSS tokens so light and dark modes share the same component structure.
- Theme choice is stored under a single localStorage key and applied pre-paint by an inline head script, so a returning visitor never sees the wrong theme flash and server markup stays hydration-safe.

- Keep project case-study content and optional destinations in src/lib/projects.ts; shared positioning and metadata helpers live in src/lib/site-content.ts so pages stay evidence-consistent.
- Shared navigation is mounted once around the root Outlet; homepage content sections reuse standalone content-route sections for consistent navigation and canonical metadata.
- Shared-header skip navigation explicitly focuses the current main landmark; mobile-menu Escape dismissal restores toggle focus so keyboard navigation remains predictable across routes.
- Project figures use optimized Lovable Assets pointers with explicit provenance captions; optional public demos and articles render only when verified.
- Case-study figures use an accessible full-size dialog with contained scrolling so detailed repository charts remain inspectable on phones without page overflow.
- The recruiter chat is not mounted in this release; its existing service integration and stored records are preserved to avoid unrelated backend changes.
- Retained assistant grounding is generated from the public project and site-content inventory to prevent obsolete credentials, destinations or résumé promises from diverging from the visible portfolio.
- The CV is a static file served from public/ and linked from the shared header on desktop and inside the mobile menu, so it stays reachable on every page without a build step.
- The shared header stays pinned to the top of the viewport (below dialog overlays in stacking order), and every in-page anchor target keeps scroll margin that clears it, so navigation and the CV download remain reachable while scrolling and jumps never land under the pinned bar.
- Email contact is rendered only by the ProtectedEmail component, which joins the address at click time and opens mailto on demand, so no served page, meta tag, sitemap or knowledge file ever contains the full address as one string.


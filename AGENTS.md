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

- Keep project case-study content and optional destinations in src/lib/projects.ts; shared positioning and metadata helpers live in src/lib/site-content.ts so pages stay evidence-consistent.
- Shared navigation is mounted once around the root Outlet; homepage content sections reuse standalone content-route sections for consistent navigation and canonical metadata.
- Project figures use optimized Lovable Assets pointers with explicit provenance captions; optional public demos and articles render only when verified.
- Case-study figures use an accessible full-size dialog with contained scrolling so detailed repository charts remain inspectable on phones without page overflow.
- The recruiter chat is not mounted in this release; its existing service integration and stored records are preserved to avoid unrelated backend changes.
- Retained assistant grounding is generated from the public project and site-content inventory to prevent obsolete credentials, destinations or résumé promises from diverging from the visible portfolio.

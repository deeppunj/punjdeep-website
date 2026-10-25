import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const TAGLINE = 'Optical Engineering · Data Science · Python & Machine Learning';
const OLD_TAGLINE = 'Optical Engineering · Scientific Software · Applied Machine Learning';
const TITLE = 'Deep Punj, PhD — Optical Engineering, Data Science & Machine Learning';

const read = (relative: string) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8');

/** Strip markup and decode entities so the visible sentence can be matched. */
const visible = (source: string) =>
  source.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

describe('tagline and title wording', () => {
  it('shows the tagline in the footer next to the copyright line', () => {
    const footer = visible(read('../components/portfolio-sections.tsx'));
    expect(footer).toContain('© 2026 Deep Punj, PhD');
    expect(footer).toContain(TAGLINE);
  });
  it('shows the tagline as the hero eyebrow above the name', () => {
    expect(visible(read('../routes/index.tsx'))).toContain(TAGLINE);
  });
  it('uses the requested wording for the homepage title and og:title', () => {
    expect(read('../routes/index.tsx')).toContain(`pageHead('${TITLE}'`);
    expect(read('../routes/__root.tsx')).toContain(`content: "${TITLE}"`);
  });
  it('never keeps the retired tagline in served copy or assistant grounding', () => {
    for (const file of ['../components/portfolio-sections.tsx', '../routes/index.tsx', '../routes/__root.tsx', '../lib/site-content.ts', '../lib/portfolio-knowledge.ts']) {
      expect(read(file)).not.toContain(OLD_TAGLINE);
    }
  });
  it('gives every page a twitter:title that matches its og:title', () => {
    const helper = read('../lib/site-content.ts');
    expect(helper).toContain("{ name: 'twitter:title', content: title }");
  });
});

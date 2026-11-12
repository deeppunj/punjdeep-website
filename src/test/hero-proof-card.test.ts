import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { CV_LINK, HERO_AVAILABILITY, HERO_PROOF } from '@/lib/site-content';

const read = (relative: string) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8');

describe('hero proof card and buttons', () => {
  it('lists the three requested proof points in order', () => {
    expect(HERO_PROOF).toEqual([
      { value: '10+ years', label: 'lasers, imaging and measurement data' },
      { value: '6 projects', label: 'personal projects, code on GitHub' },
      { value: '20 papers', label: 'h-index 13 on Google Scholar' },
    ]);
  });

  it('states the availability line under the three points', () => {
    expect(HERO_AVAILABILITY).toBe(
      'Based in Ghent · open to roles in Belgium, the Netherlands, the rest of Europe and India',
    );
    expect(read('../routes/index.tsx')).toContain('{HERO_AVAILABILITY}');
  });

  it('puts the hero buttons in the requested order', () => {
    const hero = read('../routes/index.tsx');
    const at = (needle: string) => {
      const index = hero.indexOf(needle);
      expect(index, `missing ${needle}`).toBeGreaterThanOrEqual(0);
      return index;
    };
    const cv = at('{...CV_LINK}');
    const email = at('<ProtectedEmail');
    const linkedin = at('>LinkedIn <');
    const github = at('>GitHub <');
    expect(cv).toBeLessThan(email);
    expect(email).toBeLessThan(linkedin);
    expect(linkedin).toBeLessThan(github);
  });

  it('serves the CV under the unchanged address and filename', () => {
    expect(CV_LINK).toMatchObject({
      href: '/deep-punj-cv.pdf',
      download: 'Deep_Punj_CV.pdf',
      target: '_blank',
      rel: 'noopener noreferrer',
    });
  });

  it('drops the retired hero buttons and keeps the email address hidden', () => {
    const hero = read('../routes/index.tsx');
    expect(hero).not.toContain('View selected work');
    expect(hero).not.toContain('Contact on LinkedIn');
    expect(hero).not.toContain('mailto:');
  });

  it('lays the hero out in two desktop columns sized to their content', () => {
    const hero = read('../routes/index.tsx');
    expect(hero).toContain('lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]');
    expect(hero).not.toMatch(/(min-)?h-(screen|svh|dvh|lvh)/);
  });
});

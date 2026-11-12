import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { CERTIFICATES, PUBLICATIONS, TEACHING } from '@/lib/site-content';

const read = (relative: string) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8');

describe('about page credentials', () => {
  it('states the publication summary exactly as supplied', () => {
    expect(PUBLICATIONS.intro).toBe(
      '20 journal papers, 4 as first author; h-index 13, about 1,100 citations (Google Scholar). Selected, newest first.',
    );
  });

  it('lists the ten selected papers newest first with the stated role', () => {
    expect(PUBLICATIONS.items.map(p => [p.journal, p.role])).toEqual([
      ['Advanced Science (2026)', 'co-author'],
      ['Science Advances 12(39) (2026)', 'co-author'],
      ['Advanced Science 13(16) (2026)', 'co-author'],
      ['Investigative Ophthalmology & Visual Science 67(2) (2026)', 'co-author'],
      ['Journal of Nanobiotechnology 23 (2025)', 'co-author'],
      ['Journal of Controlled Release 365 (2024)', 'co-author'],
      ['International Journal of Molecular Sciences 24(4) (2023)', 'second author'],
      ['Journal of Controlled Release 354 (2023)', 'co-author'],
      ['ACS Photonics 2 (2015)', 'first author'],
      ['Nature Nanotechnology 8 (2013)', 'first author'],
    ]);
  });

  it('links only the papers that were given a URL, to that URL', () => {
    const linked = Object.fromEntries(
      PUBLICATIONS.items.filter(p => p.href).map(p => [p.journal, p.href]),
    );
    expect(linked).toEqual({
      'Advanced Science 13(16) (2026)': 'https://doi.org/10.1002/advs.202516534',
      'Journal of Nanobiotechnology 23 (2025)': 'https://doi.org/10.1186/s12951-025-03640-3',
      'International Journal of Molecular Sciences 24(4) (2023)': 'https://doi.org/10.3390/ijms24043147',
      'Nature Nanotechnology 8 (2013)': 'https://doi.org/10.1038/nnano.2013.98',
    });
  });

  it('lists the six certificates and the two teaching lines as supplied', () => {
    expect(CERTIFICATES.map(c => c.label)).toEqual([
      'Google Data Analytics Professional Certificate (SQL, R, Tableau, data cleaning)',
      'IBM: Python for Data Science, AI and Development (Coursera, 2021)',
      'First Order Optical System Design, University of Colorado Boulder (Coursera, 2021)',
      'Deloitte Australia Data Analytics Job Simulation (Forage, Oct 2026)',
      'Databricks course on Coursera (in progress)',
      'Tableau Public: 6 visualisations',
    ]);
    expect(CERTIFICATES.find(c => c.href)?.href).toBe('https://public.tableau.com/app/profile/deep.punj');
    expect(TEACHING).toHaveLength(2);
    expect(TEACHING[0]).toContain('Specialist Microscopy course at Ghent University');
    expect(TEACHING[1]).toContain('Physical Experiment 1 at Leiden University');
  });

  it('shows the three sections on the about page only, above the contact block', () => {
    const about = read('../routes/about.tsx');
    const home = read('../routes/index.tsx');
    expect(about).toContain('<AboutSection standalone/>');
    expect(about.indexOf('<AboutCredentials/>')).toBeGreaterThan(about.indexOf('<AboutSection standalone/>'));
    expect(about.indexOf('</main>')).toBeGreaterThan(about.indexOf('<AboutCredentials/>'));
    expect(about.indexOf('<ContactSection/>')).toBeGreaterThan(about.indexOf('</main>'));
    expect(home).not.toContain('AboutCredentials');
  });

  it('renders each section as a divided list with links opening in a new tab', () => {
    const component = read('../components/portfolio-sections.tsx');
    const credentials = component.slice(
      component.indexOf('export function AboutCredentials'),
      component.indexOf('export function ContactSection'),
    );
    for (const name of ['Publications', 'Certificates and training', 'Teaching']) {
      expect(credentials).toContain(`>${name}</h2>`);
    }
    expect(credentials.match(/border-t border-border/g)?.length).toBe(3);
    expect(credentials).toContain('border-b border-border py-3');
    expect(credentials.match(/target="_blank" rel="noopener noreferrer"/g)?.length).toBe(2);
    expect(credentials).toContain('font-mono text-xs text-muted-foreground');
    // phone: role sits on its own line under the journal; desktop: same row, pushed right
    expect(credentials).toContain('flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-baseline sm:justify-between');
    expect(credentials).toContain('shrink-0 font-mono text-xs text-muted-foreground');
  });
});

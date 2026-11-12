import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { EXPERIENCE } from '@/lib/site-content';

const read = (relative: string) =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8');

describe('home page experience section', () => {
  it('lists the six entries in the requested order, newest first', () => {
    expect(EXPERIENCE.map(e => e.dates)).toEqual([
      'Apr 2022 – present',
      'Nov 2021',
      'Jun 2019 – Apr 2022',
      '2015 – 2019',
      '2012 – 2015',
      '2006 – 2011',
    ]);
    expect(EXPERIENCE[0]).toMatchObject({
      role: 'Optical Engineer / Researcher',
      org: 'Ghent University, Faculty of Pharmaceutical Sciences',
    });
    expect(EXPERIENCE[5]).toMatchObject({
      role: 'Integrated M.Sc., Photonics',
      org: 'Cochin University of Science and Technology, India',
    });
  });

  it('sits after the project grid and before the expertise section', () => {
    const home = read('../routes/index.tsx');
    const grid = home.indexOf('home-project-grid');
    const experience = home.indexOf('<ExperienceSection/>');
    const expertise = home.indexOf('<ExpertiseSection/>');
    expect(grid).toBeGreaterThanOrEqual(0);
    expect(experience).toBeGreaterThan(grid);
    expect(experience).toBeLessThan(expertise);
  });

  it('keeps the section labels numbered in order', () => {
    const labels = [
      read('../routes/index.tsx'),
      read('../components/portfolio-sections.tsx'),
    ].join('\n');
    const at = (needle: string) => {
      const index = labels.indexOf(needle);
      expect(index, `missing ${needle}`).toBeGreaterThanOrEqual(0);
      return index;
    };
    const work = at('01 / Selected work');
    const experience = at('02 / Experience');
    const capabilities = at('04 / Connected capabilities');
    const about = at('05 / About');
    const contact = at('06 / Get in touch');
    expect(work).toBeLessThan(experience);
    expect(experience).toBeLessThan(capabilities);
    expect(capabilities).toBeLessThan(about);
    expect(about).toBeLessThan(contact);
    expect(labels).not.toContain('05 / Get in touch');
  });

  it('uses the requested heading and a timeline of dots on an accent line', () => {
    const section = read('../components/portfolio-sections.tsx');
    expect(section).toContain('From the research lab to data work.');
    expect(section).toContain('id="experience"');
    expect(section).toContain('<ol');
    expect(section).toContain('bg-primary/45');
    expect(section).toContain('rounded-full bg-primary');
  });

  it('offers the CV under the timeline through the shared link', () => {
    const section = read('../components/portfolio-sections.tsx');
    const timeline = section.indexOf('</ol>');
    const cv = section.indexOf('<a {...CV_LINK}>Download CV</a>', timeline);
    expect(timeline).toBeGreaterThanOrEqual(0);
    expect(cv, 'Download CV button missing under the timeline').toBeGreaterThan(timeline);
  });
});

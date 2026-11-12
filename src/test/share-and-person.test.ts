import { describe, expect, it } from 'vitest';
import { PERSON_JSON_LD, SHARE_IMAGE, pageHead, SOCIAL } from '@/lib/site-content';
import { getProject } from '@/lib/projects';

describe('share image and person data', () => {
  it('every page head carries the 1200x630 share image', () => {
    const meta = pageHead('t', 'd', '/projects/x', 'https://other.example/img.png').meta as { property?: string; name?: string; content?: string }[];
    expect(meta.find(m => m.property === 'og:image')?.content).toBe('https://punjdeep.com/og-image.png');
    expect(meta.find(m => m.name === 'twitter:image')?.content).toBe(SHARE_IMAGE);
  });
  it('Person JSON-LD has no email or telephone and lists the three profiles', () => {
    const json = JSON.stringify(PERSON_JSON_LD);
    expect(json).not.toMatch(/email|telephone|@outlook/i);
    expect(PERSON_JSON_LD.sameAs).toEqual([SOCIAL.linkedin, SOCIAL.github, SOCIAL.tableau]);
    expect(PERSON_JSON_LD.address.addressLocality).toBe('Ghent');
  });
  it('the two new case studies have their own title and description', () => {
    for (const slug of ['pilot-line-production-reporting', 'belgian-electricity-prices']) {
      expect(getProject(slug)?.seoTitle).toBeTruthy();
      expect(getProject(slug)?.seoDescription).toBeTruthy();
    }
  });
});

import { describe, expect, it } from 'vitest';
import { getProject, LEGACY_PROJECT_SLUGS } from '@/lib/projects';
import { sitemapXML } from '@/lib/sitemap';

describe('search basics', () => {
  it('sends the old /projects/project-two link to the photonic coupling study', () => {
    expect(LEGACY_PROJECT_SLUGS['project-two']).toBe('photonic-coupling-assembly-tolerance');
    expect(getProject(LEGACY_PROJECT_SLUGS['project-two'] ?? '')).toBeDefined();
  });
  it('builds sitemap URLs on punjdeep.com', () => {
    expect(sitemapXML('https://punjdeep.com', [{ path: '/about' }])).toContain('<loc>https://punjdeep.com/about</loc>');
  });
});

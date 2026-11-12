import { describe, expect, it } from 'vitest';
import { CASE_STUDIES, HOME_PROJECT_CARDS, filterHomeProjectCards } from '@/lib/projects';

describe('homepage project selection', () => {
  it('uses the requested project order', () => {
    expect(HOME_PROJECT_CARDS.map(p => p.slug)).toEqual([
      'pilot-line-production-reporting', 'laser-weld-defect-inspection',
      'battery-dispatch-belgian-electricity-prices', 'photonic-coupling-assembly-tolerance',
      'healthcare-risk-prioritisation', 'fda-drug-shortages-analytics',
    ]);
  });
  it('limits every card to three tags and uses the requested battery tags', () => {
    expect(HOME_PROJECT_CARDS.every(p => p.stack.length <= 3)).toBe(true);
    expect(HOME_PROJECT_CARDS[2]?.stack).toEqual(['SQL', 'Databricks', 'Power BI']);
  });
  it('preserves future destinations without adding unavailable studies', () => {
    expect(HOME_PROJECT_CARDS.filter(p => p.pendingStudyPath).map(p => p.pendingStudyPath)).toEqual([
      '/projects/pilot-line-production-reporting', '/projects/belgian-electricity-prices',
    ]);
    expect(CASE_STUDIES).toHaveLength(4);
  });
  it('offers the supplied live dashboard only on the pilot-line card', () => {
    expect(HOME_PROJECT_CARDS.filter(p => p.links.demo).map(p => p.links.demo)).toEqual(['https://fab-reporting-ba.streamlit.app']);
  });
  it('preserves requested ordering when filtered', () => {
    expect(filterHomeProjectCards('Analytics').map(p => p.slug)).toEqual(['pilot-line-production-reporting', 'fda-drug-shortages-analytics']);
  });
});
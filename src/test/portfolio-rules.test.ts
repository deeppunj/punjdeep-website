import { describe, expect, it } from 'vitest';
import { CASE_STUDIES, CATEGORIES, PROJECTS, filterProjects, getProject } from '@/lib/projects';

describe('Portfolio project rules', () => {
  it('shows all six requested projects on initial All selection', () => {
    expect(filterProjects('All').map(p=>p.links.github)).toEqual([
      'https://github.com/deeppunj/laser-defect-inspection-ml',
      'https://github.com/deeppunj/sipho-coupler-study',
      'https://github.com/deeppunj/patient-finding-synthea',
      'https://github.com/deeppunj/powerbi_fda_drug_shortages',
      'https://github.com/deeppunj/fab-reporting-ba',
      'https://github.com/deeppunj/battery-dispatch-be',
    ]);
  });
  it('filters Optics & Photonics to the coupling study', () => { expect(filterProjects('Optics & Photonics').map(p=>p.slug)).toEqual(['photonic-coupling-assembly-tolerance']); });
  it('filters Machine Learning to laser inspection, healthcare and battery dispatch', () => { expect(filterProjects('Machine Learning').map(p=>p.slug)).toEqual(['laser-weld-defect-inspection','healthcare-risk-prioritisation','battery-dispatch-belgian-electricity-prices']); });
  it('filters Analytics to FDA shortages and pilot-line reporting', () => { expect(filterProjects('Analytics').map(p=>p.slug)).toEqual(['fda-drug-shortages-analytics','pilot-line-production-reporting']); });
  it('keeps the two repository-only cards out of the case-study system', () => {
    expect(CASE_STUDIES.map(p=>p.slug)).toEqual(['laser-weld-defect-inspection','photonic-coupling-assembly-tolerance','healthcare-risk-prioritisation','fda-drug-shortages-analytics']);
    for (const slug of ['pilot-line-production-reporting','battery-dispatch-belgian-electricity-prices']) {
      const p = getProject(slug);
      expect(p?.hasCaseStudy).toBe(false);
      expect(p?.sections).toEqual([]);
    }
  });
  it('provides no unverified demo or article destinations', () => { expect(PROJECTS.flatMap(p=>[p.links.demo,p.links.article].filter(Boolean))).toEqual([]); });
  it('does not leave any requested filter empty', () => { for (const c of CATEGORIES) expect(filterProjects(c).length).toBeGreaterThan(0); });
  it.each(PROJECTS.map(p => [p.slug, p.links.github]))('resolves the detail lookup for %s', (slug, github) => {
    expect(getProject(slug)?.links.github).toBe(github);
  });
  it('does not resolve a missing study to another project', () => {
    expect(getProject('missing-study')).toBeUndefined();
  });
});

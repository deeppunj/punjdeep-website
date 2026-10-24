import { describe, expect, it } from 'vitest';
import { CATEGORIES, PROJECTS, filterProjects } from '@/lib/projects';

describe('Portfolio project rules', () => {
  it('shows all four requested studies on initial All selection', () => {
    expect(filterProjects('All').map(p=>p.links.github)).toEqual([
      'https://github.com/deeppunj/laser-defect-inspection-ml',
      'https://github.com/deeppunj/sipho-coupler-study',
      'https://github.com/deeppunj/patient-finding-synthea',
      'https://github.com/deeppunj/powerbi_fda_drug_shortages',
    ]);
  });
  it('filters Optics & Photonics to the coupling study', () => { expect(filterProjects('Optics & Photonics').map(p=>p.slug)).toEqual(['photonic-coupling-assembly-tolerance']); });
  it('filters Machine Learning to laser inspection and healthcare', () => { expect(filterProjects('Machine Learning').map(p=>p.slug)).toEqual(['laser-weld-defect-inspection','healthcare-risk-prioritisation']); });
  it('filters Analytics to FDA shortages', () => { expect(filterProjects('Analytics').map(p=>p.slug)).toEqual(['fda-drug-shortages-analytics']); });
  it('provides no unverified demo or article destinations', () => { expect(PROJECTS.flatMap(p=>[p.links.demo,p.links.article].filter(Boolean))).toEqual([]); });
  it('does not leave any requested filter empty', () => { for (const c of CATEGORIES) expect(filterProjects(c).length).toBeGreaterThan(0); });
});

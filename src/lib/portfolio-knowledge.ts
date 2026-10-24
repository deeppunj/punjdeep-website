import { PROJECTS } from './projects';
import { ABOUT, EXPERTISE, SOCIAL } from './site-content';

/** Kept in sync with the visible portfolio; no separate invented inventory. */
export const PORTFOLIO_KNOWLEDGE = [
  'Deep Punj, PhD — Optical Engineering · Scientific Software · Applied Machine Learning. Gent, Belgium.',
  ...ABOUT,
  `Contact: LinkedIn ${SOCIAL.linkedin}. GitHub ${SOCIAL.github}. No verified email or CV is supplied here.`,
  'No employment timeline, publication counts, proficiency levels, production deployments or commercial outcomes are established by this portfolio.',
  ...EXPERTISE.map(e => `${e.title}: ${e.description}`),
  ...PROJECTS.map(p => [
    `${p.title} (${p.category}): ${p.description}`,
    `Repository: ${p.links.github}. Portfolio: https://punjdeep.com/projects/${p.slug}. No verified hosted demo or article.`,
    ...p.sections.map(s => `${s.title}: ${s.paragraphs.join(' ')}`),
  ].join('\n')),
].join('\n\n');

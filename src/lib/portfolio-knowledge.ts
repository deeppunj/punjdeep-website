import { PROJECTS } from './projects';
import { ABOUT, EXPERIENCE, EXPERTISE, SOCIAL } from './site-content';

/** Kept in sync with the visible portfolio; no separate invented inventory. */
export const PORTFOLIO_KNOWLEDGE = [
  'Deep Punj, PhD — Optical Engineering · Data Science · Python & Machine Learning. Ghent, Belgium.',
  ...ABOUT,
  `Contact: LinkedIn ${SOCIAL.linkedin}. GitHub ${SOCIAL.github}. No verified email or CV is supplied here.`,
  'No proficiency levels, production deployments or commercial outcomes are established by this portfolio.',
  ...EXPERIENCE.map(e => `Experience: ${e.dates} — ${e.role}, ${e.org}${e.text ? `. ${e.text}` : ''}`),
  ...EXPERTISE.map(e => `${e.title}: ${e.description}`),
  ...PROJECTS.map(p => [
    `${p.title} (${p.category}): ${p.description}`,
    p.hasCaseStudy === false
      ? `Repository: ${p.links.github}. Repository-only card; no case-study page, hosted demo or article.`
      : `Repository: ${p.links.github}. Portfolio: https://punjdeep.com/projects/${p.slug}. No verified hosted demo or article.`,
    ...p.sections.map(s => `${s.title}: ${s.paragraphs.join(' ')}`),
  ].join('\n')),
].join('\n\n');

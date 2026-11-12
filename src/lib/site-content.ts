export const SOCIAL = { github: 'https://github.com/deeppunj', linkedin: 'https://www.linkedin.com/in/deeppunj/' };
export const CV_LINK = {
  href: '/deep-punj-cv.pdf',
  download: 'Deep_Punj_CV.pdf',
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
export const HERO_PROOF = [
  { value: '10+ years', label: 'lasers, imaging and measurement data' },
  { value: '6 projects', label: 'personal projects, code on GitHub' },
  { value: '20 papers', label: 'h-index 13 on Google Scholar' },
];
export const HERO_AVAILABILITY =
  'Based in Ghent · open to roles in Belgium, the Netherlands, the rest of Europe and India';
export const ABOUT = [
  'I am a physicist with a PhD in optics. At Ghent University I build and run laser and imaging systems, write Python programs for instrument control and image analysis, and check measurement data before anyone relies on it.',
  'Over the past year I built GitHub projects that follow data from raw records to a tested result: SQL and Power BI reporting, machine learning on images and health records, and price forecasting. I am looking for data analyst and data scientist roles, and for optical engineering roles where the data matters.',
];
export const ABOUT_SERIES = {
  intro: 'I also write Light meets Data, a short LinkedIn series that explains data ideas through optics:',
  posts: [
    { label: 'Standard error', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7521910693827264514' },
    { label: 'Fourier transforms in OCT', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7523538152041402369' },
    { label: 'Speckle', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7525337359144484864' },
  ],
};
export type ExpertiseProject = string | { slug: string; label: string };
export const EXPERTISE: { title: string; description: string; projects: ExpertiseProject[] }[] = [
  { title: 'Data analysis & reporting', description: 'SQL and PostgreSQL, Power BI with DAX measures, KPI definitions and data-quality checks.', projects: ['pilot-line-production-reporting', 'fda-drug-shortages-analytics'] },
  { title: 'Machine learning & forecasting', description: 'scikit-learn models, validation split by group or by time, baselines, and results with their limits stated.', projects: ['laser-weld-defect-inspection', 'healthcare-risk-prioritisation', { slug: 'belgian-electricity-prices', label: 'Battery Dispatch' }] },
  { title: 'Python & data pipelines', description: 'pandas, ETL from raw files to database tables, automated tests and MLflow tracking.', projects: ['healthcare-risk-prioritisation', 'laser-weld-defect-inspection'] },
  { title: 'Optical engineering & imaging', description: 'Lasers, OCT, microscopy, instrument control in Python and photonics simulation.', projects: ['photonic-coupling-assembly-tolerance', 'laser-weld-defect-inspection'] },
];
export function pageHead(title: string, description: string, path: string, image?: string) {
  const absoluteImage = image?.startsWith('https://') ? image : undefined;
  return { meta: [
    { title }, { name: 'description', content: description }, { property: 'og:title', content: title },
    { property: 'og:description', content: description }, { property: 'og:type', content: path.startsWith('/projects/') ? 'article' : 'website' },
    { property: 'og:url', content: `https://punjdeep.com${path}` }, { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    ...(absoluteImage ? [{ property: 'og:image', content: absoluteImage }, { name: 'twitter:image', content: absoluteImage }] : []),
  ], links: [{ rel: 'canonical', href: `https://punjdeep.com${path}` }] };
}

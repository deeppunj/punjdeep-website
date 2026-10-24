export const SOCIAL = { github: 'https://github.com/deeppunj', linkedin: 'https://www.linkedin.com/in/deeppunj/' };
export const ABOUT = [
  'My background is in optical engineering and biomedical research, including laser systems, microscopy, scientific instrumentation and experimental data analysis.',
  'Alongside this work, I develop practical capabilities in scientific software, SQL and machine learning. I am particularly interested in problems where understanding the measurement, the underlying physics and the data all matter.',
];
export const EXPERTISE = [
  { title: 'Optical engineering & imaging', description: 'Simulated optical coupling and assembly tolerance, complemented by thermal-image analysis of laser welds.', projects: ['photonic-coupling-assembly-tolerance', 'laser-weld-defect-inspection'] },
  { title: 'Scientific Python & software', description: 'Data-processing workflows, numerical analysis, visualisation and practical scientific tools.', projects: ['photonic-coupling-assembly-tolerance', 'laser-weld-defect-inspection', 'healthcare-risk-prioritisation'] },
  { title: 'Applied machine learning', description: 'Feature engineering, model comparison, grouped or temporal evaluation and interpretable results.', projects: ['laser-weld-defect-inspection', 'healthcare-risk-prioritisation'] },
  { title: 'Data analysis & communication', description: 'SQL, pandas, Power BI and clear communication of analytical findings.', projects: ['healthcare-risk-prioritisation', 'fda-drug-shortages-analytics'] },
];
export function pageHead(title: string, description: string, path: string, image?: string) {
  const absoluteImage = image?.startsWith('https://') ? image : undefined;
  return { meta: [
    { title }, { name: 'description', content: description }, { property: 'og:title', content: title },
    { property: 'og:description', content: description }, { property: 'og:type', content: path.startsWith('/projects/') ? 'article' : 'website' },
    { property: 'og:url', content: `https://punjdeep.com${path}` }, { name: 'twitter:card', content: 'summary_large_image' },
    ...(absoluteImage ? [{ property: 'og:image', content: absoluteImage }, { name: 'twitter:image', content: absoluteImage }] : []),
  ], links: [{ rel: 'canonical', href: `https://punjdeep.com${path}` }] };
}

export const SOCIAL = { github: 'https://github.com/deeppunj', linkedin: 'https://www.linkedin.com/in/deeppunj/', tableau: 'https://public.tableau.com/app/profile/deep.punj' };
export const SHARE_IMAGE = 'https://punjdeep.com/og-image.png';
export const WRITING = {
  text: 'A LinkedIn series where I explain one data idea through optics, with the Python code on GitHub. The data in the posts is simulated, so the true answer is known.',
  code: 'https://github.com/deeppunj/light-and-data',
  titles: ['Averaging noisy scans: standard error', 'Fourier transform: how OCT sees depth', 'When averaging fails: speckle'],
};
export const PERSON_JSON_LD = {
  '@context': 'https://schema.org', '@type': 'Person', name: 'Deep Punj', honorificSuffix: 'PhD',
  jobTitle: 'Optical Engineer and Data Analyst', url: 'https://punjdeep.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Ghent', addressCountry: 'BE' },
  alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Aix-Marseille Université' }, { '@type': 'CollegeOrUniversity', name: 'Cochin University of Science and Technology' }],
  sameAs: ['https://www.linkedin.com/in/deeppunj/', 'https://github.com/deeppunj', 'https://public.tableau.com/app/profile/deep.punj'],
};
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
export const EXPERIENCE: { dates: string; role: string; org: string; text?: string }[] = [
  {
    dates: 'Apr 2022 – present',
    role: 'Optical Engineer / Researcher',
    org: 'Ghent University, Faculty of Pharmaceutical Sciences',
    text: 'Designed and built an in vivo retinal system that combines an OCT imaging system with nanosecond lasers, now in the UZ Gent Animalarium core facility. I write the Python programs for instrument control, image analysis and scheduled laser checks, co-managed the move of the whole lab, handled equipment purchases, and train PhD students and postdocs.',
  },
  {
    dates: 'Nov 2021',
    role: 'Data Mining Intern (virtual)',
    org: 'World Development Organization',
    text: 'Wrote Python scrapers to collect NGO funding data from several websites, then cleaned and merged it with pandas.',
  },
  {
    dates: 'Jun 2019 – Apr 2022',
    role: 'Postdoctoral Researcher, Single-Molecule Optics',
    org: "Leiden University (Orrit's group)",
    text: "Gold nanorod dimers: synthesis, SEM measurement and analysis, COMSOL simulations, and one- and two-photon fluorescence measurements of single molecules. Mentored a PhD student.",
  },
  {
    dates: '2015 – 2019',
    role: 'Postdoctoral Researcher',
    org: 'IIT Madras · UC Irvine · KAUST',
    text: 'Plasmonics-assisted ptychography for high-resolution imaging, nanofabrication with FIB and SEM, and Lumerical FDTD modelling.',
  },
  {
    dates: '2012 – 2015',
    role: 'PhD, Nano-Optics',
    org: 'Institut Fresnel (CNRS), Aix-Marseille Université',
    text: 'Modelled gold nanoantennas with FDTD and measured them with fluorescence correlation spectroscopy.',
  },
  {
    dates: '2006 – 2011',
    role: 'Integrated M.Sc., Photonics',
    org: 'Cochin University of Science and Technology, India',
  },
];
export const PUBLICATIONS: {
  intro: string;
  items: { journal: string; role: string; href?: string }[];
} = {
  intro: '20 journal papers, 4 as first author; h-index 13, about 1,100 citations (Google Scholar). Selected, newest first.',
  items: [
    { journal: 'Advanced Science (2026)', role: 'co-author' },
    { journal: 'Science Advances 12(39) (2026)', role: 'co-author' },
    { journal: 'Advanced Science 13(16) (2026)', role: 'co-author', href: 'https://doi.org/10.1002/advs.202516534' },
    { journal: 'Investigative Ophthalmology & Visual Science 67(2) (2026)', role: 'co-author' },
    { journal: 'Journal of Nanobiotechnology 23 (2025)', role: 'co-author', href: 'https://doi.org/10.1186/s12951-025-03640-3' },
    { journal: 'Journal of Controlled Release 365 (2024)', role: 'co-author' },
    { journal: 'International Journal of Molecular Sciences 24(4) (2023)', role: 'second author', href: 'https://doi.org/10.3390/ijms24043147' },
    { journal: 'Journal of Controlled Release 354 (2023)', role: 'co-author' },
    { journal: 'ACS Photonics 2 (2015)', role: 'first author' },
    { journal: 'Nature Nanotechnology 8 (2013)', role: 'first author', href: 'https://doi.org/10.1038/nnano.2013.98' },
  ],
};
export const CERTIFICATES: { label: string; href?: string }[] = [
  { label: 'Google Data Analytics Professional Certificate (SQL, R, Tableau, data cleaning)' },
  { label: 'IBM: Python for Data Science, AI and Development (Coursera, 2021)' },
  { label: 'First Order Optical System Design, University of Colorado Boulder (Coursera, 2021)' },
  { label: 'Deloitte Australia Data Analytics Job Simulation (Forage, Oct 2026)' },
  { label: 'Databricks course on Coursera (in progress)' },
  { label: 'Tableau Public: 6 visualisations', href: 'https://public.tableau.com/app/profile/deep.punj' },
];
export const TEACHING: string[] = [
  'Teach in the annual Specialist Microscopy course at Ghent University and train PhD students and postdocs on the lab’s setups.',
  'Earlier: Physical Experiment 1 at Leiden University and the Europhotonics Master lab course in single-molecule spectroscopy in Marseille.',
];
export type ExpertiseProject = string | { slug: string; label: string };
export const EXPERTISE: { title: string; description: string; projects: ExpertiseProject[] }[] = [
  { title: 'Data analysis & reporting', description: 'SQL and PostgreSQL, Power BI with DAX measures, KPI definitions and data-quality checks.', projects: ['pilot-line-production-reporting', 'fda-drug-shortages-analytics'] },
  { title: 'Machine learning & forecasting', description: 'scikit-learn models, validation split by group or by time, baselines, and results with their limits stated.', projects: ['laser-weld-defect-inspection', 'healthcare-risk-prioritisation', { slug: 'belgian-electricity-prices', label: 'Battery Dispatch' }] },
  { title: 'Python & data pipelines', description: 'pandas, ETL from raw files to database tables, automated tests and MLflow tracking.', projects: ['healthcare-risk-prioritisation', 'laser-weld-defect-inspection'] },
  { title: 'Optical engineering & imaging', description: 'Lasers, OCT, microscopy, instrument control in Python and photonics simulation.', projects: ['photonic-coupling-assembly-tolerance', 'laser-weld-defect-inspection'] },
];
export function pageHead(title: string, description: string, path: string, _image?: string) {
  return { meta: [
    { title }, { name: 'description', content: description }, { property: 'og:title', content: title },
    { property: 'og:description', content: description }, { property: 'og:type', content: path.startsWith('/projects/') ? 'article' : 'website' },
    { property: 'og:url', content: `https://punjdeep.com${path}` }, { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { property: 'og:image', content: SHARE_IMAGE }, { property: 'og:image:width', content: '1200' }, { property: 'og:image:height', content: '630' }, { name: 'twitter:image', content: SHARE_IMAGE },
  ], links: [{ rel: 'canonical', href: `https://punjdeep.com${path}` }] };
}

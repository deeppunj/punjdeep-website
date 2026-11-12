import laser from '@/assets/laser.webp.asset.json';
import photonics from '@/assets/photonics.webp.asset.json';
import healthcare from '@/assets/healthcare.webp.asset.json';
import fda from '@/assets/fda.webp.asset.json';

export const CATEGORIES = ['All', 'Optics & Photonics', 'Machine Learning', 'Analytics'] as const;
export type Category = typeof CATEGORIES[number];
export type StudySection = { title: string; paragraphs: string[]; items?: string[] };
export type StudyFigure = { image: string; alt: string; caption: string };
export type Project = {
  slug: string; category: Exclude<Category, 'All'>; title: string; description: string;
  stack: string[]; image: string; alt: string; caption: string;
  links: { github: string; demo?: string; article?: string }; sections: StudySection[];
  /** False for repository-only cards: no case-study page, no sitemap entry. */
  hasCaseStudy?: boolean;
  label?: string; demoLabel?: string;
  glance?: { label: string; text: string }[];
  figures?: StudyFigure[];
};
export const PROJECTS: Project[] = [
  {
    slug: 'laser-weld-defect-inspection', category: 'Machine Learning', title: 'Laser Weld Defect Inspection',
    description: 'A Random Forest on 16,362 real thermal camera frames of laser welds catches 91% of defective frames at 5.6% false alarms, with weld-grouped validation.',
    stack: ['Python', 'Image Analysis', 'scikit-learn', 'SHAP'], image: laser.url,
    alt: 'Six thermal camera frames comparing sound and unsound phases of weld 001-020.',
    caption: 'Thermal-frame comparison from the project repository. Figure: Deep Punj; underlying dataset: Walther et al. (2025), CC BY 4.0, as attributed in the repository.',
    links: { github: 'https://github.com/deeppunj/laser-defect-inspection-ml' },
    sections: [
      { title: 'Problem', paragraphs: ['Can thermal imagery reveal when a laser butt weld becomes unsound—and explain what drove the prediction? The study investigates a discontinuity developing as the metal sheets move apart, connecting scientific imaging with interpretable classification.'] },
      { title: 'Data or modelled system', paragraphs: ['The repository describes 16,362 labelled 32 × 32 long-wave infrared frames at 30 Hz from 97 welds, drawn from 100 recordings at two welding speeds. Frames are labelled Beginning, Sound or Unsound. The model uses thermal-image features, not the inductive probes also recorded in the source dataset.', 'The externally hosted data is attributed to Walther et al. (2025). The repository documents its download rather than bundling the raw dataset.'] },
      { title: 'Implementation', paragraphs: ['Python scripts handle data inspection, feature extraction and Random Forest training with scikit-learn. SHAP provides feature-level explanations. A locally launched Streamlit dashboard displays predictions over time, frames, the first alarm and the first unsound label.'] },
      { title: 'Approach / workflow', paragraphs: ['Extract seven physics-motivated, label-free features from each frame, normalized against the first 15 labelled frames of its weld. This baseline requires an acquisition window; startup-frame features can include later frames within that window, so immediate causal online inference is not established. Keep complete welds together during nested cross-validation and select decision thresholds using training welds only.', 'Grouping matters: neighbouring frames from the same weld are correlated. Random frame splits could put almost identical experimental conditions into both training and testing and overstate generalisation.'] },
      { title: 'Evaluation', paragraphs: ['The repository compares the thermal-feature model with a weld-position-only baseline. That baseline reports similarly high discrimination but needs knowledge of the weld position/end; the author explicitly identifies it as a “cheating” baseline, not a deployable predictor.', 'Nested cross-validation measures ROC AUC, balanced accuracy and unsound-class F1 on held-out welds. These are repository-reported evaluations; they have not been independently reproduced for this portfolio.'] },
      { title: 'Results', paragraphs: ['Author-reported frame-level ROC AUC: 0.974 ± 0.007 (mean ± standard deviation across five outer weld-grouped folds). ROC AUC measures ranking discrimination across thresholds, not 97.4% accuracy or weld-level detection success.', 'The author also reports balanced accuracy of 0.927 ± 0.012 (mean recall of the two classes) and unsound-class F1 of 0.900 ± 0.016 (harmonic mean of precision and recall), with the same fold-SD convention. SHAP explanations and the local dashboard make individual predictions inspectable; no production deployment is claimed.'] },
      { title: 'Limitations', paragraphs: ['Labels progress from Beginning to Sound to Unsound in 93 of 97 welds. Hot-band position, a leading SHAP feature, may partly reflect temporal drift rather than a defect-specific mechanism. Label timing and errors around the sound/unsound boundary therefore matter.', 'Evaluation covers one dataset and welding setup. Transfer to other materials, speeds or cameras remains untested. The first-15-frame baseline requires a warm-up window; startup evaluation does not establish strictly causal real-time prediction. The dashboard is a local inspection tool, not a verified hosted service.'] },
      { title: 'Repository and reproducibility', paragraphs: ['The public repository contains scripts, tests, report figures and commands for downloading data, extracting features, training and launching Streamlit. Follow its documented environment and pytest instructions. This portfolio summarises implemented work; it does not claim an independent rerun.'] },
    ],
  },
  {
    slug: 'photonic-coupling-assembly-tolerance', category: 'Optics & Photonics', title: 'Photonic Coupling & Assembly Tolerance',
    description: 'A Python simulation study connecting SiN edge-coupler mode design, optical coupling, alignment tolerance and assembly yield.',
    stack: ['Photonics', 'Numerical Modelling', 'Monte Carlo', 'Python'], image: photonics.url,
    alt: 'Simulated optical intensity mode profile for a 250 nanometre SiN tip, plotted across micrometre coordinates.',
    caption: 'Simulated mode profile, 250 nm tip. Figure: Deep Punj / sipho-coupler-study. Scalar model, not an experimental measurement.',
    links: { github: 'https://github.com/deeppunj/sipho-coupler-study' },
    sections: [
      { title: 'Problem', paragraphs: ['An edge coupler cannot be judged by nominal coupling alone: alignment and process variation affect whether it can be assembled reliably. This study connects mode design to fibre-to-chip and chip-to-chip packaging trade-offs.'] },
      { title: 'Data or modelled system', paragraphs: ['A modelled silicon-nitride inverse taper in silica cladding is studied at 1550 nm. The reference setup uses 300 nm SiN thickness and refractive index 1.98. Tip width, placement offset, chip gap and process variation are simulation inputs, not measurements of fabricated devices.'] },
      { title: 'Implementation', paragraphs: ['A scalar finite-difference mode solver calculates guided modes. Overlap calculations estimate fibre coupling, angular-spectrum propagation estimates chip-to-chip sensitivity, and Monte Carlo sampling explores assembly yield. A Gaussian-process surrogate explores tip-width and thickness variation.', 'Separate scripts investigate an expanded-beam micro-optic relay and generate a test-chip design-of-experiments layout. The layout is a design output, not evidence of fabrication.'] },
      { title: 'Approach / workflow', paragraphs: ['Check the mode solver against an exact slab solution; sweep taper tips to examine mode size and coupling; vary lateral offset and gap; then sample placement and process assumptions to connect nominal design with packaging tolerance.', 'Explore a micro-optic relay as an alternative coupling arrangement. Its ray-based spot metrics must not be treated as a direct single-mode coupling-loss measurement.'] },
      { title: 'Evaluation', paragraphs: ['Repository tests compare selected calculations with analytical or known physics results. This offers numerical checks within the chosen model, not full-vector or experimental validation.', 'All loss and yield values are simulated under stated assumptions. Process distributions are illustrative and are not foundry characterisation data.'] },
      { title: 'Results', paragraphs: ['The author reports a modelled best UHNA7 fibre-coupling loss of 0.43 dB at a 250 nm tip. For two such tips, the simulated 1 dB lateral misalignment radius is about 0.7 µm.', 'Illustrative Monte Carlo assembly yield at a 1 dB specification is reported as 96%, 56% and 19% for independent Gaussian placement offsets with standard deviations of 0.25, 0.5 and 1 µm per axis respectively (20,000 draws per setting). Yield is the fraction of simulated assemblies meeting the 1 dB coupling-loss limit. These are simulated yields, not measured manufacturing outcomes; no independent reproduction is claimed.'] },
      { title: 'Limitations', paragraphs: ['The scalar model omits full-vector polarisation effects, Fresnel reflections, substrate leakage, taper-transition loss and facet roughness. Predictions near cutoff, especially below a 170 nm tip, are uncertain.', 'The study uses illustrative process assumptions. Fabrication and measurement remain future work; this transparent Python model is not claimed to be equivalent to commercial photonics simulation software.'] },
      { title: 'Repository and reproducibility', paragraphs: ['The MIT-licensed public repository provides the environment, solver and study commands, tests, figures, layout generation and relay exploration. Its documented workflow includes Python 3.10+ and automated checks on Python 3.10 and 3.12.'] },
    ],
  },
  {
    slug: 'healthcare-risk-prioritisation', category: 'Machine Learning', title: 'Healthcare Risk Prioritisation',
    description: 'SQL cohorts and machine learning on synthetic health records: the top 10% of patients by risk score holds 49% of next year’s kidney-disease cases.',
    stack: ['PostgreSQL', 'SQL', 'scikit-learn', 'MLflow'], image: healthcare.url,
    alt: 'Study design showing two-year past-only feature windows, one-year outcomes, and earlier training versus later test snapshots.',
    caption: 'Temporal study design from Deep Punj / patient-finding-synthea. Records and evaluation are synthetic; not clinical validation.',
    links: { github: 'https://github.com/deeppunj/patient-finding-synthea' },
    sections: [
      { title: 'Problem', paragraphs: ['When review capacity is limited, can historical records help prioritise patients who later receive a first chronic kidney disease diagnosis? This is a synthetic-data ranking study, not a diagnostic system.'] },
      { title: 'Data or modelled system', paragraphs: ['Synthea-generated health records are loaded into PostgreSQL. SQL constructs annual snapshots for adults without prior CKD who visited in the preceding two years.', 'Each snapshot uses only the preceding two years for features; the outcome is a first CKD diagnosis in the following 12 months. No real patient records are used.'] },
      { title: 'Implementation', paragraphs: ['SQL builds cohorts and features; Python and scikit-learn fit logistic regression and gradient boosting; MLflow records experiments. A local Streamlit dashboard communicates ranking performance and review-capacity trade-offs.'] },
      { title: 'Approach / workflow', paragraphs: ['Construct snapshots from 2019–2025. Restrict predictors to information available before each snapshot, train on 2019–2023, and test on 2024–2025. The repository includes a no-leakage test.', 'Compare a transparent linear baseline with gradient boosting, then evaluate how many future cases fall within a feasible top-ranked review fraction.'] },
      { title: 'Evaluation', paragraphs: ['Rare outcomes make accuracy misleading. The author evaluates precision–recall AUC, ROC AUC and case capture at fixed review capacity. The reported test data contains 13,769 snapshots and only 75 future diagnoses.', 'Reported average precision (called “PR-AUC” in the repository) is 0.030 for logistic regression and 0.028 for gradient boosting, against a 0.005 random baseline. This summarizes precision across recall levels; it is not necessarily trapezoidal PR-curve area. These are author-reported synthetic test results, not independently reproduced findings.'] },
      { title: 'Results', paragraphs: ['On pooled synthetic 2024–2025 test snapshots, the reported top 10% (1,376 of 13,769 patient snapshots) captures 37 of 75 positive snapshots. Precision is 37 / 1,376 ≈ 2.7%; case capture is 37 / 75 ≈ 49.3%. These are snapshot-level counts, not necessarily distinct patients.', 'This illustrates a review-capacity versus case-capture trade-off. It does not establish clinical benefit, diagnose disease or provide calibrated clinical probabilities.'] },
      { title: 'Limitations', paragraphs: ['Synthetic records are cleaner and rule-generated; real-world transfer is unverified. Patients can recur across annual snapshots and time-split groups; this is not an unseen-patient evaluation. The script selects the best model using average precision on the reported test set, so it is not an untouched final holdout. Few positive outcomes add uncertainty. No clinical validation is claimed.', 'Rankings should not be interpreted as individual clinical risk probabilities. Validation on real records and careful clinical assessment are future work, not implemented results.'] },
      { title: 'Repository and reproducibility', paragraphs: ['The public repository documents Synthea generation settings and seeds, PostgreSQL setup, a one-command pipeline, model tracking, dashboard launch and tests. Reproduction requires generated input data and the documented environment.'] },
    ],
  },
  {
    slug: 'fda-drug-shortages-analytics', category: 'Analytics', title: 'FDA Drug Shortages Analytics',
    description: 'A Power BI dashboard of 1,141 active US drug-shortage listings (69 drugs) by category, manufacturer and how long they have been open.',
    stack: ['Power BI', 'Power Query', 'DAX', 'Data Visualisation'], image: fda.url,
    alt: 'Repository Power BI dashboard showing shortage listings by category, manufacturer, availability and posting year.',
    caption: 'Repository dashboard, October 2026 snapshot as reported by the author. Figure: Deep Punj; data: FDA/openFDA (public domain). Listings, distinct drugs and category-expanded rows are different counts. Days open depends on report refresh date.',
    links: { github: 'https://github.com/deeppunj/powerbi_fda_drug_shortages' },
    sections: [
      { title: 'Problem', paragraphs: ['Which therapeutic categories and manufacturers have the most FDA-listed US drug shortages, and how long have current listings been open? This descriptive dashboard organises a public snapshot into a readable analytical view.'] },
      { title: 'Data or modelled system', paragraphs: ['The repository describes an October 2026 openFDA Drug Shortages snapshot: 1,582 source records flattened into 2,386 rows, one per therapeutic category. The underlying FDA/openFDA data is public domain.', 'Category expansion means row totals are not distinct shortage listings. A listing is also not the same thing as a distinct drug.'] },
      { title: 'Implementation', paragraphs: ['Power Query handles loading and types. Preparation converts dates to ISO format, corrects availability typos and labels missing values as “Not reported”. The Power BI Project format keeps the report and semantic model in versionable text files.'] },
      { title: 'Approach / workflow', paragraphs: ['Use separate DAX measures: distinct shortage_id values filtered to Current for active listings; distinct generic_name values for affected drugs; and an average of days since initial posting across current shortage IDs.', 'Top N views compare categories and manufacturers, while availability and posting-year views provide context. The README describes a DataFolder parameter, but the shipped Power Query source uses an author-machine path; users must edit that source path to load the included CSV.'] },
      { title: 'Evaluation', paragraphs: ['This is descriptive analytics, not predictive modelling. Interpretation depends on correct counting definitions, filtering and snapshot context; no independently reproduced audit or forecast performance is claimed.', 'The days-open measure uses DATEDIFF with TODAY(), so it changes with report refresh date even when the CSV snapshot is unchanged. It measures the age of currently listed shortages, not their final resolved duration.'] },
      { title: 'Results', paragraphs: ['The implemented dashboard provides category, manufacturer, availability and posting-year comparisons, alongside distinct listing and drug counts. The genuine repository screenshot is retained with its October 2026 snapshot context.', 'Numerical screenshot values are author-reported snapshot outputs, not live totals. No numerical finding is presented here as a current real-time statistic.'] },
      { title: 'Limitations', paragraphs: ['The repository notes that resolved shortages are removed by FDA after approximately six months, preventing reliable measurement of complete resolution times from this snapshot.', 'A drug may appear in multiple categories, and multiple listings may relate to the same generic drug. Category totals must not be summed as distinct drugs or listings. The report is not a real-time shortage monitor.'] },
      { title: 'Repository and reproducibility', paragraphs: ['The public repository includes a CSV snapshot, Power BI report and model definitions, DAX measures and setup instructions. Open the PBIP in Power BI Desktop on Windows and edit the Shortages Power Query source path to your local included CSV; the README’s DataFolder parameter is not implemented in the shipped source.', 'A date table, star-schema model and drill-through detail page are documented next steps, not completed features. Source: open.fda.gov/apis/drug/drugshortages/.'] },
    ],
  },
  {
    slug: 'pilot-line-production-reporting', category: 'Analytics', title: 'Pilot-Line Production Reporting', label: 'Personal project · simulated data',
    description: 'A reporting solution for a semiconductor pilot line, built the way a reporting business analyst works: from the business problem to KPIs, a star schema, data-quality checks, SQL, a Power BI report and a live dashboard.',
    stack: ['Power BI', 'SQL', 'PostgreSQL', 'Data quality', 'Streamlit'],
    image: 'https://raw.githubusercontent.com/deeppunj/fab-reporting-ba/main/docs/powerbi_report.png',
    alt: 'Power BI line overview report for the simulated pilot line.',
    caption: 'Power BI report: line overview. Simulated data.',
    links: { github: 'https://github.com/deeppunj/fab-reporting-ba', demo: 'https://fab-reporting-ba.streamlit.app' }, demoLabel: 'Live dashboard',
    glance: [
      { label: 'Problem', text: 'each team built its own Excel report from production exports, and nobody could say with confidence when lots would be ready.' },
      { label: 'What I built', text: 'a business brief, a KPI dictionary with 12 KPIs, a Kimball star schema, Python data-quality rules, SQL KPI queries, a Power BI report with DAX measures and a Streamlit dashboard.' },
      { label: 'Result', text: 'the analysis finds the bottleneck (lithography) and a drifting etch tool, and logs all 89 faulty source records instead of dropping them.' },
    ],
    figures: [
      { image: 'https://raw.githubusercontent.com/deeppunj/fab-reporting-ba/main/docs/dashboard.png', alt: 'Streamlit dashboard for the simulated pilot line.', caption: 'Streamlit dashboard (live at fab-reporting-ba.streamlit.app). Simulated data.' },
      { image: 'https://raw.githubusercontent.com/deeppunj/fab-reporting-ba/main/docs/powerbi_report.png', alt: 'Power BI line overview report for the simulated pilot line.', caption: 'Power BI report: line overview. Simulated data.' },
    ],
    sections: [
      { title: 'Problem', paragraphs: ['Each team built its own Excel report from production (MES) exports: operations counted lots out per week, equipment tracked tool downtime and yield engineering kept its own list. Partners kept asking when their lots would be ready, and the line could not answer with confidence.'] },
      { title: 'Data', paragraphs: ['Real production data from a fab is never public, so I simulated 609 lots with the structure of a real line: re-entrant routes, tool groups, planned and unplanned downtime, hot lots, holds and lot yield. The source export also contains deliberate data-quality problems that the pipeline has to catch.'] },
      { title: 'What I built', paragraphs: [], items: ['Business brief with stakeholders and user stories.', 'KPI dictionary (12 KPIs with formula, owner and target).', 'Kimball star schema with the grain of each table and a source-to-target mapping.', 'Python data-quality rules.', 'SQL KPI queries with CTEs and window functions.', 'Power BI report with relationships and DAX measures, including semi-additive WIP and time intelligence.', 'Streamlit dashboard.', 'Test plan that reconciles the dashboard with the SQL.'] },
      { title: 'What the analysis found', paragraphs: [], items: ['Lithography is the bottleneck: it causes 45% of all lot waiting time, at 75% utilization (the next highest tool group is at 51%).', 'Lots etched on ETCH-03 at step Etch 04 between 6 Jul and 2 Aug yielded 75.8%, against 86.1% for all other lots, while the other three etch tools stayed normal.', 'On-time delivery is 72.9% against an 85% target, with an average X-factor of 3.9: lots spend most of their time waiting, not being processed.', 'The source export had 89 bad rows (duplicates, unknown tools, impossible timestamps). All are logged on the dashboard.'] },
      { title: 'Recommendations', paragraphs: [], items: ['Protect lithography capacity first (maintenance outside peak arrival days, priority staffing).', 'Review ETCH-03 at Etch 04 and add a weekly per-tool yield check at that step.', 'Fix missing tool IDs and timestamp errors in the export at the source.'] },
      { title: 'Tools', paragraphs: ['Python (pandas, NumPy), PostgreSQL, SQL, Power BI (DAX), Streamlit, GitHub.'] },
    ],
  },
  {
    slug: 'belgian-electricity-prices', category: 'Machine Learning', title: 'Belgian Electricity Prices: Pipeline, Forecast and Battery', label: 'Personal project · public data',
    description: 'A data pipeline and a price forecast on ten years of Belgian electricity data, used to plan when a battery should charge and discharge.',
    stack: ['SQL', 'Databricks', 'Power BI', 'Forecasting', 'Python'],
    image: 'https://raw.githubusercontent.com/deeppunj/battery-dispatch-be/main/results/representative_dispatch_day.png',
    alt: 'Representative dispatch day: forecast Belgian day-ahead prices with the scheduled battery charge and discharge.',
    caption: 'One day of the battery schedule in the 2024 test.',
    links: { github: 'https://github.com/deeppunj/battery-dispatch-be' },
    glance: [
      { label: 'Problem', text: 'a battery earns money by charging when electricity is cheap and selling when it is expensive, but the plan has to be made before the prices are known.' },
      { label: 'What I built', text: 'an extract-load-transform pipeline in PostgreSQL and the same pipeline in Databricks, a Power BI report, a machine-learning price forecast and a daily battery schedule.' },
      { label: 'Result', text: 'the forecast error drops from 23.2 to 17.2 EUR/MWh against a same-hour-yesterday forecast, tested on 2024 prices the model never saw.' },
    ],
    figures: [
      { image: 'https://raw.githubusercontent.com/deeppunj/battery-dispatch-be/main/powerBi/battery_dispatch_report.png', alt: 'Power BI report on hourly Belgian electricity price and grid load, 2015 to 2024.', caption: 'Power BI report on hourly Belgian price and grid load, 2015 to 2024. Data: ENTSO-E and Elia.' },
      { image: 'https://raw.githubusercontent.com/deeppunj/battery-dispatch-be/main/results/representative_dispatch_day.png', alt: 'Representative dispatch day: forecast Belgian day-ahead prices with the scheduled battery charge and discharge.', caption: 'One day of the battery schedule in the 2024 test.' },
    ],
    sections: [
      { title: 'Problem', paragraphs: ['A battery earns money by charging when electricity is cheap and selling when it is expensive, but the plan has to be made before the prices are known.'] },
      { title: 'Data', paragraphs: ['Belgian day-ahead hourly prices 2015 to 2024 from the ENTSO-E Transparency Platform (87,577 hourly records, no missing values or duplicate hours after cleaning) and Elia open data on the total load of the Belgian grid. About 500,000 rows in all.'] },
      { title: 'Pipeline', paragraphs: ['Python loads the raw price and load files into PostgreSQL unchanged; SQL builds clean hourly price and load tables and a joined table; a check compares the result with the file the notebooks use (87,577 rows, same first and last hour, same price total).', 'The same steps run in Databricks SQL as bronze, silver and gold tables, and the same check passes.', 'A one-page Power BI report reads the gold table: four key figures, average price by month and by hour, grid load against price, and negative-price hours by year.'] },
      { title: 'Forecast and battery', paragraphs: ['A gradient-boosting model forecasts tomorrow\'s prices from calendar features and past prices. Data split by time: train 2015 to 2022, validate 2023, test 2024.', 'Each day a linear optimiser plans a 2 MWh / 1 MW battery from the forecast only, and the plan is then settled at the real prices.'] },
      { title: 'Results', paragraphs: [], items: ['Price forecast error (mean absolute error) in 2024: 17.18 EUR/MWh, against 23.19 for the same-hour-yesterday forecast.', "All 366 daily battery plans in 2024 were solved and stayed within the battery's limits.", 'The PostgreSQL and Databricks pipelines both pass the same check: 87,577 hours, same first and last hour, same price total.'] },
      { title: 'Tools', paragraphs: ['Python (pandas, scikit-learn), PostgreSQL, SQL, Databricks SQL, Power BI (DAX), Git.'] },
    ],
  },
];
export const getProject = (slug: string) => PROJECTS.find(p => p.slug === slug);
/** Projects with a full case-study page; repository-only cards are excluded. */
export const CASE_STUDIES = PROJECTS.filter(p => p.hasCaseStudy !== false);
/** Old addresses from the previous site, permanently redirected to the matching study. */
export const LEGACY_PROJECT_SLUGS: Record<string, string> = {
  'project-two': 'photonic-coupling-assembly-tolerance',
  'battery-dispatch-belgian-electricity-prices': 'belgian-electricity-prices',
};
export const filterProjects = (category: Category) => category === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === category);

/** Homepage presentation overrides leave existing case studies and URLs unchanged. */
export type HomeProjectCard = Project & { provenance: string; pendingStudyPath?: string };
const HOME_CARD_ORDER = [
  'pilot-line-production-reporting',
  'laser-weld-defect-inspection',
  'belgian-electricity-prices',
  'photonic-coupling-assembly-tolerance',
  'healthcare-risk-prioritisation',
  'fda-drug-shortages-analytics',
];
const HOME_CARD_DETAILS: Record<string, Partial<Project> & { provenance: string; pendingStudyPath?: string }> = {
  'pilot-line-production-reporting': {
    provenance: 'Personal project · simulated data',
    description: 'A reporting pipeline for a simulated semiconductor pilot line (609 lots): data-quality rules, a PostgreSQL star schema, SQL KPIs, a Power BI report and a live dashboard. It finds the bottleneck (lithography, 45% of all waiting time) and an etch tool whose lots yield 75.8% against 86.1%.',
  },
  'laser-weld-defect-inspection': { provenance: 'Personal project · public lab data' },
  'belgian-electricity-prices': {
    provenance: 'Personal project · public data',
    title: 'Belgian Electricity Prices: Pipeline, Forecast and Battery',
    description: "A Python and SQL pipeline, in PostgreSQL and in Databricks, builds 87,577 hours of Belgian prices and grid load. A forecast cuts the price error from 23.2 to 17.2 EUR/MWh against a simple baseline and plans a battery's charging, with a Power BI report on top.",
    stack: ['SQL', 'Databricks', 'Power BI'],
  },
  'photonic-coupling-assembly-tolerance': { provenance: 'Personal project · simulation' },
  'healthcare-risk-prioritisation': { provenance: 'Personal project · synthetic health records' },
  'fda-drug-shortages-analytics': { provenance: 'Personal project · public FDA data' },
};
export const HOME_PROJECT_CARDS: HomeProjectCard[] = HOME_CARD_ORDER.flatMap(slug => {
  const project = getProject(slug);
  const details = HOME_CARD_DETAILS[slug];
  return project && details ? [{ ...project, ...details, stack: (details.stack ?? project.stack).slice(0, 3) }] : [];
});
export const filterHomeProjectCards = (category: Category) => HOME_PROJECT_CARDS.filter(p => category === 'All' || p.category === category);

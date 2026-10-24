import laser from '@/assets/laser.webp.asset.json';
import photonics from '@/assets/photonics.webp.asset.json';
import healthcare from '@/assets/healthcare.webp.asset.json';
import fda from '@/assets/fda.webp.asset.json';

export const CATEGORIES = ['All', 'Optics & Photonics', 'Machine Learning', 'Analytics'] as const;
export type Category = typeof CATEGORIES[number];
export type StudySection = { title: string; paragraphs: string[] };
export type Project = {
  slug: string; category: Exclude<Category, 'All'>; title: string; description: string;
  stack: string[]; image: string; alt: string; caption: string;
  links: { github: string; demo?: string; article?: string }; sections: StudySection[];
};
export const PROJECTS: Project[] = [
  {
    slug: 'laser-weld-defect-inspection', category: 'Machine Learning', title: 'Laser Weld Defect Inspection',
    description: 'Interpretable machine learning for detecting laser-weld defects from thermal camera images, using physics-motivated features and validation grouped by weld.',
    stack: ['Python', 'Image Analysis', 'scikit-learn', 'SHAP'], image: laser.url,
    alt: 'Six thermal camera frames comparing sound and unsound phases of weld 001-020.',
    caption: 'Thermal-frame comparison from the project repository. Figure: Deep Punj; underlying dataset: Walther et al. (2025), CC BY 4.0, as attributed in the repository.',
    links: { github: 'https://github.com/deeppunj/laser-defect-inspection-ml' },
    sections: [
      { title: 'Problem', paragraphs: ['Can thermal imagery reveal when a laser butt weld becomes unsound—and explain what drove the prediction? The study investigates a discontinuity developing as the metal sheets move apart, connecting scientific imaging with interpretable classification.'] },
      { title: 'Data or modelled system', paragraphs: ['The repository describes 16,362 labelled 32 × 32 long-wave infrared frames at 30 Hz from 97 welds, drawn from 100 recordings at two welding speeds. Frames are labelled Beginning, Sound or Unsound. The model uses thermal-image features, not the inductive probes also recorded in the source dataset.', 'The externally hosted data is attributed to Walther et al. (2025). The repository documents its download rather than bundling the raw dataset.'] },
      { title: 'Implementation', paragraphs: ['Python scripts handle data inspection, feature extraction and Random Forest training with scikit-learn. SHAP provides feature-level explanations. A locally launched Streamlit dashboard displays predictions over time, frames, the first alarm and the first unsound label.'] },
      { title: 'Approach / workflow', paragraphs: ['Extract seven physics-motivated, label-free features from each frame, normalized against the initial 0.5 seconds of its weld. Keep complete welds together during nested cross-validation and select decision thresholds using training welds only.', 'Grouping matters: neighbouring frames from the same weld are correlated. Random frame splits could put almost identical experimental conditions into both training and testing and overstate generalisation.'] },
      { title: 'Evaluation', paragraphs: ['The repository compares the thermal-feature model with a weld-position-only baseline. That baseline reports similarly high discrimination but needs knowledge of the weld position/end; the author explicitly identifies it as a “cheating” baseline, not a deployable predictor.', 'Nested cross-validation measures ROC AUC, balanced accuracy and unsound-class F1 on held-out welds. These are repository-reported evaluations; they have not been independently reproduced for this portfolio.'] },
      { title: 'Results', paragraphs: ['Reported weld-grouped nested cross-validation ROC AUC: 0.974 ± 0.007. This is an area-under-the-curve measure, not 97.4% accuracy.', 'The author also reports balanced accuracy of 0.927 ± 0.012 and unsound-class F1 of 0.900 ± 0.016. SHAP explanations and the local dashboard make individual predictions inspectable; no production deployment is claimed.'] },
      { title: 'Limitations', paragraphs: ['Labels progress from Beginning to Sound to Unsound in 93 of 97 welds. Hot-band position, a leading SHAP feature, may partly reflect temporal drift rather than a defect-specific mechanism. Label timing and errors around the sound/unsound boundary therefore matter.', 'Evaluation covers one dataset and welding setup. Transfer to other materials, speeds or cameras remains untested. The dashboard is a local inspection tool, not a verified hosted service.'] },
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
      { title: 'Results', paragraphs: ['The author reports a modelled best UHNA7 fibre-coupling loss of 0.43 dB at a 250 nm tip. For two such tips, the simulated 1 dB lateral misalignment radius is about 0.7 µm.', 'Illustrative Monte Carlo assembly yield at a 1 dB specification is reported as 96%, 56% and 19% for placement standard deviations of 0.25, 0.5 and 1 µm respectively. These are simulated yields, not measured manufacturing outcomes; no independent reproduction is claimed.'] },
      { title: 'Limitations', paragraphs: ['The scalar model omits full-vector polarisation effects, Fresnel reflections, substrate leakage, taper-transition loss and facet roughness. Predictions near cutoff, especially below a 170 nm tip, are uncertain.', 'The study uses illustrative process assumptions. Fabrication and measurement remain future work; this transparent Python model is not claimed to be equivalent to commercial photonics simulation software.'] },
      { title: 'Repository and reproducibility', paragraphs: ['The MIT-licensed public repository provides the environment, solver and study commands, tests, figures, layout generation and relay exploration. Its documented workflow includes Python 3.10+ and automated checks on Python 3.10 and 3.12.'] },
    ],
  },
  {
    slug: 'healthcare-risk-prioritisation', category: 'Machine Learning', title: 'Healthcare Risk Prioritisation',
    description: 'An end-to-end PostgreSQL and machine-learning workflow for prioritising future kidney-disease diagnoses in synthetic health records.',
    stack: ['PostgreSQL', 'SQL', 'scikit-learn', 'MLflow'], image: healthcare.url,
    alt: 'Study design showing two-year past-only feature windows, one-year outcomes, and earlier training versus later test snapshots.',
    caption: 'Temporal study design from Deep Punj / patient-finding-synthea. Records and evaluation are synthetic; not clinical validation.',
    links: { github: 'https://github.com/deeppunj/patient-finding-synthea' },
    sections: [
      { title: 'Problem', paragraphs: ['When review capacity is limited, can historical records help prioritise patients who later receive a first chronic kidney disease diagnosis? This is a synthetic-data ranking study, not a diagnostic system.'] },
      { title: 'Data or modelled system', paragraphs: ['Synthea-generated health records are loaded into PostgreSQL. SQL constructs annual snapshots for adults without prior CKD who visited in the preceding two years.', 'Each snapshot uses only the preceding two years for features; the outcome is a first CKD diagnosis in the following 12 months. No real patient records are used.'] },
      { title: 'Implementation', paragraphs: ['SQL builds cohorts and features; Python and scikit-learn fit logistic regression and gradient boosting; MLflow records experiments. A local Streamlit dashboard communicates ranking performance and review-capacity trade-offs.'] },
      { title: 'Approach / workflow', paragraphs: ['Construct snapshots from 2019–2025. Restrict predictors to information available before each snapshot, train on 2019–2023, and test on 2024–2025. The repository includes a no-leakage test.', 'Compare a transparent linear baseline with gradient boosting, then evaluate how many future cases fall within a feasible top-ranked review fraction.'] },
      { title: 'Evaluation', paragraphs: ['Rare outcomes make accuracy misleading. The author evaluates precision–recall AUC, ROC AUC and case capture at fixed review capacity. The reported test data contains 13,769 snapshots and only 75 future diagnoses.', 'Reported PR-AUC is 0.030 for logistic regression and 0.028 for gradient boosting, against a 0.005 random baseline. These are author-reported synthetic test results, not independently reproduced findings.'] },
      { title: 'Results', paragraphs: ['On synthetic test data, the reported top 10% of ranked patients captures 37 of 75 future cases. Precision remains approximately 3%, so most prioritised records do not become positive cases.', 'This illustrates a review-capacity versus case-capture trade-off. It does not establish clinical benefit, diagnose disease or provide calibrated clinical probabilities.'] },
      { title: 'Limitations', paragraphs: ['Synthetic records are cleaner and rule-generated; real-world transfer is unverified. Few positive test outcomes make estimates uncertain. No real-patient or clinical validation is claimed.', 'Rankings should not be interpreted as individual clinical risk probabilities. Validation on real records and careful clinical assessment are future work, not implemented results.'] },
      { title: 'Repository and reproducibility', paragraphs: ['The public repository documents Synthea generation settings and seeds, PostgreSQL setup, a one-command pipeline, model tracking, dashboard launch and tests. Reproduction requires generated input data and the documented environment.'] },
    ],
  },
  {
    slug: 'fda-drug-shortages-analytics', category: 'Analytics', title: 'FDA Drug Shortages Analytics',
    description: 'A Power BI dashboard exploring US drug-shortage listings by therapeutic category, manufacturer and duration.',
    stack: ['Power BI', 'Power Query', 'DAX', 'Data Visualisation'], image: fda.url,
    alt: 'Repository Power BI dashboard showing shortage listings by category, manufacturer, availability and posting year.',
    caption: 'Repository dashboard, October 2026 snapshot as reported by the author. Figure: Deep Punj; data: FDA/openFDA (public domain). Listings, distinct drugs and category-expanded rows are different counts. Days open depends on report refresh date.',
    links: { github: 'https://github.com/deeppunj/powerbi_fda_drug_shortages' },
    sections: [
      { title: 'Problem', paragraphs: ['Which therapeutic categories and manufacturers have the most FDA-listed US drug shortages, and how long have current listings been open? This descriptive dashboard organises a public snapshot into a readable analytical view.'] },
      { title: 'Data or modelled system', paragraphs: ['The repository describes an October 2026 openFDA Drug Shortages snapshot: 1,582 source records flattened into 2,386 rows, one per therapeutic category. The underlying FDA/openFDA data is public domain.', 'Category expansion means row totals are not distinct shortage listings. A listing is also not the same thing as a distinct drug.'] },
      { title: 'Implementation', paragraphs: ['Power Query handles loading and types. Preparation converts dates to ISO format, corrects availability typos and labels missing values as “Not reported”. The Power BI Project format keeps the report and semantic model in versionable text files.'] },
      { title: 'Approach / workflow', paragraphs: ['Use separate DAX measures: distinct shortage_id values filtered to Current for active listings; distinct generic_name values for affected drugs; and an average of days since initial posting across current shortage IDs.', 'Top N views compare categories and manufacturers, while availability and posting-year views provide context. A portable data-folder parameter points the report to its included CSV.'] },
      { title: 'Evaluation', paragraphs: ['This is descriptive analytics, not predictive modelling. Interpretation depends on correct counting definitions, filtering and snapshot context; no independently reproduced audit or forecast performance is claimed.', 'The days-open measure uses DATEDIFF with TODAY(), so it changes with report refresh date even when the CSV snapshot is unchanged. It measures the age of currently listed shortages, not their final resolved duration.'] },
      { title: 'Results', paragraphs: ['The implemented dashboard provides category, manufacturer, availability and posting-year comparisons, alongside distinct listing and drug counts. The genuine repository screenshot is retained with its October 2026 snapshot context.', 'Numerical screenshot values are author-reported snapshot outputs, not live totals. No numerical finding is presented here as a current real-time statistic.'] },
      { title: 'Limitations', paragraphs: ['The repository notes that resolved shortages are removed by FDA after approximately six months, preventing reliable measurement of complete resolution times from this snapshot.', 'A drug may appear in multiple categories, and multiple listings may relate to the same generic drug. Category totals must not be summed as distinct drugs or listings. The report is not a real-time shortage monitor.'] },
      { title: 'Repository and reproducibility', paragraphs: ['The public repository includes a CSV snapshot, Power BI report and model definitions, DAX measures and setup instructions. Open the PBIP in Power BI Desktop on Windows and set the data-folder parameter.', 'A date table, star-schema model and drill-through detail page are documented next steps, not completed features. Source: open.fda.gov/apis/drug/drugshortages/.'] },
    ],
  },
];
export const getProject = (slug: string) => PROJECTS.find(p => p.slug === slug);
export const filterProjects = (category: Category) => category === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === category);

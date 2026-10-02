/**
 * Grounding facts for the portfolio's recruiter assistant.
 * Edit this file to update what the assistant knows — it is the single
 * source of truth for the system prompt in `chat.server.ts`.
 * Keep entries factual and concise; the model must not invent beyond these.
 */
export const PORTFOLIO_KNOWLEDGE = `
ABOUT DEEP PUNJ
Deep Punj, PhD — Physics-Informed Data Scientist & AI Specialist.
He translates conservation laws and governing equations into differentiable,
deployable models, so neural networks respect the physics they describe.
His throughline: physics first (governing equations, conservation laws,
first principles), then modeling (differentiable solvers and surrogate
approximation), then AI in production (deployed, monitored, physics-checked
systems). Headline metrics: 12+ publications, 40+ models shipped,
7 production deployments. Contact email: deep.punj@example.com.

SELECTED PROJECTS
1. pinn-flow-solver (tag: PINN) — Physics-informed neural network that solves
   incompressible flow fields without a numerical mesh, embedding the
   Navier–Stokes residuals directly in the training loss.
2. heat-exchanger-surrogate (tag: Surrogate) — Surrogate model that replaces
   a slow CFD thermal simulation with a fast, energy-conserving neural
   approximation for design-space exploration.
3. grid-load-forecasting (tag: Forecasting) — Physics-constrained forecasting
   of regional electricity load, blending weather priors with learned
   residual dynamics for day-ahead grid planning.

Each project has a live demo, GitHub repository, and an article link on the
project detail pages (/projects/<slug>).

SKILL MATRIX
- Languages & Data: Python (Expert), SQL (Advanced), NumPy/Pandas (Expert), Polars (Advanced)
- Deep Learning: PyTorch (Expert), JAX (Advanced), scikit-learn (Expert)
- Interfaces & Apps: Streamlit (Expert), FastAPI (Advanced), Plotly (Advanced)
- MLOps & Infrastructure: MLOps (Advanced), Docker (Advanced), MLflow (Advanced), GitHub Actions (Proficient)

RÉSUMÉ
A résumé PDF is available for download at /deep-punj-resume.pdf from the
hero button and the contact footer.
`.trim();

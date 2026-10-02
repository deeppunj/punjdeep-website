export type Project = {
  slug: string;
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: string[];
  year: string;
  role: string;
  stack: string[];
  problem: string;
  approach: string[];
  results: string[];
  links: { demo: string; github: string; article: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "pinn-flow-solver",
    id: "01",
    tag: "Neural PDEs",
    title: "PINN Flow Solver",
    description:
      "Physics-informed neural network that embeds the Navier–Stokes residual directly in the loss, cutting mesh dependence on turbulent boundary layers.",
    metrics: ["residual 0.002", "200× CFD speedup"],
    year: "2025",
    role: "Lead researcher",
    stack: ["PyTorch", "JAX", "Streamlit", "Docker"],
    problem:
      "Conventional CFD on turbulent boundary layers needs fine meshes and hours of compute per configuration, which blocks fast design iteration.",
    approach: [
      "Encoded the incompressible Navier–Stokes residual as a soft constraint in the training loss.",
      "Used adaptive collocation sampling concentrated near walls and separation zones.",
      "Validated against high-fidelity DNS data across a sweep of Reynolds numbers.",
    ],
    results: [
      "Mean PDE residual of 0.002 on held-out geometries.",
      "Roughly 200× faster inference than the reference CFD solver.",
      "Interactive Streamlit demo for engineers to explore flow fields.",
    ],
    links: { demo: "#", github: "#", article: "#" },
  },
  {
    slug: "heat-exchanger-surrogate",
    id: "02",
    tag: "Surrogate Modeling",
    title: "Heat Exchanger Surrogate",
    description:
      "Graph neural surrogate reproducing conjugate heat transfer in milliseconds — replacing hours-long CFD sweeps in design loops.",
    metrics: ["41× faster", "±1.2% error"],
    year: "2024",
    role: "Data scientist",
    stack: ["PyTorch Geometric", "MLflow", "FastAPI"],
    problem:
      "Design optimisation of heat exchangers required thousands of conjugate heat transfer simulations, each taking hours.",
    approach: [
      "Represented the mesh as a graph and trained a message-passing surrogate.",
      "Added an energy-conservation penalty so heat flux balances across interfaces.",
      "Tracked experiments and model versions with MLflow.",
    ],
    results: [
      "41× faster design loop end to end.",
      "Temperature predictions within ±1.2% of CFD.",
      "Served as a FastAPI endpoint used by the design team.",
    ],
    links: { demo: "#", github: "#", article: "#" },
  },
  {
    slug: "grid-load-forecasting",
    id: "03",
    tag: "Time-Series",
    title: "Grid Load Forecasting",
    description:
      "Transformer with conservation-aware positional encoding that forecasts electrical load while enforcing energy-balance constraints.",
    metrics: ["+72h horizon", "energy-balanced"],
    year: "2024",
    role: "ML engineer",
    stack: ["PyTorch", "SQL", "Docker", "GitHub Actions"],
    problem:
      "Grid operators needed multi-day load forecasts that never violate supply–demand balance, which purely statistical models often did.",
    approach: [
      "Built a transformer forecaster with conservation-aware positional encoding.",
      "Projected outputs onto the energy-balance constraint set at inference.",
      "Automated retraining and deployment with CI pipelines.",
    ],
    results: [
      "Reliable forecasts out to a 72-hour horizon.",
      "Zero energy-balance violations in production.",
      "Nightly retraining fully automated.",
    ],
    links: { demo: "#", github: "#", article: "#" },
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

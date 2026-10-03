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

const placeholderProject = (id: string, slug: string): Project => ({
  slug,
  id,
  tag: "Placeholder",
  title: "Project " + id,
  description:
    "Placeholder — a short one-line summary of this project will go here.",
  metrics: ["Metric 01", "Metric 02"],
  year: "Year",
  role: "Role",
  stack: ["Tool 1", "Tool 2", "Tool 3"],
  problem: "Placeholder — the problem this project solves will go here.",
  approach: ["Placeholder — approach step goes here."],
  results: ["Placeholder — key result goes here."],
  links: { demo: "#", github: "#", article: "#" },
});

export const PROJECTS: Project[] = [
  placeholderProject("01", "project-one"),
  placeholderProject("02", "project-two"),
  placeholderProject("03", "project-three"),
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

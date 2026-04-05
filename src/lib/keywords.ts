export type JobRole = "software_engineer" | "data_scientist" | "web_developer" | "devops_engineer" | "product_manager";

export const JOB_ROLES: { value: JobRole; label: string }[] = [
  { value: "software_engineer", label: "Software Engineer" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "web_developer", label: "Web Developer" },
  { value: "devops_engineer", label: "DevOps Engineer" },
  { value: "product_manager", label: "Product Manager" },
];

export const KEYWORDS: Record<JobRole, string[]> = {
  software_engineer: [
    "python", "java", "c++", "data structures", "algorithms", "oop",
    "git", "unit testing", "agile", "rest api", "sql", "linux",
    "docker", "ci/cd", "debugging", "system design", "multithreading",
    "design patterns", "cloud", "microservices", "software development",
    "code review", "testing", "version control", "problem solving"
  ],
  data_scientist: [
    "python", "machine learning", "deep learning", "pandas", "numpy",
    "scikit-learn", "tensorflow", "pytorch", "sql", "statistics",
    "data visualization", "regression", "classification", "clustering",
    "feature engineering", "natural language processing", "nlp",
    "data analysis", "big data", "spark", "hadoop", "r",
    "data mining", "neural network", "random forest", "xgboost",
    "data cleaning", "hypothesis testing", "a/b testing", "tableau"
  ],
  web_developer: [
    "html", "css", "javascript", "react", "angular", "vue",
    "node.js", "typescript", "responsive design", "rest api",
    "git", "webpack", "sass", "bootstrap", "tailwind",
    "mongodb", "sql", "graphql", "next.js", "express",
    "frontend", "backend", "full stack", "ui/ux", "accessibility"
  ],
  devops_engineer: [
    "docker", "kubernetes", "ci/cd", "jenkins", "aws", "azure",
    "gcp", "terraform", "ansible", "linux", "bash", "git",
    "monitoring", "prometheus", "grafana", "nginx", "load balancing",
    "microservices", "infrastructure as code", "cloud", "devops",
    "automation", "deployment", "security", "networking"
  ],
  product_manager: [
    "product strategy", "roadmap", "agile", "scrum", "user research",
    "analytics", "stakeholder management", "prioritization", "mvp",
    "a/b testing", "user stories", "kpi", "market research",
    "competitive analysis", "wireframe", "prototyping", "jira",
    "data driven", "customer feedback", "go to market",
    "product lifecycle", "requirements", "backlog", "sprint", "okr"
  ],
};

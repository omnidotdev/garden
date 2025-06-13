import type { GardenTypes } from "generated/garden.types";

const omniEcosystemGarden: GardenTypes = {
  name: "Omni Ecosystem",
  description: "Complete Omni product and tooling ecosystem",
  icon: "🌱",
  version: "2.0.0",
  created_at: "2022-01-15T00:00:00Z",
  updated_at: "2023-06-10T00:00:00Z",
  theme: {
    primary_color: "#6366f1",
    secondary_color: "#a5b4fc",
    background_color: "#f9fafb",
    text_color: "#111827",
  },
  maintainers: [
    {
      name: "Omni Core Team",
      email: "core@omni.example",
      url: "https://core.omni.example",
    },
  ],
  items: [
    {
      name: "Omni Auth",
      homepage_url: "https://auth.omni.example",
      description: "Authentication and authorization service",
      logo: "https://placehold.co/150?text=Auth",
    },
    {
      name: "Omni Data",
      homepage_url: "https://data.omni.example",
      description: "Data management platform",
      logo: "https://placehold.co/150?text=Data",
    },
    {
      name: "Omni Docs",
      homepage_url: "https://docs.omni.dev/",
      description: "Documentation portal",
      logo: "https://placehold.co/150?text=Docs",
    },
  ],
  subgardens: [
    {
      name: "Omni Products",
      url: "https://products.omni.example",
      description: "Core products in the Omni ecosystem",
      logo: "https://placehold.co/150?text=Products",
      version: "1.8.0",
    },
    {
      name: "Omni Dev Tools",
      url: "https://devtools.omni.example",
      description: "Development tools and utilities for Omni ecosystem",
      logo: "https://placehold.co/150?text=DevTools",
      version: "1.5.2",
    },
    {
      name: "Omni Specifications",
      url: "https://specs.omni.example",
      description: "Specifications and standards for Omni ecosystem",
      logo: "https://placehold.co/150?text=Specs",
      version: "1.3.1",
    },
  ],
};

const productsGarden: GardenTypes = {
  name: "Omni Products",
  description: "Core products in the Omni ecosystem",
  icon: "📦",
  version: "1.8.0",
  created_at: "2022-03-20T00:00:00Z",
  updated_at: "2023-05-15T00:00:00Z",
  theme: {
    primary_color: "#2563EB",
    secondary_color: "#93C5FD",
    background_color: "#F8FAFC",
    text_color: "#1E293B",
  },
  maintainers: [
    {
      name: "Omni Product Team",
      email: "products@omni.example",
      url: "https://products.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Ecosystem",
      url: "https://ecosystem.omni.example",
      description: "Complete Omni product and tooling ecosystem",
      logo: "https://placehold.co/150?text=Ecosystem",
      version: "2.0.0",
    },
  ],
  items: [
    {
      name: "Omni Feedback",
      homepage_url: "https://feedback.omni.example",
      description: "User feedback collection and management",
      logo: "https://placehold.co/150?text=Feedback",
    },
    {
      name: "Omni Portal",
      homepage_url: "https://portal.omni.example",
      description: "Customer portal and dashboard",
      logo: "https://placehold.co/150?text=Portal",
    },
    {
      name: "Omni Insights",
      homepage_url: "https://insights.omni.example",
      description: "Business intelligence and analytics",
      logo: "https://placehold.co/150?text=Insights",
    },
    {
      name: "Omni Metrics",
      homepage_url: "https://metrics.omni.example",
      description: "Performance metrics and monitoring",
      logo: "https://placehold.co/150?text=Metrics",
    },
    {
      name: "Omni CMS",
      homepage_url: "https://cms.omni.example",
      description: "Content management system",
      logo: "https://placehold.co/150?text=CMS",
    },
  ],
  subgardens: [
    {
      name: "Customer Engagement",
      url: "https://engagement.omni.example",
      description: "Tools for engaging with customers",
      logo: "https://placehold.co/150?text=Engagement",
    },
    {
      name: "Analytics",
      url: "https://analytics.omni.example",
      description: "Analytics and reporting tools",
      logo: "https://placehold.co/150?text=Analytics",
    },
    {
      name: "Content Management",
      url: "https://content.omni.example",
      description: "Content authoring and distribution",
      logo: "https://placehold.co/150?text=Content",
    },
  ],
};

const devToolsGarden: GardenTypes = {
  name: "Omni Dev Tools",
  description: "Development tools and utilities for Omni ecosystem",
  icon: "🛠️",
  version: "1.5.2",
  created_at: "2022-04-12T00:00:00Z",
  updated_at: "2023-04-30T00:00:00Z",
  theme: {
    primary_color: "#0891B2",
    secondary_color: "#67E8F9",
    background_color: "#ECFEFF",
    text_color: "#164E63",
  },
  maintainers: [
    {
      name: "Omni DevEx Team",
      email: "devex@omni.example",
      url: "https://devtools.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Ecosystem",
      url: "https://ecosystem.omni.example",
      description: "Complete Omni product and tooling ecosystem",
      logo: "https://placehold.co/150?text=Ecosystem",
      version: "2.0.0",
    },
  ],
  items: [
    {
      name: "Omni Lint",
      homepage_url: "https://lint.omni.example",
      description: "Code linting and formatting tools",
      logo: "https://placehold.co/150?text=Lint",
    },
    {
      name: "Omni Test",
      homepage_url: "https://test.omni.example",
      description: "Testing frameworks and tools",
      logo: "https://placehold.co/150?text=Test",
    },
    {
      name: "Omni IDE",
      homepage_url: "https://ide.omni.example",
      description: "Integrated development environment",
      logo: "https://placehold.co/150?text=IDE",
    },
    {
      name: "Omni CLI",
      homepage_url: "https://cli.omni.example",
      description: "Command line interface tools",
      logo: "https://placehold.co/150?text=CLI",
    },
    {
      name: "Omni CI/CD",
      homepage_url: "https://cicd.omni.example",
      description: "Continuous integration and deployment",
      logo: "https://placehold.co/150?text=CICD",
    },
    {
      name: "Omni Monitor",
      homepage_url: "https://monitor.omni.example",
      description: "System monitoring and alerts",
      logo: "https://placehold.co/150?text=Monitor",
    },
  ],
  subgardens: [
    {
      name: "Code Quality",
      url: "https://quality.omni.example",
      description: "Tools for maintaining code quality",
      logo: "https://placehold.co/150?text=Quality",
    },
    {
      name: "Development",
      url: "https://development.omni.example",
      description: "Development environments and tools",
      logo: "https://placehold.co/150?text=Dev",
    },
    {
      name: "DevOps",
      url: "https://devops.omni.example",
      description: "Deployment and operations tools",
      logo: "https://placehold.co/150?text=DevOps",
    },
  ],
};

const specificationsGarden: GardenTypes = {
  name: "Omni Specifications",
  description: "Specifications and standards for Omni ecosystem",
  icon: "📋",
  version: "1.3.1",
  created_at: "2022-02-28T00:00:00Z",
  updated_at: "2023-03-15T00:00:00Z",
  theme: {
    primary_color: "#A855F7",
    secondary_color: "#D8B4FE",
    background_color: "#FAF5FF",
    text_color: "#581C87",
  },
  maintainers: [
    {
      name: "Omni Standards Team",
      email: "standards@omni.example",
      url: "https://specs.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Ecosystem",
      url: "https://ecosystem.omni.example",
      description: "Complete Omni product and tooling ecosystem",
      logo: "https://placehold.co/150?text=Ecosystem",
      version: "2.0.0",
    },
  ],
  items: [
    {
      name: "Omni REST",
      homepage_url: "https://rest.omni.example",
      description: "REST API design guidelines",
      logo: "https://placehold.co/150?text=REST",
    },
    {
      name: "Omni GraphQL",
      homepage_url: "https://graphql.omni.example",
      description: "GraphQL schema design standards",
      logo: "https://placehold.co/150?text=GraphQL",
    },
    {
      name: "Omni Schema",
      homepage_url: "https://schema.omni.example",
      description: "Data schema definitions and standards",
      logo: "https://placehold.co/150?text=Schema",
    },
    {
      name: "Omni Taxonomy",
      homepage_url: "https://taxonomy.omni.example",
      description: "Taxonomy and classification standards",
      logo: "https://placehold.co/150?text=Taxonomy",
    },
    {
      name: "Omni Design System",
      homepage_url: "https://design.omni.example",
      description: "Design system guidelines",
      logo: "https://placehold.co/150?text=Design",
    },
    {
      name: "Omni Accessibility",
      homepage_url: "https://a11y.omni.example",
      description: "Accessibility standards and guidelines",
      logo: "https://placehold.co/150?text=A11Y",
    },
  ],
  subgardens: [
    {
      name: "API Standards",
      url: "https://api-standards.omni.example",
      description: "API design and implementation standards",
      logo: "https://placehold.co/150?text=API",
    },
    {
      name: "Data Models",
      url: "https://data-models.omni.example",
      description: "Data modeling and schema standards",
      logo: "https://placehold.co/150?text=DataModels",
    },
    {
      name: "UX Standards",
      url: "https://ux-standards.omni.example",
      description: "User experience design standards",
      logo: "https://placehold.co/150?text=UX",
    },
  ],
};

// Customer Engagement Garden
const customerEngagementGarden: GardenTypes = {
  name: "Customer Engagement",
  description: "Tools for engaging with customers",
  icon: "👥",
  version: "1.0.0",
  created_at: "2022-05-15T00:00:00Z",
  updated_at: "2023-05-20T00:00:00Z",
  theme: {
    primary_color: "#F59E0B",
    secondary_color: "#FCD34D",
    background_color: "#FFFBEB",
    text_color: "#78350F",
  },
  maintainers: [
    {
      name: "Omni CX Team",
      email: "cx@omni.example",
      url: "https://engagement.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Products",
      url: "https://products.omni.example",
      description: "Core products in the Omni ecosystem",
      logo: "https://placehold.co/150?text=Products",
      version: "1.8.0",
    },
  ],
  items: [
    {
      name: "Omni Chat",
      homepage_url: "https://chat.omni.example",
      description: "Customer chat and messaging platform",
      logo: "https://placehold.co/150?text=Chat",
    },
    {
      name: "Omni Survey",
      homepage_url: "https://survey.omni.example",
      description: "Customer feedback and survey tool",
      logo: "https://placehold.co/150?text=Survey",
    },
    {
      name: "Omni Support",
      homepage_url: "https://support.omni.example",
      description: "Customer support ticketing system",
      logo: "https://placehold.co/150?text=Support",
    },
  ],
};

// Analytics Garden
const analyticsGarden: GardenTypes = {
  name: "Analytics",
  description: "Analytics and reporting tools",
  icon: "📊",
  version: "1.0.0",
  created_at: "2022-06-10T00:00:00Z",
  updated_at: "2023-05-25T00:00:00Z",
  theme: {
    primary_color: "#10B981",
    secondary_color: "#6EE7B7",
    background_color: "#ECFDF5",
    text_color: "#064E3B",
  },
  maintainers: [
    {
      name: "Omni Analytics Team",
      email: "analytics@omni.example",
      url: "https://analytics.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Products",
      url: "https://products.omni.example",
      description: "Core products in the Omni ecosystem",
      logo: "https://placehold.co/150?text=Products",
      version: "1.8.0",
    },
  ],
  items: [
    {
      name: "Omni Dashboard",
      homepage_url: "https://dashboard.omni.example",
      description: "Interactive data dashboards",
      logo: "https://placehold.co/150?text=Dashboard",
    },
    {
      name: "Omni Reports",
      homepage_url: "https://reports.omni.example",
      description: "Custom report generation",
      logo: "https://placehold.co/150?text=Reports",
    },
    {
      name: "Omni Predict",
      homepage_url: "https://predict.omni.example",
      description: "Predictive analytics platform",
      logo: "https://placehold.co/150?text=Predict",
    },
  ],
};

// Content Management Garden
const contentManagementGarden: GardenTypes = {
  name: "Content Management",
  description: "Content authoring and distribution",
  icon: "📝",
  version: "1.0.0",
  created_at: "2022-07-05T00:00:00Z",
  updated_at: "2023-06-02T00:00:00Z",
  theme: {
    primary_color: "#EC4899",
    secondary_color: "#F9A8D4",
    background_color: "#FDF2F8",
    text_color: "#831843",
  },
  maintainers: [
    {
      name: "Omni Content Team",
      email: "content@omni.example",
      url: "https://content.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Products",
      url: "https://products.omni.example",
      description: "Core products in the Omni ecosystem",
      logo: "https://placehold.co/150?text=Products",
      version: "1.8.0",
    },
  ],
  items: [
    {
      name: "Omni Editor",
      homepage_url: "https://editor.omni.example",
      description: "Rich text editor for content creation",
      logo: "https://placehold.co/150?text=Editor",
    },
    {
      name: "Omni Media",
      homepage_url: "https://media.omni.example",
      description: "Media asset management",
      logo: "https://placehold.co/150?text=Media",
    },
    {
      name: "Omni Publish",
      homepage_url: "https://publish.omni.example",
      description: "Content publishing and distribution",
      logo: "https://placehold.co/150?text=Publish",
    },
  ],
};

// Code Quality Garden
const codeQualityGarden: GardenTypes = {
  name: "Code Quality",
  description: "Tools for maintaining code quality",
  icon: "🧹",
  version: "1.0.0",
  created_at: "2022-08-15T00:00:00Z",
  updated_at: "2023-04-10T00:00:00Z",
  theme: {
    primary_color: "#0EA5E9",
    secondary_color: "#7DD3FC",
    background_color: "#F0F9FF",
    text_color: "#0C4A6E",
  },
  maintainers: [
    {
      name: "Omni Quality Team",
      email: "quality@omni.example",
      url: "https://quality.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Dev Tools",
      url: "https://devtools.omni.example",
      description: "Development tools and utilities for Omni ecosystem",
      logo: "https://placehold.co/150?text=DevTools",
      version: "1.5.2",
    },
  ],
  items: [
    {
      name: "Omni Formatter",
      homepage_url: "https://formatter.omni.example",
      description: "Code formatting tool",
      logo: "https://placehold.co/150?text=Formatter",
    },
    {
      name: "Omni Linter",
      homepage_url: "https://linter.omni.example",
      description: "Static code analysis tool",
      logo: "https://placehold.co/150?text=Linter",
    },
    {
      name: "Omni Review",
      homepage_url: "https://review.omni.example",
      description: "Code review tool with AI assistance",
      logo: "https://placehold.co/150?text=Review",
    },
  ],
};

// Development Garden
const developmentGarden: GardenTypes = {
  name: "Development",
  description: "Development environments and tools",
  icon: "💻",
  version: "1.0.0",
  created_at: "2022-09-20T00:00:00Z",
  updated_at: "2023-04-15T00:00:00Z",
  theme: {
    primary_color: "#14B8A6",
    secondary_color: "#5EEAD4",
    background_color: "#F0FDFA",
    text_color: "#134E4A",
  },
  maintainers: [
    {
      name: "Omni Development Team",
      email: "dev@omni.example",
      url: "https://development.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Dev Tools",
      url: "https://devtools.omni.example",
      description: "Development tools and utilities for Omni ecosystem",
      logo: "https://placehold.co/150?text=DevTools",
      version: "1.5.2",
    },
  ],
  items: [
    {
      name: "Omni Sandbox",
      homepage_url: "https://sandbox.omni.example",
      description: "Isolated development environment",
      logo: "https://placehold.co/150?text=Sandbox",
    },
    {
      name: "Omni Code Editor",
      homepage_url: "https://codeeditor.omni.example",
      description: "Web-based code editor",
      logo: "https://placehold.co/150?text=CodeEditor",
    },
    {
      name: "Omni Snippets",
      homepage_url: "https://snippets.omni.example",
      description: "Code snippet library and manager",
      logo: "https://placehold.co/150?text=Snippets",
    },
  ],
};

// DevOps Garden
const devOpsGarden: GardenTypes = {
  name: "DevOps",
  description: "Deployment and operations tools",
  icon: "🚀",
  version: "1.0.0",
  created_at: "2022-10-10T00:00:00Z",
  updated_at: "2023-04-20T00:00:00Z",
  theme: {
    primary_color: "#DC2626",
    secondary_color: "#FCA5A5",
    background_color: "#FEF2F2",
    text_color: "#7F1D1D",
  },
  maintainers: [
    {
      name: "Omni DevOps Team",
      email: "devops@omni.example",
      url: "https://devops.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Dev Tools",
      url: "https://devtools.omni.example",
      description: "Development tools and utilities for Omni ecosystem",
      logo: "https://placehold.co/150?text=DevTools",
      version: "1.5.2",
    },
  ],
  items: [
    {
      name: "Omni Deploy",
      homepage_url: "https://deploy.omni.example",
      description: "Automated deployment platform",
      logo: "https://placehold.co/150?text=Deploy",
    },
    {
      name: "Omni Kubernetes",
      homepage_url: "https://k8s.omni.example",
      description: "Kubernetes management tools",
      logo: "https://placehold.co/150?text=K8s",
    },
    {
      name: "Omni Alerts",
      homepage_url: "https://alerts.omni.example",
      description: "System monitoring and alerting",
      logo: "https://placehold.co/150?text=Alerts",
    },
  ],
};

// API Standards Garden
const apiStandardsGarden: GardenTypes = {
  name: "API Standards",
  description: "API design and implementation standards",
  icon: "🔌",
  version: "1.0.0",
  created_at: "2022-11-05T00:00:00Z",
  updated_at: "2023-03-10T00:00:00Z",
  theme: {
    primary_color: "#8B5CF6",
    secondary_color: "#C4B5FD",
    background_color: "#F5F3FF",
    text_color: "#4C1D95",
  },
  maintainers: [
    {
      name: "Omni API Team",
      email: "api@omni.example",
      url: "https://api-standards.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Specifications",
      url: "https://specs.omni.example",
      description: "Specifications and standards for Omni ecosystem",
      logo: "https://placehold.co/150?text=Specs",
      version: "1.3.1",
    },
  ],
  items: [
    {
      name: "Omni REST Guidelines",
      homepage_url: "https://rest-guide.omni.example",
      description: "REST API design guidelines",
      logo: "https://placehold.co/150?text=RESTGuide",
    },
    {
      name: "Omni API Security",
      homepage_url: "https://api-security.omni.example",
      description: "API security best practices",
      logo: "https://placehold.co/150?text=APISecurity",
    },
    {
      name: "Omni GraphQL Schema",
      homepage_url: "https://graphql-schema.omni.example",
      description: "GraphQL schema design patterns",
      logo: "https://placehold.co/150?text=GraphQLSchema",
    },
  ],
};

// Data Models Garden
const dataModelsGarden: GardenTypes = {
  name: "Data Models",
  description: "Data modeling and schema standards",
  icon: "🗃️",
  version: "1.0.0",
  created_at: "2022-12-01T00:00:00Z",
  updated_at: "2023-03-15T00:00:00Z",
  theme: {
    primary_color: "#0D9488",
    secondary_color: "#5EEAD4",
    background_color: "#F0FDFA",
    text_color: "#134E4A",
  },
  maintainers: [
    {
      name: "Omni Data Team",
      email: "data@omni.example",
      url: "https://data-models.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Specifications",
      url: "https://specs.omni.example",
      description: "Specifications and standards for Omni ecosystem",
      logo: "https://placehold.co/150?text=Specs",
      version: "1.3.1",
    },
  ],
  items: [
    {
      name: "Omni Entity Framework",
      homepage_url: "https://entity.omni.example",
      description: "Core entity definitions and relationships",
      logo: "https://placehold.co/150?text=Entity",
    },
    {
      name: "Omni Schema Registry",
      homepage_url: "https://schema-registry.omni.example",
      description: "Central schema registry and validator",
      logo: "https://placehold.co/150?text=SchemaRegistry",
    },
    {
      name: "Omni Data Dictionary",
      homepage_url: "https://data-dictionary.omni.example",
      description: "Comprehensive data dictionary",
      logo: "https://placehold.co/150?text=DataDict",
    },
  ],
};

// UX Standards Garden
const uxStandardsGarden: GardenTypes = {
  name: "UX Standards",
  description: "User experience design standards",
  icon: "🎨",
  version: "1.0.0",
  created_at: "2023-01-10T00:00:00Z",
  updated_at: "2023-03-20T00:00:00Z",
  theme: {
    primary_color: "#F97316",
    secondary_color: "#FDBA74",
    background_color: "#FFF7ED",
    text_color: "#7C2D12",
  },
  maintainers: [
    {
      name: "Omni UX Team",
      email: "ux@omni.example",
      url: "https://ux-standards.omni.example/team",
    },
  ],
  supergardens: [
    {
      name: "Omni Specifications",
      url: "https://specs.omni.example",
      description: "Specifications and standards for Omni ecosystem",
      logo: "https://placehold.co/150?text=Specs",
      version: "1.3.1",
    },
  ],
  items: [
    {
      name: "Omni Component Library",
      homepage_url: "https://components.omni.example",
      description: "Reusable UI component library",
      logo: "https://placehold.co/150?text=Components",
    },
    {
      name: "Omni Design Tokens",
      homepage_url: "https://tokens.omni.example",
      description: "Design token system",
      logo: "https://placehold.co/150?text=Tokens",
    },
    {
      name: "Omni Pattern Library",
      homepage_url: "https://patterns.omni.example",
      description: "UX pattern library and guidelines",
      logo: "https://placehold.co/150?text=Patterns",
    },
  ],
};

export const gardens = {
  "Omni Ecosystem": omniEcosystemGarden,
  "Omni Products": productsGarden,
  "Omni Dev Tools": devToolsGarden,
  "Omni Specifications": specificationsGarden,
  "Customer Engagement": customerEngagementGarden,
  Analytics: analyticsGarden,
  "Content Management": contentManagementGarden,
  "Code Quality": codeQualityGarden,
  Development: developmentGarden,
  DevOps: devOpsGarden,
  "API Standards": apiStandardsGarden,
  "Data Models": dataModelsGarden,
  "UX Standards": uxStandardsGarden,
};

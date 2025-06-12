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

export const gardens = {
  "Omni Ecosystem": omniEcosystemGarden,
  "Omni Products": productsGarden,
  "Omni Dev Tools": devToolsGarden,
  "Omni Specifications": specificationsGarden,
};

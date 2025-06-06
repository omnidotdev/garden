import type { GardenTypes } from "generated/garden.types";

// Omni Ecosystem - Root garden
export const omniEcosystem: GardenTypes = {
  name: "Omni Ecosystem",
  description: "Complete Omni product and tooling ecosystem",
  icon: "🌱",
  version: "2.0.0",
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
  categories: [
    {
      name: "Core Services",
      description: "Core infrastructure services",
      icon_color: "hsl(var(--chart-1))",
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
      ],
    },
    {
      name: "Documentation",
      description: "Product documentation and guides",
      icon_color: "hsl(var(--chart-3))",
      items: [
        {
          name: "Omni Docs",
          homepage_url: "https://docs.omni.dev/",
          description: "Documentation portal",
          logo: "https://placehold.co/150?text=Docs",
        },
      ],
    },
  ],
  maintainers: [
    {
      name: "Omni Core Team",
      email: "core@omni.example",
      url: "https://core.omni.example",
    },
  ],
  created_at: "2022-01-15T00:00:00Z",
  updated_at: "2023-06-10T00:00:00Z",
  theme: {
    primary_color: "#6366F1",
    secondary_color: "#A5B4FC",
    background_color: "#F9FAFB",
    text_color: "#111827",
  },
};

// Omni Products Garden
export const productsGarden: GardenTypes = {
  name: "Omni Products",
  description: "Core products in the Omni ecosystem",
  icon: "📦",
  version: "1.8.0",
  supergardens: [
    {
      name: "Omni Ecosystem",
      url: "https://ecosystem.omni.example",
      description: "Complete Omni product and tooling ecosystem",
      logo: "https://placehold.co/150?text=Ecosystem",
      version: "2.0.0",
    },
  ],
  categories: [
    {
      name: "Customer Engagement",
      description: "Tools for engaging with customers",
      icon_color: "hsl(var(--chart-2))",
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
      ],
    },
    {
      name: "Analytics",
      description: "Analytics and reporting tools",
      icon_color: "hsl(var(--chart-4))",
      items: [
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
      ],
    },
    {
      name: "Content Management",
      description: "Content authoring and distribution",
      icon_color: "hsl(var(--chart-5))",
      items: [
        {
          name: "Omni CMS",
          homepage_url: "https://cms.omni.example",
          description: "Content management system",
          logo: "https://placehold.co/150?text=CMS",
        },
      ],
    },
  ],
  maintainers: [
    {
      name: "Omni Product Team",
      email: "products@omni.example",
      url: "https://products.omni.example/team",
    },
  ],
  created_at: "2022-03-20T00:00:00Z",
  updated_at: "2023-05-15T00:00:00Z",
  theme: {
    primary_color: "#2563EB",
    secondary_color: "#93C5FD",
    background_color: "#F8FAFC",
    text_color: "#1E293B",
  },
};

// Omni Dev Tools Garden
export const devToolsGarden: GardenTypes = {
  name: "Omni Dev Tools",
  description: "Development tools and utilities for Omni ecosystem",
  icon: "🛠️",
  version: "1.5.2",
  supergardens: [
    {
      name: "Omni Ecosystem",
      url: "https://ecosystem.omni.example",
      description: "Complete Omni product and tooling ecosystem",
      logo: "https://placehold.co/150?text=Ecosystem",
      version: "2.0.0",
    },
  ],
  categories: [
    {
      name: "Code Quality",
      description: "Tools for maintaining code quality",
      icon_color: "hsl(var(--chart-6))",
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
      ],
    },
    {
      name: "Development",
      description: "Development environments and tools",
      icon_color: "hsl(var(--chart-7))",
      items: [
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
      ],
    },
    {
      name: "DevOps",
      description: "Deployment and operations tools",
      icon_color: "hsl(var(--chart-8))",
      items: [
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
    },
  ],
  maintainers: [
    {
      name: "Omni DevEx Team",
      email: "devex@omni.example",
      url: "https://devtools.omni.example/team",
    },
  ],
  created_at: "2022-04-12T00:00:00Z",
  updated_at: "2023-04-30T00:00:00Z",
  theme: {
    primary_color: "#0891B2",
    secondary_color: "#67E8F9",
    background_color: "#ECFEFF",
    text_color: "#164E63",
  },
};

// Omni Specifications Garden
export const specificationsGarden: GardenTypes = {
  name: "Omni Specifications",
  description: "Specifications and standards for Omni ecosystem",
  icon: "📋",
  version: "1.3.1",
  supergardens: [
    {
      name: "Omni Ecosystem",
      url: "https://ecosystem.omni.example",
      description: "Complete Omni product and tooling ecosystem",
      logo: "https://placehold.co/150?text=Ecosystem",
      version: "2.0.0",
    },
  ],
  categories: [
    {
      name: "API Standards",
      description: "API design and implementation standards",
      icon_color: "hsl(var(--chart-9))",
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
      ],
    },
    {
      name: "Data Models",
      description: "Data modeling and schema standards",
      icon_color: "hsl(var(--chart-10))",
      items: [
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
      ],
    },
    {
      name: "UX Standards",
      description: "User experience design standards",
      icon_color: "hsl(var(--chart-11))",
      items: [
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
    },
  ],
  maintainers: [
    {
      name: "Omni Standards Team",
      email: "standards@omni.example",
      url: "https://specs.omni.example/team",
    },
  ],
  created_at: "2022-02-28T00:00:00Z",
  updated_at: "2023-03-15T00:00:00Z",
  theme: {
    primary_color: "#A855F7",
    secondary_color: "#D8B4FE",
    background_color: "#FAF5FF",
    text_color: "#581C87",
  },
};

// Make all gardens available for easy access
export const gardens = {
  "Omni Ecosystem": omniEcosystem,
  "Omni Products": productsGarden,
  "Omni Dev Tools": devToolsGarden,
  "Omni Specifications": specificationsGarden,
};

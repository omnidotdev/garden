import type { GardenTypes } from "@omnidotdev/garden";

export const gardens: GardenTypes = {
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
          description: "Tools and platforms for customer engagement",
          icon: "🤝",
          version: "1.2.0",
          created_at: "2022-07-10T00:00:00Z",
          updated_at: "2023-04-22T00:00:00Z",
          theme: {
            primary_color: "#059669",
            secondary_color: "#A7F3D0",
            background_color: "#F0FDF4",
            text_color: "#064E3B",
          },
          maintainers: [
            {
              name: "Customer Success Team",
              email: "success@omni.example",
              url: "https://success.omni.example",
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
              description: "Real-time customer chat platform",
              logo: "https://placehold.co/150?text=Chat",
            },
            {
              name: "Omni Ticketing",
              homepage_url: "https://tickets.omni.example",
              description: "Customer support ticketing system",
              logo: "https://placehold.co/150?text=Tickets",
            },
            {
              name: "Omni Survey",
              homepage_url: "https://survey.omni.example",
              description: "Customer feedback surveys",
              logo: "https://placehold.co/150?text=Survey",
            },
          ],
        },
        {
          name: "Analytics",
          description: "Data analytics and business intelligence tools",
          icon: "📊",
          version: "2.1.0",
          created_at: "2022-05-18T00:00:00Z",
          updated_at: "2023-05-30T00:00:00Z",
          theme: {
            primary_color: "#7C3AED",
            secondary_color: "#C4B5FD",
            background_color: "#FAF5FF",
            text_color: "#581C87",
          },
          maintainers: [
            {
              name: "Analytics Team",
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
              name: "Omni Analytics",
              homepage_url: "https://analytics.omni.example",
              description: "Advanced analytics platform",
              logo: "https://placehold.co/150?text=Analytics",
            },
            {
              name: "Omni Reports",
              homepage_url: "https://reports.omni.example",
              description: "Automated reporting system",
              logo: "https://placehold.co/150?text=Reports",
            },
            {
              name: "Omni Dashboards",
              homepage_url: "https://dashboards.omni.example",
              description: "Interactive data dashboards",
              logo: "https://placehold.co/150?text=Dashboards",
            },
          ],
        },
        {
          name: "Content Management",
          description: "Content creation and management tools",
          icon: "📝",
          version: "1.4.0",
          created_at: "2022-08-25T00:00:00Z",
          updated_at: "2023-03-18T00:00:00Z",
          theme: {
            primary_color: "#DC2626",
            secondary_color: "#FCA5A5",
            background_color: "#FEF2F2",
            text_color: "#7F1D1D",
          },
          maintainers: [
            {
              name: "Content Team",
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
              description: "Rich text content editor",
              logo: "https://placehold.co/150?text=Editor",
            },
            {
              name: "Omni Media",
              homepage_url: "https://media.omni.example",
              description: "Media asset management",
              logo: "https://placehold.co/150?text=Media",
            },
            {
              name: "Omni Publishing",
              homepage_url: "https://publishing.omni.example",
              description: "Content publishing platform",
              logo: "https://placehold.co/150?text=Publishing",
            },
          ],
        },
      ],
    },
    {
      name: "Omni Dev Tools",
      description: "Development tools and utilities for Omni ecosystem",
      icon: "🔧",
      version: "1.5.2",
      created_at: "2022-04-12T00:00:00Z",
      updated_at: "2023-05-28T00:00:00Z",
      theme: {
        primary_color: "#0891B2",
        secondary_color: "#67E8F9",
        background_color: "#ECFEFF",
        text_color: "#164E63",
      },
      maintainers: [
        {
          name: "Developer Experience Team",
          email: "devx@omni.example",
          url: "https://devx.omni.example",
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
          name: "Omni CLI",
          homepage_url: "https://cli.omni.example",
          description: "Command-line interface for Omni tools",
          logo: "https://placehold.co/150?text=CLI",
        },
        {
          name: "Omni SDK",
          homepage_url: "https://sdk.omni.example",
          description: "Software development kit for Omni APIs",
          logo: "https://placehold.co/150?text=SDK",
        },
        {
          name: "Omni Debugger",
          homepage_url: "https://debugger.omni.example",
          description: "Advanced debugging tools",
          logo: "https://placehold.co/150?text=Debugger",
        },
        {
          name: "Omni Profiler",
          homepage_url: "https://profiler.omni.example",
          description: "Performance profiling utilities",
          logo: "https://placehold.co/150?text=Profiler",
        },
        {
          name: "Omni Testing",
          homepage_url: "https://testing.omni.example",
          description: "Testing framework and utilities",
          logo: "https://placehold.co/150?text=Testing",
        },
        {
          name: "Omni Deployment",
          homepage_url: "https://deploy.omni.example",
          description: "Deployment automation tools",
          logo: "https://placehold.co/150?text=Deploy",
        },
      ],
      subgardens: [
        {
          name: "Code Quality",
          description: "Tools for maintaining code quality and standards",
          icon: "✅",
          version: "1.1.0",
          created_at: "2022-09-14T00:00:00Z",
          updated_at: "2023-02-08T00:00:00Z",
          theme: {
            primary_color: "#10B981",
            secondary_color: "#A7F3D0",
            background_color: "#ECFDF5",
            text_color: "#065F46",
          },
          maintainers: [
            {
              name: "Code Quality Team",
              email: "quality@omni.example",
              url: "https://quality.omni.example",
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
              name: "Omni Linter",
              homepage_url: "https://linter.omni.example",
              description: "Code linting and style checking",
              logo: "https://placehold.co/150?text=Linter",
            },
            {
              name: "Omni Formatter",
              homepage_url: "https://formatter.omni.example",
              description: "Automatic code formatting",
              logo: "https://placehold.co/150?text=Formatter",
            },
            {
              name: "Omni Security",
              homepage_url: "https://security.omni.example",
              description: "Security vulnerability scanning",
              logo: "https://placehold.co/150?text=Security",
            },
          ],
        },
        {
          name: "Development",
          description: "Core development tools and environments",
          icon: "💻",
          version: "1.6.0",
          created_at: "2022-06-03T00:00:00Z",
          updated_at: "2023-04-12T00:00:00Z",
          theme: {
            primary_color: "#3B82F6",
            secondary_color: "#93C5FD",
            background_color: "#EFF6FF",
            text_color: "#1E3A8A",
          },
          maintainers: [
            {
              name: "Development Team",
              email: "dev@omni.example",
              url: "https://dev.omni.example",
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
              name: "Omni IDE",
              homepage_url: "https://ide.omni.example",
              description: "Integrated development environment",
              logo: "https://placehold.co/150?text=IDE",
            },
            {
              name: "Omni Sandbox",
              homepage_url: "https://sandbox.omni.example",
              description: "Development sandbox environment",
              logo: "https://placehold.co/150?text=Sandbox",
            },
            {
              name: "Omni Templates",
              homepage_url: "https://templates.omni.example",
              description: "Project templates and boilerplates",
              logo: "https://placehold.co/150?text=Templates",
            },
          ],
        },
        {
          name: "DevOps",
          description:
            "DevOps tools for deployment and infrastructure management",
          icon: "🚀",
          version: "1.3.0",
          created_at: "2022-11-08T00:00:00Z",
          updated_at: "2023-01-25T00:00:00Z",
          theme: {
            primary_color: "#8B5CF6",
            secondary_color: "#C4B5FD",
            background_color: "#F5F3FF",
            text_color: "#5B21B6",
          },
          maintainers: [
            {
              name: "DevOps Team",
              email: "devops@omni.example",
              url: "https://devops.omni.example",
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
              description: "Automated deployment pipeline",
              logo: "https://placehold.co/150?text=Deploy",
            },
            {
              name: "Omni Monitor",
              homepage_url: "https://monitor.omni.example",
              description: "Infrastructure monitoring",
              logo: "https://placehold.co/150?text=Monitor",
            },
            {
              name: "Omni Scale",
              homepage_url: "https://scale.omni.example",
              description: "Auto-scaling infrastructure",
              logo: "https://placehold.co/150?text=Scale",
            },
          ],
        },
      ],
    },
    {
      name: "Omni Specifications",
      description: "Specifications and standards for Omni ecosystem",
      icon: "📋",
      version: "1.3.1",
      created_at: "2022-02-28T00:00:00Z",
      updated_at: "2023-06-05T00:00:00Z",
      theme: {
        primary_color: "#A855F7",
        secondary_color: "#D8B4FE",
        background_color: "#FAF5FF",
        text_color: "#581C87",
      },
      maintainers: [
        {
          name: "Architecture Team",
          email: "architecture@omni.example",
          url: "https://architecture.omni.example",
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
          name: "API Specs",
          homepage_url: "https://api-specs.omni.example",
          description: "API specifications and documentation",
          logo: "https://placehold.co/150?text=API",
        },
        {
          name: "Design System",
          homepage_url: "https://design.omni.example",
          description: "UI/UX design system and guidelines",
          logo: "https://placehold.co/150?text=Design",
        },
        {
          name: "Architecture Docs",
          homepage_url: "https://architecture.omni.example",
          description: "System architecture documentation",
          logo: "https://placehold.co/150?text=Architecture",
        },
        {
          name: "Coding Standards",
          homepage_url: "https://standards.omni.example",
          description: "Coding standards and best practices",
          logo: "https://placehold.co/150?text=Standards",
        },
        {
          name: "Security Guidelines",
          homepage_url: "https://security-guide.omni.example",
          description: "Security guidelines and protocols",
          logo: "https://placehold.co/150?text=Security",
        },
        {
          name: "Performance Benchmarks",
          homepage_url: "https://benchmarks.omni.example",
          description: "Performance benchmarks and metrics",
          logo: "https://placehold.co/150?text=Benchmarks",
        },
      ],
      subgardens: [
        {
          name: "API Standards",
          description: "API design standards and best practices",
          icon: "🔌",
          version: "1.0.0",
          created_at: "2022-12-01T00:00:00Z",
          updated_at: "2023-03-15T00:00:00Z",
          theme: {
            primary_color: "#06B6D4",
            secondary_color: "#67E8F9",
            background_color: "#F0F9FF",
            text_color: "#0C4A6E",
          },
          maintainers: [
            {
              name: "API Standards Team",
              email: "api-standards@omni.example",
              url: "https://api-standards.omni.example",
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
              name: "REST Guidelines",
              homepage_url: "https://rest.omni.example",
              description: "RESTful API design guidelines",
              logo: "https://placehold.co/150?text=REST",
            },
            {
              name: "GraphQL Standards",
              homepage_url: "https://graphql.omni.example",
              description: "GraphQL API standards",
              logo: "https://placehold.co/150?text=GraphQL",
            },
            {
              name: "API Versioning",
              homepage_url: "https://versioning.omni.example",
              description: "API versioning strategies",
              logo: "https://placehold.co/150?text=Versioning",
            },
          ],
        },
        {
          name: "Data Models",
          description: "Standard data models and schemas",
          icon: "🗃️",
          version: "1.1.0",
          created_at: "2023-01-20T00:00:00Z",
          updated_at: "2023-04-18T00:00:00Z",
          theme: {
            primary_color: "#84CC16",
            secondary_color: "#BEF264",
            background_color: "#F7FEE7",
            text_color: "#365314",
          },
          maintainers: [
            {
              name: "Data Architecture Team",
              email: "data-arch@omni.example",
              url: "https://data-arch.omni.example",
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
              name: "User Models",
              homepage_url: "https://user-models.omni.example",
              description: "Standard user data models",
              logo: "https://placehold.co/150?text=Users",
            },
            {
              name: "Product Models",
              homepage_url: "https://product-models.omni.example",
              description: "Product data schemas",
              logo: "https://placehold.co/150?text=Products",
            },
            {
              name: "Event Models",
              homepage_url: "https://event-models.omni.example",
              description: "Event data structures",
              logo: "https://placehold.co/150?text=Events",
            },
          ],
        },
        {
          name: "UX Standards",
          description: "User experience design standards and guidelines",
          icon: "🎨",
          version: "1.2.0",
          created_at: "2022-10-15T00:00:00Z",
          updated_at: "2023-05-20T00:00:00Z",
          theme: {
            primary_color: "#F97316",
            secondary_color: "#FDBA74",
            background_color: "#FFF7ED",
            text_color: "#9A3412",
          },
          maintainers: [
            {
              name: "UX Design Team",
              email: "ux@omni.example",
              url: "https://ux.omni.example",
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
              name: "Design Tokens",
              homepage_url: "https://tokens.omni.example",
              description: "Design token specifications",
              logo: "https://placehold.co/150?text=Tokens",
            },
            {
              name: "Component Library",
              homepage_url: "https://components.omni.example",
              description: "Standard UI components",
              logo: "https://placehold.co/150?text=Components",
            },
            {
              name: "Accessibility Guidelines",
              homepage_url: "https://a11y.omni.example",
              description: "Accessibility standards and guidelines",
              logo: "https://placehold.co/150?text=A11y",
            },
          ],
        },
      ],
    },
  ],
};

import { GardenTypes } from "@/generated/garden.types";

// Sample data with Omni in the center and products around it
export const sampleGarden: GardenTypes = {
  name: "Omni Garden",
  description: "Omni product ecosystem",
  version: "1.0.0",
  categories: [
    {
      name: "Productivity",
      description: "Tools to enhance work efficiency and organization",
      categories: [
        {
          name: "Task Management",
          description: "Organize and track tasks and projects",
          icon_color: "hsl(var(--chart-1))",
          items: [
            {
              name: "Product A",
              homepage_url: "https://example.com/product-a",
              project_url: "https://github.com/example/product-a",
              logo: "https://via.placeholder.com/150?text=A",
              description: "Task management solution",
            },
            {
              name: "Product B",
              homepage_url: "https://example.com/product-b",
              project_url: "https://github.com/example/product-b",
              logo: "https://via.placeholder.com/150?text=B",
              description: "Team collaboration tool",
            },
          ],
          // Demonstrating recursive categories
          categories: [
            {
              name: "Personal Tasks",
              description: "Manage individual productivity",
              icon_color: "hsl(var(--chart-1))",
              items: [
                {
                  name: "Product A1",
                  homepage_url: "https://example.com/product-a1",
                  logo: "https://via.placeholder.com/150?text=A1",
                  description: "Personal task tracker",
                },
              ],
              // Another level of nesting
              categories: [
                {
                  name: "Daily Tasks",
                  description: "Track everyday to-dos and routines",
                  icon_color: "hsl(var(--chart-1))",
                  items: [
                    {
                      name: "Product A1-1",
                      homepage_url: "https://example.com/product-a1-1",
                      logo: "https://via.placeholder.com/150?text=A1-1",
                      description: "Daily task management",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Note Taking",
          description: "Capture and organize ideas and information",
          icon_color: "hsl(var(--chart-2))",
          items: [
            {
              name: "Product C",
              homepage_url: "https://example.com/product-c",
              project_url: "https://github.com/example/product-c",
              logo: "https://via.placeholder.com/150?text=C",
              description: "Smart note-taking app",
            },
          ],
        },
      ],
    },
    {
      name: "Development",
      description: "Programming tools and environments for developers",
      icon_color: "hsl(var(--chart-3))",
      categories: [
        {
          name: "Code Editors",
          description: "Text editors optimized for programming",
          items: [
            {
              name: "Product D",
              homepage_url: "https://example.com/product-d",
              project_url: "https://github.com/example/product-d",
              logo: "https://via.placeholder.com/150?text=D",
              description: "Intelligent code editor",
            },
            {
              name: "Product E",
              homepage_url: "https://example.com/product-e",
              project_url: "https://github.com/example/product-e",
              logo: "https://via.placeholder.com/150?text=E",
              description: "Collaborative IDE",
            },
          ],
        },
        {
          name: "Version Control",
          description: "Track and manage code changes",
          items: [
            {
              name: "Product F",
              homepage_url: "https://example.com/product-f",
              project_url: "https://github.com/example/product-f",
              logo: "https://via.placeholder.com/150?text=F",
              description: "Git client with advanced features",
            },
          ],
        },
      ],
    },
    {
      name: "Communication",
      description: "Tools for team and client interactions",
      icon_color: "hsl(var(--chart-4))",
      categories: [
        {
          name: "Messaging",
          description: "Real-time communication tools",
          items: [
            {
              name: "Product G",
              homepage_url: "https://example.com/product-g",
              project_url: "https://github.com/example/product-g",
              logo: "https://via.placeholder.com/150?text=G",
              description: "Team chat platform",
            },
          ],
        },
        {
          name: "Video Conferencing",
          description: "Face-to-face virtual meetings",
          items: [
            {
              name: "Product H",
              homepage_url: "https://example.com/product-h",
              project_url: "https://github.com/example/product-h",
              logo: "https://via.placeholder.com/150?text=H",
              description: "HD video meetings",
            },
          ],
        },
      ],
    },
    {
      name: "Design",
      description: "Creative tools for visual and UX design",
      icon_color: "hsl(var(--chart-5))",
      categories: [
        {
          name: "UI/UX",
          description: "User interface and experience design tools",
          items: [
            {
              name: "Product I",
              homepage_url: "https://example.com/product-i",
              project_url: "https://github.com/example/product-i",
              logo: "https://via.placeholder.com/150?text=I",
              description: "Design and prototyping tool",
            },
          ],
        },
        {
          name: "Graphics",
          description: "Digital illustration and image editing",
          items: [
            {
              name: "Product J",
              homepage_url: "https://example.com/product-j",
              project_url: "https://github.com/example/product-j",
              logo: "https://via.placeholder.com/150?text=J",
              description: "Vector graphics editor",
            },
          ],
        },
      ],
    },
  ],
  maintainers: [
    {
      name: "Omni Team",
      email: "team@omni.example",
      url: "https://omni.example",
    },
  ],
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
  theme: {
    primary_color: "#6366F1",
    secondary_color: "#A5B4FC",
    background_color: "#F9FAFB",
    text_color: "#111827",
  },
};

export const omniGarden: GardenTypes = {
  name: "Omni Garden",
  description: "Omni product ecosystem",
  version: "1.0.0",
  categories: [
    {
      name: "Products",
      items: [
        {
          name: "Backfeed",
          homepage_url: "https://backfeed.omni.dev",
          description: "User feedback reporting and voting",
        },
      ],
      categories: [
        {
          name: "User Feedback",
          description: "Tools for gathering and managing user feedback",
          items: [
            {
              name: "Feedback Portal",
              homepage_url: "https://feedback.omni.dev",
              description: "Public user feedback portal",
            },
          ],
        },
      ],
    },
    {
      name: "Developer Tools",
      description: "For nerds",
      items: [
        {
          name: "Sigil",
          homepage_url: "https://sigil.omni.dev",
          description: "UI components and design system",
        },
      ],
      categories: [
        {
          name: "Design Systems",
          items: [
            {
              name: "Component Library",
              homepage_url: "https://components.omni.dev",
              description: "Reusable UI components",
            },
          ],
        },
      ],
    },
    {
      name: "Specifications & Schemas",
      description: "For nerds",
      items: [
        {
          name: "Garden",
          homepage_url: "https://garden.omni.dev",
          description: "Product ecosystem visualization",
        },
      ],
      categories: [
        {
          name: "APIs",
          description: "API specifications and tools",
          items: [
            {
              name: "API Standards",
              homepage_url: "https://api.omni.dev",
              description: "API design guidelines",
            },
          ],
          categories: [
            {
              name: "OpenAPI",
              description: "OpenAPI specifications and tools",
              items: [
                {
                  name: "Swagger UI",
                  homepage_url: "https://swagger.omni.dev",
                  description: "API documentation viewer",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

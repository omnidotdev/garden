import { Schema } from "@effect/schema";

export const GardenItem = Schema.Struct({
  name: Schema.String,
  homepage_url: Schema.String,
  logo: Schema.optional(Schema.String),
  repo_url: Schema.optional(Schema.String),
  project_url: Schema.optional(Schema.String),
  twitter: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
});

// First declare the schema as a variable
const CategorySpecRef: any = { schema: null };

// Create the CategorySpec schema with recursive reference
export const CategorySpec = Schema.Struct({
  name: Schema.String,
  description: Schema.optional(Schema.String),
  icon_color: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(GardenItem)),
  subcategories: Schema.optional(
    Schema.Array(Schema.suspend(() => CategorySpecRef.schema))
  ),
});

// Assign the created schema to the reference to complete the recursive definition
CategorySpecRef.schema = CategorySpec;

// Garden schema (completely independent)
export const GardenSpec = Schema.Struct({
  name: Schema.String,
  description: Schema.optional(Schema.String),
  version: Schema.String,
  categories: Schema.Array(CategorySpec),
  maintainers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.String,
        email: Schema.optional(Schema.String),
        url: Schema.optional(Schema.String),
      })
    )
  ),
  created_at: Schema.optional(Schema.String),
  updated_at: Schema.optional(Schema.String),
  theme: Schema.optional(
    Schema.Struct({
      primary_color: Schema.optional(Schema.String),
      secondary_color: Schema.optional(Schema.String),
      background_color: Schema.optional(Schema.String),
      text_color: Schema.optional(Schema.String),
    })
  ),
});

// Sample data with Omni in the center and products around it
export const sampleGarden: typeof GardenSpec.Type = {
  name: "Omni Garden",
  description: "Omni product ecosystem",
  version: "1.0.0",
  categories: [
    {
      name: "Productivity",
      description: "Tools to enhance work efficiency and organization",
      subcategories: [
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
          // Demonstrating recursive subcategories
          subcategories: [
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
              subcategories: [
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
      subcategories: [
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
      subcategories: [
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
      subcategories: [
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

export const omniGarden: typeof GardenSpec.Type = {
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
    },
    {
      name: "Developer Tools",
      description: "For nerds",
      items: [
        {
          name: "Sigil",
          homepage_url: "https://sigil.omni.dev",
          // logo: "https://via.placeholder.com/150?text=DX",
          description: "UI stuff",
        },
      ],
    },
  ],
};

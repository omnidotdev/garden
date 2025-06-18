import type { GardenSchema } from "@omnidotdev/garden";

export const gardens: GardenSchema = {
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
      email: "team@omni.dev",
      url: "https://omni.dev",
    },
  ],
  sprouts: [
    {
      name: "Omni Consulting",
      homepage_url: "https://omni.dev",
      description: "Omni contracting, consulting, and advice",
      logo: "/img/omni-logo.png",
    },
    {
      name: "Omni Docs",
      homepage_url: "https://docs.omni.dev",
      description: "Documentation portal",
      logo: "/img/omni-logo.png",
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
          name: "Omni Core Team",
          email: "team@omni.dev",
          url: "https://omni.dev",
        },
      ],
      supergardens: [
        {
          name: "Omni Ecosystem",
          url: "https://verse.omni.dev",
          description: "Complete Omni product and tooling ecosystem",
          version: "2.0.0",
        },
      ],
      sprouts: [
        {
          name: "Backfeed",
          homepage_url: "https://backfeed.omni.dev",
          description: "User feedback collection and management",
          logo: "/img/backfeed-logo.png",
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
          name: "Omni Core Team",
          email: "team@omni.dev",
          url: "https://omni.dev",
        },
      ],
      supergardens: [
        {
          name: "Omni Ecosystem",
          url: "https://verse.omni.dev",
          description: "Complete Omni product and tooling ecosystem",
          version: "2.0.0",
        },
      ],
      sprouts: [
        {
          name: "Sigil",
          homepage_url: "https://sigil.omni.dev",
          description: "Omni design system and component library",
          logo: "/img/sigil-logo.png",
        },
      ],
    },
    {
      name: "Omni Specifications",
      description: "Specifications, standards, and schemas for Omni ecosystem",
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
          name: "Omni Core Team",
          email: "team@omni.dev",
          url: "https://omni.dev",
        },
      ],
      supergardens: [
        {
          name: "Omni Ecosystem",
          url: "https://verse.omni.dev",
          description: "Complete Omni product and tooling ecosystem",
          version: "2.0.0",
        },
      ],
      sprouts: [
        {
          name: "Garden",
          homepage_url: "https://garden.omni.dev",
          description: "Product, service, and other ecosystem visualizer",
          logo: "/img/logo.png",
        },
      ],
    },
  ],
};

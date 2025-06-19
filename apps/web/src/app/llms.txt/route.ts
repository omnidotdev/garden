import { NextResponse } from "next/server";

const LLMS_TXT_CONTENT = `# Garden 🌱

Garden is a specification and toolkit for modeling digital ecosystems as directed acyclic graphs with unlimited recursion and composability. It provides a visual representation of projects, services, and their relationships within an ecosystem.

## What Garden Offers

### Core Concept
Garden treats digital ecosystems like actual gardens - places where projects grow and are cultivated. Each "sprout" represents a project, service, or component, and gardens can contain subgardens, creating infinitely nestable ecosystem visualizations.

### Key Features
- **Visual Ecosystem Mapping**: Transform complex project relationships into intuitive visual graphs
- **Composable Architecture**: Gardens can be nested within other gardens ("supergardens" and "subgardens")
- **Schema-Driven**: JSON Schema-based specification ensures consistency and validation
- **Multiple Interfaces**: CLI tool, React component library, and web application
- **Flexible Layouting**: Powered by ELK (Eclipse Layout Kernel) with plans for additional layout engines

### Components

#### 1. CLI Tool (Rust)
A command-line interface for generating and validating Garden JSON schemas.
- Schema generation from Rust structs
- Built-in validation
- Cross-platform binary

#### 2. React Component Library (@omnidotdev/garden)
A React component library for embedding Garden visualizations in web applications.
- TypeScript support
- Customizable themes and layouts
- Built on React Flow for smooth interactions
- CSS styling included

#### 3. Web Application
A Next.js-based web app for creating, editing, and viewing Garden schemas.
- Interactive schema editor with Monaco Editor
- Real-time visualization
- Dark/light theme support
- Responsive design

## Installation & Usage

### NPM Installation

For the React component library:

\`\`\`bash
npm install @omnidotdev/garden
# or
yarn add @omnidotdev/garden
# or
bun add @omnidotdev/garden
\`\`\`

### Basic Usage

\`\`\`typescript
import { Garden } from '@omnidotdev/garden';
import '@omnidotdev/garden/styles.css';

const myGardenSchema = {
  name: "My Digital Ecosystem",
  description: "A visualization of our product ecosystem",
  sprouts: [
    {
      name: "Frontend App",
      homepage_url: "https://app.example.com",
      description: "Main user-facing application"
    },
    {
      name: "API Service",
      homepage_url: "https://api.example.com",
      description: "Backend API service"
    }
  ]
};

function MyComponent() {
  return (
    <Garden schema={myGardenSchema} />
  );
}
\`\`\`

### Advanced Configuration

The Garden component supports extensive customization:

\`\`\`typescript
<Garden
  schema={complexSchema}
  initialGardenName="production-ecosystem"
  expandSubgardens={true}
  showControls={true}
  showMinimap={true}
  fitViewPadding={0.3}
  edgeType="smoothstep"
  animateEdges={true}
  miniMapOptions={{ nodeColor: '#ff0000' }}
  controlOptions={{ showZoom: true, showFitView: true }}
/>
\`\`\`

## Schema Structure

A Garden schema consists of:

- **name** (required): The garden's name
- **description**: Optional description
- **sprouts**: Array of projects/services in the ecosystem
- **subgardens**: Nested gardens within this garden
- **supergardens**: Parent gardens containing this garden
- **maintainers**: People responsible for the garden
- **theme**: Visual customization options
- **created_at/updated_at**: Timestamps

### Sprout Structure

Each sprout (project) can include:
- **name** (required): Project name
- **homepage_url** (required): Main project URL
- **logo**: Logo image URL
- **repo_url**: Source code repository
- **project_url**: Project documentation/info
- **twitter**: Twitter handle
- **description**: Project description

## Web Application Overview

The Garden web application provides:

### Features
- **Interactive Schema Editor**: Monaco Editor with syntax highlighting and validation
- **Real-time Visualization**: See your garden update as you edit the schema
- **Multiple View Modes**: Switch between editor and full-screen visualization
- **Theme Support**: Built-in dark and light themes
- **Responsive Design**: Works on desktop and mobile devices
- **Export Capabilities**: Download schemas and visualizations

### Technology Stack
- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4
- **Visualization**: React Flow with ELK layouting
- **Editor**: Monaco Editor (VS Code editor)
- **State Management**: Zustand
- **UI Components**: Radix UI primitives

### Local Development

To run the web application locally:

\`\`\`bash
# Clone the repository
git clone https://github.com/omnidotdev/garden.git
cd garden

# Install dependencies (uses Bun)
bun install

# Start the development server
turbo dev
\`\`\`

The application will be available at \`https://localhost:3000\` (note: uses HTTPS in development).

## CLI Usage

For schema generation and validation:

\`\`\`bash
# Generate schema file
cd apps/cli
cargo run -- ../garden.schema.json
\`\`\`

## Inspiration & Use Cases

Garden is inspired by the CNCF Landscape project and is designed for:

- **Product Ecosystem Mapping**: Visualize how your products and services interconnect
- **Architecture Documentation**: Document system relationships and dependencies
- **Team Organization**: Show how different teams and projects relate
- **Technology Landscapes**: Map out technology stacks and their relationships
- **Open Source Ecosystems**: Visualize community projects and their connections

## License

MIT License, © Omni LLC

## Reference Implementation

Check out the [Omniverse](https://verse.omni.dev) for a real-world example of Garden in action.

---

Garden transforms complex digital ecosystems into beautiful, understandable visualizations that help teams and organizations better understand their technology landscapes.`;

export const GET = async () => {
  return new NextResponse(LLMS_TXT_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};

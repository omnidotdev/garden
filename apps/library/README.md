# 🌱 Garden

[Website](https://garden.omni.dev) | [Docs](https://docs.omni.dev/garden/overview)

Garden is a specification for modeling an ecosystem (e.g. of products, services) as a directed graph with unlimited recursion and composability.

For a reference implementation, check out the [Omniverse](https://verse.omni.dev).

Garden layouting is currently powered by [ELK](https://rtsys.informatik.uni-kiel.de/elklive), more layouting engines will be supported in the future.

## Why "Garden"?

*Cultivation*. A garden is a place where plants are grown and cultivated, and digital ecosystems thrive on this same approach.

## Features

- A visual representation of an ecosystem of projects and their relationships
- Composable: each garden is independently processable as its own garden, and gardens can be nested inside of each other ("supergardens" and "subgardens").

## Inspiration

Garden is inspired by the [CNCF Landscape](https://landscape.cncf.io) project, which is a collection of projects that are part of the [CNCF](https://cncf.io). The CNCF Landscape is a visual representation of the projects and their relationships, making it easier to understand the relationships between projects and the larger ecosystem.

## Getting Started

To integrate Garden in your React application, first `bun add @omnidotdev/garden`, then:

```tsx
import { Garden } from "@omnidotdev/garden";

import type { GardenSchema } from "@omnidotdev/garden";

// import required Garden styles
import "@omnidotdev/garden/styles.css";

const schema: GardenSchema = {
  name: "Ecosystem",
  // ...
};

/**
 * Render the Garden component with the provided ecosystem schema.
 *
 * `schema` is validated against the Garden specification at runtime.
 * If the schema is invalid, an error will be thrown.
 */
const App = () => <Garden schema={schema} />;
```

## License

The code in this repository is licensed under MIT, &copy; Omni LLC. See [LICENSE.md](LICENSE.md) for more information.
